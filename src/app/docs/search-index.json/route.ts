import { getAllDocs } from "@/lib/content";

export const dynamic = "force-static";

/** Index de recherche de la documentation, généré au build. */
export function GET() {
  const index = getAllDocs().map((d) => ({
    slug: d.slug,
    title: d.title,
    description: d.description,
    section: d.section,
    headings: d.headings.map((h) => h.text),
    text: d.plain.slice(0, 2500),
  }));
  return Response.json(index, {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
