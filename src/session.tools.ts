import { ExecutionContext, ToolDecorator as Tool } from '@nitrostack/core';
import { loadRuntimeConfig } from './config.js';
import { sessionSearchInputSchema, sessionSearchResponseSchema, type SessionSearchInput } from './contracts/session-search.js';

export class SessionTools {
  @Tool({
    name: 'search_sessions',
    description: 'Find stored sessions by transcript keywords, date range, or lifecycle status.',
    inputSchema: sessionSearchInputSchema,
    outputSchema: sessionSearchResponseSchema,
    annotations: {
      readOnlyHint: true,
      idempotentHint: true,
      destructiveHint: false,
      openWorldHint: false
    }
  })
  async searchSessions(input: SessionSearchInput, context: ExecutionContext) {
    context.logger.info('Historical sessions searched', {
      boundary: 'mcp_tool_call',
      correlationId: crypto.randomUUID(),
      hasQuery: Boolean(input.query)
    });
    const response = await fetch(`${loadRuntimeConfig().BACKEND_URL}/v1/sessions/search`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(2_000)
    });
    if (!response.ok) throw new Error(`Backend session search failed (${response.status})`);
    return sessionSearchResponseSchema.parse(await response.json());
  }
}
