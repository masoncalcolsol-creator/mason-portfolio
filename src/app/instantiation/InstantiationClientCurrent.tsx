"use client";

import { useEffect } from "react";
import InstantiationExperienceFinal from "./InstantiationClientFinal";

const PDF_VIEW = "https://drive.google.com/file/d/19FDvNxeDN25-_qRhaRLLyZQsZ7awE10o/view?usp=sharing";
const PDF_DOWNLOAD = "https://drive.google.com/uc?export=download&id=19FDvNxeDN25-_qRhaRLLyZQsZ7awE10o&confirm=t";

const replacements: Array<[string, string]> = [
  ["0.6 / 0.4 / 0.4", "0.7 / 0.4 / 0.4"],
  ["0.6 · 0.4 · 0.4", "0.7 · 0.4 · 0.4"],
  ["Paper 1 v0.6", "Paper 1 v0.7"],
  ["v0.6 · empirical boundary repaired", "v0.7 · published field case"],
  ["VERSION 0.6", "VERSION 0.7"],
  ["FINAL RED TEAM · NOINDEX", "PUBLIC RELEASE · LIVE"],
  ["FINAL REVIEW", "PUBLIC RELEASE"],
  ["FINAL RED TEAM", "PUBLIC RELEASE"],
  ["FINAL RED-TEAM", "PUBLIC RELEASE"],
  ["Final red-team", "Public release"],
  ["final red-team", "public release"],
  ["PUBLIC RELEASES0", "PUBLIC RELEASES3"],
  ["61 PAGES", "60 PAGES"],
  ["61-page", "60-page"],
  ["61 pages", "60 pages"],
  ["The three-paper architecture is frozen for final material review. Paper 1 now carries only the MUSE empirical case. Papers 2 and 3 retain the AI influence, governance, assurance, and implementation machinery where those controls are actually instantiated.", "The three-paper Operational Recovery Series is now public. Paper 1 carries the bounded field case, Paper 2 develops the continuity and recovery framework, and Paper 3 instantiates the governed TAC OPS implementation."],
  ["Inspect the final review state", "Inspect the public release"],
  ["Final red-team circulation is prepared. No public manuscript release or independent validation is claimed.", "The three manuscripts are publicly released with preserved lineage, correction receipts, and an open challenge surface. Independent validation is not claimed."],
  ["The final external review confirmed that Paper 1 contained AI influence controls even though the MUSE event had no AI reviewer, confidence score, ranked interface, or decision-support state.", "External review identified a boundary problem in Paper 1: conceptual AI influence controls had leaked into a field narrative that did not instantiate them."],
  ["Paper 1 v0.7 removes that machinery. Paper 2 retains the conceptual governance controls. Paper 3 retains the technical sequencing, influence receipts, reconciliation, and blind-sample design.", "Paper 1 v0.7 preserves the bounded field evidence. Paper 2 retains the conceptual governance controls. Paper 3 retains the technical sequencing, influence receipts, reconciliation, and blind-sample design."],
  ["The final review packet contains Paper 1 v0.7, Paper 2 v0.4, and Paper 3 v0.4. The combined governed bundle is 61 pages.", "The public release contains Paper 1 v0.7, Paper 2 v0.4, and Paper 3 v0.4. The governed series bundle is 60 pages."],
  ["Final review packet prepared", "Public release"],
  ["The governed circulation packet is held privately.", "The governed manuscript is publicly released."],
  ["Combined red-team manuscript v0.8", "Combined review manuscript v0.8"],
  ["FINAL REVIEW DESCENDANT", "PUBLIC DESCENDANT"],
  ["and a governed 61-page final review bundle.", "and a governed 60-page public release bundle."],
  ["Empirical field narrative · MUSE thirty-second recovery case", "Empirical field narrative · runtime recovery case"],
  ["MUSE still-image receipts", "Field-image receipts"],
  ["MUSE obstruction, control-state, and facility-context still images", "Obstruction, control-state, and facility-context still images"],
  ["The MUSE anchor", "The field-case anchor"],
  ["MUSE field narrative", "field narrative"],
  ["MUSE empirical narrative", "empirical field narrative"],
  ["The MUSE case", "The field case"],
  ["MUSE event", "field event"],
  ["MUSE", "field case"],
];

function patchText(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    let value = node.nodeValue ?? "";
    for (const [from, to] of replacements) value = value.replaceAll(from, to);
    if (value !== node.nodeValue) node.nodeValue = value;
    node = walker.nextNode();
  }
}

function addPdfAccess(root: HTMLElement) {
  if (root.querySelector('[data-current-pdf-access="true"]')) return;
  const heading = Array.from(root.querySelectorAll("h1")).find((el) => el.textContent?.includes("INSTANTIATION"));
  if (!heading) return;

  const bar = document.createElement("div");
  bar.dataset.currentPdfAccess = "true";
  bar.style.cssText = "display:flex;flex-wrap:wrap;gap:12px;margin:22px 0 10px;position:relative;z-index:5";

  const view = document.createElement("a");
  view.href = PDF_VIEW;
  view.target = "_blank";
  view.rel = "noreferrer";
  view.textContent = "VIEW 60-PAGE PDF ↗";
  view.style.cssText = "display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:0 22px;background:#6fd4cd;color:#07110f;text-decoration:none;font-weight:800;letter-spacing:.04em;border:1px solid #6fd4cd";

  const download = document.createElement("a");
  download.href = PDF_DOWNLOAD;
  download.textContent = "DOWNLOAD 60-PAGE PDF ↓";
  download.style.cssText = "display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:0 22px;color:#f1f0e8;text-decoration:none;font-weight:800;letter-spacing:.04em;border:1px solid rgba(241,240,232,.45);background:rgba(3,12,11,.72)";

  bar.append(view, download);
  heading.insertAdjacentElement("afterend", bar);
}

export default function InstantiationExperienceCurrent() {
  useEffect(() => {
    const root = document.querySelector("main");
    if (!(root instanceof HTMLElement)) return;
    const apply = () => { patchText(root); addPdfAccess(root); };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return <InstantiationExperienceFinal />;
}
