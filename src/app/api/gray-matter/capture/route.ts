import { NextResponse } from "next/server";

import { captureGrayMatter } from "@/lib/gray-matter";
import { validateGrayMatterWebRequest } from "@/lib/gray-matter-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  return NextResponse.json({
    configured: Boolean(process.env.GRAY_MATTER_ACCESS_TOKEN),
    gmailConfigured: Boolean(
      (process.env.GRAY_MATTER_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID)
      && (process.env.GRAY_MATTER_GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET)
      && (process.env.GRAY_MATTER_GOOGLE_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN),
    ),
    audioRetained: false,
    timezone: "America/Phoenix",
  });
}

export async function POST(request: Request) {
  if (!validateGrayMatterWebRequest(request)) {
    return NextResponse.json({ error: "Access denied.", code: "GRAY_MATTER_ACCESS_DENIED" }, { status: 403 });
  }
  try {
    const body = await request.json() as { transcript?: string };
    const transcript = String(body.transcript || "").trim();
    if (!transcript) {
      return NextResponse.json({ error: "Transcript is required.", code: "TRANSCRIPT_REQUIRED" }, { status: 400 });
    }
    if (transcript.length > 18_000) {
      return NextResponse.json({ error: "Transcript is too long for one entry.", code: "TRANSCRIPT_TOO_LONG" }, { status: 413 });
    }
    const result = await captureGrayMatter({ transcript, source: "WEB" });
    return NextResponse.json(result, { status: result.ok ? 201 : 207 });
  } catch (error) {
    console.error("Gray Matter capture failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gray Matter capture failed.", code: "CAPTURE_FAILED" },
      { status: 500 },
    );
  }
}
