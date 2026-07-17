import { ExecutionContext, ResourceDecorator as Resource } from '@nitrostack/core';

const vitals = {
  sessionId: 'demo-session',
  bpm: 112,
  availability: 'available',
  source: 'simulator',
  sampledAt: '2026-07-17T14:32:15.000Z',
  freshness: 'live',
  simulated: true,
  window: [78, 82, 88, 95, 104, 112]
};

const stress = {
  sessionId: 'demo-session',
  state: 'sustained_elevation',
  baselineBpm: 72,
  currentDelta: 40,
  elevationStartedAt: '2026-07-17T14:30:01.000Z',
  elevationDurationSeconds: 134,
  cooldownActive: false,
  evidence: {
    sampleCount: 6,
    minimumBpm: 95,
    maximumBpm: 112
  }
};

const transcript = {
  sessionId: 'demo-session',
  segments: [
    {
      segmentId: 'segment-1',
      speaker: 'participant',
      text: 'Can you give us a ceiling on the enterprise pricing?',
      startSeconds: 42,
      endSeconds: 48,
      confidence: 0.96,
      final: true
    },
    {
      segmentId: 'segment-2',
      speaker: 'wearer',
      text: 'Yes. The enterprise tier includes a usage cap and dedicated support.',
      startSeconds: 49,
      endSeconds: 57,
      confidence: 0.94,
      final: true
    }
  ],
  updatedAt: '2026-07-17T14:32:15.000Z'
};

export class PulseResources {
  @Resource({
    uri: 'session://current/vitals',
    name: 'Current Vitals',
    description: 'Latest heart rate, sensor availability, freshness, source, and rolling sample window.',
    mimeType: 'application/json',
    annotations: { audience: ['assistant', 'user'], priority: 1 }
  })
  async getVitals(_uri: string, context: ExecutionContext) {
    context.logger.info('Current vitals resource read');
    return vitals;
  }

  @Resource({
    uri: 'session://current/stress',
    name: 'Current Stress Signal',
    description: 'Derived sustained-elevation state with baseline, duration, and supporting evidence.',
    mimeType: 'application/json',
    annotations: { audience: ['assistant', 'user'], priority: 1 }
  })
  async getStress(_uri: string, context: ExecutionContext) {
    context.logger.info('Current stress resource read');
    return stress;
  }

  @Resource({
    uri: 'session://current/context',
    name: 'Session Context',
    description: 'Wearer background, current situation, participants, goals, and topics to avoid.',
    mimeType: 'application/json',
    annotations: { audience: ['assistant'], priority: 0.9 }
  })
  async getContext(_uri: string, context: ExecutionContext) {
    context.logger.info('Session context resource read');
    return {
      sessionId: 'demo-session',
      wearerSummary: 'Senior software engineer who tends to speak quickly under pressure.',
      situation: 'Enterprise sales pitch during the pricing discussion.',
      participants: ['Client CTO', 'Client procurement lead'],
      goals: ['Explain enterprise value', 'Reach agreement on pricing'],
      topicsToAvoid: ['Uncommitted delivery dates'],
      simulated: true
    };
  }

  @Resource({
    uri: 'session://current/transcript',
    name: 'Current Transcript',
    description: 'Rolling window of finalized, speaker-labelled transcript segments.',
    mimeType: 'application/json',
    annotations: { audience: ['assistant', 'user'], priority: 0.9 }
  })
  async getTranscript(_uri: string, context: ExecutionContext) {
    context.logger.info('Current transcript resource read');
    return transcript;
  }

  @Resource({
    uri: 'session://current/speech-metrics',
    name: 'Speech Metrics',
    description: 'Current speaking pace, filler rate, turn length, and silence duration.',
    mimeType: 'application/json',
    annotations: { audience: ['assistant', 'user'], priority: 0.8 }
  })
  async getSpeechMetrics(_uri: string, context: ExecutionContext) {
    context.logger.info('Speech metrics resource read');
    return {
      sessionId: 'demo-session',
      wordsPerMinute: 168,
      fillersPerMinute: 3.2,
      longestTurnSeconds: 28,
      currentSilenceSeconds: 2,
      calculatedAt: '2026-07-17T14:32:15.000Z'
    };
  }

  @Resource({
    uri: 'session://current/report',
    name: 'Current Session Report',
    description: 'Evidence-linked summary aligning vitals, transcript, stress changes, and interventions.',
    mimeType: 'application/json',
    annotations: { audience: ['assistant', 'user'], priority: 0.8 }
  })
  async getReport(_uri: string, context: ExecutionContext) {
    context.logger.info('Current session report resource read');
    return {
      sessionId: 'demo-session',
      status: 'active',
      averageBpm: 88,
      peakBpm: 112,
      stressEpisodes: 1,
      interventions: [],
      vitals: vitals.window.map((bpm, index) => ({ seconds: index * 10, bpm })),
      transcriptSegments: transcript.segments,
      simulated: true
    };
  }

  @Resource({
    uri: 'session://current/audit',
    name: 'Session Audit Log',
    description: 'Append-only record of MCP resource reads and tool calls for the current session.',
    mimeType: 'application/json',
    annotations: { audience: ['assistant', 'user'], priority: 0.9 }
  })
  async getAudit(_uri: string, context: ExecutionContext) {
    context.logger.info('Session audit resource read');
    return {
      sessionId: 'demo-session',
      entries: [
        {
          auditId: 'audit-1',
          timestamp: '2026-07-17T14:32:15.000Z',
          kind: 'resource_read',
          subject: 'session://current/vitals',
          consentScope: 'read:vitals',
          consentResult: 'granted',
          outcome: 'success'
        }
      ],
      simulated: true
    };
  }

  @Resource({
    uri: 'device://watch/status',
    name: 'Watch Status',
    description: 'Pixel Watch connectivity, battery, sensor availability, and session state.',
    mimeType: 'application/json',
    annotations: { audience: ['assistant', 'user'], priority: 0.7 }
  })
  async getWatchStatus(_uri: string, context: ExecutionContext) {
    context.logger.info('Watch status resource read');
    return {
      connected: true,
      name: 'Pixel Watch',
      batteryLevel: 78,
      heartRateAvailable: true,
      sessionState: 'active',
      simulated: true
    };
  }

  @Resource({
    uri: 'device://audio/status',
    name: 'Audio Status',
    description: 'Microphone input, playback route, transcription mode, and connection status.',
    mimeType: 'application/json',
    annotations: { audience: ['assistant', 'user'], priority: 0.7 }
  })
  async getAudioStatus(_uri: string, context: ExecutionContext) {
    context.logger.info('Audio status resource read');
    return {
      connected: true,
      inputRoute: 'phone',
      playbackRoute: 'earbuds',
      transcriptionMode: 'fixture',
      captureActive: true,
      simulated: true
    };
  }
}
