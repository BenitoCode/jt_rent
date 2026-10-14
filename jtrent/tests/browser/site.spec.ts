import { expect, test } from "@playwright/test";

test("JT motorcycle follows page scroll and respects reduced motion", async ({
  page,
}) => {
  await page.goto("/es/");
  const motos = page.locator(".scroll-moto");
  const moto = motos.first();
  await expect(moto).toBeAttached();
  await expect(motos).toHaveCount(6);
  await expect
    .poll(() =>
      moto.evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
  await expect(moto).toHaveCSS("opacity", "0.14");
  const initialPosition = await moto.evaluate((image) => {
    const bounds = image.getBoundingClientRect();
    const logo = document
      .querySelector(".brand-link .brand-logo-window")
      ?.getBoundingClientRect();
    const matrix = new DOMMatrixReadOnly(image.style.transform);
    return {
      x: matrix.m41,
      y: matrix.m42,
      paintedLeft: bounds.left + bounds.width * 0.12,
      logoLeft: logo?.left,
    };
  });
  if (initialPosition.logoLeft === undefined)
    throw new Error("Header logo is missing");
  expect(
    Math.abs(initialPosition.paintedLeft - initialPosition.logoLeft),
  ).toBeLessThan(2);
  const initialPositions = await motos.evaluateAll((images) =>
    images.map((image) => {
      const transform = new DOMMatrixReadOnly(image.style.transform);
      return { x: transform.m41, direction: Math.sign(transform.a) };
    }),
  );
  expect(initialPositions.map((position) => position.direction)).toEqual([
    1, -1, 1, -1, 1, -1,
  ]);
  const initialWidth = await moto.evaluate((image) =>
    image.getBoundingClientRect().width,
  );
  expect(initialWidth).toBeLessThan(130);

  await page.evaluate(() =>
    window.scrollTo({ top: 300, behavior: "instant" }),
  );
  await page.waitForFunction(
    (positions) =>
      Array.from(document.querySelectorAll(".scroll-moto")).every(
        (image, index) => {
          const currentX = new DOMMatrixReadOnly(
            (image as HTMLImageElement).style.transform,
          ).m41;
          return positions[index].direction === 1
            ? currentX > positions[index].x
            : currentX < positions[index].x;
        },
      ),
    initialPositions,
  );
  const scrolledPositions = await motos.evaluateAll((images) =>
    images.map((image) => new DOMMatrixReadOnly(image.style.transform).m41),
  );
  for (const [index, x] of scrolledPositions.entries()) {
    const delta = x - initialPositions[index].x;
    expect(
      Math.sign(delta),
      `motorcycle ${index + 1} should move in its assigned direction`,
    ).toBe(initialPositions[index].direction);
  }
  const slowPosition = await moto.evaluate((image) => {
    const matrix = new DOMMatrixReadOnly(image.style.transform);
    return { x: matrix.m41, y: matrix.m42 };
  });
  expect(slowPosition.y - initialPosition.y).toBeGreaterThan(0);
  expect(slowPosition.y - initialPosition.y).toBeLessThanOrEqual(52);
  expect(slowPosition.x).toBeGreaterThan(initialPosition.x);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(moto).toHaveCSS("display", "none");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(moto).toHaveCSS("opacity", "0");
});

test("contact section presents accurate fleet and direct contact options", async ({
  page,
}) => {
  for (const locale of ["es", "en"]) {
    await page.goto(`/${locale}/`);
    const contact = page.locator("#contact");
    await expect(contact).toHaveCSS("background-color", "rgb(245, 245, 245)");
    await expect(contact).toContainText(
      locale === "es"
        ? "Somos dos jóvenes emprendedores y estamos poniendo en marcha JT Rent en Málaga"
        : "We’re two young entrepreneurs starting JT Rent in Malaga",
    );
    await expect(contact).toContainText("Kymco Sky Town 125");
    await expect(
      contact.locator('.contact-channel[href^="https://wa.me/"]'),
    ).toHaveCount(2);
    await expect(
      contact.locator('a[href="mailto:tomulilourenco@gmail.com"]'),
    ).toHaveCount(2);
    await expect(contact).toContainText("+34 623 280 254");
    await expect(contact).toContainText("+34 622 759 365");
    await expect(contact).toContainText("Calle Alejandro Puskin, Málaga 29011");
    await expect(
      contact.locator('.contact-channel[href^="https://www.google.com/maps/"]'),
    ).toHaveCount(1);
  }
});

test("floating WhatsApp action is an accessible icon-only button", async ({
  page,
}) => {
  for (const locale of ["es", "en"]) {
    await page.goto(`/${locale}/`);
    const floatingWhatsapp = page.locator(".whatsapp-float");
    await expect(floatingWhatsapp).toBeVisible();
    await expect(floatingWhatsapp).toHaveAccessibleName(
      locale === "es" ? "Escríbenos por WhatsApp" : "Message us on WhatsApp",
    );
    await expect(floatingWhatsapp.locator("svg")).toHaveCount(1);
    await expect(floatingWhatsapp).toHaveText("");
    await expect(floatingWhatsapp).toHaveCSS("border-radius", "50%");
    await expect(floatingWhatsapp).toHaveCSS("width", "54px");
  }
});

test("both languages fit all eight target widths", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const locale of ["es", "en"]) {
    await page.goto(`/${locale}/`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(
      locale === "es"
        ? "Alquiler de motos en Málaga"
        : "Motorbike & Scooter Rental in Malaga",
    );
    await expect(page.locator(".hero-ctas .button").first()).toContainText(
      locale === "es" ? "Reservar por WhatsApp" : "Book via WhatsApp",
    );
    await expect(page.locator(".hero-ctas a[href='#fleet']")).toContainText(
      locale === "es" ? "Ver flota" : "View fleet",
    );
    await expect(page.locator(".footer-whatsapp")).toContainText(
      locale === "es" ? "Hablar por WhatsApp" : "Chat on WhatsApp",
    );
    const floatingWhatsapp = page.locator(".whatsapp-float");
    await expect(floatingWhatsapp).toBeVisible();
    await expect(floatingWhatsapp).toHaveAccessibleName(
      locale === "es" ? "Escríbenos por WhatsApp" : "Message us on WhatsApp",
    );
    await expect(floatingWhatsapp.locator("svg")).toHaveCount(1);
    await expect(floatingWhatsapp).toHaveText("");
    await expect(floatingWhatsapp).toHaveCSS("border-radius", "50%");
    const floatingHref = await floatingWhatsapp.getAttribute("href");
    if (floatingHref === null)
      throw new Error("Floating WhatsApp link is missing");
    const floatingUrl = new URL(floatingHref);
    expect(floatingUrl.origin).toBe("https://wa.me");
    expect(floatingUrl.searchParams.get("text")).not.toContain("Kymco");
    await expect(page.locator("#reviews")).toHaveCount(0);
    await expect(page.locator("#fleet-title")).toHaveText(
      locale === "es"
        ? "Alquiler de motos en Málaga"
        : "Motorbike rental in Malaga",
    );
    await expect(page.locator("#fleet .vehicle-card")).toHaveCount(1);
    await expect(page.locator("#fleet .vehicle-card")).toContainText(
      "Kymco Sky Town 125",
    );
    await expect(
      page.locator("#fleet .vehicle-card .card-price strong"),
    ).toContainText("50");
    await expect(
      page.locator("#fleet .vehicle-card .card-price del"),
    ).toContainText("70");
    await expect(page.locator("#fleet .coming-card")).toHaveCount(2);
    await expect(page.locator("#fleet .coming-photo img")).toHaveCount(0);
    await expect(
      page.locator("#fleet .coming-card button, #fleet .coming-card a"),
    ).toHaveCount(0);
    for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      const sizes = await page.evaluate(() => ({
        actual: innerWidth,
        content: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
      }));
      expect(sizes.actual).toBe(width);
      expect(sizes.content, `${locale} at ${width}`).toBeLessThanOrEqual(
        sizes.viewport,
      );
    }
  }
  expect(errors).toEqual([]);
});

test("fleet describes rental and reserves non-bookable slots for future bikes", async ({
  page,
}) => {
  for (const locale of ["es", "en"]) {
    await page.goto(`/${locale}/`);
    const intro = page.locator(".fleet-intro");
    await expect(intro).toContainText(
      locale === "es" ? "por días o semanas" : "by the day or week",
    );
    await expect(intro).toContainText("WhatsApp");
    await expect(page.locator(".fleet-facts li")).toHaveCount(3);
    await expect(page.locator(".coming-card")).toHaveCount(2);
    await expect(page.locator(".coming-card")).toContainText(
      locale === "es" ? "Próxima incorporación" : "Coming to the fleet",
    );
    await expect(page.locator(".coming-card img")).toHaveCount(0);
    await expect(
      page.locator(".coming-card a, .coming-card button"),
    ).toHaveCount(0);
    await expect(page.locator("#fleet .vehicle-card")).toContainText(
      "Kymco Sky Town 125",
    );
    await page.locator("#fleet .vehicle-card").click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("#booking-title")).toHaveText(
      "Kymco Sky Town 125",
    );
    await expect(dialog.locator(".modal-price strong")).toContainText("50");
    await expect(dialog.locator(".modal-price del")).toContainText("70");
    await expect(dialog.locator(".gallery-dots button")).toHaveCount(4);
    await dialog
      .getByRole("button", {
        name: locale === "es" ? "Fotografía siguiente" : "Next photo",
      })
      .click();
    await expect(dialog.locator(".gallery-caption")).toContainText(
      locale === "es" ? "vista lateral" : "side view",
    );
    await dialog
      .getByRole("button", {
        name: locale === "es" ? "Cerrar detalles" : "Close details",
      })
      .click();
    await expect(dialog).toBeHidden();
  }
});

test("mobile menu supports keyboard and language switching preserves section", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/es/");
  const toggle = page.getByRole("button", { name: "Abrir menú" });
  await toggle.click();
  await expect(page.locator("#mobile-menu a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "Flota", exact: true })
    .click();
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  await expect(page).toHaveURL(/#fleet$/);
  await toggle.click();
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "English" })
    .click();
  await expect(page).toHaveURL(/\/en\/#fleet$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("desktop header balances brand, navigation and actions", async ({
  page,
}) => {
  for (const width of [1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/es/");
    const positions = await page.evaluate(() => {
      const brand = document.querySelector(".brand-link");
      const nav = document.querySelector(".desktop-nav");
      const actions = document.querySelector(".header-actions");
      if (!brand || !nav || !actions)
        throw new Error("Desktop header elements are missing");
      const brandBounds = brand.getBoundingClientRect();
      const navBounds = nav.getBoundingClientRect();
      const actionsBounds = actions.getBoundingClientRect();
      return {
        navigationCenter: (navBounds.left + navBounds.right) / 2,
        availableCenter: (brandBounds.right + actionsBounds.left) / 2,
      };
    });
    expect(
      Math.abs(positions.navigationCenter - positions.availableCenter),
    ).toBeLessThanOrEqual(2);
    await expect(page.locator(".header-book")).toBeVisible();
    await expect(page.locator(".desktop-language")).toBeVisible();
  }
});

test("SEO uses the configured domain and rejects unsupported locales", async ({
  page,
}) => {
  await page.goto("/en/");
  await expect(page).toHaveTitle(
    "Motorbike & Scooter Rental in Malaga | JT Rent",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://jt-rent.test/en/",
  );
  await expect(page.locator('link[hreflang="es"]')).toHaveAttribute(
    "href",
    "https://jt-rent.test/es/",
  );
  const response = await page.goto("/fr/");
  expect(response?.status()).toBe(404);
});

test("save review screenshots with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/es/");
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/es/");
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
});

test("original logo and hero photo load, and the Kymco is in the fleet", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["es", "en"]) {
    await page.goto(`/${locale}/`);
    await expect(page.locator(".header .brand-image")).toBeVisible();
    await expect(page.locator(".header .brand-title")).toHaveText("JT Rent.");
    await expect(page.locator(".header .brand-tagline")).toHaveText(
      locale === "es"
        ? "Málaga · Alquiler de motos"
        : "Málaga · Scooter rental",
    );
    await expect
      .poll(() =>
        page
          .locator(".header .brand-image")
          .evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
      )
      .toBe(true);
    await expect(page.locator(".hero-photo-frame img")).toHaveAttribute(
      "alt",
      locale === "es"
        ? "Una persona en un scooter blanco recorre una calle andaluza al atardecer"
        : "A person rides a white scooter down an Andalusian street at sunset",
    );
    await expect
      .poll(() =>
        page
          .locator(".hero-photo-frame img")
          .evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
      )
      .toBe(true);
    const heroGallery = page.locator(".hero-gallery");
    await expect(heroGallery).toHaveAttribute(
      "aria-roledescription",
      locale === "es" ? "carrusel" : "carousel",
    );
    await expect(heroGallery.locator(".hero-gallery-dots button")).toHaveCount(
      3,
    );
    await expect(
      heroGallery.locator('.hero-gallery-dots button[aria-pressed="true"]'),
    ).toHaveCount(1);
    await heroGallery
      .getByRole("button", {
        name: locale === "es" ? "Foto siguiente" : "Next photo",
      })
      .click();
    await expect(heroGallery.locator(".hero-photo-frame img")).toHaveAttribute(
      "alt",
      locale === "es"
        ? "Una pareja en un scooter rojo junto al puerto de Málaga"
        : "A couple on a red scooter by Malaga harbour",
    );
    await expect
      .poll(() =>
        heroGallery
          .locator(".hero-photo-frame img")
          .evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
      )
      .toBe(true);
    await heroGallery
      .getByRole("button", {
        name: locale === "es" ? "Foto 3" : "Photo 3",
      })
      .click();
    await expect(heroGallery.locator(".hero-photo-frame img")).toHaveAttribute(
      "alt",
      locale === "es"
        ? "Un scooter negro junto a la costa mediterránea y las palmeras"
        : "A black scooter beside the Mediterranean coast and palm trees",
    );
    await heroGallery
      .getByRole("button", {
        name: locale === "es" ? "Foto siguiente" : "Next photo",
      })
      .click();
    await expect(heroGallery.locator(".hero-photo-frame img")).toHaveAttribute(
      "alt",
      locale === "es"
        ? "Una persona en un scooter blanco recorre una calle andaluza al atardecer"
        : "A person rides a white scooter down an Andalusian street at sunset",
    );
    await heroGallery
      .getByRole("button", {
        name: locale === "es" ? "Foto anterior" : "Previous photo",
      })
      .click();
    await expect(heroGallery.locator(".hero-photo-frame img")).toHaveAttribute(
      "alt",
      locale === "es"
        ? "Un scooter negro junto a la costa mediterránea y las palmeras"
        : "A black scooter beside the Mediterranean coast and palm trees",
    );
    await expect(page.locator("#fleet .vehicle-card")).toContainText(
      "Kymco Sky Town 125",
    );
    await expect(page.locator("#fleet .card-image img")).toHaveAttribute(
      "alt",
      locale === "es"
        ? "Kymco Sky Town 125 gris con baúl trasero, vista lateral"
        : "Grey Kymco Sky Town 125 with rear top box, side view",
    );
    await expect(page.locator("#fleet .coming-photo")).toHaveCount(2);
    await expect(page.locator("#fleet .coming-photo img")).toHaveCount(0);
  }
});

test("hero carousel advances automatically every two seconds", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/es/");
  const image = page.locator(".hero-photo-frame img");
  await expect(image).toHaveAttribute(
    "alt",
    "Una persona en un scooter blanco recorre una calle andaluza al atardecer",
  );
  await expect
    .poll(() => image.getAttribute("alt"), { timeout: 3000 })
    .toBe("Una pareja en un scooter rojo junto al puerto de Málaga");
});

test("hero carousel respects reduced-motion preference", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/es/");
  const image = page.locator(".hero-photo-frame img");
  const initialAlt =
    "Una persona en un scooter blanco recorre una calle andaluza al atardecer";
  await expect(image).toHaveAttribute("alt", initialAlt);
  await page.waitForTimeout(2200);
  await expect(image).toHaveAttribute("alt", initialAlt);
});
