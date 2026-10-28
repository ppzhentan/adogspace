import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://adog.space", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://adog.space/agent-engineering-course", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
