'use client';

import { useWidgetSDK, useTheme, defineWidgetMetadata } from '@nitrostack/widgets';

const widgetMetadata = defineWidgetMetadata({
  uri: '/device-status-bar',
  name: 'Device Status',
  description: 'Connection state indicators for watch and audio',
  examples: [
    {
      name: 'All Connected',
      description: 'Watch and earbuds connected',
      data: {
        watch: { connected: true, name: 'Pixel Watch 3', batteryLevel: 78, signalStrength: 'strong' },
        audio: { connected: true, name: 'Pixel Buds Pro 2', route: 'earbuds', batteryLevel: 62 }
      }
    },
    {
      name: 'Watch Disconnected',
      description: 'Watch lost connection',
      data: {
        watch: { connected: false, name: 'Pixel Watch 3', batteryLevel: 12, signalStrength: 'none' },
        audio: { connected: true, name: 'Pixel Buds Pro 2', route: 'earbuds', batteryLevel: 62 }
      }
    }
  ],
  tags: ['device', 'status', 'connectivity']
});

interface DeviceStatus {
  connected: boolean;
  name: string | null;
  batteryLevel: number | null;
  signalStrength?: string;
  route?: string;
}

interface DeviceData {
  watch: DeviceStatus;
  audio: DeviceStatus;
}

function BatteryIcon({ level }: { level: number | null }) {
  if (level === null) return <span style={{ fontSize: 10, color: '#6b7280' }}>--</span>;
  const color = level > 50 ? '#10b981' : level > 20 ? '#f59e0b' : '#ef4444';
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color }}>{level}%</span>
  );
}

function DeviceCard({ label, device, icon, theme }: { label: string; device: DeviceStatus; icon: string; theme: string }) {
  const bgColor = theme === 'dark' ? '#1a1a1a' : '#f9fafb';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';

  return (
    <div style={{ background: bgColor, borderRadius: 10, padding: 14, border: `1px solid ${borderColor}`, flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ fontSize: 20 }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: textColor }}>{label}</div>
          <div style={{ fontSize: 10, color: subtextColor }}>{device.name || 'Not connected'}</div>
        </div>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: device.connected ? '#10b981' : '#ef4444' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <BatteryIcon level={device.batteryLevel} />
        {device.route && (
          <span style={{ fontSize: 10, color: subtextColor, background: theme === 'dark' ? '#262626' : '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>
            {device.route}
          </span>
        )}
        {device.signalStrength && (
          <span style={{ fontSize: 10, color: subtextColor }}>
            {device.signalStrength === 'strong' ? '\u25B2\u25B2' : device.signalStrength === 'none' ? '\u2014' : '\u25B2'}
          </span>
        )}
      </div>
    </div>
  );
}

export default function DeviceStatusBar() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();

  if (!isReady) return <div style={loadingStyle}>Loading...</div>;

  const data = getToolOutput<DeviceData>();
  if (!data) return <div style={loadingStyle}>No device data</div>;

  const bgColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';
  const subtextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';

  return (
    <div style={{ background: bgColor, color: textColor, borderRadius: 16, padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif', border: `1px solid ${borderColor}`, maxWidth: 380 }}>
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: subtextColor, marginBottom: 16 }}>Devices</div>
      <div style={{ display: 'flex', gap: 12 }}>
        <DeviceCard label="Watch" device={data.watch} icon="\u231A" theme={theme || 'light'} />
        <DeviceCard label="Audio" device={data.audio} icon="\u{1F3A7}" theme={theme || 'light'} />
      </div>
    </div>
  );
}

const loadingStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  minHeight: 120, color: '#6b7280', fontSize: 14
};
