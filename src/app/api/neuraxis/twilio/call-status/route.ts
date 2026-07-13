import {
  readTwilioForm,
  validateTwilioRequest,
} from "@/lib/neuraxis-twilio";
import { finalizeCallTelemetry } from "@/lib/neuraxis-call-telemetry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const TERMINAL_STATUSES = new Set([
  "completed",
  "busy",
  "failed",
  "no-answer",
  "canceled",
]);

export async function POST(request: Request): Promise<Response> {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) {
    return new Response("Access denied.", { status: 403 });
  }

  const callSid = params.CallSid || "";
  const callStatus = String(params.CallStatus || "").toLowerCase();
  const duration = Number.parseInt(params.CallDuration || "", 10);

  if (callSid && TERMINAL_STATUSES.has(callStatus)) {
    try {
      const result = await finalizeCallTelemetry({
        callSid,
        caller: params.From,
        called: params.To,
        callStatus,
        durationSeconds: Number.isFinite(duration) ? duration : undefined,
        direction: params.Direction,
      });
      if (!result.ok) console.error("NEURAXIS call-finalization telemetry failed", result.error);
    } catch (error) {
      console.error("NEURAXIS call-finalization telemetry crashed", error);
    }
  }

  return new Response("ok", {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}

export async function GET(): Promise<Response> {
  return Response.json({
    ok: true,
    service: "NEURAXIS_CALL_STATUS_CALLBACK",
    terminal_statuses: [...TERMINAL_STATUSES],
  }, {
    headers: { "cache-control": "no-store" },
  });
}
