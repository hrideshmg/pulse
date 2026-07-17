import { McpApp, Module } from '@nitrostack/core';
import { HealthResources } from './health.resources.js';
import { InterventionTools } from './intervention.tools.js';
import { PhaseZeroTools } from './phase-zero.tools.js';
import { TranscriptResources } from './transcript.resources.js';

@McpApp({
  module: AppModule,
  server: { name: 'pulse', version: '0.2.0' },
  logging: { level: 'info' }
})
@Module({
  name: 'pulse-foundation',
  controllers: [HealthResources, TranscriptResources, PhaseZeroTools, InterventionTools]
})
export class AppModule {}
