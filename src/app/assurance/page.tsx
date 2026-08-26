import { redirect } from "next/navigation";

export default function LegacyAssuranceRedirectPage() {
  redirect("/triage");
}
