import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Home, LayoutGrid } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/fonctionnalites", label: "Fonctionnalités", icon: LayoutGrid },
  { href: "/docs", label: "Documentation", icon: BookOpen },
  { href: "/", label: "Accueil", icon: Home },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000,transparent)]" />
      <div className="container-site relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-mono text-[0.8125rem] tracking-[0.12em] text-brand-700">ERREUR 404 · RÉFÉRENCE INTROUVABLE</p>
        <h1 className="mt-5 text-balance text-[2.5rem] leading-tight font-semibold tracking-[-0.035em] text-ink-950 sm:text-[3.25rem]">
          Ce produit n&apos;est pas en stock.
        </h1>
        <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-ink-600">
          La page que vous cherchez n&apos;existe pas ou a été déplacée. Scannez une autre référence :
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-[0.9375rem] font-medium text-ink-800 shadow-xs transition-colors hover:border-ink-200"
              >
                <Icon className="size-4 text-brand-600" aria-hidden />
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/contact" variant="ghost" className="mt-6">
          Signaler un lien cassé <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>
    </section>
  );
}
