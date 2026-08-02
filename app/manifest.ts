import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hezhin',
    short_name: 'Hezhin',
    description: 'Browse Hezhin boutique collections and contact us directly.',
    start_url: '/',
    display: 'standalone',
    background_color: '#751111',
    theme_color: '#751111',
    icons: [{ src: '/brand/hezhin-icon.png', sizes: '1024x1024', type: 'image/png' }],
  };
}
