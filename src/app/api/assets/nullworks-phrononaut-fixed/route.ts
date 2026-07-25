import {
  expectedSha256,
  getReconstructedPoster,
} from "../nullworks-phrononaut/poster-data-v2/reconstructed";

export const runtime = "nodejs";

// Fail the production build closed if the approved poster does not reconstruct
// to the exact owner-validated bytes.
const poster = getReconstructedPoster();

export async function GET() {
  return new Response(new Uint8Array(poster), {
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(poster.byteLength),
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      "X-NULLWORKS-Asset-SHA256": expectedSha256,
      "X-NULLWORKS-Delivery": "mr-smith-recovery-v3",
    },
  });
}
