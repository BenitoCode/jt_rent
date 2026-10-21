import { Award, HandCoins, MapPinned } from "lucide-react";
import type { Messages } from "@/lib/i18n";

export function Journey({
  messages: m,
}: {
  messages: Messages;
}) {
  const steps = [
    { title: m.journey.oneTitle, Icon: Award },
    {
      title: m.journey.twoTitle,
      Icon: HandCoins,
    },
    { title: m.journey.threeTitle, Icon: MapPinned },
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
          {steps.map(({ title, Icon }) => (
            <article className="journey-step" key={title}>
              <div className="journey-step-top">
                <span className="journey-step-icon" aria-hidden="true">
                  <Icon size={23} strokeWidth={1.7} />
                </span>
              </div>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
