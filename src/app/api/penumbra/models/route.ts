import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const r = await fetch("https://ai-gateway.vercel.sh/v1/models", { cache: "no-store" });
    if (!r.ok) {
      return NextResponse.json({ models: [], error: `Gateway model discovery failed (${r.status})` }, { status: 502 });
    }
    const json = await r.json();
    const models = Array.isArray(json?.data)
      ? json.data
          .filter((m: any) => !m?.type || m.type === "language")
          .map((m: any) => ({ id: m.id, name: m.name || m.id, provider: m.owned_by || String(m.id).split("/")[0], tags: m.tags || [] }))
      : [];
    return NextResponse.json({ models });
  } catch (error) {
    return NextResponse.json({ models: [], error: error instanceof Error ? error.message : "Model discovery failed" }, { status: 502 });
  }
}
