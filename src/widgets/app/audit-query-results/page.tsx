'use client';

import { useWidgetSDK, useTheme, defineWidgetMetadata } from '@nitrostack/widgets';

const widgetMetadata = defineWidgetMetadata({
  uri: '/audit-query-results',
  name: 'Audit Query Results',
  description: 'Filtered audit entries from query_audit_log',
  examples: [
    {
      name: 'Tool Calls Only',
      description: 'All tool calls in the session',
      data: {
        query: { kind: 'tool_call' },
        results: [
          { auditId: 'a5', timestamp: '14:32:15', tool: 'haptic_nudge', args: { pattern: 'calm_double' }, consentScope: 'act:haptic', outcome: 'delivered', correlationId: 'corr_1' },
          { auditId: 'a6', timestamp: '14:34:20', tool: 'whisper_coach', args: { message: 'Take a breath.' }, consentScope: 'act:audio', outcome: 'played', correlationId: 'corr_2' }
        ],
        totalMatches: 2
      }
    }
  ],
  tags: ['audit', 'query', 'filtered']
});

interface QueryResult {
  auditId: string;
  timestamp: string;
  tool: string;
  args: Record<string, unknown>;
  consentScope: string;
  outcome: string;
  correlationId: string;
}

interface AuditQueryData {
  query: { kind: string };
  results: QueryResult[];
  totalMatches: number;
}

const TOOL_ICONS: Record<string, string> = {
  haptic_nudge: '\u{1F4FF}',
  whisper_coach: '\u{1F3A7}',
  generate_session_report: '\u{1F4CB}',
  query_audit_log: '\u{1F50D}',
};

export default function AuditQueryResults() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) return <div style={loadingStyle}>Loading...</div>;

  const data = getToolOutput<AuditQueryData>();
  if (!data) return <div style={loadingStyle}>No query results</div>;

  const bgColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';
  const cardBg = theme === 'dark' ? '#1a1a1a' : '#f9fafb';

  return (
    <div style={{ background: bgColor, color: textColor, borderRadius: 16, padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif', border: `1px solid ${borderColor}`, maxWidth: 400 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor }}>Audit Query</span>
        <span style={{ fontSize: 11, color: subtextColor }}>{data.totalMatches} match{data.totalMatches !== 1 ? 'es' : ''}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, background: cardBg, borderRadius: 8, padding: '8px 12px' }}>
        <span style={{ fontSize: 12, color: subtextColor }}>Filter:</span>
        <code style={{ fontSize: 12, color: '#7c3aed', fontFamily: 'monospace' }}>kind = &quot;{data.query.kind}&quot;</code>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.results.map((result) => {
          const icon = TOOL_ICONS[result.tool] || '\u{1F527}';
          const outcomeColor = result.outcome === 'delivered' || result.outcome === 'played' ? '#10b981' : '#ef4444';
          return (
            <div key={result.auditId} style={{ background: cardBg, borderRadius: 10, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{result.tool}</div>
                    <div style={{ fontSize: 10, color: subtextColor }}>ID: {result.correlationId}</div>
                  </div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: outcomeColor, background: outcomeColor + '18', padding: '2px 8px', borderRadius: 4 }}>
                  {result.outcome}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: subtextColor }}>Time</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>{result.timestamp}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: subtextColor }}>Consent</span>
                  <span>{result.consentScope}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ color: subtextColor }}>Args</span>
                  <code style={{ fontSize: 11, fontFamily: 'monospace', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'right' }}>
                    {JSON.stringify(result.args)}
                  </code>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 160, color: '#6b7280', fontSize: 14
};
