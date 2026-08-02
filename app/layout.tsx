import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteUrl } from '../lib/site';
import { SitePreferences } from '../components/SitePreferences';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Hezhin', template: '%s | Hezhin' },
  description: 'Browse Hezhin boutique collections, save favorites, and contact us directly for product inquiries.',
  applicationName: 'Hezhin',
  manifest: '/manifest.webmanifest',
  alternates: { canonical: '/' },
  icons: { icon: '/brand/hezhin-icon.png', shortcut: '/brand/hezhin-icon.png', apple: '/brand/hezhin-icon.png' },
  appleWebApp: { capable: true, title: 'Hezhin', statusBarStyle: 'black-translucent' },
  other: { 'apple-itunes-app': 'app-id=6792305536' },
  openGraph: {
    title: 'Hezhin',
    description: 'Elegant boutique fashion. Browse collections and contact Hezhin directly.',
    url: siteUrl,
    siteName: 'Hezhin',
    type: 'website',
    images: [{ url: '/brand/hezhin-icon.png', width: 1024, height: 1024, alt: 'Hezhin' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hezhin',
    description: 'Elegant boutique fashion. Browse collections and contact Hezhin directly.',
    images: ['/brand/hezhin-icon.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { colorScheme: 'light dark', themeColor: '#751111' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ku" dir="rtl" suppressHydrationWarning><body><SitePreferences>{children}</SitePreferences></body></html>;
}

