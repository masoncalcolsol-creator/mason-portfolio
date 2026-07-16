import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LEARN_IT_LOUD_ART =
  "https://raw.githubusercontent.com/masoncalcolsol-creator/mason-portfolio/main/public/learn-it-loud/big-ditch-energy-slothers.svg";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname ===
    "/learn-it-loud/big-ditch-energy-slothers.svg"
  ) {
    return NextResponse.redirect(LEARN_IT_LOUD_ART, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/learn-it-loud/big-ditch-energy-slothers.svg",
};
