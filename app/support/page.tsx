export const metadata = {
  title: 'Support | Hezhin',
  description: 'Support information for the Hezhin mobile application.',
};

export default function SupportPage() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <p style={styles.kicker}>Hezhin</p>
        <h1 style={styles.title}>Support</h1>
        <p style={styles.text}>
          Need help with the Hezhin app, your account, product inquiries, favorites, or delivery information?
          Contact support and we will help you as soon as possible.
        </p>
        <p style={styles.text}>
          Email: <a style={styles.link} href="mailto:dahatdev@gmail.com">dahatdev@gmail.com</a>
        </p>
        <p style={styles.footer}>© 2026 Hezhin Boutique. All rights reserved.</p>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #160000 0%, #2A0B11 55%, #160000 100%)',
    color: '#FFF7F1',
    padding: '34px 18px',
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  card: {
    maxWidth: 760,
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
    margin: '10px 0 16px',
    fontWeight: 950,
  },
  text: {
    color: '#E6D5CD',
    fontSize: 17,
    lineHeight: 1.75,
    marginBottom: 18,
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
