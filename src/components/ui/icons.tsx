import type { SVGProps } from "react";

/** Logo Windows simplifié, utilisé pour indiquer la plateforme. */
export function WindowsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M0 2.2 6.5 1.3v6.2H0V2.2Zm7.3-1L16 0v7.5H7.3V1.2ZM0 8.3h6.5v6.3L0 13.7V8.3Zm7.3 0H16V16l-8.7-1.2V8.3Z" />
    </svg>
  );
}

/** Pictogramme de discussion neutre (sans marque) pour la section WhatsApp. */
export function ChatBubbleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3.5 20.5 5 16.3A8.5 8.5 0 1 1 8 19l-4.5 1.5Z" />
      <path d="M9 10.5h6M9 13.5h4" />
    </svg>
  );
}
