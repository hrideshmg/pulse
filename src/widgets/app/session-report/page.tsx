'use client';

import { useWidgetSDK, useTheme, defineWidgetMetadata } from '@nitrostack/widgets';

const widgetMetadata = defineWidgetMetadata({
  uri: '/session-report',
  name: 'Session Report',
  description: 'HR-synced timeline with vitals, transcript, and interventions',
  examples: [
    {
      name: 'Complete Session',
      description: 'Full session with stress episodes and interventions',
      data: {
        sessionId: 'sess_abc123', duration: '12m 34s',
        summary: { averageBpm: 88, peakBpm: 118, stressEpisodes: 2, interventions: 1, averageRecoveryTime: '1m 22s' },
        timeline: [
          { time: '0:00', type: 'vitals', bpm: 72, state: 'baseline' },
          { time: '2:15', type: 'transcript', speaker: 'wearer', text: 'Let me walk you through our architecture...' },
          { time: '3:42', type: 'vitals', bpm: 95, state: 'elevated' },
          { time: '4:10', type: 'vitals', bpm: 108, state: 'sustained_elevation' },
          { time: '4:15', type: 'intervention', tool: 'haptic_nudge', result: 'delivered' },
          { time: '5:30', type: 'vitals', bpm: 88, state: 'recovering' },
          { time: '6:00', type: 'vitals', bpm: 74, state: 'baseline' }
        ]
      }
    }
  ],
  tags: ['report', 'timeline', 'analysis']
});

interface TimelineEntry {
  time: string;
  type: string;
  bpm?: number;
  state?: string;
  speaker?: string;
  text?: string;
  tool?: string;
  result?: string;
}

interface ReportData {
  sessionId: string;
  duration: string;
  summary: { averageBpm: number; peakBpm: number; stressEpisodes: number; interventions: number; averageRecoveryTime: string };
  timeline: TimelineEntry[];
}

function VitalsCurve({ entries, theme }: { entries: TimelineEntry[]; theme: string }) {
  const vitals = entries.filter(e => e.type === 'vitals' && e.bpm);
  if (vitals.length < 2) return null;

  const width = 320;
  const height = 80;
  const padding = 8;
  const bpms = vitals.map(e => e.bpm!);
  const max = Math.max(...bpms);
  const min = Math.min(...bpms);
  const range = max - min || 1;

  const lineColor = theme === 'dark' ? '#60a5fa' : '#3b82f6';
  const gridColor = theme === 'dark' ? '#262626' : '#e5e7eb';

  const points = bpms.map((v, i) => {
    const x = padding + (i / (bpms.length - 1)) * (width - padding * 2);
    const y = height - padding - ((v - min) / range) * (height - padding * 2);
    return { x, y };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {[0.25, 0.5, 0.75].map(pct => (
        <line key={pct} x1={padding} y1={height - padding - pct * (height - padding * 2)} x2={width - padding} y2={height - padding - pct * (height - padding * 2)} stroke={gridColor} strokeWidth="1" />
      ))}
      <path d={areaD} fill={lineColor} opacity="0.1" />
      <path d={pathD} fill="none" stroke={lineColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={lineColor} />
      ))}
      <text x={width - padding} y={height - 2} textAnchor="end" fontSize="9" fill={theme === 'dark' ? '#9ca3af' : '#6b7280'}>{max}</text>
      <text x={width - padding} y={padding + 8} textAnchor="end" fontSize="9" fill={theme === 'dark' ? '#9ca3af' : '#6b7280'}>{min}</text>
    </svg>
  );
}

function StatPill({ label, value, theme }: { label: string; value: string | number; theme: string }) {
  const cardBg = theme === 'dark' ? '#1a1a1a' : '#f9fafb';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  return (
    <div style={{ background: cardBg, borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
      <div style={{ fontSize: 10, color: subtextColor }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

export default function SessionReport() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) return <div style={loadingStyle}>Loading...</div>;

  const data = getToolOutput<ReportData>();
  if (!data) return <div style={loadingStyle}>No report data</div>;

  const bgColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';

  return (
    <div style={{ background: bgColor, color: textColor, borderRadius: 16, padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif', border: `1px solid ${borderColor}`, maxWidth: 400 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor }}>Session Report</span>
        <span style={{ fontSize: 11, color: subtextColor }}>{data.duration}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
        <StatPill label="Avg BPM" value={data.summary.averageBpm} theme={theme || 'light'} />
        <StatPill label="Peak BPM" value={data.summary.peakBpm} theme={theme || 'light'} />
        <StatPill label="Recovery" value={data.summary.averageRecoveryTime} theme={theme || 'light'} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <VitalsCurve entries={data.timeline} theme={theme || 'light'} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {data.timeline.map((entry, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
            <span style={{ fontVariantNumeric: 'tabular-nums', color: subtextColor, width: 40, flexShrink: 0 }}>{entry.time}</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: entry.type === 'intervention' ? '#ef4444' : entry.type === 'transcript' ? '#10b981' : '#3b82f6', flexShrink: 0 }} />
            <span style={{ color: entry.type === 'intervention' ? '#ef4444' : textColor }}>
              {entry.type === 'intervention' && `${entry.tool} \u2192 ${entry.result}`}
              {entry.type === 'transcript' && `"${entry.text?.slice(0, 50)}..."`}
              {entry.type === 'vitals' && `${entry.bpm} BPM (${entry.state})`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 160, color: '#6b7280', fontSize: 14
};
