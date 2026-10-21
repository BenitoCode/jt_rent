"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Luggage,
  Smartphone,
  PanelTop,
  CalendarDays,
  Check,
} from "lucide-react";
import { site } from "@/config/site";
import { formatPrice, type Messages } from "@/lib/i18n";
import { localToday, validateDates, type DateError } from "@/lib/dates";
import { vehicleMessage, whatsappUrl } from "@/lib/whatsapp";
import { readRentalDates, saveRentalDates } from "@/lib/rental-dates";
import { VehicleVisual } from "@/components/ui/VehicleVisual";
import type { Locale, Vehicle } from "@/data/motorcycles";

const featureIcons = {
  engine: Gauge,
  storage: Luggage,
  phone: Smartphone,
  display: PanelTop,
};

export function BookingModal({
  vehicle,
  locale,
  messages: m,
  onClose,
}: {
  vehicle: Vehicle;
  locale: Locale;
  messages: Messages;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pickupField = useRef<HTMLInputElement>(null);
  const dropoffField = useRef<HTMLInputElement>(null);
  const touch = useRef<number | null>(null);
  const [photo, setPhoto] = useState(() => {
    const sidePhoto = vehicle.photos.findIndex((item) => item.role === "side");
    return sidePhoto >= 0 ? sidePhoto : 0;
  });
  const [initialDates] = useState(readRentalDates);
  const [pickup, setPickup] = useState(initialDates.pickup);
  const [dropoff, setDropoff] = useState(initialDates.dropoff);
  const [error, setError] = useState<DateError | null>(null);
  const [today] = useState(() => localToday());
  const hasWhatsapp = Boolean(whatsappUrl(site.whatsapp, ""));
  const activePhoto = vehicle.photos[photo];

  useEffect(() => {
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    const padding = document.body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${gap}px`;
    element?.showModal();
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = padding;
    };
  }, []);

  function changePhoto(direction: number) {
    setPhoto(
      (current) =>
        (current + direction + vehicle.photos.length) % vehicle.photos.length,
    );
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const invalid = validateDates(pickup, dropoff);
    setError(invalid);
    if (invalid) {
      (invalid === "pastError" || !pickup
        ? pickupField
        : dropoffField
      ).current?.focus();
      return;
    }
    const href = whatsappUrl(
      site.whatsapp,
      vehicleMessage(vehicle, locale, pickup, dropoff),
    );
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  }
  return (
    <dialog
      className="booking-modal"
      ref={dialog}
      aria-labelledby="booking-title"
      aria-describedby="booking-subtitle"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !pickup && !dropoff) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose();
        }
      }}
    >
      <div className="modal-gallery">
        <div
          className="gallery-main"
          onTouchStart={(event) => {
            touch.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touch.current !== null && vehicle.photos.length > 1) {
              const delta = event.changedTouches[0].clientX - touch.current;
              if (Math.abs(delta) > 50) changePhoto(delta > 0 ? -1 : 1);
            }
            touch.current = null;
          }}
        >
          {activePhoto ? (
            <Image
              key={activePhoto.src}
              src={activePhoto.src}
              alt={activePhoto.alt[locale]}
              width={activePhoto.width}
              height={activePhoto.height}
              sizes="(max-width: 700px) calc(100vw - 20px), 820px"
            />
          ) : (
            <VehicleVisual
              vehicle={vehicle}
              locale={locale}
              label={m.fleet.photoPending}
            />
          )}
          <span className="modal-photo-brand">JT RENT / SCOOTER</span>
          <button
            className="icon-button modal-close"
            aria-label={m.modal.close}
            onClick={onClose}
            autoFocus
          >
            <X size={22} />
          </button>
        </div>
        {vehicle.photos.length > 1 && (
          <div className="gallery-controls">
            <button
              className="icon-button"
              onClick={() => changePhoto(-1)}
              aria-label={m.modal.previousPhoto}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="gallery-dots">
              {vehicle.photos.map((image, index) => (
                <button
                  key={image.src}
                  aria-label={`${m.modal.photo} ${index + 1}`}
                  aria-pressed={index === photo}
                  onClick={() => setPhoto(index)}
                />
              ))}
            </div>
            <button
              className="icon-button"
              onClick={() => changePhoto(1)}
              aria-label={m.modal.nextPhoto}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
        {activePhoto && (
          <p className="gallery-caption" aria-live="polite">
            {activePhoto.alt[locale]}
          </p>
        )}
        {!activePhoto && <p className="gallery-caption">{m.modal.noPhotos}</p>}
        <p className="vehicle-description">{vehicle.description[locale]}</p>
      </div>
      <div className="modal-header">
        <div>
          <h2 id="booking-title">
            {vehicle.brand} {vehicle.model}
          </h2>
          <p id="booking-subtitle">{m.modal.subtitle}</p>
        </div>
      </div>
      <div className="modal-details">
        <div className="modal-price">
          <span className="eyebrow">{m.modal.price}</span>
          <div>
            <strong>{formatPrice(vehicle.dailyPrice, locale)}</strong>
            <span>{m.modal.day}</span>
          </div>
          {vehicle.previousPrice !== undefined && (
            <p>
              {m.modal.before}{" "}
              <del>{formatPrice(vehicle.previousPrice, locale)}</del>
            </p>
          )}
          <small>{m.modal.total}</small>
        </div>
        <div className="modal-features">
          <h3 className="eyebrow">{m.modal.features}</h3>
          <ul>
            {vehicle.features.map((feature) => {
              const Icon = featureIcons[feature];
              return (
                <li key={feature}>
                  <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                  {feature === "engine"
                    ? `${vehicle.displacement} cc`
                    : m.modal[feature]}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="modal-included">
          <div className="modal-included-heading">
            <h3 className="eyebrow">{m.modal.includedTitle}</h3>
            <p>{m.modal.includedSubtitle}</p>
          </div>
          <ul>
            {m.modal.includedItems.map((item) => (
              <li key={item}>
                <span className="included-check" aria-hidden="true">
                  <Check size={15} strokeWidth={2.5} />
                </span>
                <span>{item}</span>
                <strong>{m.modal.free}</strong>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={submit} noValidate>
          <div className="dates-heading">
            <h3>
              <CalendarDays size={18} />
              {m.modal.dates}
            </h3>
            <span>{m.modal.optional}</span>
          </div>
          <div className="date-fields">
            <label>
              {m.modal.pickup}
              <input
                ref={pickupField}
                type="date"
                lang={locale}
                min={today}
                value={pickup}
                onChange={(event) => {
                  const nextPickup = event.target.value;
                  setPickup(nextPickup);
                  saveRentalDates(nextPickup, dropoff);
                  setError(null);
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "date-error" : undefined}
              />
            </label>
            <label>
              {m.modal.return}
              <input
                ref={dropoffField}
                type="date"
                lang={locale}
                min={pickup > today ? pickup : today}
                value={dropoff}
                onChange={(event) => {
                  const nextDropoff = event.target.value;
                  setDropoff(nextDropoff);
                  saveRentalDates(pickup, nextDropoff);
                  setError(null);
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "date-error" : undefined}
              />
            </label>
          </div>
          {(pickup || dropoff) && (
            <button
              className="clear-dates"
              type="button"
              onClick={() => {
                setPickup("");
                setDropoff("");
                saveRentalDates("", "");
                setError(null);
              }}
            >
              {m.modal.clearDates}
            </button>
          )}
          {error && (
            <p className="form-error" role="alert" id="date-error">
              {m.modal[error]}
            </p>
          )}
          <button
            className="button button-primary booking-submit"
            type="submit"
            disabled={!hasWhatsapp}
          >
            {m.modal.submit}
            <ArrowUpRight size={20} />
          </button>
          {!hasWhatsapp && (
            <p className="booking-pending" role="status">
              {m.modal.pending}. {m.modal.pendingDetail}
            </p>
          )}
          <p className="booking-disclaimer">{m.modal.disclaimer}</p>
        </form>
        <details className="rental-policy">
          <summary>
            <span>
              <strong>{m.modal.policyTitle}</strong>
              <small>{m.modal.policySubtitle}</small>
            </span>
            <ChevronRight size={18} aria-hidden="true" />
          </summary>
          <ul>
            {m.modal.policyItems.map((item) => (
              <li key={item}>
                <strong>{item.slice(0, item.indexOf(". ") + 1)}</strong>
                {item.slice(item.indexOf(". ") + 1)}
              </li>
            ))}
          </ul>
          <div className="rental-policy-cta">
            <strong>{m.modal.policyCta}</strong>
            <p>{m.modal.policyContact}</p>
          </div>
        </details>
      </div>
    </dialog>
  );
}
