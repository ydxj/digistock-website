import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { FinalCTA } from "@/components/marketing/final-cta";
import { getAllPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Guides de gestion pour commerces et PME",
  description:
    "Guides pratiques pour les commerces marocains : gestion de stock, inventaire, crédits clients, stock minimum et réapprovisionnement.",
  path: "/blog",
});

export default function BlogIndex() {
  const posts = getAllPosts();
  const [first, ...rest] = posts;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Guides", path: "/blog" }]}
        eyebrow="Guides"
        title="Mieux gérer son commerce, concrètement."
        intro="Des méthodes simples, testées sur le terrain, pour gérer votre stock, vos inventaires et vos crédits clients. Avec ou sans logiciel."
      />
      <div className="container-site py-16 md:py-20">
        {first && (
          <article className="grid gap-6 border-b border-line pb-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12">
            <div>
              <p className="font-mono text-[0.75rem] font-medium tracking-[0.1em] text-brand-700 uppercase">{first.category}</p>
              <p className="mt-3 text-[0.8125rem] text-ink-500">
                <time dateTime={first.date}>{formatDate(first.date)}</time> · {first.readingTime} min de lecture
              </p>
            </div>
            <div>
              <h2 className="text-balance text-[1.75rem] leading-tight font-semibold tracking-[-0.025em] text-ink-950 sm:text-[2rem]">
                <Link href={`/blog/${first.slug}`} className="hover:text-brand-700">
                  {first.title}
                </Link>
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-600">{first.description}</p>
              <Link href={`/blog/${first.slug}`} className="mt-6 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-brand-700 hover:text-brand-800">
                Lire le guide <ArrowRight className="size-4" aria-hidden />
                <span className="sr-only"> : {first.title}</span>
              </Link>
            </div>
          </article>
        )}
        <ul className="divide-y divide-line">
          {rest.map((post) => (
            <li key={post.slug}>
              <article className="grid gap-3 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12">
                <div>
                  <p className="font-mono text-[0.75rem] font-medium tracking-[0.1em] text-brand-700 uppercase">{post.category}</p>
                  <p className="mt-2 text-[0.8125rem] text-ink-500">
                    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} min de lecture
                  </p>
                </div>
                <div>
                  <h2 className="text-[1.25rem] leading-snug font-semibold tracking-[-0.02em] text-ink-950">
                    <Link href={`/blog/${post.slug}`} className="hover:text-brand-700">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{post.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <FinalCTA location="blog-final" />
    </>
  );
}
