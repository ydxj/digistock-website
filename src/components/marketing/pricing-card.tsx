import { Check } from "lucide-react";
import { formatPrice, type Plan } from "@/config/pricing";
import { DownloadButton } from "./download-button";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingCard({ plan, location }: { plan: Plan; location: string }) {
  const featured = Boolean(plan.featured);
  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "relative flex flex-col rounded-2xl border p-7 sm:p-8",
        featured ? "border-ink-950 bg-ink-950 text-white shadow-lg" : "border-line bg-white",
      )}
    >
      <div className="flex items-center justify-between">
        <h3 id={`plan-${plan.id}`} className="text-[1.125rem] font-semibold">
          DigiStock {plan.name}
        </h3>
        {featured && (
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[0.75rem] font-medium text-brand-200 ring-1 ring-white/15">
            Pour aller plus loin
          </span>
        )}
      </div>
      <p className={cn("mt-2 text-[0.9375rem]", featured ? "text-ink-300" : "text-ink-500")}>{plan.description}</p>

      <p className="mt-7 flex items-baseline gap-2">
        <span className="text-[2.25rem] leading-none font-semibold tracking-[-0.035em]">{formatPrice(plan)}</span>
        {plan.price !== null && plan.price > 0 && plan.period && (
          <span className={featured ? "text-ink-300" : "text-ink-500"}>/ {plan.period}</span>
        )}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {plan.highlights.map((h) => (
          <li
            key={h}
            className={cn(
              "rounded-md px-2 py-1 text-[0.75rem] font-medium",
              featured ? "bg-white/10 text-white" : "bg-brand-50 text-brand-800",
            )}
          >
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-7">
        {plan.cta.kind === "download" ? (
          <DownloadButton location={location} label={plan.cta.label} className="w-full" variant={featured ? "inverse" : "primary"} />
        ) : (
          <ButtonLink href={plan.cta.href} variant={featured ? "inverse" : "primary"} className="w-full">
            {plan.cta.label}
          </ButtonLink>
        )}
      </div>

      <div className={cn("mt-8 border-t pt-6", featured ? "border-white/10" : "border-line")}>
        {plan.inheritsFrom && (
          <p className={cn("mb-4 text-[0.875rem] font-medium", featured ? "text-white" : "text-ink-900")}>{plan.inheritsFrom}</p>
        )}
        <ul className="grid gap-2.5 text-[0.9rem]">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check
                className={cn("mt-0.5 size-4 shrink-0", featured ? "text-brand-300" : "text-brand-600")}
                strokeWidth={2.25}
                aria-hidden
              />
              <span className={featured ? "text-ink-200" : "text-ink-700"}>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
