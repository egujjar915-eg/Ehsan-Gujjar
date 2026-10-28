import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  Plus,
  Minus,
  Share2,
  PhoneCall
} from 'lucide-react';
import { PRODUCTS, STORE_SETTINGS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, toggleWishlist, isInWishlist, setIsCartOpen, formatPrice, addToast } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'delivery'>('desc');

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-3">Produit non trouvé</h1>
        <p className="text-sm text-[#66716D] mb-6">
          Le produit demandé n'existe pas ou n'est plus disponible.
        </p>
        <Link
          to="/boutique"
          className="px-6 py-2.5 bg-[#075B49] text-white text-xs font-bold rounded-full"
        >
          Retourner au catalogue
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Lien du produit copié dans le presse-papier !', 'info');
    }
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#87918D] mb-6" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-[#075B49] transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/boutique" className="hover:text-[#075B49] transition-colors">
          Boutique
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          to={`/categorie/${product.categorySlug}`}
          className="hover:text-[#075B49] transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#17211F] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        {/* Left Column: Product Gallery / Image (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl bg-[#F5F6F6] border border-[#E6EBE8] p-8 flex items-center justify-center overflow-hidden shadow-xs">
            {product.discountPercent && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#16865F] text-white text-xs font-bold rounded-lg shadow-xs z-10">
                Remise -{product.discountPercent}%
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Quick trust row under image */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-[#F4F8F6] rounded-2xl border border-[#E6EBE8] text-center text-[11px] text-[#66716D]">
            <div className="p-1">
              <Truck className="w-4 h-4 text-[#12866C] mx-auto mb-1" />
              <span className="font-semibold block text-[#17211F]">58 Wilayas</span>
              <span>Livraison express</span>
            </div>
            <div className="p-1 border-x border-[#E6EBE8]">
              <ShieldCheck className="w-4 h-4 text-[#12866C] mx-auto mb-1" />
              <span className="font-semibold block text-[#17211F]">Paiement</span>
              <span>À la livraison</span>
            </div>
            <div className="p-1">
              <RotateCcw className="w-4 h-4 text-[#12866C] mx-auto mb-1" />
              <span className="font-semibold block text-[#17211F]">Garantie</span>
              <span>12 mois atelier</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Details & Purchase Module (6-7 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Category & Actions */}
            <div className="flex items-center justify-between text-xs text-[#87918D] mb-2">
              <Link
                to={`/categorie/${product.categorySlug}`}
                className="uppercase tracking-wider font-bold text-[#12866C] hover:underline"
              >
                {product.category}
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-1.5 text-[#66716D] hover:text-[#17211F] rounded-full hover:bg-[#F5F6F6] transition-colors"
                  title="Partager le produit"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-1.5 rounded-full hover:bg-[#F5F6F6] transition-colors ${
                    isWishlisted ? 'text-rose-600' : 'text-[#66716D] hover:text-[#17211F]'
                  }`}
                  title={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211F] tracking-tight mb-3">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#17211F]">{product.rating} / 5</span>
              <span className="text-xs text-[#87918D]">·</span>
              <span className="text-xs text-[#66716D]">
                {product.reviewsCount} avis clients vérifiés
              </span>
            </div>

            {/* Price section */}
            <div className="p-4 bg-[#EDF6F1]/60 rounded-2xl border border-[#CCD7D2]/60 mb-6 flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-extrabold text-[#075B49] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="ml-3 text-base text-[#87918D] line-through tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <p className="text-[11px] text-[#66716D] mt-0.5">
                  Prix TTC avec facture et bon de garantie inclus
                </p>
              </div>
              <span className="px-2.5 py-1 bg-[#16865F] text-white text-xs font-bold rounded-full">
                En stock
              </span>
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#66716D] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Key Features List */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#17211F] mb-3">
                Points forts du produit
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#17211F]">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#EDF6F1] flex items-center justify-center shrink-0 text-[#12866C]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Module: Quantity + Add To Cart */}
          <div className="pt-6 border-t border-[#E6EBE8] space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center justify-between border border-[#CCD7D2] rounded-full p-1 bg-[#F5F6F6] sm:w-36">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-full bg-white text-[#17211F] hover:bg-[#EDF6F1] flex items-center justify-center transition-colors shadow-2xs"
                  aria-label="Diminuer quantité"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold tabular-nums text-[#17211F] px-2">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-full bg-white text-[#17211F] hover:bg-[#EDF6F1] flex items-center justify-center transition-colors shadow-2xs"
                  aria-label="Augmenter quantité"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-8 bg-[#075B49] hover:bg-[#12866C] text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Ajouter au panier ({formatPrice(product.price * quantity)})</span>
              </button>
            </div>

            {/* Quick Order by Phone assistance note */}
            <div className="flex items-center justify-between text-xs text-[#66716D] p-3 rounded-xl bg-[#F4F8F6]">
              <span className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#12866C]" />
                Besoin d'aide pour commander ?
              </span>
              <a
                href={`tel:${STORE_SETTINGS.supportPhone.replace(/\s+/g, '')}`}
                className="font-bold text-[#075B49] hover:underline"
              >
                {STORE_SETTINGS.supportPhone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Specifications, Delivery */}
      <div className="border-t border-[#E6EBE8] pt-10 mb-16">
        <div className="flex items-center gap-4 border-b border-[#E6EBE8] mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('desc')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'desc'
                ? 'border-[#075B49] text-[#075B49]'
                : 'border-transparent text-[#66716D] hover:text-[#17211F]'
            }`}
          >
            Description complète
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'specs'
                ? 'border-[#075B49] text-[#075B49]'
                : 'border-transparent text-[#66716D] hover:text-[#17211F]'
            }`}
          >
            Fiche technique
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('delivery')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'delivery'
                ? 'border-[#075B49] text-[#075B49]'
                : 'border-transparent text-[#66716D] hover:text-[#17211F]'
            }`}
          >
            Livraison & Retours
          </button>
        </div>

        {/* Tab 1: Detailed Description */}
        {activeTab === 'desc' && (
          <div className="prose max-w-none text-xs sm:text-sm text-[#66716D] space-y-4 leading-relaxed">
            <p>{product.description}</p>
            <p>
              Chaque produit proposé sur <strong>Nexora Tech</strong> fait l'objet d'un contrôle rigoureux de conformité et de qualité avant expédition. Vous bénéficiez d'un emballage soigné, sécurisé et prêt à l'emploi.
            </p>
          </div>
        )}

        {/* Tab 2: Specs Table */}
        {activeTab === 'specs' && (
          <div className="bg-white rounded-2xl border border-[#E6EBE8] overflow-hidden">
            <table className="w-full text-xs sm:text-sm">
              <tbody className="divide-y divide-[#E6EBE8]">
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FBFA]'}>
                    <td className="px-4 py-3 font-semibold text-[#17211F] w-1/3 sm:w-1/4">
                      {key}
                    </td>
                    <td className="px-4 py-3 text-[#66716D]">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Delivery Terms */}
        {activeTab === 'delivery' && (
          <div className="bg-[#F4F8F6] rounded-2xl border border-[#E6EBE8] p-6 space-y-4 text-xs sm:text-sm text-[#66716D]">
            <h4 className="font-bold text-[#17211F]">Expédition dans toute l'Algérie (58 wilayas)</h4>
            <p>
              Les commandes sont préparées le jour même et remises à nos partenaires de livraison express.
              Délai moyen de livraison : 24h à 48h sur Alger, Oran, Constantine, Sétif et grandes métropoles ; 48h à 72h pour les autres wilayas.
            </p>
            <h4 className="font-bold text-[#17211F]">Paiement à la réception</h4>
            <p>
              Vous ne payez qu'une fois votre colis entre vos mains. Vous pouvez vérifier l'état du colis avant de régler le livreur.
            </p>
            <h4 className="font-bold text-[#17211F]">Garantie & Service après-vente</h4>
            <p>
              Tous nos équipements bénéficient d'une garantie atelier légale de 12 mois contre tout défaut de fabrication. Notre service client est disponible 7j/7 pour vous accompagner.
            </p>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-[#E6EBE8]">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#17211F] mb-6">
            Vous pourriez aussi aimer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
