import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return ["es", "en"].map((locale) => ({
    url: `${site.url}/${locale}/`,
    alternates: { languages: { es: `${site.url}/es/`, en: `${site.url}/en/` } },
  }));
}
