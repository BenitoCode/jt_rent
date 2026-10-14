import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";
import { Fleet } from "@/components/fleet/Fleet";
import { Journey } from "@/components/Journey";
import { Reviews } from "@/components/reviews/Reviews";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/layout/Footer";
import { ScrollMoto } from "@/components/ScrollMoto";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale);
  return {
    title: m.seo.title,
    description: m.seo.description,
    ...(site.url
      ? {
          metadataBase: new URL(site.url),
          alternates: {
            canonical: `/${locale}/`,
            languages: { es: "/es/", en: "/en/", "x-default": "/es/" },
          },
        }
      : {}),
    openGraph: {
      title: m.seo.title,
      description: m.seo.description,
      type: "website",
      siteName: site.name,
      locale: locale === "es" ? "es_ES" : "en_GB",
      ...(site.url ? { url: `${site.url}/${locale}/` } : {}),
    },
    twitter: {
      card: "summary",
      title: m.seo.title,
      description: m.seo.description,
    },
  };
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale);
  const hasReviews = m.reviews.samples.length > 0;
  return (
    <>
      <Header locale={locale} messages={m} hasReviews={hasReviews} />
      <main id="main">
        <ScrollMoto />
        <Hero locale={locale} messages={m} />
        <Fleet locale={locale} messages={m} />
        <Journey messages={m} />
        <Reviews messages={m} />
        <Contact locale={locale} messages={m} />
      </main>
      <Footer locale={locale} messages={m} hasReviews={hasReviews} />
      {site.url && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.url,
              ...(site.logo ? { logo: `${site.url}${site.logo}` } : {}),
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}
