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

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

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

function twiml(body: string): Response {
  return new Response(body, { status: 200, headers: { "content-type": "text/xml; charset=utf-8", "cache-control": "no-store" } });
}

function say(text: string): string {
  return `<Say voice="Polly.Matthew" language="en-US">${xmlEscape(text)}</Say>`;
}

async function handle(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const room = url.searchParams.get("room") || "";
  const isLoop = url.searchParams.get("loop") === "1";

  if (!room && !isLoop) {
    const menuUrl = new URL("/api/neuraxis/twilio/menu", request.url).toString();
    return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="dtmf" numDigits="1" timeout="10" method="POST" action="${xmlEscape(menuUrl)}">
    ${say("NULLWORKS NEURAXIS private beta gateway. Press 1 for the shared workroom. Press 5 for the AI Operating Model Audit room. Press 9 for Mason's private Hive.")}
  </Gather>
  ${say("No selection received. Goodbye.")}
  <Hangup/>
</Response>`);
  }

  const status = await readHiveStatus();
  const commandRoom = room === "private" ? "private" : "workroom";
  const commandUrl = new URL(`/api/neuraxis/twilio/command?room=${commandRoom}`, request.url).toString();
  const statusLine = status.ok
    ? `Hive Brain connected. Boot version ${status.bootVersion || "unknown"}. Company floor ${status.floorVersion || "unknown"}. ${status.company || "NULLWORKS"} is loaded.`
    : `Neuraxis phone bridge is online, but Hive Brain is not live connected yet. Mode ${status.mode}. ${status.error || ""}`;
  const opener = isLoop
    ? "I'm listening."
    : room === "private"
      ? `Mason private lane online. ${statusLine} What are we working on?`
      : `Shared NEURAXIS workroom online. ${statusLine} Speak naturally. What do you need?`;

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech dtmf" timeout="8" speechTimeout="auto" method="POST" action="${xmlEscape(commandUrl)}">
    ${say(opener)}
  </Gather>
  ${say("I did not catch that. Try again in one sentence.")}
  <Redirect method="POST">${xmlEscape(new URL(`/api/neuraxis/twilio/voice?loop=1&room=${commandRoom}`, request.url).toString())}</Redirect>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
