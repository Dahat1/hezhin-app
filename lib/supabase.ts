import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const PRODUCT_CACHE_SECONDS = 60 * 60; // 1 hour
const PRODUCT_IMAGE_BUCKET = 'products';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const cachedFetch: typeof fetch = (input, init) => {
  return fetch(input, {
    ...(init ?? {}),
    next: {
      revalidate: PRODUCT_CACHE_SECONDS,
    },
  } as RequestInit & { next?: { revalidate: number } });
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    fetch: cachedFetch,
  },
});

export type ProductMedia = {
  id: string;
  product_id: string;
  type: 'image' | 'video';
  url: string;
  path: string | null;
  is_cover: boolean;
  sort_order: number;
  created_at: string;
};

export type Product = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  price: number | null;
  original_price: number | null;
  sale_price: number | null;
  is_on_sale: boolean;
  is_new_arrival: boolean;
  is_featured: boolean;
  stock: number;
  is_active: boolean;
  created_at: string;
  product_media: ProductMedia[] | null;
};

export function getProductDisplayPrice(product: Product) {
  if (product.is_on_sale && product.sale_price) {
    return product.sale_price;
  }

  return product.price;
}

function getSortedProductMedia(product: Product) {
  const media = product.product_media ?? [];

  return [...media].sort((a, b) => {
    if (a.is_cover && !b.is_cover) return -1;
    if (!a.is_cover && b.is_cover) return 1;

    return a.sort_order - b.sort_order;
  });
}

function getCoverImageMedia(product: Product) {
  const sortedMedia = getSortedProductMedia(product);

  return (
    sortedMedia.find((item) => item.is_cover && item.type === 'image') ??
    sortedMedia.find((item) => item.type === 'image') ??
    null
  );
}

function cleanStoragePath(path: string) {
  let nextPath = path.trim();

  nextPath = nextPath.replace(/^\/+/, '');

  if (nextPath.startsWith(`${PRODUCT_IMAGE_BUCKET}/`)) {
    nextPath = nextPath.slice(`${PRODUCT_IMAGE_BUCKET}/`.length);
  }

  return nextPath;
}

function encodeStoragePath(path: string) {
  return cleanStoragePath(path)
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

export function getOriginalCoverImage(product: Product) {
  return getCoverImageMedia(product)?.url ?? null;
}

export function getOptimizedCoverImage(product: Product) {
  const media = getCoverImageMedia(product);

  if (!media) {
    return null;
  }

  if (!media.path) {
    return media.url;
  }

  const encodedPath = encodeStoragePath(media.path);

  if (!encodedPath) {
    return media.url;
  }

  const params = new URLSearchParams({
    width: '1400',
    quality: '90',
  });

  return `${supabaseUrl}/storage/v1/render/image/public/${PRODUCT_IMAGE_BUCKET}/${encodedPath}?${params.toString()}`;
}

export function getCoverImage(product: Product) {
  return getOptimizedCoverImage(product) ?? getOriginalCoverImage(product);
}

export const fetchProductByCode = cache(async function fetchProductByCode(code: string) {
  const normalizedCode = decodeURIComponent(code).trim().toUpperCase();

  const { data, error } = await supabase
    .from('products')
    .select(
      `
      id,
      code,
      name,
      description,
      price,
      original_price,
      sale_price,
      is_on_sale,
      is_new_arrival,
      is_featured,
      stock,
      is_active,
      created_at,
      product_media (
        id,
        product_id,
        type,
        url,
        path,
        is_cover,
        sort_order,
        created_at
      )
    `
    )
    .eq('code', normalizedCode)
    .eq('is_active', true)
    .maybeSingle<Product>();

  if (error) {
    console.error('Failed to load product', error);
    return null;
  }

  return data;
});