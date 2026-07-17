import { ExecutionContext, ToolDecorator as Tool, z } from '@nitrostack/core';

export class PhaseZeroTools {
  @Tool({
    name: 'phase_zero_probe',
    description: 'Confirm that the wearable coach MCP server is reachable from NitroStudio.',
    inputSchema: z.object({ message: z.string().min(1).max(100) }),
    outputSchema: z.object({ ok: z.boolean(), echoed: z.string(), checkedAt: z.string() }),
    annotations: {
      readOnlyHint: true,
      idempotentHint: true,
      destructiveHint: false,
      openWorldHint: false
    }
  })
  async probe(
    input: { message: string },
    context: ExecutionContext
  ): Promise<{ ok: boolean; echoed: string; checkedAt: string }> {
    context.logger.info('Phase 0 probe called', { message: input.message });
    return { ok: true, echoed: input.message, checkedAt: new Date().toISOString() };
  }
}
