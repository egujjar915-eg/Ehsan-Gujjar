import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Truck, Headphones, ArrowRight } from 'lucide-react';
import { STORE_SETTINGS } from '../data/products';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Hero header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="px-3 py-1 bg-[#EDF6F1] text-[#075B49] text-xs font-bold uppercase tracking-wider rounded-full inline-block mb-3">
          À propos de Nexora Tech
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17211F] tracking-tight mb-4">
          Redéfinir l'accès à la technologie d'exception en Algérie
        </h1>
        <p className="text-sm sm:text-base text-[#66716D] leading-relaxed">
          Fondée avec l'ambition de proposer une expérience d'achat technologique fiable, transparente et haut de gamme, Nexora Tech sélectionne les appareils électroniques les plus performants pour accompagner votre quotidien.
        </p>
      </div>

      {/* Story grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <div className="rounded-3xl overflow-hidden border border-[#E6EBE8] bg-[#F5F6F6] aspect-4/3">
          <img
            src="/src/assets/images/hero_tech_ecosystem_1793162857715.jpg"
            alt="Équipe et vision Nexora Tech"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4 text-xs sm:text-sm text-[#66716D] leading-relaxed">
          <h2 className="text-2xl font-bold text-[#17211F]">
            Notre engagement qualité et authenticité
          </h2>
          <p>
            Sur un marché de l'électronique souvent saturé de contrefaçons et de promesses non tenues, <strong>Nexora Tech</strong> a fait le choix de la rigueur : chaque référence est testée et certifiée conforme aux normes d'efficacité et de sécurité les plus strictes.
          </p>
          <p>
            Nous garantissons une politique de prix transparente en dinars algériens (DA), un service de livraison express couvrant sans exception les 58 wilayas, et le privilège du paiement à la livraison pour votre sérénité totale.
          </p>
          <div className="pt-2">
            <Link
              to="/boutique"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#075B49] hover:text-[#12866C]"
            >
              <span>Découvrir notre catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="p-6 bg-[#F4F8F6] rounded-2xl border border-[#E6EBE8] space-y-2">
          <Award className="w-8 h-8 text-[#075B49]" />
          <h3 className="text-sm font-bold text-[#17211F]">Excellence produit</h3>
          <p className="text-xs text-[#66716D]">
            Des composants et appareils choisis pour leur longévité, leurs performances et leur design soigné.
          </p>
        </div>
        <div className="p-6 bg-[#F4F8F6] rounded-2xl border border-[#E6EBE8] space-y-2">
          <Truck className="w-8 h-8 text-[#075B49]" />
          <h3 className="text-sm font-bold text-[#17211F]">Couverture 58 wilayas</h3>
          <p className="text-xs text-[#66716D]">
            Un réseau logistique partenaire assurant une remise en main propre sécurisée partout en Algérie.
          </p>
        </div>
        <div className="p-6 bg-[#F4F8F6] rounded-2xl border border-[#E6EBE8] space-y-2">
          <ShieldCheck className="w-8 h-8 text-[#075B49]" />
          <h3 className="text-sm font-bold text-[#17211F]">Paiement à la réception</h3>
          <p className="text-xs text-[#66716D]">
            Vous inspectez votre colis avant de régler votre achat auprès du livreur.
          </p>
        </div>
        <div className="p-6 bg-[#F4F8F6] rounded-2xl border border-[#E6EBE8] space-y-2">
          <Headphones className="w-8 h-8 text-[#075B49]" />
          <h3 className="text-sm font-bold text-[#17211F]">SAV & Support dédié</h3>
          <p className="text-xs text-[#66716D]">
            Une équipe basée à Alger pour répondre à vos questions et gérer vos demandes techniques.
          </p>
        </div>
      </div>
    </div>
  );
};
