import type { Messages } from "@/lib/i18n";

export function RentalFaq({ messages: m }: { messages: Messages }) {
  return (
    <section
      id="faq"
      className="rental-faq section-pad"
      aria-labelledby="rental-faq-title"
    >
      <div className="container">
        <header className="rental-faq-heading">
          <p className="eyebrow">{m.faq.eyebrow}</p>
          <h2 id="rental-faq-title">{m.faq.title}</h2>
        </header>
        <div className="rental-faq-list">
          {m.faq.items.map(({ question, answer }) => (
            <details className="rental-faq-item" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
