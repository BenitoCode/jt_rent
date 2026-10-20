"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Messages } from "@/lib/i18n";

const photos = [
  "/images/hero-malaga-sunset.jpg",
  "/images/hero-malaga-port.jpg",
  "/images/hero-malaga-coast.jpg",
];

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
        <Image
          key={photos[activePhoto]}
          src={photos[activePhoto]}
          alt={m.hero.photoAlts[activePhoto]}
          fill
          priority={activePhoto === 0}
          sizes="(max-width: 700px) 90vw, 45vw"
        />
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
              key={photo}
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
