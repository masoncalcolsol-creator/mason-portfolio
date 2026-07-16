export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SOURCE_SVG =
  "https://raw.githubusercontent.com/masoncalcolsol-creator/mason-portfolio/main/public/learn-it-loud/big-ditch-energy-slothers.svg";

export async function GET() {
  try {
    const source = await fetch(SOURCE_SVG, { cache: "no-store" });

    if (!source.ok) {
      return new Response(`Album art source failed: ${source.status}`, {
        status: 502,
      });
    }

    const svg = await source.text();
    const match = svg.match(/href="data:image\/jpeg;base64,([^"]+)"/s);

    if (!match) {
      return new Response("Album art payload not found", { status: 404 });
    }

    const image = Buffer.from(match[1], "base64");

    return new Response(new Uint8Array(image), {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Length": String(image.byteLength),
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(`Album art route failed: ${message}`, { status: 500 });
  }
}
