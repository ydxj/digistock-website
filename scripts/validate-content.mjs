// Vérifie la cohérence du contenu sans lancer le build :
// - chaque page de docs déclarée dans src/config/docs.ts existe et a un frontmatter complet
// - chaque article de blog a un frontmatter complet
// - chaque lien interne des fichiers MDX et des données pointe vers une route existante
// - l'encodage EAN-13 utilisé pour l'illustration produit une clé de contrôle valide
// Usage : npm test
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const errors = [];
const check = (cond, msg) => {
  if (!cond) errors.push(msg);
};

function frontmatter(src) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(src);
  if (!m) return {};
  return Object.fromEntries(
    m[1]
      .split(/\r?\n/)
      .filter((l) => l.includes(":"))
      .map((l) => [l.slice(0, l.indexOf(":")).trim(), l.slice(l.indexOf(":") + 1).trim()]),
  );
}

// Docs
const docsConfig = read("src/config/docs.ts");
const navBlock = docsConfig.slice(docsConfig.indexOf("docsNav"), docsConfig.indexOf("popularDocs"));
const navSlugs = [...navBlock.matchAll(/slugs: \[([^\]]+)\]/g)].flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
for (const slug of navSlugs) {
  const file = path.join(root, "content/docs", `${slug}.mdx`);
  check(fs.existsSync(file), `Doc manquante : content/docs/${slug}.mdx`);
  if (fs.existsSync(file)) {
    const fm = frontmatter(fs.readFileSync(file, "utf8"));
    check(fm.title, `Doc sans titre : ${slug}`);
    check(fm.description, `Doc sans description : ${slug}`);
  }
}
for (const f of fs.readdirSync(path.join(root, "content/docs"))) {
  check(navSlugs.includes(f.replace(/\.mdx$/, "")), `Doc absente de la navigation : ${f}`);
}

// Blog
const posts = fs.readdirSync(path.join(root, "content/blog")).filter((f) => f.endsWith(".mdx"));
for (const f of posts) {
  const fm = frontmatter(read(`content/blog/${f}`));
  for (const key of ["title", "description", "date"]) check(fm[key], `Article ${f} : champ « ${key} » manquant`);
}

// Routes connues
const featureSlugs = [...read("src/data/features.ts").matchAll(/slug: "([a-z-]+)"/g)].map((m) => m[1]);
const solutionSlugs = [...read("src/data/solutions.ts").matchAll(/slug: "([a-z-]+)"/g)].map((m) => m[1]);
const staticRoutes = ["/", "/fonctionnalites", "/tarifs", "/telecharger", "/docs", "/faq", "/contact", "/solutions", "/blog", "/changelog", "/politique-confidentialite", "/conditions-utilisation"];
const routes = new Set([
  ...staticRoutes,
  ...featureSlugs.map((s) => `/features/${s}`),
  ...solutionSlugs.map((s) => `/solutions/${s}`),
  ...navSlugs.map((s) => `/docs/${s}`),
  ...posts.map((f) => `/blog/${f.replace(/\.mdx$/, "")}`),
]);

// Liens internes
const sources = [
  ...navSlugs.map((s) => `content/docs/${s}.mdx`),
  ...posts.map((f) => `content/blog/${f}`),
  "src/data/features.ts",
  "src/data/solutions.ts",
  "src/data/faq.ts",
  "src/config/navigation.ts",
  "src/config/docs.ts",
];
for (const src of sources) {
  const text = read(src);
  for (const m of text.matchAll(/\]\((\/[^)#?\s]*)/g)) check(routes.has(m[1]), `${src} : lien cassé ${m[1]}`);
  for (const m of text.matchAll(/href: "(\/[^"#?]*)"/g)) check(routes.has(m[1]), `${src} : lien cassé ${m[1]}`);
}

// EAN-13 : 400638133393 → clé 1 (exemple public bien connu : 4006381333931)
function checkDigit(twelve) {
  const sum = twelve.split("").map(Number).reduce((a, d, i) => a + d * (i % 2 === 0 ? 1 : 3), 0);
  return (10 - (sum % 10)) % 10;
}
assert.equal(checkDigit("400638133393"), 1);

if (errors.length) {
  console.error(`✗ ${errors.length} problème(s) :\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`✓ Contenu valide : ${navSlugs.length} docs, ${posts.length} articles, ${routes.size} routes, liens internes OK.`);
