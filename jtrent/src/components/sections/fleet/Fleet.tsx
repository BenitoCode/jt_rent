import {
  Bike,
  Gauge,
  IdCard,
  Luggage,
  PanelTop,
  Smartphone,
  Check,
} from "lucide-react";
import { motorcycles, type Locale } from "@/data/motorcycles";
import { formatPrice, type Messages } from "@/lib/i18n";
import { VehicleVisual } from "@/components/ui/VehicleVisual";
import { FleetScroller } from "@/components/sections/fleet/FleetScroller";
import { VehicleDetailsButton } from "@/components/sections/fleet/VehicleDetailsButton";
import { site } from "@/config/site";
import { vehicleMessage, whatsappUrl } from "@/lib/whatsapp";

export function Fleet({
  locale,
  messages: m,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const vehicles = motorcycles.filter(
    (vehicle) =>
      vehicle.visible &&
      vehicle.showInFleet &&
      vehicle.status === "available_for_inquiry",
  );
  const featureIcons = {
    engine: Gauge,
    storage: Luggage,
    phone: Smartphone,
    display: PanelTop,
  };
  return (
    <section
      id="fleet"
      className="fleet section-pad"
      aria-labelledby="fleet-title"
    >
      <div className="container">
        <div className="fleet-carousel-heading">
          <p className="eyebrow fleet-eyebrow">{m.fleet.listEyebrow}</p>
          <h2 id="fleet-title" className="fleet-title">
            {m.fleet.listTitle}
          </h2>
          <p className="fleet-description">{m.fleet.listDescription}</p>
        </div>
        <FleetScroller
          className="fleet-grid"
          role="group"
          aria-label={m.fleet.carouselLabel}
          aria-roledescription={m.fleet.carousel}
        >
          {vehicles.map((vehicle) => (
            <article key={vehicle.id} className="vehicle-card">
              <div className="card-image vehicle-card-image">
                <VehicleVisual
                  vehicle={vehicle}
                  locale={locale}
                  label={m.fleet.photoPending}
                />
                <span className="vehicle-card-badge">
                  {m.fleet.featuredBadge}
                </span>
                <span className="vehicle-card-displacement">
                  <strong>{vehicle.displacement}</strong>
                  <span>cc</span>
                </span>
              </div>
              <div className="card-content">
                <h3>
                  {vehicle.brand} {vehicle.model}
                </h3>
                <p className="card-description vehicle-card-description">
                  {vehicle.description[locale]}
                </p>
                <ul className="vehicle-features" aria-label={m.modal.features}>
                  {vehicle.features.slice(0, 3).map((feature) => {
                    const Icon = featureIcons[feature];
                    return (
                      <li key={feature}>
                        <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                        <span>{m.modal[feature]}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="vehicle-price-block">
                  <p className="card-price vehicle-card-price">
                    {vehicle.previousPrice !== undefined && (
                      <>
                        <span className="vehicle-price-before">
                          {m.modal.before}
                        </span>
                        <del aria-label={m.fleet.previous}>
                          {formatPrice(vehicle.previousPrice, locale)}
                        </del>
                      </>
                    )}
                    <span>
                      <strong>{formatPrice(vehicle.dailyPrice, locale)}</strong>
                      <small>{m.fleet.day}</small>
                    </span>
                  </p>
                  <p className="vehicle-price-note">{m.fleet.priceNote}</p>
                </div>
                <VehicleDetailsButton vehicle={vehicle} locale={locale} messages={m} />
                <a
                  className="vehicle-card-whatsapp"
                  href={
                    whatsappUrl(
                      site.whatsapp,
                      vehicleMessage(vehicle, locale),
                    ) ?? undefined
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={
                    !whatsappUrl(site.whatsapp, vehicleMessage(vehicle, locale))
                  }
                >
                  <svg
                    className="whatsapp-brand-icon"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .14 5.36.14 11.94c0 2.1.55 4.15 1.6 5.96L.04 24l6.25-1.64a11.9 11.9 0 0 0 5.78 1.47h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.19-3.5-8.41ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.23-.37a9.85 9.85 0 0 1-1.52-5.25c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.45-4.44 9.89-9.91 9.89Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                  </svg>
                  {m.fleet.details}
                </a>
              </div>
            </article>
          ))}
          {Array.from({ length: 3 }, (_, index) => (
            <article
              className="coming-card"
              key={`future-vehicle-${index + 1}`}
              aria-labelledby={`coming-title-${index + 1}`}
            >
              <div className="coming-photo" aria-hidden="true">
                <span className="coming-photo-index">JT RENT</span>
                <span className="coming-photo-icon">
                  <Bike size={54} strokeWidth={1.25} />
                </span>
                <span className="coming-photo-caption">
                  {m.fleet.comingCaption}
                </span>
              </div>
              <div className="coming-content">
                <p className="coming-label">{m.fleet.soon}</p>
                <h4 id={`coming-title-${index + 1}`}>{m.fleet.comingTitle}</h4>
                <p>{m.fleet.soonDescription}</p>
              </div>
            </article>
          ))}
        </FleetScroller>
        <aside className="fleet-trust" aria-label={m.fleet.trustTitle}>
          <div className="fleet-trust-item">
            <span className="fleet-trust-icon" aria-hidden="true">
              <Check size={19} strokeWidth={2.2} />
            </span>
            <div>
              <h3>{m.fleet.includedLabel}</h3>
              <ul className="fleet-trust-included">
                {m.modal.includedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="fleet-trust-item">
            <span className="fleet-trust-icon" aria-hidden="true">
              <IdCard size={19} strokeWidth={1.8} />
            </span>
            <div>
              <h3>{m.fleet.documentsLabel}</h3>
              <p>{m.fleet.documentsDescription}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
