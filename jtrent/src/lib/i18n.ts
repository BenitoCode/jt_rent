import es from "@/messages/es.json";
import en from "@/messages/en.json";
import type { Locale } from "@/data/motorcycles";
export type Messages = typeof es;
export const locales: Locale[] = ["es", "en"];
export function isLocale(value: string): value is Locale {
  return value === "es" || value === "en";
}
export function getMessages(locale: Locale): Messages {
  return locale === "es" ? es : en;
}
export function formatPrice(price: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}
