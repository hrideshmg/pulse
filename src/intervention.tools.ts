import { ExecutionContext, ToolDecorator as Tool, Widget } from '@nitrostack/core';
import { loadRuntimeConfig } from './config.js';
import {
  hapticNudgeInputSchema,
  interventionDeliveryReceiptSchema,
  type InterventionDeliveryReceipt,
  type HapticNudgeInput,
  type WhisperCoachInput,
  whisperCoachInputSchema
} from './intervention-delivery.js';

export class InterventionTools {
  @Tool({
    name: 'haptic_nudge',
    description: 'Request a calming watch haptic and return a delivery receipt the MCP client can trace.',
    inputSchema: hapticNudgeInputSchema,
    outputSchema: interventionDeliveryReceiptSchema,
    invocation: {
      invoking: 'Requesting watch haptic...',
      invoked: 'Haptic receipt ready'
    },
    examples: {
      request: {
        sessionId: 'session-demo-001',
        pattern: 'double_tap',
        reason: 'Interrupt the start of a stress spiral.',
        correlationId: 'corr-haptic-demo-001'
      },
      response: {
        sessionId: 'session-demo-001',
        interventionId: 'int-haptic-demo-001',
        toolName: 'haptic_nudge',
        correlationId: 'corr-haptic-demo-001',
        requestedAt: '2026-07-17T10:14:03.000Z',
        commandStatus: 'delivered',
        deliveryResult: 'delivered',
        simulated: true,
        consentCheck: {
          scope: 'act:haptic',
          allowed: true,
          checkedAt: '2026-07-17T10:14:03.000Z',
          reason: null
        },
        target: {
          channel: 'watch_haptics',
          pattern: 'double_tap',
          message: null
        },
        deliveryAcknowledgement: {
          status: 'acknowledged',
          acknowledgedAt: '2026-07-17T10:14:04.000Z',
          detail: 'Simulated watch acknowledged the calming double tap pattern.'
        }
      }
    },
    annotations: {
      readOnlyHint: false,
      idempotentHint: false,
      destructiveHint: false,
      openWorldHint: false
    }
  })
  @Widget('intervention-delivery-receipt')
  async hapticNudge(input: HapticNudgeInput, context: ExecutionContext): Promise<InterventionDeliveryReceipt> {
    return buildReceipt({
      context,
      sessionId: input.sessionId,
      toolName: 'haptic_nudge',
      consentScope: 'act:haptic',
      correlationId: input.correlationId,
      target: {
        channel: 'watch_haptics',
        pattern: input.pattern,
        message: null
      }
    });
  }

  @Tool({
    name: 'whisper_coach',
    description: 'Queue a short whispered coaching line and return a delivery receipt the MCP client can trace.',
    inputSchema: whisperCoachInputSchema,
    outputSchema: interventionDeliveryReceiptSchema,
    invocation: {
      invoking: 'Queueing private coaching line...',
      invoked: 'Whisper receipt ready'
    },
    examples: {
      request: {
        sessionId: 'session-demo-001',
        message: 'Slow your breath. Pause before you answer.',
        correlationId: 'corr-whisper-demo-001'
      },
      response: {
        sessionId: 'session-demo-001',
        interventionId: 'int-whisper-demo-001',
        toolName: 'whisper_coach',
        correlationId: 'corr-whisper-demo-001',
        requestedAt: '2026-07-17T10:14:12.000Z',
        commandStatus: 'delivered',
        deliveryResult: 'delivered',
        simulated: true,
        consentCheck: {
          scope: 'act:audio',
          allowed: true,
          checkedAt: '2026-07-17T10:14:12.000Z',
          reason: null
        },
        target: {
          channel: 'earbud_tts',
          pattern: null,
          message: 'Slow your breath. Pause before you answer.'
        },
        deliveryAcknowledgement: {
          status: 'acknowledged',
          acknowledgedAt: '2026-07-17T10:14:14.000Z',
          detail: 'Simulated earbud playback completed without re-entering the transcript.'
        }
      }
    },
    annotations: {
      readOnlyHint: false,
      idempotentHint: false,
      destructiveHint: false,
      openWorldHint: false
    }
  })
  @Widget('intervention-delivery-receipt')
  async whisperCoach(input: WhisperCoachInput, context: ExecutionContext): Promise<InterventionDeliveryReceipt> {
    return buildReceipt({
      context,
      sessionId: input.sessionId,
      toolName: 'whisper_coach',
      consentScope: 'act:audio',
      correlationId: input.correlationId,
      target: {
        channel: 'earbud_tts',
        pattern: null,
        message: input.message
      }
    });
  }
}

type ToolName = InterventionDeliveryReceipt['toolName'];
type ConsentScope = InterventionDeliveryReceipt['consentCheck']['scope'];
type Target = InterventionDeliveryReceipt['target'];

function buildReceipt({
  context,
  sessionId,
  toolName,
  consentScope,
  correlationId,
  target
}: {
  context: ExecutionContext;
  sessionId: string;
  toolName: ToolName;
  consentScope: ConsentScope;
  correlationId?: string;
  target: Target;
}): InterventionDeliveryReceipt {
  const config = loadRuntimeConfig();
  const now = new Date().toISOString();
  const receiptCorrelationId = correlationId ?? crypto.randomUUID();
  const simulated = config.DEVICE_ACTIONS !== 'real';
  const interventionId = `int-${crypto.randomUUID()}`;

  context.logger.info('Intervention tool called', {
    boundary: 'mcp_tool_call',
    sessionId,
    toolName,
    consentScope,
    correlationId: receiptCorrelationId,
    simulated,
    target
  });

  if (!simulated) {
    return {
      sessionId,
      interventionId,
      toolName,
      correlationId: receiptCorrelationId,
      requestedAt: now,
      commandStatus: 'queued',
      deliveryResult: 'pending',
      simulated: false,
      consentCheck: {
        scope: consentScope,
        allowed: true,
        checkedAt: now,
        reason: null
      },
      target,
      deliveryAcknowledgement: {
        status: 'pending',
        acknowledgedAt: null,
        detail: 'Real device delivery is not wired yet; the command has been accepted for future backend dispatch.'
      }
    };
  }

  return {
    sessionId,
    interventionId,
    toolName,
    correlationId: receiptCorrelationId,
    requestedAt: now,
    commandStatus: 'delivered',
    deliveryResult: 'delivered',
    simulated: true,
    consentCheck: {
      scope: consentScope,
      allowed: true,
      checkedAt: now,
      reason: null
    },
    target,
    deliveryAcknowledgement: {
      status: 'acknowledged',
      acknowledgedAt: new Date(Date.now() + 1_000).toISOString(),
      detail: toolName === 'haptic_nudge'
        ? 'Simulated watch haptic completed and acknowledged once.'
        : 'Simulated private whisper playback completed without re-entering capture.'
    }
  };
}
