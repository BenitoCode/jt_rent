import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { DeferredMap } from "@/components/sections/contact/DeferredMap";
import { site } from "@/config/site";
import { generalMessage, whatsappUrl } from "@/lib/whatsapp";
import type { Locale } from "@/data/motorcycles";
import type { Messages } from "@/lib/i18n";

export function Contact({
  locale,
  messages: m,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const whatsappContacts = site.whatsappContacts.map((number, index) => ({
    number: `+${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5, 8)} ${number.slice(8)}`,
    href: whatsappUrl(number, generalMessage(locale)),
    index,
  }));
  const mapQuery = encodeURIComponent(site.address);
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const mapEmbed = `https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`;

  return (
    <section id="contact" className="contact section-pad" aria-labelledby="contact-title">
      <div className="container">
        <header className="contact-heading">
          <p className="eyebrow">
            {m.contact.eyebrow}
          </p>
          <h2 id="contact-title">{m.contact.newTitle}</h2>
        </header>

        <div className="contact-layout">
          <section className="contact-info-card" aria-labelledby="contact-info-title">
            <h3 id="contact-info-title">
              <Phone className="contact-info-heading-icon" size={21} aria-hidden="true" />
              {m.contact.panelTitle}
            </h3>
            <div className="contact-channels">
              <div className="contact-channel contact-phone-channel">
                <span>
                  <small>{m.contact.whatsappLabel}</small>
                  <strong className="contact-phone-numbers">
                    {whatsappContacts[0] && (
                      <a
                        href={whatsappContacts[0].href ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {whatsappContacts[0].number}
                      </a>
                    )}
                    {whatsappContacts[0] && whatsappContacts[1] && (
                      <span aria-hidden="true">·</span>
                    )}
                    {whatsappContacts[1] && (
                      <a href={`tel:+${whatsappContacts[1].number.replace(/\D/g, "")}`}>
                        {whatsappContacts[1].number}
                      </a>
                    )}
                  </strong>
                </span>
              </div>
              <a className="contact-channel" href={`mailto:${site.email}`}>
                <Mail size={18} aria-hidden="true" />
                <span>
                  <small>{m.contact.emailLabel}</small>
                  <strong>{site.email}</strong>
                </span>
              </a>
            </div>
            <div className="contact-brand-note">
              <Image src="/images/logo-jt.webp" alt="" width={128} height={128} />
              <span>
                <strong>{locale === "es" ? "Atención directa" : "Personal support"}</strong>
                <small>
                  {locale === "es"
                    ? "En español e inglés, antes y durante tu alquiler."
                    : "In Spanish and English, before and during your rental."}
                </small>
              </span>
            </div>
            <a className="contact-info-location" href={mapHref} target="_blank" rel="noopener noreferrer">
              <MapPin size={17} aria-hidden="true" />
              <span>
                <small>{m.contact.mapPickupTitle}</small>
                <strong>{site.address}</strong>
              </span>
            </a>
          </section>

          <ContactForm formId={site.formspreeId} messages={m} locale={locale} />

          <section className="contact-map-card" aria-labelledby="contact-map-title">
            <div className="contact-map-header">
              <div>
                <h3 className="contact-map-kicker" id="contact-map-title">{m.contact.mapPickupTitle}</h3>
              </div>
            </div>
            <DeferredMap
              src={mapEmbed}
              title={m.contact.mapTitle}
              blockedTitle={m.contact.mapBlockedTitle}
              blockedDescription={m.contact.mapBlockedDescription}
              configureLabel={m.contact.mapConfigureCookies}
            />
            <div className="contact-map-footer">
              <p className="contact-map-address">
                <MapPin size={17} aria-hidden="true" />
                <span>{site.address}</span>
              </p>
              <a className="button button-primary" href={mapHref} target="_blank" rel="noopener noreferrer">
                <Navigation size={16} aria-hidden="true" />
                {m.contact.directions}
              </a>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
