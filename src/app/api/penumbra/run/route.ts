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
  return workers.map((w, i) => `${i + 1}. ${w.name} — ${w.seatName} — ${resolveModel(w.model)}`).join("\n");
}

function modelAttempts(model: string) {
  if (model.startsWith("openai/")) {
    return [model, "openai/gpt-5.5", "openai/gpt-5.4", "openai/gpt-4.1"];
  }
  if (model.startsWith("anthropic/")) {
    return [model, "anthropic/claude-sonnet-4.6", "anthropic/claude-sonnet-4", "anthropic/claude-haiku-4.5"];
  }
  return [model];
}

function providerOrder(model: string) {
  if (model.startsWith("openai/")) return ["openai", "azure"];
  if (model.startsWith("anthropic/")) return ["anthropic", "vertex"];
  if (model.startsWith("spacexai/")) return ["spacexai"];
  return [] as string[];
}

async function callGatewayOnce(
  apiKey: string,
  model: string,
  system: string,
  messages: ReturnType<typeof toGatewayMessages>,
) {
  const order = providerOrder(model);
  const requestBody: Record<string, unknown> = {
    model,
    messages: [{ role: "system", content: system }, ...messages],
    stream: false,
  };

  if (order.length) {
    requestBody.providerOptions = { gateway: { order } };
  }

  const response = await fetch("https://ai-gateway.vercel.sh/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    cache: "no-store",
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.error?.message || payload?.error || payload?.message || `AI Gateway request failed (${response.status})`;
    throw new Error(`${response.status} ${typeof message === "string" ? message : JSON.stringify(message)}`);
  }

  const text = payload?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) {
    throw new Error("200 Worker returned no text content");
  }

  return {
    text: text.trim(),
    model: typeof payload?.model === "string" ? payload.model : model,
    usage: payload?.usage || null,
  };
}

async function callPaidGateway(model: string, system: string, messages: ReturnType<typeof toGatewayMessages>) {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) throw new Error("AI_GATEWAY_API_KEY is not configured for this deployment.");

  const attempts = [...new Set(modelAttempts(model))];
  const failures: string[] = [];

  for (const candidate of attempts) {
    try {
      return await callGatewayOnce(apiKey, candidate, system, messages);
    } catch (error) {
      failures.push(`${candidate}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  throw new Error(`ALL SAME-VENDOR MODEL ATTEMPTS FAILED | ${failures.join(" | ")}`);
}

async function runWorker(worker: Worker, thread: ThreadEvent[], workers: Worker[], phase: "proposal" | "challenge") {
  const system = `You are ${worker.name}, an AI occupant of the NULLWORKS PENUMBRA workroom seat "${worker.seatName}". You are one worker among humans and other AI workers in a shared room governed by UMBRA.

ACTIVE AI ROSTER:\n${rosterText(workers)}

The thread below is the canonical append-only room log available for this run. Statements from other workers are not facts merely because they are in the log. Preserve provenance, challenge or extend other workers when useful, and never pretend another worker's work is yours. Human Authority remains final and AI agreement never authorizes external action.

Worker failure events are also part of the canonical log. Treat them as operational evidence about a seat/provider invocation, not as a substantive claim from that worker.

Current phase: ${phase.toUpperCase()}.
${phase === "proposal"
  ? "Respond to the latest Human Authority task from your seat. If another worker has already posted in this run, engage the actual claim rather than inventing what they might say."
  : "Review the complete first-pass discussion now visible in the log. Directly challenge, corroborate, or refine specific claims from the other workers. State what changed, if anything, after reading them. Do not merely repeat your first answer."}

Keep this workroom response concise enough for other workers to inspect.`;

  const requestedResolvedModel = resolveModel(worker.model);
  const result = await callPaidGateway(requestedResolvedModel, system, toGatewayMessages(thread));

  return {
    workerId: worker.id,
    name: worker.name,
    seatId: worker.seatId,
    seatName: worker.seatName,
    requestedModel: worker.model,
    actualModel: result.model || requestedResolvedModel,
    content: result.text,
    usage: result.usage,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const workers: Worker[] = Array.isArray(body?.workers)
      ? body.workers.filter((w: any) => w?.id && w?.model).slice(0, 8)
      : [];
    const incoming: ThreadEvent[] = Array.isArray(body?.thread)
      ? body.thread.filter((e: any) => typeof e?.content === "string")
      : [];

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
            id: uid("evt"),
            ts: new Date().toISOString(),
            actor_id: result.workerId,
            actor_name: result.name,
            actor_type: "ai",
            seat_id: result.seatId,
            seat_name: result.seatName,
            provider: result.actualModel.split("/")[0],
            model: result.actualModel,
            content: result.content,
            run_id: runId,
            phase,
            sequence,
            status: "ok",
          };
          workingLog.push(event);
          results.push({ ok: true, phase, sequence, event, ...result });
        } catch (error) {
          sequence += 1;
          const resolvedModel = resolveModel(worker.model);
          const errorMessage = error instanceof Error ? error.message : String(error);
          const failureEvent: ThreadEvent = {
            id: uid("evt"),
            ts: new Date().toISOString(),
            actor_id: worker.id,
            actor_name: worker.name,
            actor_type: "ai",
            seat_id: worker.seatId,
            seat_name: worker.seatName,
            provider: resolvedModel.split("/")[0],
            model: resolvedModel,
            content: `WORKER INVOCATION FAILED: ${errorMessage}`,
            run_id: runId,
            phase,
            sequence,
            status: "error",
          };
          workingLog.push(failureEvent);
          results.push({ ok: false, phase, sequence, event: failureEvent, workerId: worker.id, name: worker.name, seatId: worker.seatId, seatName: worker.seatName, requestedModel: worker.model, actualModel: resolvedModel, error: errorMessage });
        }
      }
    }

    const appendedEvents = workingLog.slice(incoming.length);
    return NextResponse.json({
      runId,
      results,
      appendedEvents,
      runMode: "shared_append_only_two_pass_paid_gateway_explicit_same_vendor_retry",
      passes: 2,
      gatewayAuth: "AI_GATEWAY_API_KEY",
      authority: "HUMAN_AUTHORITY_REQUIRED_FOR_EXTERNAL_ACTIONS",
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "PENUMBRA run failed" }, { status: 500 });
  }
}
