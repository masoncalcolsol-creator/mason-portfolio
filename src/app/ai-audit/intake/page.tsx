import { redirect } from "next/navigation";

const CANONICAL_TRIAGE = "https://nullworks-triage.nullworks-6346.chatgpt.site/";

export default function AiAuditIntakePage() {
  redirect(CANONICAL_TRIAGE);
}
