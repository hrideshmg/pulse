import type { ReactNode } from 'react';

export const metadata = {
  title: 'Pulse Widgets',
  description: 'NitroStack widgets for Pulse intervention receipts.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: '#0b1020',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        {children}
      </body>
    </html>
  );
}
