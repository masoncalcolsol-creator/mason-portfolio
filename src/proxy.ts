import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REPORT_PATH = "/reports/human-authority-boundary-diagnostic";
const ACCESS_COOKIE = "nw_authority_report_access";
const ACCESS_SHA256 = "a1def04cfe429762159e14b010a0cd49732063ffbec4016e75b88fba83ae460c";

async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
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

export async function proxy(request: NextRequest) {
  const queryToken = request.nextUrl.searchParams.get("access");
  const cookieToken = request.cookies.get(ACCESS_COOKIE)?.value;
  const candidate = queryToken ?? cookieToken;

  if (!candidate || (await sha256(candidate)) !== ACCESS_SHA256) {
    return notFoundResponse();
  }

  if (queryToken) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("access");

    const response = NextResponse.redirect(cleanUrl, 303);
    response.cookies.set({
      name: ACCESS_COOKIE,
      value: queryToken,
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

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  return response;
}

export const config = {
  matcher: "/reports/human-authority-boundary-diagnostic",
};
