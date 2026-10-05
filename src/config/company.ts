/**
 * Coordonnées de DigiStudio, éditeur de DigiStock.
 * Les champs vides ne sont pas affichés sur le site.
 */
export const company = {
  companyName: "DigiStudio",
  website: "https://digistudio.dev",
  websiteLabel: "digistudio.dev",
  /** Adresse e-mail de contact (ex. "contact@digistudio.dev"). */
  email: "",
  /** Téléphone au format international (ex. "+212600000000"). */
  phone: "",
  /** Numéro WhatsApp au format international sans "+" (ex. "212600000000"). */
  whatsapp: "",
  /** Ville / pays affichés sur la page contact. */
  location: "Maroc",
  socials: {
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
  },
} as const;

export type SocialKey = keyof typeof company.socials;

export function socialLinks(): { key: SocialKey; href: string }[] {
  return (Object.keys(company.socials) as SocialKey[])
    .map((key) => ({ key, href: company.socials[key] as string }))
    .filter((s) => s.href.length > 0);
}
