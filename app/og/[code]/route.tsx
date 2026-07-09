import { ImageResponse } from 'next/og';

import { fetchProductByCode, getCoverImage, getProductDisplayPrice } from '../../../lib/supabase';

export const runtime = 'edge';

type OgRouteProps = {
  params: Promise<{
    code: string;
  }>;
};

function formatPrice(value: number | null) {
  if (!value) return null;
  return `${value.toLocaleString('en-US')} IQD`;
}

function makeResponse(element: React.ReactElement) {
  const response = new ImageResponse(element, {
    width: 1200,
    height: 630,
  });

  response.headers.set(
    'Cache-Control',
    'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
  );

  return response;
}

export async function GET(_request: Request, { params }: OgRouteProps) {
  const { code } = await params;
  const product = await fetchProductByCode(code);

  if (!product) {
    return makeResponse(
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#171313',
          color: '#FFF7F1',
          fontSize: 54,
          fontWeight: 900,
          letterSpacing: -1.2,
        }}
      >
        Hezhin
      </div>
    );
  }

  const imageUrl = getCoverImage(product);
  const price = formatPrice(getProductDisplayPrice(product));

  return makeResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: '#171313',
        color: '#FFF7F1',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#211A1A',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 34,
          display: 'flex',
          borderRadius: 42,
          overflow: 'hidden',
          border: '2px solid rgba(255, 247, 241, 0.16)',
          background: '#0F0B0B',
        }}
      >
        <div
          style={{
            width: '67%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#120D0D',
            padding: 30,
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.code}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#BFAEAA',
                fontSize: 46,
                fontWeight: 900,
              }}
            >
              Hezhin
            </div>
          )}
        </div>

        <div
          style={{
            width: '33%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '54px 42px',
            background: '#241B1B',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            <div
              style={{
                color: '#E5A19B',
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 3.5,
                textTransform: 'uppercase',
              }}
            >
              Hezhin
            </div>

            <div
              style={{
                color: '#FFF7F1',
                fontSize: 50,
                fontWeight: 900,
                letterSpacing: -1.4,
                lineHeight: 1,
              }}
            >
              {product.code}
            </div>

            {price ? (
              <div
                style={{
                  color: '#D8A15F',
                  fontSize: 32,
                  fontWeight: 900,
                  lineHeight: 1.1,
                }}
              >
                {price}
              </div>
            ) : (
              <div
                style={{
                  color: '#BFAEAA',
                  fontSize: 25,
                  fontWeight: 800,
                }}
              >
                Ask for price
              </div>
            )}
          </div>

          <div
            style={{
              color: '#BFAEAA',
              fontSize: 22,
              fontWeight: 800,
              lineHeight: 1.25,
            }}
          >
            Open product preview on Hezhin
          </div>
        </div>
      </div>
    </div>
  );
}