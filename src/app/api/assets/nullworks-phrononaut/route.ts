import {
  expectedSha256,
  getReconstructedPoster,
} from "./poster-data-v2/reconstructed";

export const runtime = "nodejs";

// This is the route the live page already requests. Reconstruct and verify the
// exact approved poster here rather than depending on middleware rewrites.
const poster = getReconstructedPoster();

export async function GET() {
  return new Response(new Uint8Array(poster), {
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(poster.byteLength),
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      "X-NULLWORKS-Asset-SHA256": expectedSha256,
      "X-NULLWORKS-Delivery": "mr-smith-direct-route-v4",
    },
  });
}
