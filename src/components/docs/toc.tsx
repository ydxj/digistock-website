import type { Heading } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Table des matières (h2 / h3) de la page courante. */
export function TableOfContents({ headings, className }: { headings: Heading[]; className?: string }) {
  if (headings.length < 2) return null;
  return (
    <nav aria-label="Sur cette page" className={className}>
      <p className="text-[0.75rem] font-semibold text-ink-950">Sur cette page</p>
      <ul className="mt-3 space-y-2 border-l border-line">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l border-transparent text-[0.8125rem] leading-snug text-ink-500 transition-colors hover:border-ink-400 hover:text-ink-950",
                h.depth === 2 ? "pl-3" : "pl-6",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
