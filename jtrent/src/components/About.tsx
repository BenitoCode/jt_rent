import Image from "next/image";
import Link from "next/link";
import { BadgeEuro, ClipboardCheck, UsersRound } from "lucide-react";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import type { Locale } from "@/data/motorcycles";
import type { Messages } from "@/lib/i18n";

const features = [
  { title: "priceTitle", text: "priceText", Icon: BadgeEuro },
  { title: "bookingTitle", text: "bookingText", Icon: ClipboardCheck },
  { title: "personalTitle", text: "personalText", Icon: UsersRound },
] as const;

export function About({
  locale,
  messages: m,
}: {
  locale: Locale;
  messages: Messages;
}) {
  return (
    <section className="about section-pad" id="about" aria-labelledby="about-title">
      <div className="container about-layout">
        <figure className="about-photo">
          <Image
            src="/images/jt-rent-founders.jpeg"
            alt={m.about.photoAlt}
            fill
            sizes="(max-width: 800px) 100vw, 48vw"
          />
          <figcaption>{m.about.photoCaption}</figcaption>
        </figure>

        <div className="about-content">
          <p className="eyebrow">{m.about.eyebrow}</p>
          <h2 id="about-title">{m.about.title}</h2>
          <p>{m.about.intro}</p>
          <p>{m.about.description}</p>

          <ul className="about-features">
            {features.map(({ title, text, Icon }) => (
              <li key={title}>
                <Icon aria-hidden="true" />
                <strong>{m.about[title]}</strong>
                <span>{m.about[text]}</span>
              </li>
            ))}
          </ul>

          <WhatsAppLink
            locale={locale}
            messages={m}
            label={m.about.cta}
            className="button button-primary about-whatsapp"
          />
          <Link className="about-fleet-link" href="#fleet">
            {m.about.fleetLink} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
