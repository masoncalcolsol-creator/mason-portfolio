import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function readJson(url: string, apiKey: string) {
  const started = Date.now();
  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
    cache: "no-store",
  });
  const text = await response.text();
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { raw: text.slice(0, 1000) }; }
  return { ok: response.ok, status: response.status, latencyMs: Date.now() - started, body };
}

function safeErrorBody(body: any) {
  if (!body) return null;
  if (typeof body === "string") return body.slice(0, 500);
  return body?.error?.message || body?.message || body?.error || body;
}

export async function GET() {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      checkedAt: new Date().toISOString(),
      authenticated: false,
      keyConfigured: false,
      classification: "NO_GATEWAY_KEY",
      credits: null,
      quota: null,
    }, { status: 503 });
  }

  const credits = await readJson("https://ai-gateway.vercel.sh/v1/credits", apiKey);

  const quotaEntityId = process.env.AI_GATEWAY_API_KEY_ID;
  const quotaUrl = quotaEntityId
    ? `https://ai-gateway.vercel.sh/v1/quotas?quotaEntityId=${encodeURIComponent(quotaEntityId)}`
    : "https://ai-gateway.vercel.sh/v1/quotas";
  const quota = await readJson(quotaUrl, apiKey);

  const balanceRaw = credits.body?.balance;
  const totalUsedRaw = credits.body?.total_used ?? credits.body?.totalUsed;
  const balance = balanceRaw != null && Number.isFinite(Number(balanceRaw)) ? Number(balanceRaw) : null;
  const totalUsed = totalUsedRaw != null && Number.isFinite(Number(totalUsedRaw)) ? Number(totalUsedRaw) : null;

  let classification = "UNKNOWN";
  if (credits.status === 401 || credits.status === 403) classification = "AUTHENTICATION_OR_SCOPE_FAILURE";
  else if (credits.ok && balance === 0) classification = "AUTHENTICATED_ZERO_GATEWAY_CREDITS";
  else if (credits.ok && typeof balance === "number" && balance > 0) classification = "AUTHENTICATED_PAID_CREDITS_AVAILABLE";
  else if (credits.ok) classification = "AUTHENTICATED_CREDITS_RESPONSE_UNPARSED";

  return NextResponse.json({
    checkedAt: new Date().toISOString(),
    authenticated: credits.ok,
    keyConfigured: true,
    classification,
    credits: {
      ok: credits.ok,
      status: credits.status,
      latencyMs: credits.latencyMs,
      balance,
      totalUsed,
      raw: credits.ok ? credits.body : null,
      error: credits.ok ? null : safeErrorBody(credits.body),
    },
    quota: {
      ok: quota.ok,
      status: quota.status,
      latencyMs: quota.latencyMs,
      keyIdConfigured: !!quotaEntityId,
      raw: quota.ok ? quota.body : null,
      error: quota.ok ? null : safeErrorBody(quota.body),
      note: quotaEntityId ? null : "AI_GATEWAY_API_KEY_ID is not configured; Vercel may require a key ID for key-specific quota lookup.",
    },
    secretDisclosure: "AI_GATEWAY_API_KEY value is never returned.",
  });
}
