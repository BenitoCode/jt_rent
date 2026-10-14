import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
} from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
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
            <span className="red-dash" aria-hidden="true" />
            {m.contact.eyebrow}
          </p>
          <h2 id="contact-title">{m.contact.newTitle}</h2>
          <p>{m.contact.newDescription}</p>
        </header>

        <div className="contact-layout">
          <div className="contact-left-column">
            <section className="contact-info-card" aria-labelledby="contact-info-title">
              <p className="contact-card-eyebrow">{m.contact.panelEyebrow}</p>
              <h3 id="contact-info-title">{m.contact.panelTitle}</h3>
              <div className="contact-channels">
                <a className="contact-channel" href={`mailto:${site.email}`}>
                  <Mail size={18} aria-hidden="true" />
                  <span>
                    <small>{m.contact.emailLabel}</small>
                    <strong>{site.email}</strong>
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <div className="contact-channel contact-location">
                  <MapPin size={18} aria-hidden="true" />
                  <span>
                    <small>{m.contact.locationLabel}</small>
                    <strong>{site.address}</strong>
                  </span>
                </div>
                {whatsappContacts.map((contact) => (
                  <a
                    className="contact-channel"
                    href={contact.href ?? undefined}
                    key={contact.number}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!contact.href || undefined}
                  >
                    <MessageCircle size={18} aria-hidden="true" />
                    <span>
                      <small>{m.contact.whatsappLabel} 0{contact.index + 1}</small>
                      <strong>{contact.number}</strong>
                    </span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>
              <div className="contact-socials" aria-label={m.contact.socialsLabel}>
                <button className="contact-social" type="button" disabled aria-label="Instagram">
                  <Instagram size={19} aria-hidden="true" />
                  <span>Instagram</span>
                  <small>{m.contact.socialComingSoon}</small>
                </button>
                <button className="contact-social" type="button" disabled aria-label="Facebook">
                  <Facebook size={19} aria-hidden="true" />
                  <span>Facebook</span>
                  <small>{m.contact.socialComingSoon}</small>
                </button>
                <a className="contact-social" href={`mailto:${site.email}`} aria-label={m.contact.emailLabel}>
                  <Mail size={19} aria-hidden="true" />
                  <span>Email</span>
                </a>
              </div>
            </section>

            <ContactForm formId={site.formspreeId} messages={m} />
          </div>

          <section className="contact-map-card" aria-labelledby="contact-map-title">
            <div className="contact-map-header">
              <div>
                <p className="contact-card-eyebrow">{m.contact.locationLabel}</p>
                <h3 id="contact-map-title">{m.contact.mapTitle}</h3>
              </div>
              <MapPin size={22} aria-hidden="true" />
            </div>
            <iframe
              className="contact-map"
              src={mapEmbed}
              title={m.contact.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="contact-map-footer">
              <p>{site.address}</p>
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
