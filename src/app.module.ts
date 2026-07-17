import { McpApp, Module } from '@nitrostack/core';
import { HealthResources } from './health.resources.js';
import { PhaseZeroTools } from './phase-zero.tools.js';
import { PulseResources } from './pulse.resources.js';

@McpApp({
  module: AppModule,
  server: { name: 'pulse', version: '0.2.0' },
  logging: { level: 'info' }
})
@Module({
  name: 'phase-zero',
  controllers: [PhaseZeroTools, PulseResources, HealthResources]
})
export class AppModule {}