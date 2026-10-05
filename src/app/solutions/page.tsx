import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { FinalCTA } from "@/components/marketing/final-cta";
import { solutions } from "@/data/solutions";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Solutions par métier : magasins, grossistes, entrepôts",
  description:
    "DigiStock s'adapte à votre activité : magasins, grossistes, entrepôts, boutiques, distributeurs et petites usines au Maroc. Découvrez la solution pour votre métier.",
  path: "/solutions",
  keywords: ["logiciel gestion magasin", "logiciel gestion grossiste", "logiciel gestion entrepôt", "logiciel pour PME Maroc"],
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Solutions", path: "/solutions" }]}
        eyebrow="Solutions"
        title="Un logiciel, plusieurs métiers."
        intro="Un magasin de quartier, un grossiste et un atelier n'ont pas les mêmes priorités. Voici comment DigiStock répond aux besoins de chacun."
      />
      <section aria-label="Solutions par métier" className="container-wide py-16 md:py-24">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.slug} className="flex">
                <Link
                  href={`/solutions/${s.slug}`}
                  className="group flex w-full flex-col rounded-xl border border-line bg-white p-7 transition-[border-color,box-shadow] duration-200 hover:border-ink-200 hover:shadow-md"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-brand-600">
                    <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <h2 className="mt-6 text-[1.125rem] font-semibold tracking-[-0.01em] text-ink-950">{s.plural}</h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{s.short}</p>
                  <ul className="mt-5 space-y-1.5 border-t border-line pt-5">
                    {s.challenges.slice(0, 3).map((c) => (
                      <li key={c.title} className="text-[0.8125rem] text-ink-600">
                        <span className="text-ink-400">—</span> {c.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1 pt-6 text-[0.875rem] font-medium text-brand-700">
                    Voir la solution
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <FinalCTA location="solutions-final" />
    </>
  );
}
