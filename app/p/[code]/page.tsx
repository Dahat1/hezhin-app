import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MessageCircle, Smartphone } from 'lucide-react';
import { fetchProductByCode, getCoverImage, getProductDisplayPrice } from '../../../lib/supabase';
import { appStoreUrl, buildWhatsAppUrl, googlePlayUrl, siteUrl } from '../../../lib/site';

export const revalidate = 3600;

type ProductPreviewPageProps = { params: Promise<{ code: string }> };

function formatPrice(value: number | null) {
  if (!value) return null;
  return `${value.toLocaleString('en-US')} IQD`;
}

function buildProductUrl(code: string) {
  return `${siteUrl}/p/${encodeURIComponent(code)}`;
}

function buildProductWhatsAppLink(code: string) {
  return buildWhatsAppUrl(['Hello Hezhin,', '', `I want to ask about product ${code}.`, '', buildProductUrl(code)].join('\n'));
}

export async function generateMetadata({ params }: ProductPreviewPageProps): Promise<Metadata> {
  const { code } = await params;
  const product = await fetchProductByCode(code);
  if (!product) return { title: 'Product not found', description: 'This Hezhin product is not available.' };

  const imageUrl = getCoverImage(product);
  const price = formatPrice(getProductDisplayPrice(product));
  const title = `Hezhin - ${product.code}`;
  const description = price ? `${product.code} · ${price} · View this product on Hezhin.` : `${product.code} · View this product on Hezhin.`;
  const productUrl = buildProductUrl(product.code);

  return {
    title,
    description,
    alternates: { canonical: productUrl },
    openGraph: {
      title,
      description,
      url: productUrl,
      siteName: 'Hezhin',
      type: 'website',
      images: imageUrl ? [{ url: imageUrl, width: 900, height: 1200, alt: `${product.code} product photo` }] : [],
    },
    twitter: { card: 'summary_large_image', title, description, images: imageUrl ? [imageUrl] : [] },
  };
}

export default async function ProductPreviewPage({ params }: ProductPreviewPageProps) {
  const { code } = await params;
  const product = await fetchProductByCode(code);
  if (!product) notFound();

  const imageUrl = getCoverImage(product);
  const price = formatPrice(getProductDisplayPrice(product));
  const whatsappUrl = buildProductWhatsAppLink(product.code);

  return (
    <main className="product-page">
      <article className="product-shell">
        {imageUrl ? <img className="product-image" src={imageUrl} alt={`${product.code} product photo`} /> : <div className="product-image-placeholder">HEZHIN</div>}
        <div className="product-content">
          <div className="product-code">{product.code}</div>
          <h1>{product.name || product.code}</h1>
          {price ? <p className="product-price">{price}</p> : <p className="product-price">Ask for price</p>}
          {product.description ? <p className="product-description">{product.description}</p> : null}
          {whatsappUrl ? (
            <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={20}/> Ask on WhatsApp</a>
          ) : (
            <p className="product-description">WhatsApp support is temporarily unavailable.</p>
          )}
          <div className="product-store-links">
            <Smartphone size={18}/>
            <span>Open Hezhin on</span>
            <a href={appStoreUrl} target="_blank" rel="noreferrer">App Store</a>
            <span>or</span>
            <a href={googlePlayUrl} target="_blank" rel="noreferrer">Google Play</a>
          </div>
        </div>
      </article>
    </main>
  );
}
