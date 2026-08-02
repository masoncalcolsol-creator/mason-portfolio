import { NextResponse } from "next/server";

import {
  createStewartAccessToken,
  requestHasStewartAccess,
  STEWART_PROFILE,
  STEWART_ROOM_COOKIE,
  STEWART_ROOM_SLUG,
  verifyStewartPin,
} from "@/lib/stewart-room-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  return NextResponse.json({
    ok: requestHasStewartAccess(request),
    room: STEWART_ROOM_SLUG,
    profile: STEWART_PROFILE,
  }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request): Promise<Response> {
  let pin = "";
  try {
    const body = await request.json() as { pin?: unknown };
    pin = typeof body.pin === "string" ? body.pin : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid access request." }, { status: 400 });
  }

  if (!verifyStewartPin(pin)) {
    return NextResponse.json(
      { ok: false, error: "Incorrect room PIN." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const access = createStewartAccessToken();
    const response = NextResponse.json({
      ok: true,
      room: STEWART_ROOM_SLUG,
      profile: STEWART_PROFILE,
      expiresAt: access.expiresAt,
    });
    response.cookies.set(STEWART_ROOM_COOKIE, access.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: access.maxAge,
      path: "/",
    });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Stewart room token creation failed", error);
    return NextResponse.json(
      { ok: false, error: "Room access is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
