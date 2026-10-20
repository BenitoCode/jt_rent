"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
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
  const reviews = testimonials.filter((review) => review.verified);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  if (reviews.length === 0) return null;

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const animation = trackRef.current?.getAnimations()[0];
    const groupWidth = groupRef.current?.scrollWidth;
    if (!animation || !groupWidth) return;

    const duration = Number(animation.effect?.getTiming().duration);
    const startTime = Number(animation.currentTime ?? 0);
    const startX = event.clientX;
    const element = event.currentTarget;
    animation.pause();

    const move = (pointerEvent: globalThis.PointerEvent) => {
      if (pointerEvent.pointerId !== event.pointerId) return;
      const delta = pointerEvent.clientX - startX;
      if (Math.abs(delta) > 4) element.dataset.dragging = "true";
      const shiftedTime = startTime - (delta / groupWidth) * duration;
      animation.currentTime = ((shiftedTime % duration) + duration) % duration;
    };
    const finish = (pointerEvent: globalThis.PointerEvent) => {
      if (pointerEvent.pointerId !== event.pointerId) return;
      delete element.dataset.dragging;
      animation.play();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", finish);
      window.removeEventListener("pointercancel", finish);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", finish);
    window.addEventListener("pointercancel", finish);
  }
  return (
    <section
      id="reviews"
      className="reviews section-pad"
      aria-labelledby="reviews-title"
    >
      <div className="container">
        <header className="reviews-heading">
          <p className="eyebrow">{m.reviews.eyebrow}</p>
          <h2 id="reviews-title">{m.reviews.title}</h2>
          <p className="reviews-subtitle">{m.reviews.disclaimer}</p>
        </header>
        <div
          className="reviews-window"
          onPointerDown={startDrag}
          role="region"
          aria-label={m.reviews.carouselLabel}
        >
          <div className="reviews-track" ref={trackRef}>
            {[false, true].map((duplicate) => (
              <div
                className="reviews-group"
                ref={duplicate ? undefined : groupRef}
                key={duplicate ? "duplicate" : "reviews"}
                role="list"
                aria-hidden={duplicate || undefined}
              >
                {reviews.map((review) => (
                  <article
                    className="review-card"
                    key={review.id}
                    role="listitem"
                  >
                    <div className="review-photo" aria-hidden={!review.image}>
                      {review.image ? (
                        <Image
                          src={review.image.src}
                          alt={review.image.alt[locale]}
                          width={review.image.width}
                          height={review.image.height}
                        />
                      ) : (
                        <span aria-hidden="true">
                          {review.name
                            .split(/\s+/)
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <div className="review-card-body">
                      <blockquote>{review.quote[locale]}</blockquote>
                      <div className="review-reviewer">
                        <strong>{review.name}</strong>
                        {review.sourceUrl ? (
                          <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer">
                            {review.source}
                          </a>
                        ) : (
                          <span>{review.source}</span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
