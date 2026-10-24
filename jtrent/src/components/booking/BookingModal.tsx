"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Luggage,
  Smartphone,
  PanelTop,
} from "lucide-react";
import { site } from "@/config/site";
import { formatPrice, type Messages } from "@/lib/i18n";
import { vehicleMessage, whatsappUrl } from "@/lib/whatsapp";
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
  const touch = useRef<number | null>(null);
  const [photo, setPhoto] = useState(() => {
    const sidePhoto = vehicle.photos.findIndex((item) => item.role === "side");
    return sidePhoto >= 0 ? sidePhoto : 0;
  });
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
  return (
    <dialog
      className="booking-modal"
      ref={dialog}
      aria-labelledby="booking-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
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
      <button
        className="icon-button modal-close"
        aria-label={m.modal.close}
        onClick={onClose}
        autoFocus
      >
        <X size={20} />
      </button>
      <div className="modal-product-overview">
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
      </div>
      <div className="modal-product-summary">
        <div>
          <h2 id="booking-title">
            {vehicle.brand} {vehicle.model}
          </h2>
        </div>
        <div className="modal-features modal-summary-features">
          <ul>
            {vehicle.features.slice(0, 3).map((feature) => {
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
        <div className="modal-price">
          <div>
            <strong>{formatPrice(vehicle.dailyPrice, locale)}</strong>
            <span>{m.modal.day}</span>
            {vehicle.previousPrice !== undefined && (
              <del>{formatPrice(vehicle.previousPrice, locale)}</del>
            )}
          </div>
          <small>{m.modal.total}</small>
        </div>
        <a
          className="button button-primary modal-summary-cta"
          href={whatsappUrl(site.whatsapp, vehicleMessage(vehicle, locale)) ?? "#contact"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {m.modal.viewConditionsAvailability}<ArrowUpRight size={19} />
        </a>
        <nav className="modal-summary-links" aria-label={m.modal.beforeBooking}>
          <a href="#rental-terms">{m.modal.depositInsurance}</a>
          <a href="#rental-terms">{m.modal.licenseAge}</a>
        </nav>
      </div>
      </div>
      <div className="modal-details">
        <section className="modal-steps" aria-labelledby="modal-steps-title">
          <h3 id="modal-steps-title">{m.modal.stepsTitle}</h3>
          <ol>
            {m.modal.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{step.title}</strong></div>
                {index < m.modal.steps.length - 1 && <ArrowUpRight className="modal-step-arrow" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </section>
        <section id="rental-terms" className="modal-terms">
        <h3>{m.modal.beforeBooking}</h3>
        <div className="modal-policy-groups">
          {m.modal.policyGroups.map((group) => (
            <details className="rental-policy" key={group.title}>
              <summary>
                <span><strong>{group.title}</strong></span>
                <ChevronRight size={18} aria-hidden="true" />
              </summary>
              <ul>
                {group.indexes.map((index) => {
                  const item = m.modal.policyItems[index];
                  return (
                    <li key={item}>
                      <strong>{item.slice(0, item.indexOf(". ") + 1)}</strong>
                      {item.slice(item.indexOf(". ") + 1)}
                    </li>
                  );
                })}
              </ul>
            </details>
          ))}
        </div>
        </section>
      </div>
    </dialog>
  );
}
