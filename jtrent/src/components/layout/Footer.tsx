import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LanguageFlag } from "@/components/ui/LanguageFlag";
import { CookieSettingsButton } from "@/components/privacy/CookieSettingsButton";
import { site } from "@/config/site";
import { legalDocumentSlugs } from "@/data/legal";
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
  const legalItems = [
    { label: m.footer.notice, href: `/${locale}/${legalDocumentSlugs[locale].notice}/` },
    { label: m.footer.privacy, href: `/${locale}/${legalDocumentSlugs[locale].privacy}/` },
    { label: m.footer.cookiePolicy, href: `/${locale}/${legalDocumentSlugs[locale].cookies}/` },
  ];

  return (
    <footer className="footer">
      <div className="footer-promo">
        <div className="container footer-promo-inner">
          <div>
            <h2>{m.footer.promoTitle}</h2>
            <p>{m.footer.promoDescription}</p>
          </div>
        </div>
      </div>

      <div className="footer-dark">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <Link href={`/${locale}/`} className="brand-link" aria-label="JT Rent">
                <span className="footer-logo-window">
                  <Image
                    src="/images/logo-jt-footer.png"
                    alt=""
                    width={500}
                    height={500}
                    className="footer-logo-image"
                  />
                </span>
              </Link>
              <span className="footer-wordmark" aria-hidden="true">
                <span>JT</span> RENT
              </span>
              <p className="footer-description">{m.footer.description}</p>
            </div>

            <nav className="footer-explore" aria-label={m.footer.explore}>
              <h2 className="footer-column-title">{m.footer.explore}</h2>
              <a href={`/${locale}/#fleet`}>{m.nav.fleet}</a>
              <a href={`/${locale}/#how-to-rent`}>{m.nav.howToRent}</a>
              <a href={`/${locale}/#about`}>{m.footer.about}</a>
              <a href={`/${locale}/#faq`}>{m.nav.faq}</a>
              {hasReviews && <a href={`/${locale}/#reviews`}>{m.nav.reviews}</a>}
            </nav>

            <div className="footer-contact">
              <h2 className="footer-column-title">{m.footer.contactTitle}</h2>
              <a
                href={whatsappUrl(site.whatsapp, generalMessage(locale)) ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" />
                <span>{m.footer.contactWhatsApp}</span>
              </a>
              <a href={`mailto:${site.email}`}>
                <Mail aria-hidden="true" />
                <span>{site.email}</span>
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin aria-hidden="true" />
                <span>{m.footer.contactPickup}</span>
              </a>
            </div>

            <div className="footer-social">
              <h2 className="footer-column-title">{m.footer.socialTitle}</h2>
              <div className="footer-social-buttons" role="group" aria-label={m.footer.socialTitle}>
                <button className="footer-social-button footer-social-facebook" type="button" disabled aria-label="Facebook" title={m.contact.socialComingSoon}>
                  <Facebook aria-hidden="true" />
                </button>
                <button className="footer-social-button footer-social-linkedin" type="button" disabled aria-label="LinkedIn" title={m.contact.socialComingSoon}>
                  <Linkedin aria-hidden="true" />
                </button>
                <button className="footer-social-button footer-social-instagram" type="button" disabled aria-label="Instagram" title={m.contact.socialComingSoon}>
                  <Instagram aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copyright">
              © {new Date().getFullYear()} JT Rent
            </span>
            <div className="footer-legal" aria-label={m.footer.legalLinks}>
              {legalItems.map(({ label, href }) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
              <CookieSettingsButton label={m.footer.cookies} />
            </div>
            <div className="language-switch" aria-label={m.nav.language}>
              <Link href="/es/#contact" lang="es" aria-label="Español" aria-current={locale === "es" ? "page" : undefined}>
                <LanguageFlag locale="es" />
              </Link>
              <Link href="/en/#contact" lang="en" aria-label="English" aria-current={locale === "en" ? "page" : undefined}>
                <LanguageFlag locale="en" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {floatingWhatsapp && <a
        className="whatsapp-float"
        href={floatingWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={m.contact.cta}
        title={m.contact.cta}
      >
        <svg width="37" height="37" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.78 11.78 0 0 0 12.14 0C5.62 0 .3 5.3.3 11.82c0 2.08.55 4.1 1.6 5.88L.2 24l6.47-1.7a11.86 11.86 0 0 0 5.46 1.3h.01c6.52 0 11.84-5.31 11.84-11.83 0-3.16-1.23-6.13-3.46-8.29Z" />
          <path d="M8.87 6.67c-.24-.54-.5-.55-.73-.56h-.62c-.22 0-.58.08-.88.4-.3.33-1.15 1.12-1.15 2.74s1.18 3.18 1.35 3.4c.16.21 2.27 3.64 5.61 4.96 2.78 1.1 3.35.88 3.95.82.61-.06 1.95-.8 2.23-1.57.27-.77.27-1.43.19-1.57-.08-.14-.3-.22-.63-.38-.33-.17-1.95-.96-2.25-1.07-.3-.11-.52-.16-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.16-1.4-.52-2.67-1.66-.99-.88-1.66-1.96-1.85-2.29-.2-.22-.06-.41.14-.67.14-.2.33-.38.49-.57.16-.2.22-.33.33-.55.11-.22.06-.41-.03-.57-.08-.16-.73-1.78-1.02-2.43Z" fill="#20c968" />
        </svg>
      </a>}
    </footer>
  );
}
