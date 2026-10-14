export type Locale = "es" | "en";
export type VehiclePhoto = {
  src: string;
  alt: Record<Locale, string>;
  width: number;
  height: number;
  role?: "main" | "side" | "front" | "dashboard";
};
export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  displacement: number;
  description: Record<Locale, string>;
  photos: VehiclePhoto[];
  features: ("engine" | "storage" | "phone" | "display")[];
  dailyPrice: number;
  previousPrice?: number;
  status: "available_for_inquiry" | "coming_soon";
  visible: boolean;
  showInFleet: boolean;
};

export const motorcycles: Vehicle[] = [
  {
    id: "kymco-sky-town-125",
    brand: "Kymco",
    model: "Sky Town 125",
    displacement: 125,
    description: {
      es: "La ciudad, la costa y todo lo que hay entre medias. Descubre Málaga a tu ritmo con la Kymco Sky Town 125.",
      en: "The city, the coast and everything in between. Discover Malaga at your own pace with the Kymco Sky Town 125.",
    },
    photos: [
      {
        src: "/images/kymco-three-quarter.jpeg",
        width: 768,
        height: 1026,
        role: "main",
        alt: {
          es: "Kymco Sky Town 125, vista de tres cuartos",
          en: "Kymco Sky Town 125, three-quarter view",
        },
      },
      {
        src: "/images/kymco-side.jpeg",
        width: 1233,
        height: 768,
        role: "side",
        alt: {
          es: "Kymco Sky Town 125 gris con baúl trasero, vista lateral",
          en: "Grey Kymco Sky Town 125 with rear top box, side view",
        },
      },
      {
        src: "/images/kymco-front.jpeg",
        width: 1376,
        height: 768,
        role: "front",
        alt: {
          es: "Kymco Sky Town 125, vista frontal",
          en: "Kymco Sky Town 125, front view",
        },
      },
      {
        src: "/images/kymco-dashboard.jpeg",
        width: 1376,
        height: 768,
        role: "dashboard",
        alt: {
          es: "Cuadro digital y soporte para móvil de la Kymco Sky Town 125",
          en: "Kymco Sky Town 125 digital dashboard and phone holder",
        },
      },
    ],
    features: ["engine", "storage", "phone", "display"],
    dailyPrice: 50,
    previousPrice: 70,
    status: "available_for_inquiry",
    visible: true,
    showInFleet: true,
  },
];
