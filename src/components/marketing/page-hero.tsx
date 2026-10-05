import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Eyebrow } from "@/components/ui/section";
import type { Crumb } from "@/lib/schema";
import { cn, frenchSpacing } from "@/lib/utils";

type PageHeroProps = {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** En-tête des pages intérieures : fil d'Ariane, titre H1, introduction, actions. */
export function PageHero({ crumbs, eyebrow, title, intro, children, align = "left", className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-line", className)}>
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_20%_0%,#000_20%,transparent_75%)]"
      />
      <div className={cn("container-wide relative pt-8 pb-16 md:pb-20", align === "center" && "text-center")}>
        {crumbs && <Breadcrumbs items={crumbs} className={align === "center" ? "flex justify-center" : undefined} />}
        <div className={cn("mt-12 max-w-3xl md:mt-16", align === "center" && "mx-auto")}>
          {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
          <h1 className="text-balance text-[2.25rem] leading-[1.08] font-semibold tracking-[-0.035em] text-ink-950 sm:text-[2.75rem] lg:text-[3.25rem]">
            {frenchSpacing(title)}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-ink-600 sm:text-[1.1875rem]">
              {frenchSpacing(intro)}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
