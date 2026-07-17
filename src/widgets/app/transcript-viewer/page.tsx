'use client';

import { useWidgetSDK, useTheme, defineWidgetMetadata } from '@nitrostack/widgets';

const widgetMetadata = defineWidgetMetadata({
  uri: '/transcript-viewer',
  name: 'Transcript Viewer',
  description: 'Scrolling speaker-labeled transcript with timestamps',
  examples: [
    {
      name: 'Pricing Discussion',
      description: 'Segment where stress was detected',
      data: {
        segments: [
          { segmentId: 's1', speaker: 'participant', text: 'We need to understand the pricing model better before committing.', startTime: '0:42', endTime: '0:48', confidence: 0.96, status: 'final' },
          { segmentId: 's2', speaker: 'wearer', text: 'Absolutely. Our pricing is designed to scale with your usage.', startTime: '0:48', endTime: '0:56', confidence: 0.94, status: 'final' },
          { segmentId: 's3', speaker: 'participant', text: 'That sounds like it could get expensive at our scale. Can you give us a ceiling?', startTime: '0:57', endTime: '1:03', confidence: 0.91, status: 'final' },
          { segmentId: 's4', speaker: 'wearer', text: 'We can discuss enterprise tier pricing which includes a cap.', startTime: '1:04', endTime: '1:11', confidence: 0.93, status: 'final' }
        ],
        totalSegments: 4, lastUpdated: '1:11'
      }
    }
  ],
  tags: ['transcript', 'speech', 'conversation']
});

interface TranscriptSegment {
  segmentId: string;
  speaker: string;
  text: string;
  startTime: string;
  endTime: string;
  confidence: number;
  status: string;
}

interface TranscriptData {
  segments: TranscriptSegment[];
  totalSegments: number;
  lastUpdated: string;
}

const SPEAKER_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  wearer: { bg: '#dbeafe', text: '#1d4ed8', label: 'Wearer' },
  participant: { bg: '#fce7f3', text: '#be185d', label: 'Participant' },
  agent: { bg: '#d1fae5', text: '#047857', label: 'Agent' },
  unknown: { bg: '#f3f4f6', text: '#6b7280', label: 'Unknown' },
};

function SpeakerBadge({ speaker, theme }: { speaker: string; theme: string }) {
  const config = SPEAKER_COLORS[speaker] || SPEAKER_COLORS.unknown;
  const bg = theme === 'dark' ? config.text + '22' : config.bg;
  return (
    <span style={{ fontSize: 10, fontWeight: 600, color: config.text, background: bg, padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
      {config.label}
    </span>
  );
}

export default function TranscriptViewer() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) return <div style={loadingStyle}>Loading...</div>;

  const data = getToolOutput<TranscriptData>();
  if (!data) return <div style={loadingStyle}>No transcript</div>;

  const bgColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';
  const segBg = theme === 'dark' ? '#1a1a1a' : '#f9fafb';

  return (
    <div style={{ background: bgColor, color: textColor, borderRadius: 16, padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif', border: `1px solid ${borderColor}`, maxWidth: 400, maxHeight: 400, overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor }}>Transcript</span>
        <span style={{ fontSize: 11, color: subtextColor }}>{data.totalSegments} segments</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.segments.map((seg) => (
          <div key={seg.segmentId} style={{ background: segBg, borderRadius: 10, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <SpeakerBadge speaker={seg.speaker} theme={theme || 'light'} />
              <span style={{ fontSize: 11, color: subtextColor, fontVariantNumeric: 'tabular-nums' }}>{seg.startTime}</span>
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.5 }}>{seg.text}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, fontSize: 11, color: subtextColor, textAlign: 'center' }}>
        Last updated: {data.lastUpdated}
      </div>
    </div>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 160, color: '#6b7280', fontSize: 14
};
