'use client';

import { useEffect } from 'react';
import { appStoreUrl, googlePlayUrl } from '../../lib/site';

export default function DownloadRedirect() {
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) window.location.replace(appStoreUrl);
    else if (/android/.test(userAgent)) window.location.replace(googlePlayUrl);
  }, []);

  return null;
}
