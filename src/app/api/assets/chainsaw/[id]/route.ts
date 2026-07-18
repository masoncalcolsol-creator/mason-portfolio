import { photo0 } from "@/app/chainsaw/photo-data/photo0";
import { photo1 } from "@/app/chainsaw/photo-data/photo1";
import { photo2 } from "@/app/chainsaw/photo-data/photo2";
import { photo3 } from "@/app/chainsaw/photo-data/photo3";
import { photo4 } from "@/app/chainsaw/photo-data/photo4";

export const dynamic = "force-static";

const photos = [photo0, photo1, photo2, photo3, photo4];

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const index = Number(id);
  const payload = Number.isInteger(index) ? photos[index] : undefined;

  if (!payload) {
    return new Response("Chainsaw photo not installed", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const image = Buffer.from(payload, "base64");
  return new Response(image, {
    headers: {
      "Content-Type": "image/avif",
      "Content-Length": String(image.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-NULLWORKS-Asset": `chainsaw-photo-${index}-v6`,
    },
  });
}
