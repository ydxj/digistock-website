type JsonLdProps = {
  /** Un ou plusieurs nœuds schema.org (sans @context). */
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Injecte des données structurées JSON-LD de manière sûre (échappement de « < »). */
export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, "\\u003c") }}
    />
  );
}
