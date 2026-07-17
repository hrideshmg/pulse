import { z } from 'zod';
import { sessionSchema, stressSignalSchema, vitalSampleSchema } from './domain.js';

export const vitalFreshnessSchema = z.object({
  status: z.enum(['live', 'stale']),
  observedAt: z.string().datetime({ offset: true }),
  ageMs: z.number().int().nonnegative(),
  staleAfterMs: z.number().int().positive()
}).strict();

export const currentVitalsResponseSchema = z.object({
  session: sessionSchema,
  consentAllowed: z.boolean(),
  latest: vitalSampleSchema.nullable(),
  freshness: vitalFreshnessSchema.nullable(),
  window: z.array(vitalSampleSchema).max(30)
}).strict();
export type CurrentVitalsResponse = z.infer<typeof currentVitalsResponseSchema>;

export const currentStressSignalSchema = stressSignalSchema.omit({ evidence: true }).strict();

export const currentStressResponseSchema = z.object({
  session: sessionSchema,
  consentAllowed: z.boolean(),
  signal: currentStressSignalSchema.nullable()
}).strict();
export type CurrentStressResponse = z.infer<typeof currentStressResponseSchema>;

export const stressTransitionSchema = z.object({
  transitionId: z.string().min(1).max(256),
  sessionId: z.string().min(1).max(128),
  previousState: stressSignalSchema.shape.state.nullable(),
  state: stressSignalSchema.shape.state,
  occurredAtMs: z.number().int().nonnegative(),
  signal: stressSignalSchema
}).strict();
export type StressTransition = z.infer<typeof stressTransitionSchema>;
