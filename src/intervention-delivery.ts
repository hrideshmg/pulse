import { z } from 'zod';
import { consentScopeSchema } from './contracts/domain.js';

const id = z.string().min(1).max(128);
const timestamp = z.string().datetime({ offset: true });

export const hapticNudgeInputSchema = z.object({
  sessionId: id,
  pattern: z.enum(['double_tap', 'steady_pulse', 'grounding_ramp']),
  reason: z.string().min(1).max(500).optional(),
  correlationId: id.optional()
}).strict();

export const whisperCoachInputSchema = z.object({
  sessionId: id,
  message: z.string().min(1).max(160),
  correlationId: id.optional()
}).strict().refine(({ message }) => message.trim().split(/\s+/).length <= 24, {
  message: 'message must be 24 words or fewer',
  path: ['message']
});

export const interventionDeliveryReceiptSchema = z.object({
  sessionId: id,
  interventionId: id,
  toolName: z.enum(['haptic_nudge', 'whisper_coach']),
  correlationId: id,
  requestedAt: timestamp,
  commandStatus: z.enum(['queued', 'dispatched', 'delivered', 'denied', 'failed', 'expired']),
  deliveryResult: z.enum(['pending', 'delivered', 'expired', 'cancelled', 'failed', 'denied']),
  simulated: z.boolean(),
  consentCheck: z.object({
    scope: consentScopeSchema,
    allowed: z.boolean(),
    checkedAt: timestamp,
    reason: z.string().max(500).nullable()
  }).strict(),
  target: z.object({
    channel: z.enum(['watch_haptics', 'earbud_tts']),
    pattern: z.string().max(100).nullable(),
    message: z.string().max(500).nullable()
  }).strict(),
  deliveryAcknowledgement: z.object({
    status: z.enum(['pending', 'acknowledged', 'unavailable', 'failed']),
    acknowledgedAt: timestamp.nullable(),
    detail: z.string().min(1).max(500)
  }).strict()
}).strict();

export type HapticNudgeInput = z.infer<typeof hapticNudgeInputSchema>;
export type WhisperCoachInput = z.infer<typeof whisperCoachInputSchema>;
export type InterventionDeliveryReceipt = z.infer<typeof interventionDeliveryReceiptSchema>;
