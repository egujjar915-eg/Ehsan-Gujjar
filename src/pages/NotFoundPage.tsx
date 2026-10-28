import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <div className="inline-block p-4 rounded-3xl bg-[#EDF6F1] text-[#075B49] text-5xl font-black mb-4">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211F] mb-3">
        Page introuvable
      </h1>
      <p className="text-sm text-[#66716D] max-w-md mx-auto mb-8">
        La page que vous recherchez a peut-être été déplacée, renommée ou n'existe plus.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#075B49] hover:bg-[#12866C] text-white text-xs font-bold rounded-full transition-colors shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </Link>
        <Link
          to="/boutique"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5F6F6] hover:bg-[#EDF6F1] text-[#17211F] text-xs font-bold rounded-full transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explorer la boutique</span>
        </Link>
      </div>
    </div>
  );
};
