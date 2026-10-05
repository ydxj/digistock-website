import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { PricingCard } from "@/components/marketing/pricing-card";
import { FinalCTA } from "@/components/marketing/final-cta";
import { FAQList } from "@/components/ui/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { comparison, plans } from "@/config/pricing";
import { buildMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Tarifs : DigiStock Free et Premium",
  description:
    "DigiStock Free est gratuit, sans limite de produits ni de ventes. Premium ajoute WhatsApp, utilisateurs multiples, multi-entrepôts et sauvegardes automatiques. Comparez les offres.",
  path: "/tarifs",
  keywords: ["logiciel de stock gratuit", "logiciel de caisse gratuit", "prix logiciel gestion de stock Maroc"],
});

const pricingFaq = [
  {
    question: "La version Free est-elle vraiment gratuite ?",
    answer:
      "Oui. DigiStock Free est gratuit, sans limite de produits ni de ventes. Ce n'est pas une version d'essai limitée dans le temps.",
  },
  {
    question: "Puis-je passer de Free à Premium plus tard ?",
    answer:
      "Oui. Vous pouvez commencer avec Free et passer à Premium quand vous en avez besoin. Vos données sont conservées. Voir [Activer Premium](/docs/activation-premium).",
  },
  {
    question: "Combien coûte DigiStock Premium ?",
    answer:
      "Les conditions de Premium sont communiquées sur demande, en fonction de vos besoins. [Contactez-nous](/contact) pour en parler.",
  },
  {
    question: "Mes données sont-elles conservées si je change d'offre ?",
    answer: "Oui. Le changement d'offre débloque des fonctionnalités ; il ne touche pas à vos données.",
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <>
        <Check className="mx-auto size-4 text-brand-600" strokeWidth={2.5} aria-hidden />
        <span className="sr-only">Inclus</span>
      </>
    );
  if (value === false)
    return (
      <>
        <Minus className="mx-auto size-4 text-ink-300" aria-hidden />
        <span className="sr-only">Non inclus</span>
      </>
    );
  return <span className="text-[0.8125rem] font-medium text-ink-700">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Tarifs", path: "/tarifs" }]}
        eyebrow="Tarifs"
        title="Commencez gratuitement, sans limite."
        intro="DigiStock Free couvre la gestion quotidienne d'un commerce : caisse, stock, achats, clients et crédits. Premium ajoute les outils des entreprises qui grandissent."
      />

      <section aria-label="Offres" className="container-site py-16 md:py-20">
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} location="pricing-page" />
          ))}
        </div>
      </section>

      <section aria-labelledby="compare-title" className="border-t border-line bg-surface py-16 md:py-24">
        <div className="container-site">
          <h2 id="compare-title" className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink-950 sm:text-[1.75rem]">
            Comparaison détaillée
          </h2>
          <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-white">
            <table className="w-full table-fixed border-collapse sm:table-auto text-left">
              <caption className="sr-only">Comparaison des offres DigiStock Free et Premium</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="px-5 py-4 text-[0.8125rem] font-medium text-ink-500">
                    Fonctionnalité
                  </th>
                  <th scope="col" className="w-[4.5rem] px-2 py-4 text-center sm:w-36 sm:px-4 text-[0.875rem] font-semibold text-ink-950">
                    Free
                  </th>
                  <th scope="col" className="w-[5.5rem] bg-brand-50/50 px-2 py-4 text-center sm:w-36 sm:px-4 text-[0.875rem] font-semibold text-brand-800">
                    Premium
                  </th>
                </tr>
              </thead>
              {comparison.map((group) => (
                <tbody key={group.group}>
                  <tr className="border-b border-line bg-surface">
                    <th scope="colgroup" colSpan={3} className="px-5 py-2.5 font-mono text-[0.6875rem] font-medium tracking-[0.1em] text-ink-500 uppercase">
                      {group.group}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label} className="border-b border-line last:border-b-0">
                      <th scope="row" className="px-4 py-3 text-[0.875rem] font-normal text-ink-800 sm:px-5 sm:text-[0.9rem]">
                        {row.label}
                      </th>
                      <td className="px-2 py-3 text-center sm:px-4">
                        <Cell value={row.free} />
                      </td>
                      <td className="bg-brand-50/30 px-2 py-3 text-center sm:px-4">
                        <Cell value={row.premium} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="pricing-faq" className="container-site py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <h2 id="pricing-faq" className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink-950 sm:text-[1.75rem]">
            Questions sur les offres
          </h2>
          <FAQList items={pricingFaq} />
        </div>
      </section>

      <FinalCTA location="pricing-final" />
      <JsonLd data={faqSchema(pricingFaq.map((f) => ({ question: f.question, answer: f.answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") })))} />
    </>
  );
}
