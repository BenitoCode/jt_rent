import {
  ArrowUpRight,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
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
          <p>{m.contact.newDescription}</p>
        </header>

        <div className="contact-layout">
          <section className="contact-info-card" aria-labelledby="contact-info-title">
            <h3 id="contact-info-title">{m.contact.panelTitle}</h3>
            <a className="contact-primary-phone" href={`tel:+${site.whatsapp}`}>
              {whatsappContacts[0]?.number}
            </a>
            <div className="contact-channels">
              {whatsappContacts.slice(1).map((contact) => (
                <a
                  className="contact-channel"
                  href={contact.href ?? undefined}
                  key={contact.number}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!contact.href || undefined}
                >
                  <Phone size={18} aria-hidden="true" />
                  <span>
                    <small>{m.contact.otherPhoneLabel}</small>
                    <strong>{contact.number}</strong>
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
              <a className="contact-channel" href={`mailto:${site.email}`}>
                <Mail size={18} aria-hidden="true" />
                <span>
                  <small>{m.contact.emailLabel}</small>
                  <strong>{site.email}</strong>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <a className="contact-info-location" href={mapHref} target="_blank" rel="noopener noreferrer">
              <MapPin size={17} aria-hidden="true" />
              <span>
                <small>{m.contact.mapPickupTitle}</small>
                <strong>{site.address}</strong>
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </section>

          <ContactForm formId={site.formspreeId} messages={m} locale={locale} />

          <section className="contact-map-card" aria-labelledby="contact-map-title">
            <div className="contact-map-header">
              <div>
                <h3 className="contact-map-kicker" id="contact-map-title">{m.contact.mapPickupTitle}</h3>
                <p className="contact-card-description">{m.contact.mapPickupDescription}</p>
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
            <p className="contact-map-privacy">{m.contact.mapPrivacy}</p>
          </section>
        </div>
      </div>
    </section>
  );
}
