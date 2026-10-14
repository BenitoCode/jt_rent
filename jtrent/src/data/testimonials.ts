import type { Locale } from "./motorcycles";

export type Testimonial = {
  id: string;
  name: string;
  quote: Record<Locale, string>;
  source: string;
  sourceUrl?: string;
  verified: boolean;
  image?: {
    src: string;
    alt: Record<Locale, string>;
    width: number;
    height: number;
  };
  video?: { src: string; captions: Record<Locale, string> };
};
export const testimonials: Testimonial[] = [];
