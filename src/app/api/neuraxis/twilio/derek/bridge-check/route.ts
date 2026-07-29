import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20;

export async function GET(request: Request) {
  const oidcToken = request.headers.get("x-vercel-oidc-token") || "";
  if (!oidcToken) {
    return NextResponse.json({
      ok: false,
      mutationPerformed: false,
      error: "Vercel workload identity header is unavailable.",
    }, { status: 503 });
  }

  const base = (process.env.LF_PUBLIC_BASE_URL || "https://lf-lender-intake.vercel.app").replace(/\/$/, "");
  const path = process.env.LF_DIRECT_RULE_PATH || "/api/rules/direct";
  const endpoint = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-lf-admin-key": oidcToken,
      },
      body: JSON.stringify({
        action: "resolve_lender",
        lenderSlug: "",
        lenderDisplayName: "",
        utterance: "Please set Home Express Mortgages minimum FICO to 600.",
      }),
      cache: "no-store",
    });

    const data = await response.json().catch(() => ({})) as Record<string, unknown>;
    const ok = response.ok
      && data.ok === true
      && data.exactLenderMatch === true
      && data.mutationPerformed === false;

    return NextResponse.json({
      ok,
      mutationPerformed: false,
      serviceIdentity: "VERCEL_OIDC",
      endpoint,
      lenderflowStatus: response.status,
      lenderflow: data,
    }, { status: ok ? 200 : 502 });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      mutationPerformed: false,
      serviceIdentity: "VERCEL_OIDC",
      endpoint,
      error: error instanceof Error ? error.message : "Bridge check failed.",
    }, { status: 502 });
  }
}
