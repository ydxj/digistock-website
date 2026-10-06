import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { TableOfContents } from "@/components/docs/toc";
import { getAllDocs, getDoc, getDocNeighbours } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { techArticleSchema } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDocs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/docs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return buildMetadata({
    title: `${doc.title} — Documentation`,
    description: doc.description,
    path: `/docs/${slug}`,
    keywords: doc.keywords,
  });
}

export default async function DocPage({ params }: PageProps<"/docs/[slug]">) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();
  const { default: Content } = await import(`@content/docs/${slug}.mdx`);
  const { prev, next } = getDocNeighbours(slug);
  const path = `/docs/${slug}`;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-12 py-10 lg:py-12 xl:grid-cols-[minmax(0,1fr)_13rem]">
      <article className="min-w-0 max-w-[46rem]">
        <Breadcrumbs
          items={[
            { name: "Documentation", path: "/docs" },
            { name: doc.title, path },
          ]}
        />
        <header className="mt-6 border-b border-line pb-8">
          <p className="font-mono text-[0.75rem] font-medium tracking-[0.1em] text-brand-700 uppercase">{doc.section}</p>
          <h1 className="mt-3 text-balance text-[2rem] leading-tight font-semibold tracking-[-0.03em] text-ink-950 sm:text-[2.375rem]">
            {doc.title}
          </h1>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-ink-500">{doc.description}</p>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8125rem] text-ink-500">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden />
              {doc.readingTime} min de lecture
            </span>
            {doc.updatedAt && <span>Mis à jour le {formatDate(doc.updatedAt)}</span>}
          </p>
        </header>

        <div className="prose mt-8">
          <Content />
        </div>

        <nav aria-label="Pages précédente et suivante" className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
          {prev ? (
            <Link href={`/docs/${prev.slug}`} className="group rounded-lg border border-line p-4 transition-colors hover:border-ink-200 hover:bg-surface">
              <span className="inline-flex items-center gap-1 text-[0.75rem] text-ink-500">
                <ArrowLeft className="size-3.5" aria-hidden /> Précédent
              </span>
              <span className="mt-1 block text-[0.9375rem] font-medium text-ink-950 group-hover:text-brand-700">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/docs/${next.slug}`}
              className="group rounded-lg border border-line p-4 text-right transition-colors hover:border-ink-200 hover:bg-surface"
            >
              <span className="inline-flex items-center gap-1 text-[0.75rem] text-ink-500">
                Suivant <ArrowRight className="size-3.5" aria-hidden />
              </span>
              <span className="mt-1 block text-[0.9375rem] font-medium text-ink-950 group-hover:text-brand-700">{next.title}</span>
            </Link>
          )}
        </nav>

        <p className="mt-10 text-[0.875rem] text-ink-500">
          Une question sur cette page ?{" "}
          <Link href="/contact" className="font-medium text-brand-700 hover:text-brand-800">
            Contactez l&apos;équipe DigiStock
          </Link>
          .
        </p>
      </article>

      <aside className="hidden xl:block">
        <TableOfContents headings={doc.headings} className="sticky top-[calc(var(--header-h)+40px)]" />
      </aside>

      <JsonLd
        data={techArticleSchema({ title: doc.title, description: doc.description, path, dateModified: doc.updatedAt })}
      />
    </div>
  );
}
