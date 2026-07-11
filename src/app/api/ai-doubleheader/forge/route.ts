import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

type RateEntry = { count: number; resetAt: number };
type ForgeBody = {
  sourceImage?: string;
  preset?: string;
  humanName?: string;
  role?: string;
  archetype?: string;
  callSign?: string;
  visualConcept?: string;
  consent?: boolean;
};

const RATE_WINDOW_MS = 6 * 60 * 60 * 1000;
const RATE_LIMIT = 3;
const MAX_DATA_URL_LENGTH = 11_000_000;

const globalRateStore = globalThis as typeof globalThis & {
  __aiDoubleheaderForgeRate?: Map<string, RateEntry>;
};
const rateStore =
  globalRateStore.__aiDoubleheaderForgeRate ||
  (globalRateStore.__aiDoubleheaderForgeRate = new Map<string, RateEntry>());

const presetDirections: Record<string, string> = {
  "operational-commander":
    "A premium black technical command jacket with subtle armored structure, warm gold rim light, a dark industrial AI operations floor, layered machinery and telemetry depth, original near-future production design.",
  "field-engineer":
    "A rugged black field-engineering jacket with refined protective panels, cinematic industrial automation environment, conveyors and control lights out of focus, warm practical lighting and restrained gold accents.",
  "founder-noir":
    "A high-end black founder portrait with a structured technical coat, dark architectural workroom, low-key noir lighting, restrained gold highlights, quiet authority, premium editorial key art.",
  "mars-pathfinder":
    "An original black near-future exploration suit with no logos or text, a dramatic Mars-like landscape and distant technical habitat, warm gold sunlight, premium science-fiction key art.",
};

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = rateStore.get(key);
  if (!current || current.resetAt <= now) {
    const resetAt = now + RATE_WINDOW_MS;
    rateStore.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: RATE_LIMIT - 1, resetAt };
  }
  if (current.count >= RATE_LIMIT) return { allowed: false, remaining: 0, resetAt: current.resetAt };
  current.count += 1;
  rateStore.set(key, current);
  return { allowed: true, remaining: RATE_LIMIT - current.count, resetAt: current.resetAt };
}

function clean(value: unknown, max = 500) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function parseDataUrl(value: string) {
  const match = value.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,([A-Za-z0-9+/=]+)$/i);
  if (!match) throw new Error("Unsupported source-image format.");
  const mime = match[1].toLowerCase().replace("image/jpg", "image/jpeg");
  const buffer = Buffer.from(match[2], "base64");
  if (!buffer.length) throw new Error("The source portrait was empty.");
  return { mime, buffer };
}

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return json(
      { error: "The cinematic portrait forge is not configured on this deployment. Upload finished cinematic artwork to use the local fallback." },
      503,
    );
  }

  const rate = checkRateLimit(clientKey(request));
  if (!rate.allowed) {
    return json(
      {
        error: "This public beta allows three portrait renders per six-hour window.",
        remaining: 0,
        resetAt: rate.resetAt,
      },
      429,
    );
  }

  let body: ForgeBody;
  try {
    body = (await request.json()) as ForgeBody;
  } catch {
    return json({ error: "Invalid render request." }, 400);
  }

  if (!body.consent) return json({ error: "Image-use consent is required before rendering." }, 400);

  const sourceImage = body.sourceImage || "";
  if (!sourceImage || sourceImage.length > MAX_DATA_URL_LENGTH) {
    return json({ error: "Upload a valid source portrait smaller than 10 MB." }, 400);
  }

  let source: ReturnType<typeof parseDataUrl>;
  try {
    source = parseDataUrl(sourceImage);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Invalid portrait." }, 400);
  }

  const preset = presetDirections[body.preset || ""] || presetDirections["operational-commander"];
  const role = clean(body.role, 240) || "forward-deployed systems operator";
  const archetype = clean(body.archetype, 160);
  const visualConcept = clean(body.visualConcept, 500);
  const identityContext = [role, archetype, visualConcept].filter(Boolean).join(". ");

  const prompt = `
Edit the supplied portrait into original premium cinematic collectible-card KEY ART ONLY.

IDENTITY PRESERVATION IS THE HIGHEST PRIORITY:
- Preserve the same recognizable person, facial structure, skin tone, age, hairline, hairstyle, eye color, expression, and distinguishing facial details.
- Do not beautify, age, de-age, feminize, masculinize, replace, duplicate, or merge the person.
- Keep exactly one person.

COMPOSITION:
- Vertical 2:3 portrait.
- Chest-up composition with the head centered in the upper third and shoulders visible.
- Camera at eye level, realistic lens behavior, crisp eyes, natural skin texture.
- Rebuild wardrobe, lighting, atmosphere, and environment around the face; do not preserve the original room, mirror, phone, earbuds, or clothing.
- Leave darker negative space in the lower quarter for deterministic typography added later by the website.

VISUAL DIRECTION:
${preset}
Professional identity context: ${identityContext || role}.
Premium movie-poster realism, controlled contrast, dimensional atmosphere, sophisticated original production design, not a generic superhero costume.

ABSOLUTE NO-TEXT ZONE:
- The image must contain zero readable or pseudo-readable text.
- No words, letters, numbers, symbols that resemble writing, captions, signs, screens with glyphs, logos, badges, patches, emblems, watermarks, UI, card borders, or title treatments.
- Use abstract light, unlabeled machinery, and non-readable interface geometry only.
- Do not place the person's name, company, role, call sign, initials, or credentials anywhere.

OTHER EXCLUSIONS:
- No extra people, duplicated face, distorted anatomy, oversized head, cartoon treatment, gore, weapons, or public-figure resemblance substitution.

Return only the finished cinematic portrait artwork. The website will add all typography, statistics, borders, and review labels afterward.
`.trim();

  try {
    const form = new FormData();
    form.append("model", "gpt-image-2");
    form.append("image[]", new Blob([source.buffer], { type: source.mime }), "portrait.jpg");
    form.append("prompt", prompt);
    form.append("size", "1024x1536");
    form.append("quality", "medium");
    form.append("output_format", "jpeg");
    form.append("output_compression", "88");

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
      return json({ error: payload.error?.message || "The image provider rejected the render request." }, response.status);
    }

    const imageBase64 = payload.data?.[0]?.b64_json;
    if (!imageBase64) return json({ error: "The image provider returned no image." }, 502);

    return json({
      imageDataUrl: `data:image/jpeg;base64,${imageBase64}`,
      remaining: rate.remaining,
      resetAt: rate.resetAt,
      model: "gpt-image-2",
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Portrait forge failed." }, 500);
  }
}
