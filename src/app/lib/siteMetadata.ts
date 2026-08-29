import type { Metadata } from "next";

const SITE = "https://nullworks.systems";

type PreviewArgs = {
  title: string;
  description: string;
  path: string;
  kicker?: string;
  accent?: string;
};

export function nullworksMetadata({
  title,
  description,
  path,
  kicker = "NULLWORKS // GOVERNED SYSTEMS",
  accent = "#78e6d2",
}: PreviewArgs): Metadata {
  const params = new URLSearchParams({ title, description, kicker, accent });
  const image = `/api/og?${params.toString()}`;
  const url = `${SITE}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: "NULLWORKS",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${title} — NULLWORKS` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
