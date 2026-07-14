'use client';

import { FormEvent, useMemo, useState } from 'react';
import { createClient, User } from '@supabase/supabase-js';

type Profile = {
  id: string;
  full_name: string | null;
  phone_number: string | null;
  account_code: string | null;
  role: string | null;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

function normalizeIraqPhoneNumber(input: string) {
  let value = input.trim();

  value = value.replace(/\s/g, '');
  value = value.replace(/-/g, '');
  value = value.replace(/\(/g, '');
  value = value.replace(/\)/g, '');

  if (value.startsWith('00964')) value = value.slice(5);
  if (value.startsWith('+964')) value = value.slice(4);
  if (value.startsWith('964')) value = value.slice(3);
  if (value.startsWith('0')) value = value.slice(1);

  return `+964${value}`;
}

function isValidIraqPhoneNumber(input: string) {
  return /^\+9647\d{9}$/.test(normalizeIraqPhoneNumber(input));
}

function phoneToAuthEmail(phoneNumber: string) {
  const normalized = normalizeIraqPhoneNumber(phoneNumber);
  return `${normalized.replace('+', '')}@hezhin.local`;
}

export default function DeleteAccountClient() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [step, setStep] = useState<'login' | 'confirm' | 'done'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canDelete = useMemo(
    () => confirmation.trim().toUpperCase() === 'YES' && !loading,
    [confirmation, loading]
  );

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!isValidIraqPhoneNumber(phone)) {
      setError('Enter the phone number linked to your Hezhin account.');
      return;
    }

    if (!password) {
      setError('Enter your password.');
      return;
    }

    setLoading(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: phoneToAuthEmail(phone),
      password,
    });

    if (signInError || !data.user) {
      setLoading(false);
      setError('We couldn’t sign in with these details. Check your phone number and password.');
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name, phone_number, account_code, role')
      .eq('id', data.user.id)
      .single<Profile>();

    if (profileError || !profileData) {
      await supabase.auth.signOut();
      setLoading(false);
      setError('Your customer profile could not be loaded.');
      return;
    }

    if (profileData.role === 'admin') {
      await supabase.auth.signOut();
      setLoading(false);
      setError('Admin accounts cannot be deleted from this page.');
      return;
    }

    setAuthUser(data.user);
    setProfile(profileData);
    setStep('confirm');
    setLoading(false);
  };

  const deleteAccount = async () => {
    if (!canDelete || !authUser) return;

    setLoading(true);
    setError('');

    const { data, error: functionError } = await supabase.functions.invoke('delete-account', {
      body: {},
    });

    if (functionError || !data?.success) {
      setLoading(false);
      setError(
        data?.error ||
          functionError?.message ||
          'Your account could not be deleted. Please try again.'
      );
      return;
    }

    await supabase.auth.signOut();

    setProfile(null);
    setAuthUser(null);
    setPassword('');
    setConfirmation('');
    setStep('done');
    setLoading(false);
  };

  const cancel = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setAuthUser(null);
    setPassword('');
    setConfirmation('');
    setError('');
    setStep('login');
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.brandBox}>
          <div style={styles.brandMark}>H</div>
          <div>
            <p style={styles.brand}>HEZHIN</p>
            <p style={styles.brandSub}>BOUTIQUE</p>
          </div>
        </div>

        {step === 'login' ? (
          <>
            <p style={styles.kicker}>ACCOUNT & PRIVACY</p>
            <h1 style={styles.title}>Delete your account</h1>
            <p style={styles.intro}>
              Sign in with the same phone number and password you use in the Hezhin app.
              Your account will not be deleted until you review the account details and confirm.
            </p>

            <form onSubmit={signIn} style={styles.form}>
              <label style={styles.label} htmlFor="phone">
                Account phone number
              </label>
              <input
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="07XX XXX XXXX"
                inputMode="tel"
                autoComplete="tel"
                style={styles.input}
              />

              <label style={styles.label} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
                type="password"
                autoComplete="current-password"
                style={styles.input}
              />

              {error ? <div style={styles.error}>{error}</div> : null}

              <button type="submit" style={styles.primaryButton} disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in securely'}
              </button>
            </form>

            <div style={styles.infoBox}>
              <strong>Security:</strong> A phone number alone is not enough. The correct account
              password is required before the deletion option becomes available.
            </div>
          </>
        ) : null}

        {step === 'confirm' && profile ? (
          <>
            <p style={styles.kicker}>FINAL CONFIRMATION</p>
            <h1 style={styles.title}>Permanently delete account</h1>
            <p style={styles.intro}>
              Review the account below. This action permanently removes the account and cannot be undone.
            </p>

            <div style={styles.accountCard}>
              <div style={styles.accountRow}>
                <span style={styles.accountLabel}>Account</span>
                <strong style={styles.accountValue}>{profile.account_code || '—'}</strong>
              </div>
              <div style={styles.accountRow}>
                <span style={styles.accountLabel}>Name</span>
                <strong style={styles.accountValue}>{profile.full_name || 'Customer'}</strong>
              </div>
              <div style={styles.accountRow}>
                <span style={styles.accountLabel}>Phone</span>
                <strong style={styles.accountValue}>
                  {profile.phone_number || normalizeIraqPhoneNumber(phone)}
                </strong>
              </div>
            </div>

            <div style={styles.warningBox}>
              <p style={styles.warningTitle}>The following data will be permanently removed:</p>
              <ul style={styles.list}>
                <li>Customer profile and authentication account</li>
                <li>Saved delivery addresses and address notes</li>
                <li>Favorite products</li>
                <li>Notification preferences and push-notification tokens</li>
                <li>Personal Notification Center records</li>
              </ul>
            </div>

            <label style={styles.label} htmlFor="confirm">
              Type <strong>YES</strong> to confirm
            </label>
            <input
              id="confirm"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              placeholder="YES"
              autoComplete="off"
              style={styles.input}
            />

            {error ? <div style={styles.error}>{error}</div> : null}

            <div style={styles.actions}>
              <button type="button" style={styles.secondaryButton} onClick={cancel} disabled={loading}>
                Cancel
              </button>
              <button
                type="button"
                style={{
                  ...styles.deleteButton,
                  opacity: canDelete ? 1 : 0.45,
                  cursor: canDelete ? 'pointer' : 'not-allowed',
                }}
                onClick={deleteAccount}
                disabled={!canDelete}
              >
                {loading ? 'Deleting account...' : 'Delete account forever'}
              </button>
            </div>
          </>
        ) : null}

        {step === 'done' ? (
          <div style={styles.doneBox}>
            <div style={styles.doneIcon}>✓</div>
            <p style={styles.kicker}>ACCOUNT DELETED</p>
            <h1 style={styles.title}>Your account has been deleted</h1>
            <p style={styles.intro}>
              Your Hezhin customer account and associated personal account data were permanently removed.
            </p>
            <a href="/" style={styles.primaryLink}>
              Return to Hezhin
            </a>
          </div>
        ) : null}

        <p style={styles.footer}>
          Need help?{' '}
          <a style={styles.link} href="mailto:dahatdev@gmail.com">
            dahatdev@gmail.com
          </a>
          <br />
          © 2026 Hezhin Boutique. All rights reserved.
        </p>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at 50% -10%, rgba(131, 35, 50, 0.28), transparent 38%), linear-gradient(180deg, #120609 0%, #210B10 52%, #120609 100%)',
    color: '#FFF8F1',
    padding: '34px 18px',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: 720,
    margin: '0 auto',
    borderRadius: 30,
    border: '1px solid rgba(255, 248, 241, 0.14)',
    background: 'rgba(28, 12, 16, 0.88)',
    boxShadow: '0 28px 90px rgba(0, 0, 0, 0.42)',
    padding: '30px clamp(20px, 5vw, 42px)',
    backdropFilter: 'blur(18px)',
  },
  brandBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 24,
    borderBottom: '1px solid rgba(255, 248, 241, 0.12)',
    marginBottom: 28,
  },
  brandMark: {
    width: 48,
    height: 48,
    borderRadius: 15,
    background: 'linear-gradient(145deg, #8E2131, #4D0F18)',
    color: '#FFF4DF',
    display: 'grid',
    placeItems: 'center',
    fontFamily: 'Georgia, serif',
    fontSize: 27,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16)',
  },
  brand: {
    margin: 0,
    fontFamily: 'Georgia, serif',
    fontSize: 20,
    letterSpacing: 4,
    color: '#F5D7A3',
  },
  brandSub: {
    margin: '3px 0 0',
    fontSize: 8,
    letterSpacing: 4,
    color: '#CDB7AD',
  },
  kicker: {
    margin: 0,
    color: '#D4A057',
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 2,
  },
  title: {
    margin: '9px 0 12px',
    color: '#FFF8F1',
    fontSize: 'clamp(34px, 7vw, 48px)',
    lineHeight: 1.05,
    letterSpacing: '-1.4px',
  },
  intro: {
    color: '#D8C5BC',
    fontSize: 16,
    lineHeight: 1.75,
    margin: '0 0 24px',
  },
  form: {
    display: 'grid',
    gap: 8,
  },
  label: {
    color: '#F1E5DF',
    fontSize: 12,
    fontWeight: 800,
    marginTop: 8,
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    height: 52,
    borderRadius: 14,
    border: '1px solid rgba(255, 248, 241, 0.16)',
    background: 'rgba(255, 248, 241, 0.07)',
    color: '#FFF8F1',
    padding: '0 15px',
    outline: 'none',
    fontSize: 15,
  },
  primaryButton: {
    height: 52,
    border: 0,
    borderRadius: 14,
    background: 'linear-gradient(135deg, #D5A15C, #A9702F)',
    color: '#24110F',
    fontSize: 14,
    fontWeight: 900,
    marginTop: 12,
    cursor: 'pointer',
  },
  error: {
    border: '1px solid rgba(218, 108, 119, 0.34)',
    background: 'rgba(154, 42, 56, 0.18)',
    color: '#FFD6DB',
    borderRadius: 13,
    padding: '12px 14px',
    fontSize: 13,
    marginTop: 8,
  },
  accountCard: {
    border: '1px solid rgba(255, 248, 241, 0.14)',
    background: 'rgba(255, 248, 241, 0.055)',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 18,
  },
  accountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 18,
    padding: '14px 16px',
    borderBottom: '1px solid rgba(255, 248, 241, 0.09)',
  },
  accountLabel: {
    color: '#BDAAA2',
    fontSize: 13,
  },
  accountValue: {
    color: '#FFF8F1',
    fontSize: 13,
    textAlign: 'right',
    overflowWrap: 'anywhere',
  },
  warningBox: {
    border: '1px solid rgba(221, 106, 120, 0.28)',
    background: 'rgba(121, 28, 41, 0.20)',
    borderRadius: 17,
    padding: '15px 17px',
    marginBottom: 18,
  },
  warningTitle: {
    color: '#FFE7EA',
    fontSize: 13,
    fontWeight: 900,
    margin: 0,
  },
  list: {
    color: '#DEC9C4',
    lineHeight: 1.7,
    fontSize: 13,
    paddingLeft: 20,
    marginBottom: 0,
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: 'minmax(110px, 0.8fr) minmax(180px, 1.4fr)',
    gap: 10,
    marginTop: 14,
  },
  secondaryButton: {
    height: 50,
    borderRadius: 14,
    border: '1px solid rgba(255, 248, 241, 0.18)',
    background: 'transparent',
    color: '#FFF8F1',
    fontWeight: 800,
    cursor: 'pointer',
  },
  deleteButton: {
    height: 50,
    borderRadius: 14,
    border: 0,
    background: 'linear-gradient(135deg, #A93446, #741E2C)',
    color: '#FFFFFF',
    fontWeight: 900,
  },
  doneBox: {
    textAlign: 'center',
    padding: '20px 0 8px',
  },
  doneIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    background: 'rgba(67, 151, 103, 0.18)',
    border: '1px solid rgba(109, 199, 145, 0.30)',
    color: '#8DE0AD',
    display: 'grid',
    placeItems: 'center',
    fontSize: 30,
    margin: '0 auto 20px',
  },
  primaryLink: {
    minHeight: 50,
    borderRadius: 14,
    background: 'linear-gradient(135deg, #D5A15C, #A9702F)',
    color: '#24110F',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 22px',
    textDecoration: 'none',
    fontWeight: 900,
  },
  footer: {
    borderTop: '1px solid rgba(255, 248, 241, 0.10)',
    color: '#A99791',
    fontSize: 12,
    lineHeight: 1.8,
    paddingTop: 20,
    marginTop: 28,
  },
  link: {
    color: '#D5A15C',
    fontWeight: 800,
  },
};
