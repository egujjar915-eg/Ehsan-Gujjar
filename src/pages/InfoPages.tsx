import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, HelpCircle, Truck, RotateCcw, FileText, Lock, ShieldCheck } from 'lucide-react';
import { STORE_SETTINGS } from '../data/products';

export const InfoPages: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let pageTitle = 'Informations Utiles';
  let icon = HelpCircle;

  if (path === '/livraison') {
    pageTitle = 'Informations de Livraison';
    icon = Truck;
  } else if (path === '/retours') {
    pageTitle = 'Politique de Retours et Remboursements';
    icon = RotateCcw;
  } else if (path === '/conditions') {
    pageTitle = 'Conditions Générales de Vente (CGV)';
    icon = FileText;
  } else if (path === '/confidentialite') {
    pageTitle = 'Politique de Confidentialité';
    icon = Lock;
  } else if (path === '/mentions-legales') {
    pageTitle = 'Mentions Légales';
    icon = ShieldCheck;
  } else if (path === '/faq') {
    pageTitle = 'Foire Aux Questions (FAQ)';
    icon = HelpCircle;
  }

  const IconComponent = icon;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#87918D] mb-6" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-[#075B49] transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#17211F] font-semibold">{pageTitle}</span>
      </nav>

      {/* Header */}
      <div className="bg-[#EDF6F1] rounded-3xl p-6 sm:p-10 border border-[#CCD7D2]/80 mb-8 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-[#075B49] text-white flex items-center justify-center shrink-0 shadow-xs">
          <IconComponent className="w-7 h-7 text-[#28A878]" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211F] tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#66716D] mt-1">
            Nexora Tech Algérie — Service Client & Conditions Claires
          </p>
        </div>
      </div>

      {/* Content depending on route */}
      <div className="bg-white rounded-3xl border border-[#E6EBE8] p-6 sm:p-10 shadow-xs prose max-w-none text-xs sm:text-sm text-[#66716D] space-y-6 leading-relaxed">
        {path === '/faq' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-[#17211F] mb-1">
                1. Comment se déroule la commande sur Nexora Tech ?
              </h3>
              <p>
                Vous sélectionnez vos articles, validez votre panier et complétez vos coordonnées (nom, téléphone et wilaya). Un conseiller de notre centre d'appels vous contacte dans les heures qui suivent pour valider la commande et coordonner l'expédition.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#17211F] mb-1">
                2. Quels sont les modes de paiement acceptés ?
              </h3>
              <p>
                Le mode principal et recommandé est le <strong>paiement en espèces à la livraison</strong> (Cash on Delivery). Vous ne payez qu'après avoir reçu et inspecté le colis.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#17211F] mb-1">
                3. Quelles sont les zones livrées en Algérie ?
              </h3>
              <p>
                Nous livrons sans exception l'intégralité des <strong>58 wilayas d'Algérie</strong>, aussi bien à domicile qu'en point de retrait relais selon votre convenance.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#17211F] mb-1">
                4. Les produits sont-ils couverts par une garantie ?
              </h3>
              <p>
                Oui, l'ensemble de nos ordinateurs, smartphones, casques et montres connectées bénéficie d'une <strong>garantie atelier de 12 mois</strong> contre tout vice de fabrication.
              </p>
            </div>
          </div>
        )}

        {path === '/livraison' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#17211F]">Expédition express dans les 58 wilayas</h2>
            <p>
              Toutes les commandes passées avant 14h00 sont préparées et expédiées le jour même par nos transporteurs partenaires.
            </p>
            <h3 className="text-base font-bold text-[#17211F]">Délais de livraison indicatifs :</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Alger, Blida, Boumerdès, Tipaza :</strong> 24h à 48h ouvrées.</li>
              <li><strong>Oran, Constantine, Annaba, Sétif :</strong> 48h ouvrées.</li>
              <li><strong>Autres wilayas du Nord et Hauts Plateaux :</strong> 48h à 72h.</li>
              <li><strong>Wilayas du Sud et Grand Sud :</strong> 3 à 5 jours selon la localité.</li>
            </ul>
            <h3 className="text-base font-bold text-[#17211F]">Tarification :</h3>
            <p>
              Les frais de livraison standard sont de <strong>600 DA</strong> à domicile et <strong>400 DA</strong> en point relais. <strong>La livraison est offerte dès 15 000 DA d'achats !</strong>
            </p>
          </div>
        )}

        {path === '/retours' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#17211F]">Procédure de retour et échange</h2>
            <p>
              Si un produit présente une non-conformité ou un dysfonctionnement à la réception, vous disposez d'un délai de <strong>7 jours</strong> pour nous le signaler afin d'obtenir un échange à neuf ou un remboursement.
            </p>
            <h3 className="text-base font-bold text-[#17211F]">Conditions de retour :</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Le produit doit être dans son emballage d'origine complet avec tous ses accessoires.</li>
              <li>Le bon de garantie et le reçu de livraison doivent être joints.</li>
              <li>L'appareil ne doit présenter aucune trace d'oxydation ou de choc physique accidentel.</li>
            </ul>
            <p>
              Pour initier un retour, contactez notre support au <strong>{STORE_SETTINGS.supportPhone}</strong>.
            </p>
          </div>
        )}

        {path === '/conditions' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#17211F]">Conditions Générales de Vente (CGV)</h2>
            <p>
              Les présentes conditions générales régissent les relations commerciales entre <strong>Nexora Tech</strong> et ses clients sur le territoire de la République Algérienne Démocratique et Populaire.
            </p>
            <h3 className="text-base font-bold text-[#17211F]">1. Prix et disponibilité</h3>
            <p>
              Les prix de nos produits sont indiqués en dinars algériens (DA) toutes taxes comprises (TTC). Nexora Tech se réserve le droit de modifier ses prix à tout moment, étant toutefois entendu que le prix figurant sur la commande validée est le seul applicable.
            </p>
            <h3 className="text-base font-bold text-[#17211F]">2. Modalités de paiement</h3>
            <p>
              Le règlement s'effectue principalement à la livraison en espèces. En cas de livraison par transporteur, un reçu est remis contre paiement au client.
            </p>
            <h3 className="text-base font-bold text-[#17211F]">3. Garantie légale</h3>
            <p>
              Les matériels informatiques et de téléphonie bénéficient d'une garantie de 12 mois prenant effet à la date de remise du produit.
            </p>
          </div>
        )}

        {path === '/confidentialite' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#17211F]">Protection de vos données personnelles</h2>
            <p>
              Chez Nexora Tech, nous accordons une importance capitale à la confidentialité de vos informations privées.
            </p>
            <h3 className="text-base font-bold text-[#17211F]">Données collectées :</h3>
            <p>
              Les seules données collectées lors d'une commande sont celles nécessaires à l'acheminement de votre colis : votre nom, numéro de téléphone portable et adresse de livraison.
            </p>
            <h3 className="text-base font-bold text-[#17211F]">Non-divulgation :</h3>
            <p>
              Vos coordonnées ne sont jamais vendues, cédées ou louées à des tiers marketing. Elles sont strictement transmises au livreur en charge de votre expédition.
            </p>
          </div>
        )}

        {path === '/mentions-legales' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#17211F]">Éditeur du site</h2>
            <p>
              <strong>Boutique en ligne :</strong> Nexora Tech Algérie<br />
              <strong>Activité :</strong> Vente et distribution de matériel électronique et d'équipements connectés.<br />
              <strong>Siège administratif & logistique :</strong> {STORE_SETTINGS.location}<br />
              <strong>Service client :</strong> {STORE_SETTINGS.supportPhone} | {STORE_SETTINGS.supportEmail}
            </p>
            <h3 className="text-base font-bold text-[#17211F]">Hébergement web</h3>
            <p>
              Site optimisé pour déploiement moderne (compatible serveurs Apache Hostinger / Single Page Application Vite React).
            </p>
          </div>
        )}

        <div className="pt-6 border-t border-[#E6EBE8] flex items-center justify-between">
          <Link
            to="/contact"
            className="text-xs font-bold text-[#075B49] hover:underline"
          >
            Besoin d'un renseignement supplémentaire ? Contactez-nous →
          </Link>
          <Link
            to="/boutique"
            className="px-4 py-2 bg-[#075B49] text-white text-xs font-bold rounded-full hover:bg-[#12866C] transition-colors"
          >
            Retourner à la boutique
          </Link>
        </div>
      </div>
    </div>
  );
};
