import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";

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
      ? `[${event.actor_name || "AI"} · ${event.seat_name || "seat"}${event.model ? ` · ${event.model}` : ""}${event.phase ? ` · ${event.phase}` : ""}]\n${event.content}`
      : `[${event.actor_name || "Human"} · ${event.seat_name || "Human Authority"}]\n${event.content}`,
  }));
}

function rosterText(workers: Worker[]) {
  return workers.map((w, i) => `${i + 1}. ${w.name} — ${w.seatName} — ${resolveModel(w.model)}`).join("\n");
}

async function runWorker(worker: Worker, thread: ThreadEvent[], workers: Worker[], phase: "proposal" | "challenge") {
  const system = `You are ${worker.name}, an AI occupant of the NULLWORKS PENUMBRA workroom seat "${worker.seatName}". You are one worker among humans and other AI workers in a shared room governed by UMBRA.

ACTIVE AI ROSTER:\n${rosterText(workers)}

The thread below is the canonical append-only room log available for this run. Statements from other workers are not facts merely because they are in the log. Preserve provenance, challenge or extend other workers when useful, and never pretend another worker's work is yours. Human Authority remains final and AI agreement never authorizes external action.

Current phase: ${phase.toUpperCase()}.
${phase === "proposal"
  ? "Respond to the latest Human Authority task from your seat. If another worker has already posted in this run, engage the actual claim rather than inventing what they might say."
  : "Review the complete first-pass discussion now visible in the log. Directly challenge, corroborate, or refine specific claims from the other workers. State what changed, if anything, after reading them. Do not merely repeat your first answer."}

Keep this workroom response concise enough for other workers to inspect.`;

  const resolvedModel = resolveModel(worker.model);
  const result = await generateText({
    model: resolvedModel,
    system,
    messages: toGatewayMessages(thread),
    maxOutputTokens: 900,
  });

  if (!result.text?.trim()) throw new Error("Worker returned no text content");
  return {
    workerId: worker.id,
    name: worker.name,
    seatId: worker.seatId,
    seatName: worker.seatName,
    requestedModel: worker.model,
    actualModel: resolvedModel,
    content: result.text.trim(),
    usage: result.usage || null,
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

    // Two ordered passes. Pass 1 builds shared claims. Pass 2 guarantees every
    // surviving worker has seen the complete first-pass output from every other
    // surviving worker before it responds again.
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
          };
          workingLog.push(event);
          results.push({ ok: true, phase, sequence, event, ...result });
        } catch (error) {
          results.push({
            ok: false,
            phase,
            workerId: worker.id,
            name: worker.name,
            seatId: worker.seatId,
            seatName: worker.seatName,
            requestedModel: worker.model,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }
    }

    const appendedEvents = workingLog.slice(incoming.length);
    return NextResponse.json({
      runId,
      results,
      appendedEvents,
      runMode: "shared_append_only_two_pass",
      passes: 2,
      authority: "HUMAN_AUTHORITY_REQUIRED_FOR_EXTERNAL_ACTIONS",
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "PENUMBRA run failed" }, { status: 500 });
  }
}
