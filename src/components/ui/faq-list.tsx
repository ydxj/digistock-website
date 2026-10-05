import { Plus } from "lucide-react";
import type { FAQItem } from "@/types/content";
import { RichText } from "./rich-text";
import { cn, frenchSpacing } from "@/lib/utils";

/** Accordéon accessible basé sur <details> : aucun JavaScript requis. */
export function FAQList({ items, className, tone = "light" }: { items: FAQItem[]; className?: string; tone?: "light" | "subtle" }) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary
            className={cn(
              "flex cursor-pointer items-start justify-between gap-6 py-5 text-left text-[1rem] font-medium text-ink-950 transition-colors sm:text-[1.0625rem]",
              tone === "light" ? "hover:text-brand-700" : "hover:text-brand-700",
            )}
          >
            <h3 className="font-medium">{frenchSpacing(item.question)}</h3>
            <span
              aria-hidden
              className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-500 transition-transform duration-200 group-open:rotate-45 group-open:border-brand-200 group-open:text-brand-600"
            >
              <Plus className="size-3.5" />
            </span>
          </summary>
          <div className="max-w-3xl pr-10 pb-6 text-[0.9875rem] leading-relaxed text-ink-600">
            <RichText text={item.answer} />
          </div>
        </details>
      ))}
    </div>
  );
}
