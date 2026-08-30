import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "nullworks.systems";
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

const LEARN_IT_LOUD_ART =
  "https://raw.githubusercontent.com/masoncalcolsol-creator/mason-portfolio/main/public/learn-it-loud/big-ditch-energy-slothers.svg";

function hostname(request: NextRequest): string {
  return (request.headers.get("host") || request.nextUrl.hostname || "")
    .split(":")[0]
    .toLowerCase();
}

function isLocalHost(host: string): boolean {
  return host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0" || host.endsWith(".local");
}

function shouldRedirectToCanonical(request: NextRequest): boolean {
  const host = hostname(request);
  if (!host || host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}` || isLocalHost(host)) {
    return false;
  }

  // Preview deployments stay addressable for review. Production aliases must not
  // compete with the corporate domain.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return false;
  }

  return (
    host.endsWith(".vercel.app") ||
    host.includes("mason-portfolio") ||
    host === `www.${CANONICAL_HOST}`
  );
}

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname ===
    "/learn-it-loud/big-ditch-energy-slothers.svg"
  ) {
    return NextResponse.redirect(LEARN_IT_LOUD_ART, 307);
  }

  if (shouldRedirectToCanonical(request)) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/learn-it-loud/big-ditch-energy-slothers.svg",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
