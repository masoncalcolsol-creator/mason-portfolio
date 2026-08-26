"use client";

import { useEffect } from "react";

const NULLWORKS_EMAIL = "nullworks.neuraxis@gmail.com";
const CIRIS_GITHUB = "https://github.com/masoncalcolsol-creator/mason-portfolio/blob/main/public-proof/CIRIS_ASSURANCE_PUBLIC_PROOF.md";

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
