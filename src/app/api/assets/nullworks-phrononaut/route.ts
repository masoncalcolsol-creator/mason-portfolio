import {
  expectedSha256,
  getPoster,
} from "./poster-data-v2";

export const runtime = "nodejs";

// Decode and verify at module load so the production build fails closed if any
// governed transport chunk is missing or altered.
const poster = getPoster();

export async function GET() {
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
