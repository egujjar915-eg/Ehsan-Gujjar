import { Product, Category } from '../types';

export const WILAYAS = [
  "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna", 
  "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira", 
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou", 
  "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda", 
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine", 
  "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla", 
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arreridj", "35 - Boumerdès", 
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela", 
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma", 
  "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - Timimoun", 
  "50 - Bordj Badji Mokhtar", "51 - Ouled Djellal", "52 - Béni Abbès", "53 - In Salah", 
  "54 - In Guezzam", "55 - Touggourt", "56 - Djanet", "57 - El M'Ghair", "58 - El Meniaa"
];

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    slug: 'smartphones',
    name: 'Smartphones',
    description: 'Dernière génération de téléphones mobiles aux performances exceptionnelles.',
    image: '/src/assets/images/category_smartphones_1793162857871.jpg',
    itemCount: 2
  },
  {
    id: 'cat-2',
    slug: 'ordinateurs',
    name: 'Ordinateurs',
    description: 'Ultrabooks légers et ordinateurs portables hautes performances.',
    image: '/src/assets/images/category_laptops_1793162859199.jpg',
    itemCount: 2
  },
  {
    id: 'cat-3',
    slug: 'audio',
    name: 'Audio',
    description: 'Casques haute fidélité et écouteurs sans fil avec réduction de bruit.',
    image: '/src/assets/images/category_audio_1793162859799.jpg',
    itemCount: 3
  },
  {
    id: 'cat-4',
    slug: 'montres-connectees',
    name: 'Montres connectées',
    description: 'Montres intelligentes pour le suivi de santé et le style quotidien.',
    image: '/src/assets/images/category_smartwatches_1793162860310.jpg',
    itemCount: 2
  },
  {
    id: 'cat-5',
    slug: 'gaming',
    name: 'Gaming',
    description: 'Manettes ergonomiques sans fil et accessoires de jeu immersifs.',
    image: '/src/assets/images/category_gaming_1793162878855.jpg',
    itemCount: 1
  },
  {
    id: 'cat-6',
    slug: 'accessoires',
    name: 'Accessoires',
    description: 'Chargeurs rapides GaN, câbles renforcés et batteries nomades.',
    image: '/src/assets/images/category_accessories_1793162878737.jpg',
    itemCount: 2
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'smartphone-pro-256-go',
    name: 'Smartphone Pro 256 Go',
    category: 'Smartphones',
    categorySlug: 'smartphones',
    price: 99900,
    originalPrice: 109900,
    discountPercent: 9,
    rating: 4.9,
    reviewsCount: 38,
    image: '/src/assets/images/category_smartphones_1793162857871.jpg',
    shortDescription: 'Écran OLED 120Hz adaptatif, triple capteur photo 50MP et autonomie de 2 jours.',
    description: 'Le Smartphone Pro 256 Go combine une finition titane brossé à un processeur octa-core de dernière génération. Profitez d\'un affichage ultra-lumineux en plein soleil, d\'une recharge ultra-rapide 65W et d\'une protection contre la poussière et les éclaboussures.',
    inStock: true,
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    features: [
      'Écran AMOLED 6.7" Quad HD+ 120Hz',
      'Stockage ultra-rapide UFS 4.0 256 Go',
      'Triple optique stabilisée 50MP + Ultra-Wide + Téléobjectif 3x',
      'Batterie longue durée 5000 mAh avec charge 65W',
      'Connectivité 5G & Wi-Fi 7'
    ],
    specs: {
      'Processeur': 'Octa-Core 3.4 GHz 4nm',
      'Mémoire RAM': '12 Go LPDDR5X',
      'Stockage': '256 Go',
      'Écran': '6.7 pouces OLED LTPO 1-120Hz',
      'Batterie': '5000 mAh',
      'Garantie': '12 mois atelier'
    }
  },
  {
    id: 'prod-2',
    slug: 'ultrabook-air-13',
    name: 'Ultrabook Air 13',
    category: 'Ordinateurs',
    categorySlug: 'ordinateurs',
    price: 129900,
    originalPrice: 139900,
    discountPercent: 7,
    rating: 4.8,
    reviewsCount: 24,
    image: '/src/assets/images/category_laptops_1793162859199.jpg',
    shortDescription: 'Châssis aluminium ultra-fin 1.2 kg, autonomie jusqu\'à 16 heures et écran Retina.',
    description: 'L\'Ultrabook Air 13 est pensé pour les professionnels nomades et les étudiants exigeants. Avec son clavier rétroéclairé silencieux, son pavé tactile en verre trempé et sa dissipation thermique passive silencieuse, travaillez où vous voulez sans compromis.',
    inStock: true,
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    features: [
      'Poids plume de 1.24 kg seulement',
      'Écran 13.3" IPS 2.8K 100% sRGB',
      '16 Go de mémoire unifiée pour le multitâche',
      'Autonomie record de 16h en bureautique',
      'Deux ports USB-C Thunderbolt 4'
    ],
    specs: {
      'Processeur': 'Quad-Core 10-Core GPU',
      'Mémoire RAM': '16 Go',
      'Disque SSD': '512 Go NVMe',
      'Écran': '13.3" Retina 2560x1600',
      'Poids': '1.24 kg',
      'Garantie': '12 mois atelier'
    }
  },
  {
    id: 'prod-3',
    slug: 'ecouteurs-sans-fil-pro',
    name: 'Écouteurs sans fil Pro',
    category: 'Audio',
    categorySlug: 'audio',
    price: 6490,
    originalPrice: 7990,
    discountPercent: 19,
    rating: 4.7,
    reviewsCount: 62,
    image: '/src/assets/images/hero_tech_ecosystem_1793162857715.jpg',
    shortDescription: 'Réduction active du bruit hybride, audio spatial 360° et boîtier rechargeable USB-C.',
    description: 'Plongez dans votre musique sans aucune distraction extérieure. Les Écouteurs sans fil Pro intègrent deux microphones dédiés au filtrage intelligent des bruits ambiants ainsi qu\'un mode transparence instantané.',
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    features: [
      'Réduction active du bruit (ANC) jusqu\'à -35dB',
      'Mode Transparence d\'une simple pression',
      'Autonomie 7h par écouteur (30h avec boîtier)',
      'Résistance à la transpiration IPX5',
      'Connexion multipoint Bluetooth 5.3'
    ],
    specs: {
      'Transducteurs': '11mm titane dynamique',
      'Autonomie': '30 heures totales',
      'Connectivité': 'Bluetooth 5.3',
      'Poids': '4.5g par écouteur',
      'Recharge': 'USB-C + recharge sans fil Qi'
    }
  },
  {
    id: 'prod-4',
    slug: 'montre-connectee-series-6',
    name: 'Montre connectée Series 6',
    category: 'Montres connectées',
    categorySlug: 'montres-connectees',
    price: 6990,
    originalPrice: 8490,
    discountPercent: 18,
    rating: 4.8,
    reviewsCount: 41,
    image: '/src/assets/images/category_smartwatches_1793162860310.jpg',
    shortDescription: 'Suivi cardiaque en continu, SpO2, GPS intégré et plus de 90 modes sportifs.',
    description: 'Votre partenaire bien-être et performance au poignet. Son écran tactile AMOLED Always-On vous informe en temps réel de vos notifications d\'appels, messages, objectifs sportifs et qualité de sommeil.',
    inStock: true,
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    features: [
      'Écran AMOLED 1.43" tactile haute résolution',
      'Cardiofréquencemètre optique et oxymètre SpO2',
      'GPS haute précision multi-satellites',
      'Étanchéité 5 ATM (natation jusqu\'à 50m)',
      'Autonomie jusqu\'à 10 jours en usage classique'
    ],
    specs: {
      'Écran': 'AMOLED 466x466 pixels',
      'Batterie': '420 mAh (autonomie 10 jours)',
      'Étanchéité': '5 ATM (50m)',
      'Compatibilité': 'Android & iOS',
      'Bracelets': 'Silicone interchangeable standard 22mm'
    }
  },
  {
    id: 'prod-5',
    slug: 'casque-audio-studio',
    name: 'Casque audio Studio',
    category: 'Audio',
    categorySlug: 'audio',
    price: 8990,
    originalPrice: 10990,
    discountPercent: 18,
    rating: 4.9,
    reviewsCount: 31,
    image: '/src/assets/images/category_audio_1793162859799.jpg',
    shortDescription: 'Transducteurs 40mm personnalisés, coussinets à mémoire de forme et autonomie de 40h.',
    description: 'Conçu pour les passionnés de musique et les longues sessions de travail ou de voyage. Bénéficiez d\'une scène sonore riche, de basses profondes et équilibrées, et d\'un confort longue durée exceptionnel.',
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    features: [
      'Transducteurs 40mm à dôme polymère haute résolution',
      'Coussinets en mousse à mémoire de forme ultra-confort',
      'Autonomie record de 40 heures avec ANC actif',
      'Recharge rapide : 10 minutes offrent 4 heures d\'écoute',
      'Microphone avec suppression de bruit pour les appels'
    ],
    specs: {
      'Réponse en fréquence': '20 Hz – 40 000 Hz',
      'Autonomie': '40h (ANC on) / 60h (ANC off)',
      'Poids': '248g',
      'Connectivité': 'Bluetooth 5.3 + Prise Jack 3.5mm',
      'Port de charge': 'USB-C'
    }
  },
  {
    id: 'prod-6',
    slug: 'smartphone-essentiel',
    name: 'Smartphone Essentiel',
    category: 'Smartphones',
    categorySlug: 'smartphones',
    price: 34900,
    rating: 4.6,
    reviewsCount: 57,
    image: '/src/assets/images/category_smartphones_1793162857871.jpg',
    shortDescription: 'Grand écran 6.5" 90Hz, batterie 5000 mAh et double appareil photo optimisé par IA.',
    description: 'La technologie moderne au juste prix. Le Smartphone Essentiel offre toute la fluidité nécessaire pour vos applications favorites, vos réseaux sociaux et vos appels visio grâce à son processeur 8 cœurs fiable et économe.',
    inStock: true,
    isNew: false,
    isFeatured: false,
    features: [
      'Écran fluide 90Hz HD+ 6.5 pouces',
      'Double appareil photo 50MP avec mode nuit dédié',
      'Grande autonomie jusqu\'à 2 jours complets',
      'Lecteur d\'empreintes digitales latéral rapide',
      'Extension possible par carte MicroSD jusqu\'à 1 To'
    ],
    specs: {
      'Mémoire': '4 Go RAM + 128 Go Stockage',
      'Batterie': '5000 mAh avec charge 18W',
      'Écran': '6.5" LCD 90Hz',
      'Double SIM': 'Oui, compatible 4G LTE Algérie',
      'Système': 'Android avec mises à jour sécurisées'
    }
  },
  {
    id: 'prod-7',
    slug: 'ordinateur-portable-performance',
    name: 'Ordinateur portable Performance',
    category: 'Ordinateurs',
    categorySlug: 'ordinateurs',
    price: 159900,
    originalPrice: 179900,
    discountPercent: 11,
    rating: 4.9,
    reviewsCount: 19,
    image: '/src/assets/images/category_laptops_1793162859199.jpg',
    shortDescription: 'Processeur Core 16 cœurs, carte graphique dédiée et écran 15.6" 144Hz.',
    description: 'Une véritable station de travail polyvalente pour la création de contenu vidéo, la modélisation 3D, le développement et le gaming exigeant. Son système de refroidissement à double ventilateur maintient des performances stables.',
    inStock: true,
    isNew: true,
    isFeatured: true,
    features: [
      'Processeur 16 cœurs cadencé jusqu\'à 5.0 GHz',
      'Carte graphique dédiée pour le montage et le jeu',
      '32 Go de mémoire RAM DDR5 ultra-rapide',
      'SSD NVMe PCIe Gen 4 de 1 To',
      'Écran IPS 15.6" Full HD 144Hz anti-reflets'
    ],
    specs: {
      'Processeur': 'Core i7 13700H / Ryzen 7',
      'Mémoire': '32 Go DDR5 5200MHz',
      'Stockage': '1 To SSD NVMe M.2',
      'Écran': '15.6" IPS 144Hz 300 nits',
      'Poids': '1.98 kg',
      'Connectique': 'HDMI 2.1, 2x USB-C, 2x USB-A, RJ45'
    }
  },
  {
    id: 'prod-8',
    slug: 'manette-de-jeu-sans-fil',
    name: 'Manette de jeu sans fil',
    category: 'Gaming',
    categorySlug: 'gaming',
    price: 7490,
    originalPrice: 8990,
    discountPercent: 17,
    rating: 4.8,
    reviewsCount: 45,
    image: '/src/assets/images/category_gaming_1793162878855.jpg',
    shortDescription: 'Gâchettes magnétiques à effet Hall, vibrations haptiques et batterie 20h.',
    description: 'Prenez l\'avantage dans chaque partie grâce aux joysticks et gâchettes à effet Hall sans drift. Compatible PC, consoles, smartphones et téléviseurs connectés grâce à sa connectivité Bluetooth et dongle 2.4 GHz inclus.',
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    features: [
      'Gâchettes et joysticks Hall Effect inusables',
      'Vibrations haptiques doubles réglables',
      'Boutons arrière configurables',
      'Connexion sans latence : Bluetooth 5.0 + 2.4G USB Dongle',
      'Batterie rechargeable 1000 mAh'
    ],
    specs: {
      'Compatibilité': 'PC Windows, Android, iOS, Consoles',
      'Autonomie': 'Jusqu\'à 20 heures de jeu',
      'Connexion': 'Sans fil 2.4G + Bluetooth + Câble USB-C',
      'Poids': '225g'
    }
  },
  {
    id: 'prod-9',
    slug: 'chargeur-rapide-usb-c',
    name: 'Chargeur rapide USB-C 65W GaN',
    category: 'Accessoires',
    categorySlug: 'accessoires',
    price: 2490,
    originalPrice: 2990,
    discountPercent: 17,
    rating: 4.9,
    reviewsCount: 78,
    image: '/src/assets/images/category_accessories_1793162878737.jpg',
    shortDescription: 'Technologie GaN compacte, deux ports USB-C + un port USB-A pour charger 3 appareils.',
    description: 'Un seul chargeur format poche pour alimenter votre ordinateur portable, votre smartphone et vos écouteurs simultanément. Régulation thermique active et protection certifiée contre les surtensions.',
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    features: [
      'Technologie au Nitrure de Gallium (GaN) miniature',
      'Puissance maximale 65W Power Delivery 3.0',
      'Recharge simultanée de 3 appareils',
      'Protection contre les surchauffes et courts-circuits',
      'Câble tressé 100W renforcé inclus'
    ],
    specs: {
      'Puissance': '65W Max',
      'Ports': '2x USB Type-C + 1x USB Type-A',
      'Entrée': '100-240V ~ 50/60Hz',
      'Poids': '115g'
    }
  },
  {
    id: 'prod-10',
    slug: 'batterie-externe-20000-mah',
    name: 'Batterie externe 20 000 mAh',
    category: 'Accessoires',
    categorySlug: 'accessoires',
    price: 4990,
    originalPrice: 5990,
    discountPercent: 17,
    rating: 4.8,
    reviewsCount: 52,
    image: '/src/assets/images/category_accessories_1793162878737.jpg',
    shortDescription: 'Affichage numérique LCD du pourcentage, recharge rapide 22.5W et format avion approuvé.',
    description: 'Ne manquez plus jamais d\'énergie en déplacement. Cette batterie externe de haute capacité permet de recharger un smartphone standard jusqu\'à 4 fois complètes avec son affichage LED clair du niveau exact de batterie.',
    inStock: true,
    isFeatured: false,
    features: [
      'Haute capacité certifiée 20 000 mAh',
      'Écran LCD précis indiquant le pourcentage restant',
      'Recharge rapide bidirectionnelle 22.5W',
      '3 sorties de charge simultanées',
      'Coque résistante aux chocs et anti-rayures'
    ],
    specs: {
      'Capacité': '20 000 mAh / 74Wh',
      'Sorties': '2x USB-A (22.5W) + 1x USB-C (20W PD)',
      'Dimensions': '145 x 68 x 28 mm',
      'Poids': '390g'
    }
  },
  {
    id: 'prod-11',
    slug: 'ecouteurs-compacts-sans-fil',
    name: 'Écouteurs compacts sans fil',
    category: 'Audio',
    categorySlug: 'audio',
    price: 3990,
    rating: 4.5,
    reviewsCount: 39,
    image: '/src/assets/images/category_audio_1793162859799.jpg',
    shortDescription: 'Design ergonomique ultra-léger, son équilibré et boîtier de poche élégant.',
    description: 'Des écouteurs quotidiens fiables et agréables à porter pour la musique, les podcasts et vos appels. Appairage instantané dès l\'ouverture de l\'étui.',
    inStock: true,
    isNew: false,
    isFeatured: false,
    features: [
      'Poids plume de 3.8g par oreillette',
      'Son clair avec accents de basse équilibrés',
      'Autonomie totale de 24 heures',
      'Commandes tactiles intuitives',
      'Bluetooth 5.3 avec connexion stable'
    ],
    specs: {
      'Transducteurs': '10mm dynamiques',
      'Autonomie': '6h + 18h avec étui',
      'Recharge': 'USB-C rapide',
      'Étanchéité': 'IPX4 résistant aux éclaboussures'
    }
  },
  {
    id: 'prod-12',
    slug: 'montre-connectee-sport',
    name: 'Montre connectée Sport',
    category: 'Montres connectées',
    categorySlug: 'montres-connectees',
    price: 5990,
    originalPrice: 6990,
    discountPercent: 14,
    rating: 4.7,
    reviewsCount: 29,
    image: '/src/assets/images/category_smartwatches_1793162860310.jpg',
    shortDescription: 'Bracelet sport respirant, cardiofréquencemètre en direct et suivi du sommeil profond.',
    description: 'Robuste, légère et prête pour tous vos entraînements sportifs en salle ou en extérieur. Synchronisation automatique avec votre téléphone pour visualiser vos progrès.',
    inStock: true,
    isFeatured: false,
    features: [
      'Boîtier renforcé résistant aux chocs',
      'Suivi en continu de la fréquence cardiaque et des calories',
      'Analyse avancée des cycles de sommeil',
      'Autonomie jusqu\'à 14 jours d\'affilée',
      'Notifications d\'appels et messages entrants'
    ],
    specs: {
      'Écran': 'TFT couleur HD 1.39"',
      'Batterie': 'Autonomie 14 jours',
      'Étanchéité': 'IP68 immersion temporaire',
      'Connectivité': 'Bluetooth BLE 5.2'
    }
  }
];

export const STORE_SETTINGS = {
  brandName: 'Nexora Tech',
  brandTagline: 'Votre quotidien, en mieux.',
  currency: 'DA',
  shippingCostHome: 600,
  shippingCostRelay: 400,
  freeShippingThreshold: 15000,
  supportPhone: '+213 (0) 550 00 00 00',
  supportEmail: 'contact@nexoratech.dz',
  location: 'Alger, Algérie',
  deliveryCoverage: 'Livraison express dans les 58 wilayas d\'Algérie'
};
