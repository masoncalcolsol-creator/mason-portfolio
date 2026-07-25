import { createHash } from "node:crypto";
import chunk01 from "./poster-data/chunk01";
import chunk02 from "./poster-data/chunk02";
import chunk03 from "./poster-data/chunk03";
import chunk04 from "./poster-data/chunk04";
import chunk05 from "./poster-data/chunk05";

export const runtime = "nodejs";

const expectedByteLength = 57236;
const expectedSha256 =
  "b1da7256bc164a5892ac859a91e3e18ba033bf72c2f88d9c822010086521d993";
const payload = [chunk01, chunk02, chunk03, chunk04, chunk05].join("");

let poster: Buffer | undefined;

function loadPoster() {
  if (poster) return poster;

  const decoded = Buffer.from(payload, "base64");
  const sha256 = createHash("sha256").update(decoded).digest("hex");

  if (decoded.byteLength !== expectedByteLength || sha256 !== expectedSha256) {
    throw new Error(
      `Phrononaut poster integrity failure: ${decoded.byteLength} bytes / ${sha256}`,
    );
  }

  poster = decoded;
  return poster;
}

export async function GET() {
  const image = loadPoster();

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(image.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "X-NULLWORKS-Asset-SHA256": expectedSha256,
    },
  });
}
