import type { MetadataRoute } from "next";

const base = "https://nullworks.systems";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/architecture",
    "/products",
    "/proof",
    "/research",
    "/company",
    "/japan",
    "/nullworks",
    "/ai-audit",
    "/triage",
    "/assurance",
    "/pricing",
    "/continuity-calculus",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
