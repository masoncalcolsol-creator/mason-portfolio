import { gunzipSync } from "node:zlib";
import { NextRequest, NextResponse } from "next/server";
import { subscriptionUpdateGzipBase64 } from "./content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PIN_HASH = "75992a5ac67ff644d3063976c2effd10bdd93fcc109798e3d5c1acf2e530d01a";
const COOKIE_NAME = "nw_amanda_brief_v3";
const COOKIE_VALUE = PIN_HASH.slice(0, 16);

const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
  "Content-Type": "text/html; charset=utf-8",
  "Content-Security-Policy":
    "default-src 'self'; img-src 'self' data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

let cachedPage: string | null = null;

type ContainerRange = {
  start: number;
  end: number;
};

function findMatchingContainerEnd(
  html: string,
  start: number,
  tagName: string,
): number | null {
  const tagPattern = new RegExp(`<\\/?${tagName}\\b[^>]*>`, "gi");
  tagPattern.lastIndex = start;

  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = tagPattern.exec(html))) {
    const closing = match[0].startsWith("</");
    depth += closing ? -1 : 1;
    if (depth === 0) return tagPattern.lastIndex;
  }

  return null;
}

function findSmallestCardContaining(
  html: string,
  targetIndex: number,
): ContainerRange | null {
  const prefix = html.slice(0, targetIndex);
  const cardPattern =
    /<(article|div|li|section)\b[^>]*class=(["'])[^"']*card[^"']*\2[^>]*>/gi;
  const candidates = [...prefix.matchAll(cardPattern)];

  for (let index = candidates.length - 1; index >= 0; index -= 1) {
    const candidate = candidates[index];
    if (candidate.index === undefined) continue;

    const start = candidate.index;
    const end = findMatchingContainerEnd(html, start, candidate[1]);
    if (end !== null && start <= targetIndex && targetIndex < end) {
      return { start, end };
    }
  }

  return null;
}

function removeCompleteCardContaining(html: string, needle: string) {
  const targetIndex = html.toLowerCase().indexOf(needle.toLowerCase());
  if (targetIndex < 0) return html;

  const range = findSmallestCardContaining(html, targetIndex);
  if (!range) return html;

  return `${html.slice(0, range.start)}${html.slice(range.end)}`;
}

function getPageHtml() {
  if (!cachedPage) {
    let page = gunzipSync(
      Buffer.from(subscriptionUpdateGzipBase64, "base64"),
    ).toString("utf8");

    for (const label of [
      "escort pay features",
      "sport pay features",
      "x paid features",
    ]) {
      page = removeCompleteCardContaining(page, label);
    }

    cachedPage = page;
  }
  return cachedPage;
}

export async function GET(request: NextRequest) {
  const unlocked = request.cookies.get(COOKIE_NAME)?.value === COOKIE_VALUE;
  if (!unlocked) {
    return NextResponse.redirect(new URL("/amanda-brief", request.url), 303);
  }

  return new Response(getPageHtml(), {
    status: 200,
    headers: privateHeaders,
  });
}
