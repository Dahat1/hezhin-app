'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSitePreferences } from './SitePreferences';

const text = {
  en: {
    copy: 'Browse boutique collections and contact Hezhin directly for product inquiries.',
    download: 'Download',
    support: 'Support',
    privacy: 'Privacy Policy',
    delete: 'Delete Account',
    brand: 'Hezhin',
    rights: 'All rights reserved.',
    powered: 'Powered by',
  },
  ku: {
    copy: 'کۆڵێکشنەکانی هێژین ببینە و بۆ زانیاریی بەرهەمەکان ڕاستەوخۆ پەیوەندی بکە.',
    download: 'داگرتن',
    support: 'یارمەتی',
    privacy: 'سیاسەتی تایبەتمەندی',
    delete: 'سڕینەوەی هەژمار',
    brand: 'هێژین',
    rights: 'هەموو مافەکان پارێزراون.',
    powered: 'دروستکراوە لەلایەن',
  },
  ar: {
    copy: 'تصفح مجموعات هجين وتواصل معنا مباشرة للاستفسار عن المنتجات.',
    download: 'تحميل',
    support: 'الدعم',
    privacy: 'سياسة الخصوصية',
    delete: 'حذف الحساب',
    brand: 'هجين',
    rights: 'جميع الحقوق محفوظة.',
    powered: 'تم التطوير بواسطة',
  },
};

export function SiteFooter() {
  const { language } = useSitePreferences();
  const t = text[language];
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand-block">
          <Image src="/brand/hezhin-icon.png" width={52} height={52} alt="Hezhin" />
          <div><strong>HEZHIN</strong><p>{t.copy}</p></div>
        </div>
        <div className="footer-links">
          <Link href="/download">{t.download}</Link>
          <Link href="/support">{t.support}</Link>
          <Link href="/privacy">{t.privacy}</Link>
          <Link href="/delete-account">{t.delete}</Link>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>© 2026 {t.brand}. {t.rights}</span>
        <span className="footer-powered">{t.powered} <a href="mailto:dahatdev@gmail.com">Dahat Dev</a></span>
      </div>
    </footer>
  );
}
