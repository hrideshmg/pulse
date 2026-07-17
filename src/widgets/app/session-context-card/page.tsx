'use client';

import { useWidgetSDK, useTheme, defineWidgetMetadata } from '@nitrostack/widgets';

const widgetMetadata = defineWidgetMetadata({
  uri: '/session-context-card',
  name: 'Session Context',
  description: 'Wearer summary, situation, participants, goals',
  examples: [
    {
      name: 'Sales Pitch Session',
      description: 'High-stakes pricing conversation',
      data: {
        wearerSummary: 'Senior software engineer, 8 years experience. Tends to rush speech when nervous.',
        situation: 'Live sales pitch to potential enterprise client. Pricing negotiation phase.',
        participants: ['Client CTO (decision maker)', 'Client procurement lead'],
        goals: ['Close the deal at listed price', 'Demonstrate technical superiority', 'Build long-term relationship'],
        topicsToAvoid: ['Competitor names', 'Past failures', 'Uncommitted timelines']
      }
    }
  ],
  tags: ['context', 'session', 'metadata']
});

interface ContextData {
  wearerSummary: string;
  situation: string;
  participants: string[];
  goals: string[];
  topicsToAvoid: string[];
}

function Section({ title, children, theme }: { title: string; children: React.ReactNode; theme: string }) {
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor, marginBottom: 6 }}>{title}</div>
      {children}
    </div>
  );
}

export default function SessionContextCard() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) return <div style={loadingStyle}>Loading...</div>;

  const data = getToolOutput<ContextData>();
  if (!data) return <div style={loadingStyle}>No context data</div>;

  const bgColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';
  const cardBg = theme === 'dark' ? '#1a1a1a' : '#f9fafb';

  return (
    <div style={{ background: bgColor, color: textColor, borderRadius: 16, padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif', border: `1px solid ${borderColor}`, maxWidth: 380 }}>
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor, marginBottom: 16 }}>Session Context</div>

      <Section title="Situation" theme={theme || 'light'}>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: textColor }}>{data.situation}</div>
      </Section>

      <Section title="Wearer" theme={theme || 'light'}>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: textColor }}>{data.wearerSummary}</div>
      </Section>

      <Section title="Participants" theme={theme || 'light'}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {data.participants.map((p, i) => (
            <span key={i} style={{ fontSize: 12, background: cardBg, color: textColor, padding: '4px 10px', borderRadius: 6, border: `1px solid ${borderColor}` }}>{p}</span>
          ))}
        </div>
      </Section>

      <Section title="Goals" theme={theme || 'light'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {data.goals.map((g, i) => (
            <div key={i} style={{ fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
              <span style={{ color: '#10b981', fontWeight: 700, lineHeight: 1.4 }}>\u2713</span>
              <span>{g}</span>
            </div>
          ))}
        </div>
      </Section>

      {data.topicsToAvoid.length > 0 && (
        <Section title="Topics to Avoid" theme={theme || 'light'}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {data.topicsToAvoid.map((t, i) => (
              <span key={i} style={{ fontSize: 12, background: theme === 'dark' ? '#3b1a1a' : '#fef2f2', color: '#ef4444', padding: '4px 10px', borderRadius: 6 }}>{t}</span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 160, color: '#6b7280', fontSize: 14
};
