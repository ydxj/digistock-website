import "server-only";
import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import { docsNav } from "@/config/docs";

/**
 * Chargement du contenu MDX (documentation et blog) au moment du build.
 * Le frontmatter est un sous-ensemble YAML simple : `clé: valeur` et
 * listes `[a, b, c]`.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Heading = { depth: 2 | 3; text: string; id: string };

type BaseFrontmatter = {
  title: string;
  description: string;
  date?: string;
  updatedAt?: string;
  keywords?: string[];
};

export type DocMeta = BaseFrontmatter & {
  slug: string;
  section: string;
  headings: Heading[];
  readingTime: number;
  /** Texte brut indexé par la recherche. */
  plain: string;
};

export type PostMeta = BaseFrontmatter & {
  slug: string;
  date: string;
  category: string;
  related?: string[];
  headings: Heading[];
  readingTime: number;
};

function parseValue(raw: string): string | string[] {
  const v = raw.trim();
  if (v.startsWith("[") && v.endsWith("]")) {
    return v
      .slice(1, -1)
      .split(",")
      .map((s) => s.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  return v.replace(/^["']|["']$/g, "");
}

export function parseFrontmatter(source: string): { data: Record<string, string | string[]>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { data: {}, body: source };
  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    if (!key) continue;
    data[key] = parseValue(line.slice(idx + 1));
  }
  return { data, body: source.slice(match[0].length) };
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Extrait les titres h2/h3 avec les mêmes identifiants que rehype-slug. */
export function extractHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inCode = false;
  for (const line of body.split(/\r?\n/)) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = /^(##|###)\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[`*_]/g, "");
    headings.push({ depth: m[1].length as 2 | 3, text, id: slugger.slug(text) });
  }
  return headings;
}

function readingTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function readFile(kind: "docs" | "blog", slug: string): string | null {
  const file = path.join(CONTENT_DIR, kind, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

function str(v: string | string[] | undefined): string {
  return typeof v === "string" ? v : "";
}

function list(v: string | string[] | undefined): string[] | undefined {
  return Array.isArray(v) ? v : v ? [v] : undefined;
}

/* ------------------------------------------------------------------ Docs */

let docsCache: DocMeta[] | null = null;

export function getAllDocs(): DocMeta[] {
  if (docsCache) return docsCache;
  const docs: DocMeta[] = [];
  for (const section of docsNav) {
    for (const slug of section.slugs) {
      const source = readFile("docs", slug);
      if (!source) throw new Error(`Documentation manquante : content/docs/${slug}.mdx`);
      const { data, body } = parseFrontmatter(source);
      const plain = stripMarkdown(body);
      docs.push({
        slug,
        section: section.title,
        title: str(data.title),
        description: str(data.description),
        updatedAt: str(data.updatedAt) || undefined,
        keywords: list(data.keywords),
        headings: extractHeadings(body),
        readingTime: readingTime(plain),
        plain,
      });
    }
  }
  docsCache = docs;
  return docs;
}

export function getDoc(slug: string): DocMeta | undefined {
  return getAllDocs().find((d) => d.slug === slug);
}

export function getDocNeighbours(slug: string): { prev?: DocMeta; next?: DocMeta } {
  const docs = getAllDocs();
  const i = docs.findIndex((d) => d.slug === slug);
  return { prev: i > 0 ? docs[i - 1] : undefined, next: i >= 0 && i < docs.length - 1 ? docs[i + 1] : undefined };
}

/* ------------------------------------------------------------------ Blog */

let postsCache: PostMeta[] | null = null;

export function getAllPosts(): PostMeta[] {
  if (postsCache) return postsCache;
  const dir = path.join(CONTENT_DIR, "blog");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")) : [];
  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data, body } = parseFrontmatter(fs.readFileSync(path.join(dir, file), "utf8"));
      if (str(data.draft) === "true") return null;
      const post: PostMeta = {
        slug,
        title: str(data.title),
        description: str(data.description),
        date: str(data.date),
        updatedAt: str(data.updatedAt) || undefined,
        category: str(data.category) || "Guide",
        keywords: list(data.keywords),
        related: list(data.related),
        headings: extractHeadings(body),
        readingTime: readingTime(stripMarkdown(body)),
      };
      return post;
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  postsCache = posts;
  return posts;
}

export function getPost(slug: string): PostMeta | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
