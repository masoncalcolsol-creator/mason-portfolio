import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TEAM_ID = "team_EAns37MIr0Y1OA7IxoMMpidi";
const PROJECT_ID = "prj_eV3mRhWVC9bNZzYVSGczp3LLN5AG";

async function readJson(url: string, bearer: string) {
  const started = Date.now();
  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${bearer}`, Accept: "application/json" },
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

function normalizeQuotaEntityId(id: string) {
  return id.startsWith("api_key_id_") ? id : `api_key_id_${id}`;
}

async function discoverGatewayKeyId() {
  const explicit = process.env.AI_GATEWAY_API_KEY_ID?.trim();
  if (explicit) return { id: explicit, source: "AI_GATEWAY_API_KEY_ID", controlStatus: null as number | null, candidateCount: 1 };

  const controlToken = process.env.VERCEL_TOKEN || process.env.VERCEL_OIDC_TOKEN;
  if (!controlToken) return { id: null, source: "NO_CONTROL_PLANE_TOKEN", controlStatus: null as number | null, candidateCount: 0 };

  const url = `https://api.vercel.com/v1/api-keys?teamId=${encodeURIComponent(TEAM_ID)}&purpose=ai-gateway`;
  const listed = await readJson(url, controlToken);
  if (!listed.ok) return { id: null, source: "CONTROL_PLANE_LIST_FAILED", controlStatus: listed.status, candidateCount: 0 };

  const keys = Array.isArray(listed.body?.apiKeys) ? listed.body.apiKeys : Array.isArray(listed.body?.data) ? listed.body.data : [];
  const projectMatches = keys.filter((k: any) => k?.projectId === PROJECT_ID || k?.project?.id === PROJECT_ID);
  const namedMatches = keys.filter((k: any) => typeof k?.name === "string" && /penumbra/i.test(k.name));

  let chosen: any = null;
  let source = "AMBIGUOUS_KEY_LIST";
  if (projectMatches.length === 1) { chosen = projectMatches[0]; source = "AUTO_PROJECT_MATCH"; }
  else if (namedMatches.length === 1) { chosen = namedMatches[0]; source = "AUTO_NAME_MATCH"; }
  else if (keys.length === 1) { chosen = keys[0]; source = "AUTO_ONLY_GATEWAY_KEY"; }

  return {
    id: typeof chosen?.id === "string" ? chosen.id : null,
    source,
    controlStatus: listed.status,
    candidateCount: keys.length,
    selectedName: typeof chosen?.name === "string" ? chosen.name : null,
  };
}

export async function GET() {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  const explicitKeyIdRaw = process.env.AI_GATEWAY_API_KEY_ID;
  const explicitKeyIdTrimmed = explicitKeyIdRaw?.trim() || "";

  const envProbe = {
    gatewayKeyPresent: !!apiKey,
    gatewayKeyIdPresent: explicitKeyIdTrimmed.length > 0,
    gatewayKeyIdLength: explicitKeyIdTrimmed.length,
    gatewayKeyIdPrefixLooksValid: explicitKeyIdTrimmed.length > 0 && /^[A-Za-z0-9_-]+$/.test(explicitKeyIdTrimmed),
    vercelTokenPresent: !!process.env.VERCEL_TOKEN,
    vercelOidcTokenPresent: !!process.env.VERCEL_OIDC_TOKEN,
    note: "Presence/shape only. No secret or key ID value is returned.",
  };

  if (!apiKey) {
    return NextResponse.json({
      checkedAt: new Date().toISOString(),
      authenticated: false,
      keyConfigured: false,
      classification: "NO_GATEWAY_KEY",
      credits: null,
      quota: null,
      envProbe,
    }, { status: 503 });
  }

  const credits = await readJson("https://ai-gateway.vercel.sh/v1/credits", apiKey);
  const keyDiscovery = await discoverGatewayKeyId();
  const quotaEntityId = keyDiscovery.id ? normalizeQuotaEntityId(keyDiscovery.id) : null;
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
  else if (credits.ok && typeof balance === "number" && balance > 0 && quotaEntityId && quota.ok) classification = "PAID_CREDITS_AND_KEY_QUOTA_HEALTHY";
  else if (credits.ok && typeof balance === "number" && balance > 0) classification = "AUTHENTICATED_PAID_CREDITS_AVAILABLE";
  else if (credits.ok) classification = "AUTHENTICATED_CREDITS_RESPONSE_UNPARSED";

  return NextResponse.json({
    checkedAt: new Date().toISOString(),
    authenticated: credits.ok,
    keyConfigured: true,
    classification,
    envProbe,
    credits: {
      ok: credits.ok,
      status: credits.status,
      latencyMs: credits.latencyMs,
      balance,
      totalUsed,
      error: credits.ok ? null : safeErrorBody(credits.body),
    },
    keyDiscovery: {
      resolved: !!keyDiscovery.id,
      source: keyDiscovery.source,
      controlStatus: keyDiscovery.controlStatus,
      candidateCount: keyDiscovery.candidateCount,
      selectedName: (keyDiscovery as any).selectedName || null,
      keyIdReturnedToClient: false,
    },
    quota: {
      ok: quota.ok,
      status: quota.status,
      latencyMs: quota.latencyMs,
      keySpecific: !!quotaEntityId,
      error: quota.ok ? null : safeErrorBody(quota.body),
      raw: quota.ok ? quota.body : null,
      note: quotaEntityId ? "Key-specific quota lookup executed." : "Could not safely resolve a unique AI Gateway key ID; quota shown is team/default scope.",
    },
    secretDisclosure: "Neither AI_GATEWAY_API_KEY nor the resolved key ID is returned to the browser.",
  });
}
