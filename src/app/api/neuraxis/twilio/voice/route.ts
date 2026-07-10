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
  readiness?: string;
  exactNextAction?: string;
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
  const match = content.match(new RegExp(`^${key}:\\s*[\"']?([^\\n\"']+)`, "m"));
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

  if (!response.ok) {
    throw new Error(`GitHub read failed for ${path}: ${response.status}`);
  }

  const data = await response.json() as { content?: string; encoding?: string };
  if (!data.content) throw new Error(`GitHub file missing content: ${path}`);
  return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8");
}

async function readHiveStatus(): Promise<HiveStatus> {
  if (!HIVE_TOKEN) {
    return {
      ok: false,
      mode: "HIVE_TOKEN_MISSING",
      error: "The Twilio webhook is deployed, but HIVE_GITHUB_TOKEN is not configured in the hosting environment.",
    };
  }

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
      readiness: pickYamlValue(floor, "readiness"),
      exactNextAction: pickYamlValue(floor, "exact_next_action"),
    };
  } catch (error) {
    return {
      ok: false,
      mode: "HIVE_READ_FAILED",
      error: error instanceof Error ? error.message : "Unknown Hive read failure",
    };
  }
}

function twiml(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/xml; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function say(text: string): string {
  return `<Say language="en-US">${xmlEscape(text)}</Say>`;
}

async function handle(request: Request): Promise<Response> {
  const status = await readHiveStatus();
  const commandUrl = new URL("/api/neuraxis/twilio/command", request.url).toString();

  const statusLine = status.ok
    ? `Hive Brain connected. Loaded boot version ${status.bootVersion || "unknown"}, floor ${status.floorVersion || "unknown"}, status ${status.floorStatus || "unknown"}.`
    : `Neuraxis phone bridge is online, but Hive Brain is not live connected yet. Mode: ${status.mode}. ${status.error || ""}`;

  const response = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  ${say("Neuraxis Hive gateway online.")}
  ${say(statusLine)}
  <Gather input="speech dtmf" timeout="6" speechTimeout="auto" method="POST" action="${xmlEscape(commandUrl)}">
    ${say("Say status, full spectrum clone, log to hive, or press 1 for Hive status.")}
  </Gather>
  ${say("No command received. Goodbye.")}
</Response>`;

  return twiml(response);
}

export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}
