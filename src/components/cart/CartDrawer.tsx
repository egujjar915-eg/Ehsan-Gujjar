import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { STORE_SETTINGS } from '../../data/products';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingCost,
    total,
    formatPrice
  } = useStore();
  const navigate = useNavigate();

  // Escape key closes drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingDifference = STORE_SETTINGS.freeShippingThreshold - subtotal;
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / STORE_SETTINGS.freeShippingThreshold) * 100)
  );

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/commande');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#E6EBE8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#075B49]" />
              <h2 className="text-lg font-bold text-[#17211F]">Votre Panier</h2>
              <span className="text-xs font-semibold px-2 py-0.5 bg-[#EDF6F1] text-[#075B49] rounded-full">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#66716D] hover:text-[#17211F] rounded-lg hover:bg-[#F4F8F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C]"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="bg-[#F4F8F6] p-3.5 border-b border-[#E6EBE8]">
              <div className="flex items-center justify-between text-xs font-medium text-[#17211F] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#12866C]" />
                  {freeShippingDifference > 0 ? (
                    <>
                      Plus que{' '}
                      <strong className="text-[#075B49] font-bold">
                        {formatPrice(freeShippingDifference)}
                      </strong>{' '}
                      pour la livraison offerte !
                    </>
                  ) : (
                    <span className="text-[#075B49] font-bold">
                      Félicitations ! Vous bénéficiez de la livraison offerte !
                    </span>
                  )}
                </span>
                <span className="font-bold text-[#075B49]">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-[#E6EBE8] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#12866C] h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#EDF6F1] flex items-center justify-center text-[#12866C]">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#17211F]">
                    Votre panier est vide
                  </h3>
                  <p className="text-xs text-[#66716D] mt-1 max-w-xs">
                    Découvrez notre catalogue de smartphones, ordinateurs et accessoires haute performance.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/boutique');
                  }}
                  className="px-6 py-2.5 bg-[#075B49] hover:bg-[#12866C] text-white text-xs font-semibold rounded-full shadow-sm transition-colors flex items-center gap-2"
                >
                  <span>Continuer mes achats</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#E6EBE8]">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex gap-3.5">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl bg-[#F5F6F6] p-1.5 shrink-0 border border-[#E6EBE8] flex items-center justify-center overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/produit/${item.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="text-sm font-semibold text-[#17211F] hover:text-[#075B49] line-clamp-1 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#87918D] hover:text-[#C53C3C] p-1 transition-colors"
                            aria-label={`Supprimer ${item.product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-[#87918D]">{item.product.category}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#E6EBE8] rounded-lg overflow-hidden bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-[#66716D] hover:bg-[#F4F8F6] transition-colors"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold tabular-nums text-[#17211F]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-[#66716D] hover:bg-[#F4F8F6] transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm font-bold text-[#075B49] tabular-nums">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E6EBE8] bg-[#F4F8F6] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#66716D]">
                  <span>Sous-total</span>
                  <span className="font-semibold text-[#17211F] tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[#66716D]">
                  <span>Frais de livraison estimés</span>
                  <span className="font-semibold text-[#17211F] tabular-nums">
                    {shippingCost === 0 ? (
                      <span className="text-[#12866C] font-bold">Offerte</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E6EBE8] flex justify-between text-sm">
                  <span className="font-bold text-[#17211F]">Total TTC</span>
                  <span className="font-extrabold text-base text-[#075B49] tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Security note */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#66716D]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#12866C] shrink-0" />
                <span>Paiement en espèces ou CIB à la livraison</span>
              </div>

              {/* Checkout CTA */}
              <div className="pt-1 space-y-2">
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full py-3 bg-[#075B49] hover:bg-[#12866C] text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Passer à la commande</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2 text-center text-xs font-semibold text-[#66716D] hover:text-[#17211F] transition-colors"
                >
                  Continuer mes achats
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
