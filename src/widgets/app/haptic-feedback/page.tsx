'use client';

import { useWidgetSDK, useTheme, defineWidgetMetadata } from '@nitrostack/widgets';

const widgetMetadata = defineWidgetMetadata({
  uri: '/haptic-feedback',
  name: 'Haptic Feedback',
  description: 'Confirmation card for haptic nudge delivery',
  examples: [
    {
      name: 'Delivered',
      description: 'Haptic successfully delivered to watch',
      data: {
        tool: 'haptic_nudge', pattern: 'calm_double', status: 'delivered',
        requestedAt: '14:32:15', deliveredAt: '14:32:16', latencyMs: 842, interventionId: 'int_001'
      }
    },
    {
      name: 'Failed',
      description: 'Watch disconnected',
      data: {
        tool: 'haptic_nudge', pattern: 'calm_double', status: 'failed',
        requestedAt: '14:45:02', deliveredAt: null, latencyMs: null, interventionId: 'int_002',
        error: 'Watch not connected'
      }
    }
  ],
  tags: ['haptic', 'intervention', 'watch']
});

interface HapticData {
  tool: string;
  pattern: string;
  status: string;
  requestedAt: string;
  deliveredAt: string | null;
  latencyMs: number | null;
  interventionId: string;
  error?: string;
}

const PATTERN_LABELS: Record<string, string> = {
  calm_double: 'Double Pulse (Calming)',
  calm_triple: 'Triple Pulse (Calming)',
  alert_single: 'Single Sharp (Alert)',
  gentle_squeeze: 'Gentle Squeeze',
};

export default function HapticFeedback() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) return <div style={loadingStyle}>Loading...</div>;

  const data = getToolOutput<HapticData>();
  if (!data) return <div style={loadingStyle}>No haptic data</div>;

  const isDelivered = data.status === 'delivered';
  const accentColor = isDelivered ? '#10b981' : '#ef4444';
  const bgColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';
  const cardBg = theme === 'dark' ? '#1a1a1a' : '#f9fafb';

  return (
    <div style={{ background: bgColor, color: textColor, borderRadius: 16, padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif', border: `1px solid ${borderColor}`, maxWidth: 320 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor }}>Haptic Nudge</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: accentColor, background: accentColor + '18', padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase' }}>
          {data.status}
        </span>
      </div>

      <div style={{ background: cardBg, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: accentColor + '18', color: accentColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22
          }}>
            {isDelivered ? '\u{1F44F}' : '\u274C'}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{PATTERN_LABELS[data.pattern] || data.pattern}</div>
            <div style={{ fontSize: 11, color: subtextColor }}>Intervention: {data.interventionId}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: subtextColor }}>Requested</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{data.requestedAt}</span>
        </div>
        {data.deliveredAt && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: subtextColor }}>Delivered</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{data.deliveredAt}</span>
          </div>
        )}
        {data.latencyMs !== null && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: subtextColor }}>Latency</span>
            <span style={{ fontWeight: 600 }}>{data.latencyMs}ms</span>
          </div>
        )}
        {data.error && (
          <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{data.error}</div>
        )}
      </div>
    </div>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 160, color: '#6b7280', fontSize: 14
};
