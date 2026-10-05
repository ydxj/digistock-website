import type { MetadataRoute } from "next";

/**
 * Manifeste du site vitrine (et non de l'application DigiStock pour Windows).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DigiStock — Site officiel",
    short_name: "DigiStock",
    description: "Logiciel de gestion de stock et de caisse pour les entreprises marocaines.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#071126",
    lang: "fr-MA",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
