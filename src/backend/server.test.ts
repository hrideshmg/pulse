import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';
import { after, before, describe, it } from 'node:test';
import WebSocket from 'ws';
import type { RuntimeConfig } from '../config.js';
import { mockEventSequence } from '../contracts/fixtures.js';
import { createBackend } from './server.js';

const config: RuntimeConfig = {
  NODE_ENV: 'test',
  LOG_LEVEL: 'error',
  BACKEND_HOST: '127.0.0.1',
  BACKEND_PORT: 0,
  BACKEND_URL: 'http://127.0.0.1:0',
  VITALS_SOURCE: 'simulated',
  AUDIO_INPUT: 'phone',
  TRANSCRIPTION_MODE: 'fixture',
  DEVICE_ACTIONS: 'simulated',
  COPILOT_ENABLED: false,
  STORE_RAW_AUDIO: false,
  DEEPGRAM_API_KEY: undefined
};

describe('Phase 2 backend', () => {
  const backend = createBackend(config);
  let baseUrl = '';

  before(async () => {
    await new Promise<void>((resolve) => backend.server.listen(0, '127.0.0.1', resolve));
    const address = backend.server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  after(async () => {
    backend.websocketServer.close();
    await new Promise<void>((resolve, reject) => backend.server.close((error) => error ? reject(error) : resolve()));
  });

  it('reports dependency and fallback health explicitly', async () => {
    const response = await fetch(`${baseUrl}/health`);
    assert.equal(response.status, 200);
    const body = await response.json() as { status: string; contractVersion: string };
    assert.equal(body.status, 'ok');
    assert.equal(body.contractVersion, '1.0');
  });

  it('moves mock vital and transcript events through the same ingress', async () => {
    for (const event of mockEventSequence) {
      const response = await fetch(`${baseUrl}/v1/events`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(event)
      });
      assert.equal(response.status, 202);
    }

    const response = await fetch(`${baseUrl}/v1/sessions/${mockEventSequence[0].sessionId}/events`);
    const body = await response.json() as { events: unknown[] };
    assert.equal(body.events.length, 3);
  });

  it('suppresses duplicate event IDs', async () => {
    const response = await fetch(`${baseUrl}/v1/events`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(mockEventSequence[2])
    });
    const body = await response.json() as { duplicate: boolean };
    assert.equal(body.duplicate, true);
  });

  it('exposes ordered final segments for the current session', async () => {
    const sessionId = 'session-transcript-001';
    const sessionEvent = {
      ...mockEventSequence[0],
      sessionId,
      eventId: 'event-transcript-session',
      payload: { session: { ...mockEventSequence[0].payload.session, sessionId } }
    };
    const segment = mockEventSequence[2];
    assert.equal(segment.type, 'transcript_segment_received');
    const laterSegment = {
      ...segment,
      sessionId,
      eventId: 'event-transcript-later',
      payload: { ...segment.payload, sessionId, segmentId: 'segment-later', startMs: 2_000, endMs: 2_500 }
    };
    const earlierSegment = {
      ...segment,
      sessionId,
      eventId: 'event-transcript-earlier',
      payload: { ...segment.payload, sessionId, segmentId: 'segment-earlier', startMs: 500, endMs: 1_000 }
    };
    const interimSegment = {
      ...segment,
      sessionId,
      eventId: 'event-transcript-interim',
      payload: { ...segment.payload, sessionId, segmentId: 'segment-interim', isFinal: false }
    };

    for (const event of [sessionEvent, laterSegment, interimSegment, earlierSegment]) {
      const response = await fetch(`${baseUrl}/v1/events`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(event)
      });
      assert.equal(response.status, 202);
    }

    const response = await fetch(`${baseUrl}/v1/sessions/current/transcript`);
    assert.equal(response.status, 200);
    const body = await response.json() as {
      session: { sessionId: string };
      segments: Array<{ segmentId: string }>;
    };
    assert.equal(body.session.sessionId, sessionId);
    assert.deepEqual(body.segments.map(({ segmentId }) => segmentId), ['segment-earlier', 'segment-later']);
  });

  it('acknowledges streamed events and stores vitals in timeline order', async () => {
    const sessionId = 'session-stream-001';
    const sessionEvent = {
      ...mockEventSequence[0],
      sessionId,
      eventId: 'event-stream-session',
      payload: {
        session: {
          ...mockEventSequence[0].payload.session,
          sessionId
        }
      }
    };
    const laterVital = {
      ...mockEventSequence[1],
      sessionId,
      eventId: 'event-stream-vital-later',
      payload: {
        ...mockEventSequence[1].payload,
        sessionId,
        bpm: 91,
        sessionElapsedMs: 3_000
      }
    };
    const earlierVital = {
      ...mockEventSequence[1],
      sessionId,
      eventId: 'event-stream-vital-earlier',
      payload: {
        ...mockEventSequence[1].payload,
        sessionId,
        bpm: 80,
        sessionElapsedMs: 1_000
      }
    };
    const websocketUrl = baseUrl.replace('http://', 'ws://') + '/v1/session-stream';
    const socket = new WebSocket(websocketUrl);
    await new Promise<void>((resolve, reject) => {
      socket.once('open', resolve);
      socket.once('error', reject);
    });

    const send = (event: unknown) => new Promise<{ eventId: string; duplicate: boolean }>((resolve) => {
      socket.once('message', (data) => resolve(JSON.parse(data.toString())));
      socket.send(JSON.stringify(event));
    });
    assert.equal((await send(sessionEvent)).eventId, sessionEvent.eventId);
    assert.equal((await send(laterVital)).duplicate, false);
    assert.equal((await send(earlierVital)).duplicate, false);
    assert.equal((await send(earlierVital)).duplicate, true);
    socket.close();

    const response = await fetch(`${baseUrl}/v1/sessions/${sessionId}/vitals`);
    assert.equal(response.status, 200);
    const body = await response.json() as { samples: Array<{ bpm: number }>; latest: { bpm: number } };
    assert.deepEqual(body.samples.map((sample) => sample.bpm), [80, 91]);
    assert.equal(body.latest.bpm, 91);
  });
});
