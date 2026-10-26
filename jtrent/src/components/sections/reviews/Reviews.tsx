import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { site } from "@/config/site";
import type { Locale } from "@/data/motorcycles";
import type { Messages } from "@/lib/i18n";

const googleWriteReviewUrl = "https://g.page/r/CVFNzJPgTRRsECE/review";

function GoogleMark() {
  return (
    <svg className="google-mark" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z" />
      <path fill="#34A853" d="M24 44c5.5 0 10.2-1.8 13.6-4.8L31 34.1c-1.8 1.2-4.1 2-7 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z" />
      <path fill="#FBBC05" d="M12.6 27.7a12 12 0 0 1 0-7.4V15H5.8a20 20 0 0 0 0 18l6.8-5.3Z" />
      <path fill="#EA4335" d="M24 11.9c3 0 5.7 1 7.8 3.1l5.9-5.9A19.7 19.7 0 0 0 24 4 20 20 0 0 0 5.8 15l6.8 5.3C14.2 15.5 18.7 12 24 12Z" />
    </svg>
  );
}

export function Reviews({
  locale,
  messages: m,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const reviews = testimonials.filter((review) => review.verified);
  const googleUrl =
    site.googleBusinessUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${site.address}`)}`;

  return (
    <section id="reviews" className="reviews section-pad" aria-labelledby="reviews-title">
      <div className="container">
        <header className="reviews-heading">
          <p className="eyebrow">{m.reviews.eyebrow}</p>
          <h2 id="reviews-title">{m.reviews.title}</h2>
        </header>

        {reviews.length > 0 ? (
          <div className="reviews-window" role="region" aria-label={m.reviews.carouselLabel}>
            <div className={`reviews-track ${reviews.length === 1 ? "reviews-track-single" : ""}`}>
              {(reviews.length > 1 ? [false, true] : [false]).map((duplicate) => (
                <div
                  className="reviews-group"
                  key={duplicate ? "duplicate" : "reviews"}
                  role="list"
                  aria-hidden={duplicate || undefined}
                >
                  {reviews.map((review, index) => (
                    <article className={`review-card ${review.image ? "" : "review-card-text-only"}`} key={review.id} role="listitem">
                      {review.image && (
                        <div className="review-photo">
                          <Image
                            src={review.image.src}
                            alt={review.image.alt[locale]}
                            width={review.image.width}
                            height={review.image.height}
                          />
                        </div>
                      )}
                      <div className="review-card-body">
                        <div className="review-reviewer">
                          {!review.image && (
                            <span className="review-avatar" aria-hidden="true">
                              {review.name.trim().charAt(0).toUpperCase()}
                            </span>
                          )}
                          <GoogleMark />
                          <span className="review-person">
                            <strong>{review.name}</strong>
                            <small>{m.reviews.googleSource}</small>
                            {review.date && <small>{review.date[locale]}</small>}
                          </span>
                        </div>
                        <div className="review-stars" aria-label={`${review.rating ?? 5} / 5`}>
                          {Array.from({ length: 5 }, (_, starIndex) => (
                            <Star
                              key={starIndex}
                              size={16}
                              aria-hidden="true"
                              fill={starIndex < (review.rating ?? 5) ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                        <blockquote>{review.quote[locale]}</blockquote>
                        {review.sourceUrl && (
                          <a className="review-original-link" href={review.sourceUrl} target="_blank" rel="noopener noreferrer">
                            {m.reviews.viewOriginal}
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="reviews-empty" role="status">
            <GoogleMark />
            <div className="reviews-rating-summary">
              <strong>{m.reviews.rating}</strong>
              <span className="reviews-rating-stars" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </span>
              <p>{m.reviews.ratingCaption}</p>
            </div>
          </div>
        )}

        <div className="reviews-invite">
          <div>
            <h3>{m.reviews.inviteTitle}</h3>
            <p>{m.reviews.inviteText}</p>
          </div>
          <div className="reviews-actions">
            <a className="reviews-write-link" href={googleWriteReviewUrl} target="_blank" rel="noopener noreferrer">
              <GoogleMark />
              {m.reviews.writeGoogle}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a className="reviews-google-link" href={googleUrl} target="_blank" rel="noopener noreferrer">
              <GoogleMark />
              {m.reviews.viewGoogle}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
