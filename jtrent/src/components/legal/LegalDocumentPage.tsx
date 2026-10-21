import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieSettingsButton } from "@/components/privacy/CookieSettingsButton";
import { legalDocumentSlugs, type LegalDocumentKey } from "@/data/legal";
import type { Locale } from "@/data/motorcycles";
import type { Messages } from "@/lib/i18n";
import { site } from "@/config/site";

const copy = {
  es: {
    notice: {
      title: "Aviso legal",
      intro: "Información sobre el titular y las condiciones de uso de este sitio web.",
      sections: [
        {
          title: "Titular del sitio web",
          paragraphs: [
            `Nombre comercial: ${site.name}.`,
            `Correo electrónico: ${site.email}. Teléfono de contacto: +34 623 280 254.`,
            `Punto de recogida publicado: ${site.address}. Esta dirección es el punto de recogida comunicado en la web; el domicilio legal del titular no consta en los datos facilitados.`,
          ],
          pending: "La razón social o nombre completo del titular y su NIF/NIE/CIF están pendientes de confirmación. Si corresponde, también debe añadirse la inscripción registral. JT Rent debe completar estos datos antes de publicar el aviso como definitivo.",
        },
        {
          title: "Objeto y uso del sitio",
          paragraphs: [
            "Este sitio ofrece información sobre el alquiler de motos y scooters de JT Rent en Málaga y permite solicitar información de disponibilidad, precios y condiciones.",
            "La persona usuaria se compromete a utilizar el sitio de forma lícita, diligente y respetuosa, y a no realizar acciones que dañen su funcionamiento o los derechos de terceros.",
          ],
        },
        {
          title: "Solicitudes y contratación",
          paragraphs: [
            "Enviar una consulta o contactar por WhatsApp no confirma una reserva. La disponibilidad, el precio total, la documentación, la fianza y las condiciones aplicables se comunicarán antes de confirmar el alquiler y se formalizarán en el contrato correspondiente.",
          ],
        },
        {
          title: "Propiedad intelectual y enlaces",
          paragraphs: [
            "Los textos, fotografías, logotipos y demás elementos del sitio pertenecen a JT Rent o se utilizan con autorización de sus titulares. No se permite su reproducción o reutilización fuera de los límites legales sin autorización.",
            "Los enlaces a servicios de terceros, como Google Maps o WhatsApp, conducen a plataformas sujetas a sus propias condiciones y políticas de privacidad.",
          ],
        },
        {
          title: "Normativa y contacto",
          paragraphs: [
            "Este aviso se ofrece de acuerdo con la normativa española aplicable a los servicios de la sociedad de la información. Para comunicar una incidencia relacionada con el sitio, escribe a info@jt-rent.com.",
          ],
          links: [
            { label: "Ley 34/2002 (LSSI-CE), artículo 10 — BOE", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758" },
          ],
        },
      ],
    },
    privacy: {
      title: "Política de privacidad",
      intro: "Aquí explicamos qué datos se utilizan al contactar con JT Rent y cómo ejercer tus derechos.",
      sections: [
        {
          title: "Responsable del tratamiento",
          paragraphs: [
            `Nombre comercial: ${site.name}. Contacto: ${site.email}. Teléfono: +34 623 280 254.`,
            `Dirección de recogida publicada: ${site.address}. La identidad legal completa del responsable y su domicilio legal deben confirmarse con JT Rent antes de publicar esta política como definitiva.`,
          ],
          pending: "Pendiente de incorporar la razón social o nombre completo del responsable, NIF/NIE/CIF y domicilio legal. No se han inventado estos datos.",
        },
        {
          title: "Datos, finalidad y base jurídica",
          paragraphs: [
            "El formulario recoge nombre, correo electrónico y el contenido del mensaje. Se usan para responder a la consulta y, cuando corresponda, gestionar una petición de disponibilidad o preparar una posible reserva.",
            "Cuando preguntas por disponibilidad o una posible reserva, la base jurídica es atender las medidas precontractuales que solicitas. Para otras consultas, la base es el interés legítimo en responder a los mensajes recibidos. No incluyas datos sensibles en el mensaje.",
          ],
        },
        {
          title: "Envío del formulario y destinatarios",
          paragraphs: [
            "Si el formulario está conectado a Formspree, los datos se transmiten a ese proveedor para procesar la solicitud según la configuración de JT Rent. Si no está configurado, el sitio prepara un correo en la aplicación de email de tu dispositivo y tú decides si lo envías.",
            "La política de Formspree indica que puede tratar información en Estados Unidos y otros países. Si el formulario está activo, JT Rent debe verificar y documentar las garantías de las transferencias internacionales aplicables a su cuenta.",
            "Google Analytics solo se carga si aceptas la categoría de analítica. Google Maps solo se carga si autorizas el contenido externo de mapas. Al activar estos servicios, Google puede recibir datos técnicos del navegador conforme a sus propias políticas.",
            "Los proveedores técnicos que intervengan en el envío o alojamiento pueden tratar los datos necesarios para prestar esos servicios, conforme a sus condiciones y a los acuerdos aplicables.",
          ],
          links: [
            { label: "Privacidad de Formspree", href: "https://formspree.io/legal/privacy-policy/" },
            { label: "Privacidad de Google", href: "https://policies.google.com/privacy?hl=es" },
          ],
        },
        {
          title: "Conservación",
          paragraphs: [
            "Los mensajes deben conservarse solo durante el tiempo necesario para responder y gestionar la consulta y, después, durante los plazos legales aplicables. El plazo concreto de conservación debe confirmarlo y aplicarlo el responsable del tratamiento.",
          ],
        },
        {
          title: "Tus derechos",
          paragraphs: [
            "Puedes solicitar acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad cuando corresponda. También puedes retirar un consentimiento para servicios opcionales sin afectar a los tratamientos anteriores a su retirada.",
            "Para ejercer tus derechos, escribe a info@jt-rent.com e indica qué derecho deseas ejercer. También puedes reclamar ante la Agencia Española de Protección de Datos (AEPD).",
          ],
          links: [
            { label: "Cómo ejercer derechos — AEPD", href: "https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos" },
            { label: "Cómo presentar una reclamación — AEPD", href: "https://www.aepd.es/preguntas-frecuentes/13-reclamaciones/FAQ-1301-como-puedo-interponer-una-reclamacion-si-han-vulnerado-mis-datos-de-caracter-personal" },
          ],
        },
      ],
    },
    cookies: {
      title: "Política de cookies y almacenamiento",
      intro: "Puedes cambiar tus preferencias en cualquier momento. Los servicios opcionales no se activan hasta que los autorizas.",
      sections: [
        {
          title: "Almacenamiento necesario",
          paragraphs: [
            "El sitio guarda en el almacenamiento local del navegador la elección de privacidad con la clave jt-rent-consent-v1. Incluye preferencias de analítica y mapas y se considera válida durante 180 días. Este almacenamiento permite recordar tu decisión; no se utiliza para publicidad.",
          ],
        },
        {
          title: "Analítica opcional — Google Analytics",
          paragraphs: [
            "Si aceptas la analítica, se carga Google Analytics para medir el uso del sitio. Google puede utilizar cookies o tecnologías similares y recibir información técnica de navegación. La duración y los identificadores concretos dependen de la configuración activa del servicio y del navegador.",
          ],
          links: [
            { label: "Información de privacidad de Google", href: "https://policies.google.com/privacy?hl=es" },
          ],
        },
        {
          title: "Mapas opcionales — Google Maps",
          paragraphs: [
            "El mapa de Google Maps solo se inserta cuando aceptas esta categoría. Al cargarlo, Google recibe la solicitud del navegador y puede tratar datos técnicos conforme a sus condiciones y política de privacidad.",
          ],
          links: [
            { label: "Condiciones de Google Maps", href: "https://www.google.com/intl/es/help/terms_maps/" },
            { label: "Privacidad de Google", href: "https://policies.google.com/privacy?hl=es" },
          ],
        },
        {
          title: "Cómo cambiar o retirar tu elección",
          paragraphs: [
            "Usa el botón de abajo o el enlace «Cookies» del pie para volver a abrir el panel, aceptar o rechazar las categorías opcionales. También puedes borrar el almacenamiento del sitio desde la configuración de tu navegador; si lo haces, volveremos a preguntarte.",
          ],
        },
      ],
    },
  },
  en: {
    notice: {
      title: "Legal notice",
      intro: "Information about the website operator and the terms for using this website.",
      sections: [
        {
          title: "Website operator",
          paragraphs: [
            `Trading name: ${site.name}.`,
            `Email: ${site.email}. Contact phone: +34 623 280 254.`,
            `Published pickup point: ${site.address}. This is the pickup point shown on the website; the operator's legal address has not been supplied.`,
          ],
          pending: "The operator's full legal name and tax identification number are pending confirmation. Company registry details should also be added where applicable. JT Rent must complete these details before publishing this notice as final.",
        },
        {
          title: "Purpose and use of the website",
          paragraphs: [
            "This website provides information about JT Rent motorbike and scooter rentals in Malaga and lets visitors ask about availability, prices and rental terms.",
            "Visitors agree to use the website lawfully and responsibly and not to interfere with its operation or other people's rights.",
          ],
        },
        {
          title: "Enquiries and rental agreements",
          paragraphs: [
            "Sending an enquiry or contacting JT Rent on WhatsApp does not confirm a booking. Availability, total price, required documents, deposit and applicable terms will be communicated before a rental is confirmed and set out in the relevant agreement.",
          ],
        },
        {
          title: "Intellectual property and links",
          paragraphs: [
            "Website text, photographs, logos and other materials belong to JT Rent or are used with permission. Reuse outside the limits allowed by law requires permission from the rights holder.",
            "Links to third-party services such as Google Maps and WhatsApp lead to platforms governed by their own terms and privacy policies.",
          ],
        },
        {
          title: "Applicable rules and contact",
          paragraphs: [
            "This notice is provided under the Spanish rules applicable to information society services. To report a website issue, email info@jt-rent.com.",
          ],
          links: [
            { label: "Spanish E-Commerce Act 34/2002, section 10 — BOE", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758" },
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy policy",
      intro: "This page explains what data is used when you contact JT Rent and how to exercise your rights.",
      sections: [
        {
          title: "Data controller",
          paragraphs: [
            `Trading name: ${site.name}. Contact: ${site.email}. Phone: +34 623 280 254.`,
            `Published pickup address: ${site.address}. JT Rent must confirm the controller's full legal identity and legal address before this policy is finalised.`,
          ],
          pending: "The controller's full legal name, tax identification number and legal address have not been supplied. These details are not fabricated.",
        },
        {
          title: "Data, purposes and legal basis",
          paragraphs: [
            "The contact form collects your name, email address and message. These details are used to reply to your enquiry and, where relevant, handle an availability request or prepare a possible rental.",
            "The legal basis is taking steps at your request before entering into a contract and handling the communication related to your enquiry. Do not include sensitive personal data in your message.",
          ],
        },
        {
          title: "Form delivery and recipients",
          paragraphs: [
            "If the form is connected to Formspree, the data is sent to that provider to process the enquiry under JT Rent's configuration. If it is not configured, the website prepares an email in your device's email application and you choose whether to send it.",
            "Formspree's privacy policy says it may process information in the United States and other countries. If the form is active, JT Rent must verify and document the international transfer safeguards applicable to its account.",
            "Google Analytics loads only if you accept analytics. Google Maps loads only if you allow external map content. When enabled, Google may receive technical browser data under its own policies.",
            "Technical providers involved in form delivery or hosting may process the data needed to provide those services, under their terms and any applicable agreements.",
          ],
          links: [
            { label: "Formspree privacy policy", href: "https://formspree.io/legal/privacy-policy/" },
            { label: "Google privacy policy", href: "https://policies.google.com/privacy" },
          ],
        },
        {
          title: "Retention",
          paragraphs: [
            "Messages should be kept only for as long as needed to reply to and handle the enquiry and afterwards for applicable legal periods. The specific retention period must be confirmed and applied by the data controller.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "Where applicable, you may request access, correction, erasure, restriction, objection and data portability. You may also withdraw consent for optional services without affecting processing carried out before withdrawal.",
            "To exercise your rights, email info@jt-rent.com and state which right you wish to exercise. You can also complain to the Spanish Data Protection Authority (AEPD).",
          ],
          links: [
            { label: "Data protection rights — AEPD", href: "https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos" },
            { label: "AEPD", href: "https://www.aepd.es/" },
          ],
        },
      ],
    },
    cookies: {
      title: "Cookies and storage policy",
      intro: "You can change your preferences at any time. Optional services stay off until you allow them.",
      sections: [
        {
          title: "Necessary storage",
          paragraphs: [
            "The website stores your privacy choice in your browser's local storage under jt-rent-consent-v1. It includes analytics and map preferences and is treated as valid for 180 days. This storage remembers your choice and is not used for advertising.",
          ],
        },
        {
          title: "Optional analytics — Google Analytics",
          paragraphs: [
            "If you allow analytics, Google Analytics loads to measure website usage. Google may use cookies or similar technologies and receive technical browsing information. The specific identifiers and durations depend on the active service configuration and browser.",
          ],
          links: [
            { label: "Google privacy information", href: "https://policies.google.com/privacy" },
          ],
        },
        {
          title: "Optional maps — Google Maps",
          paragraphs: [
            "Google Maps is embedded only if you allow this category. When it loads, Google receives the browser request and may process technical information under its terms and privacy policy.",
          ],
          links: [
            { label: "Google Maps terms", href: "https://www.google.com/intl/en/help/terms_maps/" },
            { label: "Google privacy policy", href: "https://policies.google.com/privacy" },
          ],
        },
        {
          title: "Change or withdraw your choice",
          paragraphs: [
            "Use the button below or the Cookies link in the footer to reopen the panel and allow or reject optional categories. You can also clear this website's storage in your browser settings; if you do, we will ask again.",
          ],
        },
      ],
    },
  },
} as const;

type Section = {
  title: string;
  paragraphs: readonly string[];
  pending?: string;
  links?: readonly { label: string; href: string }[];
};

export function LegalDocumentPage({
  locale,
  document,
  messages,
}: {
  locale: Locale;
  document: LegalDocumentKey;
  messages: Messages;
}) {
  const content = copy[locale][document];
  const slugs = legalDocumentSlugs[locale];
  const otherDocuments: LegalDocumentKey[] = ["notice", "privacy", "cookies"];
  const labels =
    locale === "es"
      ? { back: "Volver a JT Rent", nav: "Información legal", close: "Configurar cookies" }
      : { back: "Back to JT Rent", nav: "Legal information", close: "Cookie settings" };

  return (
    <>
      <Header locale={locale} messages={messages} hasReviews={true} />
      <main id="main" className="legal-page">
        <div className="container legal-container">
          <Link className="legal-back" href={`/${locale}/`}>
            <ArrowLeft size={16} aria-hidden="true" />
            {labels.back}
          </Link>
          <p className="eyebrow legal-eyebrow">JT RENT · {labels.nav}</p>
          <h1>{content.title}</h1>
          <p className="legal-intro">{content.intro}</p>
          <nav className="legal-tabs" aria-label={labels.nav}>
            {otherDocuments.map((key) => (
              <Link
                key={key}
                href={`/${locale}/${slugs[key]}/`}
                aria-current={key === document ? "page" : undefined}
              >
                {copy[locale][key].title}
              </Link>
            ))}
          </nav>
          <div className="legal-sections">
            {content.sections.map((section: Section) => (
              <section className="legal-section" key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.pending && (
                  <p className="legal-pending" role="note">
                    {section.pending}
                  </p>
                )}
                {section.links && (
                  <ul className="legal-links">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          {document === "cookies" && (
            <div className="legal-cookie-settings">
              <CookieSettingsButton label={labels.close} />
            </div>
          )}
        </div>
      </main>
      <Footer locale={locale} messages={messages} hasReviews={true} />
    </>
  );
}
