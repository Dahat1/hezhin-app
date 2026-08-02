import type { Metadata } from 'next';
import DownloadRedirect from './DownloadRedirect';
import { PageShell } from '../../components/PageShell';
import { StoreButtons } from '../../components/StoreButtons';

export const metadata: Metadata = {
  title: 'Download Hezhin',
  description: 'Download the Hezhin app for iPhone or Android.',
};

export default function DownloadPage() {
  return (
    <PageShell narrow>
      <DownloadRedirect />
      <section className="legal-card centered-card">
        <p className="eyebrow">HEZHIN APP</p>
        <h1>Download Hezhin</h1>
        <p className="lead">Choose your store to browse Hezhin collections on your phone.</p>
        <StoreButtons />
      </section>
    </PageShell>
  );
}
