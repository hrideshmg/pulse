'use client';

import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

type DeliveryReceipt = {
  sessionId: string;
  interventionId: string;
  toolName: 'haptic_nudge' | 'whisper_coach';
  correlationId: string;
  requestedAt: string;
  commandStatus: 'queued' | 'dispatched' | 'delivered' | 'denied' | 'failed' | 'expired';
  deliveryResult: 'pending' | 'delivered' | 'expired' | 'cancelled' | 'failed' | 'denied';
  simulated: boolean;
  consentCheck: {
    scope: string;
    allowed: boolean;
    checkedAt: string;
    reason: string | null;
  };
  target: {
    channel: 'watch_haptics' | 'earbud_tts';
    pattern: string | null;
    message: string | null;
  };
  deliveryAcknowledgement: {
    status: 'pending' | 'acknowledged' | 'unavailable' | 'failed';
    acknowledgedAt: string | null;
    detail: string;
  };
};

export default function InterventionDeliveryReceiptPage() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) {
    return <Shell theme={theme}><div style={{ fontSize: 14 }}>Loading receipt...</div></Shell>;
  }

  const receipt = getToolOutput<DeliveryReceipt>();

  if (!receipt) {
    return <Shell theme={theme}><div style={{ fontSize: 14 }}>No delivery receipt available.</div></Shell>;
  }

  const palette = getPalette(theme);
  const success = receipt.deliveryResult === 'delivered' && receipt.consentCheck.allowed;
  const accent = success ? palette.success : palette.warn;

  return (
    <Shell theme={theme}>
      <div
        style={{
          background: palette.card,
          border: `1px solid ${palette.border}`,
          borderRadius: 20,
          padding: 20,
          boxShadow: `0 18px 45px ${palette.shadow}`,
          color: palette.text
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
          <div>
            <div style={{ color: palette.muted, fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase' }}>
              Intervention Delivery Receipt
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>
              {receipt.toolName === 'haptic_nudge' ? 'Watch Haptic' : 'Whisper Coach'}
            </div>
          </div>
          <Badge label={receipt.deliveryResult.replace('_', ' ')} tone={accent} text={palette.text} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12, marginTop: 18 }}>
          <Metric label="Consent" value={receipt.consentCheck.allowed ? 'Allowed' : 'Denied'} palette={palette} />
          <Metric label="Command" value={formatLabel(receipt.commandStatus)} palette={palette} />
          <Metric label="Requested" value={formatTimestamp(receipt.requestedAt)} palette={palette} />
          <Metric label="Ack" value={formatLabel(receipt.deliveryAcknowledgement.status)} palette={palette} />
        </div>

        <div style={{ marginTop: 18, padding: 14, borderRadius: 16, background: palette.panel, border: `1px solid ${palette.border}` }}>
          <div style={{ color: palette.muted, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
            Delivered action
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>
            {receipt.target.pattern ? `Pattern: ${formatLabel(receipt.target.pattern)}` : 'Whispered message'}
          </div>
          {receipt.target.message ? (
            <div style={{ marginTop: 8, fontSize: 15, lineHeight: 1.5, color: palette.text }}>
              “{receipt.target.message}”
            </div>
          ) : null}
        </div>

        <div style={{ marginTop: 18, padding: 14, borderRadius: 16, background: palette.panel, border: `1px solid ${palette.border}` }}>
          <div style={{ color: palette.muted, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
            Acknowledgement
          </div>
          <div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.5 }}>{receipt.deliveryAcknowledgement.detail}</div>
          {receipt.consentCheck.reason ? (
            <div style={{ marginTop: 8, color: palette.warn, fontSize: 13 }}>{receipt.consentCheck.reason}</div>
          ) : null}
        </div>

        <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <Badge label={receipt.simulated ? 'Simulated' : 'Real path'} tone={palette.info} text={palette.text} />
          <Badge label={`Scope ${receipt.consentCheck.scope}`} tone={palette.border} text={palette.text} />
          <Badge label={`Correlation ${receipt.correlationId}`} tone={palette.border} text={palette.text} />
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children, theme }: { children: React.ReactNode; theme: 'light' | 'dark' | null }) {
  const palette = getPalette(theme);
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: 16,
        background: palette.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ width: '100%', maxWidth: 620 }}>{children}</div>
    </main>
  );
}

function Metric({ label, value, palette }: { label: string; value: string; palette: ReturnType<typeof getPalette> }) {
  return (
    <div style={{ padding: 14, borderRadius: 16, background: palette.panel, border: `1px solid ${palette.border}` }}>
      <div style={{ color: palette.muted, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
      <div style={{ marginTop: 6, fontSize: 15, fontWeight: 600 }}>{value}</div>
    </div>
  );
}

function Badge({ label, tone, text }: { label: string; tone: string; text: string }) {
  return (
    <div
      style={{
        borderRadius: 999,
        padding: '8px 12px',
        fontSize: 12,
        fontWeight: 700,
        background: tone,
        color: text,
        textTransform: 'uppercase',
        letterSpacing: 0.7
      }}
    >
      {label}
    </div>
  );
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatLabel(value: string) {
  return value.replace(/_/g, ' ');
}

function getPalette(theme: 'light' | 'dark' | null) {
  if (theme === 'light') {
    return {
      background: 'linear-gradient(180deg, #f4f0ff 0%, #ffffff 100%)',
      card: '#ffffff',
      panel: '#f8f5ff',
      border: '#d9d0f0',
      text: '#18112b',
      muted: '#665b82',
      success: '#bbf7d0',
      warn: '#fde68a',
      info: '#c4b5fd',
      shadow: 'rgba(52, 33, 90, 0.12)'
    };
  }

  return {
    background: 'linear-gradient(180deg, #090b14 0%, #161127 100%)',
    card: '#17122a',
    panel: '#0d1323',
    border: '#2b2440',
    text: '#f5f0ff',
    muted: '#b7abd5',
    success: '#14532d',
    warn: '#713f12',
    info: '#4c1d95',
    shadow: 'rgba(0, 0, 0, 0.4)'
  };
}
