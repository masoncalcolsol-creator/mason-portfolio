import {
  expectedSha256,
  getPoster,
} from "./poster-data-v2";

export const runtime = "nodejs";

export async function GET() {
  const poster = getPoster();

  return new Response(new Uint8Array(poster), {
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(poster.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "X-NULLWORKS-Asset-SHA256": expectedSha256,
    },
  });
}
