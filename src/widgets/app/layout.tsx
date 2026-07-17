import type { ReactNode } from 'react';

export const metadata = {
  title: 'Pulse Widgets',
  description: 'Widget previews for the Pulse NitroStack server'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#f5f5f5' }}>{children}</body>
    </html>
  );
}
