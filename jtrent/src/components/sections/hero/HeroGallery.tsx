"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Messages } from "@/lib/i18n";

const photos = [
  { name: "hero-malaga-sunset" },
  { name: "hero-malaga-port" },
  { name: "hero-malaga-coast" },
];

function photoSrcSet(name: string) {
  return [400, 512, 576, 640, 704, 800, 1024, 1280, 1355]
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

      if (!motionPreference.matches && !document.hidden) {
        intervalId = window.setInterval(() => {
          setActivePhoto((current) => (current + 1) % photos.length);
        }, 3000);
      }
    }

    syncAutoplay();
    motionPreference.addEventListener("change", syncAutoplay);
    document.addEventListener("visibilitychange", syncAutoplay);

    return () => {
      window.clearInterval(intervalId);
      motionPreference.removeEventListener("change", syncAutoplay);
      document.removeEventListener("visibilitychange", syncAutoplay);
    };
  }, []);

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
            sizes="100vw"
          />
          <Image
            key={photos[activePhoto].name}
            src={`/images/${photos[activePhoto].name}.jpg`}
            alt={m.hero.photoAlts[activePhoto]}
            fill
            loading="eager"
            fetchPriority={activePhoto === 0 ? "high" : "auto"}
            sizes="100vw"
          />
        </picture>
      </div>
    </div>
  );
}
