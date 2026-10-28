import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '', iconOnly = false }) => {
  const isDark = variant === 'dark';

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12866C] rounded-lg ${className}`}
      aria-label="Nexora Tech - Retour à l'accueil"
    >
      {/* Original minimal geometric emblem: tech cube + minimalist eco-tech node */}
      <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform group-hover:scale-105 duration-200"
        >
          {/* Outer rounded geometric hexagon / shield */}
          <rect
            x="2"
            y="2"
            width="32"
            height="32"
            rx="10"
            className={isDark ? 'fill-[#075B49]' : 'fill-[#12866C]'}
          />
          {/* Minimalist circuit node & modern N shape */}
          <path
            d="M11 25V11L25 25V11"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Bright tech accent dot */}
          <circle cx="25" cy="11" r="2.2" fill="#28A878" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span
            className={`text-xl font-bold tracking-tight ${
              isDark ? 'text-[#075B49]' : 'text-white'
            }`}
          >
            Nexora<span className={isDark ? 'text-[#12866C]' : 'text-[#28A878]'}>Tech</span>
          </span>
          <span
            className={`text-[10px] tracking-widest uppercase font-semibold ${
              isDark ? 'text-[#66716D]' : 'text-[#EDF6F1]/80'
            }`}
          >
            Algérie
          </span>
        </div>
      )}
    </Link>
  );
};
