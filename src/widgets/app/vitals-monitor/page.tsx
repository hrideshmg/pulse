'use client';

import { useWidgetSDK, useTheme, defineWidgetMetadata } from '@nitrostack/widgets';

const widgetMetadata = defineWidgetMetadata({
  uri: '/vitals-monitor',
  name: 'Vitals Monitor',
  description: 'Live BPM gauge with heart-rate sparkline',
  examples: [
    {
      name: 'Elevated Heart Rate',
      description: 'Wearer at 112 BPM',
      data: {
        bpm: 112, availability: 'available', source: 'watch', freshness: '2s ago',
        window: [78, 82, 88, 95, 104, 112], windowLabels: ['0:00', '0:10', '0:20', '0:30', '0:40', '0:50']
      }
    },
    {
      name: 'Baseline Resting',
      description: 'Wearer at 72 BPM',
      data: {
        bpm: 72, availability: 'available', source: 'watch', freshness: '1s ago',
        window: [70, 71, 72, 73, 72, 71, 72], windowLabels: ['0:00', '0:10', '0:20', '0:30', '0:40', '0:50', '1:00']
      }
    }
  ],
  tags: ['vitals', 'heart-rate', 'real-time']
});

interface VitalsData {
  bpm: number | null;
  availability: string;
  source: string;
  freshness: string;
  window: number[];
  windowLabels: string[];
}

function getBpmColor(bpm: number | null): string {
  if (bpm === null) return '#6b7280';
  if (bpm < 80) return '#10b981';
  if (bpm < 100) return '#f59e0b';
  return '#ef4444';
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: 12 }}>No data</div>;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 280;
  const height = 48;
  const padding = 4;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((v - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={parseFloat(points.split(' ').pop()!.split(',')[0])}
        cy={parseFloat(points.split(' ').pop()!.split(',')[1])}
        r="4"
        fill={color}
      />
    </svg>
  );
}

export default function VitalsMonitor() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) return <div style={loadingStyle}>Loading...</div>;

  const data = getToolOutput<VitalsData>();
  if (!data) return <div style={loadingStyle}>No vitals data</div>;

  const bpmColor = getBpmColor(data.bpm);
  const isStale = data.freshness === 'stale';
  const bgColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';

  return (
    <div style={{ background: bgColor, color: textColor, borderRadius: 16, padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif', border: `1px solid ${borderColor}`, maxWidth: 340 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor }}>Heart Rate</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: isStale ? '#ef4444' : '#10b981' }} />
          <span style={{ fontSize: 11, color: subtextColor }}>{isStale ? 'Stale' : data.freshness}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
        <span style={{ fontSize: 56, fontWeight: 700, color: bpmColor, lineHeight: 1 }}>{data.bpm ?? '--'}</span>
        <span style={{ fontSize: 18, color: subtextColor, fontWeight: 500 }}>BPM</span>
      </div>

      <div style={{ marginBottom: 12 }}>
        <Sparkline data={data.window} color={bpmColor} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: subtextColor }}>Source: {data.source}</span>
        <span style={{ fontSize: 11, color: subtextColor, background: theme === 'dark' ? '#1f1f1f' : '#f3f4f6', padding: '2px 8px', borderRadius: 4 }}>
          {data.availability}
        </span>
      </div>
    </div>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 160, color: '#6b7280', fontSize: 14
};
