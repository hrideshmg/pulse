'use client';

import { useWidgetSDK, useTheme, defineWidgetMetadata } from '@nitrostack/widgets';

const widgetMetadata = defineWidgetMetadata({
  uri: '/stress-indicator',
  name: 'Stress Indicator',
  description: 'Derived stress state with baseline delta and evidence',
  examples: [
    {
      name: 'Sustained Elevation',
      description: 'Stress state sustained_elevation for 2m 14s',
      data: {
        state: 'sustained_elevation', baselineBpm: 72, currentDelta: 38,
        elevationDuration: '2m 14s', elevationStart: '14:32:05',
        evidence: 'Heart rate sustained above 105 BPM for over 2 minutes during pricing discussion',
        cooldownActive: false
      }
    },
    {
      name: 'Baseline',
      description: 'No stress detected',
      data: {
        state: 'baseline', baselineBpm: 72, currentDelta: 2,
        elevationDuration: null, elevationStart: null, evidence: null, cooldownActive: false
      }
    }
  ],
  tags: ['stress', 'derived', 'vitals']
});

interface StressData {
  state: string;
  baselineBpm: number;
  currentDelta: number;
  elevationDuration: string | null;
  elevationStart: string | null;
  evidence: string | null;
  cooldownActive: boolean;
}

const STATE_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  baseline: { label: 'Baseline', color: '#10b981', bg: '#ecfdf5', icon: '\u2713' },
  elevated: { label: 'Elevated', color: '#f59e0b', bg: '#fffbeb', icon: '\u25B2' },
  sustained_elevation: { label: 'Sustained Elevation', color: '#ef4444', bg: '#fef2f2', icon: '\u26A0' },
  recovering: { label: 'Recovering', color: '#3b82f6', bg: '#eff6ff', icon: '\u21BB' },
};

export default function StressIndicator() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) return <div style={loadingStyle}>Loading...</div>;

  const data = getToolOutput<StressData>();
  if (!data) return <div style={loadingStyle}>No stress data</div>;

  const config = STATE_CONFIG[data.state] || STATE_CONFIG.baseline;
  const bgColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';
  const badgeBg = theme === 'dark'
    ? config.color + '22'
    : config.bg;

  return (
    <div style={{ background: bgColor, color: textColor, borderRadius: 16, padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif', border: `1px solid ${borderColor}`, maxWidth: 340 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor }}>Stress State</span>
        {data.cooldownActive && (
          <span style={{ fontSize: 10, color: '#3b82f6', background: theme === 'dark' ? '#1e3a5f' : '#eff6ff', padding: '2px 8px', borderRadius: 4, fontWeight: 500 }}>Cooldown</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: badgeBg, color: config.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 700
        }}>
          {config.icon}
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: config.color }}>{config.label}</div>
          {data.elevationDuration && (
            <div style={{ fontSize: 12, color: subtextColor }}>Duration: {data.elevationDuration}</div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div style={{ background: theme === 'dark' ? '#1a1a1a' : '#f9fafb', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 11, color: subtextColor, marginBottom: 4 }}>Baseline</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.baselineBpm} <span style={{ fontSize: 12, color: subtextColor }}>BPM</span></div>
        </div>
        <div style={{ background: theme === 'dark' ? '#1a1a1a' : '#f9fafb', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 11, color: subtextColor, marginBottom: 4 }}>Delta</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: config.color }}>+{data.currentDelta} <span style={{ fontSize: 12, color: subtextColor }}>BPM</span></div>
        </div>
      </div>

      {data.elevationStart && (
        <div style={{ fontSize: 12, color: subtextColor, marginBottom: 8 }}>
          Started at {data.elevationStart}
        </div>
      )}

      {data.evidence && (
        <div style={{ fontSize: 12, color: subtextColor, background: theme === 'dark' ? '#1a1a1a' : '#f9fafb', borderRadius: 8, padding: 12, lineHeight: 1.5 }}>
          {data.evidence}
        </div>
      )}
    </div>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 160, color: '#6b7280', fontSize: 14
};
