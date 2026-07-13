import chunk0 from "@/lib/linked-out-poster/chunk0";
import chunk1 from "@/lib/linked-out-poster/chunk1";

export const runtime = "nodejs";
export const dynamic = "force-static";

const poster = Buffer.from(`${chunk0}${chunk1}`, "base64");

export async function GET(): Promise<Response> {
  return new Response(poster, {
    status: 200,
    headers: {
      "content-type": "image/avif",
      "content-length": String(poster.length),
      "cache-control": "public, max-age=31536000, immutable",
      "content-disposition": 'inline; filename="linked-out-parallel-worlds-poster.avif"',
    },
  });
}
