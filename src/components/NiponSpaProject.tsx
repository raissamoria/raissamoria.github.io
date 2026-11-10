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
  X
} from 'lucide-react';
import { Language } from '../types';
import { RetroProjectLayout, RetroProjectTab } from './retro/RetroProjectLayout';

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
  // TAB 1: OVERVIEW.TXT
  // =========================================================================
  const OverviewTab = (
    <div className="flex flex-col gap-8 text-[#1A1A1A]">
      <div className="bg-[#FFFFEE] border border-[#d0c8a8] p-4 sm:p-6 shadow-sm rounded-[2px]">
        <div className="flex items-center gap-2 border-b border-[#e0d8b8] pb-2 mb-4 font-mono text-xs text-neutral-600">
          <span className="font-bold text-[#000080]">C:\DOCUMENTS\NIPON_SPA\OVERVIEW.TXT</span>
          <span className="text-neutral-400">|</span>
          <span>ESTUDO DE CASO COMPLETO</span>
        </div>

        <div className="flex flex-col gap-3 font-sans">
          <span className="font-mono text-xs font-bold text-[#000080] uppercase tracking-wider">
            {isPt ? 'VISÃO GERAL DO PROJETO' : 'PROJECT OVERVIEW'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#073859]">
            {isPt ? 'Nipon Spa — Japanese Wellness Digital Experience' : 'Nipon Spa — Japanese Wellness Digital Experience'}
          </h2>
          <p className="text-base sm:text-lg text-neutral-800 leading-relaxed">
            {isPt 
              ? 'O Nipon Spa é um refúgio exclusivo de bem-estar e rituais japoneses tradicionais em Portugal. O desafio de design foi conceber uma presença digital que refletisse a mesma serenidade, elegância e atenção meticulosa aos detalhes que caracterizam o espaço físico.'
              : 'Nipon Spa is an exclusive sanctuary of traditional Japanese wellness and holistic rituals in Portugal. The design challenge was to craft a digital presence reflecting the exact serenity, quiet elegance, and meticulous attention to detail experienced within the physical space.'}
          </p>
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
            {isPt
              ? 'Desenvolvemos uma experiência digital imersiva com tipografia contemplativa, arquitetura de informação focada em rituais e um fluxo de marcação claro e sereno, integrando fotografia autêntica das salas e tratamentos.'
              : 'We developed an immersive digital experience characterized by contemplative typography, ritual-oriented information architecture, and a fluid booking journey integrating authentic photography of rooms and treatments.'}
          </p>
        </div>
      </div>

      {/* Live Website Retro Banner */}
      <div className="bg-[#eef4fa] border-2 border-[#000080] p-4 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <span className="font-bold text-[#000080] uppercase block">
            {isPt ? 'PRODUTO REAL EM PRODUÇÃO' : 'LIVE PRODUCTION PRODUCT'}
          </span>
          <span className="text-neutral-700 font-sans text-xs">
            {isPt ? 'Disponível online no domínio oficial do spa' : 'Available online at the official spa domain'}
          </span>
        </div>
        <a
          href="https://www.niponspa.pt/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#000080] text-white font-mono text-xs font-bold border border-white hover:bg-[#0a389c] flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>niponspa.pt</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Project Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <div className="bg-white border-2 border-[#808080] p-4 flex flex-col gap-1">
          <span className="text-neutral-500 uppercase text-[10px]">CLIENTE & LOCALIZAÇÃO</span>
          <span className="text-base font-bold text-[#073859]">Nipon Spa</span>
          <span className="text-neutral-600 font-sans text-xs">Portugal • Spa Japonês</span>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4 flex flex-col gap-1">
          <span className="text-neutral-500 uppercase text-[10px]">O MEU PAPEL</span>
          <span className="text-base font-bold text-[#000080]">UX/UI Designer</span>
          <span className="text-neutral-600 font-sans text-xs">Direção de Arte & Prototipagem</span>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4 flex flex-col gap-1">
          <span className="text-neutral-500 uppercase text-[10px]">DISCIPLINA</span>
          <span className="text-base font-bold text-emerald-800">Hospitality & Luxury</span>
          <span className="text-neutral-600 font-sans text-xs">Web Experience & Booking Flow</span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="flex flex-col gap-2">
        <div 
          onClick={() => setExpandedImage(heroHouseImage)}
          className="group cursor-pointer bg-neutral-950 border-2 border-[#808080] overflow-hidden rounded-[2px] relative aspect-[16/9] shadow-md"
        >
          <img 
            src={heroHouseImage} 
            alt="Nipon Spa House" 
            className="w-full h-full object-cover transition-transform group-hover:scale-[1.01]"
          />
          <div className="absolute bottom-3 right-3 bg-black/80 text-white font-mono text-xs px-3 py-1.5 flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>{isPt ? 'Fotografia do Espaço Real' : 'Authentic Spa Photography'}</span>
          </div>
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] text-neutral-600 px-1">
          <span>FIGURA 1.1 — Edifício Real do Nipon Spa em Portugal (niponspa.pt)</span>
          <span className="text-[#000080] font-bold">Produção Real</span>
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
          <span>[ ⛩️ PESQUISA DE HOSPITALIDADE JAPONESA ]</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#073859] mb-3">
          {isPt ? 'Filosofia de Bem-Estar & Análise do Utilizador' : 'Japanese Wellness Philosophy & User Behaviour'}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
          {isPt 
            ? 'A pesquisa partiu da necessidade de traduzir princípios orientais de hospitalidade (Omotenashi) e conceitos de espaço (Ma) para o contexto de um cliente que procura alívio do ritmo frenético do quotidiano ocidental.'
            : 'Our research focused on translating traditional Japanese hospitality principles (Omotenashi) and spatial rhythm (Ma) for modern clients seeking refuge from frantic urban schedules.'}
        </p>
      </div>

      {/* 3 Core Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border-2 border-[#808080] p-4">
          <div className="font-mono text-xs font-bold text-[#000080] mb-1">01 • DESACELERAÇÃO</div>
          <h4 className="font-bold text-sm text-[#073859] mb-1">
            {isPt ? 'Pausa Visual Imediata' : 'Immediate Visual Calming'}
          </h4>
          <p className="text-xs text-neutral-600 font-sans">
            {isPt 
              ? 'Ao entrar no site, o utilizador deve sentir imediatamente o ritmo desacelerar através de espaço negativo e contrastes suaves.'
              : 'The digital touchpoint must immediately decelerate visitor pulse through generous negative space and soothing tones.'}
          </p>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4">
          <div className="font-mono text-xs font-bold text-emerald-800 mb-1">02 • AUTENTICIDADE</div>
          <h4 className="font-bold text-sm text-[#073859] mb-1">
            {isPt ? 'Fotografia Real do Espaço' : 'Real Space Photography'}
          </h4>
          <p className="text-xs text-neutral-600 font-sans">
            {isPt 
              ? 'Evitar bancos de imagens genéricos. Mostrar as salas reais, tatamis de bambu e iluminação quente de lanternas.'
              : 'Zero generic stock imagery. Showcase authentic treatment suites, bamboo elements, and warm lantern lighting.'}
          </p>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4">
          <div className="font-mono text-xs font-bold text-amber-800 mb-1">03 • MARCAÇÃO TRANQUILA</div>
          <h4 className="font-bold text-sm text-[#073859] mb-1">
            {isPt ? 'Zero Pressão de Venda' : 'Non-Aggressive Booking'}
          </h4>
          <p className="text-xs text-neutral-600 font-sans">
            {isPt 
              ? 'Substituir temporizadores e botões agressivos por convites delicados à reserva e contacto direto.'
              : 'Replace intrusive popups and aggressive urgency timers with gentle, dignified booking invitations.'}
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
          <span>[ 📁 PRINCÍPIOS DE DESIGN & ARQUITETURA ]</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#073859] mb-3">
          {isPt ? 'Os Três Pilares da Experiência Visual' : 'The Three Pillars of the Visual Experience'}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
          {isPt 
            ? 'A linguagem visual foi desenhada para estabelecer uma conexão direta com os sentidos do visitante, combinando tradição japonesa com design web de luxo contemporâneo.'
            : 'The visual language connects visitors directly with sensory tranquility, harmonizing Japanese tradition with modern luxury digital standards.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => setExpandedImage(realRoomImage)}
          className="group cursor-pointer bg-neutral-900 border-2 border-[#808080] overflow-hidden rounded-[2px] relative aspect-[4/3]"
        >
          <img 
            src={realRoomImage} 
            alt="Nipon Spa Treatment Room" 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[10px] px-2 py-1 flex items-center gap-1.5">
            <Maximize2 className="w-3 h-3 text-[#3B82F6]" />
            <span>{isPt ? 'Sala de Tratamento Real' : 'Real Treatment Suite'}</span>
          </div>
        </div>

        <div 
          onClick={() => setExpandedImage(realLogoImage)}
          className="group cursor-pointer bg-neutral-900 border-2 border-[#808080] overflow-hidden rounded-[2px] relative aspect-[4/3]"
        >
          <img 
            src={realLogoImage} 
            alt="Nipon Spa Logo & Identity" 
            className="w-full h-full object-contain p-6 bg-[#0d0d0d] transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[10px] px-2 py-1 flex items-center gap-1.5">
            <Maximize2 className="w-3 h-3 text-[#3B82F6]" />
            <span>{isPt ? 'Identidade & Logótipo Autêntico' : 'Authentic Spa Identity'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 4: PROTOTYPE.FIG
  // =========================================================================
  const PrototypeTab = (
    <div className="flex flex-col gap-8 text-[#1A1A1A]">
      <div className="bg-[#F0F4F8] border border-[#B0C4DE] p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-[#000080] font-bold mb-2">
          <span>[ 🌿 ARQUITETURA DE RITUAIS & CATÁLOGO ]</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#073859] mb-3">
          {isPt ? 'Catálogo de Rituais & Componentes Interativos' : 'Ritual Catalogue & Component Hierarchy'}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
          {isPt 
            ? 'Em vez de uma lista estática de preços, os tratamentos foram organizados por sensações corporais e objetivos de bem-estar.'
            : 'Rather than a stark price list, wellness treatments were structured around sensory goals and holistic body benefits.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border-2 border-[#808080] p-4">
          <span className="font-mono text-xs font-bold text-[#000080] uppercase">RITUAL 01</span>
          <h4 className="font-bold text-sm text-[#073859] mt-1 mb-2">
            {isPt ? 'Massagem Tradicional Shiatsu' : 'Traditional Shiatsu Massage'}
          </h4>
          <p className="text-xs text-neutral-600 font-sans">
            {isPt ? 'Pressão digital sobre meridianos para restaurar a energia vital e aliviar tensões musculares profundas.' : 'Acupressure along meridians to restore natural energy flow and release deep tension.'}
          </p>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4">
          <span className="font-mono text-xs font-bold text-emerald-800 uppercase">RITUAL 02</span>
          <h4 className="font-bold text-sm text-[#073859] mt-1 mb-2">
            {isPt ? 'Banho Japonês de Ofurô' : 'Japanese Ofuro Soak'}
          </h4>
          <p className="text-xs text-neutral-600 font-sans">
            {isPt ? 'Imersão em água aromática enriquecida com ervas e sais minerais em banheira tradicional de cedro.' : 'Immersion in cedar tubs scented with authentic herbs and therapeutic minerals.'}
          </p>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4">
          <span className="font-mono text-xs font-bold text-purple-800 uppercase">RITUAL 03</span>
          <h4 className="font-bold text-sm text-[#073859] mt-1 mb-2">
            {isPt ? 'Ritual Exclusivo a Dois' : 'Signature Couples Ritual'}
          </h4>
          <p className="text-xs text-neutral-600 font-sans">
            {isPt ? 'Experiência combinada de esfoliação suave, banho aromático e massagem relaxante com óleos quentes.' : 'Combined gentle exfoliation, aromatic bath, and relaxing warm oil massage for two.'}
          </p>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TAB 5: FINAL_RESULT.PNG
  // =========================================================================
  const FinalResultTab = (
    <div className="flex flex-col gap-8 text-[#1A1A1A]">
      <div className="bg-[#F0F4F8] border border-[#B0C4DE] p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-[#000080] font-bold mb-2">
          <span>[ 🌟 O RESULTADO FINAL EM PRODUÇÃO ]</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#073859] mb-2">
          {isPt ? 'A Experiência Nipon Spa Online' : 'The Nipon Spa Online Presence'}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
          {isPt 
            ? 'O website está em funcionamento ativo, servindo clientes em Portugal e visitantes internacionais que procuram rituais de bem-estar autênticos.'
            : 'The live website is in active production, welcoming local and international visitors seeking authentic Japanese wellbeing rituals.'}
        </p>
      </div>

      <div className="bg-[#c0c0c0] border-2 border-white border-r-[#404040] border-b-[#404040] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-bold text-[#000080] block mb-1">
            DOMÍNIO OFICIAL: HTTPS://WWW.NIPONSPA.PT
          </span>
          <p className="text-xs text-neutral-700 font-sans">
            {isPt 
              ? 'Visite o produto real em funcionamento para experienciar a navegação, imagens e catálogo em tempo real.'
              : 'Visit the live production product to explore real interactions, visuals, and booking flows.'}
          </p>
        </div>

        <a
          href="https://www.niponspa.pt/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-[#000080] text-white font-mono text-xs font-bold border-2 border-white hover:bg-[#0a389c] flex items-center gap-2 cursor-pointer shadow-md shrink-0"
        >
          <span>{isPt ? 'Abrir niponspa.pt' : 'Open niponspa.pt'}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
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
          <span className="font-bold text-[#000080]">C:\DOCUMENTS\NIPON_SPA\LEARNINGS.TXT</span>
          <span className="text-neutral-400">|</span>
          <span>AUTORA: RAÍSSA MORIÁ</span>
        </div>

        <div className="flex flex-col gap-4 font-sans">
          <h3 className="text-xl sm:text-2xl font-bold text-[#073859]">
            {isPt ? 'Serenidade Digital e Hospitalidade' : 'Digital Serenity & Hospitality'}
          </h3>

          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
            {isPt 
              ? 'Projetar para o setor de bem-estar de luxo ensinou-me que muitas vezes o design mais poderoso é o que remove ruído em vez de adicionar ornamentação. Cada espaço em branco cumpre uma função emocional: dar espaço para o visitante respirar.'
              : 'Designing for luxury wellness underscored that the most powerful design often eliminates noise rather than adding decoration. Every pocket of white space serves an emotional role: giving the visitor breathing room.'}
          </p>

          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
            {isPt 
              ? 'A harmonia entre fotografia autêntica e micro-interações calmas provou que um website pode ser simultaneamente comercialmente eficaz e visualmente repousante.'
              : 'The harmony between authentic photography and calm micro-interactions proved that an interface can achieve high business conversion while maintaining supreme aesthetic composure.'}
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
      badge: 'WEB',
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
        projectId="nipon-spa"
        projectNumber="01"
        projectExeName="Project_NiponSpa.exe"
        title="Nipon Spa"
        subtitle="Japanese Wellness • Digital Experience"
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
