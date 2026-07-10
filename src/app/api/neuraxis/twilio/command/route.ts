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
  if (!response.ok) throw new Error(`GitHub read failed for ${path}: ${response.status}`);
  const data = await response.json() as { content?: string };
  if (!data.content) throw new Error(`GitHub file missing content: ${path}`);
  return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8");
}

async function readHiveStatus(): Promise<HiveStatus> {
  if (!HIVE_TOKEN) {
    return { ok: false, mode: "HIVE_TOKEN_MISSING", error: "Hosting environment is missing HIVE_GITHUB_TOKEN." };
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
    return { ok: false, mode: "HIVE_READ_FAILED", error: error instanceof Error ? error.message : "Unknown Hive read failure" };
  }
}

function say(text: string): string {
  return `<Say language="en-US">${xmlEscape(text)}</Say>`;
}

function twiml(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/xml; charset=utf-8", "cache-control": "no-store" },
  });
}

async function readCommand(request: Request): Promise<string> {
  const body = await request.text();
  const params = new URLSearchParams(body);
  return `${params.get("SpeechResult") || ""} ${params.get("Digits") || ""}`.trim().toLowerCase();
}

async function handle(request: Request): Promise<Response> {
  const command = request.method === "POST" ? await readCommand(request) : "status";
  const status = await readHiveStatus();
  const voiceUrl = new URL("/api/neuraxis/twilio/voice", request.url).toString();

  let spoken: string;

  if (!status.ok) {
    spoken = `Neuraxis received your command, but Hive Brain is not live connected. Mode ${status.mode}. ${status.error || ""}`;
  } else if (command.includes("full spectrum") || command.includes("clone")) {
    spoken = `Full Spectrum Clone route confirmed. Hive boot version ${status.bootVersion || "unknown"}. Company floor ${status.floorVersion || "unknown"}. Human Authority remains Mason Perry. Use current Hive files first, then project receipts. Do not overclaim.`;
  } else if (command.includes("log") || command.includes("receipt")) {
    spoken = `Hive logging by phone is not enabled yet. Use the Gmail drop box phrase: hashtag Neuraxis log into Hive. Then ask ChatGPT to retrieve the email and write the Hive receipt.`;
  } else {
    spoken = `Hive status. ${status.company || "NULLWORKS"}. Category: ${status.category || "Operational Intelligence systems architecture"}. Floor version ${status.floorVersion || "unknown"}. Readiness ${status.readiness || status.floorStatus || "unknown"}. Exact next action is preserved in the Hive.`;
  }

  const response = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  ${say(spoken)}
  <Pause length="1"/>
  <Redirect method="POST">${xmlEscape(voiceUrl)}</Redirect>
</Response>`;

  return twiml(response);
}

export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}
