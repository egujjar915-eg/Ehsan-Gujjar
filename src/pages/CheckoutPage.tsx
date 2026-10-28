import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  ArrowRight,
  ChevronRight,
  ShoppingBag,
  RotateCcw,
  Printer
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { WILAYAS, STORE_SETTINGS } from '../data/products';
import { OrderForm, OrderConfirmation } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, clearCart, formatPrice } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState<OrderForm>({
    fullName: '',
    phone: '',
    email: '',
    wilaya: '16 - Alger',
    commune: '',
    address: '',
    shippingMethod: 'home',
    paymentMethod: 'cod',
    notes: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute shipping based on choice and subtotal
  const shippingCost =
    subtotal >= STORE_SETTINGS.freeShippingThreshold
      ? 0
      : form.shippingMethod === 'home'
      ? STORE_SETTINGS.shippingCostHome
      : STORE_SETTINGS.shippingCostRelay;

  const total = subtotal + shippingCost;

  const validate = () => {
    const errs: Partial<Record<keyof OrderForm, string>> = {};
    if (!form.fullName.trim()) errs.fullName = 'Veuillez saisir votre nom et prénom';
    if (!form.phone.trim()) {
      errs.phone = 'Le numéro de téléphone est obligatoire pour la livraison';
    } else if (form.phone.replace(/\D/g, '').length < 9) {
      errs.phone = 'Veuillez saisir un numéro de téléphone algérien valide (ex: 0550 00 00 00)';
    }
    if (!form.commune.trim()) errs.commune = 'Veuillez renseigner votre commune ou ville';
    if (!form.address.trim()) errs.address = 'Veuillez préciser votre adresse exacte ou un point de repère';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate fast order creation
    setTimeout(() => {
      const orderNumber = `NEX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const confirmation: OrderConfirmation = {
        ...form,
        orderNumber,
        date: new Date().toLocaleDateString('fr-DZ', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items: [...cart],
        subtotal,
        shippingCost,
        total
      };

      setConfirmedOrder(confirmation);
      clearCart();
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  // If order was confirmed, show receipt state
  if (confirmedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="bg-white rounded-3xl border border-[#CCD7D2]/80 p-6 sm:p-10 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#EDF6F1] text-[#075B49] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-[#12866C]" />
          </div>

          <div>
            <span className="px-3 py-1 bg-[#EDF6F1] text-[#075B49] text-xs font-bold rounded-full">
              Commande confirmée avec succès
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211F] mt-2">
              Merci pour votre commande, {confirmedOrder.fullName} !
            </h1>
            <p className="text-xs sm:text-sm text-[#66716D] mt-1">
              Numéro de commande : <strong className="text-[#075B49]">{confirmedOrder.orderNumber}</strong> ({confirmedOrder.date})
            </p>
          </div>

          {/* Demo Note */}
          <div className="bg-[#F4F8F6] p-4 rounded-2xl border border-[#CCD7D2] text-xs text-[#66716D] max-w-xl mx-auto text-left">
            <p className="font-semibold text-[#075B49] mb-1">
              Mode Démonstration Nexora Tech :
            </p>
            <p>
              Votre commande test a bien été enregistrée localement. Dans une boutique en production, notre service logistique vous contactera par téléphone pour confirmer le créneau de livraison avant le départ du livreur.
            </p>
          </div>

          {/* Summary table */}
          <div className="text-left bg-white rounded-2xl border border-[#E6EBE8] p-5 space-y-4 max-w-xl mx-auto">
            <h3 className="text-sm font-bold text-[#17211F]">Détails de l'expédition</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#66716D]">
              <div>
                <span className="font-semibold text-[#17211F] block">Destinataire :</span>
                {confirmedOrder.fullName} ({confirmedOrder.phone})
              </div>
              <div>
                <span className="font-semibold text-[#17211F] block">Wilaya & Commune :</span>
                {confirmedOrder.wilaya}, {confirmedOrder.commune}
              </div>
              <div className="col-span-2 pt-1">
                <span className="font-semibold text-[#17211F] block">Adresse :</span>
                {confirmedOrder.address}
              </div>
              <div className="col-span-2 pt-1">
                <span className="font-semibold text-[#17211F] block">Mode de paiement :</span>
                {confirmedOrder.paymentMethod === 'cod'
                  ? 'Paiement en espèces à la livraison'
                  : 'Carte CIB / Edahabia (Démonstration)'}
              </div>
            </div>

            <h3 className="text-sm font-bold text-[#17211F] pt-3 border-t border-[#E6EBE8]">
              Articles commandés ({confirmedOrder.items.length})
            </h3>
            <div className="space-y-2 text-xs">
              {confirmedOrder.items.map((it) => (
                <div key={it.product.id} className="flex justify-between text-[#17211F]">
                  <span className="truncate pr-4">
                    {it.quantity}x {it.product.name}
                  </span>
                  <span className="font-bold tabular-nums shrink-0">
                    {formatPrice(it.product.price * it.quantity)}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#E6EBE8] flex justify-between text-[#66716D]">
                <span>Livraison</span>
                <span className="tabular-nums font-semibold">
                  {confirmedOrder.shippingCost === 0 ? 'Offerte' : formatPrice(confirmedOrder.shippingCost)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E6EBE8] flex justify-between text-base font-extrabold text-[#075B49]">
                <span>Total à régler</span>
                <span className="tabular-nums">{formatPrice(confirmedOrder.total)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-[#EDF6F1] hover:bg-[#12866C] text-[#075B49] hover:text-white rounded-full text-xs font-bold transition-colors flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer le bon de commande</span>
            </button>
            <Link
              to="/"
              className="px-6 py-2.5 bg-[#075B49] hover:bg-[#12866C] text-white rounded-full text-xs font-bold transition-colors"
            >
              Retourner à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no confirmation yet, redirect to cart
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Aucun article à commander</h1>
        <p className="text-sm text-[#66716D] mb-6">
          Votre panier est vide. Veuillez ajouter des produits avant de passer commande.
        </p>
        <Link
          to="/boutique"
          className="px-6 py-2.5 bg-[#075B49] text-white text-xs font-bold rounded-full"
        >
          Aller à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#87918D] mb-6" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-[#075B49]">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/panier" className="hover:text-[#075B49]">
          Panier
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#17211F] font-semibold">Finalisation de commande</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211F] mb-8">
        Validation et Livraison de votre commande
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Checkout Form (7-8 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Information */}
            <div className="bg-white rounded-3xl border border-[#E6EBE8] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBE8]">
                <span className="w-6 h-6 rounded-full bg-[#075B49] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-base font-bold text-[#17211F]">
                  Coordonnées du destinataire
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#17211F] mb-1.5">
                    Nom et Prénom *
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Ex: Karim Benali"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCD7D2] text-xs sm:text-sm focus:outline-none focus:border-[#12866C]"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-[#C53C3C] mt-1 font-medium">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17211F] mb-1.5">
                    Numéro de Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Ex: 0550 12 34 56"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCD7D2] text-xs sm:text-sm focus:outline-none focus:border-[#12866C]"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-[#C53C3C] mt-1 font-medium">{errors.phone}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#17211F] mb-1.5">
                    Adresse e-mail (pour le reçu de commande)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Ex: karim.benali@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCD7D2] text-xs sm:text-sm focus:outline-none focus:border-[#12866C]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-white rounded-3xl border border-[#E6EBE8] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBE8]">
                <span className="w-6 h-6 rounded-full bg-[#075B49] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base font-bold text-[#17211F]">
                  Adresse de livraison en Algérie
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#17211F] mb-1.5">
                    Wilaya * (58 wilayas disponibles)
                  </label>
                  <select
                    value={form.wilaya}
                    onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCD7D2] text-xs sm:text-sm focus:outline-none focus:border-[#12866C] bg-white font-medium"
                  >
                    {WILAYAS.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17211F] mb-1.5">
                    Commune / Ville *
                  </label>
                  <input
                    type="text"
                    value={form.commune}
                    onChange={(e) => setForm({ ...form, commune: e.target.value })}
                    placeholder="Ex: Sidi M'Hamed, Bir Mourad Raïs..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCD7D2] text-xs sm:text-sm focus:outline-none focus:border-[#12866C]"
                  />
                  {errors.commune && (
                    <p className="text-[11px] text-[#C53C3C] mt-1 font-medium">{errors.commune}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#17211F] mb-1.5">
                    Adresse exacte de livraison ou point de repère *
                  </label>
                  <textarea
                    rows={2}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Nom de rue, numéro, bâtiment ou repère connu (près de l'école, rond-point...)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCD7D2] text-xs sm:text-sm focus:outline-none focus:border-[#12866C]"
                  />
                  {errors.address && (
                    <p className="text-[11px] text-[#C53C3C] mt-1 font-medium">{errors.address}</p>
                  )}
                </div>
              </div>

              {/* Shipping Method Choice */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#17211F] mb-2">
                  Mode de livraison
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      form.shippingMethod === 'home'
                        ? 'border-[#075B49] bg-[#EDF6F1]/50 ring-1 ring-[#075B49]'
                        : 'border-[#CCD7D2] hover:bg-[#F5F6F6]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={form.shippingMethod === 'home'}
                        onChange={() => setForm({ ...form, shippingMethod: 'home' })}
                        className="accent-[#075B49]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#17211F]">Livraison à domicile</p>
                        <p className="text-[11px] text-[#66716D]">Directement chez vous</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#075B49] tabular-nums">
                      {subtotal >= STORE_SETTINGS.freeShippingThreshold
                        ? 'Offerte'
                        : `${STORE_SETTINGS.shippingCostHome} DA`}
                    </span>
                  </label>

                  <label
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      form.shippingMethod === 'relay'
                        ? 'border-[#075B49] bg-[#EDF6F1]/50 ring-1 ring-[#075B49]'
                        : 'border-[#CCD7D2] hover:bg-[#F5F6F6]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={form.shippingMethod === 'relay'}
                        onChange={() => setForm({ ...form, shippingMethod: 'relay' })}
                        className="accent-[#075B49]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#17211F]">Point relais / Bureau</p>
                        <p className="text-[11px] text-[#66716D]">Récupération au bureau</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#075B49] tabular-nums">
                      {subtotal >= STORE_SETTINGS.freeShippingThreshold
                        ? 'Offerte'
                        : `${STORE_SETTINGS.shippingCostRelay} DA`}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white rounded-3xl border border-[#E6EBE8] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E6EBE8]">
                <span className="w-6 h-6 rounded-full bg-[#075B49] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="text-base font-bold text-[#17211F]">
                  Mode de règlement
                </h2>
              </div>

              <div className="space-y-3">
                <label
                  className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3.5 transition-all ${
                    form.paymentMethod === 'cod'
                      ? 'border-[#075B49] bg-[#EDF6F1]/50 ring-1 ring-[#075B49]'
                      : 'border-[#CCD7D2] hover:bg-[#F5F6F6]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={form.paymentMethod === 'cod'}
                    onChange={() => setForm({ ...form, paymentMethod: 'cod' })}
                    className="mt-1 accent-[#075B49]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-[#075B49]" />
                      <span className="text-xs font-bold text-[#17211F]">
                        Paiement en espèces à la livraison (Recommandé)
                      </span>
                    </div>
                    <p className="text-[11px] text-[#66716D] mt-1 leading-snug">
                      Réglez directement auprès du livreur à la réception de votre colis. Aucune avance bancaire requise.
                    </p>
                  </div>
                </label>

                <label
                  className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3.5 transition-all ${
                    form.paymentMethod === 'cib_edahabia'
                      ? 'border-[#075B49] bg-[#EDF6F1]/50 ring-1 ring-[#075B49]'
                      : 'border-[#CCD7D2] hover:bg-[#F5F6F6]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={form.paymentMethod === 'cib_edahabia'}
                    onChange={() => setForm({ ...form, paymentMethod: 'cib_edahabia' })}
                    className="mt-1 accent-[#075B49]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#12866C]" />
                      <span className="text-xs font-bold text-[#17211F]">
                        Carte CIB / Edahabia (Démonstration simulée)
                      </span>
                    </div>
                    <p className="text-[11px] text-[#66716D] mt-1 leading-snug">
                      Paiement en ligne sécurisé par carte monétique algérienne via passerelle SATIM (environnement démo).
                    </p>
                  </div>
                </label>
              </div>

              {/* Optional order notes */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#17211F] mb-1.5">
                  Remarques ou instructions particulières (Optionnel)
                </label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Ex: Livrer de préférence l'après-midi, appeler 30min avant..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#CCD7D2] text-xs focus:outline-none focus:border-[#12866C]"
                />
              </div>
            </div>
          </div>

          {/* Right: Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            <div className="bg-white rounded-3xl border border-[#E6EBE8] p-6 shadow-xs space-y-6">
              <h2 className="text-base font-bold text-[#17211F] pb-3 border-b border-[#E6EBE8]">
                Votre récapitulatif ({cart.reduce((s, i) => s + i.quantity, 0)} articles)
              </h2>

              {/* Items scroll */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-[#E6EBE8]">
                {cart.map((it) => (
                  <div key={it.product.id} className="pt-2 first:pt-0 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F6F6] p-1 shrink-0 border border-[#E6EBE8] flex items-center justify-center">
                      <img
                        src={it.product.image}
                        alt={it.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#17211F] truncate">{it.product.name}</p>
                      <p className="text-[11px] text-[#87918D]">Quantité : {it.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-[#075B49] tabular-nums">
                      {formatPrice(it.product.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial summary */}
              <div className="space-y-2 pt-3 border-t border-[#E6EBE8] text-xs">
                <div className="flex justify-between text-[#66716D]">
                  <span>Sous-total</span>
                  <span className="font-semibold text-[#17211F] tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[#66716D]">
                  <span>Frais d'envoi ({form.wilaya.split('-')[1]?.trim() || form.wilaya})</span>
                  <span className="font-semibold text-[#17211F] tabular-nums">
                    {shippingCost === 0 ? (
                      <span className="text-[#16865F] font-bold">Livraison offerte</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#E6EBE8] flex justify-between text-base font-extrabold text-[#075B49]">
                  <span>Total à payer</span>
                  <span className="text-xl tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#075B49] hover:bg-[#12866C] disabled:bg-gray-400 text-white text-sm font-extrabold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Confirmation en cours…</span>
                ) : (
                  <>
                    <span>Confirmer ma commande</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-[#87918D] text-center leading-relaxed">
                En confirmant votre commande, vous acceptez nos conditions générales de vente. Un agent vous appellera pour validation.
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
