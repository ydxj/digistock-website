import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import { JsonLd } from "./json-ld";
import { cn } from "@/lib/utils";

/** Fil d'Ariane visible + BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all: Crumb[] = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Fil d'Ariane" className={cn("text-[0.8125rem]", className)}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-ink-500">
          {all.map((crumb, i) => {
            const last = i === all.length - 1;
            return (
              <li key={crumb.path} className="inline-flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-medium text-ink-800">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className="transition-colors hover:text-ink-950">
                      {crumb.name}
                    </Link>
                    <ChevronRight className="size-3.5 text-ink-300" aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
