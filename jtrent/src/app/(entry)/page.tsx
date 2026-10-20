import Link from "next/link";

export default function Root() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/es/" />
      <main>
        <p>Redirigiendo a JT Rent…</p>
        <Link href="/es/">Continuar a JT Rent</Link>
      </main>
    </>
  );
}
