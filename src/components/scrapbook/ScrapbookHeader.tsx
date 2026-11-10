import React from 'react';
import { SunRaysDoodle } from './DoodleAccents';
import { TapePiece } from './TapePiece';

interface ScrapbookHeaderProps {
  language: 'pt' | 'en';
  onLanguageChange: (lang: 'pt' | 'en') => void;
  onNavigateHome: () => void;
}

export const ScrapbookHeader: React.FC<ScrapbookHeaderProps> = ({
  language,
  onLanguageChange,
  onNavigateHome,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 md:px-12 py-3.5 sm:py-5 backdrop-blur-xs transition-all">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        
        {/* LOGO: "Raíssa" on torn paper scrap with hand-drawn rays */}
        <div 
          onClick={onNavigateHome}
          className="relative group cursor-pointer select-none inline-block"
        >
          <div 
            style={{ transform: 'rotate(-2deg)' }}
            className="relative px-5 py-1.5 sm:py-2 bg-[#F8F6F0] text-[#1A1A1A] paper-shadow torn-paper-card transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-3"
          >
            <TapePiece className="-top-2 left-3" rotate={-8} width="w-8" height="h-3" />
            <span className="font-handwriting text-3xl sm:text-4xl font-bold tracking-normal block leading-tight text-[#1A1A1A]">
              Raíssa
            </span>
            <div className="absolute -top-3.5 -right-6">
              <SunRaysDoodle className="w-6 h-5" color="#E8AF30" />
            </div>
          </div>
        </div>

        {/* NAVIGATION & CONTROLS */}
        <div className="flex items-center gap-3 sm:gap-6">
          
          {/* Main nav tags */}
          <nav className="flex items-center gap-2 sm:gap-3.5 text-xs sm:text-sm font-typewriter">
            <a
              href="#sobre"
              className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#F2EBD9] text-[#1A1A1A] paper-shadow rounded-[2px] transition-all duration-200 hover:-translate-y-0.5 hover:rotate-1 active:translate-y-0"
              style={{ transform: 'rotate(-1deg)' }}
            >
              {language === 'pt' ? 'Sobre' : 'About'}
            </a>

            <a
              href="#projetos"
              className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#F8F6F0] text-[#1A1A1A] paper-shadow rounded-[2px] transition-all duration-200 hover:-translate-y-0.5 hover:-rotate-1 active:translate-y-0"
              style={{ transform: 'rotate(1.5deg)' }}
            >
              {language === 'pt' ? 'Projetos' : 'Projects'}
            </a>

            <a
              href="#contacto"
              className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#F2EBD9] text-[#1A1A1A] paper-shadow rounded-[2px] transition-all duration-200 hover:-translate-y-0.5 hover:rotate-1 active:translate-y-0"
              style={{ transform: 'rotate(-0.8deg)' }}
            >
              {language === 'pt' ? 'Contacto' : 'Contact'}
            </a>
          </nav>

          {/* LANGUAGE SWITCHER: Paper scrap pill */}
          <div 
            style={{ transform: 'rotate(2deg)' }}
            className="flex items-center bg-[#F8F6F0] paper-shadow p-0.5 rounded-[2px] font-typewriter text-xs text-[#1A1A1A]"
          >
            <button
              onClick={() => onLanguageChange('pt')}
              className={`px-2 py-0.5 rounded-[1px] transition-all cursor-pointer ${
                language === 'pt'
                  ? 'bg-[#E8AF30] text-[#1A1A1A] font-bold shadow-xs'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              PT
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 rounded-[1px] transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#E8AF30] text-[#1A1A1A] font-bold shadow-xs'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              EN
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
