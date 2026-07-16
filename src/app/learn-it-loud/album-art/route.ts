import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const svgPath = path.join(
    process.cwd(),
    "public",
    "learn-it-loud",
    "big-ditch-energy-slothers.svg",
  );

  const svg = await readFile(svgPath, "utf8");
  const match = svg.match(/href="data:image\/jpeg;base64,([^"]+)"/s);

  if (!match) {
    return new Response("Album art payload not found", { status: 404 });
  }

  const image = Buffer.from(match[1], "base64");

  return new Response(image, {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Length": String(image.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
