# Maintenance

## À chaque nouvelle version de DigiStock

- [ ] Release GitHub publiée avec l'installateur `DigiStock_<version>_x64-setup.exe`
- [ ] `src/config/product.ts` : `currentVersion`, `releaseDate`, `downloadUrl`, `installerFileName`, `installerSize`
- [ ] `src/data/changelog.ts` : nouvelle entrée
- [ ] Documentation : pages concernées mises à jour (`updatedAt`)
- [ ] Captures d'écran si l'interface a changé (`docs/ASSETS.md`)
- [ ] `npm test && npm run lint && npm run build`
- [ ] Redéploiement

## Chaque mois

- Search Console : erreurs d'exploration, pages non indexées, Core Web Vitals.
- Requêtes en progression : ajuster titres et contenus des pages concernées.
- Mettre à jour les dépendances mineures : `npm outdated`, puis `npm update`, `npm run build`.

## Chaque trimestre

- Relire les pages fonctionnalités, la FAQ et les tarifs : correspondent-ils toujours à l'application ?
- Mises à jour majeures (Next.js, React, Tailwind) : lire les guides de migration (`node_modules/next/dist/docs/`), tester localement.
- Lighthouse mobile sur l'accueil, une page fonctionnalité et une page de documentation.

## Commandes utiles

```bash
npm test            # cohérence du contenu et des liens internes
npm run lint
npm run typecheck
npm run build && npm run start
```

## Points d'attention

- Ne supprimez pas une page indexée sans redirection permanente (`redirects()` dans `next.config.ts`).
- Ne changez pas un slug de documentation ou d'article sans redirection.
- Toute nouvelle affirmation chiffrée (clients, téléchargements, avis) doit être réelle et vérifiable.
