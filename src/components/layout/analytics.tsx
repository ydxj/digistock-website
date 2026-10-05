import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

/**
 * Analytique respectueuse de la vie privée, activée uniquement par configuration :
 * - NEXT_PUBLIC_VERCEL_ANALYTICS=1 → Vercel Analytics (sans cookie)
 * - NEXT_PUBLIC_GA_ID=G-XXXX      → Google Analytics (optionnel)
 */
export function Analytics() {
  const vercel = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "1";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {vercel && <VercelAnalytics />}
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(gaId)},{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}
