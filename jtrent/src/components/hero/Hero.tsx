import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { HeroGallery } from "@/components/hero/HeroGallery";
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
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="red-dash" />
              {m.hero.eyebrow}
            </p>
            <h1 id="hero-title">
              {m.hero.line1}{" "}
              <br />
              <span>{m.hero.line2}{" "}</span>
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
                <ArrowUpRight size={20} />
              </a>
            </div>
            <p className="hero-note">
              <span />
              {m.hero.note}
            </p>
          </div>
          <div className="hero-stage">
            <div className="hero-diagonal" aria-hidden="true" />
            <HeroGallery messages={m} />
            <span className="stage-vertical" aria-hidden="true">
              {m.hero.edition}
            </span>
          </div>
        </div>
        <div className="hero-bottom">
          <span>
            <MapPin size={14} />
            {m.hero.location}
          </span>
          <a href="#fleet">
            {m.hero.scroll}
            <ArrowDown size={16} />
          </a>
          <span className="hero-bottom-index">01 / 03</span>
        </div>
      </div>
      <div className="promise-strip">
        <div className="container">
          <span>
            {m.strip.one}
            <span className="strip-star">✳</span>
          </span>
          <span>
            {m.strip.two}
            <span className="strip-star">✳</span>
          </span>
          <span>
            {m.strip.three}
            <span className="strip-star">✳</span>
          </span>
        </div>
      </div>
    </section>
  );
}
