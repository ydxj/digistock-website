import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { product } from "@/config/product";

type LogoProps = {
  tone?: "light" | "dark";
  withCompany?: boolean;
  className?: string;
  preload?: boolean;
};

/** Logo DigiStock (fichier officiel) + mention « par DigiStudio ». */
export function Logo({ tone = "light", withCompany = true, className, preload = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${product.name}, accueil`}
      className={cn("group inline-flex items-center gap-3 rounded-md", className)}
    >
      <Image
        src={tone === "light" ? "/images/brand/digistock-logo.png" : "/images/brand/digistock-logo-white.png"}
        alt=""
        width={1089}
        height={213}
        preload={preload}
        sizes="140px"
        className="h-[25px] w-auto"
      />
      {withCompany && (
        <span
          className={cn(
            "hidden border-l pl-3 text-[0.75rem] leading-none font-medium sm:inline",
            tone === "light" ? "border-line-strong text-ink-500" : "border-white/15 text-ink-300",
          )}
        >
          par {product.company}
        </span>
      )}
    </Link>
  );
}
