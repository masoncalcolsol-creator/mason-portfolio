import { randomUUID } from "crypto";
import { NextRequest } from "next/server";

type SubscriptionRecord = {
  receiptId: string;
  createdAt: string;
  state: string;
  name: string;
  email: string;
  role: string;
  expertise: string;
  consent: boolean;
};

function clean(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function buildEmail(record: SubscriptionRecord) {
  return [
    `PRESSURE WAVE REQUEST: ${record.receiptId}`,
    `Created: ${record.createdAt}`,
    `State: ${record.state}`,
    "",
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Role / organization: ${record.role || "Not supplied"}`,
    `Expertise: ${record.expertise}`,
    "",
    "This records a subscription request for the Pressure Cooker MVP. It does not claim automatic audience enrollment or broadcast delivery until the mailing audience is connected and verified.",
  ].join("\n");
}

async function deliverEmail(record: SubscriptionRecord) {
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
        subject: `Pressure Wave request ${record.receiptId}`,
        text: buildEmail(record),
        tags: [
          { name: "system", value: "pressure_cooker" },
          { name: "record_type", value: "pressure_wave_request" },
          { name: "receipt", value: record.receiptId },
        ],
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Pressure Wave request delivery failed", {
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
    console.error("Pressure Wave request delivery threw", {
      error,
      receiptId: record.receiptId,
    });
    return { delivered: false, reason: "Email provider request failed." };
  }
}

async function deliverWebhook(record: SubscriptionRecord) {
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
      body: JSON.stringify({ type: "subscription_request", ...record }),
      cache: "no-store",
    });
    return response.ok;
  } catch (error) {
    console.error("Pressure Wave webhook delivery failed", {
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
    expertise: clean(raw.expertise, 120),
    consent: Boolean(raw.consent),
  };

  if (!payload.name || !payload.email || !payload.expertise || !payload.consent) {
    return Response.json(
      { error: "Name, email, expertise, and consent are required." },
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
    `PC-WAVE-${createdAt.slice(0, 10).replaceAll("-", "")}-` +
    randomUUID().slice(0, 8).toUpperCase();

  const record: SubscriptionRecord = {
    receiptId,
    createdAt,
    state: "REQUESTED_PENDING_ACTIVATION",
    ...payload,
  };

  const emailResult = await deliverEmail(record);
  if (!emailResult.delivered) {
    return Response.json(
      {
        error:
          "Private delivery is temporarily unavailable. Your request was not finalized; please try again.",
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
      delivery: webhookStored
        ? "private_email_and_webhook"
        : "private_email",
      providerId: emailResult.providerId,
      message:
        "Your Pressure Wave request has been recorded. During the MVP, access may require manual activation.",
    },
    { status: 201 },
  );
}
