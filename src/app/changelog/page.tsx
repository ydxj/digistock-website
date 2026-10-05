import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { releases } from "@/data/changelog";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Notes de version",
  description: "Les nouveautés, améliorations et corrections de chaque version de DigiStock.",
  path: "/changelog",
  noindex: releases.length === 0,
});

const badge = {
  nouveau: "bg-brand-50 text-brand-800 ring-brand-200",
  amélioré: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  corrigé: "bg-amber-50 text-amber-800 ring-amber-200",
} as const;

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Notes de version", path: "/changelog" }]}
        eyebrow="Changelog"
        title="Notes de version"
        intro="Les nouveautés, améliorations et corrections de chaque version de DigiStock."
      />
      <div className="container-site py-16 md:py-20">
        {releases.length === 0 ? (
          <div className="max-w-2xl rounded-xl border border-line bg-surface p-8">
            <p className="text-[1rem] leading-relaxed text-ink-600">
              Les notes de version seront publiées ici à chaque nouvelle version de DigiStock. En attendant, consultez la{" "}
              <Link href="/docs" className="font-medium text-brand-700 hover:text-brand-800">
                documentation
              </Link>{" "}
              ou la page{" "}
              <Link href="/telecharger" className="font-medium text-brand-700 hover:text-brand-800">
                Télécharger
              </Link>
              .
            </p>
          </div>
        ) : (
          <ol className="max-w-3xl space-y-14">
            {releases.map((r) => (
              <li key={r.version} className="grid gap-4 md:grid-cols-[10rem_minmax(0,1fr)]">
                <div>
                  <p className="font-mono text-[0.9375rem] font-semibold text-ink-950">v{r.version}</p>
                  <p className="mt-1 text-[0.8125rem] text-ink-500">
                    <time dateTime={r.date}>{formatDate(r.date)}</time>
                  </p>
                </div>
                <div>
                  <h2 className="text-[1.25rem] font-semibold text-ink-950">{r.title}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {r.changes.map((c, i) => (
                      <li key={i} className="flex items-start gap-3 text-[0.9375rem] text-ink-700">
                        <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[0.6875rem] font-medium capitalize ring-1 ${badge[c.type]}`}>
                          {c.type}
                        </span>
                        {c.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}
