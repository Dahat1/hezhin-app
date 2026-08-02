'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronDown, Download, Languages, Moon, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SiteLanguage, useSitePreferences } from './SitePreferences';

const text = {
  en: { about: 'About', support: 'Support', privacy: 'Privacy', download: 'Download', tagline: 'Elegant Boutique Fashion' },
  ku: { about: 'دەربارە', support: 'یارمەتی', privacy: 'تایبەتمەندی', download: 'داگرتن', tagline: 'مۆدەی تایبەتی و جوان' },
  ar: { about: 'من نحن', support: 'الدعم', privacy: 'الخصوصية', download: 'تحميل', tagline: 'أناقة البوتيك الراقية' },
};

const languageOptions: Array<{ value: SiteLanguage; short: string; label: string; native: string }> = [
  { value: 'ku', short: 'KU', label: 'Kurdish', native: 'کوردی' },
  { value: 'en', short: 'EN', label: 'English', native: 'English' },
  { value: 'ar', short: 'AR', label: 'Arabic', native: 'العربية' },
];

export function SiteHeader() {
  const { language, setLanguage, theme, setTheme } = useSitePreferences();
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const t = text[language];
  const dark = theme === 'dark';
  const selectedLanguage = languageOptions.find((option) => option.value === language) ?? languageOptions[0];

  useEffect(() => {
    const closeOnOutsidePress = (event: MouseEvent | TouchEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLanguageOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsidePress);
    document.addEventListener('touchstart', closeOnOutsidePress);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOnOutsidePress);
      document.removeEventListener('touchstart', closeOnOutsidePress);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const chooseLanguage = (nextLanguage: SiteLanguage) => {
    setLanguage(nextLanguage);
    setLanguageOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="site-brand" href="/" aria-label="Hezhin home">
          <Image className="site-logo-image" src="/brand/hezhin-icon.png" width={48} height={48} alt="Hezhin" priority />
          <span className="site-brand-copy">
            <strong>HEZHIN</strong>
            <small>{t.tagline}</small>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/#about">{t.about}</Link>
          <Link href="/support">{t.support}</Link>
          <Link href="/privacy">{t.privacy}</Link>
          <div className="header-controls">
            <div className="language-picker" ref={languageMenuRef}>
              <button
                type="button"
                className="language-trigger"
                aria-label="Select language"
                aria-haspopup="listbox"
                aria-expanded={languageOpen}
                onClick={() => setLanguageOpen((current) => !current)}
              >
                <Languages size={15} />
                <span>{selectedLanguage.short}</span>
                <ChevronDown size={14} className={languageOpen ? 'language-chevron-open' : ''} />
              </button>

              {languageOpen && (
                <div className="language-menu" role="listbox" aria-label="Website language">
                  <div className="language-menu-label">Language · زمان · اللغة</div>
                  {languageOptions.map((option) => {
                    const selected = option.value === language;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        className={`language-option${selected ? ' language-option-selected' : ''}`}
                        onClick={() => chooseLanguage(option.value)}
                      >
                        <span className="language-option-code">{option.short}</span>
                        <span className="language-option-copy">
                          <strong>{option.native}</strong>
                          <small>{option.label}</small>
                        </span>
                        <span className="language-option-check">{selected && <Check size={15} />}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button type="button" className="theme-toggle" aria-label="Toggle color theme" onClick={() => setTheme(dark ? 'light' : 'dark')}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
          <Link className="site-download-link" href="/download">
            <Download size={16} /> {t.download}
          </Link>
        </nav>
      </div>
    </header>
  );
}
