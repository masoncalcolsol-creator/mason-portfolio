import { randomUUID } from "crypto";
import { NextRequest } from "next/server";

const requiredFields = [
  "name",
  "email",
  "target",
  "contributionType",
  "argument",
  "attribution",
  "quotePermission",
  "consent",
] as const;

type ChallengeRecord = {
  receiptId: string;
  createdAt: string;
  frameworkVersion: string;
  reviewState: string;
  name: string;
  email: string;
  role: string;
  target: string;
  contributionType: string;
  argument: string;
  evidence: string;
  attachmentName: string;
  attribution: string;
  quotePermission: string;
  conflict: string;
  consent: boolean;
};

function clean(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function buildEmail(record: ChallengeRecord) {
  return [
    `PRESSURE COOKER RECEIPT: ${record.receiptId}`,
    `Created: ${record.createdAt}`,
    `Framework version: ${record.frameworkVersion}`,
    `Review state: ${record.reviewState}`,
    "",
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Role / organization: ${record.role || "Not supplied"}`,
    `Target: ${record.target}`,
    `Pressure type: ${record.contributionType}`,
    `Attribution preference: ${record.attribution}`,
    `Quotation permission: ${record.quotePermission}`,
    `Conflict disclosure: ${record.conflict || "Not supplied"}`,
    `Attachment named by submitter: ${record.attachmentName || "None"}`,
    "",
    "ARGUMENT OR CONTRIBUTION",
    record.argument,
    "",
    "SUPPORTING EVIDENCE",
    record.evidence || "Not supplied",
    "",
    "BOUNDARY",
    "This is a private intake receipt. It does not publish, certify, authorize access, or directly edit the Pressure Cooker framework.",
  ].join("\n");
}

async function deliverEmail(record: ChallengeRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { delivered: false, reason: "RESEND_API_KEY is not configured." };
  }

  const reviewEmail =
    process.env.PRESSURE_COOKER_REVIEW_EMAIL ||
    process.env.INSTANTIATION_REVIEW_EMAIL;
  const fromEmail =
    process.env.PRESSURE_COOKER_FROM_EMAIL ||
    process.env.INSTANTIATION_FROM_EMAIL ||
    "PRESSURE COOKER <onboarding@resend.dev>";

  if (!reviewEmail) {
    return { delivered: false, reason: "Review email is not configured." };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [reviewEmail],
        reply_to: record.email,
        subject: `Pressure Cooker challenge ${record.receiptId}`,
        text: buildEmail(record),
        tags: [
          { name: "system", value: "pressure_cooker" },
          { name: "framework_version", value: "pc_0_1" },
          { name: "receipt", value: record.receiptId },
        ],
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Pressure Cooker email delivery failed", {
        status: response.status,
        detail,
        receiptId: record.receiptId,
      });
      return {
        delivered: false,
        reason: `Email provider returned ${response.status}.`,
      };
    }

    const result = (await response.json()) as { id?: string };
    return { delivered: true, providerId: result.id };
  } catch (error) {
    console.error("Pressure Cooker email delivery threw", {
      error,
      receiptId: record.receiptId,
    });
    return { delivered: false, reason: "Email provider request failed." };
  }
}

async function deliverWebhook(record: ChallengeRecord) {
  const webhook = process.env.PRESSURE_COOKER_INTAKE_WEBHOOK_URL;
  const token = process.env.PRESSURE_COOKER_INTAKE_WEBHOOK_TOKEN;
  if (!webhook) return false;

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ type: "challenge", ...record }),
      cache: "no-store",
    });
    return response.ok;
  } catch (error) {
    console.error("Pressure Cooker webhook delivery failed", {
      error,
      receiptId: record.receiptId,
    });
    return false;
  }
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

  if (clean(raw.website, 80)) {
    return Response.json({ error: "Submission rejected." }, { status: 400 });
  }

  const payload = {
    name: clean(raw.name, 120),
    email: clean(raw.email, 180),
    role: clean(raw.role, 180),
    target: clean(raw.target, 260),
    contributionType: clean(raw.contributionType, 100),
    argument: clean(raw.argument, 8000),
    evidence: clean(raw.evidence, 6000),
    attachmentName: clean(raw.attachmentName, 180),
    attribution: clean(raw.attribution, 100),
    quotePermission: clean(raw.quotePermission, 100),
    conflict: clean(raw.conflict, 800),
    consent: Boolean(raw.consent),
  };

  const missing = requiredFields.filter((field) => !payload[field]);
  if (missing.length) {
    return Response.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
    return Response.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const createdAt = new Date().toISOString();
  const receiptId =
    `PC-RT-${createdAt.slice(0, 10).replaceAll("-", "")}-` +
    randomUUID().slice(0, 8).toUpperCase();

  const record: ChallengeRecord = {
    receiptId,
    createdAt,
    frameworkVersion: "PC-0.1",
    reviewState: "SUBMITTED_NOT_PUBLISHED",
    ...payload,
  };

  const emailResult = await deliverEmail(record);
  if (!emailResult.delivered) {
    return Response.json(
      {
        error:
          "Private delivery is temporarily unavailable. Your receipt was not finalized; please try again.",
        receiptId,
      },
      { status: process.env.RESEND_API_KEY ? 502 : 503 },
    );
  }

  const webhookStored = await deliverWebhook(record);

  return Response.json(
    {
      receiptId,
      createdAt,
      stored: true,
      delivery: webhookStored
        ? "private_email_and_webhook"
        : "private_email",
      providerId: emailResult.providerId,
      message:
        "Your pressure receipt has been delivered for private review. It has not been published or accepted automatically.",
    },
    { status: 201 },
  );
}
