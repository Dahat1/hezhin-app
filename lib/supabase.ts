import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
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

export function getCoverImage(product: Product) {
  const media = product.product_media ?? [];
  const sortedMedia = [...media].sort((a, b) => {
    if (a.is_cover && !b.is_cover) return -1;
    if (!a.is_cover && b.is_cover) return 1;
    return a.sort_order - b.sort_order;
  });

  return (
    sortedMedia.find((item) => item.is_cover && item.type === 'image')?.url ??
    sortedMedia.find((item) => item.type === 'image')?.url ??
    null
  );
}

export async function fetchProductByCode(code: string) {
  const normalizedCode = decodeURIComponent(code).trim().toUpperCase();

  const { data, error } = await supabase
    .from('products')
    .select('*, product_media(*)')
    .eq('code', normalizedCode)
    .eq('is_active', true)
    .maybeSingle<Product>();

  if (error) {
    console.error('Failed to load product', error);
    return null;
  }

  return data;
}
