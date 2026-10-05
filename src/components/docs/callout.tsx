import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const styles = {
  info: { icon: Info, box: "border-brand-200 bg-brand-50/60", iconColor: "text-brand-600" },
  tip: { icon: Lightbulb, box: "border-emerald-200 bg-emerald-50/60", iconColor: "text-emerald-700" },
  warning: { icon: TriangleAlert, box: "border-amber-200 bg-amber-50/70", iconColor: "text-amber-700" },
} as const;

export function Callout({ type = "info", title, children }: { type?: keyof typeof styles; title?: string; children: ReactNode }) {
  const { icon: Icon, box, iconColor } = styles[type];
  return (
    <aside className={cn("not-prose flex gap-3 rounded-lg border px-4 py-3.5 text-[0.9375rem] leading-relaxed", box)}>
      <Icon className={cn("mt-0.5 size-[18px] shrink-0", iconColor)} strokeWidth={1.75} aria-hidden />
      <div className="min-w-0 text-ink-700 [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-2 [&_p+p]:mt-2 [&_strong]:font-semibold [&_strong]:text-ink-900">
        {title && <p className="font-semibold text-ink-900">{title}</p>}
        {children}
      </div>
    </aside>
  );
}

export function PremiumBadge() {
  return (
    <p className="not-prose inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[0.8125rem] font-medium text-brand-800">
      <span className="size-1.5 rounded-full bg-brand-600" aria-hidden />
      Fonction disponible avec DigiStock Premium
    </p>
  );
}
