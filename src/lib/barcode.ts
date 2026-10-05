/**
 * Encodage EAN-13 réel (utilisé pour l'illustration d'étiquette).
 * Retourne une chaîne de 95 modules « 1 » (barre) / « 0 » (espace).
 */
const L = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
const G = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
const R = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
const PARITY = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

export function ean13CheckDigit(twelve: string): number {
  const sum = twelve
    .split("")
    .map(Number)
    .reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 1 : 3), 0);
  return (10 - (sum % 10)) % 10;
}

export function ean13(twelve: string): { code: string; modules: string } {
  if (!/^\d{12}$/.test(twelve)) throw new Error("EAN-13 : 12 chiffres attendus");
  const code = `${twelve}${ean13CheckDigit(twelve)}`;
  const digits = code.split("").map(Number);
  const parity = PARITY[digits[0]];
  let modules = "101";
  for (let i = 1; i <= 6; i++) modules += (parity[i - 1] === "L" ? L : G)[digits[i]];
  modules += "01010";
  for (let i = 7; i <= 12; i++) modules += R[digits[i]];
  modules += "101";
  return { code, modules };
}

/** Regroupe les modules en barres { x, w } pour un rendu SVG compact. */
export function toBars(modules: string): { x: number; w: number; guard: boolean }[] {
  const bars: { x: number; w: number; guard: boolean }[] = [];
  const guardRanges = [
    [0, 3],
    [45, 50],
    [92, 95],
  ];
  let i = 0;
  while (i < modules.length) {
    if (modules[i] === "1") {
      let j = i;
      while (j < modules.length && modules[j] === "1") j++;
      const guard = guardRanges.some(([a, b]) => i >= a && i < b);
      bars.push({ x: i, w: j - i, guard });
      i = j;
    } else i++;
  }
  return bars;
}
