import { absoluteUrl, seo, siteUrl } from "@/config/seo";
import { company } from "@/config/company";
import { product } from "@/config/product";
import { plans } from "@/config/pricing";
import { socialLinks } from "@/config/company";

/**
 * Générateurs de données structurées schema.org.
 * Aucune note, aucun avis et aucun nombre d'utilisateurs n'est déclaré :
 * uniquement des informations vérifiables.
 */

export const ORG_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;
export const SOFTWARE_ID = `${siteUrl}/#software`;

export function organizationSchema() {
  const sameAs = [company.website, ...socialLinks().map((s) => s.href)];
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: company.companyName,
    url: company.website,
    logo: absoluteUrl("/images/brand/digistock-icon.png"),
    sameAs,
    ...(company.email ? { email: company.email } : {}),
    ...(company.phone ? { telephone: company.phone } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: seo.siteName,
    url: siteUrl,
    inLanguage: "fr-MA",
    publisher: { "@id": ORG_ID },
  };
}

export function softwareApplicationSchema() {
  const free = plans.find((p) => p.id === "free");
  return {
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: product.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Gestion de stock et point de vente",
    operatingSystem: product.operatingSystems.join(", "),
    ...(product.currentVersion ? { softwareVersion: product.currentVersion } : {}),
    ...(product.releaseDate ? { datePublished: product.releaseDate } : {}),
    ...(product.downloadUrl ? { downloadUrl: product.downloadUrl } : {}),
    description: seo.defaultDescription,
    url: siteUrl,
    image: absoluteUrl("/images/app/pos-light.webp"),
    screenshot: [absoluteUrl("/images/app/pos-light.webp"), absoluteUrl("/images/app/dashboard-dark.webp")],
    inLanguage: "fr",
    publisher: { "@id": ORG_ID },
    ...(free
      ? {
          offers: {
            "@type": "Offer",
            name: `${product.name} ${free.name}`,
            price: "0",
            priceCurrency: product.currency.code,
            ...(product.downloadUrl ? { availability: "https://schema.org/InStock" } : {}),
            url: absoluteUrl("/telecharger"),
          },
        }
      : {}),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  keywords?: string[];
}) {
  return {
    "@type": "Article",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: "fr-MA",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
  };
}

export function techArticleSchema(input: { title: string; description: string; path: string; dateModified?: string }) {
  return {
    "@type": "TechArticle",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    inLanguage: "fr-MA",
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    about: { "@id": SOFTWARE_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function howToSchema(input: { name: string; description: string; steps: { name: string; text: string }[] }) {
  return {
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    step: input.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
  };
}
