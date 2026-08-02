import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET(request: Request): Response {
  const destination = new URL("/huddle", request.url);
  const response = NextResponse.redirect(destination);
  response.cookies.set("nw_huddle_profile", "jason_rains", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 4 * 60 * 60,
    path: "/",
  });
  return response;
}
