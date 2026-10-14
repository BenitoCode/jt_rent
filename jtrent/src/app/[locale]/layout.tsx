import { notFound } from "next/navigation";
import { isLocale, getMessages } from "@/lib/i18n";
import "../globals.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body id="top">
        <a className="skip-link" href="#main">
          {getMessages(locale).nav.skip}
        </a>
        {children}
      </body>
    </html>
  );
}
