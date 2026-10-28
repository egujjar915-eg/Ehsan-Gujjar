import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="relative bg-[#EDF6F1] rounded-3xl border border-[#CCD7D2]/60 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Content: 5-6 cols */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 z-10">
            {/* Small outlined badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#12866C]/30 bg-white/80 text-[#075B49] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <Tag className="w-3.5 h-3.5 text-[#16865F]" />
              <span>OFFRE EXCLUSIVE</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#075B49] tracking-tight leading-tight mb-2">
              Jusqu’à -20%
            </h2>
            <p className="text-lg sm:text-xl font-bold text-[#17211F] mb-3">
              sur une sélection de produits
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#66716D] max-w-md leading-relaxed mb-6">
              Équipez-vous avec les indispensables du quotidien et profitez de nos offres du moment : ordinateurs, casques sans fil, manettes et chargeurs rapides.
            </p>

            {/* CTA */}
            <Link
              to="/offres"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#075B49] hover:bg-[#12866C] text-white text-xs sm:text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C]"
            >
              <span>Découvrir les offres</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Imagery */}
          <div className="lg:col-span-6 relative p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden shadow-sm">
              <img
                src="/src/assets/images/promo_lifestyle_tech_1793162860247.jpg"
                alt="Pack d'offres technologiques : laptop, casque audio et manette de jeu"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
