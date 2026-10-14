import { formatDate, validateDates } from "./dates.ts";
import type { Locale, Vehicle } from "../data/motorcycles.ts";

export function whatsappUrl(number: string, text: string): string | null {
  if (!/^[1-9]\d{6,14}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
export function generalMessage(locale: Locale) {
  return locale === "es"
    ? "Hola JT Rent, me gustaría alquilar un scooter en Málaga. ¿Podéis indicarme disponibilidad y condiciones?"
    : "Hi JT Rent, I would like to rent a scooter in Malaga. Could you confirm availability and rental conditions?";
}
export function vehicleMessage(
  vehicle: Vehicle,
  locale: Locale,
  pickup = "",
  dropoff = "",
  today?: string,
) {
  if (validateDates(pickup, dropoff, today))
    throw new Error("Invalid rental dates");
  const name = `${vehicle.brand} ${vehicle.model}`;
  const price = new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(vehicle.dailyPrice);
  if (locale === "es") {
    return pickup
      ? `Hola JT Rent, quiero consultar disponibilidad para la ${name} del ${formatDate(pickup, locale)} al ${formatDate(dropoff, locale)}. He visto la tarifa anunciada de ${price} al día. ¿Podéis confirmarme disponibilidad, precio total y condiciones de alquiler?`
      : `Hola JT Rent, estoy interesado en alquilar la ${name}. He visto la tarifa anunciada de ${price} al día. ¿Podéis indicarme disponibilidad y condiciones?`;
  }
  return pickup
    ? `Hi JT Rent, I would like to check availability for the ${name} from ${formatDate(pickup, locale)} to ${formatDate(dropoff, locale)}. I saw the advertised rate of ${price} per day. Could you confirm availability, total price and rental conditions?`
    : `Hi JT Rent, I am interested in renting the ${name}. I saw the advertised rate of ${price} per day. Could you confirm availability and rental conditions?`;
}
