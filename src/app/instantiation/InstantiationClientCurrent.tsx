"use client";

import { useEffect } from "react";
import InstantiationExperienceFinal from "./InstantiationClientFinal";

const replacements: Array<[string, string]> = [
  ["0.6 / 0.4 / 0.4", "0.7 / 0.4 / 0.4"],
  ["0.6 · 0.4 · 0.4", "0.7 · 0.4 · 0.4"],
  ["Paper 1 v0.6", "Paper 1 v0.7"],
  ["v0.6 · empirical boundary repaired", "v0.7 · empirical boundary repaired"],
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

export default function InstantiationExperienceCurrent() {
  useEffect(() => {
    const root = document.querySelector("main");
    if (!(root instanceof HTMLElement)) return;

    patchText(root);
    const observer = new MutationObserver(() => patchText(root));
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return <InstantiationExperienceFinal />;
}
