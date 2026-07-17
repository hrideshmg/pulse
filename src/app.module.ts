import { McpApp, Module } from '@nitrostack/core';
import { PhaseZeroTools } from './phase-zero.tools.js';

@McpApp({
  module: AppModule,
  server: { name: 'wearable-coach-phase-zero', version: '0.1.0' },
  logging: { level: 'info' }
})
@Module({
  name: 'phase-zero',
  controllers: [PhaseZeroTools]
})
export class AppModule {}
