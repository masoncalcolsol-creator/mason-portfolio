import { NextResponse } from "next/server";

import { sendGrayMatterDailyDigest } from "@/lib/gray-matter";
import { validateGrayMatterWebRequest } from "@/lib/gray-matter-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function cronAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET || "";
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

async function run(request: Request) {
  if (!cronAuthorized(request) && !validateGrayMatterWebRequest(request)) {
    return NextResponse.json({ error: "Access denied.", code: "GRAY_MATTER_ACCESS_DENIED" }, { status: 403 });
  }
  try {
    const result = await sendGrayMatterDailyDigest();
    return NextResponse.json(result, { status: result.ok ? 200 : 207 });
  } catch (error) {
    console.error("Gray Matter digest failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gray Matter digest failed.", code: "DIGEST_FAILED" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) { return run(request); }
export async function POST(request: Request) { return run(request); }
