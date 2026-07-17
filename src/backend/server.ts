import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { URL } from 'node:url';
import { z } from 'zod';
import { WebSocketServer, type WebSocket } from 'ws';
import { loadRuntimeConfig, type RuntimeConfig } from '../config.js';
import { pulseEventSchema, type EventAcknowledgement } from '../contracts/events.js';
import { sessionStatusSchema } from '../contracts/domain.js';
import { localHealth } from '../health.js';
import { StructuredLogger } from '../observability/logger.js';
import { EventStore } from './event-store.js';

const MAX_BODY_BYTES = 1_000_000;

export interface Backend {
  server: Server;
  store: EventStore;
  logger: StructuredLogger;
  websocketServer: WebSocketServer;
}

export function createBackend(config: RuntimeConfig = loadRuntimeConfig()): Backend {
  const logger = new StructuredLogger('backend', config.LOG_LEVEL);
  const store = new EventStore(logger);
  const websocketServer = new WebSocketServer({ noServer: true });
  const server = createServer(async (request, response) => {
    try {
      await route(request, response, store, config, logger);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown backend error';
      logger.error('Request failed', { boundary: 'http', error: message });
      sendJson(response, error instanceof SyntaxError || error instanceof z.ZodError ? 400 : 409, {
        error: message
      });
    }
  });
  server.on('upgrade', (request, socket, head) => {
    const url = new URL(request.url ?? '/', 'http://pulse.local');
    if (url.pathname !== '/v1/session-stream') {
      socket.destroy();
      return;
    }
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit('connection', websocket, request);
    });
  });
  websocketServer.on('connection', (socket) => handleSessionStream(socket, store, logger));
  return { server, store, logger, websocketServer };
}

function handleSessionStream(socket: WebSocket, store: EventStore, logger: StructuredLogger): void {
  logger.info('Persistent session connection opened', { boundary: 'phone_to_backend_stream' });
  socket.on('message', (data) => {
    const raw = data.toString();
    try {
      const event = pulseEventSchema.parse(JSON.parse(raw));
      logger.info('WebSocket boundary received', {
        boundary: 'phone_to_backend_stream',
        sessionId: event.sessionId,
        eventId: event.eventId,
        correlationId: event.correlationId,
        eventType: event.type
      });
      socket.send(JSON.stringify(store.ingest(event)));
    } catch (error) {
      const acknowledgement: EventAcknowledgement = {
        eventId: eventIdFrom(raw),
        accepted: false,
        duplicate: false,
        receivedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Invalid event'
      };
      socket.send(JSON.stringify(acknowledgement));
    }
  });
  socket.on('close', () => logger.info('Persistent session connection closed', {
    boundary: 'phone_to_backend_stream'
  }));
}

function eventIdFrom(raw: string): string {
  try {
    const value = JSON.parse(raw) as { eventId?: unknown };
    return typeof value.eventId === 'string' && value.eventId.length > 0 ? value.eventId : 'unknown';
  } catch {
    return 'unknown';
  }
}

async function route(
  request: IncomingMessage,
  response: ServerResponse,
  store: EventStore,
  config: RuntimeConfig,
  logger: StructuredLogger
): Promise<void> {
  const url = new URL(request.url ?? '/', 'http://pulse.local');
  if (request.method === 'GET' && url.pathname === '/health') {
    const health = localHealth('backend', config);
    sendJson(response, health.status === 'unavailable' ? 503 : 200, health);
    return;
  }

  if (request.method === 'POST' && url.pathname === '/v1/events') {
    const event = pulseEventSchema.parse(await readJson(request));
    logger.info('HTTP boundary received', {
      boundary: 'phone_to_backend',
      sessionId: event.sessionId,
      eventId: event.eventId,
      correlationId: event.correlationId,
      eventType: event.type
    });
    sendJson(response, 202, store.ingest(event));
    return;
  }

  if (request.method === 'GET' && url.pathname === '/v1/sessions/current/transcript') {
    const session = store.getCurrentSession();
    if (!session) {
      sendJson(response, 200, { session: null, segments: [] });
      return;
    }
    sendJson(response, 200, {
      session,
      segments: store.getTranscriptSegments(session.sessionId).slice(-100)
    });
    return;
  }

  const eventMatch = url.pathname.match(/^\/v1\/sessions\/([^/]+)\/events$/);
  if (request.method === 'GET' && eventMatch) {
    const sessionId = decodeURIComponent(eventMatch[1]);
    if (!store.getSession(sessionId)) throw new Error(`Unknown session: ${sessionId}`);
    sendJson(response, 200, { sessionId, events: store.getEvents(sessionId) });
    return;
  }

  const vitalsMatch = url.pathname.match(/^\/v1\/sessions\/([^/]+)\/vitals$/);
  if (request.method === 'GET' && vitalsMatch) {
    const sessionId = decodeURIComponent(vitalsMatch[1]);
    if (!store.getSession(sessionId)) throw new Error(`Unknown session: ${sessionId}`);
    const samples = store.getVitalSamples(sessionId);
    sendJson(response, 200, {
      sessionId,
      samples,
      latest: samples.at(-1) ?? null
    });
    return;
  }

  const transitionMatch = url.pathname.match(/^\/v1\/sessions\/([^/]+)\/status$/);
  if (request.method === 'PATCH' && transitionMatch) {
    const sessionId = decodeURIComponent(transitionMatch[1]);
    const input = z.object({ status: sessionStatusSchema }).strict().parse(await readJson(request));
    sendJson(response, 200, store.transition(sessionId, input.status));
    return;
  }

  sendJson(response, 404, { error: `Route not found: ${request.method} ${url.pathname}` });
}

async function readJson(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.byteLength;
    if (size > MAX_BODY_BYTES) throw new Error('Request body exceeds 1 MB');
    chunks.push(buffer);
  }
  if (chunks.length === 0) throw new SyntaxError('A JSON request body is required');
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function sendJson(response: ServerResponse, statusCode: number, value: unknown): void {
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  });
  response.end(JSON.stringify(value));
}
