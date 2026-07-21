import p0 from "@/app/instantiation/assets/poster-0";
import p1 from "@/app/instantiation/assets/poster-1";
import p2 from "@/app/instantiation/assets/poster-2";

export const dynamic = "force-static";

export function GET() {
  const body = Uint8Array.from(Buffer.from(p0 + p1 + p2, "base64"));

  return new Response(body, {
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(body.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": 'inline; filename="instantiation-poster.webp"',
    },
  });
}
