import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) return new Response('Host unavailable', { status: 500 });

  const page = await fetch(`${proto}://${host}/mr-sloth`, { cache: 'no-store' });
  if (!page.ok) return new Response('Hero source unavailable', { status: 502 });

  const html = await page.text();
  const match = html.match(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/);
  if (!match) return new Response('Hero image not found', { status: 404 });

  return new Response(Buffer.from(match[1], 'base64'), {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
