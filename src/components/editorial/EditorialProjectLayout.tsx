/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowUpRight, ArrowRight, Maximize2, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { Language } from '../../types';

export interface EditorialOverviewMeta {
  projectLabel?: string;
  headline?: string;
  description: string;
  secondaryDescription?: string;
  rolesLabel?: string;
  roles: string[];
  rolesAsList?: boolean;
  technologies: string[];
  methodology: string[];
  usersLabel?: string;
  users: string[];
}

export interface EditorialProjectLayoutProps {
  title: string;
  subtitle: string;
  categories?: string[];
  heroImage?: string;
  heroImageAlt?: string;
  heroImageCaption?: string;
  heroPlacement?: 'top' | 'below-header';
  heroIntro?: string;
  overview: EditorialOverviewMeta;
  language: Language;
  onBack: () => void;
  onNextProject?: () => void;
  onPrevProject?: () => void;
  nextProjectName?: string;
  prevProjectName?: string;
  onToggleLanguage?: (lang: Language) => void;
  overviewPosition?: 'before' | 'after';
  children: React.ReactNode;
}

export const EditorialProjectLayout: React.FC<EditorialProjectLayoutProps> = ({
  title,
  subtitle,
  categories,
  heroImage,
  heroImageAlt,
  heroImageCaption,
  heroPlacement = 'top',
  heroIntro,
  overview,
  language,
  onBack,
  onNextProject,
  onPrevProject,
  nextProjectName,
  prevProjectName,
  onToggleLanguage,
  overviewPosition = 'before',
  children,
}) => {
  const [expandedImage, setExpandedImage] = useState<{ src: string; caption?: string } | null>(null);
  const [currentLang, setCurrentLang] = useState<Language>(language);
  const isPt = currentLang === 'pt';

  // Lisbon clock sync
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: "Europe/Lisbon",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).formatToParts(now);

      const m = parts.find(p => p.type === 'month')?.value || '11';
      const d = parts.find(p => p.type === 'day')?.value || '11';
      const h = parts.find(p => p.type === 'hour')?.value || '01';
      const min = parts.find(p => p.type === 'minute')?.value || '00';
      const dayPeriod = parts.find(p => p.type === 'dayPeriod')?.value?.toUpperCase() || 'PM';

      setTime(`${d}/${m}, ${h}:${min} ${dayPeriod}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentLang(language);
  }, [language]);

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-[#111118] selection:bg-neutral-900 selection:text-white font-sans antialiased">
      
      {/* 1. Header: Minimal, Quiet & Editorial */}
      <header className="sticky top-0 z-40 w-full bg-[#FBFBFC]/90 backdrop-blur-md border-b border-neutral-200/80 px-6 sm:px-12 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-6">
          
          {/* Identity & Back Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>{isPt ? 'Voltar aos Projetos' : 'Back to Projects'}</span>
            </button>
            <span className="text-neutral-300 hidden sm:inline">/</span>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 hidden sm:inline">
              RAÍSSA MORIÁ
            </span>
          </div>

          {/* Center Breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <span>CASO DE ESTUDO</span>
            <span className="text-neutral-300">·</span>
            <span className="text-neutral-900 font-bold">{title}</span>
          </div>

          {/* Right Controls: Clock, Language Switch & Direct Contact */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-xs font-mono text-neutral-400 hidden md:inline">
              {time}
            </span>

            <div className="flex items-center border border-neutral-200 rounded-full p-0.5 bg-neutral-100/80 text-[10px] font-mono font-bold">
              <button
                onClick={() => {
                  setCurrentLang('pt');
                  onToggleLanguage?.('pt');
                }}
                className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                  isPt ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => {
                  setCurrentLang('en');
                  onToggleLanguage?.('en');
                }}
                className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                  !isPt ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href="mailto:raissagfdhb@gmail.com"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>{isPt ? 'Falar' : 'Contact'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </header>

      {/* 2. Opening Hero Image (Top placement - default) */}
      {heroImage && heroPlacement === 'top' && (
        <section className="pt-8 sm:pt-14 pb-12 px-4 sm:px-8 md:px-12">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-3">
            <div 
              onClick={() => setExpandedImage({ src: heroImage, caption: heroImageCaption })}
              className="group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#EBECEF] border border-neutral-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] cursor-pointer"
            >
              <img 
                src={heroImage} 
                alt={heroImageAlt || title}
                className="w-full h-auto max-h-[820px] object-cover sm:object-contain transition-transform duration-700 ease-out group-hover:scale-[1.01]" 
              />
              <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3" />
                <span>{isPt ? 'Expandir Imagem' : 'Expand View'}</span>
              </div>
            </div>
            {heroImageCaption && (
              <p className="text-xs font-mono text-neutral-500 text-right px-2">
                {heroImageCaption}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 3. Massive Title & Subtitle (+ optional Categories, Hero Visual & Intro) */}
      <section className={`${heroImage && heroPlacement === 'top' ? 'pt-8' : 'pt-14 sm:pt-20'} pb-16 sm:pb-24 px-6 sm:px-12 md:px-16 border-b border-neutral-200/80`}>
        <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            {categories && categories.length > 0 && (
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                {categories.join(' · ')}
              </div>
            )}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-black tracking-[-0.035em] text-[#0F1115] leading-[0.94] uppercase">
              {title}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-neutral-600 font-light max-w-4xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          {heroImage && heroPlacement === 'below-header' && (
            <div className="flex flex-col gap-3 pt-4">
              <div 
                onClick={() => setExpandedImage({ src: heroImage, caption: heroImageCaption })}
                className="group relative w-full bg-transparent cursor-pointer"
              >
                <img 
                  src={heroImage} 
                  alt={heroImageAlt || title}
                  className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.01]" 
                />
                <div className="absolute bottom-6 right-6 bg-black/75 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3" />
                  <span>{isPt ? 'Expandir Imagem' : 'Expand View'}</span>
                </div>
              </div>
              {heroImageCaption && (
                <p className="text-xs font-mono text-neutral-500 px-1">
                  {heroImageCaption}
                </p>
              )}
            </div>
          )}

          {heroIntro && (
            <p className="text-lg sm:text-2xl text-[#0F1115] font-light max-w-4xl leading-relaxed pt-2">
              {heroIntro}
            </p>
          )}
        </div>
      </section>

      {/* 4. Project Overview Section (Editorial Columns) - Before content by default */}
      {overviewPosition === 'before' && (
        <section className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 border-b border-neutral-200/80 bg-white">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Project Goal */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
                {overview.projectLabel || (isPt ? 'O projeto' : 'The project')}
              </h2>
              {overview.headline && (
                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0F1115] leading-tight">
                  {overview.headline}
                </h3>
              )}
              <p className="text-lg sm:text-xl text-[#0F1115] font-normal leading-relaxed">
                {overview.description}
              </p>
              {overview.secondaryDescription && (
                <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
                  {overview.secondaryDescription}
                </p>
              )}
            </div>

            {/* Right Column: Metadata Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 pt-2 lg:pt-0">
              
              {/* O meu papel */}
              <div className={`flex flex-col gap-2 ${overview.rolesAsList ? 'sm:col-span-2' : ''}`}>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                  {overview.rolesLabel || (isPt ? 'O meu papel' : 'My role')}
                </span>
                {overview.rolesAsList ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-1">
                    {overview.roles.map((role, idx) => (
                      <li key={idx} className="text-sm sm:text-base font-medium text-[#0F1115] leading-snug flex items-start gap-2.5">
                        <span className="font-mono text-xs text-neutral-400 mt-0.5 shrink-0">0{idx + 1}</span>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm sm:text-base font-semibold text-[#0F1115] leading-snug">
                    {overview.roles.join(' · ')}
                  </p>
                )}
              </div>

              {/* Tecnologias */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                  {isPt ? 'Tecnologias' : 'Technologies'}
                </span>
                <p className="text-sm sm:text-base font-semibold text-[#0F1115] leading-snug">
                  {overview.technologies.join(' · ')}
                </p>
              </div>

              {/* Metodologia */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                  {isPt ? 'Metodologia' : 'Methodology'}
                </span>
                <p className="text-sm sm:text-base font-semibold text-[#0F1115] leading-snug">
                  {overview.methodology.join(' · ')}
                </p>
              </div>

              {/* Utilizadores / Contexto */}
              {!overview.rolesAsList && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                    {overview.usersLabel || (isPt ? 'Utilizadores' : 'Users')}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-[#0F1115] leading-snug">
                    {overview.users.join(' · ')}
                  </p>
                </div>
              )}

            </div>

          </div>
        </section>
      )}

      {/* 5. Continuous Narrative Content (Scroll Stream) */}
      <main className="py-12 sm:py-20 px-6 sm:px-12 md:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-24 sm:gap-32">
          {children}
        </div>
      </main>

      {/* Optional Overview Section after Narrative Content */}
      {overviewPosition === 'after' && (
        <section className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 border-t border-neutral-200/80 bg-white">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Project Goal */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
                {overview.projectLabel || (isPt ? 'O projeto' : 'The project')}
              </h2>
              <p className="text-lg sm:text-xl text-[#0F1115] font-normal leading-relaxed">
                {overview.description}
              </p>
            </div>

            {/* Right Column: 4-Column Metadata Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 pt-2 lg:pt-0">
              
              {/* O meu papel */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                  {isPt ? 'O meu papel' : 'My role'}
                </span>
                <p className="text-sm sm:text-base font-semibold text-[#0F1115] leading-snug">
                  {overview.roles.join(' · ')}
                </p>
              </div>

              {/* Tecnologias */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                  {isPt ? 'Tecnologias' : 'Technologies'}
                </span>
                <p className="text-sm sm:text-base font-semibold text-[#0F1115] leading-snug">
                  {overview.technologies.join(' · ')}
                </p>
              </div>

              {/* Metodologia */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                  {isPt ? 'Metodologia' : 'Methodology'}
                </span>
                <p className="text-sm sm:text-base font-semibold text-[#0F1115] leading-snug">
                  {overview.methodology.join(' · ')}
                </p>
              </div>

              {/* Utilizadores */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                  {isPt ? 'Utilizadores' : 'Users'}
                </span>
                <p className="text-sm sm:text-base font-semibold text-[#0F1115] leading-snug">
                  {overview.users.join(' · ')}
                </p>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* 6. Footer Navigation: Next Project & Back to Portfolio */}
      <footer className="border-t border-neutral-200/80 bg-white py-20 px-6 sm:px-12 md:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 border-b border-neutral-200/80">
            {onPrevProject && prevProjectName ? (
              <button
                onClick={onPrevProject}
                className="group flex flex-col gap-1 text-left cursor-pointer"
              >
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>{isPt ? 'PROJETO ANTERIOR' : 'PREVIOUS PROJECT'}</span>
                </span>
                <span className="text-xl sm:text-2xl font-bold uppercase text-neutral-900 group-hover:text-neutral-600 transition-colors">
                  {prevProjectName}
                </span>
              </button>
            ) : <div />}

            {onNextProject && nextProjectName ? (
              <button
                onClick={onNextProject}
                className="group flex flex-col gap-1 text-right items-end cursor-pointer ml-auto"
              >
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                  <span>{isPt ? 'PRÓXIMO PROJETO' : 'NEXT PROJECT'}</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-xl sm:text-2xl font-bold uppercase text-neutral-900 group-hover:text-neutral-600 transition-colors">
                  {nextProjectName}
                </span>
              </button>
            ) : <div />}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isPt ? 'Voltar ao Portfólio Principal' : 'Back to Main Portfolio'}</span>
            </button>
            <span>© 2026 RAÍSSA MORIÁ · PRODUCT & DIGITAL SYSTEMS DESIGN</span>
          </div>

        </div>
      </footer>

      {/* 7. High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center gap-3"
            >
              <div className="w-full flex justify-between items-center text-white px-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                  {expandedImage.caption || title}
                </span>
                <button
                  onClick={() => setExpandedImage(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img 
                src={expandedImage.src} 
                alt="Expanded View" 
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl bg-transparent"
              />

              {expandedImage.caption && (
                <p className="text-xs font-mono text-neutral-400 text-center">
                  {expandedImage.caption}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
