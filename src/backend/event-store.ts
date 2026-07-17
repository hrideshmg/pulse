import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import Database from 'better-sqlite3';
import type { ConsentGrant, ConsentScope, Session, SessionContext, SpeechMetricSnapshot, StressSignal, TranscriptSegment, VitalSample } from '../contracts/domain.js';
import { sessionContextSchema, sessionSchema, speechMetricSnapshotSchema, transcriptSegmentSchema, vitalSampleSchema } from '../contracts/domain.js';
import type { EventAcknowledgement, PulseEvent } from '../contracts/events.js';
import { pulseEventSchema } from '../contracts/events.js';
import type { SessionSearchInput, SessionSearchResponse } from '../contracts/session-search.js';
import type { StressTransition } from '../contracts/vitals-resources.js';
import { stressSignalSchema } from '../contracts/domain.js';
import { stressTransitionSchema } from '../contracts/vitals-resources.js';
import { assertSessionTransition } from '../contracts/lifecycle.js';
import type { StructuredLogger } from '../observability/logger.js';
import { deriveStressTimeline } from './stress-engine.js';
import { deriveSpeechMetrics } from './speech-metrics.js';
import { deriveSessionReport } from './session-report.js';
import type { SessionReport } from '../contracts/session-report.js';

interface JsonRow { json: string }
interface SearchRow { session_json: string; transcript_excerpt: string; rank: number }

export class EventStore {
  private readonly database: Database.Database;

  constructor(private readonly logger: StructuredLogger, databasePath = ':memory:') {
    if (databasePath !== ':memory:') mkdirSync(dirname(databasePath), { recursive: true });
    this.database = new Database(databasePath);
    this.database.pragma('foreign_keys = ON');
    this.database.pragma('busy_timeout = 5000');
    this.database.pragma('journal_mode = WAL');
    this.migrate();
  }

  ingest(event: PulseEvent): EventAcknowledgement {
    if (this.database.prepare('SELECT 1 FROM events WHERE event_id = ?').get(event.eventId)) {
      this.logger.info('Duplicate event ignored', this.logContext(event));
      return this.acknowledge(event, true);
    }

    this.database.transaction(() => {
      this.applySessionRules(event);
      this.database.prepare(`
        INSERT INTO events (event_id, session_id, type, timestamp, correlation_id, json)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(event.eventId, event.sessionId, event.type, event.timestamp, event.correlationId, JSON.stringify(event));

      if (event.type === 'vital_sample_received') {
        this.database.prepare(`
          INSERT INTO vital_samples (event_id, session_id, session_elapsed_ms, device_timestamp, json)
          VALUES (?, ?, ?, ?, ?)
        `).run(event.eventId, event.sessionId, event.payload.sessionElapsedMs,
          event.payload.deviceTimestamp, JSON.stringify(event.payload));
        this.rebuildStressTimeline(event.sessionId);
        this.persistSpeechMetrics(event.sessionId);
      }
      if (event.type === 'transcript_segment_received' && event.payload.isFinal) {
        this.database.prepare(`
          INSERT INTO transcript_segments (event_id, segment_id, session_id, start_ms, end_ms, json)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(event.eventId, event.payload.segmentId, event.sessionId, event.payload.startMs,
          event.payload.endMs, JSON.stringify(event.payload));
        this.database.prepare(`
          INSERT INTO transcript_search (session_id, segment_id, text) VALUES (?, ?, ?)
        `).run(event.sessionId, event.payload.segmentId, event.payload.text);
        this.persistSpeechMetrics(event.sessionId);
      }
      if (event.type === 'session_context_updated') {
        this.storeContext(event.payload);
        this.rebuildStressTimeline(event.sessionId);
      }
      if (event.type === 'consent_updated') {
        this.database.prepare(`
          INSERT INTO consent_grants (grant_id, session_id, scope, granted_at, revoked_at, json)
          VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT(grant_id) DO UPDATE SET revoked_at = excluded.revoked_at, json = excluded.json
        `).run(event.payload.grantId, event.sessionId, event.payload.scope, event.payload.grantedAt,
          event.payload.revokedAt, JSON.stringify(event.payload));
      }
      if (event.type === 'session_ended') this.persistSpeechMetrics(event.sessionId);
    })();

    this.logger.info('Boundary event accepted', this.logContext(event));
    return this.acknowledge(event, false);
  }

  getEvents(sessionId: string): readonly PulseEvent[] {
    return (this.database.prepare('SELECT json FROM events WHERE session_id = ? ORDER BY rowid').all(sessionId) as JsonRow[])
      .map(({ json }) => pulseEventSchema.parse(JSON.parse(json)));
  }

  getSession(sessionId: string): Session | undefined {
    const row = this.database.prepare('SELECT json FROM sessions WHERE session_id = ?').get(sessionId) as JsonRow | undefined;
    return row ? sessionSchema.parse(JSON.parse(row.json)) : undefined;
  }

  getVitalSamples(sessionId: string): readonly VitalSample[] {
    return (this.database.prepare(`
      SELECT json FROM vital_samples WHERE session_id = ? ORDER BY session_elapsed_ms, device_timestamp
    `).all(sessionId) as JsonRow[]).map(({ json }) => vitalSampleSchema.parse(JSON.parse(json)));
  }

  getLatestVitalObservedAt(sessionId: string): string | undefined {
    const row = this.database.prepare(`
      SELECT e.timestamp AS observed_at
      FROM vital_samples v JOIN events e ON e.event_id = v.event_id
      WHERE v.session_id = ? ORDER BY v.session_elapsed_ms DESC, v.device_timestamp DESC LIMIT 1
    `).get(sessionId) as { observed_at: string } | undefined;
    return row?.observed_at;
  }

  getStressSignal(sessionId: string): StressSignal | undefined {
    return deriveStressTimeline(
      sessionId,
      this.getVitalSamples(sessionId),
      this.getContext(sessionId)?.stressSensitivity
    ).signal;
  }

  getStressTransitions(sessionId: string): readonly StressTransition[] {
    return (this.database.prepare(`
      SELECT json FROM stress_signal_events WHERE session_id = ? ORDER BY occurred_at_ms, rowid
    `).all(sessionId) as JsonRow[]).map(({ json }) => stressTransitionSchema.parse(JSON.parse(json)));
  }

  hasActiveConsent(sessionId: string, scope: ConsentScope, at = new Date()): boolean {
    const rows = this.database.prepare(`
      SELECT json FROM consent_grants WHERE session_id = ? AND scope = ?
    `).all(sessionId, scope) as JsonRow[];
    return rows.some(({ json }) => {
      const grant = JSON.parse(json) as ConsentGrant;
      return new Date(grant.grantedAt) <= at && (grant.revokedAt === null || new Date(grant.revokedAt) > at);
    });
  }

  getTranscriptSegments(sessionId: string): readonly TranscriptSegment[] {
    return (this.database.prepare(`
      SELECT json FROM transcript_segments WHERE session_id = ? ORDER BY start_ms, segment_id
    `).all(sessionId) as JsonRow[]).map(({ json }) => transcriptSegmentSchema.parse(JSON.parse(json)));
  }

  getLatestTranscript(): { session: Session; segment: TranscriptSegment } | undefined {
    const row = this.database.prepare(`
      SELECT s.json AS session_json, t.json AS segment_json
      FROM transcript_segments t
      JOIN events e ON e.event_id = t.event_id
      JOIN sessions s ON s.session_id = t.session_id
      ORDER BY e.rowid DESC LIMIT 1
    `).get() as { session_json: string; segment_json: string } | undefined;
    return row ? {
      session: sessionSchema.parse(JSON.parse(row.session_json)),
      segment: transcriptSegmentSchema.parse(JSON.parse(row.segment_json))
    } : undefined;
  }

  getSpeechMetrics(sessionId: string, nowEpochMs = Date.now()): SpeechMetricSnapshot | undefined {
    const session = this.getSession(sessionId);
    return session ? deriveSpeechMetrics(session, this.getTranscriptSegments(sessionId), nowEpochMs) : undefined;
  }

  getPersistedSpeechMetrics(sessionId: string): SpeechMetricSnapshot | undefined {
    const row = this.database.prepare('SELECT json FROM speech_metric_snapshots WHERE session_id = ?')
      .get(sessionId) as JsonRow | undefined;
    return row ? speechMetricSnapshotSchema.parse(JSON.parse(row.json)) : undefined;
  }

  getSessionReport(sessionId: string): SessionReport | undefined {
    const session = this.getSession(sessionId);
    if (!session) return undefined;
    const metrics = this.getPersistedSpeechMetrics(sessionId) ?? this.deriveStoredSpeechMetrics(session);
    return deriveSessionReport({
      session,
      vitals: this.getVitalSamples(sessionId),
      transitions: this.getStressTransitions(sessionId),
      segments: this.getTranscriptSegments(sessionId),
      metrics
    });
  }

  getContext(sessionId: string): SessionContext | undefined {
    const row = this.database.prepare('SELECT json FROM session_contexts WHERE session_id = ?').get(sessionId) as JsonRow | undefined;
    return row ? sessionContextSchema.parse(JSON.parse(row.json)) : undefined;
  }

  getCurrentSession(): Session | undefined {
    const row = this.database.prepare(`
      SELECT json FROM sessions
      WHERE status IN ('calibrating', 'active', 'ending')
      ORDER BY started_at DESC, rowid DESC LIMIT 1
    `).get() as JsonRow | undefined;
    return row ? sessionSchema.parse(JSON.parse(row.json)) : undefined;
  }

  searchSessions(input: SessionSearchInput): SessionSearchResponse {
    const clauses: string[] = [];
    const parameters: unknown[] = [];
    let from = 'sessions s';
    let excerpt = `COALESCE((
      SELECT json_extract(t.json, '$.text') FROM transcript_segments t
      WHERE t.session_id = s.session_id ORDER BY t.start_ms DESC LIMIT 1
    ), '')`;
    let rank = '0';

    if (input.query) {
      from = 'transcript_search f JOIN sessions s ON s.session_id = f.session_id';
      clauses.push('transcript_search MATCH ?');
      parameters.push(toFtsQuery(input.query));
      rank = 'bm25(transcript_search)';
      excerpt = `snippet(transcript_search, 2, '[', ']', '...', 24)`;
    }
    if (input.startedAfter) {
      clauses.push('s.started_at >= ?');
      parameters.push(input.startedAfter);
    }
    if (input.startedBefore) {
      clauses.push('s.started_at <= ?');
      parameters.push(input.startedBefore);
    }
    if (input.status) {
      clauses.push('s.status = ?');
      parameters.push(input.status);
    }
    parameters.push(input.query ? input.limit * 20 : input.limit);

    const rows = this.database.prepare(`
      SELECT s.json AS session_json, ${excerpt} AS transcript_excerpt, ${rank} AS rank
      FROM ${from}
      WHERE ${clauses.join(' AND ')}
      ORDER BY rank, s.started_at DESC
      LIMIT ?
    `).all(...parameters) as SearchRow[];

    const seen = new Set<string>();
    const results = rows.flatMap((row) => {
      const session = sessionSchema.parse(JSON.parse(row.session_json));
      if (seen.has(session.sessionId)) return [];
      seen.add(session.sessionId);
      return [{ session, transcriptExcerpt: row.transcript_excerpt, rank: row.rank }];
    }).slice(0, input.limit);
    return { results };
  }

  transition(sessionId: string, status: Session['status']): Session {
    const session = this.getSession(sessionId);
    if (!session) throw new Error(`Unknown session: ${sessionId}`);
    assertSessionTransition(session.status, status);
    const updated: Session = {
      ...session,
      status,
      endedAt: status === 'completed' || status === 'failed' ? new Date().toISOString() : session.endedAt
    };
    this.updateSession(updated);
    return updated;
  }

  close(): void {
    if (this.database.open) this.database.close();
  }

  private applySessionRules(event: PulseEvent): void {
    if (event.type === 'session_started') {
      if (event.payload.session.sessionId !== event.sessionId) {
        throw new Error('Envelope and payload session IDs do not match');
      }
      if (this.getSession(event.sessionId)) throw new Error(`Session already exists: ${event.sessionId}`);
      this.insertSession(event.payload.session);
      return;
    }

    const session = this.getSession(event.sessionId);
    if (!session) throw new Error(`Unknown session: ${event.sessionId}`);
    if (session.status === 'completed' || session.status === 'failed') {
      throw new Error(`Session is terminal: ${event.sessionId} (${session.status})`);
    }
    if ('sessionId' in event.payload && event.payload.sessionId !== event.sessionId) {
      throw new Error('Envelope and payload session IDs do not match');
    }
    if (event.type === 'session_ended') {
      if (session.status !== 'ending') assertSessionTransition(session.status, 'ending');
      this.updateSession({
        ...session,
        status: event.payload.reason === 'failure' ? 'failed' : 'completed',
        endedAt: event.payload.endedAt
      });
    }
  }

  private insertSession(session: Session): void {
    this.database.prepare(`
      INSERT INTO sessions (session_id, status, started_at, ended_at, json) VALUES (?, ?, ?, ?, ?)
    `).run(session.sessionId, session.status, session.startedAt, session.endedAt, JSON.stringify(session));
  }

  private updateSession(session: Session): void {
    this.database.prepare(`
      UPDATE sessions SET status = ?, started_at = ?, ended_at = ?, json = ? WHERE session_id = ?
    `).run(session.status, session.startedAt, session.endedAt, JSON.stringify(session), session.sessionId);
  }

  private storeContext(context: SessionContext): void {
    const participants = context.participants.map(({ name, role }) => `${name} ${role}`).join(' ');
    const goals = context.goals.join(' ');
    const topics = context.topicsToAvoid.join(' ');
    this.database.prepare(`
      INSERT INTO session_contexts
        (session_id, wearer_summary, situation, participants_text, goals_text, topics_text, json)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(session_id) DO UPDATE SET
        wearer_summary = excluded.wearer_summary,
        situation = excluded.situation,
        participants_text = excluded.participants_text,
        goals_text = excluded.goals_text,
        topics_text = excluded.topics_text,
        json = excluded.json
    `).run(context.sessionId, context.wearerSummary, context.situation, participants, goals, topics, JSON.stringify(context));
    this.database.prepare('DELETE FROM context_search WHERE session_id = ?').run(context.sessionId);
    this.database.prepare(`
      INSERT INTO context_search (session_id, wearer_summary, situation, participants, goals, topics)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(context.sessionId, context.wearerSummary, context.situation, participants, goals, topics);
  }

  private migrate(): void {
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        session_id TEXT PRIMARY KEY,
        status TEXT NOT NULL,
        started_at TEXT,
        ended_at TEXT,
        json TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS events (
        event_id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        correlation_id TEXT NOT NULL,
        json TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS events_session_idx ON events(session_id, timestamp);
      CREATE TABLE IF NOT EXISTS vital_samples (
        event_id TEXT PRIMARY KEY REFERENCES events(event_id) ON DELETE CASCADE,
        session_id TEXT NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
        session_elapsed_ms INTEGER NOT NULL,
        device_timestamp TEXT NOT NULL,
        json TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS vitals_timeline_idx ON vital_samples(session_id, session_elapsed_ms);
      CREATE TABLE IF NOT EXISTS stress_signal_events (
        transition_id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
        occurred_at_ms INTEGER NOT NULL,
        state TEXT NOT NULL,
        json TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS stress_timeline_idx ON stress_signal_events(session_id, occurred_at_ms);
      CREATE TABLE IF NOT EXISTS transcript_segments (
        event_id TEXT PRIMARY KEY REFERENCES events(event_id) ON DELETE CASCADE,
        segment_id TEXT NOT NULL UNIQUE,
        session_id TEXT NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
        start_ms INTEGER NOT NULL,
        end_ms INTEGER NOT NULL,
        json TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS transcript_timeline_idx ON transcript_segments(session_id, start_ms);
      CREATE TABLE IF NOT EXISTS session_contexts (
        session_id TEXT PRIMARY KEY REFERENCES sessions(session_id) ON DELETE CASCADE,
        wearer_summary TEXT NOT NULL,
        situation TEXT NOT NULL,
        participants_text TEXT NOT NULL,
        goals_text TEXT NOT NULL,
        topics_text TEXT NOT NULL,
        json TEXT NOT NULL
      );
      CREATE VIRTUAL TABLE IF NOT EXISTS context_search USING fts5(
        session_id UNINDEXED, wearer_summary, situation, participants, goals, topics
      );
      CREATE VIRTUAL TABLE IF NOT EXISTS transcript_search USING fts5(
        session_id UNINDEXED, segment_id UNINDEXED, text
      );
      CREATE TABLE IF NOT EXISTS consent_grants (
        grant_id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
        scope TEXT NOT NULL,
        granted_at TEXT NOT NULL,
        revoked_at TEXT,
        json TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS speech_metric_snapshots (
        session_id TEXT PRIMARY KEY REFERENCES sessions(session_id) ON DELETE CASCADE,
        calculated_at_ms INTEGER NOT NULL,
        json TEXT NOT NULL
      );
      INSERT INTO transcript_search (session_id, segment_id, text)
      SELECT session_id, segment_id, json_extract(json, '$.text') FROM transcript_segments
      WHERE segment_id NOT IN (SELECT segment_id FROM transcript_search);
    `);
    const sessions = this.database.prepare('SELECT json FROM sessions').all() as JsonRow[];
    for (const { json } of sessions) {
      const session = sessionSchema.parse(JSON.parse(json));
      if (!this.getPersistedSpeechMetrics(session.sessionId)) this.persistSpeechMetrics(session.sessionId);
    }
  }

  private persistSpeechMetrics(sessionId: string): void {
    const session = this.getSession(sessionId);
    if (!session) return;
    const metrics = this.deriveStoredSpeechMetrics(session);
    this.database.prepare(`
      INSERT INTO speech_metric_snapshots (session_id, calculated_at_ms, json) VALUES (?, ?, ?)
      ON CONFLICT(session_id) DO UPDATE SET
        calculated_at_ms = excluded.calculated_at_ms,
        json = excluded.json
    `).run(sessionId, metrics.calculatedAtMs, JSON.stringify(metrics));
  }

  private deriveStoredSpeechMetrics(session: Session): SpeechMetricSnapshot {
    const segments = this.getTranscriptSegments(session.sessionId);
    const latestEvidenceMs = Math.max(
      segments.at(-1)?.endMs ?? 0,
      this.getVitalSamples(session.sessionId).at(-1)?.sessionElapsedMs ?? 0
    );
    const referenceEpochMs = session.endedAt
      ? Date.parse(session.endedAt)
      : session.startedAt
        ? Date.parse(session.startedAt) + latestEvidenceMs
        : 0;
    return deriveSpeechMetrics(session, segments, referenceEpochMs);
  }

  private rebuildStressTimeline(sessionId: string): void {
    const timeline = deriveStressTimeline(
      sessionId,
      this.getVitalSamples(sessionId),
      this.getContext(sessionId)?.stressSensitivity
    );
    this.database.prepare('DELETE FROM stress_signal_events WHERE session_id = ?').run(sessionId);
    const insert = this.database.prepare(`
      INSERT INTO stress_signal_events (transition_id, session_id, occurred_at_ms, state, json)
      VALUES (?, ?, ?, ?, ?)
    `);
    for (const transition of timeline.transitions) {
      stressSignalSchema.parse(transition.signal);
      insert.run(transition.transitionId, sessionId, transition.occurredAtMs,
        transition.state, JSON.stringify(transition));
    }
  }

  private acknowledge(event: PulseEvent, duplicate: boolean): EventAcknowledgement {
    return {
      eventId: event.eventId,
      accepted: true,
      duplicate,
      receivedAt: new Date().toISOString(),
      error: null
    };
  }

  private logContext(event: PulseEvent) {
    return {
      boundary: 'event_ingress',
      sessionId: event.sessionId,
      eventId: event.eventId,
      correlationId: event.correlationId,
      eventType: event.type
    };
  }
}

function toFtsQuery(query: string): string {
  const terms = query.match(/[\p{L}\p{N}]+/gu) ?? [];
  if (terms.length === 0) throw new Error('Search query must contain letters or numbers');
  return terms.map((term) => `"${term.replaceAll('"', '""')}"`).join(' AND ');
}
