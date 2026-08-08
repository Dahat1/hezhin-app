'use client';

import { useEffect, useMemo, useState } from 'react';
import { StoreButtons } from '../../components/StoreButtons';
import { appStoreUrl, googlePlayUrl } from '../../lib/site';

type Platform = 'ios' | 'android' | 'other';

function detectPlatform(userAgent: string): Platform {
  const ua = userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/android/.test(ua)) return 'android';
  return 'other';
}

function isInAppBrowser(userAgent: string) {
  return /instagram|fbav|fban|facebook|messenger/i.test(userAgent);
}

export default function DownloadRedirect() {
  const [platform, setPlatform] = useState<Platform>('other');
  const [inAppBrowser, setInAppBrowser] = useState(false);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || '';
    const detectedPlatform = detectPlatform(userAgent);
    const detectedInAppBrowser = isInAppBrowser(userAgent);

    setPlatform(detectedPlatform);
    setInAppBrowser(detectedInAppBrowser);

    if (detectedPlatform === 'other') {
      setAttempted(true);
      return;
    }

    const destination = detectedPlatform === 'ios' ? appStoreUrl : googlePlayUrl;
    const timer = window.setTimeout(() => {
      setAttempted(true);
      window.location.assign(destination);
    }, 450);

    return () => window.clearTimeout(timer);
  }, []);

  const message = useMemo(() => {
    if (inAppBrowser) {
      return 'If Instagram does not open the store automatically, tap your store below.';
    }
    if (platform === 'ios') {
      return attempted
        ? 'If the App Store did not open, tap the App Store button below.'
        : 'Opening the App Store…';
    }
    if (platform === 'android') {
      return attempted
        ? 'If Google Play did not open, tap the Google Play button below.'
        : 'Opening Google Play…';
    }
    return 'Choose your store to download Hezhin.';
  }, [attempted, inAppBrowser, platform]);

  return (
    <section className="legal-card centered-card download-fallback-card">
      <p className="eyebrow">HEZHIN APP</p>
      <h1>Download Hezhin</h1>
      <p className="lead">{message}</p>
      <StoreButtons sameWindow />
      {inAppBrowser ? (
        <p className="download-browser-note">
          You can also open this page in Safari or Chrome if your store does not open from Instagram.
        </p>
      ) : null}
    </section>
  );
}
