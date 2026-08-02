export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://hezhin.app').replace(/\/$/, '');
export const appStoreUrl =
  process.env.NEXT_PUBLIC_APP_STORE_URL || 'https://apps.apple.com/app/id6792305536';
export const googlePlayUrl =
  process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ||
  'https://play.google.com/store/apps/details?id=com.dahat.hezhin';
export const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'dahatdev@gmail.com';

export function getBusinessWhatsAppPhone() {
  const value = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP?.replace(/[^0-9]/g, '');
  return value || null;
}

export function buildWhatsAppUrl(message?: string) {
  const phone = getBusinessWhatsAppPhone();
  if (!phone) return null;
  return `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}
