type ClassValue = string | number | false | null | undefined | ClassValue[];

/** Concatène des classes conditionnelles (sans dépendance externe). */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }
  return out.join(" ");
}

const dateFormatter = new Intl.DateTimeFormat("fr-MA", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return dateFormatter.format(d);
}

/** Formate un montant en dirhams : 1280 → « 1 280 DH ». */
export function formatDH(value: number, options: { sign?: boolean; decimals?: number } = {}): string {
  const { sign = false, decimals = 0 } = options;
  const abs = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Math.abs(value))
    .replace(/ | /g, " ");
  const prefix = sign ? (value > 0 ? "+" : value < 0 ? "−" : "") : value < 0 ? "−" : "";
  return `${prefix}${abs} DH`;
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

/** Typographie française : espace insécable avant « : ; ? ! » et à l'intérieur des guillemets. */
export function frenchSpacing(text: string): string {
  return text
    .replace(/ ([:;?!»])/g, " $1")
    .replace(/« /g, "« ");
}
