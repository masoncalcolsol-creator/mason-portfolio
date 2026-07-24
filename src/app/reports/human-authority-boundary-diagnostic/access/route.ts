import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const REPORT_PATH = "/reports/human-authority-boundary-diagnostic";
const ACCESS_COOKIE = "nw_authority_report_access";
const ACCESS_SHA256 = "a1def04cfe429762159e14b010a0cd49732063ffbec4016e75b88fba83ae460c";

function hasValidAccess(value: string) {
  return createHash("sha256").update(value).digest("hex") === ACCESS_SHA256;
}

function notFoundResponse() {
  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "private, no-store, max-age=0",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
    },
  });
}

export function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("access");

  if (!token || !hasValidAccess(token)) {
    return notFoundResponse();
  }

  const cleanUrl = new URL(REPORT_PATH, request.url);
  const response = NextResponse.redirect(cleanUrl, { status: 303 });
  response.cookies.set({
    name: ACCESS_COOKIE,
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: REPORT_PATH,
    maxAge: 60 * 60 * 24 * 30,
  });
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  return response;
}
