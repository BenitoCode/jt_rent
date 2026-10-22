import type { Metadata } from "next";
import { site } from "@/config/site";
import "../globals.css";

export const metadata: Metadata = {
  title: "Alquiler de motos y scooters en Málaga | JT Rent",
  description:
    "Alquiler de motos y scooters en Málaga con JT Rent. Consulta la Kymco Sky Town 125, el precio y la disponibilidad por WhatsApp antes de reservar.",
  metadataBase: new URL(site.url),
  robots: { index: true, follow: true },
  alternates: { canonical: "/es/" },
};
export default function EntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
