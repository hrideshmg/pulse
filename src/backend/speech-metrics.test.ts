import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Session, TranscriptSegment } from '../contracts/domain.js';
import { deriveSpeechMetrics } from './speech-metrics.js';

describe('speech metrics', () => {
  it('derives deterministic pace, turns, and silence from wearer speech', () => {
    const session: Session = {
      sessionId: 'session-metrics-001',
      status: 'active',
      startedAt: '2026-07-17T10:00:00.000Z',
      endedAt: null,
      simulatedVitals: false,
      audioInputRoute: 'phone'
    };
    const base = {
      sessionId: session.sessionId,
      providerTimestamp: '2026-07-17T10:00:01.000Z',
      confidence: 0.9,
      isFinal: true
    };
    const segments: TranscriptSegment[] = [
      { ...base, segmentId: 'one', speaker: 'wearer', text: 'Um hello world', startMs: 0, endMs: 1_000 },
      { ...base, segmentId: 'two', speaker: 'unknown', text: 'you know like this', startMs: 2_000, endMs: 3_000 },
      { ...base, segmentId: 'agent', speaker: 'agent', text: 'This is excluded', startMs: 7_000, endMs: 9_000 }
    ];

    assert.deepEqual(deriveSpeechMetrics(session, segments, Date.parse('2026-07-17T10:00:10.000Z')), {
      sessionId: session.sessionId,
      calculatedAtMs: 10_000,
      wordsPerMinute: 210,
      longestTurnMs: 3_000,
      currentSilenceMs: 7_000
    });
  });
});
