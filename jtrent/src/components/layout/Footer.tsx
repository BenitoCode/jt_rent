import { Brand } from "@/components/ui/Brand";
import { CookieSettingsButton } from "@/components/privacy/CookieSettingsButton";
import Link from "next/link";
import { site } from "@/config/site";
import { generalMessage, whatsappUrl } from "@/lib/whatsapp";
import type { Locale } from "@/data/motorcycles";
import type { Messages } from "@/lib/i18n";

export function Footer({
  locale,
  messages: m,
  hasReviews,
}: {
  locale: Locale;
  messages: Messages;
  hasReviews: boolean;
}) {
  const floatingWhatsapp = whatsappUrl(site.whatsapp, generalMessage(locale));

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href={`/${locale}/`} className="brand-link">
              <Brand />
            </Link>
            <p className="footer-tagline">{m.footer.tagline}</p>
            <p className="footer-description">{m.footer.description}</p>
          </div>
          <nav aria-label={locale === "es" ? "Pie de página" : "Footer"}>
            <h2 className="footer-column-title">{m.footer.explore}</h2>
            <a href="#fleet">{m.nav.fleet}</a>
            <a href="#how-to-rent">{m.nav.howToRent}</a>
            <a href="#faq">{m.nav.faq}</a>
            {hasReviews && <a href="#reviews">{m.nav.reviews}</a>}
            <a href="#contact">{m.nav.contact}</a>
          </nav>
          <div className="footer-contact">
            <h2>{m.footer.contactTitle}</h2>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.address}
            </a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="footer-cta">
            <p className="footer-motto">{m.footer.made}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} JT Rent. {m.footer.rights}
          </span>
          <div className="legal-links">
            {Object.entries(site.legal).map(([key, href]) =>
              href ? (
                <a key={key} href={href}>
                  {m.footer[key as keyof typeof site.legal]}
                </a>
            ) : null,
            )}
            <CookieSettingsButton label={m.cookies.settingsButton} />
          </div>
          <div className="language-switch">
            <Link
              href="/es/#contact"
              lang="es"
              aria-current={locale === "es" ? "page" : undefined}
            >
              ES
            </Link>
            <Link
              href="/en/#contact"
              lang="en"
              aria-current={locale === "en" ? "page" : undefined}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
      {floatingWhatsapp && (
        <a
          className="whatsapp-float"
          href={floatingWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={m.contact.cta}
          title={m.contact.cta}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20.52 3.48A11.78 11.78 0 0 0 12.14 0C5.62 0 .3 5.3.3 11.82c0 2.08.55 4.1 1.6 5.88L.2 24l6.47-1.7a11.86 11.86 0 0 0 5.46 1.3h.01c6.52 0 11.84-5.31 11.84-11.83 0-3.16-1.23-6.13-3.46-8.29Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M8.87 6.67c-.24-.54-.5-.55-.73-.56h-.62c-.22 0-.58.08-.88.4-.3.33-1.15 1.12-1.15 2.74s1.18 3.18 1.35 3.4c.16.21 2.27 3.64 5.61 4.96 2.78 1.1 3.35.88 3.95.82.61-.06 1.95-.8 2.23-1.57.27-.77.27-1.43.19-1.57-.08-.14-.3-.22-.63-.38-.33-.17-1.95-.96-2.25-1.07-.3-.11-.52-.16-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.16-1.4-.52-2.67-1.66-.99-.88-1.66-1.96-1.85-2.29-.2-.33-.02-.51.14-.67.14-.14.33-.38.49-.57.16-.2.22-.33.33-.55.11-.22.06-.41-.03-.57-.08-.16-.73-1.78-1.02-2.43Z"
              fill="currentColor"
            />
          </svg>
        </a>
      )}
    </footer>
  );
}
