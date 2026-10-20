import type { Locale } from "@/data/motorcycles";

export function LanguageFlag({ locale }: { locale: Locale }) {
  if (locale === "es") {
    return (
      <svg
        className="language-flag"
        viewBox="0 0 30 20"
        role="presentation"
        aria-hidden="true"
      >
        <rect width="30" height="20" fill="#AA151B" />
        <rect y="5" width="30" height="10" fill="#F1BF00" />
      </svg>
    );
  }

  return (
    <svg
      className="language-flag"
      viewBox="0 0 30 20"
      role="presentation"
      aria-hidden="true"
    >
      <rect width="30" height="20" fill="#012169" />
      <path d="M0 0 3.2 0 30 16.8V20h-3.2L0 3.2zM30 0h-3.2L0 16.8V20h3.2L30 3.2z" fill="#fff" />
      <path d="M0 0 1.5 0 30 18v2h-1.5L0 2zM30 0h-1.5L0 18v2h1.5L30 2z" fill="#C8102E" />
      <path d="M12 0h6v20h-6zM0 7h30v6H0z" fill="#fff" />
      <path d="M13.2 0h3.6v20h-3.6zM0 8.2h30v3.6H0z" fill="#C8102E" />
    </svg>
  );
}
