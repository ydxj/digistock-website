import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { ContentSections } from "@/components/marketing/content-sections";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { DownloadButton } from "@/components/marketing/download-button";
import { FinalCTA } from "@/components/marketing/final-cta";
import { ButtonLink } from "@/components/ui/button";
import { FAQList } from "@/components/ui/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { getFeature } from "@/data/features";
import { getSolution, solutions } from "@/data/solutions";
import { buildMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";
import { frenchSpacing } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return buildMetadata({
    title: solution.meta.title,
    description: solution.meta.description,
    path: `/solutions/${slug}`,
    keywords: solution.meta.keywords,
  });
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();
  const featureItems = solution.features.map((f) => getFeature(f)!);
  const others = solutions.filter((s) => s.slug !== solution.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Solutions", path: "/solutions" },
          { name: solution.plural, path: `/solutions/${solution.slug}` },
        ]}
        eyebrow={solution.hero.eyebrow}
        title={solution.hero.title}
        intro={solution.hero.intro}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <DownloadButton location={`solution-${solution.slug}`} size="lg" />
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Poser une question
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="challenges-title" className="container-wide py-16 md:py-20">
        <h2 id="challenges-title" className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink-950">
          Ce qui complique le quotidien
        </h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {solution.challenges.map((c, i) => (
            <li key={c.title} className="bg-white p-6">
              <span className="font-mono text-[0.75rem] text-ink-500">0{i + 1}</span>
              <h3 className="mt-2 text-[0.9375rem] font-semibold text-ink-950">{c.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-500">{frenchSpacing(c.text)}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="container-wide pb-16 md:pb-24">
        <div className="border-t border-line pt-12 md:pt-16">
          <ContentSections sections={solution.sections} />
        </div>
      </div>

      <section aria-labelledby="sol-features" className="border-y border-line bg-surface py-16 md:py-20">
        <div className="container-wide">
          <h2 id="sol-features" className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink-950">
            Les fonctionnalités les plus utiles pour les {solution.plural.toLowerCase()}
          </h2>
          <div className="mt-8">
            <FeatureGrid items={featureItems} columns={featureItems.length % 3 === 0 ? 3 : 4} />
          </div>
          <div className="mt-8 flex flex-col gap-2 rounded-xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.9375rem] text-ink-600">
              <span className="font-semibold text-ink-950">Offre conseillée : {solution.recommendedPlan.plan}.</span>{" "}
              {frenchSpacing(solution.recommendedPlan.reason)}
            </p>
            <Link href="/tarifs" className="inline-flex shrink-0 items-center gap-1 text-[0.875rem] font-medium text-brand-700 hover:text-brand-800">
              Voir les tarifs <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="sol-faq" className="container-wide py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <div>
            <h2 id="sol-faq" className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink-950 sm:text-[1.75rem]">
              Questions fréquentes
            </h2>
            <p className="mt-8 text-[0.8125rem] font-semibold text-ink-950">Autres métiers</p>
            <ul className="mt-3 space-y-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/solutions/${o.slug}`} className="text-[0.9375rem] text-ink-600 hover:text-brand-700">
                    {o.plural}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <FAQList items={solution.faq} />
        </div>
      </section>

      <FinalCTA location={`solution-${solution.slug}-final`} />
      <JsonLd data={faqSchema(solution.faq)} />
    </>
  );
}
