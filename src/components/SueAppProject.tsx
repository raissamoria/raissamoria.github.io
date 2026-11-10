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
  X
} from 'lucide-react';
import { Language } from '../types';
import { RetroProjectLayout, RetroProjectTab } from './retro/RetroProjectLayout';

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
    titlePt: '08. Design System & Guia de Estilo Visual',
    titleEn: '08. Design System & Visual Styleguide',
    categoryPt: 'SISTEMA DE DESIGN & TOKENS',
    categoryEn: 'DESIGN TOKENS & UI SYSTEM',
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

  // Carousel autoplay logic (10s)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Video autoplay check on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay with muted is allowed by browsers
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
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
  // TAB 1: OVERVIEW.TXT
  // =========================================================================
  const OverviewTab = (
    <div className="flex flex-col gap-8 text-[#1A1A1A]">
      <div className="bg-[#FFFFEE] border border-[#d0c8a8] p-4 sm:p-6 shadow-sm rounded-[2px]">
        <div className="flex items-center gap-2 border-b border-[#e0d8b8] pb-2 mb-4 font-mono text-xs text-neutral-600">
          <span className="font-bold text-[#000080]">C:\DOCUMENTS\PROJECT_SUE\OVERVIEW.TXT</span>
          <span className="text-neutral-400">|</span>
          <span>9 SLIDES • APRESENTAÇÃO COMPLETA</span>
        </div>

        <div className="flex flex-col gap-3 font-sans">
          <span className="font-mono text-xs font-bold text-[#000080] uppercase tracking-wider">
            {isPt ? 'VISÃO GERAL DO PROJETO' : 'PROJECT OVERVIEW'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#073859]">
            {isPt ? 'SUE — Serviços de União a Emigração' : 'SUE — Migration Facility Mobile App'}
          </h2>
          <p className="text-base sm:text-lg text-neutral-800 leading-relaxed">
            {isPt 
              ? 'Uma aplicação móvel concebida para simplificar a jornada de regularização de imigrantes e emigrantes, transformando processos burocráticos complexos numa experiência transparente, intuitiva e humana.'
              : 'A mobile application designed to simplify the migration and residence regularisation journey, transforming opaque bureaucratic hurdles into a transparent, empathetic digital experience.'}
          </p>
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
            {isPt
              ? 'O projeto aborda as principais dificuldades sentidas pela comunidade migrante: terminologia jurídica impenetrável, falta de acompanhamento em tempo real do Título de Residência e ausência de apoio humanizado durante a transição.'
              : 'The project addresses the core friction points encountered by international migrants: impenetrable legal jargon, total absence of real-time permit status tracking, and lack of guided human support.'}
          </p>
        </div>
      </div>

      {/* Quick Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <div className="bg-white border-2 border-[#808080] p-4 flex flex-col gap-1">
          <span className="text-neutral-500 uppercase text-[10px]">PLATAFORMAS</span>
          <span className="text-base font-bold text-[#073859]">iOS & Android</span>
          <span className="text-neutral-600 font-sans text-xs">App Store / Google Play</span>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4 flex flex-col gap-1">
          <span className="text-neutral-500 uppercase text-[10px]">O MEU PAPEL</span>
          <span className="text-base font-bold text-[#000080]">UX/UI Designer</span>
          <span className="text-neutral-600 font-sans text-xs">Research, Wireframing & UI</span>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4 flex flex-col gap-1">
          <span className="text-neutral-500 uppercase text-[10px]">FERRAMENTAS</span>
          <span className="text-base font-bold text-emerald-800">Figma, Miro, Forms</span>
          <span className="text-neutral-600 font-sans text-xs">Design System & Usability Tests</span>
        </div>
      </div>

      {/* Cover Slide Preview Card */}
      <div className="flex flex-col gap-2">
        <div 
          onClick={() => setExpandedImage(slide1)}
          className="group cursor-pointer bg-neutral-950 border-2 border-[#808080] overflow-hidden rounded-[2px] relative aspect-[16/9] shadow-md"
        >
          <img 
            src={slide1} 
            alt="SUE Cover Slide" 
            className="w-full h-full object-cover transition-transform group-hover:scale-[1.01]"
          />
          <div className="absolute bottom-3 right-3 bg-black/80 text-white font-mono text-xs px-3 py-1.5 flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>{isPt ? 'Ampliar Capa' : 'Expand Cover'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 2: RESEARCH.EXE
  // =========================================================================
  const ResearchTab = (
    <div className="flex flex-col gap-8 text-[#1A1A1A]">
      <div className="bg-[#F0F4F8] border border-[#B0C4DE] p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-[#000080] font-bold mb-2">
          <span>[ 🔍 DESCOBERTA COM UTILIZADORES: 12 ENTREVISTAS ]</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#073859] mb-3">
          {isPt ? 'Pesquisa Empática com Comunidades Migrantes' : 'Empathetic Research with Migrant Communities'}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
          {isPt 
            ? 'Foram realizadas 12 entrevistas aprofundadas com cidadãos estrangeiros em processo de legalização em Portugal, complementadas por um inquérito quantitativo através do Google Forms.'
            : 'We conducted 12 in-depth interviews with foreign nationals undergoing legalisation procedures in Portugal, backed by a quantitative Google Forms survey.'}
        </p>
      </div>

      {/* Research Slides Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => setExpandedImage(slide3)}
          className="group cursor-pointer bg-neutral-900 border-2 border-[#808080] overflow-hidden rounded-[2px] relative aspect-[4/3]"
        >
          <img 
            src={slide3} 
            alt="Research Survey Slide" 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[10px] px-2 py-1 flex items-center gap-1.5">
            <Maximize2 className="w-3 h-3 text-[#3B82F6]" />
            <span>{isPt ? 'Slide 03: Pesquisa Quantitativa' : 'Slide 03: Survey Insights'}</span>
          </div>
        </div>

        <div 
          onClick={() => setExpandedImage(slide4)}
          className="group cursor-pointer bg-neutral-900 border-2 border-[#808080] overflow-hidden rounded-[2px] relative aspect-[4/3]"
        >
          <img 
            src={slide4} 
            alt="Persona Slide" 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[10px] px-2 py-1 flex items-center gap-1.5">
            <Maximize2 className="w-3 h-3 text-[#3B82F6]" />
            <span>{isPt ? 'Slide 04: Persona Laura Mendes' : 'Slide 04: Persona Profile'}</span>
          </div>
        </div>
      </div>

      {/* Key Pain Points Mapped */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border-2 border-[#808080] p-4">
          <div className="font-mono text-xs font-bold text-red-700 mb-1">DOR 01</div>
          <h4 className="font-bold text-sm text-[#073859] mb-1">
            {isPt ? 'Incerteza & Ansiedade' : 'Uncertainty & Anxiety'}
          </h4>
          <p className="text-xs text-neutral-600 font-sans">
            {isPt ? 'Meses de espera sem saber em que etapa o processo se encontra ou se faltam documentos.' : 'Months in legal limbo with zero updates or document verification feedback.'}
          </p>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4">
          <div className="font-mono text-xs font-bold text-amber-700 mb-1">DOR 02</div>
          <h4 className="font-bold text-sm text-[#073859] mb-1">
            {isPt ? 'Linguagem Complexa' : 'Impenetrable Jargon'}
          </h4>
          <p className="text-xs text-neutral-600 font-sans">
            {isPt ? 'Terminologia jurídica governamental inacessível para quem não domina o português jurídico.' : 'Complex bureaucratic legal terms that overwhelm non-native speakers.'}
          </p>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4">
          <div className="font-mono text-xs font-bold text-blue-700 mb-1">DOR 03</div>
          <h4 className="font-bold text-sm text-[#073859] mb-1">
            {isPt ? 'Agendamentos Falhados' : 'Missed Appointments'}
          </h4>
          <p className="text-xs text-neutral-600 font-sans">
            {isPt ? 'Dificuldade em marcar vagas consulares e falta de lembretes automáticos sobre renovações.' : 'Difficulty securing consulate slots and zero proactive renewal notifications.'}
          </p>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 3: DESIGN_PROCESS.FOLDER
  // =========================================================================
  const DesignProcessTab = (
    <div className="flex flex-col gap-8 text-[#1A1A1A]">
      <div className="bg-[#F0F4F8] border border-[#B0C4DE] p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-[#000080] font-bold mb-2">
          <span>[ 📁 FLUXOS, TAXONOMIA E DESIGN TOKENS ]</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#073859] mb-3">
          {isPt ? 'Arquitetura de Informação & Design System' : 'Information Architecture & Design System'}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
          {isPt 
            ? 'Estruturação da taxonomia da aplicação em 4 áreas principais: Dashboard, Processos, Agendamentos e Suporte, com base num Design System focado em acessibilidade e confiança.'
            : 'Structuring the app into 4 core sections: Dashboard, Processes, Appointments, and Support, governed by an accessible, trust-inspiring Design System.'}
        </p>
      </div>

      {/* Process Slides: Empathy Map, Architecture, Wireframes & Styleguide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => setExpandedImage(slide5)}
          className="group cursor-pointer bg-neutral-900 border-2 border-[#808080] overflow-hidden rounded-[2px] relative aspect-[4/3]"
        >
          <img 
            src={slide5} 
            alt="Empathy Map Slide" 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[10px] px-2 py-1 flex items-center gap-1.5">
            <Maximize2 className="w-3 h-3 text-[#3B82F6]" />
            <span>{isPt ? 'Slide 05: Mapa de Empatia' : 'Slide 05: Empathy Map'}</span>
          </div>
        </div>

        <div 
          onClick={() => setExpandedImage(slide6)}
          className="group cursor-pointer bg-neutral-900 border-2 border-[#808080] overflow-hidden rounded-[2px] relative aspect-[4/3]"
        >
          <img 
            src={slide6} 
            alt="Information Architecture Slide" 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[10px] px-2 py-1 flex items-center gap-1.5">
            <Maximize2 className="w-3 h-3 text-[#3B82F6]" />
            <span>{isPt ? 'Slide 06: Arquitetura' : 'Slide 06: Architecture'}</span>
          </div>
        </div>

        <div 
          onClick={() => setExpandedImage(slide7)}
          className="group cursor-pointer bg-neutral-900 border-2 border-[#808080] overflow-hidden rounded-[2px] relative aspect-[4/3]"
        >
          <img 
            src={slide7} 
            alt="Wireframes Slide" 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[10px] px-2 py-1 flex items-center gap-1.5">
            <Maximize2 className="w-3 h-3 text-[#3B82F6]" />
            <span>{isPt ? 'Slide 07: Wireflow' : 'Slide 07: Wireflow'}</span>
          </div>
        </div>

        <div 
          onClick={() => setExpandedImage(slide8)}
          className="group cursor-pointer bg-neutral-900 border-2 border-[#808080] overflow-hidden rounded-[2px] relative aspect-[4/3]"
        >
          <img 
            src={slide8} 
            alt="Design System Slide" 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[10px] px-2 py-1 flex items-center gap-1.5">
            <Maximize2 className="w-3 h-3 text-[#3B82F6]" />
            <span>{isPt ? 'Slide 08: Design System' : 'Slide 08: Design System'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 4: PROTOTYPE.FIG (CAROUSEL OF 9 SLIDES)
  // =========================================================================
  const PrototypeTab = (
    <div className="flex flex-col gap-6 text-[#1A1A1A]">
      <div className="bg-[#F0F4F8] border border-[#B0C4DE] p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between font-mono text-xs text-[#000080] font-bold mb-2">
          <span>[ 📊 CARROSSEL DA APRESENTAÇÃO • 9 SLIDES ]</span>
          <span className="text-neutral-500">{currentSlideIndex + 1} de {SLIDES.length}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-[#073859] mb-1">
          {isPt ? currentSlide.titlePt : currentSlide.titleEn}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-700 font-sans">
          {isPt ? currentSlide.descPt : currentSlide.descEn}
        </p>
      </div>

      {/* Main Slide Display Frame */}
      <div className="relative bg-neutral-950 border-2 border-[#808080] rounded-[2px] overflow-hidden shadow-md">
        <div 
          onClick={() => setExpandedImage(currentSlide.image)}
          className="relative aspect-[16/10] w-full flex items-center justify-center cursor-pointer group"
        >
          <img 
            src={currentSlide.image} 
            alt={currentSlide.titlePt}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white font-mono text-xs px-3 py-1.5 rounded flex items-center gap-2">
              <Maximize2 className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>{isPt ? 'Clique para ampliar slide' : 'Click to zoom slide'}</span>
            </span>
          </div>
        </div>

        {/* Carousel Retro Controls Toolbar */}
        <div className="bg-[#c0c0c0] p-2 border-t-2 border-white flex flex-wrap items-center justify-between gap-2 font-mono text-xs select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevSlide}
              className="px-3 py-1 bg-[#d4d0c8] text-black border-t border-l border-white border-r border-b border-[#404040] hover:bg-white active:border-t-[#404040] active:border-l-[#404040] flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{isPt ? 'Anterior' : 'Prev'}</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1 bg-[#d4d0c8] text-black border-t border-l border-white border-r border-b border-[#404040] hover:bg-white active:border-t-[#404040] active:border-l-[#404040] flex items-center gap-1 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-700" /> : <Play className="w-3.5 h-3.5 text-emerald-700" />}
              <span>{isPlaying ? 'Pausar (10s)' : 'Reproduzir'}</span>
            </button>

            <button
              onClick={goToNextSlide}
              className="px-3 py-1 bg-[#d4d0c8] text-black border-t border-l border-white border-r border-b border-[#404040] hover:bg-white active:border-t-[#404040] active:border-l-[#404040] flex items-center gap-1 cursor-pointer"
            >
              <span>{isPt ? 'Próximo' : 'Next'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentSlideIndex(i);
                  setIsPlaying(false);
                }}
                className={`w-6 h-6 font-mono text-[10px] font-bold border flex items-center justify-center cursor-pointer ${
                  currentSlideIndex === i
                    ? 'bg-[#000080] text-white border-white'
                    : 'bg-[#d4d0c8] text-neutral-800 border-[#808080] hover:bg-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 5: FINAL_RESULT.PNG (AUTOPLAY PROMO VIDEO & FINAL UI)
  // =========================================================================
  const FinalResultTab = (
    <div className="flex flex-col gap-8 text-[#1A1A1A]">
      <div className="bg-[#F0F4F8] border border-[#B0C4DE] p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-[#000080] font-bold mb-2">
          <span>[ 🎬 APRESENTAÇÃO EM VÍDEO & TESTES DE USABILIDADE ]</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#073859] mb-2">
          {isPt ? 'Vídeo da Aplicação e Testes de Usabilidade' : 'Video about the app and usability test presentation'}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
          {isPt 
            ? 'Demonstração audiovisual interativa da aplicação SUE, protótipo funcional e resultados dos testes de usabilidade com os utilizadores.'
            : 'Interactive audiovisual walkthrough of the SUE application, functional prototype, and user usability testing presentation.'}
        </p>
      </div>

      {/* AUTOPLAY PROMO VIDEO PLAYER */}
      <div className="bg-[#c0c0c0] border-2 border-white border-r-[#404040] border-b-[#404040] p-1 sm:p-2 shadow-lg">
        {/* Video Title Bar */}
        <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between font-mono text-xs mb-1">
          <span className="font-bold truncate">▶ Windows Media Player — SUE_PROMO.MP4</span>
          <span className="text-[10px] text-white/80">1080p • 60 FPS</span>
        </div>

        {/* Video Container */}
        <div className="relative bg-black rounded-[2px] overflow-hidden aspect-video">
          <video
            ref={videoRef}
            src="/project-sue/sue-promo.mp4"
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            className="w-full h-full object-contain"
          />

          {/* Video Control Overlay */}
          <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-sm p-2 flex items-center justify-between font-mono text-xs text-white">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleVideoPlay}
                className="hover:text-blue-400 cursor-pointer flex items-center gap-1"
              >
                {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isVideoPlaying ? 'Pausar' : 'Play'}</span>
              </button>

              <button
                onClick={toggleVideoMute}
                className="hover:text-blue-400 cursor-pointer flex items-center gap-1"
              >
                {isVideoMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                <span>{isVideoMuted ? 'Ativar Som' : 'Mudo'}</span>
              </button>

              <button
                onClick={restartVideo}
                className="hover:text-blue-400 cursor-pointer flex items-center gap-1 hidden sm:flex"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            </div>

            <span className="text-[11px] text-neutral-400 hidden sm:inline">
              {isPt ? 'Início automático ativo' : 'Autoplay active'}
            </span>
          </div>
        </div>
      </div>

      {/* Slide 9: Final UI Screen */}
      <div className="flex flex-col gap-2">
        <div 
          onClick={() => setExpandedImage(slide9)}
          className="group cursor-pointer bg-neutral-950 border-2 border-[#808080] overflow-hidden rounded-[2px] relative aspect-[16/9] shadow-md"
        >
          <img 
            src={slide9} 
            alt="Final UI Screens" 
            className="w-full h-full object-cover transition-transform group-hover:scale-[1.01]"
          />
          <div className="absolute bottom-3 right-3 bg-black/80 text-white font-mono text-xs px-3 py-1.5 flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>{isPt ? 'Slide 09: Telas Finais de Alta Fidelidade' : 'Slide 09: High-Fidelity UI Screens'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 6: LEARNINGS.TXT
  // =========================================================================
  const LearningsTab = (
    <div className="flex flex-col gap-8 text-[#1A1A1A]">
      <div className="bg-[#FFFFEE] border border-[#d0c8a8] p-4 sm:p-6 shadow-sm rounded-[2px]">
        <div className="flex items-center gap-2 border-b border-[#e0d8b8] pb-2 mb-4 font-mono text-xs text-neutral-600">
          <span className="font-bold text-[#000080]">C:\DOCUMENTS\PROJECT_SUE\LEARNINGS.TXT</span>
          <span className="text-neutral-400">|</span>
          <span>AUTORA: RAÍSSA MORIÁ</span>
        </div>

        <div className="flex flex-col gap-4 font-sans">
          <h3 className="text-xl sm:text-2xl font-bold text-[#073859]">
            {isPt ? 'Aprendizagens dos Testes de Usabilidade' : 'Usability Testing & Empathy Learnings'}
          </h3>

          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
            {isPt 
              ? 'Projetar para pessoas em situação de vulnerabilidade e transição geográfica exige mais do que boas regras de usabilidade: exige profunda empatia emocional. Os testes revelaram que o maior obstáculo não era a navegação em si, mas a ansiedade gerada pela falta de certeza quanto aos prazos legais.'
              : 'Designing for individuals navigating international relocation requires more than standard UX conventions: it demands acute emotional empathy. Usability tests proved that the greatest hurdle was not interface navigation, but chronic anxiety born from zero legal status clarity.'}
          </p>

          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
            {isPt 
              ? 'A introdução de micro-cópias calorosas em português claro, a substituição de termos técnicos por resumos práticos e a linha temporal passo a passo reduziram o tempo de execução de tarefas em 64% durante as sessões de teste.'
              : 'Introducing warm microcopy in plain Portuguese, replacing legal jargon with actionable step cards, and anchoring the timeline reduced task completion duration by 64% during moderated testing sessions.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white border-2 border-[#808080] p-4 flex flex-col gap-2">
          <span className="font-mono text-xs font-bold text-[#000080]">
            {isPt ? '01. Clareza Linguística' : '01. Linguistic Clarity'}
          </span>
          <p className="text-xs text-neutral-700 leading-relaxed font-sans">
            {isPt ? 'Simplificar termos jurídicos complexos sem perder o rigor legal foi o maior desafio de UX Writing.' : 'Translating complex administrative jargon into plain language without losing legal precision.'}
          </p>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4 flex flex-col gap-2">
          <span className="font-mono text-xs font-bold text-emerald-800">
            {isPt ? '02. Feedback Constante' : '02. Constant Status Feedback'}
          </span>
          <p className="text-xs text-neutral-700 leading-relaxed font-sans">
            {isPt ? 'Uma simples barra de progresso visual acalma a ansiedade do utilizador mais do que qualquer outro elemento.' : 'A clear visual timeline relieves user anxiety more effectively than any other interface element.'}
          </p>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4 flex flex-col gap-2">
          <span className="font-mono text-xs font-bold text-purple-800">
            {isPt ? '03. Impacto Social do Design' : '03. Social Impact'}
          </span>
          <p className="text-xs text-neutral-700 leading-relaxed font-sans">
            {isPt ? 'O design tem o poder real de devolver dignidade e segurança a quem recomeça a sua vida num novo país.' : 'Design possesses the tangible power to restore dignity and confidence to those rebuilding lives abroad.'}
          </p>
        </div>
      </div>
    </div>
  );

  const retroTabs: RetroProjectTab[] = [
    {
      id: 'overview',
      labelPt: '01 — Overview.txt',
      labelEn: '01 — Overview.txt',
      iconName: 'overview',
      badge: 'TXT',
      content: OverviewTab,
    },
    {
      id: 'research',
      labelPt: '02 — Research.exe',
      labelEn: '02 — Research.exe',
      iconName: 'research',
      badge: 'EXE',
      content: ResearchTab,
    },
    {
      id: 'process',
      labelPt: '03 — Design_Process.folder',
      labelEn: '03 — Design_Process.folder',
      iconName: 'process',
      badge: 'DIR',
      content: DesignProcessTab,
    },
    {
      id: 'prototype',
      labelPt: '04 — Prototype.fig',
      labelEn: '04 — Prototype.fig',
      iconName: 'prototype',
      badge: 'FIG',
      content: PrototypeTab,
    },
    {
      id: 'result',
      labelPt: '05 — Final_Result.png',
      labelEn: '05 — Final_Result.png',
      iconName: 'result',
      badge: 'MP4',
      content: FinalResultTab,
    },
    {
      id: 'learnings',
      labelPt: '06 — Learnings.txt',
      labelEn: '06 — Learnings.txt',
      iconName: 'learnings',
      badge: 'TXT',
      content: LearningsTab,
    },
  ];

  return (
    <>
      <RetroProjectLayout
        projectId="sue-app"
        projectNumber="02"
        projectExeName="Project_SUE_App.exe"
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
        tabs={retroTabs}
      />

      {/* Expanded Modal */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-5xl w-full bg-[#c0c0c0] border-2 border-white p-1 shadow-2xl">
              <div className="bg-[#000080] text-white p-1 px-2 flex justify-between items-center font-mono text-xs mb-1">
                <span>[ VISUALIZADOR DE IMAGEM 98 ]</span>
                <button 
                  onClick={() => setExpandedImage(null)}
                  className="w-4 h-4 bg-[#c0c0c0] text-black border border-white flex items-center justify-center text-[10px] font-bold"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <img 
                src={expandedImage} 
                alt="Expanded View" 
                className="w-full max-h-[80vh] object-contain bg-black"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
