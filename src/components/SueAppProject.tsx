/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
} from 'lucide-react';
import { Language } from '../types';
import { EditorialProjectLayout } from './editorial/EditorialProjectLayout';

// Authentic SUE App Design Process Slides (Chronological Order)
// @ts-ignore
import slide1 from '../assets/images/project-sue/1.png';
// @ts-ignore
import slide2 from '../assets/images/project-sue/2.png';
// @ts-ignore
import slide3 from '../assets/images/project-sue/3.png';
// @ts-ignore
import slide4 from '../assets/images/project-sue/4.png';
// @ts-ignore
import slide5 from '../assets/images/project-sue/5.png';
// @ts-ignore
import slide6 from '../assets/images/project-sue/6.png';
// @ts-ignore
import slide7 from '../assets/images/project-sue/7.png';
// @ts-ignore
import slide8 from '../assets/images/project-sue/8.png';
// @ts-ignore
import slide9 from '../assets/images/project-sue/9.png';

interface SueAppProjectProps {
  language: Language;
  onBack: () => void;
  onNextProject?: () => void;
  onPrevProject?: () => void;
}

interface ProcessSlide {
  id: number;
  image: string;
  fallback: string;
  stagePt: string;
  stageEn: string;
  descPt: string;
  descEn: string;
}

const PROCESS_SLIDES: ProcessSlide[] = [
  {
    id: 1,
    image: slide1,
    fallback: '/project-sue/1.png',
    stagePt: '01. Visão Geral & Apresentação do Produto',
    stageEn: '01. Product Overview & Presentation',
    descPt: 'Serviços de União a Emigração — apresentação da plataforma móvel para iOS e Android.',
    descEn: 'Union Services for Emigration — mobile application overview for iOS and Android.',
  },
  {
    id: 2,
    image: slide2,
    fallback: '/project-sue/2.png',
    stagePt: '02. Problema & Enquadramento Estratégico',
    stageEn: '02. Problem & Strategic Framing',
    descPt: 'Superação da burocracia, desinformação e atrasos através de inclusão, transparência e acompanhamento do Título de Residência.',
    descEn: 'Addressing bureaucratic friction, misinformation, and delays through transparency and residence permit tracking.',
  },
  {
    id: 3,
    image: slide3,
    fallback: '/project-sue/3.png',
    stagePt: '03. Pesquisa com Utilizadores (12 Entrevistas)',
    stageEn: '03. User Research (12 Interviews)',
    descPt: 'Resultados de inquéritos sobre a clareza dos sistemas governamentais atuais e as principais barreiras encontradas.',
    descEn: 'Survey and interview insights highlighting comprehension hurdles across current immigration portals.',
  },
  {
    id: 4,
    image: slide4,
    fallback: '/project-sue/4.png',
    stagePt: '04. Definição de Persona: Laura Mendes',
    stageEn: '04. Primary Persona: Laura Mendes',
    descPt: 'Mapeamento de necessidades reais: dificuldade em agendamentos, ansiedade com prazos e necessidade de apoio próximo.',
    descEn: 'Mapping core user needs: scheduling difficulties, permit deadline anxiety, and lack of human guidance.',
  },
  {
    id: 5,
    image: slide5,
    fallback: '/project-sue/5.png',
    stagePt: '05. Mapa de Empatia & Jornada do Utilizador',
    stageEn: '05. Empathy Map & User Journey',
    descPt: 'Análise emocional e comportamental ao longo de toda a jornada de regularização documental.',
    descEn: 'Emotional and behavioral mapping across every stage of the legal documentation process.',
  },
  {
    id: 6,
    image: slide6,
    fallback: '/project-sue/6.png',
    stagePt: '06. Arquitetura de Informação & Fluxo Principal',
    stageEn: '06. Information Architecture & Primary Flow',
    descPt: 'Estruturação das quatro áreas principais: Início, Processos, Agendamentos e Perfil/Suporte.',
    descEn: 'Structural hierarchy across the four core tabs: Home, Processes, Appointments, and Profile/Support.',
  },
  {
    id: 7,
    image: slide7,
    fallback: '/project-sue/7.png',
    stagePt: '07. Wireframes & Wireflow de Baixa Fidelidade',
    stageEn: '07. Low-Fidelity Wireframes & Wireflow',
    descPt: 'Exploração funcional do onboarding, autenticação segura e fluxo de submissão de documentos.',
    descEn: 'Functional exploration of onboarding, secure digital authentication, and document upload flows.',
  },
  {
    id: 8,
    image: slide8,
    fallback: '/project-sue/8.png',
    stagePt: '08. Design System & Guia de Estilo',
    stageEn: '08. Design System & Style Guide',
    descPt: 'Padronização tipográfica, paleta cromática de confiança, raios de curvatura e iconografia consistente.',
    descEn: 'Typographic hierarchy, trust-first color palette, corner radius tokens, and consistent iconography.',
  },
  {
    id: 9,
    image: slide9,
    fallback: '/project-sue/9.png',
    stagePt: '09. Interfaces de Alta Fidelidade',
    stageEn: '09. High-Fidelity UI Screens',
    descPt: 'Telas finais com estado transparente do Título de Residência, linha temporal de aprovação e suporte integrado.',
    descEn: 'Final screen compositions featuring real-time permit tracking, step-by-step approval timeline, and support.',
  },
];

const AUTO_ADVANCE_MS = 4000;

export const SueAppProject: React.FC<SueAppProjectProps> = ({
  language,
  onBack,
  onNextProject,
  onPrevProject,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isPt = language === 'pt';

  // Carousel states
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(() => !shouldReduceMotion);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const [expandedImage, setExpandedImage] = useState<{ src: string; caption?: string } | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Video player states (never auto-starts with sound)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(() => !shouldReduceMotion);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const currentSlide = PROCESS_SLIDES[currentSlideIndex];

  // Respect prefers-reduced-motion dynamically
  useEffect(() => {
    if (shouldReduceMotion) {
      setIsAutoPlaying(false);
    }
  }, [shouldReduceMotion]);

  // Auto-advance every 4 seconds unless paused, hovering, or reduced-motion
  useEffect(() => {
    if (!isAutoPlaying || isHoveringCarousel || shouldReduceMotion || expandedImage) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % PROCESS_SLIDES.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHoveringCarousel, shouldReduceMotion, expandedImage]);

  const handlePrevSlide = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentSlideIndex((prev) => (prev - 1 + PROCESS_SLIDES.length) % PROCESS_SLIDES.length);
  }, []);

  const handleNextSlide = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentSlideIndex((prev) => (prev + 1) % PROCESS_SLIDES.length);
  }, []);

  const handleSelectSlide = useCallback((index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlideIndex(index);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
    touchStartX.current = null;
  };

  // Video controls
  const toggleVideoPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsVideoMuted(video.muted);
  };

  return (
    <>
      <EditorialProjectLayout
        title="SUE App"
        subtitle={
          isPt
            ? 'Uma aplicação móvel concebida para simplificar a jornada de regularização de imigrantes e emigrantes, transformando processos burocráticos complexos numa experiência transparente, intuitiva e humana.'
            : 'A mobile application designed to simplify the migration and residence regularisation journey, transforming complex bureaucratic processes into a transparent, intuitive, and human experience.'
        }
        overviewPosition="after"
        overview={{
          projectLabel: isPt ? 'O projeto' : 'The project',
          description: isPt
            ? 'O projeto SUE (Serviços de União a Emigração) aborda as principais dificuldades sentidas pela comunidade migrante: terminologia jurídica impenetrável, falta de acompanhamento em tempo real do Título de Residência e ausência de apoio humanizado durante a transição.'
            : 'The SUE (Union Services for Emigration) project addresses key challenges faced by migrant communities: impenetrable legal jargon, lack of real-time permit status tracking, and limited human guidance.',
          roles: ['UX/UI Designer', 'UX Researcher', 'Design System'],
          technologies: ['Figma', 'Miro', 'Google Forms'],
          methodology: isPt
            ? ['Design Thinking', 'Entrevistas com Utilizadores', 'Testes de Usabilidade']
            : ['Design Thinking', 'User Interviews', 'Usability Testing'],
          users: isPt
            ? ['Imigrantes & Emigrantes', 'iOS & Android']
            : ['Migrants & Expats', 'iOS & Android'],
        }}
        language={language}
        onBack={onBack}
        onNextProject={onNextProject}
        onPrevProject={onPrevProject}
        prevProjectName="Nipon Spa"
        nextProjectName={isPt ? 'Plataforma de Helpdesk' : 'Helpdesk Platform'}
      >
        {/* 2. CARROSSEL AUTOMÁTICO DO PROCESSO (Imediatamente abaixo do título) */}
        <section
          aria-label={isPt ? 'Processo de Design do SUE App' : 'SUE App Design Process'}
          className="flex flex-col gap-6 sm:gap-8"
          onMouseEnter={() => setIsHoveringCarousel(true)}
          onMouseLeave={() => setIsHoveringCarousel(false)}
        >
          {/* Header da etapa atual com título próprio e controlos de navegação */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                <span>{isPt ? 'Processo de Design' : 'Design Process'}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums font-bold text-[#0F1115]">
                  {String(currentSlide.id).padStart(2, '0')} / {String(PROCESS_SLIDES.length).padStart(2, '0')}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F1115]">
                {isPt ? currentSlide.stagePt : currentSlide.stageEn}
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                {isPt ? currentSlide.descPt : currentSlide.descEn}
              </p>
            </div>

            {/* Controlos manuais do carrossel (alinhados e acessíveis em desktop & mobile) */}
            <div className="flex items-center gap-2 shrink-0">
              {!shouldReduceMotion && (
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying((prev) => !prev)}
                  className="h-11 px-4 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 text-xs font-mono uppercase tracking-wider text-neutral-700 inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                  aria-label={isAutoPlaying ? (isPt ? 'Pausar carrossel' : 'Pause carousel') : (isPt ? 'Reproduzir carrossel' : 'Play carousel')}
                >
                  {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isAutoPlaying ? (isPt ? 'Pausar' : 'Pause') : (isPt ? 'Auto' : 'Play')}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handlePrevSlide}
                className="w-11 h-11 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 text-[#0F1115] flex items-center justify-center transition-colors cursor-pointer"
                aria-label={isPt ? 'Etapa anterior' : 'Previous step'}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNextSlide}
                className="w-11 h-11 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 text-[#0F1115] flex items-center justify-center transition-colors cursor-pointer"
                aria-label={isPt ? 'Próxima etapa' : 'Next step'}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Palco do Slide em Tamanho Grande (1 imagem de cada vez com fade suave) */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => {
              setIsAutoPlaying(false);
              setExpandedImage({
                src: currentSlide.image,
                caption: isPt ? currentSlide.stagePt : currentSlide.stageEn,
              });
            }}
            className="group relative w-full aspect-[5834/3750] rounded-2xl overflow-hidden border border-neutral-200/80 bg-[#F4F6F8] cursor-pointer shadow-[0_16px_44px_rgba(0,0,0,0.05)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full h-full"
              >
                <img
                  src={currentSlide.image}
                  alt={isPt ? currentSlide.stagePt : currentSlide.stageEn}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src !== window.location.origin + currentSlide.fallback) {
                      img.src = currentSlide.fallback;
                    }
                  }}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/75 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3 h-3" />
              <span>{isPt ? 'Expandir' : 'Expand'}</span>
            </div>
          </div>

          {/* Indicadores de progresso clicáveis por etapa */}
          <div
            role="tablist"
            aria-label={isPt ? 'Etapas do processo de design' : 'Design process stages'}
            className="grid grid-cols-9 gap-2 sm:gap-3 pt-1"
          >
            {PROCESS_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={isPt ? slide.stagePt : slide.stageEn}
                  onClick={() => handleSelectSlide(idx)}
                  className="group relative py-3 cursor-pointer flex items-center focus:outline-none"
                >
                  <span
                    className="relative w-full h-1 rounded-full overflow-hidden block"
                    style={{ backgroundColor: 'var(--border-color, rgba(0, 0, 0, 0.14))' }}
                  >
                    {isActive && (
                      shouldReduceMotion || !isAutoPlaying || isHoveringCarousel ? (
                        <span
                          className="absolute inset-0 bg-[#0F1115] block rounded-full"
                          style={{ backgroundColor: 'var(--text-primary, #0F1115)' }}
                        />
                      ) : (
                        <motion.span
                          key={`progress-${currentSlideIndex}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
                          style={{
                            transformOrigin: 'left center',
                            backgroundColor: 'var(--text-primary, #0F1115)',
                          }}
                          className="absolute inset-0 block rounded-full"
                        />
                      )
                    )}
                    {!isActive && idx < currentSlideIndex && (
                      <span
                        className="absolute inset-0 opacity-35 block rounded-full"
                        style={{ backgroundColor: 'var(--text-primary, #0F1115)' }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. VÍDEO DO PROJETO (Imediatamente abaixo do carrossel) */}
        <section
          aria-label={isPt ? 'Vídeo de Demonstração do SUE App' : 'SUE App Prototype Video'}
          className="flex flex-col gap-6 sm:gap-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div className="flex flex-col gap-2 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                {isPt ? 'Demonstração Final' : 'Final Walkthrough'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F1115]">
                {isPt ? 'Experiência Interativa em Vídeo' : 'Interactive Mobile Experience'}
              </h2>
            </div>

            {/* Controlos dedicados: Reproduzir / Pausar e Ativar Som / Mudo */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={toggleVideoPlay}
                className="h-11 px-4 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 text-xs font-mono uppercase tracking-wider text-[#0F1115] inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                aria-label={isVideoPlaying ? (isPt ? 'Pausar vídeo' : 'Pause video') : (isPt ? 'Reproduzir vídeo' : 'Play video')}
              >
                {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isVideoPlaying ? (isPt ? 'Pausar' : 'Pause') : (isPt ? 'Reproduzir' : 'Play')}</span>
              </button>

              <button
                type="button"
                onClick={toggleVideoMute}
                className="h-11 px-4 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 text-xs font-mono uppercase tracking-wider text-[#0F1115] inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                aria-label={isVideoMuted ? (isPt ? 'Ativar som' : 'Unmute video') : (isPt ? 'Desativar som' : 'Mute video')}
              >
                {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isVideoMuted ? (isPt ? 'Ativar som' : 'Unmute') : (isPt ? 'Som ativo' : 'Mute')}</span>
              </button>
            </div>
          </div>

          {/* Contentor horizontal 16:9 mantendo a proporção original sem cortes */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-200/80 bg-black shadow-[0_16px_44px_rgba(0,0,0,0.06)]">
            <video
              ref={videoRef}
              src="/project-sue/sue-promo.mp4"
              poster="/project-sue/sue-promo-poster.jpg"
              autoPlay={!shouldReduceMotion}
              loop
              muted={isVideoMuted}
              playsInline
              onClick={toggleVideoPlay}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              className="w-full h-full object-contain cursor-pointer"
            />
          </div>
        </section>
      </EditorialProjectLayout>

      {/* Lightbox Modal de Alta Resolução para slides */}
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
                  {expandedImage.caption || 'SUE App'}
                </span>
                <button
                  type="button"
                  onClick={() => setExpandedImage(null)}
                  aria-label={isPt ? 'Fechar imagem' : 'Close image'}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img
                src={expandedImage.src}
                alt={expandedImage.caption || 'SUE App'}
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl bg-black"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
