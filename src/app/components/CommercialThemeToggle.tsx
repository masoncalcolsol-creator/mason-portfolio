"use client";

import { useEffect, useState } from "react";

type ThemeChoice = "light" | "dark" | "system";

const STORAGE_KEY = "nw-commercial-theme";

function resolveTheme(choice: ThemeChoice): "light" | "dark" {
  if (choice !== "system") return choice;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(choice: ThemeChoice) {
  document.documentElement.dataset.nwTheme = resolveTheme(choice);
  document.documentElement.dataset.nwThemeChoice = choice;
}

export default function CommercialThemeToggle() {
  const [choice, setChoice] = useState<ThemeChoice>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeChoice | null;
    const initial: ThemeChoice = saved && ["light", "dark", "system"].includes(saved) ? saved : "light";
    setChoice(initial);
    applyTheme(initial);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if ((window.localStorage.getItem(STORAGE_KEY) ?? "light") === "system") {
        applyTheme("system");
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function choose(next: ThemeChoice) {
    setChoice(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  return (
    <div className="nw-theme-toggle" role="group" aria-label="Page theme">
      {(["light", "dark", "system"] as ThemeChoice[]).map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={choice === item}
          onClick={() => choose(item)}
        >
          {item === "light" ? "Light" : item === "dark" ? "Dark" : "System"}
        </button>
      ))}
      <style jsx>{`
        .nw-theme-toggle {
          display: inline-flex;
          gap: 4px;
          padding: 4px;
          border: 1px solid var(--nw-border, #d6c7a7);
          border-radius: 999px;
          background: var(--nw-toggle-bg, rgba(255,255,255,.65));
          backdrop-filter: blur(10px);
        }
        button {
          appearance: none;
          border: 0;
          border-radius: 999px;
          padding: 7px 10px;
          background: transparent;
          color: var(--nw-muted, #5f625f);
          font: inherit;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        }
        button[aria-pressed="true"] {
          background: var(--nw-ink, #091b2c);
          color: var(--nw-paper, #fff9eb);
        }
        button:focus-visible {
          outline: 3px solid var(--nw-gold, #b58a3a);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
