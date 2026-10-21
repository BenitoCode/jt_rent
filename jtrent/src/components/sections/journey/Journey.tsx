import type { Messages } from "@/lib/i18n";

export function Journey({
  messages: m,
}: {
  messages: Messages;
}) {
  const steps = [
    { title: m.journey.oneTitle, description: m.journey.oneText },
    { title: m.journey.twoTitle, description: m.journey.twoText },
    { title: m.journey.threeTitle, description: m.journey.threeText },
  ];
  return (
    <section
      id="how-to-rent"
      className="journey section-pad"
      aria-labelledby="journey-title"
    >
      <div className="container">
        <header className="journey-intro">
          <p className="eyebrow">{m.journey.eyebrow}</p>
          <h2 id="journey-title">{m.journey.title}</h2>
          <p>{m.journey.description}</p>
        </header>
        <div className="journey-grid">
          {steps.map(({ title, description }, index) => (
            <article className="journey-step" key={title}>
              <div className="journey-step-top">
                <span className="journey-step-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
