"use client";

import { openCookieSettings } from "@/lib/cookie-consent";

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button className="cookie-settings-link" type="button" onClick={openCookieSettings}>
      {label}
    </button>
  );
}
