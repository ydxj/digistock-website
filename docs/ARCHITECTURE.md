# Architecture

## Principes

1. **Statique d'abord.** Toutes les pages sont pré-rendues au build (`○` / `●` dans la sortie de `next build`). Aucune donnée n'est chargée à l'exécution, sauf l'index de recherche de la documentation (fichier JSON statique chargé à la demande).
2. **Server Components par défaut.** Les composants « client » sont limités au strict nécessaire :
   - `components/layout/header.tsx` : état de défilement, menu mobile (piège de focus, Échap)
   - `sections/home/app-showcase.tsx` : onglets d'écrans et sélecteur clair / sombre
   - `components/docs/docs-sidebar.tsx`, `docs-search.tsx`, `copy-button.tsx`
   - `components/marketing/download-button.tsx` : suivi du clic (non bloquant)
   - `components/marketing/contact-form.tsx` : validation, ouverture d'un e-mail prérempli
3. **Contenu séparé du code.** Textes longs en MDX (`content/`) ou en données typées (`src/data/`). Valeurs métier en configuration (`src/config/`).
4. **Aucune information inventée.** Pas d'avis, de note, de client ou de prix fictif. Les champs inconnus restent vides et ne s'affichent pas.

## Routes

| Route | Source | Rendu |
| --- | --- | --- |
| `/` | `app/page.tsx` + `sections/home/*` | statique |
| `/fonctionnalites` | `app/fonctionnalites/page.tsx` | statique |
| `/features/[slug]` | `data/features.ts` | SSG (`dynamicParams = false`) |
| `/solutions`, `/solutions/[slug]` | `data/solutions.ts` | statique / SSG |
| `/tarifs` | `config/pricing.ts` | statique |
| `/telecharger` | `config/product.ts` | statique |
| `/docs`, `/docs/[slug]` | `content/docs/*.mdx`, `config/docs.ts` | statique / SSG |
| `/docs/search-index.json` | route handler `force-static` | statique |
| `/blog`, `/blog/[slug]` | `content/blog/*.mdx` | statique / SSG |
| `/faq`, `/contact`, `/changelog`, pages légales | — | statique |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | fichiers de métadonnées | statique |
| `/opengraph-image`, `/blog/[slug]/opengraph-image` | `lib/og.tsx` (`next/og`) | statique |

Redirections permanentes (`next.config.ts`) : `/features` → `/fonctionnalites`, `/pricing` → `/tarifs`, `/download` → `/telecharger`, `/documentation` → `/docs`.

## Contenu MDX

- `lib/content.ts` lit `content/` au build : frontmatter (YAML simple), titres h2 / h3 (mêmes identifiants que `rehype-slug` grâce à `github-slugger`), temps de lecture, texte brut pour la recherche.
- Les pages importent dynamiquement le module MDX : `import(\`@content/docs/${slug}.mdx\`)` (alias `@content/*` dans `tsconfig.json`).
- Composants MDX disponibles (`src/mdx-components.tsx`) : `<Callout type="info|tip|warning" title="…">`, `<PremiumBadge />`, `<Screenshot name="pos|dashboard" caption="…" />`, blocs de code avec bouton « Copier », tableaux avec défilement horizontal.

## Système visuel

- Tokens dans `src/app/globals.css` (`@theme`) : `ink-*` (texte), `brand-*` (bleu de l'application, `#2563eb`), `navy-*` (sections sombres), `line` (bordures), rayons 6 à 14 px, ombres sobres.
- Utilitaires maison : `container-site` (1200 px), `container-wide` (1320 px), `bg-grid`, `tabular`, `.reveal` (apparition au défilement en CSS pur), `.prose` (docs, blog, pages légales).
- Typographie française : `frenchSpacing()` insère les espaces insécables avant `: ; ? !`.
- Composants de base : `Button` / `ButtonLink`, `Section`, `SectionHeader`, `Eyebrow`, `Logo`, `ScreenshotFrame`, `ScreenCrop` (détail d'une capture réelle sans la retoucher), `FeatureGrid`, `PricingCard`, `FAQList` (`<details>` natif), `Breadcrumbs`, `JsonLd`, `PageHero`, `FinalCTA`.

## Internationalisation (préparée)

Le site est en français uniquement. Pour ajouter l'arabe ou l'anglais :

1. Déplacer les routes sous `app/[lang]/` et générer `fr`, `ar`, `en` via `generateStaticParams`.
2. Dupliquer `content/` par langue (`content/fr/docs`, `content/ar/docs`…).
3. Compléter `alternates.languages` dans `lib/metadata.ts` (déjà présent avec `fr-MA` et `x-default`).
4. Pour l'arabe : `dir="rtl"` sur `<html>` et vérification des espacements logiques (`ps-*` / `pe-*`).

Ne publiez pas de pages partiellement traduites.

## Évolutions prévues par l'architecture

- **macOS** : ajouter une entrée dans `product.platforms` et un second `DownloadButton`.
- **Centre de téléchargement / notes de version** : `data/changelog.ts` alimente déjà `/changelog`.
- **Compte client, licences en ligne** : à ajouter dans des routes séparées (`app/(compte)/…`) sans impacter les pages statiques.

## Sécurité

En-têtes définis dans `next.config.ts` : `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`. Pas de point d'API : le formulaire de contact ouvre la messagerie de l'utilisateur (aucune donnée transmise au site, donc aucun risque de spam ou d'injection côté serveur). Le JSON-LD est échappé (`<` → `<`).

Si un formulaire serveur est ajouté plus tard : validation côté serveur, limitation de débit, champ piège anti-robot, secrets uniquement dans des variables non `NEXT_PUBLIC_`.
