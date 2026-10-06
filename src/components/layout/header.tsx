"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { Logo } from "@/components/ui/logo";
import { DownloadButton } from "@/components/marketing/download-button";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu si l'écran passe en mode bureau
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Ferme le menu lors d'un changement de page
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      const all = toggle ? [toggle, ...focusables] : focusables;
      const first = all[0];
      const last = all[all.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const desktopNav = mainNav.filter((item) => item.href !== "/");

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 h-[var(--header-h)] border-b transition-[background-color,border-color,box-shadow] duration-200",
          open
            ? "border-line bg-white"
            : scrolled
              ? "border-line bg-white/90 shadow-[0_1px_12px_-6px_rgb(7_17_38/0.12)] backdrop-blur-md supports-[backdrop-filter]:bg-white/80"
              : "border-transparent bg-white",
        )}
      >
        <div className="container-wide flex h-full items-center justify-between gap-6">
          <Logo preload />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {desktopNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-md px-3 py-2 text-[0.875rem] font-medium transition-colors",
                        active ? "text-ink-950" : "text-ink-600 hover:text-ink-950",
                      )}
                    >
                      {item.label}
                      {active && (
                        <span aria-hidden className="absolute inset-x-3 -bottom-[13px] h-[2px] rounded-full bg-brand-600" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <DownloadButton location="header" size="sm" label="Télécharger DigiStock" />
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-md text-ink-800 transition-colors hover:bg-ink-100 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {/* Le panneau est hors du <header> : un parent avec backdrop-filter
          deviendrait le bloc conteneur du `position: fixed` et l'écraserait. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="animate-fade fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto overscroll-contain bg-white lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="container-wide flex min-h-full flex-col py-4">
          <ul className="divide-y divide-line">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 text-[1.0625rem] font-medium",
                      active ? "text-brand-700" : "text-ink-900",
                    )}
                  >
                    {item.label}
                    <ArrowRight className="size-4 text-ink-300" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto space-y-3 pt-8 pb-4">
            <DownloadButton location="mobile-menu" size="lg" className="w-full" label="Télécharger DigiStock" />
            <p className="text-center text-[0.8125rem] text-ink-500">Windows 10 et 11 · Fonctionne hors ligne</p>
          </div>
        </nav>
      </div>
    </>
  );
}
