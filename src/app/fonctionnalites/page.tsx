import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { ScreenshotFrame } from "@/components/marketing/screenshot-frame";
import { DownloadButton } from "@/components/marketing/download-button";
import { FinalCTA } from "@/components/marketing/final-cta";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section";
import { features } from "@/data/features";
import { screens } from "@/data/screens";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Fonctionnalités : stock, caisse, achats, crédits clients",
  description:
    "Toutes les fonctionnalités de DigiStock : gestion de stock, caisse et code-barres, inventaire, achats, fournisseurs, clients, crédits, rapports, WhatsApp et multi-entrepôts.",
  path: "/fonctionnalites",
  keywords: ["fonctionnalités logiciel gestion de stock", "logiciel caisse et stock", "application gestion stock Windows"],
});

const groups = [
  { title: "Vendre", slugs: ["caisse", "code-barres", "clients", "credits-clients"] },
  { title: "Gérer le stock", slugs: ["gestion-stock", "inventaire", "multi-entrepots"] },
  { title: "Acheter", slugs: ["achats", "fournisseurs"] },
  { title: "Piloter et communiquer", slugs: ["rapports", "whatsapp"] },
];

const essentials = [
  "Application Windows 10 et 11",
  "Fonctionne hors ligne",
  "Données enregistrées sur votre ordinateur",
  "Montants en dirhams (DH)",
  "Mode clair et mode sombre",
  "Raccourcis clavier à la caisse",
  "Import et export CSV",
  "Sauvegarde manuelle ou automatique (Premium)",
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Fonctionnalités", path: "/fonctionnalites" }]}
        eyebrow="Fonctionnalités"
        title="Tout ce qu'il faut pour gérer votre activité, dans une seule application."
        intro="De la caisse au réapprovisionnement, DigiStock relie toutes les étapes de votre activité commerciale. Chaque vente met le stock à jour, chaque achat alimente vos marges, chaque crédit est suivi."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <DownloadButton location="features-hero" size="lg" />
          <ButtonLink href="/tarifs" variant="secondary" size="lg">
            Comparer Free et Premium
          </ButtonLink>
        </div>
      </PageHero>

      <div className="container-wide space-y-20 py-16 md:space-y-24 md:py-24">
        {groups.map((group) => (
          <section key={group.title} aria-labelledby={`group-${group.title}`}>
            <h2 id={`group-${group.title}`} className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink-950">
              {group.title}
            </h2>
            <div className="mt-6">
              <FeatureGrid items={group.slugs.map((s) => features.find((f) => f.slug === s)!)} columns={group.slugs.length === 4 ? 4 : 3} />
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="essentials-title" className="bg-navy-900 py-20 text-white md:py-28">
        <div className="container-wide grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeader
              id="essentials-title"
              tone="dark"
              eyebrow="Les bases"
              title="Une application de bureau, rapide et autonome."
              description="DigiStock s'installe sur votre ordinateur Windows. Pas de navigateur, pas de page qui charge : l'application répond instantanément, même sans connexion."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {essentials.map((e) => (
                <li key={e} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-200">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-300" strokeWidth={2.25} aria-hidden />
                  {e}
                </li>
              ))}
            </ul>
            <Link href="/telecharger" className="mt-8 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-white hover:text-brand-200">
              Configuration requise
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ScreenshotFrame
            image={screens[0].dark!}
            alt={screens[0].alt}
            tone="dark"
            sizes="(min-width: 1320px) 700px, (min-width: 1024px) 55vw, 100vw"
            className="bg-navy-900"
          />
        </div>
      </section>

      <FinalCTA location="features-final" />
    </>
  );
}
