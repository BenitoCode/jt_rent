import Image from "next/image";
import { site } from "@/config/site";
import type { Locale } from "@/data/motorcycles";

export function Brand({
  header = false,
  locale = "es",
}: {
  header?: boolean;
  locale?: Locale;
}) {
  if (header) {
    return (
      <span className="brand brand-header">
        {site.logo ? (
          <span className="brand-logo-window">
            <Image
              src={site.logo}
              alt="JT Rent"
              width={256}
              height={256}
              className="brand-image"
              priority
            />
          </span>
        ) : (
          <span className="brand-mark" aria-hidden="true">
            JT
            <span className="brand-slash" />
          </span>
        )}
        <span className="brand-divider" aria-hidden="true" />
        <span className="brand-header-copy">
          <span className="brand-title">
            <span className="brand-title-accent">JT</span> RENT
          </span>
          <span className="brand-tagline">
            Málaga · {locale === "es" ? "Alquiler de motos" : "Scooter rental"}
          </span>
        </span>
      </span>
    );
  }

  return site.logo ? (
    <span className="brand-logo-window">
      <Image
        src={site.logo}
        alt="JT Rent"
        width={256}
        height={256}
        className="brand-image"
        priority
      />
    </span>
  ) : (
    <span className="brand" aria-label="JT Rent">
      <span className="brand-mark">
        JT
        <span className="brand-slash" />
      </span>
      <span className="brand-name">
        RENT<span>MÁLAGA</span>
      </span>
    </span>
  );
}
