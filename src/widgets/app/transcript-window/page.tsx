'use client';

import { useWidgetSDK, useTheme, defineWidgetMetadata } from '@nitrostack/widgets';

const widgetMetadata = defineWidgetMetadata({
  uri: '/transcript-window',
  name: 'Transcript Window',
  description: 'Parameterized transcript slice with speaker labels',
  examples: [
    {
      name: 'Last 60 Seconds',
      description: 'Transcript from the last minute',
      data: {
        windowStart: '14:33:20', windowEnd: '14:34:20',
        segments: [
          { segmentId: 's12', speaker: 'wearer', text: 'Our enterprise tier includes dedicated support and a usage cap.', startTime: '14:33:22', endTime: '14:33:30', confidence: 0.95 },
          { segmentId: 's13', speaker: 'participant', text: 'What does the cap look like in practice?', startTime: '14:33:32', endTime: '14:33:36', confidence: 0.92 },
          { segmentId: 's14', speaker: 'wearer', text: 'For your team size, you\'d likely never hit it. Let me pull up the numbers.', startTime: '14:33:38', endTime: '14:33:45', confidence: 0.94 }
        ],
        segmentCount: 3
      }
    }
  ],
  tags: ['transcript', 'window', 'parameterized']
});

interface WindowSegment {
  segmentId: string;
  speaker: string;
  text: string;
  startTime: string;
  endTime: string;
  confidence: number;
}

interface TranscriptWindowData {
  windowStart: string;
  windowEnd: string;
  segments: WindowSegment[];
  segmentCount: number;
}

const SPEAKER_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  wearer: { bg: '#dbeafe', text: '#1d4ed8', label: 'Wearer' },
  participant: { bg: '#fce7f3', text: '#be185d', label: 'Participant' },
  agent: { bg: '#d1fae5', text: '#047857', label: 'Agent' },
  unknown: { bg: '#f3f4f6', text: '#6b7280', label: 'Unknown' },
};

export default function TranscriptWindow() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) return <div style={loadingStyle}>Loading...</div>;

  const data = getToolOutput<TranscriptWindowData>();
  if (!data) return <div style={loadingStyle}>No transcript window</div>;

  const bgColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';
  const segBg = theme === 'dark' ? '#1a1a1a' : '#f9fafb';

  return (
    <div style={{ background: bgColor, color: textColor, borderRadius: 16, padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif', border: `1px solid ${borderColor}`, maxWidth: 400 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor }}>Transcript Window</span>
        <span style={{ fontSize: 11, color: subtextColor, fontVariantNumeric: 'tabular-nums' }}>
          {data.windowStart} \u2013 {data.windowEnd}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.segments.map((seg) => {
          const config = SPEAKER_COLORS[seg.speaker] || SPEAKER_COLORS.unknown;
          const badgeBg = theme === 'dark' ? config.text + '22' : config.bg;
          return (
            <div key={seg.segmentId} style={{ background: segBg, borderRadius: 10, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: config.text, background: badgeBg, padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase' }}>
                  {config.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, color: subtextColor }}>conf: {(seg.confidence * 100).toFixed(0)}%</span>
                  <span style={{ fontSize: 11, color: subtextColor, fontVariantNumeric: 'tabular-nums' }}>{seg.startTime}</span>
                </div>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5 }}>{seg.text}</div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 12, fontSize: 11, color: subtextColor, textAlign: 'center' }}>
        {data.segmentCount} segment{data.segmentCount !== 1 ? 's' : ''} in window
      </div>
    </div>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 160, color: '#6b7280', fontSize: 14
};
