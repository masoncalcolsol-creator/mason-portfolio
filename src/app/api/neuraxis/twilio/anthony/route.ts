import crypto from "node:crypto";

import {
  readTwilioForm,
  say,
  speak,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HIVE_REPO = process.env.HIVE_REPO || "masoncalcolsol-creator/nullworks-corporate-wifi-hive";
const HIVE_BRANCH = process.env.HIVE_BRANCH || "main";
const HIVE_TOKEN = process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
const CONFIG_PATH = "hive/current/anthony_black_flag_fishing_phone_workroom.yaml";

function pickYamlValue(content: string, key: string): string | undefined {
  const match = content.match(new RegExp(`^\\s*${key}:\\s*["']?([^\\n"']+)`, "m"));
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
      "User-Agent": "NULLWORKS-Anthony-Fishing-Phone-Gate",
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`GitHub read failed for ${path}: ${response.status}`);
  const data = await response.json() as { content?: string };
  if (!data.content) throw new Error(`GitHub file missing content: ${path}`);
  return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8");
}

function digest(value: string): Buffer {
  return crypto.createHash("sha256").update(value, "utf8").digest();
}

function safeEqualHex(value: string, expectedHex: string): boolean {
  if (!/^[a-f0-9]{64}$/i.test(expectedHex)) return false;
  const actual = digest(value);
  const expected = Buffer.from(expectedHex, "hex");
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

function pinPrompt(request: Request, attempt: number, prefix = ""): Response {
  const origin = new URL(request.url).origin;
  const action = `${origin}/api/neuraxis/twilio/anthony?phase=verify&attempt=${attempt}`;
  const message = `${prefix} Enter the four digit passcode for private workroom two, then press pound.`.trim();
  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="dtmf" numDigits="4" finishOnKey="#" timeout="8" actionOnEmptyResult="true" method="POST" action="${xmlEscape(action)}">
    ${speak(message, request.url)}
  </Gather>
  ${speak("No passcode received.", request.url)}
  <Hangup/>
</Response>`);
}

async function handle(request: Request): Promise<Response> {
  const params = request.method === "POST" ? await readTwilioForm(request) : {};
  if (request.method === "POST" && !validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }

  const url = new URL(request.url);
  const phase = url.searchParams.get("phase") || "prompt";
  const attempt = Math.max(1, Number(url.searchParams.get("attempt") || "1"));

  if (phase !== "verify") {
    return pinPrompt(request, 1, "Private workroom two.");
  }

  try {
    const config = await fetchHiveFile(CONFIG_PATH);
    const expectedHash = pickYamlValue(config, "pin_sha256") || "";
    const digits = String(params.Digits || "").replace(/\D/g, "").slice(0, 4);

    if (digits.length === 4 && safeEqualHex(digits, expectedHash)) {
      const target = `${url.origin}/api/neuraxis/twilio/voice?room=anthony`;
      return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Passcode accepted. Opening Anthony's Black Flag Fishing workroom.", request.url)}<Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
    }

    if (attempt < 2) {
      return pinPrompt(request, 2, "That passcode was not accepted.");
    }

    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Access denied.", request.url)}<Hangup/></Response>`, 403);
  } catch (error) {
    console.error("Anthony fishing workroom gate failed", error);
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Private workroom two is temporarily unavailable. Please try again shortly.", request.url)}<Hangup/></Response>`, 503);
  }
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
