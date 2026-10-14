import { Award, Check, HandCoins, MapPinned } from "lucide-react";
import type { Messages } from "@/lib/i18n";

export function Journey({
  messages: m,
}: {
  messages: Messages;
}) {
  const steps = [
    { title: m.journey.oneTitle, text: m.journey.oneText, Icon: Award },
    {
      title: m.journey.twoTitle,
      text: m.journey.twoText,
      Icon: HandCoins,
    },
    { title: m.journey.threeTitle, text: m.journey.threeText, Icon: MapPinned },
  ];
  const benefits = [
    m.journey.benefitOne,
    m.journey.benefitTwo,
    m.journey.benefitThree,
    m.journey.benefitFour,
    m.journey.benefitFive,
    m.journey.benefitSix,
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
          {steps.map(({ title, text, Icon }) => (
            <article className="journey-step" key={title}>
              <div className="journey-step-top">
                <span className="journey-step-icon" aria-hidden="true">
                  <Icon size={23} strokeWidth={1.7} />
                </span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <section className="journey-benefits" aria-labelledby="benefits-title">
          <div className="journey-benefits-heading">
            <p className="eyebrow">{m.journey.benefitsEyebrow}</p>
            <h3 id="benefits-title">{m.journey.benefitsTitle}</h3>
          </div>
          <ul>
            {benefits.map((benefit) => (
              <li key={benefit}>
                <Check size={17} aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </section>
        <footer className="journey-cta">
          <p>{m.journey.closing}</p>
        </footer>
      </div>
    </section>
  );
}
