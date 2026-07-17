import type { SessionContext, StressSignal, VitalSample } from '../contracts/domain.js';
import type { StressTransition } from '../contracts/vitals-resources.js';

export const DEFAULT_STRESS_SENSITIVITY: SessionContext['stressSensitivity'] = {
  baselineOffsetBpm: 12,
  elevationTriggerMs: 5_000,
  recoveryTriggerMs: 3_000,
  cooldownMs: 10_000
};

const CALIBRATION_DURATION_MS = 5_000;
const MAX_EVIDENCE_SAMPLES = 120;

export interface StressTimeline {
  signal: StressSignal | undefined;
  transitions: StressTransition[];
}

export function deriveStressTimeline(
  sessionId: string,
  inputSamples: readonly VitalSample[],
  sensitivity = DEFAULT_STRESS_SENSITIVITY
): StressTimeline {
  const samples = [...inputSamples]
    .filter((sample) => sample.availability === 'available')
    .sort((left, right) => left.sessionElapsedMs - right.sessionElapsedMs ||
      left.deviceTimestamp.localeCompare(right.deviceTimestamp));
  if (samples.length === 0) return { signal: undefined, transitions: [] };

  const calibration = samples.filter((sample) =>
    sample.sessionElapsedMs <= samples[0].sessionElapsedMs + CALIBRATION_DURATION_MS
  );
  const baselineBpm = round(calibration.reduce((total, sample) => total + sample.bpm, 0) / calibration.length);
  const elevationThreshold = baselineBpm + sensitivity.baselineOffsetBpm;
  const recoveryThreshold = baselineBpm + sensitivity.baselineOffsetBpm / 2;

  let state: StressSignal['state'] = 'baseline';
  let elevationStartedAtMs: number | null = null;
  let recoveryStartedAtMs: number | null = null;
  let cooldownUntilMs: number | null = null;
  let evidenceStart = 0;
  let previousSignal: StressSignal | undefined;
  const transitions: StressTransition[] = [];

  samples.forEach((sample, index) => {
    const previousState = state;
    if (state === 'baseline') {
      if ((cooldownUntilMs === null || sample.sessionElapsedMs >= cooldownUntilMs) && sample.bpm >= elevationThreshold) {
        state = 'elevated';
        elevationStartedAtMs = sample.sessionElapsedMs;
        evidenceStart = index;
      }
    } else if (state === 'elevated') {
      if (sample.bpm < elevationThreshold) {
        state = 'baseline';
        elevationStartedAtMs = null;
        recoveryStartedAtMs = null;
      } else if (elevationStartedAtMs !== null &&
        sample.sessionElapsedMs - elevationStartedAtMs >= sensitivity.elevationTriggerMs) {
        state = 'sustained_elevation';
      }
    } else if (state === 'sustained_elevation') {
      if (sample.bpm <= recoveryThreshold) {
        state = 'recovering';
        recoveryStartedAtMs = sample.sessionElapsedMs;
      }
    } else if (sample.bpm >= elevationThreshold) {
      state = 'sustained_elevation';
      recoveryStartedAtMs = null;
    } else if (sample.bpm > recoveryThreshold) {
      recoveryStartedAtMs = null;
    } else if (recoveryStartedAtMs === null) {
      recoveryStartedAtMs = sample.sessionElapsedMs;
    } else if (sample.bpm <= recoveryThreshold && recoveryStartedAtMs !== null &&
      sample.sessionElapsedMs - recoveryStartedAtMs >= sensitivity.recoveryTriggerMs) {
      state = 'baseline';
      elevationStartedAtMs = null;
      recoveryStartedAtMs = null;
      cooldownUntilMs = sample.sessionElapsedMs + sensitivity.cooldownMs;
    }

    const signal = makeSignal(
      sessionId,
      state,
      baselineBpm,
      sample,
      elevationStartedAtMs,
      cooldownUntilMs,
      samples.slice(state === 'baseline' ? Math.max(0, index - 9) : evidenceStart, index + 1)
    );
    previousSignal = signal;
    if (state !== previousState) {
      transitions.push({
        transitionId: `${sessionId}:${sample.sessionElapsedMs}:${state}`,
        sessionId,
        previousState,
        state,
        occurredAtMs: sample.sessionElapsedMs,
        signal
      });
    }
  });

  return { signal: previousSignal, transitions };
}

function makeSignal(
  sessionId: string,
  state: StressSignal['state'],
  baselineBpm: number,
  sample: VitalSample,
  elevationStartedAtMs: number | null,
  cooldownUntilMs: number | null,
  evidence: VitalSample[]
): StressSignal {
  return {
    sessionId,
    state,
    baselineBpm,
    currentDeltaBpm: round(sample.bpm - baselineBpm),
    elevationStartedAtMs,
    elevationDurationMs: elevationStartedAtMs === null ? 0 : sample.sessionElapsedMs - elevationStartedAtMs,
    evidence: evidence.slice(-MAX_EVIDENCE_SAMPLES),
    cooldownUntilMs
  };
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
