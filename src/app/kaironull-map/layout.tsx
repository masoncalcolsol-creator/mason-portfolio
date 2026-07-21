import type { ReactNode } from "react";
import ThemeTuner from "./ThemeTuner";

export default function KairoNullMapLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ThemeTuner />
    </>
  );
}
