import { z } from 'zod';
import { sessionSchema, sessionStatusSchema } from './domain.js';

const timestamp = z.string().datetime({ offset: true });

export const sessionSearchInputSchema = z.object({
  query: z.string().trim().min(1).max(500).optional(),
  startedAfter: timestamp.optional(),
  startedBefore: timestamp.optional(),
  status: sessionStatusSchema.optional(),
  limit: z.number().int().min(1).max(50).default(10)
}).strict().refine(({ query, startedAfter, startedBefore, status }) =>
  Boolean(query || startedAfter || startedBefore || status), {
  message: 'At least one search term or filter is required'
});
export type SessionSearchInput = z.infer<typeof sessionSearchInputSchema>;

export const sessionSearchResultSchema = z.object({
  session: sessionSchema,
  transcriptExcerpt: z.string(),
  rank: z.number()
}).strict();

export const sessionSearchResponseSchema = z.object({
  results: z.array(sessionSearchResultSchema)
}).strict();
export type SessionSearchResponse = z.infer<typeof sessionSearchResponseSchema>;
