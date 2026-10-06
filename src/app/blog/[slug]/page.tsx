import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { TableOfContents } from "@/components/docs/toc";
import { FinalCTA } from "@/components/marketing/final-cta";
import { getAllPosts, getPost } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { articleSchema } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    absoluteTitle: `${post.title} | DigiStock`,
    description: post.description,
    path: `/blog/${slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updatedAt,
    segmentImage: true,
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { default: Content } = await import(`@content/blog/${slug}.mdx`);
  const path = `/blog/${slug}`;
  const related = (post.related ?? [])
    .map((s) => getPost(s))
    .filter((p) => p !== undefined)
    .slice(0, 3);
  const fallback = getAllPosts().filter((p) => p.slug !== slug && !related.some((r) => r.slug === p.slug));
  const relatedPosts = [...related, ...fallback].slice(0, 3);

  return (
    <>
      <article>
        <header className="border-b border-line">
          <div className="container-site pt-8 pb-14 md:pb-16">
            <Breadcrumbs
              items={[
                { name: "Guides", path: "/blog" },
                { name: post.title, path },
              ]}
            />
            <div className="mt-12 max-w-3xl md:mt-16">
              <p className="font-mono text-[0.75rem] font-medium tracking-[0.1em] text-brand-700 uppercase">{post.category}</p>
              <h1 className="mt-4 text-balance text-[2.125rem] leading-[1.1] font-semibold tracking-[-0.035em] text-ink-950 sm:text-[2.75rem]">
                {post.title}
              </h1>
              <p className="mt-5 text-[1.125rem] leading-relaxed text-ink-600">{post.description}</p>
              <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-ink-500">
                <span>Par l&apos;équipe DigiStock</span>
                <span>
                  Mis à jour le <time dateTime={post.updatedAt ?? post.date}>{formatDate(post.updatedAt ?? post.date)}</time>
                </span>
                <span>{post.readingTime} min de lecture</span>
              </p>
            </div>
          </div>
        </header>

        <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-12 py-14 md:py-16 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16">
          <div className="prose min-w-0 max-w-[42rem]">
            <Content />
          </div>
          <aside className="hidden lg:block">
            <TableOfContents headings={post.headings.filter((h) => h.depth === 2)} className="sticky top-[calc(var(--header-h)+40px)]" />
          </aside>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section aria-labelledby="related-posts" className="border-t border-line bg-surface py-14 md:py-16">
          <div className="container-site">
            <h2 id="related-posts" className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink-950">
              Guides liés
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedPosts.map((p) => (
                <li key={p.slug} className="flex">
                  <Link href={`/blog/${p.slug}`} className="group flex w-full flex-col rounded-xl border border-line bg-white p-6 transition-shadow hover:shadow-md">
                    <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-ink-500 uppercase">{p.category}</span>
                    <span className="mt-2 text-[1rem] leading-snug font-semibold text-ink-950 group-hover:text-brand-700">{p.title}</span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[0.8125rem] font-medium text-ink-500 group-hover:text-brand-700">
                      Lire <ArrowRight className="size-3.5" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCTA
        location={`post-${slug}`}
        title="Passez à la pratique avec DigiStock."
        description="Stock, caisse, inventaire et crédits clients dans une application Windows qui fonctionne hors ligne. Version gratuite sans limite."
      />
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          path,
          datePublished: post.date,
          dateModified: post.updatedAt,
          keywords: post.keywords,
          image: "/images/app/dashboard-dark.webp",
        })}
      />
    </>
  );
}
