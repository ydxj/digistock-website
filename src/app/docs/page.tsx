import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Rocket, Package, Boxes, ShoppingCart, Users, Truck, MessageCircle, Sparkles, HardDrive, Settings } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { docsNav, popularDocs } from "@/config/docs";
import { getAllDocs } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Documentation DigiStock",
  description:
    "Guides pas à pas pour installer et utiliser DigiStock : produits, code-barres, stock, inventaire, caisse, crédits clients, fournisseurs, WhatsApp et sauvegardes.",
  path: "/docs",
  keywords: ["comment utiliser DigiStock", "DigiStock documentation", "DigiStock aide"],
});

const icons = [Rocket, Package, Boxes, ShoppingCart, Users, Truck, MessageCircle, Sparkles, HardDrive, Settings];

export default function DocsHome() {
  const docs = getAllDocs();
  const popular = popularDocs.map((slug) => docs.find((d) => d.slug === slug)).filter((d) => d !== undefined);

  return (
    <div className="py-10 lg:py-12">
      <Breadcrumbs items={[{ name: "Documentation", path: "/docs" }]} />
      <header className="mt-6 max-w-2xl">
        <h1 className="text-[2rem] leading-tight font-semibold tracking-[-0.03em] text-ink-950 sm:text-[2.5rem]">
          Documentation DigiStock
        </h1>
        <p className="mt-4 text-[1.125rem] leading-relaxed text-ink-500">
          Tout ce qu&apos;il faut savoir pour installer DigiStock, configurer votre commerce et l&apos;utiliser au quotidien. Des
          guides courts, en français, étape par étape.
        </p>
      </header>

      <section aria-labelledby="popular-title" className="mt-12">
        <h2 id="popular-title" className="text-[0.8125rem] font-semibold text-ink-950">
          Les plus consultés
        </h2>
        <ul className="mt-4 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
          {popular.map((doc) => (
            <li key={doc.slug} className="flex">
              <Link href={`/docs/${doc.slug}`} className="group flex w-full flex-col bg-white p-5 transition-colors hover:bg-surface-2">
                <span className="flex items-center justify-between gap-3 text-[0.9375rem] font-semibold text-ink-950">
                  {doc.title}
                  <ArrowRight className="size-4 shrink-0 text-ink-300 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden />
                </span>
                <span className="mt-1 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-500">{doc.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="all-title" className="mt-14">
        <h2 id="all-title" className="text-[0.8125rem] font-semibold text-ink-950">
          Tous les guides
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {docsNav.map((section, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={section.title} className="rounded-xl border border-line p-5">
                <div className="flex items-center gap-2.5">
                  <Icon className="size-4 text-brand-600" strokeWidth={1.75} aria-hidden />
                  <h3 className="text-[0.9375rem] font-semibold text-ink-950">{section.title}</h3>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {section.slugs.map((slug) => {
                    const doc = docs.find((d) => d.slug === slug)!;
                    return (
                      <li key={slug}>
                        <Link href={`/docs/${slug}`} className="text-[0.875rem] text-ink-600 transition-colors hover:text-brand-700">
                          {doc.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
