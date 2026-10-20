import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Locale, Vehicle } from "@/data/motorcycles";

export function VehicleVisual({
  vehicle,
  locale,
  label,
  hero = false,
}: {
  vehicle: Vehicle;
  locale: Locale;
  label: string;
  hero?: boolean;
}) {
  const photo =
    vehicle.photos.find((photo) => photo.role === "side") ?? vehicle.photos[0];
  if (photo)
    return (
      <div className={`vehicle-photo ${hero ? "vehicle-photo-hero" : ""}`}>
        <picture>
          {photo.responsiveSrcSet && (
            <source
              type="image/webp"
              srcSet={photo.responsiveSrcSet}
              sizes={
                hero
                  ? "(max-width: 900px) 100vw, 50vw"
                  : "(max-width: 700px) 90vw, 512px"
              }
            />
          )}
          <Image
            src={photo.src}
            alt={photo.alt[locale]}
            width={photo.width}
            height={photo.height}
            sizes={
              hero
                ? "(max-width: 900px) 100vw, 50vw"
                : "(max-width: 700px) 90vw, 512px"
            }
            priority={hero}
            loading={hero ? "eager" : "lazy"}
          />
        </picture>
      </div>
    );
  return (
    <div className={`vehicle-art ${hero ? "vehicle-art-hero" : ""}`}>
      <div className="art-grid" aria-hidden="true" />
      <div className="art-top">
        <span>{vehicle.brand.toUpperCase()}</span>
        <ArrowUpRight aria-hidden="true" size={hero ? 28 : 20} />
      </div>
      <div className="art-model">
        <span>
          {vehicle.model
            .replace(String(vehicle.displacement), "")
            .trim()
            .toUpperCase()}
        </span>
        <strong aria-hidden="true">
          {vehicle.displacement}
          <small>cc</small>
        </strong>
      </div>
      <div className="art-bottom">
        <span className="art-caption">{label}</span>
        <span className="art-index" aria-hidden="true">
          01 — JT
        </span>
      </div>
    </div>
  );
}
