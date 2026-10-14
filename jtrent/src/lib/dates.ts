export type DateError =
  "partialError" | "pastError" | "orderError" | "invalidError";
export function localToday(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00`);
  return Number.isFinite(date.getTime()) && localToday(date) === value;
}
export function validateDates(
  pickup: string,
  dropoff: string,
  today = localToday(),
): DateError | null {
  if (!pickup && !dropoff) return null;
  if (!pickup || !dropoff) return "partialError";
  if (!validDate(pickup) || !validDate(dropoff)) return "invalidError";
  if (pickup < today) return "pastError";
  if (dropoff < pickup) return "orderError";
  return null;
}
export function formatDate(value: string, locale: "es" | "en") {
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}
