export type FAQItem = { question: string; answer: string };

export type ContentSection = {
  title: string;
  /** Paragraphes ; la syntaxe [texte](/lien) crée un lien interne. */
  paragraphs: string[];
  bullets?: string[];
};

export type Step = { title: string; text: string };

export type Highlight = { title: string; text: string };

export type LinkRef = { label: string; href: string };
