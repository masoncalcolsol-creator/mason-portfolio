import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET(request: Request): Response {
  const destination = new URL("/huddle", request.url);
  const response = NextResponse.redirect(destination);
  response.cookies.set("nw_huddle_profile", "derek_lenderflow", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 2 * 60 * 60,
    path: "/",
  });
  return response;
}
