import { isValidElement, type ReactNode } from "react";
import { CopyButton } from "./copy-button";

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return extractText(node.props.children);
  return "";
}

function language(node: ReactNode): string {
  if (isValidElement<{ className?: string }>(node)) {
    const m = /language-(\w+)/.exec(node.props.className ?? "");
    if (m) return m[1];
  }
  return "";
}

/** Bloc de code MDX avec bouton « Copier ». */
export function CodeBlock({ children }: { children?: ReactNode }) {
  const text = extractText(children).replace(/\n$/, "");
  const lang = language(children);
  return (
    <div className="not-prose overflow-hidden rounded-lg bg-ink-950 ring-1 ring-ink-950">
      <div className="flex items-center justify-between border-b border-white/10 py-1 pr-1.5 pl-4">
        <span className="font-mono text-[0.6875rem] tracking-wider text-ink-400 uppercase">{lang || "texte"}</span>
        <CopyButton text={text} />
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[0.8125rem] leading-relaxed text-ink-100">
        <code>{text}</code>
      </pre>
    </div>
  );
}
