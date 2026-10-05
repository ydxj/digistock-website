import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { ContentSections, HighlightGrid, StepList } from "@/components/marketing/content-sections";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { ScreenshotFrame } from "@/components/marketing/screenshot-frame";
import { DownloadButton } from "@/components/marketing/download-button";
import { FinalCTA } from "@/components/marketing/final-cta";
import { ButtonLink } from "@/components/ui/button";
import { FAQList } from "@/components/ui/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { plainText } from "@/components/ui/rich-text";
import { features, getFeature } from "@/data/features";
import { screens } from "@/data/screens";
import { solutions } from "@/data/solutions";
import { buildMetadata } from "@/lib/metadata";
import { faqSchema, howToSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/features/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) return {};
  return buildMetadata({
    title: feature.meta.title,
    description: feature.meta.description,
    path: `/features/${slug}`,
    keywords: feature.meta.keywords,
  });
}

export default async function FeaturePage({ params }: PageProps<"/features/[slug]">) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();

  const related = feature.related.map((s) => getFeature(s)!).filter(Boolean);
  const relatedSolutions = solutions.filter((s) => s.features.includes(feature.slug)).slice(0, 3);
  const screen =
    feature.screen === "pos"
      ? { image: screens[1].light!, alt: screens[1].alt, tone: "light" as const }
      : feature.screen === "dashboard"
        ? { image: screens[0].dark!, alt: screens[0].alt, tone: "dark" as const }
        : null;

  const schemas: Record<string, unknown>[] = [faqSchema(feature.faq.map((f) => ({ question: f.question, answer: plainText(f.answer) })))];
  if (feature.steps) {
    schemas.push(howToSchema({ name: feature.steps.title, description: feature.meta.description, steps: feature.steps.items.map((s) => ({ name: s.title, text: s.text })) }));
  }

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Fonctionnalités", path: "/fonctionnalites" },
          { name: feature.name, path: `/features/${feature.slug}` },
        ]}
        eyebrow={feature.hero.eyebrow}
        title={feature.hero.title}
        intro={feature.hero.intro}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <DownloadButton location={`feature-${feature.slug}`} size="lg" />
          {feature.plan === "premium" ? (
            <ButtonLink href="/tarifs" variant="secondary" size="lg">
              Voir l&apos;offre Premium
            </ButtonLink>
          ) : (
            <ButtonLink href="/tarifs" variant="secondary" size="lg">
              Inclus dans la version gratuite
            </ButtonLink>
          )}
        </div>
      </PageHero>

      <section aria-labelledby="highlights-title" className="container-wide py-14 md:py-16">
        <h2 id="highlights-title" className="sr-only">
          Points clés
        </h2>
        <HighlightGrid items={feature.highlights} />
      </section>

      {screen && (
        <section aria-label="Capture d'écran" className="container-wide pb-6">
          <ScreenshotFrame
            image={screen.image}
            alt={screen.alt}
            tone={screen.tone}
            sizes="(min-width: 1320px) 1256px, 100vw"
            className={screen.tone === "dark" ? "bg-navy-900" : undefined}
            eager
          />
        </section>
      )}

      <div className="container-wide py-16 md:py-24">
        <ContentSections sections={feature.sections} />
      </div>

      {feature.steps && (
        <section aria-labelledby="steps-title" className="border-y border-line bg-surface py-16 md:py-20">
          <div className="container-wide">
            <h2 id="steps-title" className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink-950 sm:text-[1.75rem]">
              {feature.steps.title}
            </h2>
            <div className="mt-8">
              <StepList steps={feature.steps.items} />
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="feature-faq" className="container-wide py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <div>
            <h2 id="feature-faq" className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink-950 sm:text-[1.75rem]">
              Questions fréquentes
            </h2>
            {feature.docs.length > 0 && (
              <div className="mt-8">
                <p className="text-[0.8125rem] font-semibold text-ink-950">Dans la documentation</p>
                <ul className="mt-3 space-y-2">
                  {feature.docs.map((d) => (
                    <li key={d.href}>
                      <Link href={d.href} className="inline-flex items-center gap-2 text-[0.9375rem] text-ink-600 hover:text-brand-700">
                        <BookOpen className="size-4 text-ink-400" aria-hidden />
                        {d.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {relatedSolutions.length > 0 && (
              <div className="mt-8">
                <p className="text-[0.8125rem] font-semibold text-ink-950">Par métier</p>
                <ul className="mt-3 space-y-2">
                  {relatedSolutions.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/solutions/${s.slug}`}
                        className="inline-flex items-center gap-2 text-[0.9375rem] text-ink-600 hover:text-brand-700"
                      >
                        <ArrowRight className="size-4 text-ink-400" aria-hidden />
                        DigiStock pour les {s.plural.toLowerCase()}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <FAQList items={feature.faq} />
        </div>
      </section>

      <section aria-labelledby="related-title" className="border-t border-line bg-surface py-16 md:py-20">
        <div className="container-wide">
          <div>
            <h2 id="related-title" className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink-950">
              Fonctionnalités liées
            </h2>
          </div>
          <div className="mt-8">
            <FeatureGrid items={related} />
          </div>
        </div>
      </section>

      <FinalCTA location={`feature-${feature.slug}-final`} />
      <JsonLd data={schemas} />
    </>
  );
}
