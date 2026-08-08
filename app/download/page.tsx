import type { Metadata } from 'next';
import DownloadRedirect from './DownloadRedirect';
import { PageShell } from '../../components/PageShell';

export const metadata: Metadata = {
  title: 'Download Hezhin',
  description: 'Download the Hezhin app for iPhone or Android.',
};

export default function DownloadPage() {
  return (
    <PageShell narrow>
      <DownloadRedirect />
    </PageShell>
  );
}
