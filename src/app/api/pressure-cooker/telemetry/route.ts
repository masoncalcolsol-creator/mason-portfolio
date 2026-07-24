import { randomUUID } from "crypto";
import { NextRequest } from "next/server";

const allowedEvents = new Set([
  "page_view",
  "section_view",
  "read_30_seconds",
  "cta_click",
  "page_exit",
]);

function clean(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return Response.json({ error: "Origin check failed." }, { status: 403 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const event = clean(raw.event, 40);
  const route = clean(raw.route, 100);
  const sessionId = clean(raw.sessionId, 100);
  const receiptVersion = clean(raw.receiptVersion, 60);
  const occurredAt = clean(raw.occurredAt, 60);
  const detail = raw.detail && typeof raw.detail === "object"
    ? JSON.parse(JSON.stringify(raw.detail).slice(0, 1600))
    : {};

  if (!allowedEvents.has(event) || route !== "/kaironull-assurance" || !sessionId) {
    return Response.json({ error: "Telemetry event rejected." }, { status: 400 });
  }

  const receiptId = `PC-TM-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const record = {
    receiptId,
    receiptVersion: receiptVersion || "KA-RUN-20260724.1",
    receivedAt: new Date().toISOString(),
    occurredAt,
    event,
    route,
    sessionId,
    detail,
    privacyBoundary: "NO_FORM_NO_COOKIE_NO_CROSS_SITE_PROFILE",
  };

  console.info("Pressure Cooker telemetry receipt", record);

  return Response.json(
    {
      receiptId,
      receivedAt: record.receivedAt,
      accepted: true,
      storage: "vercel_runtime_log",
    },
    { status: 201 },
  );
}
