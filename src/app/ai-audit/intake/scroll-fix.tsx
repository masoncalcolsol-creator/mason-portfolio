"use client";

import { useEffect } from "react";

export default function TriageScrollFix() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");
      if (!button || button.disabled) return;

      const label = (button.textContent || "").trim().toUpperCase();
      const advances = label.startsWith("NEXT") || label.startsWith("GENERATE RECEIPT");
      if (!advances) return;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });
      });
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
