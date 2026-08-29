import { NextRequest } from "next/server";

const DRIVE_FILE_ID = "1geg4QQruYXdTaNlA4s1OOSldDGVSqZjQ";
const FILE_NAME = "Continuity_Calculus_3_1_Longitudinal_Continuity.pdf";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const source = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;
  const upstream = await fetch(source, { cache: "no-store", redirect: "follow" });

  if (!upstream.ok || !upstream.body) {
    return new Response("Review artifact is temporarily unavailable.", { status: 502 });
  }

  const download = request.nextUrl.searchParams.get("download") === "1";

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${FILE_NAME}"`,
      "Cache-Control": "private, no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
