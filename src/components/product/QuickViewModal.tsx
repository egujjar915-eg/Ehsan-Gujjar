import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Star, Check, ShieldCheck, Truck, Plus, Minus } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, formatPrice } = useStore();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [quickViewProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quickViewProduct) {
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Wrapper */}
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-[#E6EBE8]">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-[#66716D] hover:text-[#17211F] bg-[#F5F6F6] hover:bg-[#EDF6F1] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C]"
            aria-label="Fermer la vue rapide"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Col */}
            <div className="bg-[#F5F6F6] p-8 flex items-center justify-center relative">
              {quickViewProduct.discountPercent && (
                <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#16865F] text-white text-xs font-bold rounded-md">
                  -{quickViewProduct.discountPercent}%
                </span>
              )}
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="max-h-72 w-full object-contain drop-shadow-sm"
              />
            </div>

            {/* Content Col */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs text-[#87918D] mb-1.5">
                  <span className="uppercase tracking-wider font-semibold text-[#12866C]">
                    {quickViewProduct.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-[#17211F]">
                      {quickViewProduct.rating}
                    </span>
                    <span>({quickViewProduct.reviewsCount} avis)</span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-[#17211F] mb-2 leading-snug">
                  {quickViewProduct.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-extrabold text-[#075B49] tabular-nums">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-[#87918D] line-through tabular-nums">
                      {formatPrice(quickViewProduct.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#66716D] mb-4 leading-relaxed line-clamp-3">
                  {quickViewProduct.description}
                </p>

                {/* Key features */}
                <ul className="space-y-1.5 text-xs text-[#17211F] mb-6">
                  {quickViewProduct.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#12866C] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity and Actions */}
              <div className="pt-4 border-t border-[#E6EBE8] space-y-4">
                <div className="flex items-center gap-4">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#CCD7D2] rounded-full p-1 bg-[#F5F6F6]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-full bg-white text-[#17211F] hover:bg-[#EDF6F1] flex items-center justify-center transition-colors"
                      aria-label="Diminuer la quantité"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center text-xs font-bold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-full bg-white text-[#17211F] hover:bg-[#EDF6F1] flex items-center justify-center transition-colors"
                      aria-label="Augmenter la quantité"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-6 bg-[#075B49] hover:bg-[#12866C] text-white text-xs sm:text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Ajouter au panier</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#66716D] pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#12866C]" />
                    Livraison 58 wilayas
                  </span>
                  <Link
                    to={`/produit/${quickViewProduct.slug}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="font-bold text-[#12866C] hover:underline"
                  >
                    Voir la fiche complète →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
