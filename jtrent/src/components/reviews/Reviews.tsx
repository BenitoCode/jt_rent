"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import type { Messages } from "@/lib/i18n";

const reviewImages = [
  "/images/hero-malaga-sunset.jpg",
  "/images/hero-malaga-port.jpg",
  "/images/hero-malaga-coast.jpg",
  "/images/kymco-three-quarter.jpeg",
];

export function Reviews({ messages: m }: { messages: Messages }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

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
                {m.reviews.samples.map((review, index) => (
                  <article
                    className="review-card"
                    key={review.initials}
                    role="listitem"
                  >
                    <div className="review-photo" aria-hidden="true">
                      <Image
                        src={reviewImages[index % reviewImages.length]}
                        alt=""
                        width={600}
                        height={600}
                      />
                    </div>
                    <div className="review-card-body">
                      <div
                        className="review-stars"
                        role="img"
                        aria-label={m.reviews.starsLabel}
                      >
                        {"★★★★★"}
                      </div>
                      <blockquote>{review.quote}</blockquote>
                      <div className="review-reviewer">
                        <strong>{review.name}</strong>
                        <span className="review-demo-label">
                          {m.reviews.sampleLabel}
                        </span>
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
