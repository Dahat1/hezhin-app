import { ReactNode } from 'react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export function PageShell({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) {
  return (
    <div className="site-page">
      <SiteHeader />
      <main className={narrow ? 'content-shell narrow' : 'content-shell'}>{children}</main>
      <SiteFooter />
    </div>
  );
}
