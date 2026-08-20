import { NextRequest, NextResponse } from "next/server";

const FILE_ID = "1e6bYQtcImodCSFp0Xq-uGw35sdPyadOF";
const VIEW_URL = `https://drive.google.com/file/d/${FILE_ID}/view`;
const DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const download = request.nextUrl.searchParams.get("download") === "1";
  return NextResponse.redirect(download ? DOWNLOAD_URL : VIEW_URL, 307);
}
