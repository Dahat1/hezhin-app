import type { Metadata } from 'next';
import { PageShell } from '../../components/PageShell';
import { supportEmail } from '../../lib/site';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'Privacy Policy for the Hezhin mobile application.' };

export default function PrivacyPage() {
  return (
    <PageShell narrow>
      <article className="legal-card policy-content">
        <p className="eyebrow">HEZHIN</p>
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: July 2026</p>
        <p>Hezhin is a boutique product catalog application that allows customers to browse products, save favorites, manage basic account information, and contact Hezhin through WhatsApp for product inquiries and support.</p>
        <h2>Information we collect</h2>
        <p>Depending on how you use the app, we may collect your name, phone number, account code, saved delivery addresses, favorite products, notification preferences, and device push-notification token. Product media and catalog information are managed by Hezhin staff.</p>
        <h2>How we use your information</h2>
        <p>We use your information to operate the app, keep your account available, save favorites and addresses, help you contact Hezhin, provide customer support, send product updates or offers when notifications are enabled, and maintain the security and reliability of the service.</p>
        <h2>Notifications</h2>
        <p>If you allow notifications, Hezhin may send product updates, new-arrival announcements, sale notices, and service-related messages. You can disable notifications from the app or your device settings.</p>
        <h2>Payments and orders</h2>
        <p>Hezhin does not currently process payments inside the mobile app. Product inquiries and order discussions are handled through WhatsApp or direct communication with Hezhin.</p>
        <h2>Third-party services</h2>
        <p>Hezhin may use trusted services including Supabase for authentication and database services, Expo for push notifications, WhatsApp for customer communication, and website-hosting providers.</p>
        <h2>Data sharing</h2>
        <p>We do not sell personal information. We only process or share data when needed to operate the app, provide support, deliver enabled notifications, comply with legal obligations, or protect the service from misuse.</p>
        <h2>Data retention</h2>
        <p>We retain account and app data only as long as needed for the purposes described in this policy, unless a longer period is required by law or legitimate business, security, or recordkeeping needs.</p>
        <h2>Account deletion</h2>
        <p>Signed-in customers can permanently delete their account from Profile → Account & Privacy → Delete account. This removes the authentication account, profile, saved addresses, favorites, notification preferences, registered push tokens, and personal Notification Center records associated with the account.</p>
        <p>External deletion instructions are available at <a href="/delete-account">hezhin.app/delete-account</a>.</p>
        <h2>Your choices</h2>
        <p>You may update profile information, manage saved addresses, remove favorites, disable notifications, delete your account, or contact us for help with account information.</p>
        <h2>Children</h2>
        <p>The Hezhin app is intended for general boutique browsing and customer inquiries. It is not designed to knowingly collect personal information from children without appropriate permission.</p>
        <h2>Security</h2>
        <p>We use reasonable technical and organizational measures to protect app data. No internet service can be guaranteed to be completely secure, but we work to keep the service reliable and protected.</p>
        <h2>Changes to this policy</h2>
        <p>We may update this Privacy Policy from time to time. When changes are made, we will update the date shown at the top of this page.</p>
        <h2>Contact</h2>
        <p>For privacy questions, account support, or data requests, contact <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.</p>
      </article>
    </PageShell>
  );
}
