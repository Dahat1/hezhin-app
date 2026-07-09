import { ArrowRight, Apple, Download, Play, QrCode, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hezhin.app';
const downloadUrl = process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL || siteUrl;
const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL || '';
const googlePlayUrl = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL || '';

function StoreButton({
  href,
  icon,
  eyebrow,
  title,
}: {
  href: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  const isReady = Boolean(href);

  if (!isReady) {
    return (
      <div className="store-button disabled" aria-disabled="true">
        {icon}
        <div>
          <span>{eyebrow}</span>
          <strong>{title}</strong>
        </div>
      </div>
    );
  }

  return (
    <a className="store-button" href={href} target="_blank" rel="noreferrer">
      {icon}
      <div>
        <span>{eyebrow}</span>
        <strong>{title}</strong>
      </div>
    </a>
  );
}

export default function HomePage() {
  return (
    <main className="page">
      <div className="shell">
        <nav className="nav">
          <div className="brand-mark">
            <div className="logo-dot">H</div>
            <div>
              <div className="brand-title">Hezhin</div>
              <div className="brand-subtitle">Premium Kurdish Fashion</div>
            </div>
          </div>

          <a className="nav-pill" href="#download">
            Download App
          </a>
        </nav>

        <section className="hero-grid">
          <div>
            <div className="kicker">Hezhin App</div>
            <h1>Elegant dresses, simple ordering.</h1>
            <p className="hero-text">
              Browse Hezhin collections, view photos and videos, save favorites, and order selected
              products directly through WhatsApp.
            </p>

            <div className="actions">
              <StoreButton
                href={appStoreUrl}
                icon={<Apple size={24} />}
                eyebrow="Download on the"
                title={appStoreUrl ? 'App Store' : 'App Store Soon'}
              />

              <StoreButton
                href={googlePlayUrl}
                icon={<Play size={24} />}
                eyebrow="Get it on"
                title={googlePlayUrl ? 'Google Play' : 'Google Play Soon'}
              />
            </div>
          </div>

          <div className="visual-card" aria-label="Hezhin app preview">
            <div className="phone-frame">
              <div className="brand-mark">
                <div className="logo-dot">H</div>
                <div>
                  <div className="brand-title">Hezhin</div>
                  <div className="brand-subtitle">Catalog Preview</div>
                </div>
              </div>

              <div className="app-preview-grid">
                <div className="preview-card" />
                <div className="preview-card" />
                <div className="preview-card" />
                <div className="preview-card" />
              </div>

              <div className="phone-label">
                <strong>Browse the collection</strong>
                <span>Photos, videos, prices, sale items and WhatsApp ordering in one clean app.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="download" className="download-section">
          <div>
            <div className="kicker">Download</div>
            <h2>Scan to open Hezhin</h2>
            <p>
              This QR code can point to the App Store / Google Play download page when the apps are live.
              For now it opens hezhin.app.
            </p>

            <div className="actions">
              <a className="store-button" href={downloadUrl} target="_blank" rel="noreferrer">
                <Download size={22} />
                <div>
                  <span>Open</span>
                  <strong>Download Link</strong>
                </div>
              </a>

              <a className="store-button" href="/p/HB-000001">
                <Sparkles size={22} />
                <div>
                  <span>Preview</span>
                  <strong>Product Link Example</strong>
                </div>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="qr-box" aria-label="Hezhin download QR code">
            {downloadUrl ? <QRCodeSVG value={downloadUrl} size={112} /> : <QrCode size={96} />}
          </div>
        </section>

        <footer className="footer">
          <span>© 2026 Hezhin Boutique. All rights reserved.</span>
          <span>Powered by Dahat The Dev.</span>
        </footer>
      </div>
    </main>
  );
}
