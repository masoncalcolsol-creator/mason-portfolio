"use client";

import { ReactNode, useEffect } from "react";

export default function IntakeLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");
      if (!button) return;

      const label = (button.textContent || "").trim().toUpperCase();
      const advancesSection = label.startsWith("NEXT") || label.startsWith("GENERATE RECEIPT");
      if (!advancesSection || button.disabled) return;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        });
      });
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return <>{children}</>;
}
