import { photoSmall } from "@/app/people-first/photo-small";

export const dynamic = "force-static";

export function GET() {
  const image = Buffer.from(photoSmall, "base64");

  return new Response(image, {
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(image.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-NULLWORKS-Asset": "people-first-driveway-v2",
    },
  });
}
