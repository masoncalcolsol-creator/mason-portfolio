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
  documentVersion: string;
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
    `INSTANTIATION RED-TEAM RECEIPT: ${record.receiptId}`,
    `Created: ${record.createdAt}`,
    `Document version: ${record.documentVersion}`,
    `Review state: ${record.reviewState}`,
    "",
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Role / organization: ${record.role || "Not supplied"}`,
    `Target: ${record.target}`,
    `Contribution type: ${record.contributionType}`,
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
    "This is the private delivery receipt. It does not publish or directly edit the paper.",
  ].join("\n");
}

async function deliverEmail(record: ChallengeRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { delivered: false, reason: "RESEND_API_KEY is not configured." };
  }

  const reviewEmail =
    process.env.INSTANTIATION_REVIEW_EMAIL || "masoncalcolsol@gmail.com";
  const fromEmail =
    process.env.INSTANTIATION_FROM_EMAIL ||
    "INSTANTIATION <onboarding@resend.dev>";

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
        subject: `INSTANTIATION challenge ${record.receiptId}`,
        text: buildEmail(record),
        tags: [
          { name: "system", value: "instantiation" },
          { name: "document_version", value: "0_8" },
          { name: "receipt", value: record.receiptId },
        ],
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("INSTANTIATION email delivery failed", {
        status: response.status,
        detail,
        receiptId: record.receiptId,
      });
      return { delivered: false, reason: `Email provider returned ${response.status}.` };
    }

    const result = (await response.json()) as { id?: string };
    return { delivered: true, providerId: result.id };
  } catch (error) {
    console.error("INSTANTIATION email delivery threw", {
      error,
      receiptId: record.receiptId,
    });
    return { delivered: false, reason: "Email provider request failed." };
  }
}

async function deliverWebhook(record: ChallengeRecord) {
  const webhook = process.env.INSTANTIATION_INTAKE_WEBHOOK_URL;
  const webhookToken = process.env.INSTANTIATION_INTAKE_WEBHOOK_TOKEN;
  if (!webhook) return false;

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(webhookToken
          ? { Authorization: `Bearer ${webhookToken}` }
          : {}),
      },
      body: JSON.stringify(record),
      cache: "no-store",
    });
    return response.ok;
  } catch (error) {
    console.error("INSTANTIATION webhook delivery failed", {
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
    target: clean(raw.target, 240),
    contributionType: clean(raw.contributionType, 80),
    argument: clean(raw.argument, 8000),
    evidence: clean(raw.evidence, 2000),
    attachmentName: clean(raw.attachmentName, 180),
    attribution: clean(raw.attribution, 80),
    quotePermission: clean(raw.quotePermission, 80),
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
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const createdAt = new Date().toISOString();
  const receiptId =
    `INST-RT-${createdAt.slice(0, 10).replaceAll("-", "")}-` +
    randomUUID().slice(0, 8).toUpperCase();

  const record: ChallengeRecord = {
    receiptId,
    createdAt,
    documentVersion: "0.8",
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
      message: "Your submission has been sent.",
    },
    { status: 201 },
  );
}
