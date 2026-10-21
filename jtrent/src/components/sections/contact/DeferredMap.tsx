"use client";

import { useSyncExternalStore } from "react";
import {
  openCookieSettings,
  readCookieConsent,
  subscribeCookieConsent,
} from "@/lib/cookie-consent";

export function DeferredMap({
  src,
  title,
  blockedTitle,
  blockedDescription,
  configureLabel,
}: {
  src: string;
  title: string;
  blockedTitle: string;
  blockedDescription: string;
  configureLabel: string;
}) {
  const allowed = useSyncExternalStore(
    subscribeCookieConsent,
    () => readCookieConsent()?.maps ?? false,
    () => false,
  );

  if (allowed) {
    return (
      <iframe
        className="contact-map"
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div className="contact-map-placeholder" role="group" aria-label={blockedTitle}>
      <strong>{blockedTitle}</strong>
      <p>{blockedDescription}</p>
      <button className="button button-primary" type="button" onClick={openCookieSettings}>
        {configureLabel}
      </button>
    </div>
  );
}
