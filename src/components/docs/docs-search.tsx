"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { FileText, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type IndexEntry = { slug: string; title: string; description: string; section: string; headings: string[]; text: string };

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function score(entry: IndexEntry, terms: string[]): number {
  const title = normalize(entry.title);
  const desc = normalize(entry.description);
  const heads = normalize(entry.headings.join(" "));
  const text = normalize(entry.text);
  let total = 0;
  for (const t of terms) {
    let s = 0;
    if (title.includes(t)) s += title.startsWith(t) ? 12 : 8;
    if (heads.includes(t)) s += 4;
    if (desc.includes(t)) s += 3;
    if (text.includes(t)) s += 1;
    if (s === 0) return 0; // tous les termes doivent correspondre
    total += s;
  }
  return total;
}

function excerpt(entry: IndexEntry, term: string): string {
  const text = entry.text;
  const i = normalize(text).indexOf(term);
  if (i === -1) return entry.description;
  const start = Math.max(0, i - 50);
  return `${start > 0 ? "…" : ""}${text.slice(start, i + 90).trim()}…`;
}

/** Recherche plein texte côté client ; l'index est chargé à la première ouverture. */
export function DocsSearch({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<IndexEntry[] | null>(null);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listId = useId();

  const load = useCallback(async () => {
    if (index) return;
    try {
      const res = await fetch("/docs/search-index.json");
      setIndex((await res.json()) as IndexEntry[]);
    } catch {
      setIndex([]);
    }
  }, [index]);

  const openDialog = useCallback(() => {
    setOpen(true);
    void load();
  }, [load]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (compact) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        openDialog();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [compact, openDialog]);

  const results = useMemo(() => {
    if (!index) return [];
    const terms = normalize(query).split(/\s+/).filter((t) => t.length > 1);
    if (terms.length === 0) return [];
    return index
      .map((entry) => ({ entry, s: score(entry, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((r) => ({ ...r.entry, snippet: excerpt(r.entry, terms[0]) }));
  }, [index, query]);

  function go(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/docs/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].slug);
    }
  }

  return (
    <>
      {compact ? (
        <button
          type="button"
          onClick={openDialog}
          aria-label="Rechercher dans la documentation"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-line text-ink-600"
        >
          <Search className="size-4" aria-hidden />
        </button>
      ) : (
        <button
          type="button"
          onClick={openDialog}
          className="flex w-full items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-left text-[0.875rem] text-ink-500 shadow-xs transition-colors hover:border-ink-200"
        >
          <Search className="size-4" aria-hidden />
          <span className="flex-1">Rechercher…</span>
          <kbd className="rounded border border-line bg-surface px-1.5 font-mono text-[0.6875rem] text-ink-500">/</kbd>
        </button>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(false);
        }}
        aria-label="Rechercher dans la documentation"
        className="mx-auto mt-[10vh] w-[calc(100%-2rem)] max-w-xl rounded-xl border border-line bg-white p-0 shadow-lg backdrop:bg-ink-950/40 backdrop:backdrop-blur-[2px]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 shrink-0 text-ink-500" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Rechercher : code-barres, crédit, sauvegarde…"
            aria-label="Rechercher"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${results[active].slug}` : undefined}
            role="combobox"
            aria-expanded={results.length > 0}
            aria-autocomplete="list"
            className="h-14 flex-1 bg-transparent text-[1rem] text-ink-950 outline-none placeholder:text-ink-400"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex size-8 items-center justify-center rounded-md text-ink-500 hover:bg-ink-100"
            aria-label="Fermer la recherche"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim().length < 2 ? (
            <p className="px-3 py-6 text-center text-[0.875rem] text-ink-500">Tapez au moins deux lettres.</p>
          ) : index === null ? (
            <p className="px-3 py-6 text-center text-[0.875rem] text-ink-500">Chargement…</p>
          ) : results.length === 0 ? (
            <p className="px-3 py-6 text-center text-[0.875rem] text-ink-500">Aucun résultat pour « {query} ».</p>
          ) : (
            <ul id={listId} role="listbox" aria-label="Résultats">
              {results.map((r, i) => (
                <li key={r.slug} id={`${listId}-${r.slug}`} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => go(r.slug)}
                    onMouseEnter={() => setActive(i)}
                    className={cn("flex w-full gap-3 rounded-lg px-3 py-3 text-left", i === active && "bg-brand-50")}
                  >
                    <FileText className="mt-0.5 size-4 shrink-0 text-ink-400" aria-hidden />
                    <span className="min-w-0">
                      <span className="block text-[0.9375rem] font-medium text-ink-950">{r.title}</span>
                      <span className="block font-mono text-[0.6875rem] tracking-wide text-ink-500 uppercase">{r.section}</span>
                      <span className="mt-1 line-clamp-2 block text-[0.8125rem] text-ink-500">{r.snippet}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </dialog>
    </>
  );
}
