const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
function publicUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.origin : undefined;
  } catch {
    return undefined;
  }
}

export const site = {
  name: "JT Rent",
  url: publicUrl(configuredUrl),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "34623280254",
  whatsappContacts: ["34623280254", "34622759365"],
  email: "info@jt-rent.com",
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim() || "",
  address: "Calle Alejandro Puskin, 29011 M\u00e1laga, Espa\u00f1a",
  hours: { es: "", en: "" },
  logo: "/images/logo-jt.png",
  legal: { notice: "", privacy: "", cookies: "", rental: "" },
};
