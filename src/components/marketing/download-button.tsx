"use client";

import Link from "next/link";
import { product } from "@/config/product";
import { buttonClasses } from "@/components/ui/button";
import { WindowsIcon } from "@/components/ui/icons";
import { trackDownload } from "@/lib/analytics";

type DownloadButtonProps = {
  location: string;
  label?: string;
  variant?: "primary" | "inverse" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
};

/**
 * Bouton de téléchargement principal.
 * L'URL et la version proviennent de src/config/product.ts.
 * Sans URL configurée, le bouton affiche le libellé de repli.
 */
export function DownloadButton({
  location,
  label = "Télécharger pour Windows",
  variant = "primary",
  size = "md",
  className,
  showIcon = true,
}: DownloadButtonProps) {
  const url = product.downloadUrl.trim();
  const classes = buttonClasses(variant, size, className);
  const icon = showIcon ? <WindowsIcon className="size-[15px] opacity-90" /> : null;

  if (!url) {
    return (
      <Link href={product.downloadFallback.href} className={classes}>
        {icon}
        {product.downloadFallback.label}
      </Link>
    );
  }

  return (
    <a
      href={url}
      className={classes}
      onClick={() => trackDownload(location, product.currentVersion)}
      rel="nofollow"
      download
    >
      {icon}
      {label}
    </a>
  );
}
