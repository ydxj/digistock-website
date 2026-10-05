"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[0.75rem] font-medium text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
      aria-label={copied ? "Copié" : "Copier le code"}
    >
      {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      <span aria-live="polite">{copied ? "Copié" : "Copier"}</span>
    </button>
  );
}
