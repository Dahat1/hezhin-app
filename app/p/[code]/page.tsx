import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

import { fetchProductByCode, getCoverImage, getProductDisplayPrice } from '../../../lib/supabase';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://hezhin.app').replace(/\/$/, '');
const businessWhatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '9647507852926';

type ProductPreviewPageProps = {
  params: Promise<{
    code: string;
  }>;
};

function formatPrice(value: number | null) {
  if (!value) return null;
  return `${value.toLocaleString('en-US')} IQD`;
}

function buildProductUrl(code: string) {
  return `${siteUrl}/p/${encodeURIComponent(code)}`;
}

function buildWhatsAppLink(code: string) {
  const productUrl = buildProductUrl(code);

  const message = encodeURIComponent(
    [
      'Hello Hezhin,',
      '',
      `I want to ask about product ${code}.`,
      '',
      productUrl,
    ].join('\n')
  );

  return `https://wa.me/${businessWhatsapp}?text=${message}`;
}

export async function generateMetadata({ params }: ProductPreviewPageProps): Promise<Metadata> {
  const { code } = await params;
  const product = await fetchProductByCode(code);

  if (!product) {
    return {
      title: 'Product not found - Hezhin',
      description: 'This Hezhin product is not available.',
    };
  }

  const imageUrl = getCoverImage(product);
  const price = formatPrice(getProductDisplayPrice(product));
  const title = `Hezhin - ${product.code}`;
  const description = price
    ? `${product.code} · ${price} · Open product preview on Hezhin.`
    : `${product.code} · Open product preview on Hezhin.`;

  const productUrl = buildProductUrl(product.code);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: productUrl,
      siteName: 'Hezhin',
      type: 'website',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 1200,
              alt: `${product.code} product photo`,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProductPreviewPage({ params }: ProductPreviewPageProps) {
  const { code } = await params;
  const product = await fetchProductByCode(code);

  if (!product) {
    notFound();
  }

  const imageUrl = getCoverImage(product);
  const price = formatPrice(getProductDisplayPrice(product));

  return (
    <main className="product-page">
      <article className="product-shell">
        {imageUrl ? (
          <img className="product-image" src={imageUrl} alt={`${product.code} product photo`} />
        ) : null}

        <div className="product-content">
          <div className="product-code">{product.code}</div>
          <h1>{product.name || product.code}</h1>

          {price ? <p className="product-price">{price}</p> : null}

          {product.description ? <p className="product-description">{product.description}</p> : null}

          <a className="whatsapp-button" href={buildWhatsAppLink(product.code)} target="_blank" rel="noreferrer">
            <MessageCircle size={20} />
            &nbsp; Order on WhatsApp
          </a>
        </div>
      </article>
    </main>
  );
}