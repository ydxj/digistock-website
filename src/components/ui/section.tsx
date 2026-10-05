import type { ReactNode } from "react";
import { cn, frenchSpacing } from "@/lib/utils";

export function Container({ className, children, wide = false }: { className?: string; children: ReactNode; wide?: boolean }) {
  return <div className={cn(wide ? "container-wide" : "container-site", className)}>{children}</div>;
}

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "white" | "subtle" | "navy";
  bordered?: boolean;
  labelledBy?: string;
};

export function Section({ id, className, children, tone = "white", bordered = false, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative py-20 md:py-28",
        tone === "subtle" && "bg-surface",
        tone === "navy" && "bg-navy-900 text-white",
        bordered && "border-y border-line",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, className, tone = "light" }: { children: ReactNode; className?: string; tone?: "light" | "dark" }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[0.75rem] font-medium uppercase tracking-[0.12em]",
        tone === "light" ? "text-brand-700" : "text-brand-300",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-4", tone === "light" ? "bg-brand-600" : "bg-brand-400")} />
      {children}
    </p>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  id,
  className,
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow tone={tone} className={cn("mb-4", align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      )}
      <Heading
        id={id}
        className={cn(
          "text-balance text-[1.875rem] font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[2.25rem] lg:text-[2.625rem]",
          tone === "light" ? "text-ink-950" : "text-white",
        )}
      >
        {typeof title === "string" ? frenchSpacing(title) : title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-5 text-pretty text-[1.0625rem] leading-relaxed sm:text-[1.125rem]",
            tone === "light" ? "text-ink-500" : "text-ink-300",
          )}
        >
          {typeof description === "string" ? frenchSpacing(description) : description}
        </p>
      )}
    </div>
  );
}
