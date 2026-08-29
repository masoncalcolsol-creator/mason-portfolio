import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/review/",
        "/private/",
        "/workroom/",
        "/api/",
        "/amanda-brief/",
        "/amanda-conveyor/",
        "/chainsaw-photo-ingest-7f4c2d/",
        "/franz-vault/",
        "/lenderflow-room/",
        "/subscription-update/",
      ],
    },
    sitemap: "https://nullworks.systems/sitemap.xml",
    host: "https://nullworks.systems",
  };
}
