import React from 'react';
import { motion } from 'motion/react';
import { Compass, MapPin, Sparkles, Heart, Coffee, Globe2 } from 'lucide-react';
import { PaperLabel } from './PaperLabel';
import { TapePiece } from './TapePiece';
import { SunRaysDoodle, WaveDoodle, CompassRoseDoodle } from './DoodleAccents';

// Authentic images
// @ts-ignore
import raissaPhoto from '../../assets/images/WhatsApp Image 2026-06-03 at 13.15.20.jpeg';
// @ts-ignore
import sunsetPhoto from '../../assets/images/collage_beach_sunset_1794316523578.jpg';
// @ts-ignore
import mountainPhoto from '../../assets/images/collage_mountains_ridge_1794316525124.jpg';
// @ts-ignore
import wavePhoto from '../../assets/images/collage_ocean_wave_1794316523572.jpg';

interface ScrapbookAboutProps {
  language: 'pt' | 'en';
}

export const ScrapbookAbout: React.FC<ScrapbookAboutProps> = ({ language }) => {
  return (
    <section id="sobre" className="relative w-full py-20 px-4 sm:px-8 md:px-12 select-none">
      
      <div className="max-w-[1400px] mx-auto flex flex-col gap-14">
        
        {/* ============================================================== */}
        {/* SECTION HEADER */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div 
                style={{ transform: 'rotate(-1.5deg)' }}
                className="px-4 py-1.5 bg-[#F8F6F0] text-[#1A1A1A] paper-shadow font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide rounded-[2px] border border-black/10 inline-block"
              >
                {language === 'pt' ? 'Sobre Mim' : 'About Me'}
              </div>
              <div 
                style={{ transform: 'rotate(2deg)' }}
                className="px-3 py-1 bg-[#2D7F8C] text-[#F8F6F0] paper-shadow font-display text-2xl sm:text-3xl font-bold tracking-wide rounded-[2px] border border-white/20 inline-block"
              >
                {language === 'pt' ? 'Diário de Bordo' : 'Travel Log'}
              </div>
              <SunRaysDoodle className="w-8 h-6" color="#E8AF30" />
            </div>

            <p className="font-handwriting text-xl sm:text-2xl text-[#F2EBD9] opacity-90">
              {language === 'pt' 
                ? 'Pessoas, natureza, mar e a curiosidade que me move.' 
                : 'People, nature, the sea and the curiosity that drives me.'}
            </p>
          </div>

          <div className="flex items-center gap-2 font-typewriter text-xs text-[#E8AF30] bg-[#052c46] px-3.5 py-1.5 rounded-full border border-[#E8AF30]/30">
            <MapPin className="w-3.5 h-3.5" />
            <span>Lisboa & Porto, Portugal</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TWO-PAGE SPREAD OF A TRAVEL DIARY & DESIGN ESSAY */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ============================================================== */}
          {/* LEFT PAGE: PHOTO JOURNAL SPREAD */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 relative flex flex-col gap-8">
            
            {/* Primary Journal Photo Collage */}
            <div 
              style={{ transform: 'rotate(-1deg)' }}
              className="relative bg-[#F8F6F0] p-4 sm:p-5 paper-shadow-lg rounded-[3px] border border-black/10"
            >
              <TapePiece className="-top-3.5 left-8" rotate={-8} width="w-16" height="h-5" variant="yellow" />
              <TapePiece className="-top-3 right-8" rotate={10} width="w-14" height="h-4.5" variant="cream" />

              {/* Main Authentic Photo */}
              <div className="relative aspect-[4/5] w-full rounded-[2px] overflow-hidden bg-neutral-900 mb-3 border border-black/10">
                <img 
                  src={raissaPhoto} 
                  alt="Raíssa Moriá traveling in nature" 
                  className="w-full h-full object-cover object-top filter contrast-[1.05]"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-[1px] font-handwriting text-sm text-[#F8F6F0]">
                  {language === 'pt' ? 'ar livre, sempre com um sorriso :)' : 'outdoors, always smiling :)'}
                </div>
              </div>

              {/* Travel stamps / labels */}
              <div className="flex items-center justify-between font-typewriter text-[11px] text-[#073859] pt-1">
                <span>COORD: 38.7223° N, 9.1393° W</span>
                <span className="font-bold text-[#E8AF30] bg-[#073859] px-2 py-0.5 rounded-[1px]">EXPEDITION</span>
              </div>
            </div>

            {/* Polaroid cluster underneath */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Polaroid 1: Sunset beach */}
              <div 
                style={{ transform: 'rotate(2deg)' }}
                className="relative bg-[#F2EBD9] p-2 pb-6 paper-shadow rounded-[2px] border border-black/10"
              >
                <TapePiece className="-top-2.5 left-4" rotate={-14} width="w-10" height="h-3.5" variant="green" />
                <div className="aspect-[4/3] w-full rounded-[1px] overflow-hidden bg-black/10 mb-2">
                  <img src={sunsetPhoto} alt="Beach sunset" className="w-full h-full object-cover" />
                </div>
                <div className="font-handwriting text-center text-sm text-[#1A1A1A]">
                  sunset & surf session
                </div>
              </div>

              {/* Polaroid 2: Mountain peaks */}
              <div 
                style={{ transform: 'rotate(-3deg)' }}
                className="relative bg-[#F8F6F0] p-2 pb-6 paper-shadow rounded-[2px] border border-black/10"
              >
                <TapePiece className="-top-2.5 right-4" rotate={12} width="w-10" height="h-3.5" variant="cream" />
                <div className="aspect-[4/3] w-full rounded-[1px] overflow-hidden bg-black/10 mb-2">
                  <img src={mountainPhoto} alt="Mountains view" className="w-full h-full object-cover" />
                </div>
                <div className="font-handwriting text-center text-sm text-[#1A1A1A]">
                  trilhas e montanhas
                </div>
              </div>

            </div>

            {/* Travel quote tag */}
            <div 
              style={{ transform: 'rotate(1deg)' }}
              className="p-4 bg-[#E8AF30] text-[#1A1A1A] paper-shadow rounded-[2px] border border-amber-900/20 font-handwriting text-xl sm:text-2xl leading-snug"
            >
              "{language === 'pt' 
                ? 'Estar perto do mar recarrega a energia e traz clareza para desenhar interfaces melhores.' 
                : 'Being close to the sea recharges my energy and brings clarity to design better interfaces.'}"
            </div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT PAGE: THE ESSAY ON DESIGN, CURIOSITY AND EMPATHY */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Journal Entry Page */}
            <div 
              style={{ transform: 'rotate(0.5deg)' }}
              className="relative p-6 sm:p-10 bg-[#F8F6F0] text-[#1A1A1A] paper-shadow-lg rounded-[4px] border border-black/10 font-sans flex flex-col gap-6"
            >
              <TapePiece className="-top-3.5 left-12" rotate={-2} width="w-20" height="h-5" variant="cream" />
              
              <div className="flex justify-between items-center border-b border-black/10 pb-3 font-typewriter text-xs text-[#073859]">
                <span>DIÁRIO DE DESIGN • ENTRADA #26</span>
                <span>DATA: 2026 // LISBOA</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl text-[#073859] tracking-wide leading-tight">
                {language === 'pt' 
                  ? 'O design começa na escuta e na observação das pessoas.' 
                  : 'Design starts with listening and observing people.'}
              </h3>

              <div className="flex flex-col gap-4 text-base sm:text-lg text-[#1A1A1A] font-normal leading-relaxed">
                <p>
                  {language === 'pt' ? (
                    <>
                      Sou apaixonada por viajar, por estar no mar e por caminhar pela natureza. Quando viajo, o que mais me fascina não são apenas os monumentos ou as paisagens de postal, mas <strong>as pessoas</strong>: como comunicam, como resolvem os pequenos atritos do dia a dia e como as suas rotinas refletem a sua identidade.
                    </>
                  ) : (
                    <>
                      I am passionate about traveling, being in the ocean and walking in nature. When I travel, what fascinates me most isn't just monuments or postcard landscapes, but <strong>people</strong>: how they communicate, how they solve everyday friction, and how their routines reflect their identity.
                    </>
                  )}
                </p>

                <p>
                  {language === 'pt' ? (
                    <>
                      Essa mesma curiosidade e sensibilidade humana é o coração do meu trabalho como <strong>UX/UI Designer</strong>. Antes de abrir o Figma ou desenhar qualquer botão, gosto de mergulhar a fundo nas dores reais de quem vai utilizar o produto. A tecnologia deve ser uma ponte, e não uma barreira.
                    </>
                  ) : (
                    <>
                      This same curiosity and human empathy is the core of my work as a <strong>UX/UI Designer</strong>. Before opening Figma or sketching any button, I dive deep into the real struggles of the people who will actually use the product. Technology must be a bridge, never a barrier.
                    </>
                  )}
                </p>

                <p className="text-sm sm:text-base text-[#073859] font-medium pt-2 border-t border-[#073859]/10">
                  {language === 'pt' ? (
                    <>
                      Acredito em produtos digitais que têm alma: interfaces limpas, intuitivas, com ritmo agradável e que deixam a vida de quem as usa um pouco mais simples e bonita.
                    </>
                  ) : (
                    <>
                      I believe in digital products with soul: clean, intuitive interfaces with a comfortable rhythm that make everyday life slightly simpler and more inspiring.
                    </>
                  )}
                </p>
              </div>

              {/* Hand-drawn underline / signature */}
              <div className="flex justify-between items-end pt-4 border-t border-black/10">
                <div className="flex flex-col">
                  <span className="font-typewriter text-[11px] text-neutral-500">ASSINATURA</span>
                  <span className="font-handwriting text-3xl text-[#073859] font-bold">
                    Raíssa Moriá
                  </span>
                </div>
                <WaveDoodle className="w-16 h-5" color="#2D7F8C" />
              </div>
            </div>

            {/* SKILLS & DISCIPLINES AS STAMP BADGES */}
            <div className="flex flex-col gap-3">
              <span className="font-typewriter text-xs text-[#F2EBD9] uppercase tracking-wider">
                {language === 'pt' ? 'O que levo na minha mochila de design:' : 'What I carry in my design backpack:'}
              </span>

              <div className="flex flex-wrap gap-2.5">
                {[
                  { name: 'UX Research & Empatia', rot: -1.5, bg: 'cream' as const },
                  { name: 'UI Design & Visual Systems', rot: 2, bg: 'white' as const },
                  { name: 'Figma Tokens & Auto-Layout', rot: -1, bg: 'mustard' as const },
                  { name: 'Prototipagem Rápida', rot: 1.5, bg: 'cream' as const },
                  { name: 'Acessibilidade (WCAG AA/AAA)', rot: -2, bg: 'white' as const },
                  { name: 'Low-Code & Frontend (React/Lovable)', rot: 1, bg: 'cream' as const },
                  { name: 'Service Blueprint & Arquitetura', rot: -1.2, bg: 'mustard' as const },
                ].map((skill, idx) => (
                  <PaperLabel
                    key={idx}
                    rotate={skill.rot}
                    variant={skill.bg}
                    size="sm"
                  >
                    {skill.name}
                  </PaperLabel>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
