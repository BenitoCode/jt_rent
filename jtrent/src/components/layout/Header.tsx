"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Brand } from "@/components/ui/Brand";
import type { Locale } from "@/data/motorcycles";
import type { Messages } from "@/lib/i18n";

export function Header({
  locale,
  messages: m,
  hasReviews,
}: {
  locale: Locale;
  messages: Messages;
  hasReviews: boolean;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const sectionOnOpen = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    const media = window.matchMedia("(min-width: 901px)");
    function closeOnDesktop() {
      if (media.matches) setOpen(false);
    }
    document.addEventListener("keydown", escape);
    media.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", escape);
      media.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  function currentSection() {
    const sections = ["fleet", "how-to-rent", "reviews", "faq", "contact"];
    return sections.findLast((id) => {
      const element = document.getElementById(id);
      return element && element.getBoundingClientRect().top <= 180;
    });
  }

  function languageLink(
    event: React.MouseEvent<HTMLAnchorElement>,
    target: Locale,
  ) {
    event.preventDefault();
    const current = open
      ? window.location.hash.slice(1) || sectionOnOpen.current
      : currentSection();
    setOpen(false);
    router.push(`/${target}/${current ? `#${current}` : window.location.hash}`);
  }
  const language = (
    <div className="language-switch" aria-label={m.nav.language}>
      {(["es", "en"] as Locale[]).map((lang) => (
        <a
          key={lang}
          href={`/${lang}/`}
          lang={lang}
          aria-label={lang === "es" ? "Español" : "English"}
          aria-current={lang === locale ? "page" : undefined}
          onClick={(event) => languageLink(event, lang)}
        >
          {lang.toUpperCase()}
        </a>
      ))}
    </div>
  );
  const links = (
    <>
      <a href="#fleet" onClick={() => setOpen(false)}>
        {m.nav.fleet}
      </a>
      <a href="#how-to-rent" onClick={() => setOpen(false)}>
        {m.nav.howToRent}
      </a>
      <a href="#faq" onClick={() => setOpen(false)}>
        {m.nav.faq}
      </a>
      {hasReviews && (
        <a href="#reviews" onClick={() => setOpen(false)}>
          {m.nav.reviews}
        </a>
      )}
      <a href="#contact" onClick={() => setOpen(false)}>
        {m.nav.contact}
      </a>
    </>
  );
  return (
    <header className="header">
      <div className="container header-inner">
        <a href={`/${locale}/`} className="brand-link" aria-label="JT Rent">
          <Brand header locale={locale} />
        </a>
        <nav
          className="desktop-nav"
          aria-label={locale === "es" ? "Principal" : "Main"}
        >
          {links}
        </nav>
        <div className="header-actions">
          <div className="desktop-language">{language}</div>
          <button
            ref={toggle}
            className="icon-button menu-toggle"
            aria-label={open ? m.nav.close : m.nav.open}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              if (!open) sectionOnOpen.current = currentSection();
              setOpen(!open);
            }}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" ref={menu} className="mobile-menu">
          <nav aria-label={locale === "es" ? "Menú móvil" : "Mobile menu"}>
            {links}
          </nav>
          {language}
        </div>
      )}
    </header>
  );
}
