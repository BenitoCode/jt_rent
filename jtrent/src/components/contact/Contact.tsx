import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
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
  const whatsappContacts = site.whatsappContacts.map((number) => {
    const href = whatsappUrl(number, generalMessage(locale));
    if (!href) throw new Error("Invalid JT Rent WhatsApp contact number");
    return {
      number: `+${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5, 8)} ${number.slice(8)}`,
      href,
    };
  });
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <div className="contact-copy">
          <p className="eyebrow">
            <span className="red-dash" aria-hidden="true" />
            {m.contact.eyebrow}
          </p>
          <h2 id="contact-title">
            {m.contact.title}
            <br />
            <span>{m.contact.accent}</span>
          </h2>
          <p className="contact-description">{m.contact.description}</p>
          <div className="contact-actions">
            <WhatsAppLink
              locale={locale}
              messages={m}
              label={m.contact.cta}
              className="button button-primary"
            />
            <a
              className="button contact-email-button"
              href={`mailto:${site.email}`}
            >
              <Mail size={17} aria-hidden="true" />
              {m.contact.emailCta}
            </a>
          </div>
          <p className="contact-note">{m.contact.note}</p>
        </div>

        <aside className="contact-card" aria-label={m.contact.panelTitle}>
          <p className="contact-card-eyebrow">{m.contact.panelEyebrow}</p>
          <h3>{m.contact.panelTitle}</h3>
          <p className="contact-card-description">
            {m.contact.panelDescription}
          </p>
          <div className="contact-channels">
            {whatsappContacts.map((contact, index) => (
              <a
                className="contact-channel"
                href={contact.href}
                key={contact.number}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>
                  <small>
                    {m.contact.whatsappLabel}
                    {` 0${index + 1}`}
                  </small>
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
            <a
              className="contact-channel"
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={18} aria-hidden="true" />
              <span>
                <small>{m.contact.locationLabel}</small>
                <strong>{site.address}</strong>
                <small className="contact-channel-link">
                  {m.contact.mapLink}
                </small>
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="contact-fleet">
            <span>{m.contact.fleetLabel}</span>
            <strong>{m.contact.fleetName}</strong>
            <small>{m.contact.fleetNote}</small>
          </div>
        </aside>

        <a className="back-top" href="#top" aria-label={m.contact.back}>
          <ArrowUp size={19} />
        </a>
      </div>
    </section>
  );
}
