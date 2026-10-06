# DigiStock — site officiel

Site vitrine, documentation et guides de **DigiStock**, le logiciel Windows de gestion de stock et de caisse pour les entreprises marocaines, édité par [DigiStudio](https://digistudio.dev).

- Langue : français (`fr-MA`), devise : MAD / DH
- 83 pages statiques : accueil, fonctionnalités, solutions par métier, tarifs, téléchargement, documentation (36 pages), guides, FAQ, contact, pages légales
- Aucun témoignage, chiffre ou prix inventé : tout ce qui est inconnu est configurable

## Stack

| Élément | Choix |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Langage | TypeScript strict |
| Styles | Tailwind CSS v4 (tokens dans `src/app/globals.css`) |
| Contenu | MDX (`@next/mdx`, `remark-gfm`, `remark-frontmatter`, `rehype-slug`) |
| Icônes | `lucide-react` |
| Polices | Geist / Geist Mono via `next/font` (auto-hébergées) |
| Analytique | Vercel Analytics (optionnel), GA4 (optionnel) |

Pas de librairie d'animation : les apparitions au défilement utilisent les *scroll-driven animations* CSS et respectent `prefers-reduced-motion`. Seuls quelques composants sont « client » (en-tête, vitrine de captures, recherche de la doc, bouton de téléchargement, formulaire de contact, bouton copier).

## Démarrage

```bash
npm install
npm run dev        # http://localhost:3000
```

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (toutes les pages sont pré-rendues) |
| `npm run start` | Sert le build de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Génère les types de routes et lance `tsc` |
| `npm test` | Valide le contenu : docs déclarées, frontmatter, liens internes |

Node.js ≥ 20.9 requis.

## Variables d'environnement

Copiez `.env.example` en `.env.local` (local) ou renseignez-les dans Vercel.

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Obligatoire en production.** URL publique sans slash final, utilisée pour les canonicals, le sitemap, Open Graph et JSON-LD. À défaut : `VERCEL_PROJECT_PRODUCTION_URL`, puis `http://localhost:3000`. |
| `NEXT_PUBLIC_DOWNLOAD_URL` | Optionnel. Remplace le lien de l'installateur défini dans `src/config/product.ts` (actuellement la release GitHub `DigiStock_1.0.2`). |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Code de vérification Google Search Console. |
| `NEXT_PUBLIC_BING_VERIFICATION` | Code de vérification Bing Webmaster Tools. |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | `1` pour activer Vercel Analytics. |
| `NEXT_PUBLIC_GA_ID` | Identifiant GA4 (optionnel). |

Aucune variable ne contient de secret.

## Configuration métier (sans toucher aux composants)

| Fichier | Contenu |
| --- | --- |
| `src/config/product.ts` | Version, date de sortie, URL de téléchargement, taille de l'installateur, systèmes |
| `src/config/pricing.ts` | Offres Free / Premium, prix, tableau comparatif |
| `src/config/company.ts` | Coordonnées DigiStudio (e-mail, téléphone, WhatsApp, réseaux) |
| `src/config/seo.ts` | Titres par défaut, mots-clés, URL du site, vérifications |
| `src/config/navigation.ts` | Menus principal, pied de page, liens légaux |
| `src/config/docs.ts` | Ordre et sections de la documentation |
| `src/data/features.ts` | Contenu des 11 pages `/features/*` |
| `src/data/solutions.ts` | Contenu des 6 pages `/solutions/*` |
| `src/data/faq.ts` | FAQ (page `/faq` et accueil) |
| `src/data/screens.ts` | Captures d'écran de l'application |
| `src/data/changelog.ts` | Notes de version (`/changelog`) |

### Changer le lien de téléchargement ou la version

1. Publiez l'installateur dans une release GitHub (`digistudio-dev/digistock`), puis mettez à jour `downloadUrl` et `installerFileName` dans `src/config/product.ts` (ou `NEXT_PUBLIC_DOWNLOAD_URL` dans Vercel).
2. Mettez à jour `currentVersion`, `releaseDate` et `installerSize` dans `src/config/product.ts`.
3. Ajoutez une entrée dans `src/data/changelog.ts` : la page `/changelog` devient indexable et entre dans le sitemap.
4. Redéployez.

### Publier un prix

Dans `src/config/pricing.ts`, remplacez `price: null` par un montant en DH et indiquez `period` (ex. `"an"`). Le bouton peut rester « Nous contacter » ou devenir un lien d'achat.

### Ajouter les coordonnées

Renseignez `email`, `phone`, `whatsapp` et `socials` dans `src/config/company.ts`. Les champs vides ne sont jamais affichés ; le formulaire de contact n'apparaît qu'avec un e-mail.

## Structure

```text
content/
  docs/            36 pages de documentation (.mdx + frontmatter)
  blog/            guides longs (.mdx + frontmatter)
assets/og/         sources des images Open Graph (non publiques)
public/images/
  app/             captures réelles de l'application (.webp)
  brand/           logo (clair / blanc) et icône
public/icons/      icônes du manifeste
src/
  app/             routes (App Router), sitemap, robots, manifest, OG
  components/      ui/, layout/, marketing/, docs/, seo/
  sections/home/   sections de la page d'accueil
  config/          configuration centralisée
  data/            contenu structuré (fonctionnalités, solutions, FAQ…)
  lib/             contenu MDX, métadonnées, schema.org, analytique, code-barres
  types/
docs/              documentation développeur
scripts/           validation du contenu
```

## Ajouter du contenu

Voir [`docs/CONTENT.md`](docs/CONTENT.md). En bref :

- **Documentation** : créez `content/docs/mon-slug.mdx`, puis ajoutez `mon-slug` dans `src/config/docs.ts`.
- **Guide / article** : créez `content/blog/mon-slug.mdx`. Il apparaît automatiquement sur `/blog`, dans le sitemap et reçoit son image Open Graph.

Lancez `npm test` pour vérifier les liens internes.

## SEO

Métadonnées complètes par page (title, description, canonical, Open Graph, Twitter, robots), JSON-LD (`Organization`, `WebSite`, `SoftwareApplication`, `BreadcrumbList`, `FAQPage`, `HowTo`, `Article`, `TechArticle`), sitemap et robots dynamiques, fil d'Ariane, maillage interne. Détails, mots-clés et feuille de route : [`docs/SEO.md`](docs/SEO.md).

## Déploiement

Vercel, sans `vercel.json` : voir [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) (domaine, variables, Search Console, Bing).

## Documentation développeur

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — architecture et choix techniques
- [`docs/SEO.md`](docs/SEO.md) — stratégie SEO et feuille de route
- [`docs/CONTENT.md`](docs/CONTENT.md) — écrire et publier du contenu
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — Vercel, domaine, Search Console, Bing
- [`docs/ASSETS.md`](docs/ASSETS.md) — logo, icônes, captures d'écran
- [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md) — tâches récurrentes et checklist de version
