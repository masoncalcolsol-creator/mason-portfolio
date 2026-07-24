import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

const ACCESS_COOKIE = "nw_authority_report_access";
const ACCESS_SHA256 = "a1def04cfe429762159e14b010a0cd49732063ffbec4016e75b88fba83ae460c";

function hasValidAccess(value: string) {
  return createHash("sha256").update(value).digest("hex") === ACCESS_SHA256;
}

export const dynamic = "force-dynamic";

export default async function HumanAuthorityDiagnosticLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_COOKIE)?.value;

  if (!token || !hasValidAccess(token)) {
    notFound();
  }

  return children;
}
