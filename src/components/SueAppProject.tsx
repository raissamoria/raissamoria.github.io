import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  Smartphone, 
  Layers, 
  Clock, 
  Sparkles,
  Search,
  ExternalLink,
  Volume2,
  VolumeX,
  RotateCcw
} from 'lucide-react';
import { Language } from '../types';
import { OpticalGlassButton, OpticalGlassPill } from './OpticalGlass';

// Import all 9 presentation slides in exact order
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
}

interface SlideItem {
  id: number;
  image: string;
  fallback: string;
  titlePt: string;
  titleEn: string;
  categoryPt: string;
  categoryEn: string;
  descPt: string;
  descEn: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 1,
    image: slide1,
    fallback: '/project-sue/1.png',
    titlePt: '01. Capa & Visão Geral • SUE Mobile App',
    titleEn: '01. Cover & Overview • SUE Mobile App',
    categoryPt: 'IDENTIDADE & APRESENTAÇÃO',
    categoryEn: 'IDENTITY & PRESENTATION',
    descPt: 'Serviços de União a Emigração — Migration Facility. Disponível para iOS (App Store) e Android (Google Play).',
    descEn: 'Union Services for Emigration — Migration Facility. Available for iOS (App Store) & Android (Google Play).',
  },
  {
    id: 2,
    image: slide2,
    fallback: '/project-sue/2.png',
    titlePt: '02. Problema & Solução',
    titleEn: '02. Problem & Solution',
    categoryPt: 'ENQUADRAMENTO ESTRATÉGICO',
    categoryEn: 'STRATEGIC FRAMING',
    descPt: 'Superação da burocracia, desinformação e atrasos através de inclusão, transparência e acompanhamento do Título de Residência.',
    descEn: 'Tackling bureaucratic friction, misinformation and backlog through inclusion, transparency, and residence permit tracking.',
  },
  {
    id: 3,
    image: slide3,
    fallback: '/project-sue/3.png',
    titlePt: '03. Pesquisa com Utilizadores (12 Entrevistas)',
    titleEn: '03. User Research (12 Interviews)',
    categoryPt: 'UX RESEARCH & DADOS',
    categoryEn: 'UX RESEARCH & INSIGHTS',
    descPt: 'Resultados de inquéritos via Google Forms sobre facilidade de compreensão dos sistemas governamentais atuais e barreiras encontradas.',
    descEn: 'Google Forms quantitative survey findings regarding comprehension and user friction across current government portals.',
  },
  {
    id: 4,
    image: slide4,
    fallback: '/project-sue/4.png',
    titlePt: '04. User Personas (Lenice & Sarah)',
    titleEn: '04. User Personas (Lenice & Sarah)',
    categoryPt: 'EMPATIA & PERFIS',
    categoryEn: 'EMPATHY & PERSONAS',
    descPt: 'Mapeamento das necessidades de trabalhadores dedicados e estudantes internacionais que buscam segurança jurídica e acolhimento.',
    descEn: 'Mapping the distinct needs of hardworking professionals and international students seeking legal security and support.',
  },
  {
    id: 5,
    image: slide5,
    fallback: '/project-sue/5.png',
    titlePt: '05. Mapa de Jornada (Journey Map)',
    titleEn: '05. User Journey Map',
    categoryPt: 'MAPEAMENTO DE EXPERIÊNCIA',
    categoryEn: 'EXPERIENCE MAPPING',
    descPt: 'Atividades, ecrãs, emoções e oportunidades identificadas desde o Login até ao Feed, Processo de Visto, Chat e Perfil.',
    descEn: 'Activities, screens, emotional arcs, and product opportunities from Authentication through Feed, Visa Status, Chat, and Profile.',
  },
  {
    id: 6,
    image: slide6,
    fallback: '/project-sue/6.png',
    titlePt: '06. Fluxograma de Navegação (FlowChart)',
    titleEn: '06. Navigation FlowChart',
    categoryPt: 'ARQUITETURA DE INFORMAÇÃO',
    categoryEn: 'INFORMATION ARCHITECTURE',
    descPt: 'Estrutura de navegação e taxonomia da aplicação: Autenticação, Feed, Rastreio de Processos ("Tracking") e Gestão de Perfil.',
    descEn: 'App navigation taxonomy and system flows: Authentication, Main Feed, Process Tracking, and User Profile settings.',
  },
  {
    id: 7,
    image: slide7,
    fallback: '/project-sue/7.png',
    titlePt: '07. Wireframes de Baixa Fidelidade',
    titleEn: '07. Low-Fidelity Wireframes',
    categoryPt: 'PROTOTIPAGEM ESTRUTURAL',
    categoryEn: 'STRUCTURAL WIREFRAMING',
    descPt: 'Esboço dos 5 ecrãs fundamentais: Feed Principal, Barra de Pesquisa, Dashboard de Candidatura, Suporte Online e Área de Perfil.',
    descEn: 'Layout and functional wireframes for the 5 key views: Main Feed, Search, Application Dashboard, Online Chat, and Profile.',
  },
  {
    id: 8,
    image: slide8,
    fallback: '/project-sue/8.png',
    titlePt: '08. Design System & Guias de Estilo',
    titleEn: '08. Design System & Styleguide',
    categoryPt: 'SISTEMA VISUAL & BRANDING',
    categoryEn: 'VISUAL SYSTEM & BRANDING',
    descPt: 'Paleta cromática institucional azul (#00609C), escala tipográfica, iconografia outline e componentes da barra de navegação.',
    descEn: 'Institutional blue palette (#00609C), typographic hierarchy, stroke iconography, and mobile navigation bar components.',
  },
  {
    id: 9,
    image: slide9,
    fallback: '/project-sue/9.png',
    titlePt: '09. Resultados Finais UI (Alta Fidelidade)',
    titleEn: '09. High-Fidelity UI Results',
    categoryPt: 'DESIGN DE PRODUTO FINAL',
    categoryEn: 'FINAL PRODUCT DESIGN',
    descPt: 'Apresentação completa de todos os 7 ecrãs móveis finais em alta resolução com dados reais, estados de interação e chat ativo.',
    descEn: 'Complete showcase of all 7 final high-fidelity mobile screens with authentic data states, interaction flows, and live chat.',
  },
];

const AUTOPLAY_INTERVAL_MS = 10000; // 10 seconds exactly per user requirement

export const SueAppProject: React.FC<SueAppProjectProps> = ({
  language,
  onBack,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isLightboxOpen]);

  // 10-Second Auto-advance Timer & Visual Progress Bar
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / AUTOPLAY_INTERVAL_MS) * 100;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    timerRef.current = window.setInterval(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, handleNext, currentIndex]);

  // Video player state & controls for SUE PROMO.mp4
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState('00:00');
  const [videoDuration, setVideoDuration] = useState('01:05');

  // Automatically start the video on mount
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.defaultMuted = true;
      vid.muted = true;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true);
          })
          .catch(() => {
            vid.muted = true;
            vid.play().catch(() => {});
          });
      }
    }
  }, []);

  const formatVideoTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 65.33;
      setVideoProgress((cur / dur) * 100);
      setVideoCurrentTime(formatVideoTime(cur));
    }
  };

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(formatVideoTime(videoRef.current.duration));
    }
  };

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsVideoMuted(videoRef.current.muted);
  };

  const handleVideoSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const dur = videoRef.current.duration || 65.33;
    videoRef.current.currentTime = pos * dur;
    setVideoProgress(pos * 100);
  };

  const toggleVideoFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsVideoPlaying(true);
  };

  const currentSlide = SLIDES[currentIndex];

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
            <span>{language === 'pt' ? 'TODOS OS PROJETOS' : 'ALL PROJECTS'}</span>
          </button>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
            <span className="hidden sm:inline">02 / SELECTED WORK</span>
            <span className="text-white font-bold">SUE MOBILE APP</span>
          </div>

          <OpticalGlassButton
            onClick={onBack}
            className="!px-4 !py-1.5 !text-xs"
          >
            <span>{language === 'pt' ? 'Voltar ao Portfólio' : 'Back to Portfolio'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </OpticalGlassButton>
        </div>
      </div>

      <div className="max-w-[1720px] mx-auto px-6 md:px-12 xl:px-16 pt-16 md:pt-24 flex flex-col gap-16 md:gap-24">
        
        {/* 1. PROJECT HEADER */}
        <header className="flex flex-col gap-6 max-w-5xl">
          <div className="flex items-center gap-4 text-neutral-500 font-mono text-xs uppercase tracking-[0.25em]">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>02 // CASE STUDY</span>
            <span className="text-neutral-700">•</span>
            <span>MOBILE UX/UI</span>
            <span className="text-neutral-700">•</span>
            <span>PROJETO SUE (9 IMAGENS)</span>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-none">
              SUE
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-neutral-400 font-light tracking-tight mt-2">
              {language === 'pt' ? 'App Mobile de Apoio à Emigração' : 'Mobile App to Support Emigration'} <br className="hidden sm:inline" />
              <span className="text-neutral-200">
                {language === 'pt' ? 'Serviços de União a Emigração (UX/UI)' : 'Union Services for Emigration (UX/UI)'}
              </span>
            </p>
          </div>
        </header>

        {/* 2. THE 9-SLIDE INTERACTIVE CAROUSEL (10s AUTO-ADVANCE) */}
        <section 
          ref={containerRef}
          className="w-full flex flex-col gap-6"
        >
          {/* Main Carousel Stage Box */}
          <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-[0_25px_70px_rgba(0,0,0,0.9)] relative group flex flex-col">
            
            {/* Top HUD Toolbar: Slide Info, Auto-play Status & Controls */}
            <div className="bg-neutral-900/90 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-neutral-400">
              
              {/* Left: Project & Slide category pill */}
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span className="text-white font-bold tracking-wider">
                  {language === 'pt' ? currentSlide.categoryPt : currentSlide.categoryEn}
                </span>
                <span className="text-neutral-600 hidden sm:inline">•</span>
                <span className="text-neutral-400 hidden sm:inline text-[10px]">
                  {language === 'pt' ? 'SLIDE 1 A 9' : 'SLIDES 1 TO 9'}
                </span>
              </div>

              {/* Center / Right: Autoplay status, timer and control buttons */}
              <div className="flex items-center gap-3 ml-auto">
                
                {/* 10s Timer Pill Indicator */}
                <div 
                  onClick={togglePlay}
                  title={isPlaying ? (language === 'pt' ? 'Pausar avanço automático de 10s' : 'Pause 10s autoplay') : (language === 'pt' ? 'Retomar avanço automático de 10s' : 'Resume 10s autoplay')}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-neutral-800 hover:border-neutral-700 cursor-pointer text-[10px] text-neutral-300 transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-sky-400" />
                      <span className="font-mono">10s AUTO</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-neutral-400" />
                      <span className="font-mono text-neutral-500">{language === 'pt' ? 'PAUSADO' : 'PAUSED'}</span>
                    </>
                  )}
                  <span className="text-neutral-600">|</span>
                  <span className="text-white font-bold">{currentIndex + 1}/9</span>
                </div>

                {/* Lightbox toggle */}
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  title={language === 'pt' ? 'Ver em ecrã expandido' : 'Expand full view'}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Continuous 10-Second Progress Line */}
            <div className="w-full h-1 bg-neutral-900 relative overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-400"
                style={{ width: `${isPlaying ? progress : 0}%` }}
                transition={{ ease: 'linear', duration: 0.05 }}
              />
            </div>

            {/* The Slide Display Canvas */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] bg-[#0c0c0e] flex items-center justify-center overflow-hidden select-none">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.015 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 cursor-pointer"
                  onClick={() => setIsLightboxOpen(true)}
                >
                  <img
                    src={currentSlide.image}
                    alt={language === 'pt' ? currentSlide.titlePt : currentSlide.titleEn}
                    className="max-w-full max-h-full object-contain rounded-lg drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
                    onError={(e) => {
                      // Fallback to public path if needed
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes(currentSlide.fallback)) {
                        target.src = currentSlide.fallback;
                      }
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Slide Nav Overlay Arrows (Always single clean icons) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer z-20 group shadow-xl"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer z-20 group shadow-xl"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Slide Counter Overlay Pill */}
              <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
                <span className="font-mono text-[10px] uppercase tracking-widest bg-black/80 backdrop-blur-md text-white/80 px-3 py-1.5 rounded-full border border-white/10">
                  {currentIndex + 1} / {SLIDES.length}
                </span>
              </div>
            </div>

            {/* Slide Caption & Context Bar */}
            <div className="p-4 sm:p-6 bg-neutral-900/60 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-1 max-w-3xl">
                <h3 className="font-sans font-bold text-base sm:text-lg text-white">
                  {language === 'pt' ? currentSlide.titlePt : currentSlide.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light">
                  {language === 'pt' ? currentSlide.descPt : currentSlide.descEn}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <OpticalGlassButton
                  onClick={() => setIsLightboxOpen(true)}
                  className="!px-3.5 !py-1.5 !text-[10px]"
                >
                  <span>{language === 'pt' ? 'Ampliar Slide' : 'Expand Slide'}</span>
                  <Maximize2 className="w-3 h-3 text-neutral-300" />
                </OpticalGlassButton>
              </div>
            </div>

          </div>

          {/* 9-SLIDE THUMBNAIL STRIP (Exact Order 1.png -> 9.png) */}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest px-1">
              <span>{language === 'pt' ? 'ÍNDICE DAS 9 IMAGENS DO PROJETO' : 'INDEX OF THE 9 PROJECT SLIDES'}</span>
              <span>{language === 'pt' ? 'AVANÇO A CADA 10 SEGUNDOS' : 'AUTO-ADVANCE EVERY 10 SECONDS'}</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5">
              {SLIDES.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => handleSelectSlide(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-[16/10] bg-neutral-900 border transition-all duration-300 text-left p-1 cursor-pointer group ${
                      isActive 
                        ? 'border-sky-400 ring-2 ring-sky-400/40 shadow-lg scale-[1.02]' 
                        : 'border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={slide.image} 
                      alt={`Slide ${slide.id}`} 
                      className="w-full h-full object-cover object-center rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes(slide.fallback)) {
                          target.src = slide.fallback;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Badge Number */}
                    <div className="absolute bottom-1.5 left-1.5 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/80 text-white border border-white/10">
                      0{slide.id}
                    </div>

                    {/* Active Pulsing Indicator */}
                    {isActive && (
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. VIDEO SHOWCASE: Video about the app and usability test presentation (Autoplay) */}
        <section className="flex flex-col gap-6 pt-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                {language === 'pt' ? 'VÍDEO DE APRESENTAÇÃO & TESTE DE USABILIDADE' : 'VIDEO SHOWCASE • APP & USABILITY TEST'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Video about the app and usability test presentation
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-light max-w-3xl">
              {language === 'pt'
                ? 'Demonstração em vídeo com animação 3D da aplicação mobile SUE (Feed, serviços, acolhimento, IA conversacional e testes de usabilidade). O vídeo inicia automaticamente em alta definição.'
                : '3D promotional video demonstration of the SUE mobile application (Feed, services, settlement, conversational AI, and usability testing). Video begins automatically in full HD.'
              }
            </p>
          </div>

          {/* Video Container Box */}
          <div 
            ref={videoContainerRef}
            className="w-full rounded-2xl md:rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-[0_25px_70px_rgba(0,0,0,0.9)] relative group flex flex-col"
          >
            {/* Top Bar for Video */}
            <div className="bg-neutral-900/90 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-neutral-800 flex items-center justify-between font-mono text-[11px] text-neutral-400">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-white font-bold tracking-wider">SUE PROMO // 1080P HD</span>
                <span className="text-neutral-600 hidden sm:inline">•</span>
                <span className="text-neutral-400 hidden sm:inline text-[10px]">
                  {language === 'pt' ? 'INÍCIO AUTOMÁTICO' : 'AUTOPLAY ENABLED'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-neutral-300 bg-black/60 px-2.5 py-1 rounded-full border border-neutral-800">
                  {videoCurrentTime} / {videoDuration}
                </span>
              </div>
            </div>

            {/* Video Canvas */}
            <div className="relative w-full aspect-[16/9] bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src="/project-sue/sue-promo.mp4"
                poster="/project-sue/sue-promo-poster.jpg"
                autoPlay
                muted={isVideoMuted}
                playsInline
                loop
                onTimeUpdate={handleVideoTimeUpdate}
                onLoadedMetadata={handleVideoLoadedMetadata}
                onClick={toggleVideoPlay}
                className="w-full h-full object-contain cursor-pointer"
              />

              {/* Center Play button overlay when paused */}
              {!isVideoPlaying && (
                <div 
                  onClick={toggleVideoPlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs cursor-pointer z-20"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </div>
              )}

              {/* Floating Bottom Glass Controls */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-3 z-30 transition-opacity duration-300">
                {/* Progress bar scrubber */}
                <div 
                  onClick={handleVideoSeek}
                  className="w-full h-2 rounded-full bg-white/20 hover:h-3 transition-all cursor-pointer relative overflow-hidden group/bar"
                >
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-emerald-400 transition-all"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleVideoPlay}
                      className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors cursor-pointer"
                      title={isVideoPlaying ? 'Pausa' : 'Play'}
                    >
                      {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={restartVideo}
                      className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors cursor-pointer"
                      title="Reiniciar"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={toggleVideoMute}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors cursor-pointer text-xs font-mono"
                    >
                      {isVideoMuted ? (
                        <>
                          <VolumeX className="w-4 h-4 text-neutral-300" />
                          <span>{language === 'pt' ? 'Ativar Som' : 'Unmute'}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-emerald-400" />
                          <span>{language === 'pt' ? 'Silenciar' : 'Mute'}</span>
                        </>
                      )}
                    </button>

                    <span className="font-mono text-neutral-300 text-xs hidden sm:inline">
                      {videoCurrentTime} / {videoDuration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleVideoFullscreen}
                      className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors cursor-pointer"
                      title="Ecrã Inteiro"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. PROJECT INFORMATION SPEC GRID */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 py-10 border-t border-b border-neutral-800 font-mono text-xs">
          <div className="flex flex-col gap-2">
            <span className="text-neutral-500 uppercase tracking-widest text-[10px]">PROJECT</span>
            <span className="text-white font-bold text-sm">SUE Mobile</span>
            <span className="text-neutral-400 text-[11px]">Migration Facility</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-neutral-500 uppercase tracking-widest text-[10px]">ROLE</span>
            <span className="text-white font-medium leading-relaxed">
              UX/UI Design<br />
              Product Design<br />
              Design System
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-neutral-500 uppercase tracking-widest text-[10px]">PLATFORM</span>
            <span className="text-white font-medium leading-relaxed">
              Mobile (iOS & Android)<br />
              App Store & Google Play<br />
              9 Slide Deck
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-neutral-500 uppercase tracking-widest text-[10px]">METHODOLOGY</span>
            <span className="text-white font-medium leading-relaxed">
              User Research (12 Users)<br />
              Personas & Journey Map<br />
              Conversational UI
            </span>
          </div>

          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <span className="text-neutral-500 uppercase tracking-widest text-[10px]">DELIVERABLES</span>
            <span className="text-white font-medium leading-relaxed">
              Design System (#00609C)<br />
              Interactive Prototype<br />
              High-Fidelity UI (7 Screens)
            </span>
          </div>
        </section>

        {/* 4. EXPANDED SLIDE GALLERY BREAKDOWN (Each slide detail) */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
              {language === 'pt' ? 'DOCUMENTAÇÃO COMPLETA DO PROJETO' : 'FULL PROJECT DOCUMENTATION'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              {language === 'pt' ? 'Etapas do Estudo de Caso SUE' : 'SUE Case Study Milestones'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SLIDES.slice(1).map((s) => (
              <div 
                key={`card-${s.id}`}
                onClick={() => {
                  handleSelectSlide(s.id - 1);
                  window.scrollTo({ top: containerRef.current?.offsetTop || 0, behavior: 'smooth' });
                }}
                className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 flex flex-col gap-4 hover:border-neutral-700 transition-colors cursor-pointer group"
              >
                <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  <img 
                    src={s.image} 
                    alt={language === 'pt' ? s.titlePt : s.titleEn} 
                    className="w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes(s.fallback)) {
                        target.src = s.fallback;
                      }
                    }}
                  />
                </div>
                <div className="flex justify-between items-center font-mono text-[10px] text-neutral-400">
                  <span className="text-sky-400 font-bold uppercase">{language === 'pt' ? s.categoryPt : s.categoryEn}</span>
                  <span>SLIDE 0{s.id}</span>
                </div>
                <h4 className="font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
                  {language === 'pt' ? s.titlePt : s.titleEn}
                </h4>
                <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                  {language === 'pt' ? s.descPt : s.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. FOOTER NAVIGATION */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-16 border-t border-neutral-800">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-xs font-mono font-bold uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{language === 'pt' ? 'TODOS OS PROJETOS' : 'ALL PROJECTS'}</span>
          </button>

          <div className="flex items-center gap-4">
            <OpticalGlassButton
              onClick={onBack}
              className="!px-8 !py-4 !text-xs sm:!text-sm !tracking-[0.15em] !rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <span>{language === 'pt' ? 'EXPLORAR OUTROS PROJETOS' : 'EXPLORE OTHER WORKS'}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </OpticalGlassButton>
          </div>
        </footer>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Modal Header */}
            <div className="w-full flex justify-between items-center pb-4 border-b border-white/10 select-none">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-sky-400 font-bold">
                  {currentSlide.id} / {SLIDES.length}
                </span>
                <span className="text-white font-medium text-sm sm:text-base">
                  {language === 'pt' ? currentSlide.titlePt : currentSlide.titleEn}
                </span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image View */}
            <div 
              className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentSlide.image}
                alt={language === 'pt' ? currentSlide.titlePt : currentSlide.titleEn}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes(currentSlide.fallback)) {
                    target.src = currentSlide.fallback;
                  }
                }}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center backdrop-blur-md cursor-pointer transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center backdrop-blur-md cursor-pointer transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Footer Controls */}
            <div className="w-full pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono text-neutral-400">
              <span>{language === 'pt' ? 'Use as setas do teclado para navegar' : 'Use arrow keys to navigate'}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors text-white"
                >
                  {isPlaying ? (language === 'pt' ? 'Pausar 10s' : 'Pause 10s') : (language === 'pt' ? 'Iniciar 10s' : 'Start 10s')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.article>
  );
};
