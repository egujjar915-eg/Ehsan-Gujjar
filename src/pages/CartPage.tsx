import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Tag, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_SETTINGS } from '../data/products';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, subtotal, shippingCost, total, formatPrice, addToast } =
    useStore();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'NEXORA10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      addToast('Code promo NEXORA10 appliqué (-10%) !', 'success');
    } else {
      addToast('Code promo non valide ou expiré', 'error');
    }
  };

  const finalTotal = Math.max(0, total - discountAmount);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-[#EDF6F1] text-[#075B49] rounded-full mx-auto flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-[#17211F] mb-2">Votre panier est vide</h1>
        <p className="text-sm text-[#66716D] max-w-md mx-auto mb-6">
          Vous n'avez pas encore sélectionné d'articles. Découvrez notre gamme de smartphones, ordinateurs et équipements audio.
        </p>
        <Link
          to="/boutique"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#075B49] text-white text-xs font-bold rounded-full shadow-md hover:bg-[#12866C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explorer la boutique</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211F] mb-8">
        Mon Panier d'Achats ({cart.reduce((s, i) => s + i.quantity, 0)})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Products Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E6EBE8] overflow-hidden shadow-xs">
          <div className="p-4 sm:p-6 divide-y divide-[#E6EBE8]">
            {cart.map((item) => (
              <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                {/* Thumbnail & Title */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-20 h-20 rounded-2xl bg-[#F5F6F6] p-2 shrink-0 border border-[#E6EBE8] flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-[#12866C] uppercase">
                      {item.product.category}
                    </span>
                    <Link
                      to={`/produit/${item.product.slug}`}
                      className="block text-sm font-semibold text-[#17211F] hover:text-[#075B49] truncate"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-[#87918D] tabular-nums mt-0.5">
                      {formatPrice(item.product.price)} l'unité
                    </p>
                  </div>
                </div>

                {/* Stepper + Total + Delete */}
                <div className="flex items-center justify-between sm:justify-end gap-6">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#CCD7D2] rounded-full p-1 bg-[#F5F6F6]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-white text-[#17211F] hover:bg-[#EDF6F1] flex items-center justify-center transition-colors"
                      aria-label="Diminuer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-white text-[#17211F] hover:bg-[#EDF6F1] flex items-center justify-center transition-colors"
                      aria-label="Augmenter"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[100px]">
                    <span className="text-sm font-bold text-[#075B49] tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>

                  {/* Trash */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-[#87918D] hover:text-[#C53C3C] hover:bg-[#F5F6F6] rounded-lg transition-colors"
                    aria-label="Supprimer cet article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#F4F8F6] border-t border-[#E6EBE8] flex items-center justify-between">
            <Link
              to="/boutique"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12866C] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continuer mes achats</span>
            </Link>
          </div>
        </div>

        {/* Order Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E6EBE8] p-6 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-[#17211F] pb-3 border-b border-[#E6EBE8]">
              Récapitulatif de la commande
            </h2>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-[#66716D]">
                <span>Sous-total articles</span>
                <span className="font-semibold text-[#17211F] tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-[#66716D]">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#12866C]" />
                  Livraison estimée (58 wilayas)
                </span>
                <span className="font-semibold text-[#17211F] tabular-nums">
                  {shippingCost === 0 ? (
                    <span className="text-[#16865F] font-bold">Offerte</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#16865F] font-semibold">
                  <span>Remise code promo</span>
                  <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-[#E6EBE8] flex justify-between text-base">
                <span className="font-extrabold text-[#17211F]">Total TTC</span>
                <span className="font-extrabold text-[#075B49] text-xl tabular-nums">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="pt-2">
              <label className="block text-xs font-semibold text-[#17211F] mb-1.5">
                Avez-vous un code promo ?
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Ex: NEXORA10"
                    className="w-full px-3 py-2 text-xs bg-[#F5F6F6] rounded-xl border border-[#CCD7D2] uppercase focus:outline-none focus:border-[#12866C]"
                  />
                  <Tag className="w-3 h-3 text-[#87918D] absolute right-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#EDF6F1] hover:bg-[#075B49] text-[#075B49] hover:text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Appliquer
                </button>
              </div>
            </form>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={() => navigate('/commande')}
              className="w-full py-3.5 bg-[#075B49] hover:bg-[#12866C] text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Passer à la commande</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-[#66716D] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#12866C]" />
              <span>Commande vérifiée sans prépaiement obligatoire</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
