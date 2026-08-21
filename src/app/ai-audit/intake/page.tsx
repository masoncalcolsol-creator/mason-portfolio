import { redirect } from "next/navigation";

export default function AiAuditIntakePage() {
  redirect("/api/triage-proxy");
}
