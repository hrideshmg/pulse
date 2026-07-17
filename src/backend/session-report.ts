import type { Session, SpeechMetricSnapshot, TranscriptSegment, VitalSample } from '../contracts/domain.js';
import type { SessionReport, StressEpisode } from '../contracts/session-report.js';
import type { StressTransition } from '../contracts/vitals-resources.js';

interface ReportEvidence {
  session: Session;
  vitals: readonly VitalSample[];
  transitions: readonly StressTransition[];
  segments: readonly TranscriptSegment[];
  metrics: SpeechMetricSnapshot;
}

export function deriveSessionReport(evidence: ReportEvidence): SessionReport {
  const { session, metrics } = evidence;
  const vitals = [...evidence.vitals].sort((left, right) =>
    left.sessionElapsedMs - right.sessionElapsedMs || left.deviceTimestamp.localeCompare(right.deviceTimestamp));
  const transitions = [...evidence.transitions].sort((left, right) =>
    left.occurredAtMs - right.occurredAtMs || left.transitionId.localeCompare(right.transitionId));
  const segments = [...evidence.segments].sort((left, right) =>
    left.startMs - right.startMs || left.segmentId.localeCompare(right.segmentId));
  const availableVitals = vitals.filter(({ availability }) => availability === 'available');
  const vitalEvidenceIds = vitals.map(vitalEvidenceId);
  const transcriptEvidenceIds = segments.map(({ segmentId }) => segmentId);
  const stressEpisodes = deriveStressEpisodes(transitions);
  const recoveryTimes = stressEpisodes.flatMap(({ recoveryTimeMs }) => recoveryTimeMs === null ? [] : [recoveryTimeMs]);
  const bpm = availableVitals.map((sample) => sample.bpm);

  const timeline: SessionReport['timeline'] = [
    ...vitals.map((sample) => {
      const { source: _source, ...reportSample } = sample;
      return {
        kind: 'vital' as const,
        atMs: sample.sessionElapsedMs,
        evidenceId: vitalEvidenceId(sample),
        sample: reportSample
      };
    }),
    ...transitions.map((transition) => {
      const { evidence: _evidence, ...signal } = transition.signal;
      return {
        kind: 'stress_transition' as const,
        atMs: transition.occurredAtMs,
        evidenceId: transition.transitionId,
        transition: { ...transition, signal }
      };
    }),
    ...segments.map((segment) => {
      const { speaker: _speaker, ...reportSegment } = segment;
      return {
        kind: 'transcript' as const,
        atMs: segment.startMs,
        evidenceId: segment.segmentId,
        segment: reportSegment
      };
    }),
    {
      kind: 'speech_metrics' as const,
      atMs: metrics.calculatedAtMs,
      evidenceId: `${session.sessionId}:speech-metrics`,
      metrics
    }
  ].sort((left, right) => left.atMs - right.atMs || timelineKindOrder(left.kind) - timelineKindOrder(right.kind));

  const limitations: SessionReport['limitations'] = ['audio_playback_unavailable'];
  if (availableVitals.length === 0) limitations.push('heart_rate_unavailable');
  if (segments.length === 0) limitations.push('transcript_unavailable');

  return {
    reportVersion: '1.0',
    session: {
      sessionId: session.sessionId,
      status: session.status,
      startedAt: session.startedAt,
      endedAt: session.endedAt,
      audioInputRoute: session.audioInputRoute
    },
    durationMs: reportDurationMs(session, vitals, segments, transitions, metrics),
    summary: {
      averageBpm: bpm.length === 0 ? null : round(bpm.reduce((total, value) => total + value, 0) / bpm.length),
      minimumBpm: bpm.length === 0 ? null : Math.min(...bpm),
      maximumBpm: bpm.length === 0 ? null : Math.max(...bpm),
      paceWordsPerMinute: metrics.wordsPerMinute,
      stressEpisodeCount: stressEpisodes.length,
      averageRecoveryTimeMs: recoveryTimes.length === 0
        ? null
        : round(recoveryTimes.reduce((total, value) => total + value, 0) / recoveryTimes.length),
      vitalEvidenceIds,
      transcriptEvidenceIds
    },
    stressEpisodes,
    timeline,
    limitations
  };
}

function deriveStressEpisodes(transitions: readonly StressTransition[]): StressEpisode[] {
  const episodes: StressEpisode[] = [];
  let current: StressEpisode | undefined;
  for (const transition of transitions) {
    if (transition.state === 'sustained_elevation' && current === undefined) {
      current = {
        episodeId: transition.transitionId,
        startedAtMs: transition.occurredAtMs,
        recoveringAtMs: null,
        endedAtMs: null,
        recoveryTimeMs: null,
        transitionIds: [transition.transitionId]
      };
      episodes.push(current);
      continue;
    }
    if (!current) continue;
    current.transitionIds.push(transition.transitionId);
    if (transition.state === 'recovering') current.recoveringAtMs = transition.occurredAtMs;
    if (transition.state === 'baseline') {
      current.endedAtMs = transition.occurredAtMs;
      current.recoveryTimeMs = current.recoveringAtMs === null
        ? null
        : transition.occurredAtMs - current.recoveringAtMs;
      current = undefined;
    }
  }
  return episodes;
}

function reportDurationMs(
  session: Session,
  vitals: readonly VitalSample[],
  segments: readonly TranscriptSegment[],
  transitions: readonly StressTransition[],
  metrics: SpeechMetricSnapshot
): number {
  const wallClockDuration = session.startedAt && session.endedAt
    ? Math.max(0, Date.parse(session.endedAt) - Date.parse(session.startedAt))
    : 0;
  return Math.max(
    wallClockDuration,
    metrics.calculatedAtMs,
    vitals.at(-1)?.sessionElapsedMs ?? 0,
    segments.at(-1)?.endMs ?? 0,
    transitions.at(-1)?.occurredAtMs ?? 0
  );
}

function vitalEvidenceId(sample: VitalSample): string {
  return `${sample.sessionId}:vital:${sample.sessionElapsedMs}:${sample.deviceTimestamp}`;
}

function timelineKindOrder(kind: SessionReport['timeline'][number]['kind']): number {
  return ['vital', 'stress_transition', 'transcript', 'speech_metrics'].indexOf(kind);
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
