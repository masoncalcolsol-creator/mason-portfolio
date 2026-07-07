"use client";

import { useEffect } from "react";

const correctedCaption =
  "Before and after field evidence from the 48-chute corrective action: a transition edge protruded into parcel flow; after grinding, the edge sits flush with the chute surface.";

const correctedAlt =
  "Before and after field photographs showing a chute transition edge protruding into parcel flow and the same edge ground flush";

export default function ChuteEvidenceCorrection() {
  useEffect(() => {
    const images = document.querySelectorAll<HTMLImageElement>(
      'img[src*="chute-edge-before-after"]',
    );

    images.forEach((image) => {
      image.alt = correctedAlt;
      image.style.width = "100%";
      image.style.height = "auto";
      image.style.aspectRatio = "auto";
      image.style.objectFit = "contain";
      image.style.background = "#ffffff";

      const figure = image.closest("figure");
      const caption = figure?.querySelector("figcaption");
      if (caption) caption.textContent = correctedCaption;
    });
  }, []);

  return null;
}
