import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Compass, 
  CalendarCheck,
  Heart,
  X,
  ArrowUpRight
} from 'lucide-react';
import { Language } from '../types';
import { ModernProjectLayout, ProjectTabItem } from './ModernProjectLayout';
import { OpticalGlassButton, OpticalGlassPill } from './OpticalGlass';

// Authentic Images for Nipon Spa sourced directly from https://www.niponspa.pt
// @ts-ignore
import heroHouseImage from '../assets/images/nipon_real_house.png';
// @ts-ignore
import realRoomImage from '../assets/images/nipon_real_room.jpeg';
// @ts-ignore
import realLogoImage from '../assets/images/nipon_real_logo.jpeg';

interface NiponSpaProjectProps {
  language: Language;
  onBack: () => void;
  onNextProject?: () => void;
  onPrevProject?: () => void;
}

export const NiponSpaProject: React.FC<NiponSpaProjectProps> = ({
  language,
  onBack,
  onNextProject = () => {},
  onPrevProject = () => {},
}) => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const isPt = language === 'pt';

  // =========================================================================
  // TAB 1: VISÃO GERAL / OVERVIEW
  // =========================================================================
  const OverviewTab = (
    <div className="flex flex-col gap-8">
      {/* Editorial Overview Card */}
      <div className="optical-glass p-6 sm:p-10 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>01 / {isPt ? 'VISÃO GERAL DO PROJETO' : 'PROJECT OVERVIEW'}</span>
          </div>
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
            ESTUDO DE CASO
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
            Nipon Spa — Japanese Wellness Digital Experience
          </h2>
          <p className="text-base sm:text-lg text-neutral-200 font-light leading-relaxed">
            {isPt 
              ? 'O Nipon Spa é um refúgio exclusivo de bem-estar e rituais japoneses tradicionais em Portugal. O desafio de design foi conceber uma presença digital que refletisse a mesma serenidade, elegância e atenção meticulosa aos detalhes que caracterizam o espaço físico.'
              : 'Nipon Spa is an exclusive sanctuary of traditional Japanese wellness and holistic rituals in Portugal. The design challenge was to craft a digital presence reflecting the exact serenity, quiet elegance, and meticulous attention to detail experienced within the physical space.'}
          </p>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            {isPt
              ? 'Desenvolvemos uma experiência digital imersiva com tipografia contemplativa, arquitetura de informação focada em rituais e um fluxo de marcação claro e sereno, integrando fotografia autêntica das salas e tratamentos.'
              : 'We developed an immersive digital experience characterized by contemplative typography, ritual-oriented information architecture, and a fluid booking journey integrating authentic photography of rooms and treatments.'}
          </p>
        </div>
      </div>

      {/* Live Website Optical Glass Banner */}
      <div className="optical-glass p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-white/15">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isPt ? 'PRODUTO REAL EM PRODUÇÃO' : 'LIVE PRODUCTION PRODUCT'}</span>
          </span>
          <span className="text-white text-lg font-bold font-mono">niponspa.pt</span>
          <span className="text-neutral-400 text-xs">
            {isPt ? 'Disponível online no domínio oficial do spa com fluxo de agendamento em tempo real.' : 'Available online at the official spa domain with real booking and treatment discovery.'}
          </span>
        </div>
        <OpticalGlassButton
          href="https://www.niponspa.pt/"
          target="_blank"
          rel="noopener noreferrer"
          className="!px-6 !py-3 shrink-0"
        >
          <span>{isPt ? 'Abrir niponspa.pt' : 'Visit niponspa.pt'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </OpticalGlassButton>
      </div>

      {/* Project Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">CLIENTE & LOCALIZAÇÃO</span>
          <span className="text-lg font-bold text-white">Nipon Spa</span>
          <span className="text-neutral-400 text-xs font-light">Portugal • Bem-Estar & Rituais Japoneses</span>
        </div>

        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">O MEU PAPEL</span>
          <span className="text-lg font-bold text-white">UX/UI Designer</span>
          <span className="text-neutral-400 text-xs font-light">Direção de Arte, Prototipagem & Interface</span>
        </div>

        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">DISCIPLINA</span>
          <span className="text-lg font-bold text-white">Hospitality & Luxury</span>
          <span className="text-neutral-400 text-xs font-light">Web Experience & Booking Flow</span>
        </div>
      </div>

      {/* Cover Image in Dark Frame */}
      <div className="flex flex-col gap-2">
        <div 
          onClick={() => setExpandedImage(heroHouseImage)}
          className="group cursor-pointer bg-neutral-950 border border-neutral-800 overflow-hidden rounded-2xl relative aspect-[16/9] shadow-2xl transition-all duration-300 hover:border-neutral-600"
        >
          <img 
            src={heroHouseImage} 
            alt="Nipon Spa House" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 right-4 optical-glass px-3 py-1.5 rounded-full text-white font-mono text-xs flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5 text-white" />
            <span>{isPt ? 'Expandir Fotografia Real' : 'View Full Image'}</span>
          </div>
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] text-neutral-500 px-2">
          <span>FIGURA 1.1 — Edifício Real do Nipon Spa em Portugal (niponspa.pt)</span>
          <span className="text-emerald-400 font-bold uppercase tracking-wider">Produção Real</span>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 2: RESEARCH & FILOSOFIA
  // =========================================================================
  const ResearchTab = (
    <div className="flex flex-col gap-8">
      <div className="optical-glass p-6 sm:p-10 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 border-b border-white/10 pb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>02 / {isPt ? 'PESQUISA DE HOSPITALIDADE JAPONESA' : 'JAPANESE HOSPITALITY RESEARCH'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          {isPt ? 'Filosofia de Bem-Estar & Análise do Utilizador' : 'Japanese Wellness Philosophy & User Behaviour'}
        </h3>
        <p className="text-base text-neutral-300 leading-relaxed font-light">
          {isPt 
            ? 'A pesquisa partiu da necessidade de traduzir princípios orientais de hospitalidade (Omotenashi) e conceitos de espaço (Ma) para o contexto de um cliente que procura alívio do ritmo frenético do quotidiano ocidental.'
            : 'Our research focused on translating traditional Japanese hospitality principles (Omotenashi) and spatial rhythm (Ma) for modern clients seeking refuge from frantic urban schedules.'}
        </p>
      </div>

      {/* 3 Core Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-3">
          <span className="font-mono text-xs font-bold text-white tracking-widest">01 • DESACELERAÇÃO</span>
          <h4 className="font-bold text-base text-white">
            {isPt ? 'Pausa Visual Imediata' : 'Immediate Visual Calming'}
          </h4>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            {isPt 
              ? 'Ao entrar no site, o utilizador deve sentir imediatamente o ritmo desacelerar através de espaço negativo e contrastes suaves.'
              : 'The digital touchpoint must immediately decelerate visitor pulse through generous negative space and soothing tones.'}
          </p>
        </div>

        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-3">
          <span className="font-mono text-xs font-bold text-emerald-400 tracking-widest">02 • AUTENTICIDADE</span>
          <h4 className="font-bold text-base text-white">
            {isPt ? 'Fotografia Real do Espaço' : 'Real Space Photography'}
          </h4>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            {isPt 
              ? 'Evitar bancos de imagens genéricos. Mostrar as salas reais, tatamis de bambu e iluminação quente de lanternas.'
              : 'Zero generic stock imagery. Showcase authentic treatment suites, bamboo elements, and warm lantern lighting.'}
          </p>
        </div>

        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-3">
          <span className="font-mono text-xs font-bold text-sky-400 tracking-widest">03 • MARCAÇÃO TRANQUILA</span>
          <h4 className="font-bold text-base text-white">
            {isPt ? 'Zero Pressão de Venda' : 'Non-Aggressive Booking'}
          </h4>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            {isPt 
              ? 'Substituir temporizadores e botões agressivos por convites delicados à reserva e contacto direto.'
              : 'Replace intrusive popups and aggressive urgency timers with gentle, dignified booking invitations.'}
          </p>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 3: DESIGN PROCESS & ARQUITETURA
  // =========================================================================
  const DesignProcessTab = (
    <div className="flex flex-col gap-8">
      <div className="optical-glass p-6 sm:p-10 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 border-b border-white/10 pb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>03 / {isPt ? 'PRINCÍPIOS DE DESIGN & ARQUITETURA' : 'DESIGN PRINCIPLES & ARCHITECTURE'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          {isPt ? 'Os Três Pilares da Experiência Visual' : 'The Three Pillars of the Visual Experience'}
        </h3>
        <p className="text-base text-neutral-300 leading-relaxed font-light">
          {isPt 
            ? 'A linguagem visual foi desenhada para estabelecer uma conexão direta com os sentidos do visitante, combinando tradição japonesa com design web de luxo contemporâneo.'
            : 'The visual language connects visitors directly with sensory tranquility, harmonizing Japanese tradition with modern luxury digital standards.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => setExpandedImage(realRoomImage)}
          className="group cursor-pointer bg-neutral-950 border border-neutral-800 overflow-hidden rounded-2xl relative aspect-[4/3] shadow-xl hover:border-neutral-600 transition-all"
        >
          <img 
            src={realRoomImage} 
            alt="Nipon Spa Treatment Room" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              {isPt ? 'Sala de Tratamento Real' : 'Real Treatment Suite'}
            </span>
            <div className="optical-glass p-2 rounded-full text-white">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => setExpandedImage(realLogoImage)}
          className="group cursor-pointer bg-neutral-950 border border-neutral-800 overflow-hidden rounded-2xl relative aspect-[4/3] shadow-xl hover:border-neutral-600 transition-all"
        >
          <img 
            src={realLogoImage} 
            alt="Nipon Spa Logo & Identity" 
            className="w-full h-full object-contain p-8 bg-[#0a0a0a] transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              {isPt ? 'Identidade & Logótipo Autêntico' : 'Authentic Spa Identity'}
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
  // TAB 4: RITUAIS & CATÁLOGO
  // =========================================================================
  const PrototypeTab = (
    <div className="flex flex-col gap-8">
      <div className="optical-glass p-6 sm:p-10 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 border-b border-white/10 pb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>04 / {isPt ? 'ARQUITETURA DE RITUAIS & CATÁLOGO' : 'RITUAL ARCHITECTURE & CATALOGUE'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          {isPt ? 'Catálogo de Rituais & Componentes Interativos' : 'Ritual Catalogue & Component Hierarchy'}
        </h3>
        <p className="text-base text-neutral-300 leading-relaxed font-light">
          {isPt 
            ? 'Em vez de uma lista estática de preços, os tratamentos foram organizados por sensações corporais e objetivos de bem-estar.'
            : 'Rather than a stark price list, wellness treatments were structured around sensory goals and holistic body benefits.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-3">
          <span className="font-mono text-xs font-bold text-white tracking-widest">RITUAL 01</span>
          <h4 className="font-bold text-base text-white">
            {isPt ? 'Massagem Tradicional Shiatsu' : 'Traditional Shiatsu Massage'}
          </h4>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            {isPt ? 'Pressão digital sobre meridianos para restaurar a energia vital e aliviar tensões musculares profundas.' : 'Acupressure along meridians to restore natural energy flow and release deep tension.'}
          </p>
        </div>

        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-3">
          <span className="font-mono text-xs font-bold text-emerald-400 tracking-widest">RITUAL 02</span>
          <h4 className="font-bold text-base text-white">
            {isPt ? 'Banho Japonês de Ofurô' : 'Japanese Ofuro Soak'}
          </h4>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            {isPt ? 'Imersão em água aromática enriquecida com ervas e sais minerais em banheira tradicional de cedro.' : 'Immersion in cedar tubs scented with authentic herbs and therapeutic minerals.'}
          </p>
        </div>

        <div className="optical-glass p-6 rounded-2xl flex flex-col gap-3">
          <span className="font-mono text-xs font-bold text-sky-400 tracking-widest">RITUAL 03</span>
          <h4 className="font-bold text-base text-white">
            {isPt ? 'Ritual Exclusivo a Dois' : 'Signature Couples Ritual'}
          </h4>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            {isPt ? 'Experiência combinada de esfoliação suave, banho aromático e massagem relaxante com óleos quentes.' : 'Combined gentle exfoliation, aromatic bath, and relaxing warm oil massage for two.'}
          </p>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 5: RESULTADO & PRODUÇÃO
  // =========================================================================
  const FinalResultTab = (
    <div className="flex flex-col gap-8">
      <div className="optical-glass p-6 sm:p-10 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 border-b border-white/10 pb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>05 / {isPt ? 'O RESULTADO FINAL EM PRODUÇÃO' : 'FINAL RESULT IN PRODUCTION'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          {isPt ? 'A Experiência Nipon Spa Online' : 'The Nipon Spa Online Presence'}
        </h3>
        <p className="text-base text-neutral-300 leading-relaxed font-light">
          {isPt 
            ? 'O website está em funcionamento ativo, servindo clientes em Portugal e visitantes internacionais que procuram rituais de bem-estar autênticos.'
            : 'The live website is in active production, welcoming local and international visitors seeking authentic Japanese wellbeing rituals.'}
        </p>
      </div>

      <div className="optical-glass p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">
            DOMÍNIO OFICIAL: HTTPS://WWW.NIPONSPA.PT
          </span>
          <p className="text-sm text-neutral-300 font-light">
            {isPt 
              ? 'Visite o produto real em funcionamento para experienciar a navegação, imagens e catálogo em tempo real.'
              : 'Visit the live production product to explore real interactions, visuals, and booking flows.'}
          </p>
        </div>

        <OpticalGlassButton
          href="https://www.niponspa.pt/"
          target="_blank"
          rel="noopener noreferrer"
          className="!px-6 !py-3 shrink-0"
        >
          <span>{isPt ? 'Abrir niponspa.pt' : 'Open niponspa.pt'}</span>
          <ExternalLink className="w-4 h-4" />
        </OpticalGlassButton>
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
          <span>06 / {isPt ? 'APRENDIZAGENS & IMPACTO' : 'TAKEAWAYS & IMPACT'}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          {isPt ? 'Serenidade Digital e Hospitalidade' : 'Digital Serenity & Hospitality'}
        </h3>

        <p className="text-base sm:text-lg text-neutral-200 font-light leading-relaxed">
          {isPt 
            ? 'Projetar para o setor de bem-estar de luxo ensinou-me que muitas vezes o design mais poderoso é o que remove ruído em vez de adicionar ornamentação. Cada espaço em branco cumpre uma função emocional: dar espaço para o visitante respirar.'
            : 'Designing for luxury wellness underscored that the most powerful design often eliminates noise rather than adding decoration. Every pocket of white space serves an emotional role: giving the visitor breathing room.'}
        </p>

        <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
          {isPt 
            ? 'A harmonia entre fotografia autêntica e micro-interações calmas provou que um website pode ser simultaneamente comercialmente eficaz e visualmente repousante.'
            : 'The harmony between authentic photography and calm micro-interactions proved that an interface can achieve high business conversion while maintaining supreme aesthetic composure.'}
        </p>
      </div>
    </div>
  );

  const modernTabs: ProjectTabItem[] = [
    {
      id: 'overview',
      labelPt: 'Visão Geral',
      labelEn: 'Overview',
      badge: 'PROD',
      content: OverviewTab,
    },
    {
      id: 'research',
      labelPt: 'Pesquisa UX',
      labelEn: 'Research',
      badge: 'DATA',
      content: ResearchTab,
    },
    {
      id: 'process',
      labelPt: 'Direção de Arte',
      labelEn: 'Art Direction',
      badge: 'UI',
      content: DesignProcessTab,
    },
    {
      id: 'prototype',
      labelPt: 'Rituais & Fluxos',
      labelEn: 'Rituals & Flows',
      badge: 'FLOW',
      content: PrototypeTab,
    },
    {
      id: 'result',
      labelPt: 'Produção Online',
      labelEn: 'Live Production',
      badge: 'WEB',
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
        projectId="nipon-spa"
        projectNumber="01"
        title="Nipon Spa"
        subtitle={isPt ? "Experiência Digital de Bem-Estar Japonês em Portugal" : "Japanese Wellness • Digital Experience"}
        category={isPt ? "BEM-ESTAR & LUXO DIGITAL" : "WELLNESS & DIGITAL LUXURY"}
        year="2026"
        roles={["UX/UI Design", "Visual Identity", "Design System", "Live Production"]}
        liveUrl="https://www.niponspa.pt/"
        language={language}
        onBack={onBack}
        onNextProject={onNextProject}
        onPrevProject={onPrevProject}
        prevProjectName={isPt ? "Plataforma de Helpdesk" : "Helpdesk Platform"}
        nextProjectName="SUE Mobile App"
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
                  FOTOGRAFIA REAL • NIPON SPA
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
