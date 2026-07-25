import {
  clearWebVoiceSessionCookie,
  issueWebVoiceSession,
  readWebVoiceSession,
  verifyPressureCookerPasscode,
  verifyWebVoiceInvite,
  webVoiceSessionCookie,
} from "@/lib/neuraxis-web-voice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const attempts = new Map<string, { count: number; resetAt: number }>();
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function noStoreJson(body: unknown, status = 200, headers?: HeadersInit): Response {
  return Response.json(body, {
    status,
    headers: { "cache-control": "no-store", ...(headers || {}) },
  });
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

function clientKey(request: Request): string {
  return (request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown")
    .split(",")[0]
    .trim()
    .slice(0, 100);
}

function rateLimitState(request: Request): { limited: boolean; retryAfter: number } {
  const key = clientKey(request);
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 0, resetAt: now + ATTEMPT_WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }
  return {
    limited: current.count >= MAX_ATTEMPTS,
    retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

function recordFailure(request: Request): void {
  const key = clientKey(request);
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + ATTEMPT_WINDOW_MS });
  } else {
    current.count += 1;
    attempts.set(key, current);
  }
}

function clearFailures(request: Request): void {
  attempts.delete(clientKey(request));
}

export async function GET(request: Request): Promise<Response> {
  const session = readWebVoiceSession(request);
  return noStoreJson({
    ok: Boolean(session),
    authenticated: Boolean(session),
    role: session?.role || null,
    expires_at: session ? new Date(session.exp * 1000).toISOString() : null,
  }, session ? 200 : 401);
}

export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return noStoreJson({ ok: false, error: "Cross-origin access denied." }, 403);

  let input: { passcode?: string; invite?: string } = {};
  try {
    input = await request.json() as typeof input;
  } catch {
    return noStoreJson({ ok: false, error: "Invalid request." }, 400);
  }

  const invite = String(input.invite || "").trim();
  if (invite) {
    const accepted = verifyWebVoiceInvite(invite);
    if (!accepted) return noStoreJson({ ok: false, error: "This invitation is invalid or expired." }, 403);
    const remaining = Math.max(300, accepted.exp - Math.floor(Date.now() / 1000));
    const issued = issueWebVoiceSession("guest", Math.min(2 * 60 * 60, remaining));
    return noStoreJson({
      ok: true,
      role: issued.session.role,
      expires_at: new Date(issued.session.exp * 1000).toISOString(),
    }, 200, { "set-cookie": webVoiceSessionCookie(issued.token, issued.session.exp - issued.session.iat) });
  }

  const rate = rateLimitState(request);
  if (rate.limited) {
    return noStoreJson({ ok: false, error: "Too many attempts. Try again later." }, 429, { "retry-after": String(rate.retryAfter) });
  }

  try {
    const accepted = await verifyPressureCookerPasscode(String(input.passcode || ""));
    if (!accepted) {
      recordFailure(request);
      return noStoreJson({ ok: false, error: "Passcode not accepted." }, 403);
    }
    clearFailures(request);
    const issued = issueWebVoiceSession("admin", 2 * 60 * 60);
    return noStoreJson({
      ok: true,
      role: issued.session.role,
      expires_at: new Date(issued.session.exp * 1000).toISOString(),
    }, 200, { "set-cookie": webVoiceSessionCookie(issued.token, issued.session.exp - issued.session.iat) });
  } catch (error) {
    console.error("Browser voice session gate failed", error);
    return noStoreJson({ ok: false, error: "The secure workroom gate is temporarily unavailable." }, 503);
  }
}

export async function DELETE(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return noStoreJson({ ok: false, error: "Cross-origin access denied." }, 403);
  return noStoreJson({ ok: true }, 200, { "set-cookie": clearWebVoiceSessionCookie() });
}
