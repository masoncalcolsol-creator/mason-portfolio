import { NextRequest } from "next/server";

const DRIVE_FILE_ID = "1geg4QQruYXdTaNlA4s1OOSldDGVSqZjQ";
const FILE_NAME = "Continuity_Calculus_3_1_Longitudinal_Continuity.pdf";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const source = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;
  const upstream = await fetch(source, { cache: "no-store", redirect: "follow" });
  const type = upstream.headers.get("content-type") || "";

  // Never label a Drive permission/login response as a PDF. The locked artifact
  // remains unavailable here until its exact bytes are stored in a native
  // NULLWORKS-accessible binary store.
  if (!upstream.ok || !upstream.body || !type.toLowerCase().includes("application/pdf")) {
    return new Response("Locked review artifact is not available from this endpoint yet.", {
      status: 503,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "private, no-store, max-age=0",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
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
