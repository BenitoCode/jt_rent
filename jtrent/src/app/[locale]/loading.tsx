import Image from "next/image";
import { site } from "@/config/site";

export default function Loading() {
  return (
    <main className="route-loading" role="status" aria-live="polite">
      <Image
        src={site.logo}
        alt="JT Rent"
        width={88}
        height={88}
        className="route-loading-logo"
        priority
      />
      <span className="route-loading-spinner" aria-hidden="true" />
      <span className="route-loading-label">Cargando JT Rent…</span>
    </main>
  );
}
