"use client";

import { track as vercelTrack } from "@vercel/analytics";

/**
 * Couche d'abstraction analytique.
 * - Vercel Analytics si NEXT_PUBLIC_VERCEL_ANALYTICS=1
 * - Google Analytics si NEXT_PUBLIC_GA_ID est défini
 * Aucun appel n'est bloquant : un échec n'empêche jamais la navigation.
 */
type EventProps = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, props: EventProps = {}): void {
  try {
    if (process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "1") {
      vercelTrack(name, props);
    }
    if (process.env.NEXT_PUBLIC_GA_ID && typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, props);
    }
  } catch {
    // L'analytique ne doit jamais casser l'expérience.
  }
}

export function trackDownload(location: string, version: string): void {
  trackEvent("download_click", { location, version, platform: "windows" });
}
