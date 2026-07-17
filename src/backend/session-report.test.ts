import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Session, SpeechMetricSnapshot, TranscriptSegment, VitalSample } from '../contracts/domain.js';
import { sessionReportSchema } from '../contracts/session-report.js';
import type { StressTransition } from '../contracts/vitals-resources.js';
import { deriveSessionReport } from './session-report.js';

const session: Session = {
  sessionId: 'session-report-test',
  status: 'completed',
  startedAt: '2026-07-17T10:00:00.000Z',
  endedAt: '2026-07-17T10:00:20.000Z',
  simulatedVitals: true,
  audioInputRoute: 'phone'
};

const vitals: VitalSample[] = [
  vital(0, 70), vital(5_000, 86), vital(10_000, 90), vital(14_000, 74), vital(17_000, 71)
];

const segment: TranscriptSegment = {
  sessionId: session.sessionId,
  segmentId: 'segment-report-test',
  speaker: 'unknown',
  text: 'The delivery date is the remaining concern.',
  startMs: 8_000,
  endMs: 11_000,
  providerTimestamp: '2026-07-17T10:00:11.000Z',
  confidence: 0.95,
  isFinal: true
};

const metrics: SpeechMetricSnapshot = {
  sessionId: session.sessionId,
  calculatedAtMs: 20_000,
  wordsPerMinute: 120,
  longestTurnMs: 3_000,
  currentSilenceMs: 9_000
};

const transitions: StressTransition[] = [
  transition('sustained_elevation', 10_000, 'elevated'),
  transition('recovering', 14_000, 'sustained_elevation'),
  transition('baseline', 17_000, 'recovering')
];

describe('Phase 5 session report', () => {
  it('deterministically aligns evidence and computes recovery summaries', () => {
    const first = deriveSessionReport({ session, vitals, transitions, segments: [segment], metrics });
    const second = deriveSessionReport({
      session,
      vitals: [...vitals].reverse(),
      transitions: [...transitions].reverse().sort((left, right) => left.occurredAtMs - right.occurredAtMs),
      segments: [segment],
      metrics
    });

    assert.deepEqual(first, second);
    assert.equal(first.summary.stressEpisodeCount, 1);
    assert.equal(first.summary.averageRecoveryTimeMs, 3_000);
    assert.deepEqual(first.timeline.map(({ atMs }) => atMs), [0, 5_000, 8_000, 10_000, 10_000, 14_000, 14_000, 17_000, 17_000, 20_000]);
    assert.deepEqual(first.limitations, ['audio_playback_unavailable']);
    sessionReportSchema.parse(first);

    const json = JSON.stringify(first);
    assert.equal(json.includes('simulatedVitals'), false);
    assert.equal(json.includes('simulator'), false);
    assert.equal(json.includes('speaker'), false);
  });

  it('returns a valid reduced report when vitals and transcript are absent', () => {
    const report = deriveSessionReport({ session, vitals: [], transitions: [], segments: [], metrics: { ...metrics, wordsPerMinute: 0 } });
    assert.equal(report.summary.averageBpm, null);
    assert.deepEqual(report.limitations, [
      'audio_playback_unavailable',
      'heart_rate_unavailable',
      'transcript_unavailable'
    ]);
    sessionReportSchema.parse(report);
  });
});

function vital(sessionElapsedMs: number, bpm: number): VitalSample {
  return {
    sessionId: session.sessionId,
    bpm,
    availability: 'available',
    sessionElapsedMs,
    deviceTimestamp: new Date(Date.parse(session.startedAt!) + sessionElapsedMs).toISOString(),
    source: 'simulator'
  };
}

function transition(
  state: StressTransition['state'],
  occurredAtMs: number,
  previousState: StressTransition['previousState']
): StressTransition {
  return {
    transitionId: `${session.sessionId}:${occurredAtMs}:${state}`,
    sessionId: session.sessionId,
    previousState,
    state,
    occurredAtMs,
    signal: {
      sessionId: session.sessionId,
      state,
      baselineBpm: 70,
      currentDeltaBpm: 0,
      elevationStartedAtMs: state === 'baseline' ? null : 5_000,
      elevationDurationMs: state === 'baseline' ? 0 : occurredAtMs - 5_000,
      evidence: vitals.filter((sample) => sample.sessionElapsedMs <= occurredAtMs),
      cooldownUntilMs: state === 'baseline' ? 27_000 : null
    }
  };
}
