import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3001",
    browserName: "chromium",
    channel: "chrome",
    headless: true,
    trace: "retain-on-failure",
  },
  webServer: {
    command:
      "node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3001",
    url: "http://127.0.0.1:3001/es/",
    reuseExistingServer: false,
    timeout: 120000,
    // Test-only fixtures. No WhatsApp request leaves the browser (route mocked).
    env: {
      NEXT_PUBLIC_WHATSAPP_NUMBER: "34600000000",
      NEXT_PUBLIC_SITE_URL: "https://jt-rent.test",
    },
  },
});
