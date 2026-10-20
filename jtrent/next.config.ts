import type { NextConfig } from "next";
import { resolve } from "node:path";

const modernBrowserPolyfillStub = resolve(
  process.cwd(),
  "src/lib/modern-browser-polyfill-stub.js",
);

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    inlineCss: true,
  },
  webpack(webpackConfig, { dev, isServer }) {
    if (!dev && !isServer) {
      webpackConfig.resolve.alias = {
        ...(webpackConfig.resolve.alias ?? {}),
        "../build/polyfills/polyfill-module$": modernBrowserPolyfillStub,
        "next/dist/build/polyfills/polyfill-module$": modernBrowserPolyfillStub,
      };
    }

    return webpackConfig;
  },
};
export default config;
