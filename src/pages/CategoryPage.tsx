import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { CATEGORIES, PRODUCTS } from '../data/products';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const category = CATEGORIES.find((c) => c.slug === slug);
  const otherCategories = CATEGORIES.filter((c) => c.slug !== slug);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Catégorie non trouvée</h1>
        <Link
          to="/boutique"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#075B49] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la boutique</span>
        </Link>
      </div>
    );
  }

  const categoryProducts = PRODUCTS.filter(
    (p) => p.categorySlug === category.slug
  ).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#87918D] mb-4" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-[#075B49] transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/boutique" className="hover:text-[#075B49] transition-colors">
          Boutique
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#17211F] font-semibold">{category.name}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#EDF6F1] to-[#F4F8F6] rounded-3xl border border-[#CCD7D2]/80 p-6 sm:p-10 mb-10 overflow-hidden shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
          <div className="md:col-span-8 z-10">
            <span className="px-3 py-1 bg-white/80 text-[#075B49] text-xs font-bold uppercase tracking-wider rounded-full border border-[#12866C]/30 inline-block mb-3">
              Rayon {category.name}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17211F] tracking-tight mb-2">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#66716D] max-w-xl leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="md:col-span-4 flex justify-end">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-white p-2 shadow-xs border border-[#CCD7D2]/60">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Bar for Category: Count & Sort */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E6EBE8]">
        <p className="text-xs sm:text-sm font-semibold text-[#17211F]">
          <strong className="text-[#075B49]">{categoryProducts.length}</strong>{' '}
          {categoryProducts.length > 1 ? 'produits disponibles' : 'produit disponible'}
        </p>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#66716D]">Trier :</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg border border-[#CCD7D2] bg-white text-xs font-semibold text-[#17211F] focus:outline-none focus:border-[#12866C]"
          >
            <option value="featured">Pertinence</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="rating">Meilleures notes</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Other Categories Strip */}
      <div className="pt-8 border-t border-[#E6EBE8]">
        <h3 className="text-base font-bold text-[#17211F] mb-4">
          Découvrez d'autres rayons
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {otherCategories.slice(0, 5).map((cat) => (
            <Link
              key={cat.id}
              to={`/categorie/${cat.slug}`}
              className="p-3 bg-[#F5F6F6] hover:bg-[#EDF6F1] rounded-xl text-center transition-colors group"
            >
              <p className="text-xs font-bold text-[#17211F] group-hover:text-[#075B49] truncate">
                {cat.name}
              </p>
              <p className="text-[10px] text-[#87918D] mt-0.5">
                {cat.itemCount} produits
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
