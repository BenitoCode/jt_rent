import { ArrowUpRight } from "lucide-react";
import type { Messages } from "@/lib/i18n";

export function Journey({ messages: m }: { messages: Messages }) {
  const steps = [
    [m.journey.oneTitle, m.journey.oneText],
    [m.journey.twoTitle, m.journey.twoText],
    [m.journey.threeTitle, m.journey.threeText],
  ];
  return (
    <section
      id="how-to-rent"
      className="journey section-pad"
      aria-labelledby="journey-title"
    >
      <div className="container">
        <div className="journey-heading">
          <p className="eyebrow">{m.journey.eyebrow}</p>
          <h2 id="journey-title">{m.journey.title}</h2>
          <ArrowUpRight size={42} strokeWidth={1.2} aria-hidden="true" />
        </div>
        <div className="journey-grid">
          {steps.map(([title, text], i) => (
            <div className="journey-step" key={title}>
              <span className="step-index">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
