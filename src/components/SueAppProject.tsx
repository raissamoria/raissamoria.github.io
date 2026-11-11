import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  CheckCircle2, 
  Smartphone, 
  Layers, 
  Clock, 
  Sparkles,
  ExternalLink,
  Volume2,
  VolumeX,
  RotateCcw,
  Shield,
  FileText,
  User,
  X,
  ArrowUpRight
} from 'lucide-react';
import { Language } from '../types';
import { ModernProjectLayout, ProjectTabItem } from './ModernProjectLayout';
import { OpticalGlassButton, OpticalGlassPill } from './OpticalGlass';

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
    titlePt: '04. Persona: Laura Mendes (Migrante Brasileira)',
    titleEn: '04. Persona: Laura Mendes (Brazilian Migrant)',
    categoryPt: 'ARQUÉTIPO DE UTILIZADOR',
    categoryEn: 'USER ARCHETYPE',
    descPt: 'Idade: 29 anos • Estado: Solteira • Ocupação: Designer Gráfica • Dores: Dificuldade em agendamentos, ansiedade com prazos e falta de apoio.',
    descEn: 'Age: 29 • Status: Single • Occupation: Graphic Designer • Pain points: Booking hurdles, permit deadline anxiety, lack of human guidance.',
  },
  {
    id: 5,
    image: slide5,
    fallback: '/project-sue/5.png',
    titlePt: '05. Mapa de Empatia & Jornada do Utilizador',
    titleEn: '05. Empathy Map & User Journey',
    categoryPt: 'MAPEAMENTO DE EXPERIÊNCIA',
    categoryEn: 'EXPERIENCE MAPPING',
    descPt: 'O que o utilizador pensa, sente, ouve, vê, fala e faz ao longo da jornada burocrática de regularização documental.',
    descEn: 'Mapping thoughts, feelings, auditory influences, verbal actions, and pain-gain thresholds during legal documentation journeys.',
  },
  {
    id: 6,
    image: slide6,
    fallback: '/project-sue/6.png',
    titlePt: '06. Arquitetura de Informação & Fluxo Principal',
    titleEn: '06. Information Architecture & Primary Flow',
    categoryPt: 'ESTRUTURAÇÃO & TAXONOMIA',
    categoryEn: 'STRUCTURE & TAXONOMY',
    descPt: 'Hierarquia das 4 abas mestras da app: Início (Dashboard), Processos (Acompanhamento), Agendamentos e Perfil/Suporte.',
    descEn: 'Hierarchical breakdown of the 4 primary app tabs: Home (Dashboard), Processes (Tracking), Appointments, and Profile/Support.',
  },
  {
    id: 7,
    image: slide7,
    fallback: '/project-sue/7.png',
    titlePt: '07. Wireframes & Wireflow de Baixa Fidelidade',
    titleEn: '07. Low-Fidelity Wireframes & Wireflow',
    categoryPt: 'PROTOTIPAGEM EXPLORATÓRIA',
    categoryEn: 'EXPLORATORY PROTOTYPING',
    descPt: 'Esboços funcionais da navegação de integração (onboarding), autenticação com chave móvel e submissão de documentos.',
    descEn: 'Functional sketches illustrating onboarding, mobile digital key verification, and secure document upload workflows.',
  },
  {
    id: 8,
    image: slide8,
    fallback: '/project-sue/8.png',
    titlePt: '08. Design System & Guia de Estilo',
    titleEn: '08. Design System & Style Guide',
    categoryPt: 'SISTEMAS VISUAIS',
    categoryEn: 'DESIGN TOKENS & COMPONENTS',
    descPt: 'Tipografia (Inter), paleta cromática com Azul Confiança (#0052CC) e Amarelo Calor, raio de curvatura 16px e ícones consistentes.',
    descEn: 'Typography (Inter), Trust Blue (#0052CC) & Warm Gold palette, 16px corner radius tokens, and accessible icon sets.',
  },
  {
    id: 9,
    image: slide9,
    fallback: '/project-sue/9.png',
    titlePt: '09. Interfaces de Alta Fidelidade (Mockups Finais)',
    titleEn: '09. High-Fidelity UI Screens (Final Mockups)',
    categoryPt: 'ENTREGA FINAL & PROTÓTIPO',
    categoryEn: 'FINAL DELIVERY & PROTOTYPE',
    descPt: 'Telas finais com status transparente do Título de Residência, timeline de aprovação passo a passo e chat de apoio em tempo real.',
    descEn: 'Final screen compositions featuring real-time permit status badge, step-by-step approval timeline, and integrated live support.',
  },
];

export const SueAppProject: React.FC<SueAppProjectProps> = ({
  language,
  onBack,
  onNextProject = () => {},
  onPrevProject = () => {},
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Video playback states
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const isPt = language === 'pt';
  const currentSlide = SLIDES[currentSlideIndex];

  // Carousel autoplay logic (8s)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

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

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsVideoPlaying(true);
  };

  // =========================================================================
  // TAB 1: VISÃO GERAL & SLIDESHOW
  // =========================================================================
  const OverviewTab = (
    <div className="flex flex-col gap-8">
      {/* Editorial Overview Card */}
      <div className="optical-glass p-6 sm:p-10 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>01 / {isPt ? 'VISÃO GERAL DO PROJETO' : 'PROJECT OVERVIEW'}</span>
          </div>
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
            9 SLIDES • APRESENTAÇÃO COMPLETA
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
            SUE — Serviços de União a Emigração
          </h2>
          <p className="text-base sm:text-lg text-neutral-200 font-light leading-relaxed">
            {isPt 
              ? 'Uma aplicação móvel concebida para simplificar a jornada de regularização de imigrantes e emigrantes, transformando processos burocráticos complexos numa experiência transparente, intuitiva e humana.'
              : 'A mobile application designed to simplify the migration and residence regularisation journey, transforming opaque bureaucratic hurdles into a transparent, empathetic digital experience.'}
          </p>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            {isPt
              ? 'O projeto aborda as principais dificuldades sentidas pela comunidade migrante: terminologia jurídica impenetrável, falta de acompanhamento em tempo real do Título de Residência e ausência de apoio humanizado durante a transição.'
              : 'The project addresses the core friction points encountered by international migrants: impenetrable legal jargon, total absence of real-time permit status tracking, and lack of guided human support.'}
          </p>
        </div>
      </div>

      {/* Quick Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">PLATAFORMAS</span>
          <span className="text-lg font-bold text-white">iOS & Android</span>
          <span className="text-neutral-400 text-xs font-light">App Store & Google Play</span>
        </div>

        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">O MEU PAPEL</span>
          <span className="text-lg font-bold text-white">UX/UI Designer</span>
          <span className="text-neutral-400 text-xs font-light">Research, Wireframing & Design System</span>
        </div>

        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">FERRAMENTAS</span>
          <span className="text-lg font-bold text-sky-400">Figma, Miro, Forms</span>
          <span className="text-neutral-400 text-xs font-light">Design Tokens & Usability Testing</span>
        </div>
      </div>

      {/* 9-Slide Interactive Carousel Viewer */}
      <div className="optical-glass p-6 sm:p-8 rounded-2xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-sky-400 font-bold block">
              APRESENTAÇÃO COMPLETA • SLIDE {currentSlide.id} DE {SLIDES.length}
            </span>
            <h3 className="text-xl font-bold uppercase text-white mt-1">
              {isPt ? currentSlide.titlePt : currentSlide.titleEn}
            </h3>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="optical-glass px-3 py-1.5 rounded-full text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? (isPt ? 'Pausar' : 'Pause') : (isPt ? 'Auto' : 'Play')}</span>
            </button>

            <button
              onClick={goToPrevSlide}
              className="optical-glass p-2 rounded-full text-white hover:bg-white/20 transition-all cursor-pointer"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={goToNextSlide}
              className="optical-glass p-2 rounded-full text-white hover:bg-white/20 transition-all cursor-pointer"
              title="Seguinte"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Active Slide in High Resolution */}
        <div 
          onClick={() => setExpandedImage(currentSlide.image)}
          className="group cursor-pointer bg-neutral-950 border border-neutral-800 overflow-hidden rounded-2xl relative aspect-[16/9] shadow-2xl transition-all duration-300 hover:border-neutral-600"
        >
          <img 
            src={currentSlide.image} 
            alt={currentSlide.titlePt} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-xl">
              {isPt ? currentSlide.descPt : currentSlide.descEn}
            </p>
            <div className="optical-glass px-3 py-1.5 rounded-full text-white font-mono text-xs flex items-center gap-2 shrink-0">
              <Maximize2 className="w-3.5 h-3.5 text-white" />
              <span>{isPt ? 'Expandir Slide' : 'Expand'}</span>
            </div>
          </div>
        </div>

        {/* Thumbnails Navigator */}
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 pt-2">
          {SLIDES.map((s, idx) => {
            const isSelected = idx === currentSlideIndex;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  setIsPlaying(false);
                }}
                className={`group relative aspect-[16/9] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-white ring-2 ring-white/50 scale-105 z-10' 
                    : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/40'
                }`}
              >
                <img src={s.image} alt={s.titlePt} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 font-mono text-[8px] bg-black/80 px-1 rounded text-white">
                  0{s.id}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 2: PESQUISA COM UTILIZADORES
  // =========================================================================
  const ResearchTab = (
    <div className="flex flex-col gap-8">
      <div className="optical-glass p-6 sm:p-10 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 border-b border-white/10 pb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span>02 / {isPt ? 'PESQUISA COM UTILIZADORES & DESCOBERTA' : 'USER RESEARCH & DISCOVERY'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          {isPt ? '12 Entrevistas em Profundidade com Migrantes' : '12 In-Depth Interviews with Migrants'}
        </h3>
        <p className="text-base text-neutral-300 leading-relaxed font-light">
          {isPt 
            ? 'A fase de pesquisa combinou inquéritos quantitativos e 12 entrevistas semiestruturadas com cidadãos imigrantes em Portugal, identificando as maiores dores na interação com os serviços de regularização pública.'
            : 'The discovery phase merged quantitative surveys with 12 semi-structured interviews with foreign residents in Portugal, mapping the exact friction points experienced with public immigration bodies.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => setExpandedImage(slide3)}
          className="group cursor-pointer bg-neutral-950 border border-neutral-800 overflow-hidden rounded-2xl relative aspect-[16/9] shadow-xl hover:border-neutral-600 transition-all"
        >
          <img src={slide3} alt="User Research Data" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              {isPt ? 'Dados da Pesquisa Quantitativa' : 'Quantitative Survey Results'}
            </span>
            <div className="optical-glass p-2 rounded-full text-white">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => setExpandedImage(slide4)}
          className="group cursor-pointer bg-neutral-950 border border-neutral-800 overflow-hidden rounded-2xl relative aspect-[16/9] shadow-xl hover:border-neutral-600 transition-all"
        >
          <img src={slide4} alt="Persona Laura Mendes" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              {isPt ? 'Persona: Laura Mendes (29 Anos)' : 'Primary Persona Archetype'}
            </span>
            <div className="optical-glass p-2 rounded-full text-white">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 3: PROCESSO & WIREFRAMES
  // =========================================================================
  const DesignProcessTab = (
    <div className="flex flex-col gap-8">
      <div className="optical-glass p-6 sm:p-10 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 border-b border-white/10 pb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>03 / {isPt ? 'MAPA DE EMPATIA & ARQUITETURA DE INFORMAÇÃO' : 'EMPATHY MAP & IA'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          {isPt ? 'Da Jornada Emocional à Estruturação dos Fluxos' : 'From Emotional Journey to Functional Flow'}
        </h3>
        <p className="text-base text-neutral-300 leading-relaxed font-light">
          {isPt 
            ? 'A arquitetura de informação foi desenhada para colocar o estado do Título de Residência no topo da hierarquia visual, eliminando cliques desnecessários e reduzindo a ansiedade do utilizador.'
            : 'The information architecture prioritized the legal residence permit status at the very top of the hierarchy, removing unnecessary clicks and mitigating user stress.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => setExpandedImage(slide5)}
          className="group cursor-pointer bg-neutral-950 border border-neutral-800 overflow-hidden rounded-2xl relative aspect-[16/9] shadow-xl hover:border-neutral-600 transition-all"
        >
          <img src={slide5} alt="Empathy Map" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              {isPt ? 'Slide 05: Mapa de Empatia & Sentimentos' : 'Slide 05: Empathy Map'}
            </span>
            <div className="optical-glass p-2 rounded-full text-white">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => setExpandedImage(slide6)}
          className="group cursor-pointer bg-neutral-950 border border-neutral-800 overflow-hidden rounded-2xl relative aspect-[16/9] shadow-xl hover:border-neutral-600 transition-all"
        >
          <img src={slide6} alt="Information Architecture" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              {isPt ? 'Slide 06: Arquitetura de Informação' : 'Slide 06: Information Architecture'}
            </span>
            <div className="optical-glass p-2 rounded-full text-white">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 4: DESIGN SYSTEM & WIREFRAMES
  // =========================================================================
  const PrototypeTab = (
    <div className="flex flex-col gap-8">
      <div className="optical-glass p-6 sm:p-10 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 border-b border-white/10 pb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span>04 / {isPt ? 'WIREFRAMES & DESIGN SYSTEM' : 'WIREFRAMES & DESIGN SYSTEM'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          {isPt ? 'Componentes Reutilizáveis & Paleta de Confiança' : 'Reusable Tokens & Trust-First Palette'}
        </h3>
        <p className="text-base text-neutral-300 leading-relaxed font-light">
          {isPt 
            ? 'Um sistema de design coeso que alia a sobriedade institucional da autoridade migratória com a proximidade calorosa e acolhedora necessária para quem está a recomeçar a vida num novo país.'
            : 'A design system marrying the institutional rigor required for immigration with the warmth and human clarity demanded by newcomers.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => setExpandedImage(slide7)}
          className="group cursor-pointer bg-neutral-950 border border-neutral-800 overflow-hidden rounded-2xl relative aspect-[16/9] shadow-xl hover:border-neutral-600 transition-all"
        >
          <img src={slide7} alt="Wireframes" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              {isPt ? 'Slide 07: Wireframes de Baixa Fidelidade' : 'Slide 07: Lo-Fi Wireframes'}
            </span>
            <div className="optical-glass p-2 rounded-full text-white">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => setExpandedImage(slide8)}
          className="group cursor-pointer bg-neutral-950 border border-neutral-800 overflow-hidden rounded-2xl relative aspect-[16/9] shadow-xl hover:border-neutral-600 transition-all"
        >
          <img src={slide8} alt="Design System" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              {isPt ? 'Slide 08: Design System & Cores' : 'Slide 08: Design System & Tokens'}
            </span>
            <div className="optical-glass p-2 rounded-full text-white">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 5: VÍDEO & TELAS FINAIS
  // =========================================================================
  const FinalResultTab = (
    <div className="flex flex-col gap-8">
      <div className="optical-glass p-6 sm:p-10 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 border-b border-white/10 pb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>05 / {isPt ? 'PROTÓTIPO EM VÍDEO & TELAS FINAIS' : 'VIDEO PROTOTYPE & FINAL UI'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          {isPt ? 'Demonstração Interativa da Aplicação Móvel' : 'Interactive Mobile Experience Walkthrough'}
        </h3>
        <p className="text-base text-neutral-300 leading-relaxed font-light">
          {isPt 
            ? 'Apresentação em vídeo e composição final das interfaces de alta fidelidade desenhadas no Figma.'
            : 'Video walkthrough and final high-fidelity UI screen compositions designed in Figma.'}
        </p>
      </div>

      {/* Video Player in Optical Glass Frame */}
      <div className="optical-glass p-4 sm:p-6 rounded-2xl flex flex-col gap-4">
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black border border-white/10">
          <video
            ref={videoRef}
            src="/project-sue/sue-promo.mp4"
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            className="w-full h-full object-contain"
          />

          {/* Video Control Bar */}
          <div className="absolute bottom-3 left-3 right-3 optical-glass px-4 py-2 rounded-xl flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleVideoPlay}
                className="hover:text-sky-400 cursor-pointer flex items-center gap-1.5 font-mono"
              >
                {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isVideoPlaying ? (isPt ? 'Pausar' : 'Pause') : (isPt ? 'Reproduzir' : 'Play')}</span>
              </button>

              <button
                onClick={toggleVideoMute}
                className="hover:text-sky-400 cursor-pointer flex items-center gap-1.5 font-mono"
              >
                {isVideoMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                <span>{isVideoMuted ? (isPt ? 'Ativar Som' : 'Unmute') : (isPt ? 'Mudo' : 'Mute')}</span>
              </button>

              <button
                onClick={restartVideo}
                className="hover:text-sky-400 cursor-pointer flex items-center gap-1.5 font-mono hidden sm:flex"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isPt ? 'Reiniciar' : 'Restart'}</span>
              </button>
            </div>

            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest hidden sm:inline">
              VÍDEO OFICIAL • SUE PROMO
            </span>
          </div>
        </div>
      </div>

      {/* Slide 9: Final UI Screen */}
      <div 
        onClick={() => setExpandedImage(slide9)}
        className="group cursor-pointer bg-neutral-950 border border-neutral-800 overflow-hidden rounded-2xl relative aspect-[16/9] shadow-2xl hover:border-neutral-600 transition-all"
      >
        <img src={slide9} alt="Final UI Screens" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="text-sm font-mono uppercase tracking-wider text-white font-bold">
            {isPt ? 'Slide 09: Telas Finais de Alta Fidelidade' : 'Slide 09: High-Fidelity UI Screens'}
          </span>
          <div className="optical-glass p-2 rounded-full text-white">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 6: APRENDIZAGENS & IMPACTO
  // =========================================================================
  const LearningsTab = (
    <div className="flex flex-col gap-8">
      <div className="optical-glass p-6 sm:p-10 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 border-b border-white/10 pb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>06 / {isPt ? 'APRENDIZAGENS DOS TESTES DE USABILIDADE' : 'USABILITY & DESIGN IMPACT'}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          {isPt ? 'Empatia Radical & Impacto Social do Design' : 'Radical Empathy & Social Impact of Design'}
        </h3>

        <p className="text-base sm:text-lg text-neutral-200 font-light leading-relaxed">
          {isPt 
            ? 'Projetar para pessoas em situação de vulnerabilidade e transição geográfica exige mais do que boas regras de usabilidade: exige profunda empatia emocional. Os testes revelaram que o maior obstáculo não era a navegação em si, mas a ansiedade gerada pela falta de certeza quanto aos prazos legais.'
            : 'Designing for individuals navigating international relocation requires more than standard UX conventions: it demands acute emotional empathy. Usability tests proved that the greatest hurdle was not interface navigation, but chronic anxiety born from zero legal status clarity.'}
        </p>

        <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
          {isPt 
            ? 'A introdução de micro-cópias calorosas em português claro, a substituição de termos técnicos por resumos práticos e a linha temporal passo a passo reduziram o tempo de execução de tarefas em 64% durante as sessões de teste.'
            : 'Introducing warm microcopy in plain Portuguese, replacing legal jargon with actionable step cards, and anchoring the timeline reduced task completion duration by 64% during moderated testing sessions.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-2">
          <span className="font-mono text-xs font-bold text-sky-400">
            {isPt ? '01. Clareza Linguística' : '01. Linguistic Clarity'}
          </span>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            {isPt ? 'Simplificar termos jurídicos complexos sem perder o rigor legal foi o maior desafio de UX Writing.' : 'Translating complex administrative jargon into plain language without losing legal precision.'}
          </p>
        </div>

        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-2">
          <span className="font-mono text-xs font-bold text-emerald-400">
            {isPt ? '02. Feedback Constante' : '02. Constant Status Feedback'}
          </span>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            {isPt ? 'Uma simples barra de progresso visual acalma a ansiedade do utilizador mais do que qualquer outro elemento.' : 'A clear visual timeline relieves user anxiety more effectively than any other interface element.'}
          </p>
        </div>

        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-2">
          <span className="font-mono text-xs font-bold text-purple-400">
            {isPt ? '03. Impacto Social do Design' : '03. Social Impact'}
          </span>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            {isPt ? 'O design tem o poder real de devolver dignidade e segurança a quem recomeça a sua vida num novo país.' : 'Design possesses the tangible power to restore dignity and confidence to those rebuilding lives abroad.'}
          </p>
        </div>
      </div>
    </div>
  );

  const modernTabs: ProjectTabItem[] = [
    {
      id: 'overview',
      labelPt: 'Visão Geral',
      labelEn: 'Overview',
      badge: '9 SLIDES',
      content: OverviewTab,
    },
    {
      id: 'research',
      labelPt: 'Pesquisa com Utilizadores',
      labelEn: 'User Research',
      badge: '12 INT',
      content: ResearchTab,
    },
    {
      id: 'process',
      labelPt: 'Jornada & Arquitetura',
      labelEn: 'Journey & IA',
      badge: 'FLOW',
      content: DesignProcessTab,
    },
    {
      id: 'prototype',
      labelPt: 'Design System',
      labelEn: 'Design System',
      badge: 'UI',
      content: PrototypeTab,
    },
    {
      id: 'result',
      labelPt: 'Vídeo & Telas Finais',
      labelEn: 'Video & Final UI',
      badge: 'MP4',
      content: FinalResultTab,
    },
    {
      id: 'learnings',
      labelPt: 'Aprendizagens',
      labelEn: 'Takeaways',
      badge: 'UX',
      content: LearningsTab,
    },
  ];

  return (
    <>
      <ModernProjectLayout
        projectId="sue-app"
        projectNumber="02"
        title="SUE — Mobile App"
        subtitle={isPt 
          ? "Serviços de União a Emigração • Mobile App para iOS e Android" 
          : "Union Services for Emigration • iOS & Android Mobile Experience"}
        category={isPt ? "APLICAÇÃO MÓVEL & UX RESEARCH" : "MOBILE APP & UX RESEARCH"}
        year="2026"
        roles={["UX/UI Design", "UX Research", "Usability Testing", "Design System"]}
        language={language}
        onBack={onBack}
        onNextProject={onNextProject}
        onPrevProject={onPrevProject}
        prevProjectName="Nipon Spa"
        nextProjectName={isPt ? "Plataforma de Helpdesk" : "Helpdesk Platform"}
        tabs={modernTabs}
      />

      {/* Expanded Lightbox Modal matching Homepage */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-5xl w-full optical-glass p-3 rounded-2xl border border-white/20 shadow-2xl">
              <div className="flex justify-between items-center px-3 py-2 border-b border-white/10 mb-3">
                <span className="font-mono text-xs uppercase text-neutral-400">
                  SLIDE COMPLETO • SUE MOBILE APP
                </span>
                <button 
                  onClick={() => setExpandedImage(null)}
                  className="optical-glass p-1.5 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <img 
                src={expandedImage} 
                alt="Expanded View" 
                className="w-full max-h-[80vh] object-contain rounded-xl bg-black"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
