import { NextResponse } from "next/server";

import { getGrayMatterBrief } from "@/lib/gray-matter";
import { validateGrayMatterWebRequest } from "@/lib/gray-matter-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!validateGrayMatterWebRequest(request)) {
    return NextResponse.json({ error: "Access denied.", code: "GRAY_MATTER_ACCESS_DENIED" }, { status: 403 });
  }
  try {
    return NextResponse.json(await getGrayMatterBrief());
  } catch (error) {
    console.error("Gray Matter brief failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gray Matter brief failed.", code: "BRIEF_FAILED" },
      { status: 500 },
    );
  }
}
