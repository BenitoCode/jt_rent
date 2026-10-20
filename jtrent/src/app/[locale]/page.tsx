import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";
import { Fleet } from "@/components/fleet/Fleet";
import { Journey } from "@/components/Journey";
import { About } from "@/components/About";
import { RentalFaq } from "@/components/RentalFaq";
import { Reviews } from "@/components/reviews/Reviews";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/layout/Footer";

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
    metadataBase: new URL(site.url),
    alternates: {
      canonical: `/${locale}/`,
      languages: { es: "/es/", en: "/en/", "x-default": "/es/" },
    },
    robots: { index: true, follow: true },
    icons: { icon: [{ url: "/favicon.png", type: "image/png", sizes: "128x128" }] },
    openGraph: {
      title: m.seo.title,
      description: m.seo.description,
      type: "website",
      siteName: site.name,
      locale: locale === "es" ? "es_ES" : "en_GB",
      url: `${site.url}/${locale}/`,
      images: [
        {
          url: "/images/hero-malaga-port.jpg",
          alt:
            locale === "es"
              ? "Un scooter recorre el puerto de M\u00e1laga"
              : "A scooter rides along Malaga harbour",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.seo.title,
      description: m.seo.description,
      images: ["/images/hero-malaga-port.jpg"],
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
  const showReviews = true;
  return (
    <>
      <Header locale={locale} messages={m} hasReviews={showReviews} />
      <main id="main">
        <Hero locale={locale} messages={m} />
        <Fleet locale={locale} messages={m} />
        <Journey messages={m} />
        <About locale={locale} messages={m} />
        <RentalFaq messages={m} />
        <Reviews locale={locale} messages={m} />
        <Contact locale={locale} messages={m} />
      </main>
      <Footer locale={locale} messages={m} hasReviews={showReviews} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LocalBusiness",
                "@id": `${site.url}/#business`,
                name: site.name,
                url: site.url,
                logo: `${site.url}${site.logo}`,
                image: `${site.url}/images/hero-malaga-port.jpg`,
                description: m.seo.description,
                email: site.email,
                telephone: `+${site.whatsappContacts[0]}`,
                address: {
                  "@type": "PostalAddress",
                  ...site.addressStructured,
                },
                areaServed: { "@type": "City", name: "M\u00e1laga" },
              },
              {
                "@type": "WebSite",
                "@id": `${site.url}/#website`,
                url: site.url,
                name: site.name,
                inLanguage: ["es", "en"],
                publisher: { "@id": `${site.url}/#business` },
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
