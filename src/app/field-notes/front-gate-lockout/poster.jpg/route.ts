import { NextResponse } from "next/server";
import POSTER_JPEG_B64 from "../_poster.b64";

export async function GET() {
  const bytes = Buffer.from(POSTER_JPEG_B64.replace(/\s+/g, ""), "base64");
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
