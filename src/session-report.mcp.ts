import {
  ExecutionContext,
  PromptDecorator as Prompt,
  ResourceDecorator as Resource,
  ToolDecorator as Tool,
  Widget
} from '@nitrostack/core';
import { loadRuntimeConfig } from './config.js';
import {
  generateSessionReportInputSchema,
  sessionReportSchema,
  type GenerateSessionReportInput,
  type SessionReport
} from './contracts/session-report.js';

const reportExample: SessionReport = {
  reportVersion: '1.0',
  session: {
    sessionId: 'session-review-001',
    status: 'completed',
    startedAt: '2026-07-17T10:00:00.000Z',
    endedAt: '2026-07-17T10:00:20.000Z',
    audioInputRoute: 'phone'
  },
  durationMs: 20_000,
  summary: {
    averageBpm: 88,
    minimumBpm: 72,
    maximumBpm: 108,
    paceWordsPerMinute: 126,
    stressEpisodeCount: 1,
    averageRecoveryTimeMs: 3_000,
    vitalEvidenceIds: ['session-review-001:vital:0:2026-07-17T10:00:00.000Z'],
    transcriptEvidenceIds: ['segment-review-001']
  },
  stressEpisodes: [{
    episodeId: 'session-review-001:9000:sustained_elevation',
    startedAtMs: 9_000,
    recoveringAtMs: 14_000,
    endedAtMs: 17_000,
    recoveryTimeMs: 3_000,
    transitionIds: [
      'session-review-001:9000:sustained_elevation',
      'session-review-001:14000:recovering',
      'session-review-001:17000:baseline'
    ]
  }],
  timeline: [{
    kind: 'vital',
    atMs: 0,
    evidenceId: 'session-review-001:vital:0:2026-07-17T10:00:00.000Z',
    sample: {
      sessionId: 'session-review-001',
      bpm: 72,
      availability: 'available',
      sessionElapsedMs: 0,
      deviceTimestamp: '2026-07-17T10:00:00.000Z'
    }
  }, {
    kind: 'transcript',
    atMs: 8_000,
    evidenceId: 'segment-review-001',
    segment: {
      sessionId: 'session-review-001',
      segmentId: 'segment-review-001',
      text: 'Let us review the delivery date and remaining risks.',
      startMs: 8_000,
      endMs: 11_500,
      providerTimestamp: '2026-07-17T10:00:11.500Z',
      confidence: 0.97,
      isFinal: true
    }
  }, {
    kind: 'speech_metrics',
    atMs: 20_000,
    evidenceId: 'session-review-001:speech-metrics',
    metrics: {
      sessionId: 'session-review-001',
      calculatedAtMs: 20_000,
      wordsPerMinute: 126,
      longestTurnMs: 3_500,
      currentSilenceMs: 8_500
    }
  }],
  limitations: ['audio_playback_unavailable']
};

export class SessionReportResources {
  @Resource({
    uri: 'session://{sessionId}/report',
    name: 'HR-synced session report',
    description: 'Deterministic session summary and chronological evidence timeline from stored vitals and transcript data.',
    mimeType: 'application/json',
    annotations: { audience: ['assistant'], priority: 1 }
  })
  async sessionReport(uri: string, context: ExecutionContext) {
    const sessionId = sessionIdFromReportUri(uri);
    context.logger.info('Session report resource read', {
      boundary: 'mcp_resource_read',
      correlationId: crypto.randomUUID(),
      resourceUri: uri,
      sessionId
    });
    return fetchReport(sessionId);
  }
}

export class SessionReportTools {
  @Tool({
    name: 'generate_session_report',
    title: 'Generate session report',
    description: 'Regenerate an evidence-only HR-synced report for one stored session.',
    inputSchema: generateSessionReportInputSchema,
    outputSchema: sessionReportSchema,
    annotations: {
      readOnlyHint: true,
      idempotentHint: true,
      destructiveHint: false,
      openWorldHint: false
    },
    invocation: {
      invoking: 'Aligning session evidence...',
      invoked: 'Session report ready'
    },
    examples: {
      request: { sessionId: 'session-review-001' },
      response: reportExample
    }
  })
  @Widget('session-report')
  async generateSessionReport(input: GenerateSessionReportInput, context: ExecutionContext) {
    context.logger.info('Session report generated', {
      boundary: 'mcp_tool_call',
      correlationId: crypto.randomUUID(),
      sessionId: input.sessionId
    });
    return fetchReport(input.sessionId);
  }
}

export class SessionReportPrompts {
  @Prompt({
    name: 'review_session',
    title: 'Review session',
    description: 'Review a stored session without making claims beyond its report evidence.',
    arguments: [{
      name: 'session_id',
      description: 'Stored session identifier to review',
      required: true
    }]
  })
  async reviewSession(args: { session_id: string }, context: ExecutionContext) {
    context.logger.info('Session review prompt requested', {
      boundary: 'mcp_prompt_read',
      correlationId: crypto.randomUUID(),
      sessionId: args.session_id
    });
    return [{
      role: 'user' as const,
      content: {
        type: 'text' as const,
        text: `Call generate_session_report for session ${args.session_id}. Review its pace, stress episodes, recovery times, and aligned transcript moments. Cite transcript segment IDs for quotations and vital evidence IDs for heart-rate claims. State applicable report limitations and do not infer events that are absent from the timeline.`
      }
    }];
  }
}

async function fetchReport(sessionId: string): Promise<SessionReport> {
  const response = await fetch(
    `${loadRuntimeConfig().BACKEND_URL}/v1/sessions/${encodeURIComponent(sessionId)}/report`,
    { signal: AbortSignal.timeout(2_000) }
  );
  if (!response.ok) throw new Error(`Backend session report request failed (${response.status})`);
  return sessionReportSchema.parse(await response.json());
}

function sessionIdFromReportUri(uri: string): string {
  const match = uri.match(/^session:\/\/([^/]+)\/report$/);
  if (!match) throw new Error(`Invalid session report URI: ${uri}`);
  return decodeURIComponent(match[1]);
}
