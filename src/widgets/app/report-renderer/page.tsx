'use client';

import { useWidgetSDK, useTheme, defineWidgetMetadata } from '@nitrostack/widgets';

const widgetMetadata = defineWidgetMetadata({
  uri: '/report-renderer',
  name: 'Report Renderer',
  description: 'Full HR-synced timeline visualization with scrubber',
  examples: [
    {
      name: 'Full Report',
      description: 'Complete session with vitals curve and transcript',
      data: {
        sessionId: 'sess_abc123',
        reportGenerated: '2026-07-17T15:30:00Z',
        summary: {
          duration: '12m 34s', averageBpm: 88, peakBpm: 118,
          stressEpisodes: 2, interventions: 1, averageRecoveryTime: '1m 22s',
          transcriptSegments: 47, totalWords: 1840
        },
        vitalsCurve: [
          { t: 0, bpm: 72 }, { t: 30, bpm: 74 }, { t: 60, bpm: 78 },
          { t: 90, bpm: 95 }, { t: 120, bpm: 108 }, { t: 150, bpm: 112 },
          { t: 180, bpm: 118 }, { t: 210, bpm: 102 }, { t: 240, bpm: 88 },
          { t: 270, bpm: 78 }
        ],
        interventions: [{ time: '3:30', tool: 'haptic_nudge', result: 'delivered' }]
      }
    }
  ],
  tags: ['report', 'visualization', 'timeline']
});

interface VitalsPoint { t: number; bpm: number; }
interface ReportRendererData {
  sessionId: string;
  reportGenerated: string;
  summary: {
    duration: string; averageBpm: number; peakBpm: number;
    stressEpisodes: number; interventions: number; averageRecoveryTime: string;
    transcriptSegments: number; totalWords: number;
  };
  vitalsCurve: VitalsPoint[];
  interventions: { time: string; tool: string; result: string }[];
}

function HRCurve({ curve, interventions, theme }: { curve: VitalsPoint[]; interventions: { time: string; tool: string }[]; theme: string }) {
  if (curve.length < 2) return null;

  const width = 360;
  const height = 120;
  const pad = 12;
  const bpms = curve.map(p => p.bpm);
  const max = Math.max(...bpms);
  const min = Math.min(...bpms);
  const range = max - min || 1;
  const maxTime = curve[curve.length - 1].t;

  const lineColor = theme === 'dark' ? '#60a5fa' : '#3b82f6';
  const gridColor = theme === 'dark' ? '#262626' : '#e5e7eb';
  const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280';

  const toX = (t: number) => pad + (t / maxTime) * (width - pad * 2);
  const toY = (bpm: number) => height - pad - ((bpm - min) / range) * (height - pad * 2);

  const linePath = curve.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.t)} ${toY(p.bpm)}`).join(' ');
  const areaPath = `${linePath} L ${toX(curve[curve.length - 1].t)} ${height - pad} L ${toX(curve[0].t)} ${height - pad} Z`;

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {[0.25, 0.5, 0.75].map(pct => (
        <g key={pct}>
          <line x1={pad} y1={toY(min + pct * range)} x2={width - pad} y2={toY(min + pct * range)} stroke={gridColor} strokeWidth="1" strokeDasharray="4 4" />
          <text x={pad - 4} y={toY(min + pct * range) + 3} textAnchor="end" fontSize="8" fill={textColor}>{Math.round(min + pct * range)}</text>
        </g>
      ))}
      <path d={areaPath} fill={lineColor} opacity="0.08" />
      <path d={linePath} fill="none" stroke={lineColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {curve.map((p, i) => (
        <circle key={i} cx={toX(p.t)} cy={toY(p.bpm)} r="3" fill={lineColor} />
      ))}
      {interventions.map((intv, i) => {
        const timeStr = intv.time;
        const [min, sec] = timeStr.split(':').map(Number);
        const t = min * 60 + sec;
        return (
          <g key={i}>
            <line x1={toX(t)} y1={pad} x2={toX(t)} y2={height - pad} stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx={toX(t)} cy={pad} r="4" fill="#ef4444" />
            <text x={toX(t)} y={pad - 6} textAnchor="middle" fontSize="8" fill="#ef4444" fontWeight="600">{intv.tool}</text>
          </g>
        );
      })}
      <text x={pad} y={height - 1} fontSize="8" fill={textColor}>0:00</text>
      <text x={width - pad} y={height - 1} textAnchor="end" fontSize="8" fill={textColor}>{Math.floor(maxTime / 60)}:{String(maxTime % 60).padStart(2, '0')}</text>
    </svg>
  );
}

function Stat({ label, value, theme }: { label: string; value: string | number; theme: string }) {
  const cardBg = theme === 'dark' ? '#1a1a1a' : '#f9fafb';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  return (
    <div style={{ background: cardBg, borderRadius: 8, padding: '8px 10px', textAlign: 'center', flex: 1 }}>
      <div style={{ fontSize: 10, color: subtextColor }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

export default function ReportRenderer() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) return <div style={loadingStyle}>Loading...</div>;

  const data = getToolOutput<ReportRendererData>();
  if (!data) return <div style={loadingStyle}>No report data</div>;

  const bgColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';

  return (
    <div style={{ background: bgColor, color: textColor, borderRadius: 16, padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif', border: `1px solid ${borderColor}`, maxWidth: 420 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor }}>Session Report</span>
        <span style={{ fontSize: 11, color: subtextColor }}>{data.sessionId}</span>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Stat label="Duration" value={data.summary.duration} theme={theme || 'light'} />
        <Stat label="Avg BPM" value={data.summary.averageBpm} theme={theme || 'light'} />
        <Stat label="Peak BPM" value={data.summary.peakBpm} theme={theme || 'light'} />
      </div>

      <div style={{ marginBottom: 8 }}>
        <HRCurve curve={data.vitalsCurve} interventions={data.interventions} theme={theme || 'light'} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Stat label="Stress episodes" value={data.summary.stressEpisodes} theme={theme || 'light'} />
        <Stat label="Interventions" value={data.summary.interventions} theme={theme || 'light'} />
        <Stat label="Recovery" value={data.summary.averageRecoveryTime} theme={theme || 'light'} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: `1px solid ${borderColor}`, fontSize: 12, color: subtextColor }}>
        <span>Transcript: {data.summary.transcriptSegments} segments</span>
        <span>Words: {data.summary.totalWords}</span>
      </div>
    </div>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 160, color: '#6b7280', fontSize: 14
};
