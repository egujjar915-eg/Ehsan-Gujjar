import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';
import { Logo } from '../common/Logo';
import { STORE_SETTINGS } from '../../data/products';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Veuillez saisir une adresse e-mail valide', 'error');
      return;
    }
    setIsSubscribed(true);
    addToast('Merci pour votre inscription à la newsletter Nexora !', 'success');
    setEmail('');
  };

  return (
    <footer className="relative bg-[#082F29] text-white pt-16 pb-12 overflow-hidden">
      {/* Subtle organic / geometric background corner decorations */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.04]">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <circle cx="280" cy="120" r="160" stroke="white" strokeWidth="2" />
          <circle cx="280" cy="120" r="220" stroke="white" strokeWidth="2" strokeDasharray="8 8" />
          <path d="M150 50 Q 250 150 350 120" stroke="#28A878" strokeWidth="3" />
        </svg>
      </div>
      <div className="absolute -bottom-10 -left-10 pointer-events-none opacity-[0.03]">
        <svg width="350" height="350" viewBox="0 0 350 350" fill="none">
          <circle cx="100" cy="250" r="180" stroke="white" strokeWidth="2" />
          <path d="M0 200 C 100 150 200 300 300 250" stroke="#28A878" strokeWidth="4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top trust highlights in footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/10 text-white/90">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-[#28A878] shrink-0" />
            <div>
              <p className="text-sm font-semibold">58 Wilayas</p>
              <p className="text-xs text-white/60">Livraison express à domicile</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#28A878] shrink-0" />
            <div>
              <p className="text-sm font-semibold">Paiement sécurisé</p>
              <p className="text-xs text-white/60">À la réception de la commande</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="w-6 h-6 text-[#28A878] shrink-0" />
            <div>
              <p className="text-sm font-semibold">Garantie & Retours</p>
              <p className="text-xs text-white/60">Assistance et SAV dédié</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Headphones className="w-6 h-6 text-[#28A878] shrink-0" />
            <div>
              <p className="text-sm font-semibold">Support client</p>
              <p className="text-xs text-white/60">Conseillers à votre écoute</p>
            </div>
          </div>
        </div>

        {/* 4 Columns Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-[#28A878] text-sm font-medium">
              « {STORE_SETTINGS.brandTagline} »
            </p>
            <p className="text-xs text-white/70 leading-relaxed">
              Nexora Tech propose les meilleures innovations technologiques en smartphones, informatique, audio haute fidélité et accessoires connectés avec une garantie de sérieux pour toute l’Algérie.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs text-white/50">Contact :</span>
              <span className="text-xs font-semibold text-white/90">{STORE_SETTINGS.supportPhone}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Liens utiles
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link to="/" className="hover:text-[#28A878] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/boutique" className="hover:text-[#28A878] transition-colors">
                  Boutique complète
                </Link>
              </li>
              <li>
                <Link to="/nouveautes" className="hover:text-[#28A878] transition-colors">
                  Nouveautés technologiques
                </Link>
              </li>
              <li>
                <Link to="/offres" className="hover:text-[#28A878] transition-colors">
                  Offres & Promotions
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="hover:text-[#28A878] transition-colors">
                  À propos de Nexora Tech
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#28A878] transition-colors">
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Service client
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link to="/faq" className="hover:text-[#28A878] transition-colors">
                  Questions fréquentes (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/livraison" className="hover:text-[#28A878] transition-colors">
                  Informations de livraison
                </Link>
              </li>
              <li>
                <Link to="/retours" className="hover:text-[#28A878] transition-colors">
                  Retours et remboursements
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="hover:text-[#28A878] transition-colors">
                  Conditions générales de vente
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="hover:text-[#28A878] transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="hover:text-[#28A878] transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Notre newsletter
            </h4>
            <p className="text-xs text-white/70 mb-4 leading-relaxed">
              Recevez nos nouveautés, arrivages exclusifs et offres spéciales directement par e-mail.
            </p>

            {isSubscribed ? (
              <div className="bg-[#12866C]/30 border border-[#28A878]/40 rounded-xl p-3 flex items-center gap-2 text-xs text-white">
                <CheckCircle2 className="w-4 h-4 text-[#28A878] shrink-0" />
                <span>Votre inscription a bien été enregistrée. Merci !</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse e-mail"
                    required
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-2.5 rounded-full text-xs focus:outline-none focus:border-[#28A878] focus:bg-white/15 transition-colors pr-11"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#12866C] hover:bg-[#28A878] text-white rounded-full flex items-center justify-center transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="S'inscrire à la newsletter"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-white/50">
                  Désinscription possible à tout moment. Zéro spam.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 Nexora Tech. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link to="/conditions" className="hover:text-white transition-colors">
              Conditions générales
            </Link>
            <Link to="/confidentialite" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link to="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
