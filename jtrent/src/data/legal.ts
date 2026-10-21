import type { Locale } from "@/data/motorcycles";

export type LegalDocumentKey = "notice" | "privacy" | "cookies";

export const legalDocumentSlugs: Record<Locale, Record<LegalDocumentKey, string>> = {
  es: {
    notice: "aviso-legal",
    privacy: "privacidad",
    cookies: "cookies",
  },
  en: {
    notice: "legal-notice",
    privacy: "privacy",
    cookies: "cookies",
  },
};

export function legalDocumentKey(locale: Locale, slug: string) {
  return (
    Object.entries(legalDocumentSlugs[locale]).find(([, value]) => value === slug)?.[0] as
      | LegalDocumentKey
      | undefined
  );
}
