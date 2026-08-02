import type { Metadata } from 'next';
import { Bell, CircleHelp, Mail, MessageCircle, ShieldCheck, Smartphone } from 'lucide-react';
import { PageShell } from '../../components/PageShell';
import { StoreButtons } from '../../components/StoreButtons';
import { buildWhatsAppUrl, supportEmail } from '../../lib/site';

export const metadata: Metadata = { title: 'Support', description: 'Support information for the Hezhin mobile application.' };

const whatsappUrl = buildWhatsAppUrl('Hello Hezhin, I need help with the Hezhin app.');

export default function SupportPage() {
  return (
    <PageShell>
      <section className="legal-card support-hero">
        <p className="eyebrow">HELP CENTER</p>
        <h1>How can we help?</h1>
        <p className="lead">Get help with your account, notifications, favorites, products, WhatsApp inquiries, or the Hezhin app.</p>
        <div className="support-actions">
          {whatsappUrl ? <a className="primary-action" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={20}/> WhatsApp Support</a> : null}
          <a className="secondary-action" href={`mailto:${supportEmail}`}><Mail size={20}/> Email Support</a>
        </div>
      </section>

      <section className="support-grid">
        <article><Smartphone /><h2>App and account</h2><p>Sign-in, profile, saved addresses, favorites and account access.</p></article>
        <article><Bell /><h2>Notifications</h2><p>Permission, language preferences and notification settings.</p></article>
        <article><MessageCircle /><h2>Product inquiries</h2><p>Open a product in the app and use the WhatsApp button to contact Hezhin.</p></article>
        <article><ShieldCheck /><h2>Privacy and deletion</h2><p>Read our policy or permanently delete your customer account.</p><a href="/delete-account">Delete account →</a></article>
      </section>

      <section className="legal-card faq-card">
        <div className="faq-heading"><CircleHelp size={24}/><h2>Frequently asked questions</h2></div>
        <details><summary>Can I order inside the app?</summary><p>Hezhin currently handles product inquiries and order discussions through WhatsApp.</p></details>
        <details><summary>How do I change the app language?</summary><p>Open the menu in the Hezhin app and select English, Kurdish, or Arabic.</p></details>
        <details><summary>How do I delete my account?</summary><p>Use Profile → Account & Privacy → Delete account, or use our external deletion page.</p></details>
        <StoreButtons compact />
      </section>
    </PageShell>
  );
}
