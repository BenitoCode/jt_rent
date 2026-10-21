export type RentalDates = {
  pickup: string;
  dropoff: string;
};

const STORAGE_KEY = "jt-rent:selected-rental-dates";
export const RENTAL_DATES_CHANGE_EVENT = "jt-rent:rental-dates-change";
const EMPTY_DATES: RentalDates = { pickup: "", dropoff: "" };

export function readRentalDates(): RentalDates {
  if (typeof window === "undefined") return EMPTY_DATES;

  try {
    const value = window.sessionStorage.getItem(STORAGE_KEY);
    if (!value) return EMPTY_DATES;
    const dates = JSON.parse(value) as Partial<RentalDates>;
    return {
      pickup: typeof dates.pickup === "string" ? dates.pickup : "",
      dropoff: typeof dates.dropoff === "string" ? dates.dropoff : "",
    };
  } catch {
    return EMPTY_DATES;
  }
}

export function saveRentalDates(pickup: string, dropoff: string) {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ pickup, dropoff } satisfies RentalDates),
    );
  } catch {
    // Keep date selection usable when browser storage is unavailable.
  }

  window.dispatchEvent(
    new CustomEvent<RentalDates>(RENTAL_DATES_CHANGE_EVENT, {
      detail: { pickup, dropoff },
    }),
  );
}
