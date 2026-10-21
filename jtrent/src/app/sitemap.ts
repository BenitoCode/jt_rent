import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { legalDocumentSlugs } from "@/data/legal";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  const pages: MetadataRoute.Sitemap = [];
  for (const locale of ["es", "en"] as const) {
    pages.push({
      url: `${site.url}/${locale}/`,
      alternates: { languages: { es: `${site.url}/es/`, en: `${site.url}/en/` } },
    });
    for (const key of ["notice", "privacy", "cookies"] as const) {
      pages.push({
        url: `${site.url}/${locale}/${legalDocumentSlugs[locale][key]}/`,
        alternates: {
          languages: {
            es: `${site.url}/es/${legalDocumentSlugs.es[key]}/`,
            en: `${site.url}/en/${legalDocumentSlugs.en[key]}/`,
          },
        },
      });
    }
  }
  return pages;
}
