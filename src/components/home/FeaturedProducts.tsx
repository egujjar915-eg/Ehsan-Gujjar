import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';
import { PRODUCTS, CATEGORIES } from '../../data/products';

export const FeaturedProducts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS.slice(0, 8)
      : PRODUCTS.filter((p) => p.categorySlug === selectedCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-[#12866C] rounded-full" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#075B49]">
              Produits Phares
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17211F] tracking-tight">
            Nos meilleures ventes
          </h2>
          <p className="text-xs sm:text-sm text-[#66716D] mt-1">
            Les appareils les plus prisés pour leur fiabilité, leur puissance et leur confort quotidien.
          </p>
        </div>

        <Link
          to="/boutique"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#12866C] hover:text-[#075B49] transition-colors group self-start md:self-auto"
        >
          <span>Voir toute la boutique</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap shrink-0 ${
            selectedCategory === 'all'
              ? 'bg-[#075B49] text-white shadow-xs'
              : 'bg-[#F5F6F6] text-[#66716D] hover:bg-[#EDF6F1] hover:text-[#075B49]'
          }`}
        >
          Tous les produits
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap shrink-0 ${
              selectedCategory === cat.slug
                ? 'bg-[#075B49] text-white shadow-xs'
                : 'bg-[#F5F6F6] text-[#66716D] hover:bg-[#EDF6F1] hover:text-[#075B49]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 4-column product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
