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

  const record = {
    receiptId,
    createdAt,
    documentVersion: "0.8",
    reviewState: "SUBMITTED_NOT_PUBLISHED",
    ...payload,
  };

  const webhook = process.env.INSTANTIATION_INTAKE_WEBHOOK_URL;
  const webhookToken = process.env.INSTANTIATION_INTAKE_WEBHOOK_TOKEN;

  if (webhook) {
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

      if (response.ok) {
        return Response.json(
          {
            receiptId,
            createdAt,
            stored: true,
            delivery: "private_webhook",
          },
          { status: 201 },
        );
      }
    } catch {
      // Fall through to the private manual handoff.
    }
  }

  return Response.json(
    {
      receiptId,
      createdAt,
      stored: false,
      delivery: "manual_private_email_required",
      fallbackEmail:
        process.env.INSTANTIATION_REVIEW_EMAIL ||
        "masoncalcolsol@gmail.com",
      record,
    },
    { status: 202 },
  );
}
