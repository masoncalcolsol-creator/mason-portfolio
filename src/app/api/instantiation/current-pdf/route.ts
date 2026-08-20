import { NextRequest, NextResponse } from "next/server";

const FILE_ID = "19FDvNxeDN25-_qRhaRLLyZQsZ7awE10o";
const VIEW_URL = `https://drive.google.com/file/d/${FILE_ID}/view?usp=sharing`;
const DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${FILE_ID}&confirm=t`;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET(request: NextRequest) {
  const download = request.nextUrl.searchParams.get("download") === "1";
  const response = NextResponse.redirect(download ? DOWNLOAD_URL : VIEW_URL, 307);
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  return response;
}
