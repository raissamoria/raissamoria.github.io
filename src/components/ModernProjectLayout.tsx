import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Compass, 
  Calendar,
  User,
  Share2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';
import { OpticalGlassButton, OpticalGlassPill } from './OpticalGlass';
import { Language } from '../types';

export interface ProjectTabItem {
  id: string;
  labelPt: string;
  labelEn: string;
  iconName?: string;
  badge?: string;
  content: React.ReactNode;
}

export interface ModernProjectLayoutProps {
  projectId?: string;
  projectNumber: string;
  title: string;
  subtitle?: string;
  category: string;
  year?: string;
  roles?: string[];
  liveUrl?: string;
  language: Language;
  onBack: () => void;
  onNextProject?: () => void;
  onPrevProject?: () => void;
  prevProjectName?: string;
  nextProjectName?: string;
  tabs?: ProjectTabItem[];
  children?: React.ReactNode;
}

export const ModernProjectLayout: React.FC<ModernProjectLayoutProps> = ({
  projectNumber,
  title,
  subtitle,
  category,
  year = '2026',
  roles = [],
  liveUrl,
  language,
  onBack,
  onNextProject,
  onPrevProject,
  prevProjectName,
  nextProjectName,
  tabs = [],
  children,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || 'overview');
  const [time, setTime] = useState("");
  const isPt = language === 'pt';

  // Lisbon Time clock matching homepage
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: "Europe/Lisbon",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).formatToParts(now);

      const m = parts.find(p => p.type === 'month')?.value || '11';
      const d = parts.find(p => p.type === 'day')?.value || '11';
      const h = parts.find(p => p.type === 'hour')?.value || '01';
      const min = parts.find(p => p.type === 'minute')?.value || '00';
      const sec = parts.find(p => p.type === 'second')?.value || '00';
      const dayPeriod = parts.find(p => p.type === 'dayPeriod')?.value?.toUpperCase() || 'PM';

      setTime(`${d}/${m}, ${h}:${min}:${sec} ${dayPeriod}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to top when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const currentTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans antialiased relative">
      
      {/* 1. Microscopic Optical Grid Layer matching Homepage */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* 2. Ambient Vignette Gradient */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 15%, rgba(25, 25, 30, 0.4) 0%, rgba(5, 5, 5, 0.98) 70%, #050505 100%)',
        }}
      />

      {/* 3. Sticky Top Navigation Bar matching Homepage */}
      <header className="sticky top-0 z-40 w-full bg-black/85 backdrop-blur-xl border-b border-neutral-900 px-6 md:px-12 py-4 text-white">
        <div className="max-w-[1720px] mx-auto flex justify-between items-center">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 select-none group text-left cursor-pointer"
            >
              <span className="font-sans font-black text-sm tracking-[-0.03em] uppercase text-white group-hover:text-neutral-300 transition-colors">
                RAÍSSA MORIÁ
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[11px] text-neutral-400 uppercase tracking-widest font-mono hidden sm:inline">
                PORTFOLIO
              </span>
            </button>

            <span className="text-neutral-600 hidden md:inline">/</span>

            {/* Back Button Pill */}
            <button
              onClick={onBack}
              className="optical-glass px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-neutral-300 hover:text-white flex items-center gap-2 cursor-pointer transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isPt ? 'Voltar ao Portfólio' : 'Back to Portfolio'}</span>
            </button>
          </div>

          {/* Breadcrumb Info in Center */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            <span className="text-neutral-600">CASO DE ESTUDO //</span>
            <span className="text-white font-bold">{projectNumber}</span>
            <span className="text-neutral-300">{title}</span>
          </div>

          {/* Right Controls: Clock & Email */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-[11px] text-neutral-400 font-mono font-medium hidden md:inline tracking-wider">
              {time || "11/11, 01:08:08 PM"}
            </span>

            <OpticalGlassButton 
              href="mailto:raissagfdhb@gmail.com" 
              className="!px-4 !py-1.5 !text-[10px] !tracking-widest"
            >
              <span>{isPt ? 'FALAR' : 'TALK'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </OpticalGlassButton>
          </div>

        </div>
      </header>

      {/* 4. Project Hero Header Section */}
      <section className="relative z-10 pt-16 pb-12 px-6 md:px-12 xl:px-16 border-b border-neutral-900">
        <div className="max-w-[1720px] mx-auto flex flex-col gap-8">
          
          {/* Top Metadata Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <OpticalGlassPill>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-bold tracking-wider">{category}</span>
                <span className="text-white/20">•</span>
                <span className="text-neutral-400">{year}</span>
              </OpticalGlassPill>

              <span className="font-mono text-xs font-black text-neutral-500 uppercase tracking-widest px-2">
                PROJETO {projectNumber}
              </span>
            </div>

            {/* Quick Live Link if available */}
            {liveUrl && (
              <OpticalGlassButton
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="!px-4 !py-1.5 !text-[10px]"
              >
                <span>{isPt ? 'Ver Produto Online' : 'Live Website'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </OpticalGlassButton>
            )}
          </div>

          {/* Monumental Display Title */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95]">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg sm:text-2xl text-neutral-300 font-light max-w-4xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Project Details Grid (Roles, Timeline, Deliverables) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-neutral-900">
            <div className="optical-glass p-5 rounded-2xl flex flex-col gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                {isPt ? 'DISCIPLINA' : 'DISCIPLINE'}
              </span>
              <span className="font-sans font-bold text-white text-sm">{category}</span>
              <span className="font-mono text-[10px] text-neutral-400">Design de Produto & UX</span>
            </div>

            <div className="optical-glass p-5 rounded-2xl flex flex-col gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                {isPt ? 'FUNÇÃO & RESPONSABILIDADES' : 'ROLE & RESPONSIBILITIES'}
              </span>
              <span className="font-sans font-bold text-white text-sm">
                {roles.slice(0, 2).join(' • ') || 'UX/UI & Product Design'}
              </span>
              <span className="font-mono text-[10px] text-neutral-400">Raíssa Moriá</span>
            </div>

            <div className="optical-glass p-5 rounded-2xl flex flex-col gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                {isPt ? 'ANO & CICLO' : 'TIMELINE & YEAR'}
              </span>
              <span className="font-sans font-bold text-white text-sm">{year}</span>
              <span className="font-mono text-[10px] text-neutral-400">Produção Final</span>
            </div>

            <div className="optical-glass p-5 rounded-2xl flex flex-col gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                {isPt ? 'STATUS' : 'DELIVERABLE'}
              </span>
              <span className="font-sans font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isPt ? 'Estudo Completo' : 'Complete Case Study'}</span>
              </span>
              <span className="font-mono text-[10px] text-neutral-400">Pronto para Revisão</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Chapter Navigation Tabs (Optical Glass Pills) */}
      {tabs.length > 0 && (
        <section className="sticky top-[69px] z-30 w-full bg-[#050505]/90 backdrop-blur-xl border-b border-neutral-900 py-3.5 px-6 md:px-12 xl:px-16">
          <div className="max-w-[1720px] mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {tabs.map((tab, idx) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    optical-glass whitespace-nowrap px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2
                    ${isActive 
                      ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)] border-white' 
                      : 'text-neutral-400 hover:text-white border-white/10'
                    }
                  `}
                >
                  <span className={`text-[9px] ${isActive ? 'text-black/60' : 'text-neutral-500'}`}>
                    0{idx + 1}
                  </span>
                  <span>{isPt ? tab.labelPt : tab.labelEn}</span>
                  {tab.badge && (
                    <span className={`text-[8px] px-1.5 py-0.2 rounded ${isActive ? 'bg-black/10 text-black' : 'bg-white/10 text-neutral-300'}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Active Tab Content Area */}
      <main className="relative z-10 py-16 px-6 md:px-12 xl:px-16 min-h-[60vh]">
        <div className="max-w-[1720px] mx-auto">
          {tabs.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {currentTab?.content}
              </motion.div>
            </AnimatePresence>
          ) : (
            children
          )}
        </div>
      </main>

      {/* 7. Next / Previous Project Footer Navigation */}
      <footer className="relative z-10 border-t border-neutral-900 bg-[#050505] py-20 px-6 md:px-12 xl:px-16">
        <div className="max-w-[1720px] mx-auto flex flex-col gap-16">
          
          {/* Prev/Next Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 border-b border-neutral-900">
            {onPrevProject && prevProjectName ? (
              <button
                onClick={onPrevProject}
                className="optical-glass p-6 sm:p-8 rounded-2xl flex flex-col gap-2 text-left group hover:border-neutral-700 cursor-pointer transition-all"
              >
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-neutral-500 group-hover:-translate-x-1 transition-transform" />
                  <span>{isPt ? 'PROJETO ANTERIOR' : 'PREVIOUS PROJECT'}</span>
                </span>
                <span className="text-xl sm:text-2xl font-bold uppercase text-white group-hover:text-neutral-300 transition-colors">
                  {prevProjectName}
                </span>
              </button>
            ) : <div />}

            {onNextProject && nextProjectName ? (
              <button
                onClick={onNextProject}
                className="optical-glass p-6 sm:p-8 rounded-2xl flex flex-col gap-2 text-right items-end group hover:border-neutral-700 cursor-pointer transition-all"
              >
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                  <span>{isPt ? 'PRÓXIMO PROJETO' : 'NEXT PROJECT'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-xl sm:text-2xl font-bold uppercase text-white group-hover:text-neutral-300 transition-colors">
                  {nextProjectName}
                </span>
              </button>
            ) : <div />}
          </div>

          {/* Back to Homepage Central Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <button
              onClick={onBack}
              className="optical-glass px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white flex items-center gap-2 cursor-pointer transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isPt ? 'Voltar a Todos os Projetos' : 'Back to All Works'}</span>
            </button>

            <span className="text-xs font-mono uppercase tracking-widest text-neutral-600">
              © 2026 RAÍSSA MORIÁ • PORTFOLIO
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
};
