'use client';

import { useWidgetSDK, useTheme, defineWidgetMetadata } from '@nitrostack/widgets';

const widgetMetadata = defineWidgetMetadata({
  uri: '/speech-metrics-panel',
  name: 'Speech Metrics',
  description: 'Words per minute, filler rate, turn length, silence',
  examples: [
    {
      name: 'Normal Speech',
      description: 'Comfortable pace',
      data: {
        wordsPerMinute: 145, fillersPerMinute: 2.1, longestTurnSeconds: 18,
        currentSilenceSeconds: 3, totalFillers: 5, totalWords: 340, sessionDuration: '4m 22s'
      }
    },
    {
      name: 'Rushed Speech',
      description: 'Speaking quickly under pressure',
      data: {
        wordsPerMinute: 198, fillersPerMinute: 8.5, longestTurnSeconds: 32,
        currentSilenceSeconds: 1, totalFillers: 18, totalWords: 520, sessionDuration: '3m 45s'
      }
    }
  ],
  tags: ['speech', 'metrics', 'analysis']
});

interface SpeechData {
  wordsPerMinute: number;
  fillersPerMinute: number;
  longestTurnSeconds: number;
  currentSilenceSeconds: number;
  totalFillers: number;
  totalWords: number;
  sessionDuration: string;
}

function MetricCard({ label, value, unit, color, theme }: { label: string; value: string | number; unit: string; color?: string; theme: string }) {
  const cardBg = theme === 'dark' ? '#1a1a1a' : '#f9fafb';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  return (
    <div style={{ background: cardBg, borderRadius: 10, padding: 14, textAlign: 'center' }}>
      <div style={{ fontSize: 11, color: subtextColor, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: color || 'inherit', lineHeight: 1.2 }}>{value}</div>
      <div style={{ fontSize: 10, color: subtextColor, marginTop: 2 }}>{unit}</div>
    </div>
  );
}

function getWpmColor(wpm: number): string {
  if (wpm < 130) return '#3b82f6';
  if (wpm < 160) return '#10b981';
  if (wpm < 180) return '#f59e0b';
  return '#ef4444';
}

function getFillerColor(fpm: number): string {
  if (fpm < 3) return '#10b981';
  if (fpm < 6) return '#f59e0b';
  return '#ef4444';
}

export default function SpeechMetricsPanel() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) return <div style={loadingStyle}>Loading...</div>;

  const data = getToolOutput<SpeechData>();
  if (!data) return <div style={loadingStyle}>No speech data</div>;

  const bgColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';

  return (
    <div style={{ background: bgColor, color: textColor, borderRadius: 16, padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif', border: `1px solid ${borderColor}`, maxWidth: 340 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor }}>Speech Metrics</span>
        <span style={{ fontSize: 11, color: subtextColor }}>{data.sessionDuration}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <MetricCard label="Words/min" value={data.wordsPerMinute} unit="wpm" color={getWpmColor(data.wordsPerMinute)} theme={theme || 'light'} />
        <MetricCard label="Fillers/min" value={data.fillersPerMinute.toFixed(1)} unit="fillers" color={getFillerColor(data.fillersPerMinute)} theme={theme || 'light'} />
        <MetricCard label="Longest turn" value={data.longestTurnSeconds} unit="seconds" theme={theme || 'light'} />
        <MetricCard label="Silence" value={data.currentSilenceSeconds} unit="seconds" theme={theme || 'light'} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: `1px solid ${borderColor}` }}>
        <span style={{ fontSize: 12, color: subtextColor }}>Total words: <strong style={{ color: textColor }}>{data.totalWords}</strong></span>
        <span style={{ fontSize: 12, color: subtextColor }}>Total fillers: <strong style={{ color: textColor }}>{data.totalFillers}</strong></span>
      </div>
    </div>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 160, color: '#6b7280', fontSize: 14
};
