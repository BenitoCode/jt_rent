"use client";

import { useRef, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Camera,
  MapPin,
  MessageCircle,
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
        <div className="fleet-intro">
          <div className="fleet-intro-copy">
            <p className="eyebrow">{m.fleet.eyebrow}</p>
            <h2 id="fleet-title">
              {m.fleet.title}
              <br />
              <span className="muted-heading">{m.fleet.titleAccent}</span>
            </h2>
            <p className="fleet-intro-description">{m.fleet.description}</p>
          </div>
          <ul className="fleet-facts" aria-label={m.fleet.factsLabel}>
            <li>
              <MapPin size={19} aria-hidden="true" />
              <span>{m.fleet.location}</span>
            </li>
            <li>
              <CalendarDays size={19} aria-hidden="true" />
              <span>{m.fleet.rentalPeriod}</span>
            </li>
            <li>
              <MessageCircle size={19} aria-hidden="true" />
              <span>{m.fleet.contactMethod}</span>
            </li>
          </ul>
        </div>
        <div className="fleet-subheading">
          <div>
            <p className="eyebrow">{m.fleet.listEyebrow}</p>
            <h3>{m.fleet.listTitle}</h3>
          </div>
          <p>{m.fleet.listDescription}</p>
        </div>
        <div className="fleet-grid">
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
          {Array.from({ length: 2 }, (_, index) => (
            <article
              className="coming-card"
              key={`future-vehicle-${index + 1}`}
              aria-labelledby={`coming-title-${index + 1}`}
            >
              <div className="coming-photo" aria-hidden="true">
                <span className="coming-photo-index">JT RENT · MÁLAGA</span>
                <span className="coming-photo-icon">
                  <Camera size={25} strokeWidth={1.4} />
                </span>
                <span className="coming-photo-caption">
                  {m.fleet.photoPlaceholder}
                </span>
              </div>
              <div className="coming-content">
                <p className="coming-label">
                  {m.fleet.soon} · 0{index + 1}
                </p>
                <h4 id={`coming-title-${index + 1}`}>{m.fleet.comingTitle}</h4>
                <p>{m.fleet.comingDescription}</p>
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
