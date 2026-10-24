import { ArrowUpRight, MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { generalMessage, whatsappUrl } from "@/lib/whatsapp";
import type { Locale } from "@/data/motorcycles";
import type { Messages } from "@/lib/i18n";

export function WhatsAppLink({
  locale,
  messages,
  label,
  className = "button button-primary",
  compactOnMobile = false,
  showArrow = true,
}: {
  locale: Locale;
  messages: Messages;
  label: string;
  className?: string;
  compactOnMobile?: boolean;
  showArrow?: boolean;
}) {
  const href = whatsappUrl(site.whatsapp, generalMessage(locale));
  return href ? (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={compactOnMobile ? label : undefined}
      title={compactOnMobile ? label : undefined}
    >
      <MessageCircle size={18} />
      {compactOnMobile ? (
        <span className="header-consult-label">{label}</span>
      ) : (
        label
      )}
      {showArrow && <ArrowUpRight size={18} />}
    </a>
  ) : (
    <div className="pending-action">
      <button
        type="button"
        className={className}
        aria-label={compactOnMobile ? label : undefined}
        disabled
      >
        <MessageCircle size={18} />
        {compactOnMobile ? (
          <span className="header-consult-label">{label}</span>
        ) : (
          label
        )}
        {showArrow && <ArrowUpRight size={18} />}
      </button>
      <span className="pending-caption">{messages.modal.pending}</span>
    </div>
  );
}
