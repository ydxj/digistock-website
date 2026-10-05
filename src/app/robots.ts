import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/seo";

export default function robots(): MetadataRoute.Robots {
  // Les déploiements de prévisualisation Vercel ne doivent pas être indexés.
  const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";
  if (isPreview) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
