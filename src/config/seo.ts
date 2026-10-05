function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const seo = {
  siteName: "DigiStock",
  defaultTitle: "DigiStock — Logiciel de gestion de stock et caisse au Maroc",
  titleTemplate: "%s | DigiStock",
  defaultDescription:
    "Gérez stock, ventes, achats, clients, crédits et fournisseurs avec DigiStock, le logiciel Windows simple et moderne conçu pour les entreprises marocaines.",
  locale: "fr_MA",
  language: "fr",
  /** Langues prévues : ajoutez "ar" ou "en" quand les traductions existent. */
  locales: ["fr"] as const,
  defaultLocale: "fr" as const,
  twitterHandle: "",
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "",
  },
  keywords: [
    "logiciel gestion de stock",
    "logiciel de gestion de stock Maroc",
    "application gestion de stock",
    "logiciel caisse Maroc",
    "logiciel inventaire Maroc",
    "gestion stock magasin",
    "logiciel gestion stock Windows",
    "gestion de stock hors ligne",
    "logiciel crédit client",
    "logiciel pour PME Maroc",
  ],
};

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
