import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import type { Locale } from "@/data/motorcycles";
import type { Messages } from "@/lib/i18n";

export function Reviews({
  locale,
  messages: m,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const verified = testimonials.filter((item) => item.verified);
  if (!verified.length) return null;
  return (
    <section id="reviews" className="reviews section-pad">
      <div className="container">
        <p className="eyebrow">{m.reviews.eyebrow}</p>
        <h2>{m.reviews.title}</h2>
        <div className="reviews-grid">
          {verified.map((item) => (
            <figure key={item.id}>
              {item.image && (
                <Image
                  src={item.image.src}
                  alt={item.image.alt[locale]}
                  width={item.image.width}
                  height={item.image.height}
                />
              )}
              {item.video && (
                <video controls preload="none">
                  <source src={item.video.src} />
                  <track
                    kind="captions"
                    src={item.video.captions[locale]}
                    srcLang={locale}
                    label={locale === "es" ? "Español" : "English"}
                    default
                  />
                </video>
              )}
              <blockquote>{item.quote[locale]}</blockquote>
              <figcaption>
                {item.name} · {item.source}{" "}
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {m.reviews.source}
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
