import { gunzipSync } from "node:zlib";
import { NextRequest, NextResponse } from "next/server";
import { subscriptionUpdateGzipBase64 } from "./content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PIN_HASH = "75992a5ac67ff644d3063976c2effd10bdd93fcc109798e3d5c1acf2e530d01a";
const COOKIE_NAME = "nw_amanda_brief_v3";
const COOKIE_VALUE = PIN_HASH.slice(0, 16);

const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
  "Content-Type": "text/html; charset=utf-8",
  "Content-Security-Policy":
    "default-src 'self'; img-src 'self' data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

let cachedPage: string | null = null;

function getPageHtml() {
  if (!cachedPage) {
    cachedPage = gunzipSync(Buffer.from(subscriptionUpdateGzipBase64, "base64")).toString("utf8");
  }
  return cachedPage;
}

export async function GET(request: NextRequest) {
  const unlocked = request.cookies.get(COOKIE_NAME)?.value === COOKIE_VALUE;
  if (!unlocked) {
    return NextResponse.redirect(new URL("/amanda-brief", request.url), 303);
  }

  return new Response(getPageHtml(), {
    status: 200,
    headers: privateHeaders,
  });
}
