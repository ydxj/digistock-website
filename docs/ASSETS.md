# Ressources graphiques

## Inventaire

| Fichier | Origine | Usage |
| --- | --- | --- |
| `public/images/brand/digistock-logo.png` | Logo officiel, fond noir supprimé, « Digi » recoloré en bleu nuit `#071126` | En-tête et pied de page (fond clair) |
| `public/images/brand/digistock-logo-white.png` | Logo officiel, fond noir supprimé, couleurs d'origine | Fonds sombres |
| `public/images/brand/digistock-icon.png` | Icône officielle, détourée en carré arrondi, 512 px | Bloc d'appel final, JSON-LD `logo` |
| `src/app/favicon.ico` | Icône officielle (16, 32, 48 px) | Favicon |
| `src/app/icon.png` | Icône 512 px transparente | Icône navigateur |
| `src/app/apple-icon.png` | Icône sur fond `#071126`, 180 px | iOS |
| `public/icons/icon-192.png`, `icon-512.png`, `maskable-512.png` | Icône sur fond `#071126` | Manifeste |
| `public/images/app/dashboard-dark.webp` | Capture réelle : Tableau de bord, mode sombre (1919 × 1024) | Accueil, vitrine, pages fonctionnalités, docs |
| `public/images/app/pos-light.webp` | Capture réelle : Nouvelle vente, mode clair (1919 × 1022) | Accueil, caisse, docs, image Open Graph |
| `assets/og/*` | Versions JPEG / PNG réduites (non publiques) | Génération des images Open Graph |

La mention « powered by digistudio.dev » du logo d'origine n'est pas reprise dans l'en-tête : elle est remplacée par le texte « par DigiStudio », plus lisible et accessible.

La capture `dashboard-dark` contenait une ligne verte d'un pixel (artefact de capture) à la ligne 662 : elle a été remplacée par la moyenne des lignes voisines. Aucune autre retouche n'a été faite sur les captures.

## Ajouter une capture d'écran

1. Capturez la fenêtre DigiStock complète (barre de titre comprise), en 1920 px de large si possible, sans données personnelles réelles de clients.
2. Convertissez en WebP de bonne qualité (≈ 90-95) et placez-la dans `public/images/app/`, par exemple `products-light.webp`.
3. Déclarez-la dans `src/data/screens.ts` :

   ```ts
   {
     id: "produits",
     label: "Produits",
     alt: "Liste des produits DigiStock avec stock, prix et catégories",
     light: { src: "/images/app/products-light.webp", width: 1920, height: 1024 },
     dark: { src: "/images/app/products-dark.webp", width: 1920, height: 1024 },
     notes: [ { title: "…", text: "…" } ],
   }
   ```

4. La vitrine de l'accueil ajoute l'onglet automatiquement. Le sélecteur « Mode clair / Mode sombre » apparaît pour chaque écran qui possède les deux variantes.

Captures prioritaires à fournir : Tableau de bord (clair), Nouvelle vente (sombre), Produits, Rapports, Mouvements de stock, Inventaire, Crédits clients, Fournisseurs, WhatsApp.

`next/image` génère automatiquement les versions AVIF / WebP redimensionnées : gardez des sources en haute résolution.

## Régénérer les icônes

Le script de traitement initial utilisait Python / Pillow : découpe de l'icône (carré arrondi, rayon ≈ 190 px sur la source 1254 px), export ICO multi-tailles et PNG. Si l'icône change, régénérez les fichiers listés ci-dessus aux mêmes tailles.
