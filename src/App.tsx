import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickViewModal } from './components/product/QuickViewModal';
import { ToastContainer } from './components/common/ToastContainer';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { InfoPages } from './pages/InfoPages';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top automatically when location changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-[#17211F]">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/boutique" element={<CatalogPage initialMode="all" />} />
              <Route path="/nouveautes" element={<CatalogPage initialMode="new" />} />
              <Route path="/offres" element={<CatalogPage initialMode="offers" />} />
              <Route path="/categorie/:slug" element={<CategoryPage />} />
              <Route path="/produit/:slug" element={<ProductDetailPage />} />
              <Route path="/panier" element={<CartPage />} />
              <Route path="/commande" element={<CheckoutPage />} />
              <Route path="/a-propos" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<InfoPages />} />
              <Route path="/livraison" element={<InfoPages />} />
              <Route path="/retours" element={<InfoPages />} />
              <Route path="/conditions" element={<InfoPages />} />
              <Route path="/confidentialite" element={<InfoPages />} />
              <Route path="/mentions-legales" element={<InfoPages />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />

          {/* Global Drawers, Modals & Toast Notifiers */}
          <CartDrawer />
          <QuickViewModal />
          <ToastContainer />
        </div>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
