import { ean13, toBars } from "@/lib/barcode";
import { cn } from "@/lib/utils";

type BarcodeLabelProps = {
  name: string;
  price: string;
  digits12: string;
  className?: string;
  scanning?: boolean;
};

/** Étiquette produit avec un vrai code EAN-13 rendu en SVG. */
export function BarcodeLabel({ name, price, digits12, className, scanning = false }: BarcodeLabelProps) {
  const { code, modules } = ean13(digits12);
  const bars = toBars(modules);
  const quiet = 9;
  const width = modules.length + quiet * 2;
  return (
    <div className={cn("rounded-lg border border-line bg-white p-4 shadow-md", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="truncate text-[0.875rem] font-semibold text-ink-950">{name}</p>
        <p className="shrink-0 text-[0.875rem] font-semibold text-ink-950 tabular">{price}</p>
      </div>
      <div className="relative mt-3">
        <svg viewBox={`0 0 ${width} 62`} className="block h-auto w-full" role="img" aria-label={`Code-barres EAN-13 ${code}`}>
          {bars.map((b) => (
            <rect key={b.x} x={b.x + quiet} y={0} width={b.w} height={b.guard ? 54 : 48} fill="#071126" />
          ))}
          <text x={2} y={60} fontSize="8" fontFamily="ui-monospace, monospace" fill="#071126">
            {code[0]}
          </text>
          <text x={quiet + 3} y={60} fontSize="8" fontFamily="ui-monospace, monospace" fill="#071126" textLength={39} lengthAdjust="spacing">
            {code.slice(1, 7)}
          </text>
          <text x={quiet + 50} y={60} fontSize="8" fontFamily="ui-monospace, monospace" fill="#071126" textLength={39} lengthAdjust="spacing">
            {code.slice(7)}
          </text>
        </svg>
        {scanning && (
          <span aria-hidden className="absolute -inset-x-1.5 top-0 bottom-[14%] overflow-hidden">
            <span className="animate-scan block h-full w-full border-b-2 border-red-500 opacity-0 [filter:drop-shadow(0_0_6px_rgb(239_68_68/0.7))]" />
          </span>
        )}
      </div>
    </div>
  );
}
