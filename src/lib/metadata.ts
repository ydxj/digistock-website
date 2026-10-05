import type { Metadata } from "next";
import { absoluteUrl, seo } from "@/config/seo";

type BuildMetadataInput = {
  /** Titre court : le suffixe « | DigiStock » est ajouté automatiquement. */
  title?: string;
  /** Titre complet, sans suffixe. */
  absoluteTitle?: string;
  description: string;
  path: string;
  keywords?: string[];
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Image Open Graph spécifique (sinon : image du segment ou image par défaut). */
  image?: { url: string; width: number; height: number; alt: string };
  /** true si le segment possède son propre fichier opengraph-image. */
  segmentImage?: boolean;
};

/** Métadonnées cohérentes pour chaque page : canonical, Open Graph, Twitter, robots. */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const { title, absoluteTitle, description, path, keywords, noindex, type = "website", image } = input;
  const fullTitle = absoluteTitle ?? (title ? `${title} | ${seo.siteName}` : seo.defaultTitle);
  const url = absoluteUrl(path);
  // Image par défaut (générée par src/app/opengraph-image.tsx). Les segments qui
  // définissent leur propre opengraph-image (ex. articles) la remplacent.
  const ogImage = image ?? { url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "DigiStock — La gestion de stock pensée pour votre entreprise" };

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords,
    alternates: {
      canonical: url,
      // Prêt pour l'internationalisation : ajouter "ar-MA" / "en" ici.
      languages: { "fr-MA": url, "x-default": url },
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: seo.siteName,
      locale: seo.locale,
      ...(type === "article" && input.publishedTime
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime ?? input.publishedTime }
        : {}),
      ...(input.segmentImage ? {} : { images: [ogImage] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(seo.twitterHandle ? { site: seo.twitterHandle } : {}),
      ...(input.segmentImage ? {} : { images: [ogImage.url] }),
    },
  };
}
