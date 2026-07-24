import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

let posterPromise: Promise<Buffer> | undefined;

function loadPoster() {
  posterPromise ??= readFile(
    path.join(process.cwd(), "public", "assets", "nullworks-phrononaut-poster.webp"),
  );
  return posterPromise;
}

export async function GET() {
  const poster = await loadPoster();

  return new Response(new Uint8Array(poster), {
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(poster.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "X-NULLWORKS-Asset-SHA256":
        "510daf714d0a1d50ce59650bc35ea7470f15f9035818646265f35e45ce4a6517",
    },
  });
}
