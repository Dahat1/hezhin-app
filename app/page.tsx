import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { HomeContent } from '../components/HomeContent';

export default function HomePage() {
  return <div className="site-page"><SiteHeader /><HomeContent /><SiteFooter /></div>;
}
