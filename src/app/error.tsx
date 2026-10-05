"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-[0.8125rem] tracking-[0.12em] text-brand-700">ERREUR</p>
      <h1 className="mt-4 text-[2.25rem] leading-tight font-semibold tracking-[-0.03em] text-ink-950">Un problème est survenu.</h1>
      <p className="mt-4 max-w-md text-[1.0625rem] text-ink-600">
        La page n&apos;a pas pu s&apos;afficher correctement. Réessayez, ou revenez à l&apos;accueil.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>
          <RotateCw className="size-4" aria-hidden />
          Réessayer
        </Button>
        <Link href="/" className="inline-flex h-11 items-center rounded-lg border border-line-strong px-5 text-[0.9375rem] font-medium text-ink-900 hover:bg-ink-50">
          Accueil
        </Link>
      </div>
    </section>
  );
}
