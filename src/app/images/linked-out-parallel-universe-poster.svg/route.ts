import chunk0 from "@/lib/linked-out-paper-poster/chunk0";
import chunk1 from "@/lib/linked-out-paper-poster/chunk1";
import chunk2 from "@/lib/linked-out-paper-poster/chunk2";
import chunk3 from "@/lib/linked-out-paper-poster/chunk3";
import chunk4 from "@/lib/linked-out-paper-poster/chunk4";

export const runtime = "nodejs";
export const dynamic = "force-static";

const poster = Buffer.from(`${chunk0}${chunk1}${chunk2}${chunk3}${chunk4}`, "base64");

export async function GET(): Promise<Response> {
  return new Response(poster, {
    status: 200,
    headers: {
      "content-type": "image/avif",
      "content-length": String(poster.length),
      "cache-control": "public, max-age=31536000, immutable",
      "content-disposition": 'inline; filename="linked-out-paper-poster.avif"',
    },
  });
}
