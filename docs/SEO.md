# SEO — DigiStock

Objectif : donner à DigiStock les meilleures chances réalistes de se positionner sur les recherches liées à la gestion de stock et de caisse au Maroc, en français, sans pages de faible qualité ni techniques artificielles.

## 1. Mots-clés cibles et pages associées

Chaque intention de recherche a **une page principale**. Évitez de créer une seconde page sur la même intention (cannibalisation).

| Intention / mots-clés | Page principale |
| --- | --- |
| logiciel gestion de stock, logiciel de gestion de stock Maroc, logiciel stock Maroc, application gestion de stock | `/` |
| gestion stock magasin, gestion stock DH, gestion de stock hors ligne | `/features/gestion-stock` |
| logiciel caisse Maroc, application caisse magasin, logiciel de caisse gratuit, logiciel ventes magasin | `/features/caisse` |
| logiciel code barre magasin | `/features/code-barres` |
| logiciel inventaire Maroc | `/features/inventaire` |
| logiciel crédit client | `/features/credits-clients` |
| logiciel gestion client | `/features/clients` |
| logiciel gestion fournisseur | `/features/fournisseurs` |
| réapprovisionnement, gestion des achats | `/features/achats` |
| logiciel gestion entrepôt | `/features/multi-entrepots`, `/solutions/entrepot` |
| logiciel pour magasin Maroc, logiciel gestion magasin | `/solutions/magasin` |
| logiciel gestion grossiste | `/solutions/grossiste` |
| logiciel pour PME Maroc | `/solutions/distribution`, `/solutions/petite-usine` |
| logiciel de stock gratuit | `/tarifs` |
| logiciel gestion stock Windows, application stock Windows | `/telecharger` |
| comment gérer son stock, faire un inventaire, calculer le stock minimum, crédits clients | `/blog/*` |
| DigiStock + fonction (marque) | `/docs/*` |

Règle : les mots-clés sont employés naturellement dans le H1, l'introduction, un ou deux intertitres et la meta description. Jamais de répétition artificielle.

## 2. Architecture des pages

```text
/                         page pilier (marque + « logiciel de gestion de stock »)
├── /fonctionnalites      hub → 11 pages /features/*
├── /solutions            hub → 6 pages /solutions/*
├── /tarifs  /telecharger pages de conversion
├── /docs                 hub → 36 pages (recherches de marque, « comment utiliser DigiStock »)
├── /blog                 guides informationnels (haut de tunnel)
└── /faq  /contact  pages légales
```

Toutes les pages importantes sont à **trois clics maximum** de l'accueil (menu principal, pied de page, hubs).

## 3. Maillage interne

Le maillage suit le parcours réel d'un commerçant :

- guide inventaire → `/features/inventaire` → `/docs/inventaire`
- `/features/gestion-stock` → code-barres, inventaire, achats, multi-entrepôts
- `/features/code-barres` → caisse
- `/features/caisse` → crédits clients, WhatsApp
- `/solutions/*` → les 5 fonctionnalités les plus utiles du métier + offre conseillée
- `/docs/*` → pages produit correspondantes et docs voisines (précédent / suivant)
- chaque guide → 2 à 3 pages produit + guides liés

Les liens dans les textes (`[texte](/chemin)`) sont vérifiés par `npm test`.

## 4. Métadonnées

Générées par `src/lib/metadata.ts` (`buildMetadata`) pour chaque page :

- `title` (≤ 60 caractères visés), suffixe « | DigiStock » automatique
- `description` (140 à 160 caractères, orientée bénéfice)
- `canonical` absolu (basé sur `NEXT_PUBLIC_SITE_URL`) : les paramètres d'URL (`?utm_…`) ne créent pas de doublon
- `alternates.languages` (`fr-MA`, `x-default`), prêt pour `ar` / `en`
- Open Graph, Twitter `summary_large_image`, `robots` (`max-image-preview: large`)
- `noindex` sur la 404 et sur `/changelog` tant qu'il est vide

Images Open Graph générées au build (`src/lib/og.tsx`) avec le logo et une vraie capture : une image par défaut, une par article.

## 5. Données structurées

Composant `JsonLd` + générateurs dans `src/lib/schema.ts` :

| Type | Où |
| --- | --- |
| `Organization`, `WebSite` | toutes les pages (layout) |
| `SoftwareApplication` (BusinessApplication, Windows 10/11, offre gratuite en MAD) | `/`, `/telecharger` |
| `BreadcrumbList` | toutes les pages intérieures |
| `FAQPage` | `/faq`, `/tarifs`, `/features/*`, `/solutions/*` |
| `HowTo` | `/features/*` (si étapes), `/telecharger` |
| `Article` | `/blog/*` |
| `TechArticle` | `/docs/*` |

Volontairement absents : `aggregateRating`, `review`, nombre d'utilisateurs ou de téléchargements. Ne les ajoutez que si des données réelles et vérifiables existent.

Validation : [Test des résultats enrichis](https://search.google.com/test/rich-results) et [Schema Markup Validator](https://validator.schema.org/).

## 6. Sitemap et robots

- `/sitemap.xml` (`src/app/sitemap.ts`) : pages statiques, fonctionnalités, solutions, docs, articles (ajoutés automatiquement), pages légales, `/changelog` dès qu'une version est publiée.
- `/robots.txt` (`src/app/robots.ts`) : tout est autorisé sauf `/api/` ; les déploiements de prévisualisation Vercel sont entièrement bloqués (`VERCEL_ENV !== "production"`).

## 7. Search Console

1. Déployez le site sur le domaine définitif et renseignez `NEXT_PUBLIC_SITE_URL`.
2. Ouvrez [Google Search Console](https://search.google.com/search-console).
3. Ajoutez une propriété **Domaine** (recommandé, vérification DNS) ou **Préfixe d'URL**.
4. Vérifiez : enregistrement DNS TXT chez votre registrar, ou balise meta → copiez la valeur `content` dans `NEXT_PUBLIC_GSC_VERIFICATION` et redéployez.
5. **Sitemaps** → soumettez `sitemap.xml`.
6. **Inspection de l'URL** : inspectez `/`, `/fonctionnalites`, `/features/caisse`, `/features/gestion-stock`, `/tarifs`, `/telecharger`.
7. **Demander l'indexation** pour ces pages.
8. Surveillez **Pages** (erreurs d'exploration) et **Expérience** (Core Web Vitals) chaque semaine le premier mois.

## 8. Bing Webmaster Tools

1. Ouvrez [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Option rapide : **Importer depuis Google Search Console**.
3. Sinon, ajoutez le site et vérifiez via balise meta : copiez la valeur `msvalidate.01` dans `NEXT_PUBLIC_BING_VERIFICATION` et redéployez.
4. Soumettez `https://votre-domaine/sitemap.xml`.
5. Bing alimente aussi DuckDuckGo et d'autres moteurs.

## 9. Stratégie de publication

- **Qualité avant quantité** : un guide utile par mois vaut mieux que dix articles génériques.
- Chaque article répond à **une** question réelle d'un commerçant, avec méthode, exemples chiffrés en DH et liens vers la page produit pertinente.
- Pas de pages par ville (`/casablanca`, `/rabat`…) sans contenu réellement différent (clients, cas d'usage, partenaires locaux).
- Mettez à jour `updatedAt` quand un article est réellement révisé.

Idées de prochains guides (non publiés) :

1. Comment utiliser un lecteur code-barres dans un magasin ?
2. Quelle solution de gestion de stock choisir au Maroc ?
3. Gestion de stock Excel ou logiciel dédié : que choisir ?
4. Comment éviter les ruptures de stock ?
5. Comment gérer plusieurs entrepôts ?
6. Comment choisir un logiciel de caisse au Maroc ?

## 10. Feuille de route après lancement

### Mois 1
- Vérifier Search Console et Bing, soumettre le sitemap.
- Demander l'indexation des pages principales.
- Corriger toute erreur d'exploration ou de couverture.
- Publier l'installateur et renseigner `NEXT_PUBLIC_DOWNLOAD_URL`.
- Publier 1 à 2 guides de fond supplémentaires.

### Mois 2
- Enrichir les pages fonctionnalités avec de nouvelles captures (produits, rapports, inventaire, clients).
- Améliorer les articles selon les premières requêtes observées.
- Obtenir des liens légitimes : site DigiStudio, annuaires professionnels marocains sérieux, associations de commerçants, partenaires (revendeurs de matériel de caisse, comptables).
- Créer / compléter les fiches d'entreprise pertinentes (Google Business Profile de DigiStudio si applicable).

### Mois 3 et suivants
- Analyser les requêtes (Search Console → Performances).
- Retravailler les pages classées entre la 5ᵉ et la 20ᵉ position : titre, introduction, sections manquantes, maillage.
- Tenir la documentation à jour à chaque version (et `/changelog`).
- Publier des guides répondant aux requêtes réellement observées.
- Rechercher des liens sectoriels (presse économique, blogs de gestion, études de cas clients réelles avec accord).
- Créer des contenus de comparaison honnêtes (« Excel ou logiciel ») et des ressources téléchargeables (modèle d'inventaire).

**À proscrire** : achat de liens, réseaux de sites, échanges massifs de liens, commentaires spam, pages satellites, contenu généré en masse.

## 11. Contrôles avant mise en ligne

- [ ] `NEXT_PUBLIC_SITE_URL` défini (canonicals et sitemap corrects)
- [ ] `/robots.txt` autorise le site en production
- [ ] `/sitemap.xml` liste ~68 URL
- [ ] Données structurées validées (rich results test)
- [ ] Partage testé (aperçu Open Graph sur WhatsApp / LinkedIn)
- [ ] Lighthouse mobile sur `/`, `/features/caisse`, `/docs/nouvelle-vente`
