import type { ReactNode } from "react";
import { PageHero } from "./page-hero";
import { formatDate } from "@/lib/utils";

export function LegalPage({ title, path, updatedAt, intro, children }: { title: string; path: string; updatedAt: string; intro: string; children: ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ name: title, path }]} title={title} intro={intro} />
      <div className="container-site py-14 md:py-20">
        <p className="text-[0.8125rem] text-ink-500">Dernière mise à jour : {formatDate(updatedAt)}</p>
        <div className="prose mt-6 max-w-3xl">{children}</div>
      </div>
    </>
  );
}
