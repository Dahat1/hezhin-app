import { appStoreUrl, googlePlayUrl } from '../lib/site';

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="store-brand-icon apple-mark">
      <path fill="currentColor" d="M16.7 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9-.7 0-1.8-.9-3-.9-1.5 0-3 .9-3.8 2.3-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3.1-.7 1.4 0 1.9.7 3.1.7 1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.7-1-2.7-3.8ZM14.4 6.1c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.3-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.8-1.1Z"/>
    </svg>
  );
}

function GooglePlayMark() {
  return (
    <svg viewBox="0 0 32 36" aria-hidden="true" className="store-brand-icon google-play-mark">
      <path fill="#00D6FF" d="M2.5 2.2c-.5.6-.8 1.5-.8 2.6v26.4c0 1.1.3 2 .8 2.6l.2.2 14.8-15.8v-.4L2.7 2l-.2.2Z"/>
      <path fill="#FFD500" d="m22.5 23.5-5-5.3v-.4l5-5.3.1.1 5.9 3.4c1.7 1 1.7 2.5 0 3.5l-5.9 3.4-.1.6Z"/>
      <path fill="#FF3A44" d="m22.6 23-5.1-5.1L2.5 34c.6.6 1.6.7 2.8.1L22.6 24V23Z"/>
      <path fill="#00F076" d="M22.6 12.9 5.3 2.8C4.1 2.1 3.1 2.3 2.5 3l15 15 5.1-5.1Z"/>
    </svg>
  );
}

export function StoreButtons({ compact = false, sameWindow = false }: { compact?: boolean; sameWindow?: boolean }) {
  return (
    <div className={`store-actions${compact ? ' compact' : ''}`}>
      <a className="store-button store-button-official" href={appStoreUrl} target={sameWindow ? undefined : '_blank'} rel={sameWindow ? undefined : 'noreferrer'} aria-label="Download Hezhin on the App Store">
        <AppleMark />
        <span><small>Download on the</small><strong>App Store</strong></span>
      </a>
      <a className="store-button store-button-official" href={googlePlayUrl} target={sameWindow ? undefined : '_blank'} rel={sameWindow ? undefined : 'noreferrer'} aria-label="Get Hezhin on Google Play">
        <GooglePlayMark />
        <span><small>GET IT ON</small><strong>Google Play</strong></span>
      </a>
    </div>
  );
}
