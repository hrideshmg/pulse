import { ExecutionContext, ResourceDecorator as Resource } from '@nitrostack/core';
import { loadRuntimeConfig } from './config.js';
import {
  currentStressResponseSchema,
  currentVitalsResponseSchema,
  type CurrentStressResponse,
  type CurrentVitalsResponse
} from './contracts/vitals-resources.js';
import { authorizeVitalsRead } from './vitals-authorization.js';

export { authorizeVitalsRead } from './vitals-authorization.js';

export class VitalsResources {
  @Resource({
    uri: 'session://current/vitals',
    name: 'Current session vitals',
    description: 'Consent-scoped live heart rate, availability, source, freshness, and a short rolling window.',
    mimeType: 'application/json',
    annotations: { audience: ['assistant'], priority: 1 }
  })
  async currentVitals(uri: string, context: ExecutionContext) {
    const response = currentVitalsResponseSchema.parse(await readBackend('/v1/sessions/current/vitals'));
    authorizeVitalsRead(response, context, uri);
    const { consentAllowed: _consentAllowed, ...resource } = response;
    return resource;
  }

  @Resource({
    uri: 'session://current/stress',
    name: 'Current derived stress signal',
    description: 'Deterministic sustained-elevation state with baseline, duration, cooldown, and supporting samples.',
    mimeType: 'application/json',
    annotations: { audience: ['assistant'], priority: 1 }
  })
  async currentStress(uri: string, context: ExecutionContext) {
    const response = currentStressResponseSchema.parse(await readBackend('/v1/sessions/current/stress'));
    authorizeVitalsRead(response, context, uri);
    const { consentAllowed: _consentAllowed, ...resource } = response;
    return resource;
  }
}

async function readBackend(path: string): Promise<unknown> {
  const response = await fetch(`${loadRuntimeConfig().BACKEND_URL}${path}`, {
    signal: AbortSignal.timeout(2_000)
  });
  const body = await response.json() as unknown;
  if (!response.ok) {
    const detail = typeof body === 'object' && body !== null && 'error' in body ? String(body.error) : `HTTP ${response.status}`;
    throw new Error(`Backend vitals request failed: ${detail}`);
  }
  return body;
}
