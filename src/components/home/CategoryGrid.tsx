import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export const CategoryGrid: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-[#12866C] rounded-full" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#075B49]">
              Nos Catégories
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17211F] tracking-tight">
            Explorez par catégorie
          </h2>
        </div>

        <Link
          to="/boutique"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#12866C] hover:text-[#075B49] transition-colors group self-start sm:self-auto"
        >
          <span>Voir toutes les catégories</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 6-Column Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/categorie/${cat.slug}`}
            className="group flex flex-col bg-white rounded-2xl border border-[#E6EBE8] hover:border-[#12866C]/40 p-3 shadow-xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C]"
          >
            {/* Image Container */}
            <div className="aspect-square w-full rounded-xl bg-[#F5F6F6] group-hover:bg-[#EDF6F1] transition-colors p-3 flex items-center justify-center overflow-hidden mb-3">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Category Title & Count */}
            <div className="text-center pb-1">
              <h3 className="text-sm font-bold text-[#17211F] group-hover:text-[#075B49] transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[11px] text-[#87918D] mt-0.5">
                {cat.itemCount} références
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
