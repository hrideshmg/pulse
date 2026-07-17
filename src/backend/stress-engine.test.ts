import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { ExecutionContext } from '@nitrostack/core';
import type { VitalSample } from '../contracts/domain.js';
import type { CurrentStressResponse } from '../contracts/vitals-resources.js';
import { authorizeVitalsRead } from '../vitals-authorization.js';
import { DEFAULT_STRESS_SENSITIVITY, deriveStressTimeline } from './stress-engine.js';

const SESSION_ID = 'stress-test-session';

describe('Phase 3 deterministic stress engine', () => {
  it('emits one sustained elevation and clears after recovery', () => {
    const samples = [
      ...[0, 1_000, 2_000, 3_000, 4_000, 5_000].map((at) => sample(at, 70)),
      ...[6_000, 7_000, 8_000, 9_000, 10_000, 11_000].map((at) => sample(at, 85)),
      sample(12_000, 74), sample(13_000, 72), sample(15_000, 70)
    ];
    const timeline = deriveStressTimeline(SESSION_ID, samples);

    assert.deepEqual(
      timeline.transitions.map(({ state, occurredAtMs }) => [state, occurredAtMs]),
      [['elevated', 6_000], ['sustained_elevation', 11_000], ['recovering', 12_000], ['baseline', 15_000]]
    );
    assert.equal(timeline.transitions.filter(({ state }) => state === 'sustained_elevation').length, 1);
    assert.equal(timeline.signal?.state, 'baseline');
    assert.equal(timeline.signal?.baselineBpm, 70);
    assert.equal(timeline.signal?.cooldownUntilMs, 15_000 + DEFAULT_STRESS_SENSITIVITY.cooldownMs);
  });

  it('does not classify a brief spike as sustained', () => {
    const timeline = deriveStressTimeline(SESSION_ID, [
      ...[0, 1_000, 2_000, 3_000, 4_000, 5_000].map((at) => sample(at, 70)),
      sample(6_000, 90), sample(7_000, 70)
    ]);
    assert.equal(timeline.transitions.some(({ state }) => state === 'sustained_elevation'), false);
    assert.equal(timeline.signal?.state, 'baseline');
  });

  it('produces the same result for out-of-order samples', () => {
    const ordered = [
      ...[0, 1_000, 2_000, 3_000, 4_000, 5_000].map((at) => sample(at, 70)),
      ...[6_000, 7_000, 8_000, 9_000, 10_000, 11_000].map((at) => sample(at, 85))
    ];
    assert.deepEqual(
      deriveStressTimeline(SESSION_ID, [...ordered].reverse()),
      deriveStressTimeline(SESSION_ID, ordered)
    );
  });
});

describe('Phase 3 resource authorization', () => {
  const response: CurrentStressResponse = {
    session: {
      sessionId: SESSION_ID,
      status: 'active',
      startedAt: '2026-07-17T10:00:00.000Z',
      endedAt: null,
      simulatedVitals: true,
      audioInputRoute: 'phone'
    },
    consentAllowed: true,
    signal: null
  };
  const context = (auth?: ExecutionContext['auth']): ExecutionContext => ({
    requestId: 'request-test',
    auth,
    logger: { debug() {}, info() {}, warn() {}, error() {} }
  });

  it('rejects missing consent, missing auth scope, and a mismatched session', () => {
    assert.throws(() => authorizeVitalsRead({ ...response, consentAllowed: false }, context(), 'session://current/stress'),
      /not granted/);
    assert.throws(() => authorizeVitalsRead(response, context({ subject: 'agent', scopes: [] }), 'session://current/stress'),
      /missing scope/);
    assert.throws(() => authorizeVitalsRead(response, context({ subject: 'agent', scopes: ['read:vitals'], claims: { sessionId: 'other' } }), 'session://current/stress'),
      /does not match/);
    assert.doesNotThrow(() => authorizeVitalsRead(response, context(), 'session://current/stress'));
  });
});

function sample(sessionElapsedMs: number, bpm: number): VitalSample {
  return {
    sessionId: SESSION_ID,
    bpm,
    availability: 'available',
    sessionElapsedMs,
    deviceTimestamp: new Date(Date.parse('2026-07-17T10:00:00.000Z') + sessionElapsedMs).toISOString(),
    source: 'simulator'
  };
}
