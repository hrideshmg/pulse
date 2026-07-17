import { ExecutionContext, ResourceDecorator as Resource } from '@nitrostack/core';
import { z } from 'zod';
import { loadRuntimeConfig } from './config.js';
import { sessionSchema, transcriptSegmentSchema } from './contracts/domain.js';

const currentTranscriptSchema = z.object({
  session: sessionSchema.nullable(),
  segments: z.array(transcriptSegmentSchema)
}).strict();

export class TranscriptResources {
  @Resource({
    uri: 'session://current/transcript',
    name: 'Current session transcript',
    description: 'Final transcript segments from the active session, ordered on its monotonic timeline.',
    mimeType: 'application/json',
    annotations: { audience: ['assistant'], priority: 1 }
  })
  async currentTranscript(uri: string, context: ExecutionContext) {
    const correlationId = crypto.randomUUID();
    context.logger.info('Transcript resource read', {
      boundary: 'mcp_resource_read',
      correlationId,
      resourceUri: uri
    });
    const config = loadRuntimeConfig();
    const response = await fetch(`${config.BACKEND_URL}/v1/sessions/current/transcript`, {
      signal: AbortSignal.timeout(2_000)
    });
    if (!response.ok) throw new Error(`Backend transcript request failed (${response.status})`);
    const transcript = currentTranscriptSchema.parse(await response.json());
    return {
      contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(transcript, null, 2) }]
    };
  }
}
