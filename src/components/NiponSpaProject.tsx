import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Compass, Layers, CalendarCheck, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

// Images for Nipon Spa
// @ts-ignore
import heroImage from '../assets/images/nipon_spa_hero_1787305381037.jpg';
// @ts-ignore
import treatmentsImage from '../assets/images/nipon_treatments_1787305392435.jpg';
// @ts-ignore
import detailsImage from '../assets/images/nipon_details_1787305409273.jpg';

interface NiponSpaProjectProps {
  language: Language;
  onBack: () => void;
}

export const NiponSpaProject: React.FC<NiponSpaProjectProps> = ({
  language,
  onBack,
}) => {
  // Scroll to top when entering the project page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans antialiased pb-32"
    >
      {/* Top Floating Navigation Header */}
      <div className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-neutral-900 px-6 md:px-12 py-4">
        <div className="max-w-[1720px] mx-auto flex justify-between items-center">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-xs font-mono font-bold uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{language === 'pt' ? '← TODOS OS PROJETOS' : '← ALL PROJECTS'}</span>
          </button>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
            <span className="hidden sm:inline">01 / SELECTED WORK</span>
            <span className="text-white font-bold">NIPON SPA</span>
          </div>

          <a
            href="https://www.niponspa.pt/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-neutral-200 px-4 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all"
          >
            <span>niponspa.pt</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="max-w-[1720px] mx-auto px-6 md:px-12 xl:px-16 pt-16 md:pt-24 flex flex-col gap-24 md:gap-32">
        
        {/* 1. PROJECT HEADER */}
        <header className="flex flex-col gap-8 max-w-5xl">
          <div className="flex items-center gap-4 text-neutral-500 font-mono text-xs uppercase tracking-[0.25em]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>01 // CASE STUDY</span>
            <span className="text-neutral-700">•</span>
            <span>2026</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-none">
              NIPON SPA
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-neutral-400 font-light tracking-tight mt-2">
              Japanese Wellness <br className="hidden sm:inline" />
              <span className="text-neutral-200">Digital Experience</span>
            </p>
          </motion.div>
        </header>

        {/* 2. HERO LARGE SCREENSHOT (80-90% viewport width with original vibrant colors) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[92vw] mx-auto rounded-2xl md:rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-[0_20px_60px_rgba(0,0,0,0.9)] group relative"
        >
          {/* Subtle browser chrome bar for realistic preview */}
          <div className="bg-neutral-900/90 backdrop-blur-md px-4 py-3 border-b border-neutral-800 flex items-center justify-between font-mono text-[11px] text-neutral-400">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            </div>
            <div className="bg-black/60 px-6 py-1 rounded-full border border-neutral-800 text-neutral-300 text-[10px] tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>https://www.niponspa.pt</span>
            </div>
            <a 
              href="https://www.niponspa.pt/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative overflow-hidden aspect-[16/9] w-full bg-neutral-900">
            <img 
              src={heroImage} 
              alt="Nipon Spa Digital Experience Homepage" 
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* 3. PROJECT INFORMATION SPEC GRID */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 py-10 border-t border-b border-neutral-800 font-mono text-xs">
          <div className="flex flex-col gap-2">
            <span className="text-neutral-500 uppercase tracking-widest text-[10px]">PROJECT</span>
            <span className="text-white font-bold text-sm">Nipon Spa</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-neutral-500 uppercase tracking-widest text-[10px]">ROLE</span>
            <span className="text-white font-medium leading-relaxed">
              UX/UI Design<br />
              Web Design<br />
              Development
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-neutral-500 uppercase tracking-widest text-[10px]">YEAR</span>
            <span className="text-white font-bold text-sm">2026</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-neutral-500 uppercase tracking-widest text-[10px]">TYPE</span>
            <span className="text-white font-medium">Wellness / Spa Website</span>
          </div>

          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <span className="text-neutral-500 uppercase tracking-widest text-[10px]">LIVE WEBSITE</span>
            <a 
              href="https://www.niponspa.pt/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-neutral-300 font-bold underline underline-offset-4 flex items-center gap-1.5"
            >
              <span>niponspa.pt</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* 4. ABOUT THE PROJECT */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <span className="text-neutral-500 font-mono text-xs uppercase tracking-[0.25em]">
              ABOUT THE PROJECT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-3">
              Japanese Wellness & Therapeutic Spa
            </h2>
          </div>
          
          <div className="lg:col-span-8 flex flex-col gap-6 text-neutral-300 text-base md:text-lg font-light leading-relaxed">
            <p className="text-white text-lg md:text-xl font-normal leading-relaxed">
              &quot;Nipon Spa is a Japanese-inspired wellness and therapeutic spa in Lisbon with more than 20 years of experience. The project focused on creating a modern digital presence that communicates its Japanese heritage while making treatments easier to discover and understand.&quot;
            </p>
            <p className="text-neutral-400 text-sm md:text-base">
              {language === 'pt'
                ? 'O redesenho e desenvolvimento da experiência digital focou-se em transmitir a serenidade e a essência da cultura japonesa de bem-estar, simplificando ao mesmo tempo a jornada de marcação através de fluxos de navegação intuitivos e design responsivo de alto desempenho.'
                : 'The redesign and development aimed to evoke the calmness and authenticity of Japanese therapeutic wellness, creating intuitive paths for users to discover customized treatments and make direct bookings with minimal friction.'
              }
            </p>
          </div>
        </section>

        {/* 5. THE CHALLENGE & THE SOLUTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-neutral-950 border border-neutral-800 rounded-3xl p-8 md:p-14">
          
          {/* The Challenge */}
          <div className="flex flex-col gap-5 border-b md:border-b-0 md:border-r border-neutral-800 pb-8 md:pb-0 md:pr-10">
            <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>THE CHALLENGE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Complex Catalogue & Service Discovery
            </h3>
            <p className="text-neutral-300 font-light text-sm md:text-base leading-relaxed">
              &quot;Transform a large catalogue of treatments and information into a clearer digital experience, helping users understand which treatment is most appropriate for their needs while creating a stronger premium identity.&quot;
            </p>
          </div>

          {/* The Solution */}
          <div className="flex flex-col gap-5 md:pl-4">
            <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>THE SOLUTION</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Goal-Centred Structure & Direct Booking Paths
            </h3>
            <p className="text-neutral-300 font-light text-sm md:text-base leading-relaxed">
              &quot;A new experience centred around treatment goals rather than overwhelming users with a long list of services. The interface introduces clearer content hierarchy, strong visual storytelling and direct paths towards booking.&quot;
            </p>
          </div>

        </section>

        {/* 6. UX HIGHLIGHTS (3 Visual Concepts) */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-neutral-500 font-mono text-xs uppercase tracking-[0.25em]">
              METHODOLOGY & ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              UX Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
            {/* Highlight 01 */}
            <div className="flex flex-col gap-4 bg-[#0A0A0A] border border-neutral-800 hover:border-neutral-600 rounded-2xl p-8 transition-colors">
              <span className="text-3xl font-black font-mono text-neutral-600">01</span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                Treatment Discovery
              </h3>
              <p className="text-neutral-400 font-light text-sm leading-relaxed">
                Simplified navigation based on what the user wants to achieve.
              </p>
            </div>

            {/* Highlight 02 */}
            <div className="flex flex-col gap-4 bg-[#0A0A0A] border border-neutral-800 hover:border-neutral-600 rounded-2xl p-8 transition-colors">
              <span className="text-3xl font-black font-mono text-neutral-600">02</span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                Clear Information
              </h3>
              <p className="text-neutral-400 font-light text-sm leading-relaxed">
                Improved hierarchy to make services, benefits and treatment information easier to understand.
              </p>
            </div>

            {/* Highlight 03 */}
            <div className="flex flex-col gap-4 bg-[#0A0A0A] border border-neutral-800 hover:border-neutral-600 rounded-2xl p-8 transition-colors">
              <span className="text-3xl font-black font-mono text-neutral-600">03</span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                Booking Journey
              </h3>
              <p className="text-neutral-400 font-light text-sm leading-relaxed">
                Clear calls-to-action guide the user naturally from discovering a treatment to making a booking.
              </p>
            </div>

          </div>
        </section>

        {/* 7. WEBSITE PREVIEW: EDITORIAL ASYMMETRICAL SHOWCASE */}
        <section className="flex flex-col gap-12 md:gap-16 pt-8">
          <div className="flex flex-col gap-2">
            <span className="text-neutral-500 font-mono text-xs uppercase tracking-[0.25em]">
              VISUAL REVEAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Website Showcase & UI Layouts
            </h2>
          </div>

          {/* Staggered Editorial Layout */}
          <div className="flex flex-col gap-12 md:gap-20">
            
            {/* FULL WIDTH SCREENSHOT 1: Treatments section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full rounded-2xl md:rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl group"
            >
              <div className="p-4 bg-neutral-900/80 border-b border-neutral-800 flex justify-between items-center text-[10px] font-mono text-neutral-400">
                <span>CATALOGUE & TREATMENT SELECTION</span>
                <span>NIPON SPA LISBON</span>
              </div>
              <img 
                src={treatmentsImage} 
                alt="Nipon Spa Treatments Grid and Discovery" 
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* STAGGERED ROW: SCREENSHOT RIGHT & SCREENSHOT LEFT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* Left Column Text / Context */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  INTERACTIVE DETAIL
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  Japanese Serenity & High Contrast Clarity
                </h3>
                <p className="text-neutral-300 font-light text-sm md:text-base leading-relaxed">
                  {language === 'pt'
                    ? 'A interface equilibra fotografia terapêutica autêntica de rituais japoneses com tipografia contemporânea. Os detalhes dos tratamentos informam de forma direta duração, benefícios corporais e valores.'
                    : 'The interface balances authentic therapeutic imagery of Japanese rituals with contemporary typography. Treatment details clearly highlight duration, bodily benefits, and pricing.'
                  }
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="font-mono text-[10px] uppercase bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-neutral-300">
                    Shiatsu & Seitai
                  </span>
                  <span className="font-mono text-[10px] uppercase bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-neutral-300">
                    Hot Stone Therapy
                  </span>
                  <span className="font-mono text-[10px] uppercase bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-neutral-300">
                    Oriental Reflexology
                  </span>
                </div>
              </div>

              {/* Right Column Screenshot */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 rounded-2xl md:rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl group"
              >
                <img 
                  src={detailsImage} 
                  alt="Nipon Spa Treatment Detail and Booking Flow" 
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

            </div>

          </div>
        </section>

        {/* 8. LIVE WEBSITE CTA & RETURN TO ALL PROJECTS */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-16 border-t border-neutral-800">
          
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-xs font-mono font-bold uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{language === 'pt' ? '← TODOS OS PROJETOS' : '← ALL PROJECTS'}</span>
          </button>

          <a
            href="https://www.niponspa.pt/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-white hover:bg-neutral-200 text-black px-8 py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-[0.15em] transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105"
          >
            <span>{language === 'pt' ? 'VER WEBSITE AO VIVO' : 'VIEW LIVE WEBSITE'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

        </footer>

      </div>
    </motion.article>
  );
};
