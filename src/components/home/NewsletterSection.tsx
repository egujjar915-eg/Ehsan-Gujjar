import React, { useState } from 'react';
import { Send, CheckCircle2, Mail } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const NewsletterSection: React.FC = () => {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Veuillez entrer une adresse e-mail valide.');
      return;
    }

    setIsSuccess(true);
    addToast('Inscription réussie ! Vous recevrez nos meilleures offres.', 'success');
    setEmail('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="bg-[#EDF6F1] rounded-3xl border border-[#CCD7D2]/80 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-2xs relative overflow-hidden">
        {/* Soft background decor */}
        <div className="w-12 h-12 rounded-full bg-[#12866C]/15 mx-auto flex items-center justify-center text-[#075B49] mb-4">
          <Mail className="w-6 h-6" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17211F] tracking-tight mb-2">
          Restez au courant des nouveautés
        </h3>
        <p className="text-xs sm:text-sm text-[#66716D] max-w-md mx-auto mb-6 leading-relaxed">
          Inscrivez-vous à notre newsletter pour recevoir en avant-première nos arrivages technologiques et nos promotions exclusives.
        </p>

        {isSuccess ? (
          <div className="bg-white rounded-2xl p-4 border border-[#28A878]/30 max-w-md mx-auto flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold text-[#075B49] animate-in zoom-in-95">
            <CheckCircle2 className="w-5 h-5 text-[#28A878] shrink-0" />
            <span>Votre inscription est confirmée ! Bienvenue chez Nexora Tech.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Entrez votre adresse e-mail…"
                  aria-label="Adresse e-mail pour la newsletter"
                  className="w-full px-5 py-3 rounded-full bg-white border border-[#CCD7D2] text-sm text-[#17211F] placeholder-[#87918D] focus:outline-none focus:border-[#12866C] shadow-2xs"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#075B49] hover:bg-[#12866C] text-white text-xs sm:text-sm font-bold rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C]"
              >
                <span>S'inscrire</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            {error && <p className="text-xs text-[#C53C3C] mt-2 text-left font-medium">{error}</p>}
            <p className="text-[11px] text-[#87918D] mt-3">
              Vos données sont protégées. Désabonnement en 1 clic à tout instant.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
