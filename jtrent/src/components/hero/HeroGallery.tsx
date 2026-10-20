"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Messages } from "@/lib/i18n";

const photos = [
  { name: "hero-malaga-sunset", fallbackWidth: 576 },
  { name: "hero-malaga-port", fallbackWidth: 576 },
  { name: "hero-malaga-coast", fallbackWidth: 576 },
];

function photoSrcSet(name: string) {
  return [400, 576, 640, 800]
    .map((width) => `/images/${name}-${width}.webp ${width}w`)
    .join(", ");
}

export function HeroGallery({ messages: m }: { messages: Messages }) {
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let intervalId: number | undefined;

    function syncAutoplay() {
      window.clearInterval(intervalId);
      intervalId = undefined;
      if (!motionPreference.matches) {
        intervalId = window.setInterval(() => {
          setActivePhoto((current) => (current + 1) % photos.length);
        }, 2000);
      }
    }

    syncAutoplay();
    motionPreference.addEventListener("change", syncAutoplay);
    return () => {
      window.clearInterval(intervalId);
      motionPreference.removeEventListener("change", syncAutoplay);
    };
  }, []);

  function changePhoto(direction: number) {
    setActivePhoto(
      (current) => (current + direction + photos.length) % photos.length,
    );
  }

  return (
    <div
      className="hero-gallery"
      role="group"
      aria-label={m.hero.galleryLabel}
      aria-roledescription={m.hero.carousel}
    >
      <div className="hero-photo-frame">
        <picture>
          <source
            type="image/webp"
            srcSet={photoSrcSet(photos[activePhoto].name)}
            sizes="(max-width: 700px) 90vw, 42vw"
          />
          <Image
            key={photos[activePhoto].name}
            src={`/images/${photos[activePhoto].name}-${photos[activePhoto].fallbackWidth}.webp`}
            alt={m.hero.photoAlts[activePhoto]}
            fill
            loading={activePhoto === 0 ? "eager" : "lazy"}
            fetchPriority={activePhoto === 0 ? "high" : "auto"}
            sizes="(max-width: 700px) 90vw, 42vw"
          />
        </picture>
      </div>
      <div className="hero-gallery-controls">
        <button
          className="hero-gallery-arrow"
          type="button"
          aria-label={m.hero.previousPhoto}
          onClick={() => changePhoto(-1)}
        >
          <ChevronLeft size={17} aria-hidden="true" />
        </button>
        <div className="hero-gallery-dots">
          {photos.map((photo, index) => (
            <button
              key={photo.name}
              type="button"
              aria-label={m.hero.photo.replace("{number}", String(index + 1))}
              aria-pressed={index === activePhoto}
              onClick={() => setActivePhoto(index)}
            />
          ))}
        </div>
        <button
          className="hero-gallery-arrow"
          type="button"
          aria-label={m.hero.nextPhoto}
          onClick={() => changePhoto(1)}
        >
          <ChevronRight size={17} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
