import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RotateCcw, ChevronRight } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useStore } from '../context/StoreContext';

interface CatalogPageProps {
  initialMode?: 'all' | 'new' | 'offers';
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ initialMode = 'all' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist, formatPrice } = useStore();

  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || 'all';
  const queryFilter = searchParams.get('filter') || '';

  const [search, setSearch] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [selectedSort, setSelectedSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    if (querySearch) setSearch(querySearch);
    if (queryCategory) setSelectedCategory(queryCategory);
  }, [querySearch, queryCategory]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search query
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.categorySlug !== selectedCategory) {
        return false;
      }

      // Initial page mode
      if (initialMode === 'new' && !product.isNew) return false;
      if (initialMode === 'offers' && (!product.discountPercent || product.discountPercent <= 0)) return false;

      // Special query filter
      if (queryFilter === 'wishlist' && !wishlist.includes(product.id)) return false;
      if (queryFilter === 'new' && !product.isNew) return false;

      // Price filter
      if (product.price > maxPrice) return false;

      // In stock filter
      if (onlyInStock && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.price - b.price;
      if (selectedSort === 'price-desc') return b.price - a.price;
      if (selectedSort === 'rating') return b.rating - a.rating;
      if (selectedSort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default order
    });
  }, [search, selectedCategory, initialMode, queryFilter, wishlist, maxPrice, onlyInStock, selectedSort]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setMaxPrice(200000);
    setOnlyInStock(false);
    setSelectedSort('featured');
    setSearchParams({});
  };

  const getPageTitle = () => {
    if (initialMode === 'new') return 'Nouveautés Technologiques';
    if (initialMode === 'offers') return 'Offres Spéciales & Promotions';
    if (queryFilter === 'wishlist') return 'Ma Liste d\'Envies';
    return 'Boutique Complète';
  };

  const getPageDescription = () => {
    if (initialMode === 'new') return 'Explorez nos derniers arrivages en smartphones, ordinateurs et accessoires connectés.';
    if (initialMode === 'offers') return 'Profitez de remises exclusives jusqu’à -20% sur une sélection de produits phares.';
    if (queryFilter === 'wishlist') return 'Retrouvez les produits que vous avez enregistrés pour votre prochain achat.';
    return 'Découvrez l’intégralité de nos produits électroniques garantis et livrés dans les 58 wilayas.';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#87918D] mb-4" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-[#075B49] transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#17211F] font-semibold">{getPageTitle()}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-[#F4F8F6] rounded-3xl border border-[#E6EBE8] p-6 sm:p-8 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211F] tracking-tight">
          {getPageTitle()}
        </h1>
        <p className="text-xs sm:text-sm text-[#66716D] mt-1 max-w-2xl">
          {getPageDescription()}
        </p>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E6EBE8] p-5 shadow-xs sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6EBE8]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#075B49]" />
                <h2 className="text-sm font-bold text-[#17211F]">Filtres</h2>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-[#12866C] hover:text-[#075B49] flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Réinitialiser</span>
              </button>
            </div>

            {/* Search Input Filter */}
            <div>
              <label className="block text-xs font-bold text-[#17211F] uppercase tracking-wider mb-2">
                Recherche
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nom de produit…"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#F5F6F6] rounded-xl border border-[#CCD7D2]/80 focus:outline-none focus:border-[#12866C]"
                />
                <Search className="w-3.5 h-3.5 text-[#87918D] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-[#17211F] uppercase tracking-wider mb-2">
                Catégories
              </label>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-[#EDF6F1] text-[#075B49]'
                      : 'text-[#66716D] hover:bg-[#F5F6F6] hover:text-[#17211F]'
                  }`}
                >
                  <span>Tous les rayons</span>
                  <span className="text-[11px] tabular-nums">{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-[#EDF6F1] text-[#075B49]'
                        : 'text-[#66716D] hover:bg-[#F5F6F6] hover:text-[#17211F]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] tabular-nums">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#17211F] uppercase tracking-wider">
                  Prix maximum
                </label>
                <span className="text-xs font-bold text-[#075B49] tabular-nums">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="200000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#075B49] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#87918D] mt-1">
                <span>2 000 DA</span>
                <span>200 000 DA</span>
              </div>
            </div>

            {/* In Stock toggle */}
            <div className="pt-2 border-t border-[#E6EBE8]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#17211F]">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-[#075B49] accent-[#075B49]"
                />
                <span>Uniquement les produits en stock</span>
              </label>
            </div>
          </div>
        </div>

        {/* Product Catalog Grid Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar: Count, Mobile filter button, Sort selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E6EBE8] shadow-2xs">
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <span className="text-xs sm:text-sm font-semibold text-[#17211F]">
                <strong className="text-[#075B49]">{filteredProducts.length}</strong>{' '}
                {filteredProducts.length > 1 ? 'produits trouvés' : 'produit trouvé'}
              </span>

              {/* Mobile Filter Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden px-3 py-1.5 bg-[#EDF6F1] text-[#075B49] text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filtres</span>
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <label htmlFor="sort-select" className="text-[#66716D] font-medium shrink-0">
                Trier par :
              </label>
              <select
                id="sort-select"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg border border-[#CCD7D2] bg-white text-xs font-semibold text-[#17211F] focus:outline-none focus:border-[#12866C]"
              >
                <option value="featured">Pertinence / En vedette</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Meilleures ventes & avis</option>
                <option value="newest">Nouveautés</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Collapsible Card */}
          {isMobileFilterOpen && (
            <div className="lg:hidden bg-white p-4 rounded-2xl border border-[#12866C]/30 shadow-md space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#E6EBE8]">
                <h3 className="text-xs font-bold text-[#17211F] uppercase">Filtres mobiles</h3>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[#12866C]"
                >
                  Tout effacer
                </button>
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedCategory === 'all'
                      ? 'bg-[#075B49] text-white'
                      : 'bg-[#F5F6F6] text-[#66716D]'
                  }`}
                >
                  Tous
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedCategory === cat.slug
                        ? 'bg-[#075B49] text-white'
                        : 'bg-[#F5F6F6] text-[#66716D]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Price slider */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Prix max</span>
                  <span className="font-bold text-[#075B49]">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="200000"
                  step="2000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#075B49]"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2 bg-[#075B49] text-white rounded-xl text-xs font-bold"
              >
                Appliquer les filtres ({filteredProducts.length})
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#E6EBE8] p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#EDF6F1] text-[#075B49] rounded-full mx-auto flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#17211F]">
                Aucun produit ne correspond à vos critères
              </h3>
              <p className="text-xs sm:text-sm text-[#66716D] max-w-sm mx-auto">
                Modifiez vos filtres de recherche ou réinitialisez-les pour découvrir l'intégralité de notre catalogue.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#075B49] hover:bg-[#12866C] text-white text-xs font-bold rounded-full transition-colors"
              >
                Réinitialiser tous les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
