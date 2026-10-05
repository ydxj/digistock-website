import { Check } from "lucide-react";
import type { ContentSection, Highlight, Step } from "@/types/content";
import { RichText } from "@/components/ui/rich-text";
import { frenchSpacing } from "@/lib/utils";

/** Sections éditoriales : titre à gauche, texte à droite. */
export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="divide-y divide-line">
      {sections.map((section) => (
        <section key={section.title} className="grid gap-5 py-12 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 lg:py-14">
          <h2 className="text-balance text-[1.375rem] leading-snug font-semibold tracking-[-0.02em] text-ink-950 sm:text-[1.5rem]">
            {frenchSpacing(section.title)}
          </h2>
          <div className="space-y-4 text-[1.0625rem] leading-relaxed text-ink-600">
            {section.paragraphs.map((p, i) => (
              <p key={i}>
                <RichText text={p} />
              </p>
            ))}
            {section.bullets && (
              <ul className="space-y-2.5 pt-1">
                {section.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-brand-600" strokeWidth={2.25} aria-hidden />
                    <span className="text-ink-700">{frenchSpacing(b)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

export function HighlightGrid({ items }: { items: Highlight[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map((h) => (
        <li key={h.title} className="bg-white p-6">
          <h3 className="text-[0.9375rem] font-semibold text-ink-950">{h.title}</h3>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-500">{frenchSpacing(h.text)}</p>
        </li>
      ))}
    </ul>
  );
}

export function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="bg-white p-6">
          <span className="font-mono text-[0.75rem] text-brand-700">Étape {i + 1}</span>
          <h3 className="mt-2 text-[0.9375rem] font-semibold text-ink-950">{step.title}</h3>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-500">{frenchSpacing(step.text)}</p>
        </li>
      ))}
    </ol>
  );
}
