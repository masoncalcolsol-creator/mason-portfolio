import { NextResponse } from "next/server";

import {
  createLenderFlowAccessToken,
  LENDERFLOW_PROFILE,
  LENDERFLOW_ROOM_COOKIE,
  LENDERFLOW_ROOM_SLUG,
  requestHasLenderFlowAccess,
  verifyLenderFlowPin,
} from "@/lib/lenderflow-room-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  return NextResponse.json({
    ok: requestHasLenderFlowAccess(request),
    room: LENDERFLOW_ROOM_SLUG,
    profile: LENDERFLOW_PROFILE,
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

  if (!verifyLenderFlowPin(pin)) {
    return NextResponse.json(
      { ok: false, error: "Incorrect room PIN." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const access = createLenderFlowAccessToken();
    const response = NextResponse.json({
      ok: true,
      room: LENDERFLOW_ROOM_SLUG,
      profile: LENDERFLOW_PROFILE,
      expiresAt: access.expiresAt,
    });
    response.cookies.set(LENDERFLOW_ROOM_COOKIE, access.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: access.maxAge,
      path: "/",
    });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("LenderFlow room token creation failed", error);
    return NextResponse.json(
      { ok: false, error: "Room access is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
