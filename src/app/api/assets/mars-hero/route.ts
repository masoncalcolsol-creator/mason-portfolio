import { MARS_IMAGE_0 } from "@/app/_assets/mars-image-0";
import { MARS_IMAGE_1 } from "@/app/_assets/mars-image-1";
import { MARS_IMAGE_2 } from "@/app/_assets/mars-image-2";
import { MARS_IMAGE_3 } from "@/app/_assets/mars-image-3";

export const runtime = "nodejs";
export const dynamic = "force-static";

const image = Buffer.from(
  `${MARS_IMAGE_0}${MARS_IMAGE_1}${MARS_IMAGE_2}${MARS_IMAGE_3}`,
  "base64",
);

export async function GET() {
  return new Response(image, {
    status: 200,
    headers: {
      "content-type": "image/webp",
      "content-length": String(image.byteLength),
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
