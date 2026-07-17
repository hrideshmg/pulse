import type { Session, SpeechMetricSnapshot, TranscriptSegment } from '../contracts/domain.js';

const TURN_GAP_MS = 1_500;

export function deriveSpeechMetrics(
  session: Session,
  segments: readonly TranscriptSegment[],
  nowEpochMs = Date.now()
): SpeechMetricSnapshot {
  const speech = segments.filter(({ isFinal, speaker }) => isFinal && (speaker === 'wearer' || speaker === 'unknown'));
  const calculatedAtMs = sessionElapsedMs(session, speech, nowEpochMs);
  if (speech.length === 0) {
    return {
      sessionId: session.sessionId,
      calculatedAtMs,
      wordsPerMinute: 0,
      longestTurnMs: 0,
      currentSilenceMs: calculatedAtMs
    };
  }

  let wordCount = 0;
  let speakingDurationMs = 0;
  for (const segment of speech) {
    const words = segment.text.toLowerCase().match(/[\p{L}\p{N}']+/gu) ?? [];
    wordCount += words.length;
    speakingDurationMs += Math.max(0, segment.endMs - segment.startMs);
  }

  return {
    sessionId: session.sessionId,
    calculatedAtMs,
    wordsPerMinute: perMinute(wordCount, speakingDurationMs),
    longestTurnMs: longestTurn(speech),
    currentSilenceMs: Math.max(0, calculatedAtMs - speech.at(-1)!.endMs)
  };
}

function sessionElapsedMs(session: Session, segments: readonly TranscriptSegment[], nowEpochMs: number): number {
  const latestSegmentMs = segments.at(-1)?.endMs ?? 0;
  if (!session.startedAt) return latestSegmentMs;
  const endEpochMs = session.endedAt ? Date.parse(session.endedAt) : nowEpochMs;
  return Math.max(latestSegmentMs, endEpochMs - Date.parse(session.startedAt), 0);
}

function perMinute(count: number, durationMs: number): number {
  return durationMs > 0 ? count * 60_000 / durationMs : 0;
}

function longestTurn(segments: readonly TranscriptSegment[]): number {
  let longest = 0;
  let turnStart = segments[0].startMs;
  let turnEnd = segments[0].endMs;
  for (const segment of segments.slice(1)) {
    if (segment.startMs - turnEnd <= TURN_GAP_MS) {
      turnEnd = Math.max(turnEnd, segment.endMs);
    } else {
      longest = Math.max(longest, turnEnd - turnStart);
      turnStart = segment.startMs;
      turnEnd = segment.endMs;
    }
  }
  return Math.max(longest, turnEnd - turnStart);
}
