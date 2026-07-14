export const metadata = {
  title: 'Delete Account | Hezhin',
  description: 'Instructions for permanently deleting a Hezhin account.',
};

export default function DeleteAccountPage() {
  const subject = encodeURIComponent('Hezhin account deletion request');
  const body = encodeURIComponent(
    'Hello Hezhin,\n\nI want to permanently delete my Hezhin account.\n\nPhone number used for the account:\nAccount code, if available:\n'
  );

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <p style={styles.kicker}>Hezhin</p>
        <h1 style={styles.title}>Delete Account</h1>
        <p style={styles.updated}>Last updated: July 2026</p>

        <p style={styles.text}>
          Hezhin customers can permanently delete their account directly inside the mobile
          application. You may also submit an external deletion request using the email option below.
        </p>

        <h2 style={styles.heading}>Delete your account inside the app</h2>
        <ol style={styles.list}>
          <li>Open the Hezhin application.</li>
          <li>Open the Profile tab.</li>
          <li>Open Account &amp; Privacy.</li>
          <li>Select Delete account.</li>
          <li>Review the warning and confirm Delete account once more.</li>
        </ol>

        <div style={styles.warning}>
          Account deletion is permanent and cannot be undone.
        </div>

        <h2 style={styles.heading}>Data deleted with your account</h2>
        <ul style={styles.list}>
          <li>Your customer profile and authentication account.</li>
          <li>Your saved delivery addresses and address notes.</li>
          <li>Your saved favorite products.</li>
          <li>Your notification preferences and registered push-notification tokens.</li>
          <li>Your personal Notification Center records.</li>
        </ul>

        <h2 style={styles.heading}>Request deletion without the app</h2>
        <p style={styles.text}>
          Send the request from the email address associated with you where possible. Include the
          phone number used for the account and your account code if available. We may request
          reasonable verification to prevent unauthorized deletion.
        </p>

        <a
          style={styles.button}
          href={`mailto:dahatdev@gmail.com?subject=${subject}&body=${body}`}
        >
          Request account deletion
        </a>

        <h2 style={styles.heading}>Limited retention</h2>
        <p style={styles.text}>
          Hezhin may retain limited information only where required by applicable law, for security
          and fraud prevention, dispute resolution, or legitimate accounting and business
          recordkeeping. Retained information is not used to recreate your deleted account.
        </p>

        <h2 style={styles.heading}>Contact</h2>
        <p style={styles.text}>
          For account deletion support, contact:{' '}
          <a style={styles.link} href="mailto:dahatdev@gmail.com">
            dahatdev@gmail.com
          </a>
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
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
  list: {
    color: '#E6D5CD',
    fontSize: 16,
    lineHeight: 1.8,
    paddingLeft: 24,
  },
  warning: {
    color: '#FFF7F1',
    background: 'rgba(155, 51, 66, 0.28)',
    border: '1px solid rgba(233, 214, 214, 0.28)',
    borderRadius: 14,
    padding: '14px 16px',
    fontSize: 15,
    fontWeight: 800,
    marginTop: 16,
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderRadius: 12,
    background: '#D8A15F',
    color: '#24100F',
    padding: '0 18px',
    fontSize: 15,
    fontWeight: 900,
    textDecoration: 'none',
    marginTop: 8,
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
