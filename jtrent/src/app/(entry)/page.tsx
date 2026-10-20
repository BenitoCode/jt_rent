"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/config/site";

export default function Root() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/es/");
  }, [router]);

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
      <span className="route-loading-label">Abriendo JT Rent…</span>
      <Link className="route-loading-link" href="/es/">
        Continuar a JT Rent
      </Link>
    </main>
  );
}
