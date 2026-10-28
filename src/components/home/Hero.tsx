import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, ShieldCheck, Headphones, Sparkles } from 'lucide-react';

interface Slide {
  id: number;
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  alt: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    badge: 'NOUVEAUTÉS 2026',
    titlePrefix: 'La technologie',
    titleHighlight: 'à portée de main',
    description:
      'Découvrez les dernières innovations en smartphones, ordinateurs et accessoires. Des produits soigneusement sélectionnés, au meilleur rapport qualité-prix.',
    ctaText: 'Découvrir la collection',
    ctaLink: '/boutique',
    image: '/src/assets/images/hero_tech_ecosystem_1793162857715.jpg',
    alt: 'Écosystème technologique Nexora Tech : smartphone, ultrabook, montre et écouteurs'
  },
  {
    id: 2,
    badge: 'PERFORMANCE & MOBILITÉ',
    titlePrefix: 'L\'excellence nomade',
    titleHighlight: 'pour vos projets',
    description:
      'Ultrabooks poids plume et ordinateurs portables de pointe conçus pour allier puissance brute, autonomie exceptionnelle et élégance sobre.',
    ctaText: 'Explorer les ordinateurs',
    ctaLink: '/categorie/ordinateurs',
    image: '/src/assets/images/category_laptops_1793162859199.jpg',
    alt: 'Ultrabook de travail nouvelle génération'
  },
  {
    id: 3,
    badge: 'SON HAUTE FIDÉLITÉ',
    titlePrefix: 'Immersion totale',
    titleHighlight: 'sans compromis',
    description:
      'Casques sans fil à réduction de bruit active et écouteurs ergonomiques pour redécouvrir chaque nuance de vos morceaux favoris.',
    ctaText: 'Découvrir l\'audio',
    ctaLink: '/categorie/audio',
    image: '/src/assets/images/category_audio_1793162859799.jpg',
    alt: 'Casque audio haute fidélité'
  }
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = HERO_SLIDES.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      <div
        className="relative bg-gradient-to-br from-[#F5F7F5] via-[#EDF6F1] to-white rounded-3xl border border-[#E6EBE8] overflow-hidden shadow-xs"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#12866C]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px] lg:min-h-[420px]">
          {/* Left Zone: 48-52% */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-12 flex flex-col justify-between z-10">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#12866C]/30 bg-white/80 text-[#075B49] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#28A878]" />
                <span>{slide.badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#17211F] tracking-tight leading-[1.15] mb-4">
                {slide.titlePrefix} <br className="hidden sm:inline" />
                <span className="text-[#12866C]">{slide.titleHighlight}</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#66716D] max-w-lg leading-relaxed mb-6">
                {slide.description}
              </p>

              {/* CTA Button */}
              <div className="flex items-center gap-4">
                <Link
                  to={slide.ctaLink}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#075B49] hover:bg-[#12866C] text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C]"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* 3 Compact Trust-Benefit Items */}
            <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-[#E6EBE8]/80 text-[#17211F]">
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#EDF6F1] flex items-center justify-center shrink-0 text-[#075B49]">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">Livraison rapide</p>
                  <p className="text-[11px] text-[#66716D] leading-tight">Partout en Algérie</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#EDF6F1] flex items-center justify-center shrink-0 text-[#075B49]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">Paiement sécurisé</p>
                  <p className="text-[11px] text-[#66716D] leading-tight">À la réception</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#EDF6F1] flex items-center justify-center shrink-0 text-[#075B49]">
                  <Headphones className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">Service client</p>
                  <p className="text-[11px] text-[#66716D] leading-tight">À votre écoute</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Zone: 48-52% */}
          <div className="lg:col-span-6 relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="relative w-full h-full min-h-[260px] sm:min-h-[320px] flex items-center justify-center rounded-2xl overflow-hidden">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover rounded-2xl shadow-sm transition-all duration-500 transform hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-2 z-20">
          <button
            type="button"
            onClick={prevSlide}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#17211F] hover:text-[#075B49] shadow-sm flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C]"
            aria-label="Diapositive précédente"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 px-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-6 bg-[#075B49]' : 'w-2 bg-[#CCD7D2]'
                }`}
                aria-label={`Aller à la diapositive ${idx + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={nextSlide}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#17211F] hover:text-[#075B49] shadow-sm flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C]"
            aria-label="Diapositive suivante"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
