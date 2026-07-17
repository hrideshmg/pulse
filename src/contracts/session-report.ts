import { z } from 'zod';
import { sessionSchema, speechMetricSnapshotSchema, stressSignalSchema, vitalSampleSchema } from './domain.js';
import { stressTransitionSchema } from './vitals-resources.js';

const id = z.string().min(1).max(128);
const reportSessionSchema = sessionSchema.omit({ simulatedVitals: true }).strict();
const reportVitalSampleSchema = vitalSampleSchema.omit({ source: true }).strict();
const reportTranscriptSegmentSchema = z.object({
  sessionId: id,
  segmentId: id,
  text: z.string().min(1).max(20_000),
  startMs: z.number().int().nonnegative(),
  endMs: z.number().int().nonnegative(),
  providerTimestamp: z.string().datetime({ offset: true }),
  confidence: z.number().min(0).max(1).nullable(),
  isFinal: z.boolean()
}).strict().refine(({ startMs, endMs }) => endMs >= startMs, {
  message: 'endMs must be greater than or equal to startMs',
  path: ['endMs']
});
const reportStressTransitionSchema = stressTransitionSchema.omit({ signal: true }).extend({
  signal: stressSignalSchema.omit({ evidence: true }).strict()
}).strict();

export const stressEpisodeSchema = z.object({
  episodeId: id,
  startedAtMs: z.number().int().nonnegative(),
  recoveringAtMs: z.number().int().nonnegative().nullable(),
  endedAtMs: z.number().int().nonnegative().nullable(),
  recoveryTimeMs: z.number().int().nonnegative().nullable(),
  transitionIds: z.array(id).min(1)
}).strict();

export const reportTimelineItemSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('vital'),
    atMs: z.number().int().nonnegative(),
    evidenceId: id,
    sample: reportVitalSampleSchema
  }).strict(),
  z.object({
    kind: z.literal('stress_transition'),
    atMs: z.number().int().nonnegative(),
    evidenceId: id,
    transition: reportStressTransitionSchema
  }).strict(),
  z.object({
    kind: z.literal('transcript'),
    atMs: z.number().int().nonnegative(),
    evidenceId: id,
    segment: reportTranscriptSegmentSchema
  }).strict(),
  z.object({
    kind: z.literal('speech_metrics'),
    atMs: z.number().int().nonnegative(),
    evidenceId: id,
    metrics: speechMetricSnapshotSchema
  }).strict()
]);

export const sessionReportSchema = z.object({
  reportVersion: z.literal('1.0'),
  session: reportSessionSchema,
  durationMs: z.number().int().nonnegative(),
  summary: z.object({
    averageBpm: z.number().positive().max(300).nullable(),
    minimumBpm: z.number().positive().max(300).nullable(),
    maximumBpm: z.number().positive().max(300).nullable(),
    paceWordsPerMinute: z.number().nonnegative(),
    stressEpisodeCount: z.number().int().nonnegative(),
    averageRecoveryTimeMs: z.number().nonnegative().nullable(),
    vitalEvidenceIds: z.array(id),
    transcriptEvidenceIds: z.array(id)
  }).strict(),
  stressEpisodes: z.array(stressEpisodeSchema),
  timeline: z.array(reportTimelineItemSchema),
  limitations: z.array(z.enum([
    'heart_rate_unavailable',
    'transcript_unavailable',
    'audio_playback_unavailable'
  ]))
}).strict();

export const generateSessionReportInputSchema = z.object({
  sessionId: id
}).strict();

export type StressEpisode = z.infer<typeof stressEpisodeSchema>;
export type ReportTimelineItem = z.infer<typeof reportTimelineItemSchema>;
export type SessionReport = z.infer<typeof sessionReportSchema>;
export type GenerateSessionReportInput = z.infer<typeof generateSessionReportInputSchema>;
