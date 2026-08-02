import crypto from "node:crypto";

import {
  auditReference,
  normalizePhone,
  sendTwilioSms,
  writeHiveReceipt,
} from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

type DispatchRequest = {
  to?: string;
  body?: string;
  source?: string;
  consent?: boolean;
};

function json(payload: unknown, status = 200): Response {
  return Response.json(payload, {
    status,
    headers: {
      "cache-control": "no-store",
    },
  });
}

function authorized(request: Request): boolean {
  const configured = process.env.NULLWORKS_SMS_DISPATCH_SECRET || "";
  const supplied = request.headers.get("x-nullworks-sms-secret") || "";
  if (!configured || !supplied) return false;
  const left = Buffer.from(configured, "utf8");
  const right = Buffer.from(supplied, "utf8");
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function approvedRecipients(): Set<string> {
  return new Set(
    String(process.env.NULLWORKS_SMS_ALLOWLIST || "")
      .split(",")
      .map((value) => normalizePhone(value))
      .filter(Boolean),
  );
}

export async function POST(request: Request) {
  if (!process.env.NULLWORKS_SMS_DISPATCH_SECRET) {
    return json({ ok: false, error: "SMS dispatch is not configured" }, 503);
  }
  if (!authorized(request)) {
    return json({ ok: false, error: "Access denied" }, 403);
  }

  let input: DispatchRequest;
  try {
    input = await request.json() as DispatchRequest;
  } catch {
    return json({ ok: false, error: "Request body must be valid JSON" }, 400);
  }

  const to = normalizePhone(input.to || "");
  const body = String(input.body || "").trim();
  const source = String(input.source || "manual").trim().slice(0, 80) || "manual";
  const allowlist = approvedRecipients();

  if (!to) return json({ ok: false, error: "A valid recipient number is required" }, 400);
  if (!body) return json({ ok: false, error: "Message body is required" }, 400);
  if (body.length > 480) return json({ ok: false, error: "Message body exceeds the 480-character MVP limit" }, 400);
  if (input.consent !== true) return json({ ok: false, error: "Explicit recipient consent must be asserted" }, 400);
  if (allowlist.size === 0) return json({ ok: false, error: "Recipient allowlist is empty" }, 503);
  if (!allowlist.has(to)) return json({ ok: false, error: "Recipient is not approved" }, 403);

  const reference = auditReference(`SMS-${source}`);
  const statusCallback = new URL(
    `/api/neuraxis/twilio/message-status?ref=${encodeURIComponent(reference)}`,
    request.url,
  ).toString();

  const sms = await sendTwilioSms({ to, body, statusCallback });
  const receipt = await writeHiveReceipt({
    reference,
    category: "governed_sms_dispatch",
    payload: {
      event_type: "GOVERNED_SMS_DISPATCH",
      truth_state: "OBSERVED",
      reference,
      source,
      recipient: to,
      consent_asserted: true,
      allowlist_match: true,
      message_length: body.length,
      message_sha256: crypto.createHash("sha256").update(body, "utf8").digest("hex"),
      message_preview: body.slice(0, 120),
      twilio: sms,
      recorded_at: new Date().toISOString(),
      authority: "Mason Perry / NULLWORKS Human Authority",
    },
  }).catch((error) => ({
    ok: false,
    error: error instanceof Error ? error.message : "Hive receipt write failed",
  }));

  if (!sms.ok) {
    return json({ ok: false, reference, sms, receipt }, 502);
  }

  return json({
    ok: true,
    reference,
    messageSid: sms.sid,
    messageStatus: sms.status || "queued",
    receipt,
  });
}
