"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocsSearch } from "./docs-search";

export type SidebarSection = { title: string; items: { slug: string; title: string }[] };

function SidebarLinks({ sections, pathname, onNavigate }: { sections: SidebarSection[]; pathname: string; onNavigate?: () => void }) {
  return (
    <div className="space-y-7">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="px-2.5 font-mono text-[0.6875rem] font-medium tracking-[0.1em] text-ink-500 uppercase">{section.title}</p>
          <ul className="mt-2 space-y-0.5">
            {section.items.map((item) => {
              const href = `/docs/${item.slug}`;
              const active = pathname === href;
              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-2.5 py-1.5 text-[0.875rem] leading-snug transition-colors",
                      active ? "bg-brand-50 font-medium text-brand-800" : "text-ink-600 hover:bg-ink-100 hover:text-ink-950",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function DocsSidebar({ sections }: { sections: SidebarSection[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = sections.flatMap((s) => s.items).find((i) => pathname === `/docs/${i.slug}`);

  return (
    <>
      {/* Mobile / tablette */}
      <div className="sticky top-[var(--header-h)] z-30 -mx-5 border-b border-line bg-white/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="docs-mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-md border border-line px-3 py-2 text-left text-[0.875rem]"
          >
            <span className="truncate">
              <span className="text-ink-500">Documentation</span>
              {current && <span className="font-medium text-ink-900"> / {current.title}</span>}
            </span>
            <ChevronDown className={cn("size-4 shrink-0 text-ink-500 transition-transform", open && "rotate-180")} aria-hidden />
          </button>
          <DocsSearch compact />
        </div>
        <div id="docs-mobile-nav" hidden={!open} className="mt-3 max-h-[65vh] overflow-y-auto pb-2">
          <SidebarLinks sections={sections} pathname={pathname} onNavigate={() => setOpen(false)} />
        </div>
      </div>

      {/* Bureau */}
      <aside className="hidden lg:block">
        <div className="sticky top-[calc(var(--header-h)+1px)] max-h-[calc(100dvh-var(--header-h)-1px)] overflow-y-auto py-10 pr-4">
          <DocsSearch />
          <nav aria-label="Documentation" className="mt-8">
            <Link
              href="/docs"
              aria-current={pathname === "/docs" ? "page" : undefined}
              className={cn(
                "mb-6 block rounded-md px-2.5 py-1.5 text-[0.875rem] transition-colors",
                pathname === "/docs" ? "bg-brand-50 font-medium text-brand-800" : "text-ink-600 hover:bg-ink-100 hover:text-ink-950",
              )}
            >
              Accueil de la documentation
            </Link>
            <SidebarLinks sections={sections} pathname={pathname} />
          </nav>
        </div>
      </aside>
    </>
  );
}
