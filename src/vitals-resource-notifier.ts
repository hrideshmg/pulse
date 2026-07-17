import {
  Injectable,
  NitroStackServer,
  type OnModuleDestroy,
  type OnModuleInit
} from '@nitrostack/core';
import { loadRuntimeConfig } from './config.js';
import { currentStressResponseSchema } from './contracts/vitals-resources.js';

@Injectable({ deps: [NitroStackServer] })
export class VitalsResourceNotifier implements OnModuleInit, OnModuleDestroy {
  private timer: NodeJS.Timeout | undefined;
  private lastMeaningfulState: string | undefined;

  constructor(private readonly server: NitroStackServer) {}

  onModuleInit(): void {
    this.timer = setInterval(() => void this.poll(), 1_000);
    this.timer.unref();
  }

  onModuleDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private async poll(): Promise<void> {
    try {
      const response = await fetch(`${loadRuntimeConfig().BACKEND_URL}/v1/sessions/current/stress`, {
        signal: AbortSignal.timeout(800)
      });
      if (!response.ok) {
        this.lastMeaningfulState = undefined;
        return;
      }
      const body = currentStressResponseSchema.parse(await response.json());
      const current = `${body.session.sessionId}:${body.signal?.state ?? 'unavailable'}`;
      if (this.lastMeaningfulState !== undefined && current !== this.lastMeaningfulState) {
        this.server.notifyResourceUpdated('session://current/vitals');
        this.server.notifyResourceUpdated('session://current/stress');
      }
      this.lastMeaningfulState = current;
    } catch {
      this.lastMeaningfulState = undefined;
    }
  }
}
