import type { Metadata } from "next";
import TriageIntake from "./triage-intake";

export const metadata: Metadata = {
  title: "Start With One Workflow | NULLWORKS",
  description:
    "Prepare a provisional AI Operating Model Audit request around one real workflow.",
};

export default function AiAuditIntakePage() {
  return <TriageIntake />;
}
