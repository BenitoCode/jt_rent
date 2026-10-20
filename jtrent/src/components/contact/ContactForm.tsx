"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import type { Messages } from "@/lib/i18n";

type ContactFormProps = {
  formId: string;
  messages: Messages;
};

export function ContactForm({ formId, messages: m }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "unconfigured">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!formId) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const result = (await response.json()) as { ok?: boolean };
      if (!response.ok || result.ok !== true) {
        throw new Error("Form submission failed");
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="contact-form-card">
      <h3>{m.contact.formTitle}</h3>
      <p className="contact-card-description">{m.contact.formDescription}</p>
      <form
        className="contact-form"
        action={formId ? `https://formspree.io/f/${encodeURIComponent(formId)}` : undefined}
        method="POST"
        onSubmit={submit}
      >
        <div className="contact-field">
          <label htmlFor="contact-name">{m.contact.formName}</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder={m.contact.formNamePlaceholder}
            autoComplete="name"
            maxLength={120}
            required
          />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">{m.contact.formEmail}</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder={m.contact.formEmailPlaceholder}
            autoComplete="email"
            maxLength={254}
            required
          />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-message">{m.contact.formMessage}</label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder={m.contact.formMessagePlaceholder}
            minLength={10}
            maxLength={3000}
            required
          />
        </div>
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name="_gotcha"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <details className="contact-privacy">
          <summary>{m.contact.privacySummary}</summary>
          <p>{m.contact.privacyDetails}</p>
        </details>
        <label className="contact-privacy-check">
          <input name="privacy_acknowledged" type="checkbox" required />
          <span>{m.contact.privacyAcknowledgement}</span>
        </label>
        <button
          className="button button-primary contact-submit"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? m.contact.formSending : m.contact.formSubmit}
          <ArrowUpRight size={17} aria-hidden="true" />
        </button>
        {status === "success" && (
          <p className="contact-form-status is-success" role="status">
            {m.contact.formSuccess}
          </p>
        )}
        {status === "error" && (
          <p className="contact-form-status is-error" role="alert">
            {m.contact.formError} <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        )}
        {status === "unconfigured" && (
          <p className="contact-form-status is-error" role="alert">
            {m.contact.formUnconfigured} <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        )}
      </form>
      <p className="contact-form-footnote">{m.contact.formFootnote}</p>
    </div>
  );
}
