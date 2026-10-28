import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { STORE_SETTINGS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setError('Veuillez renseigner les champs obligatoires (nom, téléphone, message).');
      return;
    }
    setSubmitted(true);
    addToast('Votre message a bien été envoyé ! Nous vous répondrons rapidement.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="px-3 py-1 bg-[#EDF6F1] text-[#075B49] text-xs font-bold uppercase tracking-wider rounded-full inline-block mb-3">
          Service Client & Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17211F] tracking-tight mb-3">
          Une question ? Contactez notre équipe
        </h1>
        <p className="text-sm text-[#66716D]">
          Nos conseillers sont disponibles pour vous guider dans vos choix, suivre votre colis ou répondre à vos demandes techniques.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        {/* Contact info cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#075B49] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
            <h2 className="text-xl font-bold">Nos Coordonnées</h2>
            <div className="space-y-4 text-xs sm:text-sm text-white/90">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#28A878] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Téléphone & WhatsApp :</span>
                  <a href={`tel:${STORE_SETTINGS.supportPhone}`} className="hover:underline">
                    {STORE_SETTINGS.supportPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#28A878] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">E-mail support :</span>
                  <a href={`mailto:${STORE_SETTINGS.supportEmail}`} className="hover:underline">
                    {STORE_SETTINGS.supportEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#28A878] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Centre logistique :</span>
                  <span>{STORE_SETTINGS.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#28A878] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Horaires d'assistance :</span>
                  <span>Du Samedi au Jeudi : 9h00 – 19h00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6EBE8] p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EDF6F1] text-[#075B49] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#12866C]" />
              </div>
              <h3 className="text-xl font-bold text-[#17211F]">
                Message bien transmis !
              </h3>
              <p className="text-xs sm:text-sm text-[#66716D] max-w-sm mx-auto">
                Un conseiller de l'équipe Nexora Tech prendra contact avec vous par téléphone ou e-mail sous 24 heures.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
                }}
                className="px-6 py-2.5 bg-[#EDF6F1] text-[#075B49] text-xs font-bold rounded-full hover:bg-[#12866C] hover:text-white transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-[#17211F] mb-1">
                Formulaire de message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#17211F] mb-1">
                    Votre nom complet *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Amina Kaci"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCD7D2] text-xs sm:text-sm focus:outline-none focus:border-[#12866C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17211F] mb-1">
                    Numéro de téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ex: 0661 00 00 00"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCD7D2] text-xs sm:text-sm focus:outline-none focus:border-[#12866C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17211F] mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Ex: amina.kaci@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCD7D2] text-xs sm:text-sm focus:outline-none focus:border-[#12866C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17211F] mb-1">
                  Objet de votre demande
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Ex: Renseignement sur la disponibilité d'un ultrabook"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCD7D2] text-xs sm:text-sm focus:outline-none focus:border-[#12866C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17211F] mb-1">
                  Votre message *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Détaillez votre question ou le modèle qui vous intéresse..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCD7D2] text-xs sm:text-sm focus:outline-none focus:border-[#12866C]"
                />
              </div>

              {error && <p className="text-xs text-[#C53C3C] font-semibold">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-[#075B49] hover:bg-[#12866C] text-white text-xs sm:text-sm font-bold rounded-full shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Envoyer le message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
