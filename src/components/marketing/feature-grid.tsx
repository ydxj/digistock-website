import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Feature } from "@/data/features";
import { cn } from "@/lib/utils";

export function PlanBadge({ plan, className }: { plan: Feature["plan"]; className?: string }) {
  if (plan !== "premium") return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-2 py-0.5 text-[0.6875rem] font-medium tracking-wide text-brand-700",
        className,
      )}
    >
      Premium
    </span>
  );
}

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <Link
      href={`/features/${feature.slug}`}
      className="group relative flex h-full w-full flex-col bg-white p-6 transition-colors hover:bg-surface-2 sm:p-7"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-white text-brand-600 shadow-xs transition-colors group-hover:border-brand-200">
          <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
        </span>
        <PlanBadge plan={feature.plan} />
      </div>
      <h3 className="mt-5 text-[1rem] font-semibold tracking-[-0.01em] text-ink-950">{feature.name}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{feature.short}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[0.8125rem] font-medium text-ink-500 transition-colors group-hover:text-brand-700">
        En savoir plus
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

/** Cellules vides qui complètent la dernière rangée d'une grille à filets. */
export function GridFillers({ count, columns }: { count: number; columns: 3 | 4 }) {
  const sm = (2 - (count % 2)) % 2;
  const lg = (columns - (count % columns)) % columns;
  const max = Math.max(sm, lg);
  return (
    <>
      {Array.from({ length: max }, (_, i) => (
        <li
          key={i}
          aria-hidden
          className={cn("hidden bg-white", i < sm && "sm:block", i < lg ? "lg:block" : "lg:hidden")}
        />
      ))}
    </>
  );
}

/** Grille à filets fins : les cartes partagent leurs bordures. */
export function FeatureGrid({ items, columns = 4 }: { items: Feature[]; columns?: 3 | 4 }) {
  return (
    <ul
      className={cn(
        "grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
      )}
    >
      {items.map((feature) => (
        <li key={feature.slug} className="flex">
          <FeatureCard feature={feature} />
        </li>
      ))}
      <GridFillers count={items.length} columns={columns} />
    </ul>
  );
}
