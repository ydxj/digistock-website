import Link from "next/link";
import { Fragment } from "react";
import { frenchSpacing } from "@/lib/utils";

const LINK_SOURCE = /\[([^\]]+)\]\(([^)]+)\)/.source;

/** Rend une chaîne contenant des liens au format [texte](/chemin). */
export function RichText({ text: raw }: { text: string }) {
  const text = frenchSpacing(raw);
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  const re = new RegExp(LINK_SOURCE, "g");
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(<Fragment key={i++}>{text.slice(last, match.index)}</Fragment>);
    const [, label, href] = match;
    parts.push(
      href.startsWith("/") ? (
        <Link
          key={i++}
          href={href}
          className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-[3px] transition-colors hover:decoration-brand-600"
        >
          {label}
        </Link>
      ) : (
        <a key={i++} href={href} className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-[3px]">
          {label}
        </a>
      ),
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(<Fragment key={i++}>{text.slice(last)}</Fragment>);
  return <>{parts}</>;
}

/** Retire la syntaxe de lien (pour JSON-LD et métadonnées). */
export function plainText(text: string): string {
  return text.replace(new RegExp(LINK_SOURCE, "g"), "$1");
}
