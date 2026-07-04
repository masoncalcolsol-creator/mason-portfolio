import type { ReactNode } from "react";
import OutcomeFirstInset from "./OutcomeFirstInset";
import "./mobile-fix.css";

export default function OperationalRelativityLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <OutcomeFirstInset />
    </>
  );
}
