import { unstable_cache } from "next/cache";
import { MARS_IMAGE_0 } from "@/app/_assets/mars-image-0";
import { MARS_IMAGE_1 } from "@/app/_assets/mars-image-1";
import { MARS_IMAGE_2 } from "@/app/_assets/mars-image-2";
import { MARS_IMAGE_3 } from "@/app/_assets/mars-image-3";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const sourceImage = Buffer.from(
  `${MARS_IMAGE_0}${MARS_IMAGE_1}${MARS_IMAGE_2}${MARS_IMAGE_3}`,
  "base64",
);

const generateHero = unstable_cache(
  async () => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("Image generation is not configured.");

    const prompt = `
Create a high-resolution cinematic restoration and enhancement of the supplied NULLWORKS Mars mission portrait.

IDENTITY AND COMPOSITION:
- Preserve the same recognizable adult male face, facial structure, skin tone, age, hairline, expression, body proportions, stance, and camera angle from the source.
- Keep one operator in a rugged black and warm-beige near-future exploration suit, standing confidently on Mars while holding a tall black flag.
- Keep the warm orange sunset, rocky Martian terrain, distant technical habitat, restrained cyan suit light, and premium black, cream, bronze, and gold visual language.
- Preserve the commanding full-body vertical poster composition and leave enough clear space at the top and bottom for website typography.

QUALITY:
- 1024 by 1536 vertical artwork.
- Extremely crisp face, eyes, armor edges, fabric, gloves, flag texture, rocks, atmosphere, and distant habitat.
- Premium movie-poster realism, controlled contrast, natural skin texture, dimensional light, sharp focal detail, and clean high-resolution rendering.
- No blur, pixelation, smeared face, soft-focus haze over the operator, distorted anatomy, extra people, duplicated limbs, or oversized head.

ABSOLUTE NO-TEXT ZONE:
- Do not generate words, letters, numbers, captions, logos, badges, watermarks, UI, title treatments, or pseudo-readable text anywhere in the image.
- Keep the flag and suit visually designed but unlabeled. The website adds all exact NULLWORKS typography afterward.

Return only the finished cinematic artwork.
`.trim();

    const form = new FormData();
    form.append("model", "gpt-image-2");
    form.append(
      "image[]",
      new Blob([sourceImage], { type: "image/webp" }),
      "mars-hero.webp",
    );
    form.append("prompt", prompt);
    form.append("size", "1024x1536");
    form.append("quality", "high");
    form.append("output_format", "webp");
    form.append("output_compression", "90");

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });

    const payload = (await response.json()) as {
      data?: Array<{ b64_json?: string }>;
      error?: { message?: string };
    };

    if (!response.ok) {
      throw new Error(
        payload.error?.message || "High-resolution Mars render failed.",
      );
    }

    const imageBase64 = payload.data?.[0]?.b64_json;
    if (!imageBase64) throw new Error("The image provider returned no image.");

    return imageBase64;
  },
  ["nullworks-mars-hero-hq-v1"],
  {
    revalidate: 31_536_000,
    tags: ["nullworks-mars-hero-hq"],
  },
);

export async function GET(request: Request) {
  try {
    const imageBase64 = await generateHero();
    const image = Buffer.from(imageBase64, "base64");

    return new Response(image, {
      status: 200,
      headers: {
        "content-type": "image/webp",
        "content-length": String(image.byteLength),
        "cache-control":
          "public, max-age=31536000, s-maxage=31536000, immutable",
        "x-content-type-options": "nosniff",
      },
    });
  } catch {
    return Response.redirect(new URL("/api/assets/mars-hero", request.url), 307);
  }
}
