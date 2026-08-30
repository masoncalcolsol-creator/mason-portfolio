"use client";

import { useEffect } from "react";

const NULLWORKS_EMAIL = "nullworks.neuraxis@gmail.com";
const CANONICAL_ORIGIN = "https://nullworks.systems";
const CIRIS_GITHUB = "https://github.com/masoncalcolsol-creator/mason-portfolio/blob/main/public-proof/CIRIS_ASSURANCE_PUBLIC_PROOF.md";

function canonicalizePublicHref(href: string): string {
  try {
    const url = new URL(href, CANONICAL_ORIGIN);
    const host = url.hostname.toLowerCase();
    if (
      host.endsWith(".vercel.app") ||
      host.includes("mason-portfolio") ||
      host === "www.nullworks.systems"
    ) {
      return `${CANONICAL_ORIGIN}${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return href;
  }
  return href;
}

function normalizeLinks() {
  document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
    const href = anchor.getAttribute("href") || "";
    if (href.startsWith("mailto:masoncalcolsol@gmail.com")) {
      anchor.setAttribute("href", href.replace("masoncalcolsol@gmail.com", NULLWORKS_EMAIL));
    }
    if (href === CIRIS_GITHUB) {
      anchor.setAttribute("href", "/ciris-proof");
      anchor.removeAttribute("target");
      anchor.removeAttribute("rel");
    }
    const canonical = canonicalizePublicHref(href);
    if (canonical !== href) {
      anchor.setAttribute("href", canonical);
    }
    const label = (anchor.textContent || "").trim().toUpperCase();
    if (label.startsWith("NULLWORKS") && !href.startsWith("mailto:")) {
      anchor.setAttribute("href", "/");
    }
  });
}

export default function PublicLinkNormalizer() {
  useEffect(() => {
    normalizeLinks();
    const observer = new MutationObserver(normalizeLinks);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}
