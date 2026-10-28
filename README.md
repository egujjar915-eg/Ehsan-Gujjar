# Nexora Tech — Boutique E-Commerce Électronique Premium

Nexora Tech est une boutique en ligne haut de gamme d'électronique grand public et d'innovations technologiques conçue spécialement pour le marché algérien (couverture intégrale des 58 wilayas, prix en Dinars Algériens DA, paiement sécurisé à la livraison).

## 🚀 Technologies utilisées

- **React 19** & **TypeScript**
- **Vite** pour un build ultra-rapide et optimisé
- **Tailwind CSS v4** avec design tokens sur-mesure (palette vert foncé `#075B49`, `#12866C`, `#082F29` et blanc épuré)
- **Lucide React** pour des icônes minimalistes et légères
- **React Router DOM v7** pour le routage client
- **Context API** pour la gestion d'état réactive (panier persistant, wishlist, modal aperçu rapide, notifications toast)

## 📁 Architecture du projet

```
/
├── public/
│   ├── .htaccess             # Configuration de redirection Apache pour Hostinger SPA
│   └── assets/
├── src/
│   ├── assets/images/        # Photographies de studio haute fidélité générées
│   ├── components/
│   │   ├── common/           # Logo vectoriel Nexora, Toasts, Modales
│   │   ├── layout/           # Header fixe, navigation, recherche live, Footer riche
│   │   ├── home/             # Hero carrousel, Catégories, Produits phares, Bannière promo, Avantages
│   │   ├── product/          # Cartes produits, Vue rapide interactive
│   │   └── cart/             # Tiroir panier slide-over avec jauge livraison offerte
│   ├── context/              # StoreContext (panier, wishlist, prix DA, stockage local)
│   ├── data/                 # Produits réalistes, 6 catégories, liste des 58 wilayas
│   ├── pages/                # Accueil, Boutique, Catégories, Fiche produit, Panier, Commande, À propos, Contact, FAQ, Mentions
│   ├── types/                # Types TypeScript stricts
│   ├── App.tsx               # Routeur et mise en page globale
│   ├── main.tsx              # Point d'entrée React
│   └── index.css             # Import Tailwind et variables de thème
├── index.html                # Balises SEO complètes en français
├── package.json
└── vite.config.ts
```

## 💻 Démarrage en local

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:3000`.

3. Compiler pour la production :
   ```bash
   npm run build
   ```

## 🌐 Déploiement sur Hostinger (Hébergement Web / cPanel / hPanel)

1. Générez les fichiers de production avec :
   ```bash
   npm run build
   ```
2. Un dossier `dist/` est créé à la racine du projet contenant :
   - `index.html`
   - `.htaccess` (pour la gestion des routes React Router sans erreur 404 au rafraîchissement)
   - Le dossier `assets/` (JS, CSS minifiés et images de haute qualité)
3. Connectez-vous à votre panneau de contrôle Hostinger (hPanel ou cPanel) > **Gestionnaire de fichiers** (ou via FTP / FileZilla).
4. Accédez au répertoire public de votre domaine, généralement `public_html/`.
5. Transférez directement l'intégralité du contenu du dossier `dist/` dans `public_html/`.
6. Votre boutique en ligne est instantanément opérationnelle en ligne avec certificat SSL actif !

---
© 2026 Nexora Tech. Tous droits réservés.
