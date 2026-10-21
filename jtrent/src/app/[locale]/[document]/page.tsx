import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { legalDocumentKey, legalDocumentSlugs } from "@/data/legal";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import { site } from "@/config/site";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    Object.values(legalDocumentSlugs[locale]).map((document) => ({
      locale,
      document,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; document: string }>;
}): Promise<Metadata> {
  const { locale, document } = await params;
  if (!isLocale(locale)) return {};
  const key = legalDocumentKey(locale, document);
  if (!key) return {};
  const titles = {
    es: { notice: "Aviso legal", privacy: "Política de privacidad", cookies: "Política de cookies" },
    en: { notice: "Legal notice", privacy: "Privacy policy", cookies: "Cookies policy" },
  } as const;
  return {
    title: `${titles[locale][key]} | ${site.name}`,
    alternates: {
      canonical: `/${locale}/${document}/`,
      languages: {
        es: `/es/${legalDocumentSlugs.es[key]}/`,
        en: `/en/${legalDocumentSlugs.en[key]}/`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LegalDocumentRoute({
  params,
}: {
  params: Promise<{ locale: string; document: string }>;
}) {
  const { locale, document } = await params;
  if (!isLocale(locale)) notFound();
  const key = legalDocumentKey(locale, document);
  if (!key) notFound();
  return (
    <LegalDocumentPage
      locale={locale}
      document={key}
      messages={getMessages(locale)}
    />
  );
}
