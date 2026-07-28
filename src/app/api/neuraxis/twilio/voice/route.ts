import { after } from "next/server";

import {
  lookupCallerName,
  normalizePhone,
  readTwilioForm,
  say,
  speak,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";
import {
  ensureIncomingNumberStatusCallback,
  startCallTelemetry,
} from "@/lib/neuraxis-call-telemetry";
import { WEB_VOICE_MAX_SECONDS, WEB_VOICE_WARNING_SECONDS } from "@/lib/neuraxis-web-voice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

type HiveStatus = {
  ok: boolean;
  mode: "HIVE_CONNECTED" | "HIVE_TOKEN_MISSING" | "HIVE_READ_FAILED";
  bootVersion?: string;
  floorVersion?: string;
  floorStatus?: string;
  company?: string;
  category?: string;
  error?: string;
};

type WebVoiceState = {
  enabled: boolean;
  started: number;
  limit: number;
  elapsed: number;
  warned: number;
  warning?: string;
};

const HIVE_REPO = process.env.HIVE_REPO || "masoncalcolsol-creator/nullworks-corporate-wifi-hive";
const HIVE_BRANCH = process.env.HIVE_BRANCH || "main";
const HIVE_TOKEN = process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";

function pickYamlValue(content: string, key: string): string | undefined {
  const match = content.match(new RegExp(`^${key}:\\s*["']?([^\\n"']+)`, "m"));
  return match?.[1]?.trim();
}

async function fetchHiveFile(path: string): Promise<string> {
  if (!HIVE_TOKEN) throw new Error("HIVE_GITHUB_TOKEN missing");
  const url = `https://api.github.com/repos/${HIVE_REPO}/contents/${encodeURIComponent(path).replaceAll("%2F", "/")}?ref=${encodeURIComponent(HIVE_BRANCH)}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${HIVE_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "NULLWORKS-Neuraxis-Twilio-Hive-Bridge",
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`GitHub read failed for ${path}: ${response.status}`);
  const data = await response.json() as { content?: string };
  if (!data.content) throw new Error(`GitHub file missing content: ${path}`);
  return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8");
}

async function readHiveStatus(): Promise<HiveStatus> {
  if (!HIVE_TOKEN) return { ok: false, mode: "HIVE_TOKEN_MISSING", error: "HIVE_GITHUB_TOKEN is not configured." };
  try {
    const boot = await fetchHiveFile("HIVE_BOOT.yaml");
    const floorPath = pickYamlValue(boot, "company_floor") || "hive/current/company_floor.yaml";
    const floor = await fetchHiveFile(floorPath);
    return {
      ok: true,
      mode: "HIVE_CONNECTED",
      bootVersion: pickYamlValue(boot, "version"),
      floorVersion: pickYamlValue(floor, "floor_version"),
      floorStatus: pickYamlValue(floor, "status"),
      company: pickYamlValue(floor, "company"),
      category: pickYamlValue(floor, "category"),
    };
  } catch (error) {
    return { ok: false, mode: "HIVE_READ_FAILED", error: error instanceof Error ? error.message : "Unknown Hive read failure" };
  }
}

function readWebVoiceState(url: URL): WebVoiceState {
  const enabled = url.searchParams.get("web") === "1";
  if (!enabled) return { enabled: false, started: 0, limit: 0, elapsed: 0, warned: 0 };
  const now = Math.floor(Date.now() / 1000);
  const started = Number.parseInt(url.searchParams.get("started") || "0", 10);
  const requestedLimit = Number.parseInt(url.searchParams.get("limit") || String(WEB_VOICE_MAX_SECONDS), 10);
  const limit = Number.isFinite(requestedLimit) ? Math.max(60, Math.min(WEB_VOICE_MAX_SECONDS, requestedLimit)) : WEB_VOICE_MAX_SECONDS;
  const elapsed = Number.isFinite(started) && started > 0 ? Math.max(0, now - started) : limit;
  const priorWarned = Number.parseInt(url.searchParams.get("warned") || "0", 10) || 0;
  let warned = priorWarned;
  let warning: string | undefined;
  if (elapsed >= WEB_VOICE_WARNING_SECONDS[1] && priorWarned < 19) {
    warned = 19;
    warning = "Cost control warning. One minute remains before the browser voice session closes.";
  } else if (elapsed >= WEB_VOICE_WARNING_SECONDS[0] && priorWarned < 15) {
    warned = 15;
    warning = "Cost control warning. Five minutes remain before the browser voice session closes.";
  }
  return { enabled, started, limit, elapsed, warned, warning };
}

function applyWebVoiceState(target: URL, state: WebVoiceState): void {
  if (!state.enabled) return;
  target.searchParams.set("web", "1");
  target.searchParams.set("started", String(state.started));
  target.searchParams.set("limit", String(state.limit));
  target.searchParams.set("warned", String(state.warned));
}

async function handle(request: Request): Promise<Response> {
  const params = request.method === "POST" ? await readTwilioForm(request) : {};
  if (request.method === "POST" && !validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }

  const url = new URL(request.url);
  const room = url.searchParams.get("room") || "";
  const isLoop = url.searchParams.get("loop") === "1";
  const telemetrySeen = url.searchParams.get("telemetry") === "1";
  const webVoice = readWebVoiceState(url);

  if (webVoice.enabled && webVoice.elapsed >= webVoice.limit) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("The twenty minute browser voice cost ceiling has been reached. This session is now closed.", request.url)}<Hangup/></Response>`);
  }

  if (!room && !isLoop) {
    if (request.method === "POST" && params.CallSid && !telemetrySeen) {
      const event = {
        callSid: params.CallSid,
        caller: params.From || "",
        called: params.To || "",
        direction: params.Direction || "inbound",
        callStatus: params.CallStatus || "in-progress",
        requestUrl: request.url,
      };
      after(async () => {
        try {
          const caller = normalizePhone(event.caller);
          const approvedMason = normalizePhone(process.env.NEURAXIS_MASON_CALLER || "");
          const lookup = caller && approvedMason && caller === approvedMason
            ? { name: "Mason", type: "APPROVED_CALLER" }
            : await lookupCallerName(caller);
          await Promise.allSettled([
            startCallTelemetry({
              callSid: event.callSid,
              caller: event.caller,
              callerName: lookup.name || params.CallerName,
              callerType: lookup.type,
              called: event.called,
              direction: event.direction,
              callStatus: event.callStatus,
            }),
            ensureIncomingNumberStatusCallback(event.requestUrl),
          ]);
        } catch (error) {
          console.error("NEURAXIS call-start telemetry failed", error);
        }
      });
    }

    const menuUrl = new URL("/api/neuraxis/twilio/menu", request.url).toString();
    const retryUrl = new URL("/api/neuraxis/twilio/voice?telemetry=1", request.url).toString();
    const prompt = "NEURAXIS is online. Press or say 1 for the shared workroom. Press or say 2 for private workroom two. Press or say 3 for Derek Bullen's private LenderFlow rule workroom. Press or say 4 for Mason's Gray Matter Storage Unit. Press or say 5 for the operating model audit. Press or say 7 for Mr. Sloth's quiet booth. Press or say 8 for the password protected NULLWORKS Pressure Cooker Workroom. Press or say 9 for Mason's private Hive.";
    return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech dtmf" numDigits="1" timeout="7" speechTimeout="2" actionOnEmptyResult="true" method="POST" action="${xmlEscape(menuUrl)}">
    ${speak(prompt, request.url)}
  </Gather>
  ${speak("I did not get a selection. Let's try once more.", request.url)}
  <Redirect method="POST">${xmlEscape(retryUrl)}</Redirect>
</Response>`);
  }

  const status = await readHiveStatus();
  const commandRoom = room === "private"
    ? "private"
    : room === "pressure"
      ? "pressure"
      : room === "anthony"
        ? "anthony"
        : "workroom";
  const commandPath = commandRoom === "pressure"
    ? "/api/neuraxis/twilio/pressure-cooker/command"
    : commandRoom === "anthony"
      ? "/api/neuraxis/twilio/anthony/command"
      : `/api/neuraxis/twilio/command?room=${commandRoom}`;
  const commandUrl = new URL(commandPath, request.url);
  applyWebVoiceState(commandUrl, webVoice);
  const opener = isLoop
    ? "I'm listening."
    : commandRoom === "private"
      ? status.ok
        ? "Mason's private Hive is online. What are we working on?"
        : "Mason's private lane is online, but the Hive connection is unavailable. What do you need?"
      : commandRoom === "pressure"
        ? status.ok
          ? "NULLWORKS Pressure Cooker Workroom online. The KairoNull triple blind baseline, architecture findings, remediation plan, and repair diagnostics context are loaded. What would you like to examine?"
          : "The Pressure Cooker Workroom is open, but the Hive context is unavailable. Please try again shortly."
        : commandRoom === "anthony"
          ? status.ok
            ? "Anthony's Black Flag Fishing workroom is online. Kayak fishing, tackle, rigging, fabrication, CAD, and 3D printing context are loaded. What are we working on?"
            : "Anthony's private fishing workroom is open, but the Hive context is unavailable. Please try again shortly."
          : status.ok
            ? "Shared NEURAXIS workroom online. What are we working on?"
            : "The workroom is online, but the Hive connection is unavailable. What do you need?";
  const spokenOpener = webVoice.warning ? `${webVoice.warning} ${opener}` : opener;
  const loopUrl = new URL("/api/neuraxis/twilio/voice", request.url);
  loopUrl.searchParams.set("loop", "1");
  loopUrl.searchParams.set("room", commandRoom);
  applyWebVoiceState(loopUrl, webVoice);

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech dtmf" timeout="8" speechTimeout="3" actionOnEmptyResult="true" method="POST" action="${xmlEscape(commandUrl.toString())}">
    ${speak(spokenOpener, request.url)}
  </Gather>
  ${speak("I did not catch that. Try one short sentence.", request.url)}
  <Redirect method="POST">${xmlEscape(loopUrl.toString())}</Redirect>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
