import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, formatPrice } =
    useStore();
  const [imageError, setImageError] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-[#E6EBE8] hover:border-[#12866C]/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-[#F5F6F6] flex items-center justify-center p-4 overflow-hidden">
        {/* Badges top left */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="px-2 py-0.5 bg-[#16865F] text-white text-[11px] font-bold rounded-md shadow-xs">
              -{product.discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 bg-[#075B49] text-white text-[10px] font-semibold tracking-wide uppercase rounded-md">
              Nouveau
            </span>
          )}
        </div>

        {/* Wishlist Button top right */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/90 text-[#66716D] hover:text-[#075B49] hover:bg-white'
          }`}
          aria-label={
            isWishlisted
              ? `Retirer ${product.name} de la liste d'envies`
              : `Ajouter ${product.name} à la liste d'envies`
          }
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isWishlisted ? 'fill-current scale-110' : ''
            }`}
          />
        </button>

        {/* Quick View Button overlay on hover */}
        <button
          type="button"
          onClick={handleQuickView}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 px-3 py-1.5 bg-white/95 hover:bg-white text-[#17211F] text-xs font-semibold rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-xs"
        >
          <Eye className="w-3.5 h-3.5 text-[#12866C]" />
          <span>Aperçu</span>
        </button>

        {/* Product Image with Fallback */}
        <Link
          to={`/produit/${product.slug}`}
          className="w-full h-full flex items-center justify-center cursor-pointer"
        >
          {!imageError ? (
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#EDF6F1] text-[#075B49] p-4 text-center rounded-xl">
              <span className="text-2xl font-bold mb-1">Nexora</span>
              <span className="text-xs font-medium text-[#66716D]">{product.name}</span>
            </div>
          )}
        </Link>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <div className="flex items-center justify-between text-xs text-[#87918D] mb-1">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-[#66716D]">
              {product.category}
            </span>
            {/* Rating */}
            <div className="flex items-center gap-1 text-[11px] text-[#66716D]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-[#17211F]">{product.rating}</span>
              <span>({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link
            to={`/produit/${product.slug}`}
            className="block text-sm font-semibold text-[#17211F] hover:text-[#075B49] line-clamp-1 transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Short description */}
          <p className="text-xs text-[#66716D] line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & CTA */}
        <div className="mt-4 pt-3 border-t border-[#E6EBE8]/60 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-[#075B49] tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#87918D] line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#16865F] font-medium">En stock</span>
          </div>

          {/* Add to Cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-2.5 px-4 bg-[#EDF6F1] hover:bg-[#075B49] text-[#075B49] hover:text-white text-xs font-bold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C]"
          >
            <ShoppingCart className="w-3.5 h-3.5 transition-transform group-hover/btn:scale-110" />
            <span>Ajouter au panier</span>
          </button>
        </div>
      </div>
    </div>
  );
};
