import type { WebSocket } from 'ws';
import type { RuntimeConfig } from '../config.js';
import type { InterventionActionResponse } from '../contracts/interventions.js';
import type { PulseEvent } from '../contracts/events.js';
import { EventStore, type PendingIntervention } from './event-store.js';

const SAFE_SILENCE_MS = 1_500;

export class DeviceActions {
  private readonly sockets = new Set<WebSocket>();
  private readonly queueTimer: NodeJS.Timeout;

  constructor(private readonly store: EventStore, private readonly config: RuntimeConfig) {
    this.queueTimer = setInterval(() => this.processWhisperQueue(), 250);
    this.queueTimer.unref();
  }

  addSocket(socket: WebSocket): void {
    this.sockets.add(socket);
    socket.once('close', () => this.sockets.delete(socket));
    this.processWhisperQueue();
  }

  haptic(input: {
    idempotencyKey: string;
    pattern: 'single' | 'double' | 'breathing';
    triggerEvidenceIds: string[];
    requestingAgentId: string;
    expectedSessionId?: string;
  }): InterventionActionResponse {
    const session = this.requireActionableSession('act:haptic');
    this.requireExpectedSession(session.sessionId, input.expectedSessionId);
    const action = this.store.createIntervention({
      ...input,
      sessionId: session.sessionId,
      type: 'haptic_nudge',
      generatedMessage: null
    });
    if (action.duplicate) return action;

    if (this.config.DEVICE_ACTIONS === 'simulated') {
      this.simulateCompletion(action.commandId, session.sessionId, 'haptic_completed', 'delivered');
    } else {
      if (!this.hasConnectedPhone()) {
        this.store.completeCommand(action.commandId, 'failed', new Date().toISOString());
        throw new Error('No phone is connected to deliver the haptic command');
      }
      this.broadcast(this.commandEvent(session.sessionId, 'send_watch_haptic', {
        commandId: action.commandId,
        pattern: input.pattern,
        expiresAt: new Date(Date.now() + 10_000).toISOString()
      }));
      this.store.markInterventionDispatched(action.commandId);
    }
    return this.currentResponse(action.commandId, false);
  }

  whisper(input: {
    idempotencyKey: string;
    text: string;
    triggerEvidenceIds: string[];
    expiresInMs: number;
    requestingAgentId: string;
    expectedSessionId?: string;
  }): InterventionActionResponse {
    const session = this.requireActionableSession('act:audio');
    this.requireExpectedSession(session.sessionId, input.expectedSessionId);
    const action = this.store.createIntervention({
      ...input,
      sessionId: session.sessionId,
      type: 'whisper_coach',
      generatedMessage: input.text,
      expiresAt: new Date(Date.now() + input.expiresInMs).toISOString()
    });
    if (action.duplicate) return action;
    this.processWhisperQueue();
    return this.currentResponse(action.commandId, false);
  }

  beforeIngest(event: PulseEvent): void {
    if (event.type !== 'consent_updated' || event.payload.revokedAt === null || event.payload.scope !== 'act:audio') return;
    for (const pending of this.store.getPendingInterventions('whisper_coach')) {
      if (pending.intervention.sessionId !== event.sessionId || pending.dispatchedAt === null) continue;
      this.broadcast(this.commandEvent(event.sessionId, 'cancel_tts', { commandId: pending.commandId }));
    }
  }

  close(): void {
    clearInterval(this.queueTimer);
  }

  private processWhisperQueue(): void {
    const now = Date.now();
    for (const pending of this.store.getPendingInterventions('whisper_coach')) {
      if (pending.dispatchedAt !== null) continue;
      if (!pending.expiresAt || Date.parse(pending.expiresAt) <= now) {
        this.store.expireIntervention(pending.commandId);
        continue;
      }
      const { sessionId } = pending.intervention;
      const session = this.store.getSession(sessionId);
      if (!session || session.status !== 'active' || !this.store.hasActiveConsent(sessionId, 'act:audio')) {
        this.store.completeCommand(pending.commandId, 'cancelled', new Date().toISOString());
        continue;
      }
      if (this.store.getConversationSilenceMs(sessionId, now) < SAFE_SILENCE_MS) continue;
      if (this.config.DEVICE_ACTIONS === 'simulated') {
        this.simulateCompletion(pending.commandId, sessionId, 'playback_completed', 'played');
        continue;
      }
      if (!this.hasConnectedPhone()) continue;
      this.broadcast(this.commandEvent(sessionId, 'play_tts', {
        commandId: pending.commandId,
        text: pending.intervention.generatedMessage!,
        expiresAt: pending.expiresAt,
        capturePolicy: 'pause'
      }));
      this.store.markInterventionDispatched(pending.commandId);
    }
  }

  private requireActionableSession(scope: 'act:haptic' | 'act:audio') {
    const session = this.store.getCurrentSession();
    if (!session) throw new Error('No current session');
    if (session.status !== 'active') throw new Error(`Session ${session.sessionId} is stale or not active (${session.status})`);
    if (!this.store.hasActiveConsent(session.sessionId, scope)) {
      throw new Error(`Consent scope ${scope} is not granted for session ${session.sessionId}`);
    }
    return session;
  }

  private currentResponse(commandId: string, duplicate: boolean): InterventionActionResponse {
    const current = this.store.getInterventionByCommand(commandId);
    if (!current) throw new Error(`Unknown device command: ${commandId}`);
    return { intervention: current.intervention, commandId, duplicate };
  }

  private requireExpectedSession(sessionId: string, expectedSessionId?: string): void {
    if (expectedSessionId !== undefined && expectedSessionId !== sessionId) {
      throw new Error(`Authenticated session does not match current session ${sessionId}`);
    }
  }

  private simulateCompletion(
    commandId: string,
    sessionId: string,
    type: 'playback_completed' | 'haptic_completed',
    result: 'played' | 'delivered'
  ): void {
    const timestamp = new Date().toISOString();
    this.store.ingest({
      version: '1.0',
      type,
      sessionId,
      eventId: crypto.randomUUID(),
      timestamp,
      correlationId: crypto.randomUUID(),
      payload: { commandId, result }
    } as PulseEvent);
  }

  private commandEvent<T extends 'send_watch_haptic' | 'play_tts' | 'cancel_tts'>(
    sessionId: string,
    type: T,
    payload: Extract<PulseEvent, { type: T }>['payload']
  ): Extract<PulseEvent, { type: T }> {
    return {
      version: '1.0',
      type,
      sessionId,
      eventId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      correlationId: crypto.randomUUID(),
      payload
    } as Extract<PulseEvent, { type: T }>;
  }

  private hasConnectedPhone(): boolean {
    return [...this.sockets].some((socket) => socket.readyState === socket.OPEN);
  }

  private broadcast(event: PulseEvent): void {
    const message = JSON.stringify(event);
    for (const socket of this.sockets) if (socket.readyState === socket.OPEN) socket.send(message);
  }
}
