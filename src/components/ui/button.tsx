import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "inverse-outline";
type Size = "sm" | "md" | "lg";

const base =
  "group/button inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_1px_2px_rgb(7_17_38/0.2)] hover:bg-brand-700",
  secondary:
    "bg-white text-ink-900 border border-line-strong shadow-xs hover:border-ink-300 hover:bg-ink-50",
  ghost: "text-ink-700 hover:text-ink-950 hover:bg-ink-100",
  inverse: "bg-white text-ink-950 hover:bg-brand-50",
  "inverse-outline": "text-white border border-white/20 hover:border-white/40 hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 rounded-md px-3.5 text-[0.875rem]",
  md: "h-11 rounded-lg px-5 text-[0.9375rem]",
  lg: "h-12 rounded-lg px-6 text-[1rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

export function ButtonLink({ href, variant, size, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  if (isExternal(href)) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
} & ComponentProps<"button">;

export function Button({ variant, size, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...rest} />;
}
