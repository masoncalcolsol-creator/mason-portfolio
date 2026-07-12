import { speak, twiml, xmlEscape } from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

async function handle(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const room = url.searchParams.get("room") || "";
  const isLoop = url.searchParams.get("loop") === "1";

  if (!room && !isLoop) {
    const menuUrl = new URL("/api/neuraxis/twilio/menu", request.url).toString();
    const retryUrl = new URL("/api/neuraxis/twilio/voice", request.url).toString();
    const prompt = "NEURAXIS is online. We are Organizational Intelligence, and we are ready to help. Press or say 1 for the shared workroom. Press or say 5 for the operating model audit. Press or say 9 for Mason's private Hive.";
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
  const commandRoom = room === "private" ? "private" : "workroom";
  const commandUrl = new URL(`/api/neuraxis/twilio/command?room=${commandRoom}`, request.url).toString();
  const opener = isLoop
    ? "I'm listening."
    : commandRoom === "private"
      ? status.ok
        ? "Mason's private Hive is online. What are we working on?"
        : "Mason's private lane is online, but the Hive connection is unavailable. What do you need?"
      : status.ok
        ? "Shared NEURAXIS workroom online. What are we working on?"
        : "The workroom is online, but the Hive connection is unavailable. What do you need?";

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech dtmf" timeout="8" speechTimeout="3" actionOnEmptyResult="true" method="POST" action="${xmlEscape(commandUrl)}">
    ${speak(opener, request.url)}
  </Gather>
  ${speak("I did not catch that. Try one short sentence.", request.url)}
  <Redirect method="POST">${xmlEscape(new URL(`/api/neuraxis/twilio/voice?loop=1&room=${commandRoom}`, request.url).toString())}</Redirect>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
