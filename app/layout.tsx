import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hezhin.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Hezhin',
  description: 'Discover Hezhin and order premium Kurdish dresses through WhatsApp.',
  openGraph: {
    title: 'Hezhin',
    description: 'Premium Kurdish fashion catalog. Browse in the app and order through WhatsApp.',
    url: siteUrl,
    siteName: 'Hezhin',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
