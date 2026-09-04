import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ThreadEvent = {
  id?: string;
  ts?: string;
  actor_id?: string;
  actor_type?: "human" | "ai";
  actor_name?: string;
  seat_id?: string;
  seat_name?: string;
  content: string;
  model?: string;
  provider?: string;
  run_id?: string;
  phase?: string;
  sequence?: number;
  status?: "ok" | "error";
};

type Worker = { id: string; name: string; seatId: string; seatName: string; model: string };
type NormalizedUsage = { inputTokens: number | null; outputTokens: number | null; totalTokens: number | null };
type GatewayResult = {
  text: string;
  model: string;
  provider?: string;
  usage: any;
  telemetry: NormalizedUsage & {
    costUsd: number | null;
    marketCostUsd: number | null;
    latencyMs: number;
    generationId: string | null;
  };
};

function resolveModel(model: string) {
  if (model === "xai/grok-4") return "spacexai/grok-4.6";
  return model;
}

function uid(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function toGatewayMessages(thread: ThreadEvent[]) {
  return thread.slice(-40).map((event) => ({
    role: event.actor_type === "ai" ? "assistant" as const : "user" as const,
    content: event.actor_type === "ai"
      ? `[${event.actor_name || "AI"} · ${event.seat_name || "seat"}${event.model ? ` · ${event.model}` : ""}${event.phase ? ` · ${event.phase}` : ""}${event.status === "error" ? " · ERROR" : ""}]\n${event.content}`
      : `[${event.actor_name || "Human"} · ${event.seat_name || "Human Authority"}]\n${event.content}`,
  }));
}

function rosterText(workers: Worker[]) {
  return workers.map((w, i) => `${i + 1}. ${w.name} — ${w.seatName} — requested ${resolveModel(w.model)}`).join("\n");
}

function modelAttempts(model: string) {
  if (model.startsWith("openai/")) return [model, "openai/gpt-5.5", "openai/gpt-5.4", "openai/gpt-4.1"];
  if (model.startsWith("anthropic/")) return [
    model,
    "anthropic/claude-sonnet-5",
    "anthropic/claude-opus-5",
    "anthropic/claude-sonnet-4.6",
    "anthropic/claude-sonnet-4",
    "anthropic/claude-haiku-4.5",
    "anthropic/claude-3-haiku",
  ];
  return [model];
}

function providerOrder(model: string) {
  if (model.startsWith("openai/")) return ["openai", "azure"];
  if (model.startsWith("spacexai/")) return ["spacexai"];
  return [] as string[];
}

function n(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function normalizeUsage(usage: any): NormalizedUsage {
  if (!usage) return { inputTokens: null, outputTokens: null, totalTokens: null };
  const inputTokens = n(usage.prompt_tokens) ?? n(usage.input_tokens) ?? n(usage.promptTokens) ?? n(usage.inputTokens);
  const outputTokens = n(usage.completion_tokens) ?? n(usage.output_tokens) ?? n(usage.completionTokens) ?? n(usage.outputTokens);
  const explicitTotal = n(usage.total_tokens) ?? n(usage.totalTokens);
  const totalTokens = explicitTotal ?? (inputTokens !== null && outputTokens !== null ? inputTokens + outputTokens : null);
  return { inputTokens, outputTokens, totalTokens };
}

function gatewayMeta(payload: any) {
  const gateway = payload?.provider_metadata?.gateway || payload?.providerMetadata?.gateway || payload?.metadata?.gateway || {};
  const routing = gateway?.routing || {};
  return {
    costUsd: gateway?.cost != null && Number.isFinite(Number(gateway.cost)) ? Number(gateway.cost) : null,
    marketCostUsd: gateway?.marketCost != null && Number.isFinite(Number(gateway.marketCost)) ? Number(gateway.marketCost) : null,
    generationId: typeof gateway?.generationId === "string" ? gateway.generationId : null,
    provider: typeof routing?.finalProvider === "string" ? routing.finalProvider : typeof routing?.resolvedProvider === "string" ? routing.resolvedProvider : null,
  };
}

async function callChatCompletionsOnce(apiKey: string, model: string, system: string, messages: ReturnType<typeof toGatewayMessages>): Promise<GatewayResult> {
  const order = providerOrder(model);
  const requestBody: Record<string, unknown> = { model, messages: [{ role: "system", content: system }, ...messages], stream: false };
  if (order.length) requestBody.providerOptions = { gateway: { order } };

  const started = Date.now();
  const response = await fetch("https://ai-gateway.vercel.sh/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
    cache: "no-store",
  });
  const latencyMs = Date.now() - started;
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.error?.message || payload?.error || payload?.message || `AI Gateway request failed (${response.status})`;
    throw new Error(`${response.status} ${typeof message === "string" ? message : JSON.stringify(message)}`);
  }
  const text = payload?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) throw new Error("200 Worker returned no text content");
  const gm = gatewayMeta(payload);
  return {
    text: text.trim(),
    model: typeof payload?.model === "string" ? payload.model : model,
    provider: gm.provider || undefined,
    usage: payload?.usage || null,
    telemetry: { ...normalizeUsage(payload?.usage), costUsd: gm.costUsd, marketCostUsd: gm.marketCostUsd, latencyMs, generationId: gm.generationId },
  };
}

async function callAnthropicMessagesOnce(apiKey: string, model: string, system: string, messages: ReturnType<typeof toGatewayMessages>): Promise<GatewayResult> {
  const started = Date.now();
  const response = await fetch("https://ai-gateway.vercel.sh/v1/messages", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model, system, max_tokens: 1200, messages }),
    cache: "no-store",
  });
  const latencyMs = Date.now() - started;
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.error?.message || payload?.error || payload?.message || `Anthropic Gateway request failed (${response.status})`;
    throw new Error(`${response.status} ${typeof message === "string" ? message : JSON.stringify(message)}`);
  }
  const text = Array.isArray(payload?.content)
    ? payload.content.filter((b: any) => b?.type === "text" && typeof b?.text === "string").map((b: any) => b.text).join("\n").trim()
    : "";
  if (!text) throw new Error("200 Claude returned no text content");
  const gm = gatewayMeta(payload);
  return {
    text,
    model: typeof payload?.model === "string" ? payload.model : model,
    provider: gm.provider || "anthropic",
    usage: payload?.usage || null,
    telemetry: { ...normalizeUsage(payload?.usage), costUsd: gm.costUsd, marketCostUsd: gm.marketCostUsd, latencyMs, generationId: gm.generationId },
  };
}

async function callPaidGateway(model: string, system: string, messages: ReturnType<typeof toGatewayMessages>) {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) throw new Error("AI_GATEWAY_API_KEY is not configured for this deployment.");
  const attempts = [...new Set(modelAttempts(model))];
  const failures: string[] = [];
  let attemptCount = 0;

  for (const candidate of attempts) {
    attemptCount += 1;
    try {
      const result = model.startsWith("anthropic/")
        ? await callAnthropicMessagesOnce(apiKey, candidate, system, messages)
        : await callChatCompletionsOnce(apiKey, candidate, system, messages);
      return { ...result, attemptCount, attemptedModels: attempts.slice(0, attemptCount) };
    } catch (error) {
      failures.push(`${candidate}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  throw new Error(`ALL SAME-VENDOR MODEL ATTEMPTS FAILED | ${failures.join(" | ")}`);
}

async function runWorker(worker: Worker, thread: ThreadEvent[], workers: Worker[], phase: "proposal" | "challenge") {
  const system = `You are ${worker.name}, an AI occupant of the NULLWORKS PENUMBRA workroom seat "${worker.seatName}". You are one worker among humans and other AI workers in a shared room governed by UMBRA.\n\nACTIVE AI ROSTER:\n${rosterText(workers)}\n\nThe thread below is the canonical append-only room log available for this run. Statements from other workers are not facts merely because they are in the log. Preserve provenance, challenge or extend other workers when useful, and never pretend another worker's work is yours. Human Authority remains final and AI agreement never authorizes external action.\n\nWorker failure events are also part of the canonical log. Treat them as operational evidence about a seat/provider invocation, not as a substantive claim from that worker.\n\nCurrent phase: ${phase.toUpperCase()}.\n${phase === "proposal" ? "Respond to the latest Human Authority task from your seat. If another worker has already posted in this run, engage the actual claim rather than inventing what they might say." : "Review the complete first-pass discussion now visible in the log. Directly challenge, corroborate, or refine specific claims from the other workers. State what changed, if anything, after reading them. Do not merely repeat your first answer."}\n\nKeep this workroom response concise enough for other workers to inspect.`;

  const requestedResolvedModel = resolveModel(worker.model);
  const result = await callPaidGateway(requestedResolvedModel, system, toGatewayMessages(thread));
  return {
    workerId: worker.id,
    name: worker.name,
    seatId: worker.seatId,
    seatName: worker.seatName,
    requestedModel: worker.model,
    requestedResolvedModel,
    actualModel: result.model || requestedResolvedModel,
    actualProvider: result.provider || (result.model || requestedResolvedModel).split("/")[0],
    content: result.text,
    usage: result.usage,
    telemetry: { ...result.telemetry, attemptCount: result.attemptCount, fallbackCount: Math.max(0, result.attemptCount - 1), attemptedModels: result.attemptedModels },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const workers: Worker[] = Array.isArray(body?.workers) ? body.workers.filter((w: any) => w?.id && w?.model).slice(0, 8) : [];
    const incoming: ThreadEvent[] = Array.isArray(body?.thread) ? body.thread.filter((e: any) => typeof e?.content === "string") : [];
    if (!workers.length) return NextResponse.json({ error: "No active AI occupants selected." }, { status: 400 });
    if (!incoming.length) return NextResponse.json({ error: "Shared thread is empty." }, { status: 400 });

    const runId = uid("run");
    const workingLog: ThreadEvent[] = [...incoming];
    const results: any[] = [];
    let sequence = 0;

    for (const phase of ["proposal", "challenge"] as const) {
      for (const worker of workers) {
        try {
          const result = await runWorker(worker, workingLog, workers, phase);
          sequence += 1;
          const event: ThreadEvent = {
            id: uid("evt"), ts: new Date().toISOString(), actor_id: result.workerId, actor_name: result.name, actor_type: "ai",
            seat_id: result.seatId, seat_name: result.seatName, provider: result.actualProvider, model: result.actualModel,
            content: result.content, run_id: runId, phase, sequence, status: "ok",
          };
          workingLog.push(event);
          results.push({ ok: true, phase, sequence, event, ...result });
        } catch (error) {
          sequence += 1;
          const resolvedModel = resolveModel(worker.model);
          const errorMessage = error instanceof Error ? error.message : String(error);
          const failureEvent: ThreadEvent = {
            id: uid("evt"), ts: new Date().toISOString(), actor_id: worker.id, actor_name: worker.name, actor_type: "ai",
            seat_id: worker.seatId, seat_name: worker.seatName, provider: resolvedModel.split("/")[0], model: resolvedModel,
            content: `WORKER INVOCATION FAILED: ${errorMessage}`, run_id: runId, phase, sequence, status: "error",
          };
          workingLog.push(failureEvent);
          results.push({ ok: false, phase, sequence, event: failureEvent, workerId: worker.id, name: worker.name, seatId: worker.seatId, seatName: worker.seatName, requestedModel: worker.model, actualModel: resolvedModel, error: errorMessage, telemetry: null });
        }
      }
    }

    const successful = results.filter((r) => r.ok);
    const totals = successful.reduce((acc, r) => {
      const t = r.telemetry || {};
      acc.inputTokens += t.inputTokens || 0;
      acc.outputTokens += t.outputTokens || 0;
      acc.totalTokens += t.totalTokens || 0;
      acc.costUsd += t.costUsd || 0;
      acc.latencyMs += t.latencyMs || 0;
      return acc;
    }, { inputTokens: 0, outputTokens: 0, totalTokens: 0, costUsd: 0, latencyMs: 0 });

    return NextResponse.json({
      runId,
      results,
      appendedEvents: workingLog.slice(incoming.length),
      telemetrySummary: { successfulInvocations: successful.length, failedInvocations: results.length - successful.length, ...totals },
      runMode: "shared_append_only_two_pass_worker_economics_v0_3",
      passes: 2,
      gatewayAuth: "AI_GATEWAY_API_KEY",
      authority: "HUMAN_AUTHORITY_REQUIRED_FOR_EXTERNAL_ACTIONS",
      tokenComparabilityNote: "Token counts are tokenizer-relative across vendors; compare cost and outcome alongside raw tokens.",
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "PENUMBRA run failed" }, { status: 500 });
  }
}
