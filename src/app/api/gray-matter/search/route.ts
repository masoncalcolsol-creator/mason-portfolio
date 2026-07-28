import { NextResponse } from "next/server";

import { searchGrayMatter } from "@/lib/gray-matter";
import { validateGrayMatterWebRequest } from "@/lib/gray-matter-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!validateGrayMatterWebRequest(request)) {
    return NextResponse.json({ error: "Access denied.", code: "GRAY_MATTER_ACCESS_DENIED" }, { status: 403 });
  }
  const url = new URL(request.url);
  const query = String(url.searchParams.get("q") || "").trim();
  if (!query) return NextResponse.json({ results: [] });
  try {
    const results = await searchGrayMatter(query, 8);
    return NextResponse.json({ query, results });
  } catch (error) {
    console.error("Gray Matter search failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gray Matter search failed.", code: "SEARCH_FAILED" },
      { status: 500 },
    );
  }
}
