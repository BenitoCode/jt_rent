import { ArrowUpRight } from "lucide-react";
import { HeroAvailability } from "@/components/sections/hero/HeroAvailability";
import { HeroGallery } from "@/components/sections/hero/HeroGallery";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import type { Locale } from "@/data/motorcycles";
import type { Messages } from "@/lib/i18n";

export function Hero({
  locale,
  messages: m,
}: {
  locale: Locale;
  messages: Messages;
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-main">
          <div className="hero-stage" aria-hidden="true">
            <HeroGallery messages={m} />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="red-dash" aria-hidden="true" />
              {m.hero.eyebrow}
            </p>
            <h1 id="hero-title">
              {m.hero.line1}
              <br />
              <span>{m.hero.line2}</span>
              <br />
              {m.hero.line3}
            </h1>
            <p className="hero-description">{m.hero.description}</p>
            <div className="hero-ctas">
              <WhatsAppLink
                locale={locale}
                messages={m}
                label={m.hero.whatsapp}
                className="button button-primary"
              />
              <a href="#fleet" className="button button-text">
                {m.hero.explore}
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </div>
            <p className="hero-note">
              <span aria-hidden="true" />
              {m.hero.note}
            </p>
          </div>
          <HeroAvailability locale={locale} messages={m} />
        </div>
      </div>
    </section>
  );
}
