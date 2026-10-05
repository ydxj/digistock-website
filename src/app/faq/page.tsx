import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { FinalCTA } from "@/components/marketing/final-cta";
import { FAQList } from "@/components/ui/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { allFaq, faqGroups } from "@/data/faq";
import { buildMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "FAQ : questions fréquentes sur DigiStock",
  description:
    "Hors ligne, données locales, lecteur code-barres, crédits clients, WhatsApp, Windows 10 et 11, version gratuite : les réponses aux questions fréquentes sur DigiStock.",
  path: "/faq",
});

function groupId(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
}

export default function FAQPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "FAQ", path: "/faq" }]}
        eyebrow="FAQ"
        title="Questions fréquentes"
        intro="Les réponses aux questions que l'on nous pose le plus souvent. Pour aller plus loin, consultez la documentation ou contactez-nous."
      />
      <div className="container-wide grid gap-12 py-16 md:py-24 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-20">
        <nav aria-label="Thèmes" className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {faqGroups.map((g) => (
              <li key={g.title}>
                <a
                  href={`#${groupId(g.title)}`}
                  className="block rounded-md border border-line px-3 py-1.5 text-[0.875rem] text-ink-600 transition-colors hover:text-ink-950 lg:border-0 lg:px-2.5 lg:hover:bg-ink-100"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 hidden text-[0.875rem] leading-relaxed text-ink-500 lg:block">
            Pas de réponse ?{" "}
            <Link href="/contact" className="font-medium text-brand-700 hover:text-brand-800">
              Écrivez-nous
            </Link>
            .
          </p>
        </nav>
        <div className="max-w-3xl space-y-14">
          {faqGroups.map((g) => (
            <section key={g.title} id={groupId(g.title)} aria-labelledby={`${groupId(g.title)}-title`} className="scroll-mt-28">
              <h2 id={`${groupId(g.title)}-title`} className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink-950">
                {g.title}
              </h2>
              <FAQList items={g.items} className="mt-4" />
            </section>
          ))}
        </div>
      </div>
      <FinalCTA location="faq-final" />
      <JsonLd data={faqSchema(allFaq)} />
    </>
  );
}
