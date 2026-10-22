import Image from "next/image";
import Link from "next/link";
import { BadgeEuro, ClipboardCheck, UsersRound } from "lucide-react";
import type { Messages } from "@/lib/i18n";

const features = [
  { title: "priceTitle", text: "priceText", Icon: BadgeEuro },
  { title: "bookingTitle", text: "bookingText", Icon: ClipboardCheck },
  { title: "personalTitle", text: "personalText", Icon: UsersRound },
] as const;

export function About({
  messages: m,
}: {
  messages: Messages;
}) {
  return (
    <section className="about section-pad" id="about" aria-labelledby="about-title">
      <div className="container about-layout">
        <figure className="about-photo">
          <picture>
            <source
              type="image/webp"
              srcSet={[384, 576, 640, 672, 768]
                .map((width) => `/images/jt-rent-founders-${width}.webp ${width}w`)
                .join(", ")}
              sizes="(max-width: 900px) min(540px, calc(100vw - 40px)), min(50vw, 650px)"
            />
            <Image
              src="/images/jt-rent-founders-640.webp"
              alt={m.about.photoAlt}
              fill
              sizes="(max-width: 900px) min(540px, calc(100vw - 40px)), min(50vw, 650px)"
            />
          </picture>
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

          <Link className="about-fleet-link" href="#fleet">
            {m.about.fleetLink} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
