# Déploiement (Vercel)

Aucun `vercel.json` n'est nécessaire : en-têtes, redirections et cache sont gérés par `next.config.ts`.

## Premier déploiement

1. Poussez le dépôt sur GitHub, GitLab ou Bitbucket.
2. Sur [vercel.com](https://vercel.com) : **Add New → Project**, importez le dépôt. Vercel détecte Next.js (commande `next build`, Node ≥ 20.9).
3. **Environment Variables** (Production) :
   - `NEXT_PUBLIC_SITE_URL` = `https://votre-domaine` (**obligatoire**)
   - `NEXT_PUBLIC_DOWNLOAD_URL` = optionnel, remplace le lien GitHub défini dans `src/config/product.ts`
   - optionnel : `NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_BING_VERIFICATION`, `NEXT_PUBLIC_VERCEL_ANALYTICS`, `NEXT_PUBLIC_GA_ID`
4. **Deploy**.

Les variables `NEXT_PUBLIC_*` sont intégrées au build : après modification, **redéployez**.

## Domaine

1. **Settings → Domains** : ajoutez le domaine (et `www` avec redirection vers le domaine principal, ou l'inverse).
2. Configurez les enregistrements DNS indiqués par Vercel chez votre registrar.
3. Vérifiez que `NEXT_PUBLIC_SITE_URL` correspond exactement au domaine principal (même protocole, avec ou sans `www`).

## Prévisualisations

Les déploiements de prévisualisation (`VERCEL_ENV=preview`) renvoient un `robots.txt` qui bloque l'indexation. Seule la production est indexable.

## Hébergement de l'installateur

L'installateur Windows (souvent > 50 Mo) ne doit pas être placé dans `public/`. Hébergez-le sur un stockage adapté (GitHub Releases, Vercel Blob, Cloudflare R2, S3…) et renseignez son URL dans `NEXT_PUBLIC_DOWNLOAD_URL`. Signez l'exécutable (certificat de signature de code) pour limiter les avertissements Windows SmartScreen.

## Analytique

- **Vercel Analytics** : activez-le dans **Analytics** du projet, puis `NEXT_PUBLIC_VERCEL_ANALYTICS=1`. Sans cookie. Les clics de téléchargement sont envoyés comme événement `download_click`.
- **Google Analytics 4** (optionnel) : `NEXT_PUBLIC_GA_ID=G-…`. Mettez alors à jour la politique de confidentialité si nécessaire (elle s'adapte déjà automatiquement à la présence d'une mesure d'audience) et évaluez le besoin d'un bandeau de consentement.

## Search Console et Bing

Procédures détaillées dans [`SEO.md`](SEO.md#7-search-console).

## Vérifications après déploiement

```bash
curl -I https://votre-domaine/
```

- [ ] `https://votre-domaine/robots.txt` autorise le site et pointe vers le sitemap
- [ ] `https://votre-domaine/sitemap.xml` contient des URL avec le bon domaine
- [ ] La balise `<link rel="canonical">` de l'accueil pointe vers le bon domaine
- [ ] `https://votre-domaine/opengraph-image` affiche l'image de partage
- [ ] Le bouton de téléchargement pointe vers l'installateur
- [ ] Lighthouse (mobile) sur l'accueil
