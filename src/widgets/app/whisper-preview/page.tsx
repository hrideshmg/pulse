'use client';

import { useWidgetSDK, useTheme, defineWidgetMetadata } from '@nitrostack/widgets';

const widgetMetadata = defineWidgetMetadata({
  uri: '/whisper-preview',
  name: 'Whisper Preview',
  description: 'TTS message preview and delivery status',
  examples: [
    {
      name: 'Delivered',
      description: 'Coaching message played through earbuds',
      data: {
        tool: 'whisper_coach',
        message: 'Take a breath. You\'ve got this. The pricing discussion is going well.',
        status: 'played',
        requestedAt: '14:34:20',
        playedAt: '14:34:24',
        durationMs: 3200,
        interventionId: 'int_003'
      }
    },
    {
      name: 'Queued',
      description: 'Waiting for safe playback window',
      data: {
        tool: 'whisper_coach',
        message: 'Pause here. Let them respond before continuing.',
        status: 'queued',
        requestedAt: '14:38:10',
        playedAt: null,
        durationMs: null,
        interventionId: 'int_004',
        queueReason: 'Waiting for wearer to finish speaking'
      }
    }
  ],
  tags: ['whisper', 'intervention', 'audio']
});

interface WhisperData {
  tool: string;
  message: string;
  status: string;
  requestedAt: string;
  playedAt: string | null;
  durationMs: number | null;
  interventionId: string;
  queueReason?: string;
}

const STATUS_CONFIG: Record<string, { color: string; label: string; icon: string }> = {
  played: { color: '#10b981', label: 'Played', icon: '\u2713' },
  queued: { color: '#f59e0b', label: 'Queued', icon: '\u23F3' },
  failed: { color: '#ef4444', label: 'Failed', icon: '\u2717' },
};

export default function WhisperPreview() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) return <div style={loadingStyle}>Loading...</div>;

  const data = getToolOutput<WhisperData>();
  if (!data) return <div style={loadingStyle}>No whisper data</div>;

  const config = STATUS_CONFIG[data.status] || STATUS_CONFIG.queued;
  const bgColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';
  const cardBg = theme === 'dark' ? '#1a1a1a' : '#f9fafb';

  return (
    <div style={{ background: bgColor, color: textColor, borderRadius: 16, padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif', border: `1px solid ${borderColor}`, maxWidth: 340 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor }}>Whisper Coach</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: config.color, background: config.color + '18', padding: '3px 10px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
          {config.icon} {config.label}
        </span>
      </div>

      <div style={{ background: cardBg, borderRadius: 12, padding: 16, marginBottom: 16, borderLeft: `3px solid ${config.color}` }}>
        <div style={{ fontSize: 10, color: subtextColor, marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</div>
        <div style={{ fontSize: 14, lineHeight: 1.6, fontStyle: 'italic', color: textColor }}>
          &ldquo;{data.message}&rdquo;
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: subtextColor }}>Intervention</span>
          <span>{data.interventionId}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: subtextColor }}>Requested</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{data.requestedAt}</span>
        </div>
        {data.playedAt && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: subtextColor }}>Played</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{data.playedAt}</span>
          </div>
        )}
        {data.durationMs !== null && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: subtextColor }}>Duration</span>
            <span>{(data.durationMs / 1000).toFixed(1)}s</span>
          </div>
        )}
        {data.queueReason && (
          <div style={{ color: '#f59e0b', fontSize: 12, marginTop: 4 }}>{data.queueReason}</div>
        )}
      </div>
    </div>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 160, color: '#6b7280', fontSize: 14
};
