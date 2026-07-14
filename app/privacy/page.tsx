export const metadata = {
  title: 'Privacy Policy | Hezhin',
  description: 'Privacy Policy for the Hezhin mobile application.',
};

export default function PrivacyPage() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <p style={styles.kicker}>Hezhin</p>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.updated}>Last updated: July 2026</p>

        <p style={styles.text}>
          Hezhin is a boutique product catalog application that allows customers to browse products,
          save favorites, manage basic account information, and contact Hezhin through WhatsApp for
          product inquiries and support.
        </p>

        <h2 style={styles.heading}>Information we collect</h2>
        <p style={styles.text}>
          Depending on how you use the app, we may collect your name, phone number, account code,
          saved delivery addresses, favorite products, notification preferences, and device push
          notification token. Product media and catalog information are managed by Hezhin staff.
        </p>

        <h2 style={styles.heading}>How we use your information</h2>
        <p style={styles.text}>
          We use your information to operate the app, keep your account available, save your
          favorites and addresses, help you contact Hezhin, provide customer support, send important
          product updates or offers when notifications are enabled, and maintain the security and
          reliability of the service.
        </p>

        <h2 style={styles.heading}>Notifications</h2>
        <p style={styles.text}>
          If you allow notifications, Hezhin may send product updates, new arrival announcements,
          sale notices, and service-related messages. You can disable notifications at any time from
          the app settings or from your device notification settings.
        </p>

        <h2 style={styles.heading}>Payments and orders</h2>
        <p style={styles.text}>
          Hezhin does not currently process payments inside the mobile app. Product inquiries and
          order discussions are handled through WhatsApp or direct communication with Hezhin.
        </p>

        <h2 style={styles.heading}>Third-party services</h2>
        <p style={styles.text}>
          Hezhin may use trusted third-party services to operate the app and website, including
          Supabase for authentication and database services, Expo for push notifications, WhatsApp
          for customer communication, and Vercel or similar hosting providers for website delivery.
        </p>

        <h2 style={styles.heading}>Data sharing</h2>
        <p style={styles.text}>
          We do not sell your personal information. We only share or process information when needed
          to operate the app, provide customer support, deliver notifications you enabled, comply
          with legal obligations, or protect the service from misuse.
        </p>

        <h2 style={styles.heading}>Data retention</h2>
        <p style={styles.text}>
          We keep account and app data only as long as needed for the purposes described in this
          policy, unless a longer retention period is required by law or necessary for legitimate
          business, security, or recordkeeping purposes.
        </p>


        <h2 style={styles.heading}>Account deletion</h2>
        <p style={styles.text}>
          Signed-in customers can permanently delete their account inside the Hezhin mobile
          application from Profile → Account &amp; Privacy → Delete account. Account deletion removes
          the customer authentication account, profile, saved delivery addresses, favorite products,
          notification preferences, registered push-notification tokens, and personal Notification
          Center records associated with the account.
        </p>
        <p style={styles.text}>
          Account deletion instructions and an external request option are available at:{' '}
          <a style={styles.link} href="/delete-account">
            hezhin.app/delete-account
          </a>
        </p>

        <h2 style={styles.heading}>Your choices</h2>
        <p style={styles.text}>
          You may update your profile information in the app, manage saved addresses, remove
          favorites, disable notifications, permanently delete your account, or request help with
          account information by contacting us. You may also control app permissions from your
          device settings.
        </p>

        <h2 style={styles.heading}>Children</h2>
        <p style={styles.text}>
          The Hezhin app is intended for general boutique browsing and customer inquiries. It is not
          designed to knowingly collect personal information from children without appropriate
          permission.
        </p>

        <h2 style={styles.heading}>Security</h2>
        <p style={styles.text}>
          We use reasonable technical and organizational measures to protect app data. No internet
          service can be guaranteed to be completely secure, but we work to keep the service reliable
          and protected.
        </p>

        <h2 style={styles.heading}>Changes to this policy</h2>
        <p style={styles.text}>
          We may update this Privacy Policy from time to time. When we make changes, we will update
          the date at the top of this page.
        </p>

        <h2 style={styles.heading}>Contact</h2>
        <p style={styles.text}>
          For privacy questions, account support, or data requests, contact us at:
          {' '}<a style={styles.link} href="mailto:dahatdev@gmail.com">dahatdev@gmail.com</a>
        </p>

        <p style={styles.footer}>© 2026 Hezhin Boutique. All rights reserved.</p>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #160000 0%, #2A0B11 52%, #160000 100%)',
    color: '#FFF7F1',
    padding: '34px 18px',
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  card: {
    maxWidth: 920,
    margin: '0 auto',
    background: 'rgba(255, 247, 241, 0.065)',
    border: '1px solid rgba(255, 247, 241, 0.16)',
    borderRadius: 30,
    padding: '38px 24px',
    boxShadow: '0 24px 80px rgba(0, 0, 0, 0.35)',
  },
  kicker: {
    color: '#D8A15F',
    fontSize: 13,
    fontWeight: 900,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    margin: 0,
  },
  title: {
    fontSize: 42,
    lineHeight: 1.05,
    margin: '10px 0 8px',
    fontWeight: 950,
  },
  updated: {
    color: '#CDB7AD',
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 28,
  },
  heading: {
    fontSize: 20,
    margin: '28px 0 8px',
    fontWeight: 900,
    color: '#FFF7F1',
  },
  text: {
    color: '#E6D5CD',
    fontSize: 16,
    lineHeight: 1.75,
    margin: '0 0 10px',
  },
  link: {
    color: '#D8A15F',
    fontWeight: 900,
  },
  footer: {
    color: '#BFAEAA',
    fontSize: 13,
    marginTop: 34,
  },
};
