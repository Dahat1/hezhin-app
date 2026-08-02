'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type SiteLanguage = 'en' | 'ku' | 'ar';
type SiteTheme = 'system' | 'light' | 'dark';

type Preferences = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
  theme: SiteTheme;
  setTheme: (theme: SiteTheme) => void;
};

const Context = createContext<Preferences | null>(null);

export function SitePreferences({ children }: { children: React.ReactNode }) {
  // Kurdish is the official/default language of the Hezhin website.
  const [language, setLanguageState] = useState<SiteLanguage>('ku');
  const [theme, setThemeState] = useState<SiteTheme>('system');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('hezhin-site-language') as SiteLanguage | null;
    if (storedLanguage === 'en' || storedLanguage === 'ku' || storedLanguage === 'ar') {
      setLanguageState(storedLanguage);
    }

    const storedTheme = localStorage.getItem('hezhin-site-theme') as SiteTheme | null;
    if (storedTheme === 'system' || storedTheme === 'light' || storedTheme === 'dark') {
      setThemeState(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl';
    document.documentElement.dataset.language = language;
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') delete root.dataset.theme;
    else root.dataset.theme = theme;
  }, [theme]);

  const value = useMemo<Preferences>(() => ({
    language,
    setLanguage: (next) => {
      localStorage.setItem('hezhin-site-language', next);
      setLanguageState(next);
    },
    theme,
    setTheme: (next) => {
      localStorage.setItem('hezhin-site-theme', next);
      setThemeState(next);
    },
  }), [language, theme]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useSitePreferences() {
  const value = useContext(Context);
  if (!value) throw new Error('useSitePreferences must be used within SitePreferences');
  return value;
}
