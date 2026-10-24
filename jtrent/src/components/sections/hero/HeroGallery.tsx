import Image from "next/image";
import type { Messages } from "@/lib/i18n";

const heroPhoto = "hero-malaga-sunset";

function photoSrcSet() {
  return [400, 512, 576, 640, 704, 800, 1024, 1280, 1355]
    .map((width) => `/images/${heroPhoto}-${width}.webp ${width}w`)
    .join(", ");
}

export function HeroGallery({ messages: m }: { messages: Messages }) {
  return (
    <div className="hero-gallery">
      <div className="hero-photo-frame">
        <picture>
          <source
            type="image/webp"
            srcSet={photoSrcSet()}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <Image
            src={`/images/${heroPhoto}.jpg`}
            alt={m.hero.photoAlts[0]}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </picture>
      </div>
    </div>
  );
}
