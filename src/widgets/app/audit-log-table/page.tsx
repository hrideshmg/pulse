'use client';

import { useWidgetSDK, useTheme, defineWidgetMetadata } from '@nitrostack/widgets';

const widgetMetadata = defineWidgetMetadata({
  uri: '/audit-log-table',
  name: 'Audit Log',
  description: 'Filterable table of resource reads and tool calls',
  examples: [
    {
      name: 'Co-Regulation Session',
      description: 'Audit entries from a complete co-regulation loop',
      data: {
        entries: [
          { auditId: 'a1', timestamp: '14:30:01', kind: 'resource_read', subject: 'session://current/vitals', consentScope: 'read:vitals', consentResult: 'granted', outcome: 'success' },
          { auditId: 'a2', timestamp: '14:30:02', kind: 'resource_read', subject: 'session://current/stress', consentScope: 'read:vitals', consentResult: 'granted', outcome: 'success' },
          { auditId: 'a3', timestamp: '14:30:03', kind: 'resource_read', subject: 'session://current/context', consentScope: 'read:context', consentResult: 'granted', outcome: 'success' },
          { auditId: 'a4', timestamp: '14:30:04', kind: 'resource_read', subject: 'session://current/transcript', consentScope: 'read:transcript', consentResult: 'granted', outcome: 'success' },
          { auditId: 'a5', timestamp: '14:32:15', kind: 'tool_call', subject: 'haptic_nudge', consentScope: 'act:haptic', consentResult: 'granted', outcome: 'delivered', args: { pattern: 'calm_double' }, correlationId: 'corr_1' },
          { auditId: 'a6', timestamp: '14:34:20', kind: 'tool_call', subject: 'whisper_coach', consentScope: 'act:audio', consentResult: 'granted', outcome: 'played', args: { message: 'Take a breath.' }, correlationId: 'corr_2' }
        ],
        totalEntries: 6, filteredBy: null
      }
    }
  ],
  tags: ['audit', 'log', 'compliance']
});

interface AuditEntry {
  auditId: string;
  timestamp: string;
  kind: string;
  subject: string;
  consentScope: string;
  consentResult: string;
  outcome: string;
  args?: Record<string, unknown>;
  correlationId?: string;
}

interface AuditData {
  entries: AuditEntry[];
  totalEntries: number;
  filteredBy: string | null;
}

function KindBadge({ kind, theme }: { kind: string; theme: string }) {
  const isTool = kind === 'tool_call';
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
      color: isTool ? '#7c3aed' : '#0369a1',
      background: isTool ? (theme === 'dark' ? '#2e10651a' : '#f5f3ff') : (theme === 'dark' ? '#0c4a6e1a' : '#f0f9ff'),
      padding: '2px 6px', borderRadius: 4, letterSpacing: '0.03em'
    }}>
      {isTool ? 'Tool' : 'Read'}
    </span>
  );
}

function OutcomeBadge({ outcome, theme }: { outcome: string; theme: string }) {
  const color = outcome === 'success' || outcome === 'delivered' || outcome === 'played' ? '#10b981' : '#ef4444';
  return (
    <span style={{ fontSize: 10, fontWeight: 600, color, background: color + '18', padding: '2px 6px', borderRadius: 4 }}>
      {outcome}
    </span>
  );
}

export default function AuditLogTable() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) return <div style={loadingStyle}>Loading...</div>;

  const data = getToolOutput<AuditData>();
  if (!data) return <div style={loadingStyle}>No audit data</div>;

  const bgColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';
  const rowBg = theme === 'dark' ? '#1a1a1a' : '#f9fafb';

  return (
    <div style={{ background: bgColor, color: textColor, borderRadius: 16, padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif', border: `1px solid ${borderColor}`, maxWidth: 440, overflowX: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor }}>Audit Log</span>
        <span style={{ fontSize: 11, color: subtextColor }}>{data.totalEntries} entries{data.filteredBy ? ` (${data.filteredBy})` : ''}</span>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
            {['Time', 'Kind', 'Subject', 'Consent', 'Outcome'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '8px 6px', fontWeight: 600, color: subtextColor, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.entries.map((entry) => (
            <tr key={entry.auditId} style={{ borderBottom: `1px solid ${borderColor}` }}>
              <td style={{ padding: '8px 6px', fontVariantNumeric: 'tabular-nums', color: subtextColor }}>{entry.timestamp}</td>
              <td style={{ padding: '8px 6px' }}><KindBadge kind={entry.kind} theme={theme || 'light'} /></td>
              <td style={{ padding: '8px 6px', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.subject}</td>
              <td style={{ padding: '8px 6px', color: subtextColor }}>{entry.consentResult}</td>
              <td style={{ padding: '8px 6px' }}><OutcomeBadge outcome={entry.outcome} theme={theme || 'light'} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 160, color: '#6b7280', fontSize: 14
};
