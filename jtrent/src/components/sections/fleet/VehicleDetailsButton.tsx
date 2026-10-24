"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import type { Locale, Vehicle } from "@/data/motorcycles";
import type { Messages } from "@/lib/i18n";

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

export function VehicleDetailsButton({
  vehicle,
  locale,
  messages,
}: {
  vehicle: Vehicle;
  locale: Locale;
  messages: Messages;
}) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    requestAnimationFrame(() => button.current?.focus());
  }

  return (
    <>
      <button
        ref={button}
        type="button"
        className="vehicle-card-details"
        onPointerEnter={preloadBookingModal}
        onFocus={preloadBookingModal}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        {messages.fleet.viewConditions}
        <ChevronDown size={17} aria-hidden="true" />
      </button>
      {open && (
        <BookingModal
          vehicle={vehicle}
          locale={locale}
          messages={messages}
          onClose={close}
        />
      )}
    </>
  );
}
