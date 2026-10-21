"use client";

import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import dynamic from "next/dynamic";
import {
  Bike,
  ChevronDown,
  Gauge,
  IdCard,
  Luggage,
  MessageCircle,
  PanelTop,
  Smartphone,
  Check,
} from "lucide-react";
import { motorcycles, type Locale, type Vehicle } from "@/data/motorcycles";
import { formatPrice, type Messages } from "@/lib/i18n";
import { VehicleVisual } from "@/components/ui/VehicleVisual";
import { site } from "@/config/site";
import { vehicleMessage, whatsappUrl } from "@/lib/whatsapp";

const BookingModal = dynamic(
  () =>
    import("@/components/booking/BookingModal").then(
      (module) => module.BookingModal,
    ),
  { ssr: false },
);

function preloadBookingModal() {
  void import("@/components/booking/BookingModal");
}

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
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const carousel = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      moved: false,
    };
    const move = (pointerEvent: globalThis.PointerEvent) => {
      const current = drag.current;
      const element = carousel.current;
      if (!current || !element || current.pointerId !== pointerEvent.pointerId)
        return;
      const delta = pointerEvent.clientX - current.startX;
      if (!current.moved && Math.abs(delta) < 10) return;
      current.moved = true;
      element.dataset.dragging = "true";
      element.scrollLeft = current.startScrollLeft - delta;
    };
    const finish = (pointerEvent: globalThis.PointerEvent) => {
      const current = drag.current;
      const element = carousel.current;
      if (!current || current.pointerId !== pointerEvent.pointerId) return;
      if (current.moved) {
        suppressClick.current = true;
        window.setTimeout(() => {
          suppressClick.current = false;
        }, 250);
      }
      drag.current = null;
      if (element) delete element.dataset.dragging;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", finish);
      window.removeEventListener("pointercancel", finish);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", finish);
    window.addEventListener("pointercancel", finish);
  }
  function open(vehicle: Vehicle, button: HTMLButtonElement) {
    opener.current = button;
    setSelected(vehicle);
  }
  function close() {
    setSelected(null);
    requestAnimationFrame(() => opener.current?.focus());
  }
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
        <div
          className="fleet-grid"
          ref={carousel}
          onPointerDown={startDrag}
          onClickCapture={(event) => {
            if (suppressClick.current) {
              event.preventDefault();
              event.stopPropagation();
              suppressClick.current = false;
            }
          }}
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
                <button
                  type="button"
                  className="vehicle-card-details"
                  onPointerEnter={preloadBookingModal}
                  onFocus={preloadBookingModal}
                  onClick={(event) => open(vehicle, event.currentTarget)}
                  aria-haspopup="dialog"
                >
                  {m.fleet.viewConditions}
                  <ChevronDown size={17} aria-hidden="true" />
                </button>
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
                  <MessageCircle size={18} aria-hidden="true" />
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
        </div>
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
      {selected && (
        <BookingModal
          vehicle={selected}
          locale={locale}
          messages={m}
          onClose={close}
        />
      )}
    </section>
  );
}
