"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
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
        <h2 id="fleet-title" className="fleet-title">
          {m.fleet.listTitle}
        </h2>
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
