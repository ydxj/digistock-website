"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { screens } from "@/data/screens";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

/** Vitrine des captures réelles : onglets par écran + sélecteur clair/sombre. */
export function AppShowcase() {
  const [activeId, setActiveId] = useState(screens[0].id);
  const [preferred, setPreferred] = useState<Theme>("dark");
  const tabsRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const active = screens.find((s) => s.id === activeId) ?? screens[0];
  const hasBoth = Boolean(active.light && active.dark);
  const theme: Theme = active[preferred] ? preferred : active.light ? "light" : "dark";
  const image = active[theme]!;

  function onTabKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % screens.length;
    if (e.key === "ArrowLeft") next = (index - 1 + screens.length) % screens.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = screens.length - 1;
    setActiveId(screens[next].id);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div ref={tabsRef} role="tablist" aria-label="Écrans de l'application" className="flex flex-wrap gap-1.5">
          {screens.map((screen, index) => {
            const selected = screen.id === active.id;
            return (
              <button
                key={screen.id}
                id={`${baseId}-tab-${screen.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(screen.id)}
                onKeyDown={(e) => onTabKeyDown(e, index)}
                className={cn(
                  "h-9 rounded-md px-3.5 text-[0.875rem] font-medium transition-colors",
                  selected ? "bg-white text-ink-950" : "text-ink-300 hover:bg-white/5 hover:text-white",
                )}
              >
                {screen.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {hasBoth ? (
            <div role="group" aria-label="Thème de l'application" className="inline-flex rounded-lg bg-white/5 p-1 ring-1 ring-white/10">
              {(["light", "dark"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={theme === t}
                  onClick={() => setPreferred(t)}
                  className={cn(
                    "inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[0.8125rem] font-medium transition-colors",
                    theme === t ? "bg-white text-ink-950" : "text-ink-300 hover:text-white",
                  )}
                >
                  {t === "light" ? <Sun className="size-3.5" aria-hidden /> : <Moon className="size-3.5" aria-hidden />}
                  {t === "light" ? "Mode clair" : "Mode sombre"}
                </button>
              ))}
            </div>
          ) : (
            <p className="inline-flex items-center gap-2 text-[0.8125rem] text-ink-300">
              {theme === "light" ? <Sun className="size-3.5" aria-hidden /> : <Moon className="size-3.5" aria-hidden />}
              {theme === "light" ? "Mode clair" : "Mode sombre"}
              <span className="text-ink-500">·</span>
              <span>Disponible en clair et en sombre</span>
            </p>
          )}
        </div>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className="mt-8"
      >
        <figure className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -top-10 bottom-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgb(59_118_242/0.28),transparent_70%)]"
          />
          <div className="relative overflow-hidden rounded-[10px] ring-1 ring-white/12 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]">
            <Image
              key={image.src}
              src={image.src}
              width={image.width}
              height={image.height}
              alt={active.alt}
              sizes="(min-width: 1320px) 1256px, 100vw"
              quality={90}
              className="animate-fade block h-auto w-full"
            />
          </div>
          <figcaption className="sr-only">{active.alt}</figcaption>
        </figure>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10 md:grid-cols-3">
          {active.notes.map((note, i) => (
            <li key={note.title} className="bg-navy-900 p-6">
              <p className="font-mono text-[0.75rem] text-brand-300">0{i + 1}</p>
              <h3 className="mt-2 text-[0.9375rem] font-semibold text-white">{note.title}</h3>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-300">{note.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
