import { createHash, timingSafeEqual } from "node:crypto";
import { gunzipSync } from "node:zlib";
import { NextRequest, NextResponse } from "next/server";
import { amandaBriefGzipBase64 } from "./content";

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

let cachedBrief: string | null = null;

function getBriefHtml() {
  if (!cachedBrief) {
    cachedBrief = gunzipSync(Buffer.from(amandaBriefGzipBase64, "base64")).toString("utf8");
  }
  return cachedBrief;
}

function loginHtml(hasError = false) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <meta name="referrer" content="no-referrer">
  <title>Private NULLWORKS Family Brief</title>
  <style>
    *{box-sizing:border-box}body{margin:0;min-height:100svh;display:grid;place-items:center;padding:22px;background:radial-gradient(circle at 80% 5%,rgba(105,183,255,.13),transparent 26rem),#080b10;color:#f3f6f8;font-family:Inter,system-ui,-apple-system,"Segoe UI",Arial,sans-serif}
    main{width:min(100%,430px);border:1px solid #33404d;border-radius:28px;padding:30px 24px;background:linear-gradient(145deg,#111923,#0c1016);box-shadow:0 32px 90px rgba(0,0,0,.4)}
    .mark{display:inline-flex;padding:7px 10px;border:1px solid #465464;border-radius:999px;color:#f5c84b;font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}
    h1{margin:19px 0 10px;font-size:clamp(36px,10vw,53px);line-height:.94;letter-spacing:-.055em}p{margin:0 0 23px;color:#aeb8c4;line-height:1.55}.error{margin:0 0 16px;padding:12px 13px;border:1px solid #7a4141;border-radius:13px;background:#2a1717;color:#ffb0b0;font-weight:750}
    label{display:block;margin-bottom:8px;color:#dfe5ea;font-size:13px;font-weight:850}input{width:100%;min-height:58px;border:1px solid #465464;border-radius:15px;padding:0 17px;background:#080d13;color:#fff;font:800 24px/1 system-ui;letter-spacing:.28em;text-align:center;outline:none}input:focus{border-color:#f5c84b;box-shadow:0 0 0 4px rgba(245,200,75,.13)}button{width:100%;min-height:56px;margin-top:13px;border:0;border-radius:15px;background:#f5c84b;color:#101319;font:950 16px/1 system-ui;cursor:pointer}.note{margin:17px 0 0;color:#7f8b98;font-size:12px;text-align:center}
  </style>
</head>
<body>
  <main>
    <span class="mark">NULLWORKS · Private family page</span>
    <h1>What Mason has been building.</h1>
    <p>Enter the four-digit PIN to open the mobile family brief.</p>
    ${hasError ? '<div class="error" role="alert">That PIN was not accepted. Please try again.</div>' : ""}
    <form method="post" action="/amanda-brief" autocomplete="off">
      <label for="pin">PIN</label>
      <input id="pin" name="pin" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autofocus required>
      <button type="submit">Open private brief</button>
    </form>
    <p class="note">This page is excluded from search indexing and is not linked from the public portfolio.</p>
  </main>
</body>
</html>`;
}

function pinMatches(pin: string) {
  const candidate = createHash("sha256").update(pin).digest();
  const expected = Buffer.from(PIN_HASH, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("lock") === "1") {
    const response = NextResponse.redirect(new URL("/amanda-brief", request.url), 303);
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  const unlocked = request.cookies.get(COOKIE_NAME)?.value === COOKIE_VALUE;
  return new Response(unlocked ? getBriefHtml() : loginHtml(), {
    status: 200,
    headers: privateHeaders,
  });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const pin = String(formData.get("pin") ?? "").trim();

  if (!pinMatches(pin)) {
    return new Response(loginHtml(true), {
      status: 401,
      headers: privateHeaders,
    });
  }

  const response = NextResponse.redirect(new URL("/amanda-brief", request.url), 303);
  response.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}
