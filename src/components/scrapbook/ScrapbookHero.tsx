import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';
import { MagazineIntroText, MagazineRaissa } from './MagazineHeading';
import { PaperLabel } from './PaperLabel';
import { TapePiece } from './TapePiece';
import { SunRaysDoodle, WaveDoodle, CompassRoseDoodle, HandUnderlineDoodle } from './DoodleAccents';

// Authentic images
// @ts-ignore
import raissaPhoto from '../../assets/images/WhatsApp Image 2026-06-03 at 13.15.20.jpeg';
// @ts-ignore
import oceanWaveImg from '../../assets/images/collage_ocean_wave_1794316523572.jpg';
// @ts-ignore
import sunsetPolaroidImg from '../../assets/images/collage_beach_sunset_1794316523578.jpg';
// @ts-ignore
import vintageCameraImg from '../../assets/images/collage_vintage_camera_1794316524490.jpg';
// @ts-ignore
import botanicalLeafImg from '../../assets/images/collage_botanical_leaf_1794316524586.jpg';
// @ts-ignore
import mountainRidgeImg from '../../assets/images/collage_mountains_ridge_1794316525124.jpg';

interface ScrapbookHeroProps {
  language: 'pt' | 'en';
  onExploreProjects: () => void;
}

export const ScrapbookHero: React.FC<ScrapbookHeroProps> = ({
  language,
  onExploreProjects,
}) => {
  return (
    <section className="relative w-full py-8 md:py-16 px-4 sm:px-8 md:px-12 overflow-hidden select-none">
      
      {/* BACKGROUND SUBTLE DOODLE ACCENTS */}
      <div className="absolute top-12 left-6 opacity-30 pointer-events-none hidden xl:block">
        <CompassRoseDoodle />
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* ============================================================== */}
        {/* LEFT COLUMN: THE RICH SCRAPBOOK COLLAGE (RAÍSSA + TRAVEL NATURE) */}
        {/* ============================================================== */}
        <div className="lg:col-span-6 relative w-full min-h-[500px] sm:min-h-[580px] md:min-h-[640px] flex items-center justify-center">
          
          {/* 1. Vintage map scrap backdrop */}
          <div 
            style={{ transform: 'rotate(-4deg)' }}
            className="absolute top-2 left-2 sm:left-6 w-44 sm:w-56 h-36 sm:h-44 bg-[#F2EBD9] opacity-80 paper-shadow torn-paper-card p-3 overflow-hidden pointer-events-none"
          >
            <TapePiece className="-top-2 left-4" rotate={-10} width="w-10" height="h-4" />
            <div className="w-full h-full border border-dashed border-[#073859]/30 p-2 flex flex-col justify-between font-typewriter text-[9px] text-[#073859]/70">
              <div className="flex justify-between">
                <span>N 38° 43' 12"</span>
                <span>W 9° 8' 24"</span>
              </div>
              <div className="text-center font-bold tracking-widest text-xs uppercase opacity-60">
                ATLANTIC COAST • PORTUGAL
              </div>
              <div className="flex justify-between text-[8px]">
                <span>LISBOA • SURF</span>
                <span>EXPEDITION</span>
              </div>
            </div>
          </div>

          {/* 2. Surfboard Silhouette Graphic behind photo */}
          <div 
            style={{ transform: 'rotate(18deg)' }}
            className="absolute top-4 right-12 sm:right-20 w-16 sm:w-20 h-64 sm:h-80 rounded-[45%] bg-[#F8F6F0] border-2 border-white paper-shadow-lg z-0 overflow-hidden pointer-events-none hidden sm:block"
          >
            <div className="w-full h-full bg-gradient-to-b from-[#2D7F8C]/40 via-transparent to-[#E8AF30]/30 flex flex-col items-center justify-center">
              <div className="w-1 h-full bg-[#073859]/40" />
            </div>
          </div>

          {/* 3. Tropical Monstera & Botanical leaf */}
          <div 
            style={{ transform: 'rotate(-8deg)' }}
            className="absolute -top-4 sm:top-0 left-12 sm:left-24 w-28 sm:w-36 h-28 sm:h-36 z-10 pointer-events-none overflow-hidden drop-shadow-xl"
          >
            <img 
              src={botanicalLeafImg} 
              alt="Monstera botanical leaf" 
              className="w-full h-full object-contain filter contrast-110"
            />
          </div>

          {/* 4. MAIN CENTRAL CUTOUT PHOTO OF RAÍSSA */}
          {/* USER CUSTOMIZATION SPOT: Easily swap raissaPhoto with any transparent PNG or portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: -1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="relative z-10 w-[270px] sm:w-[320px] md:w-[360px] aspect-[4/5] paper-shadow-lg rounded-[4px] bg-[#F8F6F0] p-2.5 sm:p-3 overflow-hidden cursor-pointer group"
          >
            {/* Washi tape at top of frame */}
            <TapePiece className="-top-3 left-1/2 -translate-x-1/2" rotate={2} width="w-16 sm:w-20" height="h-5 sm:h-6" />

            {/* Inner frame containing Raíssa's genuine photo */}
            <div className="w-full h-full relative overflow-hidden rounded-[2px] bg-neutral-900">
              <img 
                src={raissaPhoto} 
                alt="Raíssa Moriá - UX/UI Designer & Traveler" 
                className="w-full h-full object-cover object-top filter contrast-[1.06] brightness-105 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle caption sticker */}
              <div className="absolute bottom-2.5 left-2.5">
                <span className="font-handwriting text-lg sm:text-xl text-[#F8F6F0] drop-shadow-md">
                  Raíssa Moriá
                </span>
              </div>
            </div>
          </motion.div>

          {/* 5. Ocean Wave Breaking Photo Scrap */}
          <div 
            style={{ transform: 'rotate(7deg)' }}
            className="absolute -bottom-6 sm:-bottom-4 -left-2 sm:left-4 z-20 w-36 sm:w-48 aspect-[4/3] bg-[#F8F6F0] p-1.5 paper-shadow-lg torn-paper-card overflow-hidden transition-transform hover:scale-105 hover:rotate-3"
          >
            <TapePiece className="-top-2 left-4" rotate={-8} width="w-8" height="h-3.5" variant="yellow" />
            <img 
              src={oceanWaveImg} 
              alt="Ocean wave surf" 
              className="w-full h-full object-cover rounded-[1px]"
            />
          </div>

          {/* 6. Beach Sunset Polaroid with tape */}
          <div 
            style={{ transform: 'rotate(-5deg)' }}
            className="absolute -bottom-8 sm:-bottom-6 right-2 sm:right-12 z-20 w-32 sm:w-44 bg-[#F8F6F0] p-2 pb-6 paper-shadow-lg rounded-[2px] overflow-hidden transition-transform hover:scale-105 hover:-rotate-2"
          >
            <TapePiece className="-top-2.5 right-6" rotate={12} width="w-10" height="h-4" />
            <div className="w-full aspect-[4/3] overflow-hidden bg-black/10 rounded-[1px]">
              <img 
                src={sunsetPolaroidImg} 
                alt="Tropical beach sunset" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center font-handwriting text-sm sm:text-base text-[#1A1A1A] pt-1.5 leading-none">
              golden hour ~
            </div>
          </div>

          {/* 7. Vintage Rangefinder Camera Cutout */}
          <div 
            style={{ transform: 'rotate(6deg)' }}
            className="absolute bottom-16 -right-3 sm:right-2 z-20 w-20 sm:w-24 aspect-square drop-shadow-xl pointer-events-none hidden sm:block"
          >
            <img 
              src={vintageCameraImg} 
              alt="Vintage 35mm film camera" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* 8. Coastal Mountains Panorama strip */}
          <div 
            style={{ transform: 'rotate(-1.5deg)' }}
            className="absolute -bottom-16 sm:-bottom-12 left-1/4 z-10 w-48 sm:w-64 h-16 sm:h-20 bg-[#F8F6F0] p-1 paper-shadow torn-paper-card overflow-hidden hidden md:block opacity-95"
          >
            <img 
              src={mountainRidgeImg} 
              alt="Coastal mountain ridge" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* 9. SCRAPBOOK LABELS AROUND RAÍSSA */}
          {/* Label: viagens */}
          <div className="absolute top-16 -left-3 sm:left-2 z-30">
            <PaperLabel rotate={-6} variant="cream" size="sm" withTape tapePosition="top-left">
              {language === 'pt' ? 'viagens' : 'travels'}
            </PaperLabel>
          </div>

          {/* Label: natureza */}
          <div className="absolute top-36 -left-4 sm:left-0 z-30">
            <PaperLabel rotate={3} variant="white" size="sm">
              {language === 'pt' ? 'natureza' : 'nature'}
            </PaperLabel>
          </div>

          {/* Label: surf */}
          <div className="absolute bottom-28 left-0 sm:left-8 z-30">
            <PaperLabel rotate={-4} variant="mustard" size="sm" withTape tapePosition="top-right">
              surf
            </PaperLabel>
          </div>

          {/* Label: design */}
          <div className="absolute top-28 right-0 sm:right-4 z-30">
            <PaperLabel rotate={5} variant="white" size="sm">
              design
            </PaperLabel>
          </div>

          {/* Label: curiosidade */}
          <div className="absolute top-44 -right-2 sm:right-2 z-30">
            <PaperLabel rotate={-3} variant="cream" size="sm" withTape tapePosition="top">
              {language === 'pt' ? 'curiosidade' : 'curiosity'}
            </PaperLabel>
          </div>

          {/* Label: histórias */}
          <div className="absolute bottom-32 right-8 sm:right-16 z-30">
            <PaperLabel rotate={4} variant="white" size="sm">
              {language === 'pt' ? 'histórias' : 'stories'}
            </PaperLabel>
          </div>

        </div>


        {/* ============================================================== */}
        {/* RIGHT COLUMN: EDITORIAL TYPOGRAPHY & STORY */}
        {/* ============================================================== */}
        <div className="lg:col-span-6 flex flex-col gap-6 sm:gap-8 relative z-20">
          
          {/* MAGAZINE CUTOUT HEADLINE: "OI, EU SOU" / "RAÍSSA" */}
          <div className="flex flex-col gap-2 relative">
            <div className="flex items-center gap-3">
              <MagazineIntroText language={language} />
              <SunRaysDoodle className="w-8 h-6" color="#E8AF30" />
            </div>

            <div className="pt-1">
              <MagazineRaissa />
            </div>
          </div>

          {/* SUBTITLE IN PAPER STRIP WITH HAND-DRAWN UNDERLINE */}
          <div 
            style={{ transform: 'rotate(-0.8deg)' }}
            className="relative inline-block self-start px-5 sm:px-6 py-2 sm:py-2.5 bg-[#F8F6F0] text-[#1A1A1A] paper-shadow torn-paper-card max-w-xl"
          >
            <TapePiece className="-top-2.5 right-6" rotate={-6} width="w-10" height="h-3.5" variant="yellow" />
            
            <p className="font-sans font-bold text-base sm:text-lg md:text-xl text-[#073859] leading-snug">
              {language === 'pt' 
                ? 'UX/UI designer, viajante, amante da natureza e do surf.' 
                : 'UX/UI designer, traveler, nature and surf lover.'}
            </p>
            
            <div className="pt-1">
              <HandUnderlineDoodle className="w-48 sm:w-60 h-2.5" color="#E8AF30" />
            </div>
          </div>

          {/* PRESENTATION NOTE ON JOURNAL PAPER */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{ transform: 'rotate(0.5deg)' }}
            className="relative p-6 sm:p-7 bg-[#F2EBD9] text-[#1A1A1A] paper-shadow-lg rounded-[3px] border border-black/10 max-w-xl font-sans"
          >
            {/* Washi tape on top corner */}
            <TapePiece className="-top-3 left-6" rotate={-5} width="w-14" height="h-5" variant="green" />
            
            <div className="flex justify-between items-start gap-4 mb-2">
              <p className="text-base sm:text-lg text-[#1A1A1A] leading-relaxed font-normal">
                {language === 'pt' ? (
                  <>
                    Crio experiências digitais com <strong>sensibilidade visual</strong> e uma visão humana. Gosto de explorar o mundo, conectar-me com pessoas e transformar histórias em design.
                  </>
                ) : (
                  <>
                    I craft digital experiences with <strong>visual sensitivity</strong> and a human perspective. I love exploring the world, connecting with people and turning stories into design.
                  </>
                )}
              </p>
              
              <div className="shrink-0 pt-1">
                <WaveDoodle className="w-12 h-4" color="#2D7F8C" />
              </div>
            </div>

            <p className="text-sm text-[#073859]/80 leading-relaxed font-sans pt-2 border-t border-[#073859]/15">
              {language === 'pt' 
                ? 'Sou designer, mas a minha curiosidade vai muito além dos ecrãs. Observar, compreender e criar experiências mais humanas.' 
                : 'I am a designer, but my curiosity goes far beyond screens. Observing, understanding and crafting more human experiences.'}
            </p>
          </motion.div>

          {/* ACTION BUTTON: "Conhece os meus projetos" in Paper Tag Style */}
          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={onExploreProjects}
              style={{ transform: 'rotate(-1.5deg)' }}
              className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 bg-[#E8AF30] text-[#1A1A1A] paper-shadow rounded-[2px] font-display text-xl sm:text-2xl tracking-wider transition-all duration-200 hover:scale-105 hover:-rotate-2 hover:bg-[#F2B705] active:scale-95 cursor-pointer border border-amber-900/20"
            >
              <TapePiece className="-top-2.5 -left-2" rotate={-14} width="w-8" height="h-3" variant="cream" />
              <span>{language === 'pt' ? 'Conhece os meus projetos' : 'Explore my projects'}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
            </button>

            <span className="font-handwriting text-xl sm:text-2xl text-[#F8F6F0]/80 hidden sm:inline-block">
              {language === 'pt' ? 'vem ver!' : 'take a look!'}
            </span>
          </div>

        </div>

      </div>

    </section>
  );
};
