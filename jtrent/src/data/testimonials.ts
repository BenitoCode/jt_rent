import type { Locale } from "./motorcycles";

export type Testimonial = {
  id: string;
  name: string;
  quote: Record<Locale, string>;
  source: string;
  sourceUrl?: string;
  rating?: number;
  date?: Record<Locale, string>;
  verified: boolean;
  image?: {
    src: string;
    alt: Record<Locale, string>;
    width: number;
    height: number;
  };
  video?: { src: string; captions: Record<Locale, string> };
};
const joseGoogleReview =
  "No los conocía, y ahora que los conozco van a ser siempre a los que les alquile, muy buen servicio, rápido y eficaz. Contad conmigo para la próxima.";

export const testimonials: Testimonial[] = [
  {
    id: "jose-gallardo-peral-google-review",
    name: "Jose Gallardo Peral",
    quote: { es: joseGoogleReview, en: joseGoogleReview },
    source: "Google",
    sourceUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJR7Xj9zpdZUURUU3Mk-BNFGw",
    rating: 5,
    verified: true,
  },
];
