import { test } from "node:test";
import assert from "node:assert/strict";
import { validateDates, localToday } from "../src/lib/dates.ts";
import {
  generalMessage,
  vehicleMessage,
  whatsappUrl,
} from "../src/lib/whatsapp.ts";
import { motorcycles } from "../src/data/motorcycles.ts";
const today = "2026-10-13";

test("enquiries allow no dates or same-day returns", () => {
  assert.equal(validateDates("", "", today), null);
  assert.equal(validateDates(today, today, today), null);
});
test("rejects past, reversed, incomplete and impossible dates", () => {
  assert.equal(validateDates("2026-10-12", today, today), "pastError");
  assert.equal(validateDates("2026-10-15", "2026-10-14", today), "orderError");
  assert.equal(validateDates(today, "", today), "partialError");
  assert.equal(validateDates("", today, today), "partialError");
  assert.equal(
    validateDates("2027-02-30", "2027-03-02", today),
    "invalidError",
  );
  assert.equal(
    validateDates("not-a-date", "2027-03-02", today),
    "invalidError",
  );
});
test("today uses the local calendar date", () => {
  assert.equal(localToday(new Date(2026, 9, 13, 0, 1)), today);
});
test("invalid or missing WhatsApp numbers never generate links", () => {
  for (const number of [
    "",
    "abc",
    "+34600000000",
    "34 600000000",
    "012345678",
    "123",
  ])
    assert.equal(whatsappUrl(number, "hello"), null);
});
test("WhatsApp text round-trips with accents and euro signs", () => {
  const message = generalMessage("es");
  const url = new URL(whatsappUrl("34600000000", message)!);
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.searchParams.get("text"), message);
});
test("vehicle messages reuse the configured rate in both languages", () => {
  const vehicle = { ...motorcycles[0], dailyPrice: 63 };
  for (const locale of ["es", "en"] as const) {
    const plain = vehicleMessage(vehicle, locale);
    const dated = vehicleMessage(
      vehicle,
      locale,
      "2026-10-20",
      "2026-10-23",
      today,
    );
    assert.match(plain, /63/);
    assert.match(dated, /63/);
    assert.match(dated, /20.*23/);
    assert.match(plain, /Kymco Sky Town 125/);
    assert.doesNotMatch(plain, /70/);
  }
});
test("message generation refuses incomplete dates", () => {
  assert.throws(
    () => vehicleMessage(motorcycles[0], "es", today, "", today),
    /Invalid rental dates/,
  );
});
