import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ChevronDown,
  Phone,
  ShieldCheck,
  Truck,
  ArrowRight
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES, PRODUCTS, STORE_SETTINGS } from '../../data/products';

export const Header: React.FC = () => {
  const { cartCount, wishlist, setIsCartOpen, formatPrice } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsSearchFocused(false);
  }, [location.pathname]);

  // Click outside to close search popover & dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for live search preview
  const filteredSearchProducts = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/boutique?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#075B49] text-white text-xs py-2 px-4 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#28A878]" />
              {STORE_SETTINGS.deliveryCoverage}
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-white/80">
              <ShieldCheck className="w-3.5 h-3.5 text-[#28A878]" />
              Paiement sécurisé à la livraison
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <a
              href={`tel:${STORE_SETTINGS.supportPhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#28A878]" />
              <span className="hidden sm:inline">Support:</span> {STORE_SETTINGS.supportPhone}
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline font-semibold text-[#28A878]">FR / DA</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-200 ${
          isScrolled
            ? 'shadow-sm border-b border-[#E6EBE8] py-3'
            : 'border-b border-[#E6EBE8]/80 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Left: Brand Logo */}
            <div className="shrink-0 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-lg text-[#17211F] hover:bg-[#F4F8F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C]"
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Logo />
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#17211F]">
              <Link
                to="/"
                className={`relative py-1 hover:text-[#075B49] transition-colors ${
                  isActive('/') ? 'text-[#075B49] font-semibold' : 'text-[#17211F]'
                }`}
              >
                Accueil
                {isActive('/') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#12866C] rounded-full" />
                )}
              </Link>

              <Link
                to="/boutique"
                className={`relative py-1 hover:text-[#075B49] transition-colors ${
                  isActive('/boutique') ? 'text-[#075B49] font-semibold' : 'text-[#17211F]'
                }`}
              >
                Boutique
                {isActive('/boutique') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#12866C] rounded-full" />
                )}
              </Link>

              {/* Categories Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                  className={`flex items-center gap-1 py-1 hover:text-[#075B49] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C] rounded ${
                    isActive('/categorie') ? 'text-[#075B49] font-semibold' : 'text-[#17211F]'
                  }`}
                  aria-expanded={isCategoryDropdownOpen}
                >
                  <span>Catégories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCategoryDropdownOpen ? 'rotate-180 text-[#12866C]' : 'text-[#87918D]'
                    }`}
                  />
                </button>

                {isCategoryDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                    className="absolute top-full left-0 w-80 mt-2 bg-white rounded-2xl shadow-xl border border-[#E6EBE8] p-3 grid grid-cols-1 gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-3 py-2 text-xs font-bold text-[#87918D] uppercase tracking-wider border-b border-[#E6EBE8] mb-1">
                      Rayons technologiques
                    </div>
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/categorie/${cat.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F8F6] text-[#17211F] hover:text-[#075B49] transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#EDF6F1] shrink-0 border border-[#E6EBE8]">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate group-hover:text-[#075B49]">
                            {cat.name}
                          </p>
                          <p className="text-xs text-[#87918D] truncate">
                            {cat.itemCount} produits
                          </p>
                        </div>
                      </Link>
                    ))}
                    <div className="mt-1 pt-2 border-t border-[#E6EBE8]">
                      <Link
                        to="/boutique"
                        className="flex items-center justify-between text-xs font-semibold text-[#12866C] hover:text-[#075B49] p-2 rounded-lg hover:bg-[#EDF6F1] transition-colors"
                      >
                        <span>Toutes les catégories</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/nouveautes"
                className={`relative py-1 hover:text-[#075B49] transition-colors ${
                  isActive('/nouveautes') ? 'text-[#075B49] font-semibold' : 'text-[#17211F]'
                }`}
              >
                Nouveautés
                {isActive('/nouveautes') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#12866C] rounded-full" />
                )}
              </Link>

              <Link
                to="/a-propos"
                className={`relative py-1 hover:text-[#075B49] transition-colors ${
                  isActive('/a-propos') ? 'text-[#075B49] font-semibold' : 'text-[#17211F]'
                }`}
              >
                À propos
                {isActive('/a-propos') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#12866C] rounded-full" />
                )}
              </Link>

              <Link
                to="/contact"
                className={`relative py-1 hover:text-[#075B49] transition-colors ${
                  isActive('/contact') ? 'text-[#075B49] font-semibold' : 'text-[#17211F]'
                }`}
              >
                Contact
                {isActive('/contact') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#12866C] rounded-full" />
                )}
              </Link>
            </nav>

            {/* Right: Search + Wishlist + Cart Actions */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Working Pill Search Field */}
              <div className="relative hidden md:block" ref={searchContainerRef}>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Rechercher un produit…"
                    className="w-48 lg:w-64 pl-10 pr-4 py-2 text-sm bg-[#F5F6F6] hover:bg-[#EDF6F1]/50 focus:bg-white text-[#17211F] placeholder-[#87918D] rounded-full border border-transparent focus:border-[#12866C] focus:outline-none transition-all duration-200"
                  />
                  <Search className="w-4 h-4 text-[#87918D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </form>

                {/* Live Search Autocomplete Popover */}
                {isSearchFocused && searchQuery.trim().length > 0 && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E6EBE8] p-3 z-50">
                    <p className="text-xs font-semibold text-[#87918D] px-2 py-1 uppercase tracking-wider">
                      Suggestions ({filteredSearchProducts.length})
                    </p>
                    {filteredSearchProducts.length > 0 ? (
                      <div className="mt-1 divide-y divide-[#E6EBE8]">
                        {filteredSearchProducts.map((p) => (
                          <Link
                            key={p.id}
                            to={`/produit/${p.slug}`}
                            onClick={() => setIsSearchFocused(false)}
                            className="flex items-center gap-3 p-2 hover:bg-[#F4F8F6] rounded-xl transition-colors group"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-10 h-10 object-contain rounded-lg bg-[#F5F6F6] p-1 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-[#17211F] group-hover:text-[#075B49] truncate">
                                {p.name}
                              </p>
                              <p className="text-xs font-bold text-[#075B49]">
                                {formatPrice(p.price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={handleSearchSubmit}
                            className="w-full text-center text-xs font-semibold text-[#12866C] hover:text-[#075B49] py-1.5 rounded-lg hover:bg-[#EDF6F1] transition-colors"
                          >
                            Voir tous les résultats pour « {searchQuery} »
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-sm text-[#87918D]">
                        Aucun produit trouvé pour « {searchQuery} »
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist Link with dynamic badge */}
              <Link
                to="/boutique?filter=wishlist"
                className="relative p-2 text-[#17211F] hover:text-[#075B49] hover:bg-[#F4F8F6] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C]"
                aria-label={`Liste d'envies (${wishlist.length} articles)`}
                title="Ma liste d'envies"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#12866C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center p-2 text-[#17211F] hover:text-[#075B49] hover:bg-[#F4F8F6] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C]"
                aria-label={`Panier (${cartCount} articles)`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-[#075B49] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in-50 duration-150">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar below logo on mobile view */}
          <div className="mt-3 md:hidden">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un smartphone, écouteurs..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F5F6F6] text-[#17211F] placeholder-[#87918D] rounded-full border border-transparent focus:border-[#12866C] focus:outline-none"
              />
              <Search className="w-4 h-4 text-[#87918D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-50">
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#E6EBE8] flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#66716D] hover:text-[#17211F] rounded-lg hover:bg-[#F4F8F6]"
                aria-label="Fermer le menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links scroll container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="space-y-1 font-medium text-base">
                <Link
                  to="/"
                  className={`block px-3 py-2.5 rounded-xl transition-colors ${
                    isActive('/') ? 'bg-[#EDF6F1] text-[#075B49] font-bold' : 'hover:bg-[#F5F6F6]'
                  }`}
                >
                  Accueil
                </Link>
                <Link
                  to="/boutique"
                  className={`block px-3 py-2.5 rounded-xl transition-colors ${
                    isActive('/boutique') ? 'bg-[#EDF6F1] text-[#075B49] font-bold' : 'hover:bg-[#F5F6F6]'
                  }`}
                >
                  Boutique
                </Link>
                <Link
                  to="/nouveautes"
                  className={`block px-3 py-2.5 rounded-xl transition-colors ${
                    isActive('/nouveautes') ? 'bg-[#EDF6F1] text-[#075B49] font-bold' : 'hover:bg-[#F5F6F6]'
                  }`}
                >
                  Nouveautés
                </Link>
                <Link
                  to="/offres"
                  className={`block px-3 py-2.5 rounded-xl transition-colors ${
                    isActive('/offres') ? 'bg-[#EDF6F1] text-[#075B49] font-bold' : 'hover:bg-[#F5F6F6]'
                  }`}
                >
                  Offres spéciales
                </Link>
                <Link
                  to="/a-propos"
                  className={`block px-3 py-2.5 rounded-xl transition-colors ${
                    isActive('/a-propos') ? 'bg-[#EDF6F1] text-[#075B49] font-bold' : 'hover:bg-[#F5F6F6]'
                  }`}
                >
                  À propos
                </Link>
                <Link
                  to="/contact"
                  className={`block px-3 py-2.5 rounded-xl transition-colors ${
                    isActive('/contact') ? 'bg-[#EDF6F1] text-[#075B49] font-bold' : 'hover:bg-[#F5F6F6]'
                  }`}
                >
                  Contact
                </Link>
              </div>

              {/* Categories Section in Drawer */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#87918D] px-3 mb-2">
                  Catégories
                </p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/categorie/${cat.slug}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-[#F4F8F6] text-[#17211F]"
                    >
                      <div className="w-7 h-7 rounded-lg overflow-hidden bg-[#EDF6F1] shrink-0">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#E6EBE8] bg-[#F4F8F6]">
              <p className="text-xs font-semibold text-[#075B49]">
                Service client Algérie
              </p>
              <p className="text-xs text-[#66716D] mt-0.5">
                {STORE_SETTINGS.supportPhone}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
