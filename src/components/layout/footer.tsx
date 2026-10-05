import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNav, legalNav } from "@/config/navigation";
import { product } from "@/config/product";
import { company } from "@/config/company";
import { Logo } from "@/components/ui/logo";
import { WindowsIcon } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-wide pt-16 pb-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr] lg:gap-16">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-500">
              Logiciel de gestion de stock, ventes et activité commerciale conçu pour les entreprises marocaines.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-[0.8125rem] text-ink-600">
              <WindowsIcon className="size-3.5 text-ink-500" />
              {product.operatingSystems.join(" · ")} · {product.architecture}
              {product.currentVersion && <span className="font-mono text-ink-500">v{product.currentVersion}</span>}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-[0.8125rem] font-semibold text-ink-950">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.label}`}>
                      {item.external ? (
                        <a
                          href={item.href}
                          className="inline-flex items-center gap-1 text-[0.875rem] text-ink-500 transition-colors hover:text-ink-950"
                        >
                          {item.label}
                          <ArrowUpRight className="size-3.5" aria-hidden />
                        </a>
                      ) : (
                        <Link href={item.href} className="text-[0.875rem] text-ink-500 transition-colors hover:text-ink-950">
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-[0.8125rem] text-ink-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {product.name}. Développé par{" "}
            <a href={company.website} className="font-medium text-ink-700 hover:text-ink-950">
              {company.companyName}
            </a>
            .
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ink-950">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
