# Contenu : écrire et publier

## Ton éditorial

- Français professionnel, phrases courtes, vocabulaire du commerce.
- Concret : « Scannez un produit et ajoutez-le immédiatement à la vente. »
- Pas de jargon ni d'emphase (« révolutionnaire », « propulsez »…).
- Montants en DH avec espace insécable : `1 280 DH`.
- Aucune affirmation non vérifiée : pas de chiffres d'utilisateurs, d'avis, de partenaires inventés.
- Vérifiez chaque description de fonctionnalité dans l'application avant publication.

## Ajouter une page de documentation

1. Créez `content/docs/mon-slug.mdx` :

   ```mdx
   ---
   title: Titre de la page
   description: Une phrase qui résume la page (affichée sous le titre et dans Google).
   updatedAt: 2026-10-05
   keywords: [DigiStock mot-clé, autre mot-clé]
   ---

   Introduction en une ou deux phrases.

   ## Première section

   Contenu…
   ```

2. Ajoutez `"mon-slug"` à la bonne section dans `src/config/docs.ts` (l'ordre détermine la barre latérale et les liens précédent / suivant).
3. `npm test` puis `npm run build`.

Composants disponibles dans les fichiers MDX :

```mdx
<Callout type="info" title="Titre optionnel">Texte avec **markdown**.</Callout>
<Callout type="tip">…</Callout>
<Callout type="warning">…</Callout>
<PremiumBadge />
<Screenshot name="pos" caption="Légende" />
<Screenshot name="dashboard" caption="Légende" />
```

Raccourcis clavier : `<kbd>F9</kbd>`. Blocs de code : triple accent grave avec la langue (```` ```csv ````) — un bouton « Copier » est ajouté automatiquement.

Les titres `##` et `###` alimentent la table des matières et la recherche.

## Ajouter un guide (blog)

1. Créez `content/blog/mon-slug.mdx` :

   ```mdx
   ---
   title: Comment … ?
   description: Ce que le lecteur va apprendre, en 150 caractères environ.
   date: 2026-11-02
   updatedAt: 2026-11-02
   category: Gestion de stock
   keywords: [mot-clé principal, variante]
   related: [slug-d-un-autre-guide]
   ---
   ```

2. Rédigez : introduction, méthode en étapes, exemples chiffrés, erreurs fréquentes, résumé. Ajoutez 2 à 3 liens vers les pages produit pertinentes.
3. L'article apparaît automatiquement sur `/blog`, dans le sitemap, avec son image Open Graph et ses données structurées.
4. Pour garder un brouillon hors ligne : `draft: true` dans le frontmatter.

## Modifier une page fonctionnalité ou solution

Le contenu est dans `src/data/features.ts` et `src/data/solutions.ts` : métadonnées, introduction, points clés, sections, étapes, FAQ, pages liées. Dans les paragraphes, `[texte](/chemin)` crée un lien interne.

Pour une nouvelle fonctionnalité : ajoutez un objet à `features` (le `slug` devient `/features/<slug>`), puis ajoutez-la à un groupe dans `src/app/fonctionnalites/page.tsx`.

## FAQ

`src/data/faq.ts`. `home: true` affiche la question sur la page d'accueil. Toutes les questions alimentent le schéma `FAQPage` de `/faq`.

## Notes de version

`src/data/changelog.ts` : ajoutez une entrée par version publiée (la plus récente en premier). La page `/changelog` devient indexée dès la première entrée.
