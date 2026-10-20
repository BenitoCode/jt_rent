export const COOKIE_CONSENT_KEY = "jt-rent-consent-v1";
export const COOKIE_SETTINGS_EVENT = "jt-rent:open-cookie-settings";
export const COOKIE_CONSENT_EVENT = "jt-rent:cookie-consent-change";

export type CookieConsentValue = {
  necessary: true;
  analytics: boolean;
  maps: boolean;
  savedAt: string;
};

export function parseCookieConsent(value: string | null): CookieConsentValue | null {
  try {
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<CookieConsentValue>;
    if (parsed.necessary !== true || typeof parsed.analytics !== "boolean" || typeof parsed.maps !== "boolean") {
      return null;
    }
    const savedAt = typeof parsed.savedAt === "string" ? Date.parse(parsed.savedAt) : Number.NaN;
    if (!Number.isFinite(savedAt) || Date.now() - savedAt > 180 * 24 * 60 * 60 * 1000) return null;
    return {
      necessary: true,
      analytics: parsed.analytics,
      maps: parsed.maps,
      savedAt: parsed.savedAt as string,
    };
  } catch {
    return null;
  }
}

export function getCookieConsentSnapshot() {
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
}

export function readCookieConsent(): CookieConsentValue | null {
  return parseCookieConsent(getCookieConsentSnapshot());
}

export function subscribeCookieConsent(onChange: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function saveCookieConsent(
  consent: Omit<CookieConsentValue, "necessary" | "savedAt">,
) {
  const value: CookieConsentValue = {
    necessary: true,
    analytics: consent.analytics,
    maps: consent.maps,
    savedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
  } catch {
    // Consent still applies for the current page if storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
  return value;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}
