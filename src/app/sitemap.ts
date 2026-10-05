import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/seo";
import { features } from "@/data/features";
import { solutions } from "@/data/solutions";
import { releases } from "@/data/changelog";
import { getAllDocs, getAllPosts } from "@/lib/content";

/** Sitemap généré au build : pages, fonctionnalités, solutions, documentation et guides. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly", lastModified: Date = now) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  const posts = getAllPosts();
  const docs = getAllDocs();

  return [
    page("/", 1, "weekly"),
    page("/fonctionnalites", 0.9),
    page("/telecharger", 0.9, "weekly"),
    page("/tarifs", 0.8),
    page("/solutions", 0.8),
    page("/faq", 0.7),
    page("/docs", 0.7, "weekly"),
    page("/blog", 0.7, "weekly"),
    page("/contact", 0.5, "yearly"),
    ...features.map((f) => page(`/features/${f.slug}`, 0.8)),
    ...solutions.map((s) => page(`/solutions/${s.slug}`, 0.8)),
    ...docs.map((d) => page(`/docs/${d.slug}`, 0.6, "monthly", d.updatedAt ? new Date(d.updatedAt) : now)),
    ...posts.map((p) => page(`/blog/${p.slug}`, 0.7, "monthly", new Date(p.updatedAt ?? p.date))),
    ...(releases.length > 0 ? [page("/changelog", 0.4)] : []),
    page("/politique-confidentialite", 0.2, "yearly"),
    page("/conditions-utilisation", 0.2, "yearly"),
  ];
}
