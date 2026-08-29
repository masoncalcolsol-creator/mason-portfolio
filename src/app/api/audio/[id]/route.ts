import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ID = /^[a-f0-9-]{36}$/i;

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ID.test(id)) return new Response("Invalid audio id", { status: 400 });

  const upstream = await fetch(`https://cdn1.suno.ai/${id}.mp3`, {
    headers: {
      ...(request.headers.get("range") ? { Range: request.headers.get("range")! } : {}),
      "User-Agent": "NULLWORKS-ANVIL/1.0",
      Accept: "audio/mpeg,audio/*;q=0.9,*/*;q=0.1",
    },
    cache: "no-store",
  });

  if (!upstream.ok && upstream.status !== 206) {
    return new Response("Audio source unavailable", { status: upstream.status || 502 });
  }

  const headers = new Headers();
  headers.set("Content-Type", upstream.headers.get("content-type") || "audio/mpeg");
  headers.set("Accept-Ranges", upstream.headers.get("accept-ranges") || "bytes");
  headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400");

  for (const name of ["content-length", "content-range", "etag", "last-modified"]) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }

  return new Response(upstream.body, { status: upstream.status, headers });
}

export async function HEAD(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const response = await GET(request, context);
  return new Response(null, { status: response.status, headers: response.headers });
}
