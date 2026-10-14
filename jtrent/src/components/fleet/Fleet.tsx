"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowUpRight,
  Bike,
  MoveUpRight,
} from "lucide-react";
import { motorcycles, type Locale, type Vehicle } from "@/data/motorcycles";
import { formatPrice, type Messages } from "@/lib/i18n";
import { VehicleVisual } from "@/components/ui/VehicleVisual";
import { BookingModal } from "@/components/booking/BookingModal";

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
          <h2 id="fleet-title" className="fleet-title">
            {m.fleet.listTitle}
          </h2>
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
            <button
              key={vehicle.id}
              className="vehicle-card"
              onClick={(event) => open(vehicle, event.currentTarget)}
              aria-haspopup="dialog"
              aria-label={`${m.fleet.details}: ${vehicle.brand} ${vehicle.model}`}
            >
              <div className="card-image">
                <VehicleVisual
                  vehicle={vehicle}
                  locale={locale}
                  label={m.fleet.photoPending}
                />
                <span className="card-image-arrow">
                  <ArrowUpRight size={23} />
                </span>
              </div>
              <div className="card-content">
                <p className="card-kicker">
                  {vehicle.brand.toUpperCase()}{" "}
                  <span>{vehicle.displacement} CC</span>
                </p>
                <h3>{vehicle.model}</h3>
                <p className="card-description">
                  {vehicle.description[locale]}
                </p>
                <div className="card-bottom">
                  <div className="card-price">
                    {vehicle.previousPrice !== undefined && (
                      <del aria-label={m.fleet.previous}>
                        {formatPrice(vehicle.previousPrice, locale)}
                      </del>
                    )}
                    <span>
                      <strong>{formatPrice(vehicle.dailyPrice, locale)}</strong>
                      <small>{m.fleet.day}</small>
                    </span>
                  </div>
                  <span className="card-detail">
                    {m.fleet.details}
                    <MoveUpRight size={15} />
                  </span>
                </div>
              </div>
            </button>
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
