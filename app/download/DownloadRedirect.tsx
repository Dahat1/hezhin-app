'use client';

import { useEffect, useMemo, useState } from 'react';
import { StoreButtons } from '../../components/StoreButtons';
import { useSitePreferences } from '../../components/SitePreferences';
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
  const { language } = useSitePreferences();
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

  const copy = useMemo(() => {
    const translations = {
      en: {
        title: 'Download Hezhin',
        instagram: 'If Instagram does not open the store automatically, tap your store below.',
        iosFallback: 'If the App Store did not open, tap the App Store button below.',
        iosOpening: 'Opening the App Store…',
        androidFallback: 'If Google Play did not open, tap the Google Play button below.',
        androidOpening: 'Opening Google Play…',
        choose: 'Choose your store to download Hezhin.',
        browserNote: 'You can also open this page in Safari or Chrome if your store does not open from Instagram.',
      },
      ku: {
        title: 'داگرتنی هێژین',
        instagram: 'ئەگەر ئینستاگرام ستۆرەکە خۆکارانە نەکردەوە، لە خوارەوە ستۆری خۆت هەڵبژێرە.',
        iosFallback: 'ئەگەر App Store نەکرایەوە، لە خوارەوە دوگمەی App Store دابگرە.',
        iosOpening: 'App Store دەکرێتەوە…',
        androidFallback: 'ئەگەر Google Play نەکرایەوە، لە خوارەوە دوگمەی Google Play دابگرە.',
        androidOpening: 'Google Play دەکرێتەوە…',
        choose: 'ستۆری خۆت هەڵبژێرە بۆ داگرتنی هێژین.',
        browserNote: 'ئەگەر لە ئینستاگرام ستۆرەکە نەکرایەوە، دەتوانیت ئەم لاپەڕەیە لە Safari یان Chrome بکەیتەوە.',
      },
      ar: {
        title: 'تحميل هجين',
        instagram: 'إذا لم يفتح Instagram المتجر تلقائيًا، اختر متجرك من الأزرار أدناه.',
        iosFallback: 'إذا لم يفتح App Store، اضغط على زر App Store أدناه.',
        iosOpening: 'جارٍ فتح App Store…',
        androidFallback: 'إذا لم يفتح Google Play، اضغط على زر Google Play أدناه.',
        androidOpening: 'جارٍ فتح Google Play…',
        choose: 'اختر متجرك لتحميل هجين.',
        browserNote: 'إذا لم يفتح المتجر من Instagram، يمكنك فتح هذه الصفحة في Safari أو Chrome.',
      },
    } as const;

    return translations[language];
  }, [language]);

  const message = useMemo(() => {
    if (inAppBrowser) return copy.instagram;
    if (platform === 'ios') return attempted ? copy.iosFallback : copy.iosOpening;
    if (platform === 'android') return attempted ? copy.androidFallback : copy.androidOpening;
    return copy.choose;
  }, [attempted, copy, inAppBrowser, platform]);

  return (
    <section className="legal-card centered-card download-fallback-card">
      <p className="eyebrow">HEZHIN APP</p>
      <h1>{copy.title}</h1>
      <p className="lead">{message}</p>
      <StoreButtons sameWindow />
      {inAppBrowser ? (
        <p className="download-browser-note">
          {copy.browserNote}
        </p>
      ) : null}
    </section>
  );
}
