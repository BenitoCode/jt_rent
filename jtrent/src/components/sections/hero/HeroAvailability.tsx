"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CalendarDays, MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { localToday, validateDates, formatDate, type DateError } from "@/lib/dates";
import { whatsappUrl } from "@/lib/whatsapp";
import {
  readRentalDates,
  RENTAL_DATES_CHANGE_EVENT,
  saveRentalDates,
  type RentalDates,
} from "@/lib/rental-dates";
import type { Locale } from "@/data/motorcycles";
import type { Messages } from "@/lib/i18n";

export function HeroAvailability({
  locale,
  messages: m,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [error, setError] = useState<DateError | null>(null);
  const [today] = useState(() => localToday());
  const href = whatsappUrl(site.whatsapp, "");

  useEffect(() => {
    const dates = readRentalDates();
    setPickup(dates.pickup);
    setDropoff(dates.dropoff);
    function syncDates(event: Event) {
      const nextDates = (event as CustomEvent<RentalDates>).detail;
      setPickup(nextDates.pickup);
      setDropoff(nextDates.dropoff);
    }
    window.addEventListener(RENTAL_DATES_CHANGE_EVENT, syncDates);
    return () => window.removeEventListener(RENTAL_DATES_CHANGE_EVENT, syncDates);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const invalid = validateDates(pickup, dropoff, today);
    setError(invalid);
    if (invalid) return;

    const dates = pickup
      ? locale === "es"
        ? ` para recogerla el ${formatDate(pickup, locale)} y devolverla el ${formatDate(dropoff, locale)}`
        : ` for pick-up on ${formatDate(pickup, locale)} and return on ${formatDate(dropoff, locale)}`
      : "";
    const message =
      locale === "es"
        ? `Hola JT Rent, quiero consultar disponibilidad de un scooter${dates}. ¿Podéis confirmarme disponibilidad, precio y condiciones?`
        : `Hi JT Rent, I would like to check scooter availability${dates}. Could you confirm availability, price and rental terms?`;
    const target = whatsappUrl(site.whatsapp, message);
    if (target) window.open(target, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="hero-availability" onSubmit={submit}>
      <div className="hero-availability-heading">
        <div>
          <h2>{m.hero.availabilityTitle}</h2>
          <p>{m.hero.availabilityHint}</p>
        </div>
        <span className="hero-availability-note">{m.modal.optional}</span>
      </div>
      <label className="hero-date-field">
        <span>{m.modal.pickup}</span>
        <span className="hero-date-input">
          <CalendarDays size={17} aria-hidden="true" />
          <input
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
            aria-describedby={error ? "hero-date-error" : undefined}
          />
        </span>
      </label>
      <label className="hero-date-field">
        <span>{m.modal.return}</span>
        <span className="hero-date-input">
          <CalendarDays size={17} aria-hidden="true" />
          <input
            type="date"
            lang={locale}
            min={pickup || today}
            value={dropoff}
            onChange={(event) => {
              const nextDropoff = event.target.value;
              setDropoff(nextDropoff);
              saveRentalDates(pickup, nextDropoff);
              setError(null);
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "hero-date-error" : undefined}
          />
        </span>
      </label>
      <button className="button button-primary hero-availability-submit" type="submit" disabled={!href}>
        <MessageCircle size={18} aria-hidden="true" />
        {m.hero.availabilityAction}
      </button>
      {error && (
        <p className="hero-date-error" id="hero-date-error" role="alert">
          {m.modal[error]}
        </p>
      )}
    </form>
  );
}
