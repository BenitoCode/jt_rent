"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_SETTINGS_EVENT,
  getCookieConsentSnapshot,
  parseCookieConsent,
  readCookieConsent,
  saveCookieConsent,
  subscribeCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookie-consent";
import type { Locale } from "@/data/motorcycles";
import { site } from "@/config/site";

type Props = { locale: Locale };

function updateGoogleConsent(analytics: boolean) {
  const measurementId = site.analyticsMeasurementId;
  if (!measurementId) return;

  const browser = window as unknown as Window & {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
    [key: string]: unknown;
  };
  browser[`ga-disable-${measurementId}`] = !analytics;

  if (!analytics && !document.getElementById("jt-rent-google-analytics")) return;

  browser.dataLayer = browser.dataLayer || [];
  browser.gtag = browser.gtag || ((...args: unknown[]) => browser.dataLayer?.push(args));
  const gtag = browser.gtag;
  if (!gtag) return;
  const scriptExists = Boolean(document.getElementById("jt-rent-google-analytics"));
  if (!scriptExists) {
    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "granted",
      security_storage: "granted",
    });
  }
  gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  if (!scriptExists) {
    const script = document.createElement("script");
    script.id = "jt-rent-google-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
    gtag("js", new Date());
    gtag("config", measurementId);
  }
}

export function CookieConsent({ locale }: Props) {
  const isSpanish = locale === "es";
  const serializedConsent = useSyncExternalStore(
    subscribeCookieConsent,
    getCookieConsentSnapshot,
    () => null,
  );
  const hydrated = useSyncExternalStore(() => () => {}, () => true, () => false);
  const consent = parseCookieConsent(serializedConsent);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [maps, setMaps] = useState(false);

  useEffect(() => {
    const openSettings = () => {
      const current = readCookieConsent();
      setAnalytics(current?.analytics ?? false);
      setMaps(current?.maps ?? false);
      setSettingsOpen(true);
    };
    const consentChanged = (event: Event) => {
      const value = (event as CustomEvent<CookieConsentValue>).detail;
      setAnalytics(value.analytics);
      setMaps(value.maps);
      setSettingsOpen(false);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    window.addEventListener(COOKIE_CONSENT_EVENT, consentChanged);
    return () => {
      window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
      window.removeEventListener(COOKIE_CONSENT_EVENT, consentChanged);
    };
  }, []);

  const analyticsAllowed = consent?.analytics ?? false;
  const hasConsent = Boolean(consent);
  useEffect(() => {
    if (hydrated && hasConsent) updateGoogleConsent(analyticsAllowed);
  }, [analyticsAllowed, hasConsent, hydrated]);

  const bannerOpen = hydrated && !consent && !settingsOpen;
  if (!hydrated || (!bannerOpen && !settingsOpen)) return null;

  const choose = (all: boolean) => {
    saveCookieConsent({ analytics: all, maps: all });
    setSettingsOpen(false);
  };
  const savePreferences = () => {
    saveCookieConsent({ analytics, maps });
    setSettingsOpen(false);
  };

  return (
    <div className="cookie-consent-backdrop">
      <section
        className="cookie-consent-panel"
        role="region"
        aria-label={isSpanish ? "Preferencias de privacidad" : "Privacy preferences"}
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <p className="cookie-consent-eyebrow">{isSpanish ? "PRIVACIDAD Y COOKIES" : "PRIVACY & COOKIES"}</p>
        <h2 id="cookie-consent-title">
          {settingsOpen
            ? isSpanish ? "Configura tus preferencias" : "Set your preferences"
            : isSpanish ? "Tu privacidad importa" : "Your privacy matters"}
        </h2>
        <p id="cookie-consent-description" className="cookie-consent-description">
          {isSpanish
            ? "Usamos almacenamiento necesario para recordar tu elección. Si lo permites, Google Analytics mide el uso de la web y Google Maps carga el mapa. Puedes aceptar, rechazar o configurar estas opciones."
            : "We use necessary storage to remember your choice. With your permission, Google Analytics measures site use and Google Maps loads the map. You can accept, reject, or configure these options."}
        </p>

        {settingsOpen && (
          <div className="cookie-preferences">
            <div className="cookie-preference-row">
              <div>
                <strong>{isSpanish ? "Necesarias" : "Necessary"}</strong>
                <p>{isSpanish ? "Guardan tu elección de privacidad y permiten funciones básicas. Siempre activas." : "Remember your privacy choice and enable basic functions. Always active."}</p>
              </div>
              <span className="cookie-always-on">{isSpanish ? "Siempre activas" : "Always active"}</span>
            </div>
            <label className="cookie-preference-row" htmlFor="cookie-analytics">
              <span>
                <strong>{isSpanish ? "Analítica — Google Analytics" : "Analytics — Google Analytics"}</strong>
                <p>{isSpanish ? "Ayuda a entender cómo se utiliza la web. Se activa solo si lo aceptas." : "Helps us understand how the site is used. Enabled only if you agree."}</p>
              </span>
              <input id="cookie-analytics" type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
            </label>
            <label className="cookie-preference-row" htmlFor="cookie-maps">
              <span>
                <strong>{isSpanish ? "Contenido externo — Google Maps" : "External content — Google Maps"}</strong>
                <p>{isSpanish ? "Permite cargar el mapa integrado. Google puede recibir datos técnicos del navegador." : "Allows the embedded map to load. Google may receive technical browser data."}</p>
              </span>
              <input id="cookie-maps" type="checkbox" checked={maps} onChange={(event) => setMaps(event.target.checked)} />
            </label>
          </div>
        )}

        <div className="cookie-consent-actions">
          {settingsOpen ? (
            <>
              <button
                className="cookie-button cookie-button-secondary"
                type="button"
                onClick={() => {
                  setSettingsOpen(false);
                }}
              >
                {isSpanish ? "Volver" : "Back"}
              </button>
              <button className="cookie-button cookie-button-primary" type="button" onClick={savePreferences}>
                {isSpanish ? "Guardar selección" : "Save choices"}
              </button>
            </>
          ) : (
            <>
              <button className="cookie-button cookie-button-primary" type="button" onClick={() => choose(true)}>
                {isSpanish ? "Aceptar todas" : "Accept all"}
              </button>
              <button className="cookie-button cookie-button-secondary" type="button" onClick={() => choose(false)}>
                {isSpanish ? "Rechazar opcionales" : "Reject optional"}
              </button>
              <button className="cookie-button cookie-button-secondary" type="button" onClick={() => setSettingsOpen(true)}>
                {isSpanish ? "Configurar" : "Customize"}
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
