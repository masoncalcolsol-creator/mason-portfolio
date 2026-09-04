import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ThreadEvent = {
  actor_type?: "human" | "ai";
  actor_name?: string;
  seat_name?: string;
  content: string;
  model?: string;
};

type Worker = {
  id: string;
  name: string;
  seatId: string;
  seatName: string;
  model: string;
};

function resolveModel(model: string) {
  if (model === "xai/grok-4") return "spacexai/grok-4.6";
  return model;
}

function toGatewayMessages(thread: ThreadEvent[]) {
  return thread.slice(-24).map((event) => ({
    role: event.actor_type === "ai" ? "assistant" : "user",
    content: event.actor_type === "ai"
      ? `[${event.actor_name || "AI"} · ${event.seat_name || "seat"}${event.model ? ` · ${event.model}` : ""}]\n${event.content}`
      : `[${event.actor_name || "Human"} · ${event.seat_name || "Human Authority"}]\n${event.content}`,
  }));
}

async function runWorker(worker: Worker, thread: ThreadEvent[], apiKey: string) {
  const system = `You are ${worker.name}, an AI occupant of the NULLWORKS PENUMBRA workroom seat "${worker.seatName}". You are one worker among humans and other AI workers in a shared room governed by UMBRA. Read the shared thread, distinguish other workers' statements from facts, challenge or extend them when useful, and answer the latest human task from the perspective of your seat. Do not claim Human Authority. Do not execute or imply external actions. Keep provenance clear and do not pretend another worker's work is yours.`;
  const resolvedModel = resolveModel(worker.model);

  const response = await fetch("https://ai-gateway.vercel.sh/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "http-referer": "https://nullworks.systems/penumbra-workroom",
      "x-title": "NULLWORKS PENUMBRA Workroom",
    },
    body: JSON.stringify({
      model: resolvedModel,
      messages: [{ role: "system", content: system }, ...toGatewayMessages(thread)],
      stream: false,
    }),
  });

  const raw = await response.text();
  let data: any = null;
  try { data = JSON.parse(raw); } catch {}
  if (!response.ok) {
    throw new Error(data?.error?.message || data?.message || `Gateway ${response.status}: ${raw.slice(0, 300)}`);
  }
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) throw new Error("Worker returned no text content");
  return {
    workerId: worker.id,
    name: worker.name,
    seatId: worker.seatId,
    seatName: worker.seatName,
    requestedModel: worker.model,
    actualModel: data?.model || resolvedModel,
    content: content.trim(),
    usage: data?.usage || null,
  };
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;
  if (!apiKey) {
    return NextResponse.json({
      error: "PENUMBRA model gateway is not provisioned. Add AI_GATEWAY_API_KEY to the Vercel project (or enable VERCEL_OIDC_TOKEN).",
      code: "GATEWAY_NOT_PROVISIONED",
    }, { status: 503 });
  }

  try {
    const body = await req.json();
    const workers: Worker[] = Array.isArray(body?.workers) ? body.workers.filter((w: any) => w?.id && w?.model) : [];
    const thread: ThreadEvent[] = Array.isArray(body?.thread) ? body.thread.filter((e: any) => typeof e?.content === "string") : [];
    if (!workers.length) return NextResponse.json({ error: "No active AI occupants selected." }, { status: 400 });
    if (!thread.length) return NextResponse.json({ error: "Shared thread is empty." }, { status: 400 });

    const settled = await Promise.allSettled(workers.slice(0, 8).map((worker) => runWorker(worker, thread, apiKey)));
    const results = settled.map((r, i) => r.status === "fulfilled"
      ? { ok: true, ...r.value }
      : { ok: false, workerId: workers[i]?.id, name: workers[i]?.name, seatId: workers[i]?.seatId, seatName: workers[i]?.seatName, requestedModel: workers[i]?.model, error: r.reason instanceof Error ? r.reason.message : String(r.reason) });

    return NextResponse.json({ results, runMode: "parallel", authority: "HUMAN_AUTHORITY_REQUIRED_FOR_EXTERNAL_ACTIONS" });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "PENUMBRA run failed" }, { status: 500 });
  }
}
