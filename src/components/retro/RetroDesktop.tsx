/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  RecycleBinIcon, 
  FolderIcon, 
  RetroComputerIcon, 
  RetroMailIcon, 
  RetroDocumentIcon, 
  RetroChartIcon, 
  PixelHeartBoxIcon, 
  PixelHourglassIcon, 
  SmilingComputerMascot, 
  PixelEarthGlobe 
} from './RetroIcons';
import { RetroWindow } from './RetroWindow';
import { RetroDesktopIcon } from './RetroDesktopIcon';
import { RetroButton } from './RetroButton';
import { WindowId, WindowState, Language } from './RetroTypes';
import { retroAudio } from './RetroAudio';

// @ts-ignore
import raissaPhoto from '../../assets/images/WhatsApp Image 2026-06-03 at 13.15.20.jpeg';
// @ts-ignore
import beachSunsetImg from '../../assets/images/collage_beach_sunset_1794316523578.jpg';
// @ts-ignore
import oceanWaveImg from '../../assets/images/collage_ocean_wave_1794316523572.jpg';
// @ts-ignore
import mountainsRidgeImg from '../../assets/images/collage_mountains_ridge_1794316525124.jpg';
// @ts-ignore
import botanicalLeafImg from '../../assets/images/collage_botanical_leaf_1794316524586.jpg';
// @ts-ignore
import helpdeskCover from '../../assets/images/help.png';
// @ts-ignore
import sueCapa from '../../assets/images/sue-capa.png';
// @ts-ignore
import niponCapa from '../../assets/images/nipon_spa_hero_1787305381037.jpg';

interface RetroDesktopProps {
  language: Language;
  onOpenProject: (slug: string) => void;
  windows: WindowState[];
  activeWindowId: WindowId | null;
  onFocusWindow: (id: WindowId) => void;
  onCloseWindow: (id: WindowId) => void;
  onMinimizeWindow: (id: WindowId) => void;
  onMaximizeWindow: (id: WindowId) => void;
  onOpenWindow: (id: WindowId) => void;
}

export const RetroDesktop: React.FC<RetroDesktopProps> = ({
  language,
  onOpenProject,
  windows,
  activeWindowId,
  onFocusWindow,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onOpenWindow,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [trajectoryTab, setTrajectoryTab] = useState<'experiencia' | 'formacao' | 'skills'>('experiencia');

  const getWindow = (id: WindowId) => windows.find((w) => w.id === id);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('raissagfdhb@gmail.com');
    setCopiedEmail(true);
    retroAudio.playClick();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0084C7] via-[#0070BA] to-[#005599] select-none pb-14">
      {/* 1. BACKGROUND PANORAMA: Lush coastal mountains on bottom right (matches reference image) */}
      <div 
        className="absolute bottom-[42px] right-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-64 sm:h-80 pointer-events-none z-0 opacity-80 mix-blend-multiply bg-bottom bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${mountainsRidgeImg})` }}
        aria-hidden="true"
      />

      {/* Subtle retro scanlines/texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-10 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)]"
        style={{ backgroundSize: '16px 16px' }}
        aria-hidden="true"
      />

      {/* 2. DESKTOP SHORTCUT ICONS (Left Vertical Column) */}
      <div className="relative z-10 p-3 sm:p-5 flex flex-col gap-3 w-fit">
        <RetroDesktopIcon
          id="lixeira"
          label={language === 'pt' ? 'Lixeira' : 'Recycle Bin'}
          icon={<RecycleBinIcon className="w-9 h-9" />}
          onOpen={() => onOpenWindow('lixeira')}
        />

        <RetroDesktopIcon
          id="viagens"
          label={language === 'pt' ? 'Viagens' : 'Travel'}
          icon={<FolderIcon badge="plane" className="w-9 h-9" />}
          onOpen={() => onOpenWindow('viagens')}
        />

        <RetroDesktopIcon
          id="natureza"
          label={language === 'pt' ? 'Natureza' : 'Nature'}
          icon={<FolderIcon badge="leaf" className="w-9 h-9" />}
          onOpen={() => onOpenWindow('natureza')}
        />

        <RetroDesktopIcon
          id="surf"
          label="Surf"
          icon={<FolderIcon badge="wave" className="w-9 h-9" />}
          onOpen={() => onOpenWindow('surf')}
        />

        <RetroDesktopIcon
          id="projetos"
          label={language === 'pt' ? 'Projetos' : 'Projects'}
          icon={<RetroComputerIcon className="w-9 h-9" />}
          onOpen={() => onOpenWindow('projetos')}
        />

        <RetroDesktopIcon
          id="contacto"
          label={language === 'pt' ? 'Contacto' : 'Contact'}
          icon={<RetroMailIcon className="w-9 h-9" />}
          onOpen={() => onOpenWindow('contacto')}
        />
      </div>

      {/* 3. DESKTOP SCRAPBOOK ACCENTS (Bottom-Left: Post-It checklist, Pixel Globe, Polaroid) */}
      <div className="absolute bottom-16 left-4 sm:left-6 z-10 flex items-end gap-3 pointer-events-auto">
        {/* Yellow Post-It note with washi tape */}
        <div className="relative bg-[#FEF08A] text-[#1E1E1E] p-3 pt-4 rounded-none shadow-[2px_4px_10px_rgba(0,0,0,0.35)] -rotate-3 border border-[#EAB308]/60 w-36 sm:w-44 select-none">
          {/* Tape */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 washi-tape-yellow opacity-90 shadow-sm -rotate-2" />
          
          <div className="space-y-1 text-xs font-bold font-handwriting tracking-wide">
            <div className="flex items-center gap-1.5">
              <span className="text-[#000080] font-black">☑</span>
              <span>Design</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#000080] font-black">☑</span>
              <span>{language === 'pt' ? 'Viagens' : 'Travel'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#000080] font-black">☑</span>
              <span>Surf</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#000080] font-black">☑</span>
              <span>{language === 'pt' ? 'Natureza' : 'Nature'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#000080] font-black">☑</span>
              <span>{language === 'pt' ? 'Projetos ♡' : 'Projects ♡'}</span>
            </div>
          </div>
        </div>

        {/* Pixel Earth Globe */}
        <div 
          onClick={() => {
            retroAudio.playClick();
            onOpenWindow('viagens');
          }}
          className="cursor-pointer hover:scale-110 transition-transform filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] -mb-1"
          title={language === 'pt' ? 'Explorar Viagens' : 'Explore Travel'}
        >
          <PixelEarthGlobe className="w-12 h-12" />
        </div>

        {/* Polaroid Sunset with tape */}
        <div 
          onClick={() => {
            retroAudio.playClick();
            onOpenWindow('viagens');
          }}
          className="hidden sm:block relative bg-white p-1.5 pb-5 shadow-[3px_5px_15px_rgba(0,0,0,0.4)] rotate-4 w-28 cursor-pointer hover:rotate-1 hover:scale-105 transition-all"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 washi-tape opacity-80" />
          <img 
            src={beachSunsetImg} 
            alt="Sunset at the beach" 
            className="w-full h-16 object-cover" 
          />
          <span className="block text-[9px] font-handwriting text-center mt-1 text-gray-700">
            Sunset Vibes
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. WINDOW 1: [ Portfólio da Raíssa ] (HERO COLLAGE WINDOW) */}
      {/* ======================================================== */}
      {(() => {
        const win = getWindow('portfolio');
        if (!win) return null;
        return (
          <RetroWindow
            id={win.id}
            title={language === 'pt' ? '[ Portfólio da Raíssa ]' : "[ Raíssa's Portfolio ]"}
            icon={<FolderIcon className="w-4 h-4" />}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isActive={activeWindowId === win.id}
            zIndex={win.zIndex}
            initialPosition={win.position}
            width={win.size?.width || '620px'}
            onFocus={() => onFocusWindow(win.id)}
            onClose={() => onCloseWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onMaximize={() => onMaximizeWindow(win.id)}
          >
            <div className="relative p-3 sm:p-5 bg-gradient-to-br from-[#E2EEF8] via-[#F2EFE9] to-[#E9F3FA] overflow-hidden">
              {/* Botanical Leaf Overlay */}
              <img
                src={botanicalLeafImg}
                alt="Tropical Leaf"
                className="absolute top-1 left-2 w-28 sm:w-36 h-auto opacity-35 pointer-events-none -rotate-12 mix-blend-multiply"
              />

              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
                {/* Left: Raíssa's Cutout Photo & Stickers */}
                <div className="relative shrink-0 flex flex-col items-center">
                  <div className="relative w-44 h-48 sm:w-52 sm:h-56 rounded-none overflow-hidden win-border-sunken bg-white p-1">
                    <img
                      src={raissaPhoto}
                      alt="Raíssa Moriá"
                      className="w-full h-full object-cover object-top filter contrast-105"
                    />
                    {/* Washi tape over photo corner */}
                    <div className="absolute top-1 left-1 w-12 h-3.5 washi-tape opacity-85 rotate-[-25deg]" />
                  </div>

                  {/* Red Hibiscus sticker */}
                  <div className="absolute -bottom-3 -left-3 w-12 h-12 text-2xl select-none filter drop-shadow">
                    🌺
                  </div>

                  {/* Wave crest sticker */}
                  <div className="absolute -bottom-2 -right-2 bg-white/90 px-2 py-0.5 win-border-raised text-xs font-handwriting font-bold text-[#000080] flex items-center gap-1">
                    <span>🌊</span>
                    <span>Surf & Soul</span>
                  </div>
                </div>

                {/* Right: Scrapbook Typography & Bio */}
                <div className="flex-1 flex flex-col items-start text-left">
                  {/* "Olá, eu sou a" in handwriting cutout badge */}
                  <div className="inline-block bg-[#FFF9E6] px-3 py-1 -rotate-2 win-border-raised text-xs sm:text-sm font-handwriting font-bold text-[#1E1E1E] shadow-sm mb-1">
                    {language === 'pt' ? 'Olá, eu sou a' : "Hi, I am"}
                  </div>

                  {/* "RAÍSSA" in giant bold magazine cutout style */}
                  <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#000080] uppercase drop-shadow-[1px_1px_0px_#FFFFFF] leading-none mb-2">
                    RAÍSSA
                  </h1>

                  {/* Yellow Tape Badge: Subtitle */}
                  <div className="inline-block bg-[#FEF08A] text-[#1E1E1E] font-semibold text-xs sm:text-sm px-2.5 py-1 border border-[#EAB308] rotate-1 shadow-sm mb-3">
                    {language === 'pt' 
                      ? 'UX/UI designer, viajante, amante da natureza e do surf.' 
                      : 'UX/UI designer, traveler, nature and surf enthusiast.'
                    }
                  </div>

                  {/* Body description */}
                  <p className="text-xs sm:text-sm text-[#262626] leading-relaxed mb-4 font-sans">
                    {language === 'pt' 
                      ? 'Designo experiências digitais com curiosidade, humanidade e storytelling. Acredito que o design pode conectar pessoas, contar histórias e inspirar novas formas de viver o mundo.'
                      : 'I craft digital experiences driven by curiosity, empathy, and storytelling. I believe great design connects people, elevates stories, and shapes more human everyday tools.'
                    }
                  </p>

                  {/* CTA Buttons Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <RetroButton 
                      size="sm" 
                      onClick={() => onOpenWindow('projetos')}
                      className="bg-[#000080] text-white hover:bg-[#1084d0]"
                    >
                      📁 {language === 'pt' ? 'Ver Projetos →' : 'View Projects →'}
                    </RetroButton>

                    <RetroButton 
                      size="sm" 
                      onClick={() => onOpenWindow('sobre')}
                    >
                      📄 {language === 'pt' ? 'Sobre Mim' : 'About Me'}
                    </RetroButton>

                    <RetroButton 
                      size="sm" 
                      onClick={() => onOpenWindow('contacto')}
                    >
                      ✉ {language === 'pt' ? 'Falar comigo' : 'Get in touch'}
                    </RetroButton>
                  </div>
                </div>
              </div>
            </div>
          </RetroWindow>
        );
      })()}

      {/* ======================================================== */}
      {/* 5. WINDOW 2: SOBRE (Bio, diário & coração pixel) */}
      {/* ======================================================== */}
      {(() => {
        const win = getWindow('sobre');
        if (!win) return null;
        return (
          <RetroWindow
            id={win.id}
            title={language === 'pt' ? 'Sobre' : 'About'}
            icon={<RetroDocumentIcon className="w-4 h-4" />}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isActive={activeWindowId === win.id}
            zIndex={win.zIndex}
            initialPosition={win.position}
            width={win.size?.width || '360px'}
            onFocus={() => onFocusWindow(win.id)}
            onClose={() => onCloseWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onMaximize={() => onMaximizeWindow(win.id)}
          >
            <div className="p-3 bg-[#FFFDF7] text-black">
              <div className="flex items-start gap-3 mb-2">
                <PixelHeartBoxIcon className="w-8 h-8 shrink-0" />
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    {language === 'pt' ? 'Diário Pessoal' : 'Personal Journal'}
                  </span>
                  <h3 className="font-bold text-sm text-[#000080]">
                    {language === 'pt' ? 'Raíssa Moriá • UX/UI' : 'Raíssa Moriá • UX/UI'}
                  </h3>
                </div>
              </div>

              <div className="win-border-sunken p-2.5 bg-white text-xs leading-relaxed space-y-2 mb-3">
                <p>
                  {language === 'pt' 
                    ? 'Sou a Raíssa, UX/UI designer apaixonada por pessoas, tecnologia, viagens, natureza e mar.' 
                    : 'I am Raíssa, a UX/UI designer in love with people, technology, travel, nature and the ocean.'
                  }
                </p>
                <p className="text-gray-700">
                  {language === 'pt' 
                    ? 'Aqui compartilho meus projetos, trajetória e um pouco das histórias que me inspiram dentro e fora do design.'
                    : 'Here I share my product case studies, career trajectory, and the stories that fuel my creative problem solving.'
                  }
                </p>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[11px] text-gray-500 font-mono">
                  📍 Lisboa / Remoto
                </span>
                <RetroButton 
                  size="sm" 
                  onClick={() => onOpenWindow('trajetoria')}
                >
                  {language === 'pt' ? 'Conhecer mais →' : 'Learn more →'}
                </RetroButton>
              </div>
            </div>
          </RetroWindow>
        );
      })()}

      {/* ======================================================== */}
      {/* 6. WINDOW 3: VIAGENS ✈ (Fotografia e mar) */}
      {/* ======================================================== */}
      {(() => {
        const win = getWindow('viagens');
        if (!win) return null;
        return (
          <RetroWindow
            id={win.id}
            title={language === 'pt' ? 'Viagens ✈' : 'Travel ✈'}
            icon={<span className="text-xs">✈️</span>}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isActive={activeWindowId === win.id}
            zIndex={win.zIndex}
            initialPosition={win.position}
            width={win.size?.width || '260px'}
            onFocus={() => onFocusWindow(win.id)}
            onClose={() => onCloseWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onMaximize={() => onMaximizeWindow(win.id)}
          >
            <div className="p-1.5 bg-[#C0C0C0]">
              <div className="win-border-sunken overflow-hidden bg-black">
                <img
                  src={beachSunsetImg}
                  alt="Travel photography"
                  className="w-full h-36 object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px] px-1 text-gray-800">
                <span className="font-semibold">Rio & Ilhas Tropicais</span>
                <span className="text-gray-600 font-mono">IMG_0842.JPG</span>
              </div>
            </div>
          </RetroWindow>
        );
      })()}

      {/* ======================================================== */}
      {/* 7. WINDOW 4: SURF 🌊 (Onda e maré) */}
      {/* ======================================================== */}
      {(() => {
        const win = getWindow('surf');
        if (!win) return null;
        return (
          <RetroWindow
            id={win.id}
            title="Surf 🌊"
            icon={<span className="text-xs">🌊</span>}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isActive={activeWindowId === win.id}
            zIndex={win.zIndex}
            initialPosition={win.position}
            width={win.size?.width || '230px'}
            onFocus={() => onFocusWindow(win.id)}
            onClose={() => onCloseWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onMaximize={() => onMaximizeWindow(win.id)}
          >
            <div className="p-1.5 bg-[#C0C0C0]">
              <div className="win-border-sunken overflow-hidden bg-black">
                <img
                  src={oceanWaveImg}
                  alt="Emerald barrel wave"
                  className="w-full h-32 object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px] px-1 text-gray-800">
                <span className="font-semibold">{language === 'pt' ? 'Mar & Tubo' : 'Ocean Tube'}</span>
                <span className="text-blue-800 font-bold">2.5m 🏄</span>
              </div>
            </div>
          </RetroWindow>
        );
      })()}

      {/* ======================================================== */}
      {/* 8. WINDOW 5: PROJETOS (Estudos de caso reais) */}
      {/* ======================================================== */}
      {(() => {
        const win = getWindow('projetos');
        if (!win) return null;
        return (
          <RetroWindow
            id={win.id}
            title={language === 'pt' ? 'Projetos' : 'Projects'}
            icon={<RetroComputerIcon className="w-4 h-4" />}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isActive={activeWindowId === win.id}
            zIndex={win.zIndex}
            initialPosition={win.position}
            width={win.size?.width || '380px'}
            onFocus={() => onFocusWindow(win.id)}
            onClose={() => onCloseWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onMaximize={() => onMaximizeWindow(win.id)}
          >
            <div className="p-3 bg-[#F5F5F0]">
              <div className="flex gap-3 items-center mb-3">
                <div className="w-28 h-20 shrink-0 win-border-sunken overflow-hidden bg-white">
                  <img
                    src={helpdeskCover}
                    alt="Projects preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-xs">
                  <h4 className="font-bold text-[#000080] text-sm mb-1">
                    {language === 'pt' ? 'Projetos em Destaque' : 'Featured Projects'}
                  </h4>
                  <p className="text-gray-700 leading-tight">
                    {language === 'pt' 
                      ? 'Projetos que unem estratégia, design de produto e propósito.'
                      : 'Projects uniting product strategy, UX research and clean low-code development.'
                    }
                  </p>
                </div>
              </div>

              {/* Quick links to real case studies */}
              <div className="space-y-1.5 win-border-sunken p-2 bg-white text-xs mb-3">
                <div 
                  onClick={() => onOpenProject('plataforma-helpdesk')}
                  className="flex items-center justify-between p-1.5 hover:bg-[#000080] hover:text-white cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-2 truncate">
                    <img src={helpdeskCover} alt="Helpdesk" className="w-5 h-5 object-cover rounded-none border border-black/20" />
                    <span className="font-bold truncate">Plataforma de Helpdesk</span>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 group-hover:bg-white group-hover:text-black px-1.5 py-0.5 font-mono">
                    Lovable
                  </span>
                </div>

                <div 
                  onClick={() => onOpenProject('sue-app')}
                  className="flex items-center justify-between p-1.5 hover:bg-[#000080] hover:text-white cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-2 truncate">
                    <img src={sueCapa} alt="SUE App" className="w-5 h-5 object-cover rounded-none border border-black/20" />
                    <span className="font-bold truncate">SUE Mobile App</span>
                  </div>
                  <span className="text-[10px] bg-purple-100 text-purple-800 group-hover:bg-white group-hover:text-black px-1.5 py-0.5 font-mono">
                    Video & Test
                  </span>
                </div>

                <div 
                  onClick={() => onOpenProject('nipon-spa')}
                  className="flex items-center justify-between p-1.5 hover:bg-[#000080] hover:text-white cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-2 truncate">
                    <img src={niponCapa} alt="Nipon Spa" className="w-5 h-5 object-cover rounded-none border border-black/20" />
                    <span className="font-bold truncate">Nipon Spa</span>
                  </div>
                  <span className="text-[10px] bg-green-100 text-green-800 group-hover:bg-white group-hover:text-black px-1.5 py-0.5 font-mono">
                    Wellness UX
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <RetroButton 
                  size="sm"
                  onClick={() => onOpenProject('plataforma-helpdesk')}
                  className="bg-[#000080] text-white hover:bg-[#1084d0]"
                >
                  {language === 'pt' ? 'Ver projetos →' : 'Open projects →'}
                </RetroButton>
              </div>
            </div>
          </RetroWindow>
        );
      })()}

      {/* ======================================================== */}
      {/* 9. WINDOW 6: TRAJETÓRIA (Baseada no CV Oficial) */}
      {/* ======================================================== */}
      {(() => {
        const win = getWindow('trajetoria');
        if (!win) return null;
        return (
          <RetroWindow
            id={win.id}
            title={language === 'pt' ? 'Trajetória & Carreira' : 'Career & Trajectory'}
            icon={<RetroChartIcon className="w-4 h-4" />}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isActive={activeWindowId === win.id}
            zIndex={win.zIndex}
            initialPosition={win.position}
            width={win.size?.width || '440px'}
            onFocus={() => onFocusWindow(win.id)}
            onClose={() => onCloseWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onMaximize={() => onMaximizeWindow(win.id)}
          >
            <div className="p-3 bg-[#FAF8F2] flex flex-col max-h-[500px]">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D4D0C8]">
                <div className="flex items-center gap-2">
                  <span className="text-[#000080] font-bold text-sm">
                    {language === 'pt' ? 'Raíssa Moriá • Percurso Profissional' : 'Raíssa Moriá • Professional Background'}
                  </span>
                </div>
                <PixelHourglassIcon className="w-5 h-5 shrink-0" />
              </div>

              {/* Subtabs: Experiência | Formação | Skills */}
              <div className="flex items-center gap-1 border-b border-[#808080] mb-3 bg-[#E5E5E5] p-0.5">
                <button
                  onClick={() => {
                    retroAudio.playClick();
                    setTrajectoryTab('experiencia');
                  }}
                  className={`flex-1 py-1 text-xs font-bold text-center cursor-pointer transition-none ${
                    trajectoryTab === 'experiencia'
                      ? 'bg-white text-[#000080] border-t-2 border-l-2 border-white border-r-2 border-[#404040] shadow-[0px_-1px_0px_#000]'
                      : 'bg-[#C0C0C0] text-gray-700 hover:bg-[#D4D0C8]'
                  }`}
                >
                  💼 {language === 'pt' ? 'Experiência' : 'Experience'}
                </button>
                <button
                  onClick={() => {
                    retroAudio.playClick();
                    setTrajectoryTab('formacao');
                  }}
                  className={`flex-1 py-1 text-xs font-bold text-center cursor-pointer transition-none ${
                    trajectoryTab === 'formacao'
                      ? 'bg-white text-[#000080] border-t-2 border-l-2 border-white border-r-2 border-[#404040] shadow-[0px_-1px_0px_#000]'
                      : 'bg-[#C0C0C0] text-gray-700 hover:bg-[#D4D0C8]'
                  }`}
                >
                  🎓 {language === 'pt' ? 'Formação' : 'Education'}
                </button>
                <button
                  onClick={() => {
                    retroAudio.playClick();
                    setTrajectoryTab('skills');
                  }}
                  className={`flex-1 py-1 text-xs font-bold text-center cursor-pointer transition-none ${
                    trajectoryTab === 'skills'
                      ? 'bg-white text-[#000080] border-t-2 border-l-2 border-white border-r-2 border-[#404040] shadow-[0px_-1px_0px_#000]'
                      : 'bg-[#C0C0C0] text-gray-700 hover:bg-[#D4D0C8]'
                  }`}
                >
                  🛠️ {language === 'pt' ? 'Skills' : 'Skills'}
                </button>
              </div>

              {/* Tab 1: Experiência Profissional */}
              {trajectoryTab === 'experiencia' && (
                <div className="overflow-y-auto max-h-[300px] pr-1 space-y-3 win-border-sunken p-2.5 bg-white text-xs">
                  {/* URSO / Invencível */}
                  <div className="border-l-2 border-[#000080] pl-2.5">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-[#000080] text-xs">UX/UI Designer — URSO / Invencível</span>
                      <span className="bg-[#FEF08A] text-[#854D0E] font-bold text-[10px] px-1.5 py-0.2 rounded-sm shrink-0">
                        2026 — Presente
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-mono block mb-1">Portugal</span>
                    <p className="text-gray-700 leading-relaxed text-[11px]">
                      {language === 'pt'
                        ? 'Criação de soluções digitais calmas e práticas (user flows, wireframes, protótipos, interface e product experience) para preparar pessoas para incertezas, proteger o que importa e manter conexão.'
                        : 'Design UX/UI experiences for URSO, creating calm, practical digital solutions that help people prepare for uncertainty, protect what matters, and stay connected (user flows, wireframes, prototypes, interface design, product experience).'}
                    </p>
                  </div>

                  {/* VOQIN’ (futureLabs) */}
                  <div className="border-l-2 border-emerald-600 pl-2.5">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-emerald-800 text-xs">UX/UI Designer — VOQIN’ (futureLabs)</span>
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-1.5 py-0.2 rounded-sm shrink-0">
                        Dez 2025 — Presente
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-mono block mb-1">Portugal</span>
                    <p className="text-gray-700 leading-relaxed text-[11px]">
                      {language === 'pt'
                        ? 'Liderança de processos de Design Thinking, UX e UI em plataformas digitais internas para acelerar fluxos de trabalho de eventos. Design e construção de websites de eventos na plataforma Cvent (estruturas de sessão, jornadas do utilizador e comunicação).'
                        : 'Lead design thinking, UX and UI processes to build internal platforms accelerating event workflows. Design and build event websites on Cvent (session formats, user journeys, attendee communication flows).'}
                    </p>
                  </div>

                  {/* SEEDS Iceland */}
                  <div className="border-l-2 border-blue-500 pl-2.5">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-gray-900 text-xs">Photography Camp Coordinator | Media & Design — SEEDS</span>
                      <span className="bg-gray-100 text-gray-700 font-mono text-[10px] px-1 py-0.2 shrink-0">
                        Abr 2025
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-mono block mb-1">Islândia</span>
                    <p className="text-gray-700 leading-relaxed text-[11px]">
                      {language === 'pt'
                        ? 'Coordenação de workshops de fotografia e multimédia para voluntários internacionais. Apoio à presença digital, redesign de website em Figma e criação de vídeos/animações.'
                        : 'Coordinated photography and multimedia workshops for international volunteers. Supported digital presence via social media, website redesign in Figma, and video/animation creation.'}
                    </p>
                  </div>

                  {/* Six Seconds California */}
                  <div className="border-l-2 border-purple-500 pl-2.5">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-gray-900 text-xs">Video Editor — Six Seconds</span>
                      <span className="bg-gray-100 text-gray-700 font-mono text-[10px] px-1 py-0.2 shrink-0">
                        2023 — 2024
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-mono block mb-1">Califórnia (Remoto)</span>
                    <p className="text-gray-700 leading-relaxed text-[11px]">
                      {language === 'pt'
                        ? 'Edição e produção de vídeos educacionais e promocionais para campanhas de redes sociais em colaboração com equipas criativas internacionais.'
                        : 'Edited and produced educational and promotional videos for social media campaigns in collaboration with international creative teams.'}
                    </p>
                  </div>

                  {/* ESAD Multimedia Volunteer */}
                  <div className="border-l-2 border-amber-500 pl-2.5">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-gray-900 text-xs">Gabinete Audiovisual & Multimédia (Voluntariado) — ESAD</span>
                      <span className="bg-gray-100 text-gray-700 font-mono text-[10px] px-1 py-0.2 shrink-0">
                        2022 — 2024
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-mono block mb-1">Portugal</span>
                    <p className="text-gray-700 leading-relaxed text-[11px]">
                      {language === 'pt'
                        ? 'Suporte a projetos de produção audiovisual e design multimédia, incluindo motion graphics, fotografia e instalações digitais.'
                        : 'Supported audiovisual production and multimedia design projects, including motion graphics, photography, and digital installations.'}
                    </p>
                  </div>

                  {/* Voluntariado Internacional */}
                  <div className="border-l-2 border-gray-400 pl-2.5">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-gray-900 text-xs">Voluntariado Internacional & Projetos Culturais</span>
                      <span className="bg-gray-100 text-gray-700 font-mono text-[10px] px-1 py-0.2 shrink-0">
                        2018 — 2023
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-mono block mb-1">Europa & América do Sul</span>
                    <p className="text-gray-700 leading-relaxed text-[11px]">
                      {language === 'pt'
                        ? 'Participação em iniciativas comunitárias de arte e fotografia, fortalecendo a colaboração multicultural e versatilidade criativa.'
                        : 'Participated in community-based art and photography initiatives across Europe and South America, strengthening cross-cultural collaboration.'}
                    </p>
                  </div>

                  {/* TV Arroios */}
                  <div className="border-l-2 border-gray-400 pl-2.5">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-gray-900 text-xs">Videographer & Photographer — TV Arroios</span>
                      <span className="bg-gray-100 text-gray-700 font-mono text-[10px] px-1 py-0.2 shrink-0">
                        2016 — 2017
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-mono block mb-1">Portugal</span>
                    <p className="text-gray-700 leading-relaxed text-[11px]">
                      {language === 'pt'
                        ? 'Produção e edição de conteúdo de vídeo e fotografia para comunicação digital e visual.'
                        : 'Produced and edited video and photography content for digital and visual communication.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Formação Académica e Profissional */}
              {trajectoryTab === 'formacao' && (
                <div className="overflow-y-auto max-h-[300px] pr-1 space-y-3 win-border-sunken p-2.5 bg-white text-xs">
                  {/* Licenciatura ESAD */}
                  <div className="border-l-3 border-[#000080] pl-3 py-1 bg-[#F8FAFC]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#000080] text-xs sm:text-sm">
                        {language === 'pt' ? 'Licenciatura em Design Gráfico e Multimédia' : 'Bachelor in Graphic Design and Multimedia'}
                      </span>
                      <span className="bg-[#000080] text-white font-mono text-[10px] px-1.5 py-0.5">
                        2021 — 2024
                      </span>
                    </div>
                    <span className="font-semibold text-gray-800 block text-xs">
                      ESAD — Escola Superior de Artes e Design, Caldas da Rainha
                    </span>
                    <p className="text-gray-600 text-[11px] mt-1 leading-relaxed">
                      {language === 'pt'
                        ? 'Formação abrangente em design de interface, tipografia, arquitetura de informação, multimédia, motion graphics e tecnologias digitais.'
                        : 'Comprehensive training in interface design, visual systems, typography, information architecture, multimedia, motion graphics and web technologies.'}
                    </p>
                  </div>

                  {/* Fotografia Magestil */}
                  <div className="border-l-3 border-[#D97706] pl-3 py-1 bg-[#FFFDF5]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#92400E] text-xs sm:text-sm">
                        {language === 'pt' ? 'Curso Profissional de Fotografia' : 'Professional Photography Course'}
                      </span>
                      <span className="bg-[#D97706] text-white font-mono text-[10px] px-1.5 py-0.5">
                        2013 — 2016
                      </span>
                    </div>
                    <span className="font-semibold text-gray-800 block text-xs">
                      Escola Profissional Magestil, Lisboa
                    </span>
                    <p className="text-gray-600 text-[11px] mt-1 leading-relaxed">
                      {language === 'pt'
                        ? 'Domínio de técnicas fotográficas analógicas e digitais, iluminação, composição visual, pós-produção e narrativa de imagem.'
                        : 'Mastery of digital and analog photography techniques, composition, studio lighting, image processing, and visual storytelling.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Ferramentas & Metodologias */}
              {trajectoryTab === 'skills' && (
                <div className="overflow-y-auto max-h-[300px] pr-1 space-y-2.5 win-border-sunken p-2.5 bg-white text-xs">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#000080] uppercase tracking-wider block mb-1">
                      {language === 'pt' ? 'FERRAMENTAS DE UX / UI' : 'UX TOOLS'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {['Figma', 'Adobe XD', 'Lovable', 'Cursor', 'Webflow', 'HTML', 'CSS', 'JavaScript'].map((s) => (
                        <span key={s} className="bg-blue-50 text-blue-900 border border-blue-200 px-1.5 py-0.5 font-medium text-[11px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold text-purple-800 uppercase tracking-wider block mb-1">
                      {language === 'pt' ? 'DESIGN & MULTIMÉDIA' : 'DESIGN & MULTIMEDIA TOOLS'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {['Photoshop', 'Illustrator', 'InDesign', 'After Effects', 'Premiere Pro', 'Blender', 'Cinema 4D', 'Artivive', 'Adobe Aero', 'MetaSpark'].map((s) => (
                        <span key={s} className="bg-purple-50 text-purple-900 border border-purple-200 px-1.5 py-0.5 font-medium text-[11px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                      {language === 'pt' ? 'MÉTODOS & ABORDAGENS UX' : 'UX METHODS'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {['Design Thinking', 'UX Research', 'User Flows', 'Wireframing', 'Prototyping', 'Visual Design', 'Interaction Design', 'Information Architecture', 'Communication Flow Design'].map((s) => (
                        <span key={s} className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-1.5 py-0.5 font-medium text-[11px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      {language === 'pt' ? 'IDIOMAS' : 'LANGUAGES'}
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 border border-gray-300 font-mono">
                        🇵🇹 Português (Nativo)
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 border border-gray-300 font-mono">
                        🇬🇧 English (B2)
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 border border-gray-300 font-mono">
                        🇪🇸 Español (B2)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons at bottom of Trajetória */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 mt-2 border-t border-[#D4D0C8]">
                <a
                  href="/Raissa_Moria_CV_2026.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => retroAudio.playClick()}
                  className="win-btn px-2.5 py-1 text-xs font-bold inline-flex items-center gap-1.5 bg-[#FEF08A] hover:bg-[#FDE047] text-black"
                >
                  <span>📄</span>
                  <span>{language === 'pt' ? 'Abrir CV Completo (PDF)' : 'Open Full CV (PDF)'}</span>
                </a>

                <RetroButton 
                  size="sm" 
                  onClick={() => onOpenWindow('contacto')}
                  className="bg-[#000080] text-white hover:bg-[#1084d0]"
                >
                  {language === 'pt' ? 'Falar comigo →' : 'Get in touch →'}
                </RetroButton>
              </div>
            </div>
          </RetroWindow>
        );
      })()}

      {/* ======================================================== */}
      {/* 10. WINDOW 7: CONTACTO (Dados verificados do CV) */}
      {/* ======================================================== */}
      {(() => {
        const win = getWindow('contacto');
        if (!win) return null;
        return (
          <RetroWindow
            id={win.id}
            title={language === 'pt' ? 'Contacto' : 'Contact'}
            icon={<RetroMailIcon className="w-4 h-4" />}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isActive={activeWindowId === win.id}
            zIndex={win.zIndex}
            initialPosition={win.position}
            width={win.size?.width || '350px'}
            onFocus={() => onFocusWindow(win.id)}
            onClose={() => onCloseWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onMaximize={() => onMaximizeWindow(win.id)}
          >
            <div className="p-4 bg-[#FFFFFF]">
              <div className="flex gap-3 items-center mb-3">
                <SmilingComputerMascot className="w-14 h-14 shrink-0 filter drop-shadow-sm" />
                <div className="text-xs">
                  <h4 className="font-bold text-sm text-[#000080] mb-0.5">
                    {language === 'pt' ? 'Vamos conversar?' : "Let's connect?"}
                  </h4>
                  <p className="text-gray-700 leading-snug">
                    {language === 'pt' 
                      ? 'Adoro trocar ideias sobre produto, colaborar em desafios de UX/UI e construir soluções com propósito.'
                      : 'Always excited to discuss product ideas, collaborate on UX/UI challenges, and craft meaningful interfaces.'
                    }
                  </p>
                </div>
              </div>

              {/* Contact Data Card matching CV */}
              <div className="win-border-sunken p-2.5 bg-[#F9F9F9] text-xs mb-3 space-y-1.5 font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold">Email:</span>
                  <button 
                    onClick={handleCopyEmail}
                    title="Clique para copiar"
                    className="font-bold text-[#000080] hover:underline cursor-pointer select-all truncate max-w-[200px]"
                  >
                    raissagfdhb@gmail.com
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold">{language === 'pt' ? 'Telemóvel:' : 'Phone:'}</span>
                  <a href="tel:+351935360284" className="font-bold text-gray-800 hover:text-blue-600">
                    +351 935 360 284
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold">LinkedIn:</span>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    linkedin.com
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold">Behance:</span>
                  <a 
                    href="https://behance.net" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    behance.net
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold">Web:</span>
                  <span className="text-gray-800 font-semibold">
                    raissamoria.github.io
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-green-700 font-bold">
                  {copiedEmail ? (language === 'pt' ? '✓ Email copiado!' : '✓ Email copied!') : '🟢 Open for opportunities'}
                </span>
                <RetroButton 
                  size="sm" 
                  onClick={handleCopyEmail}
                  className="bg-[#000080] text-white hover:bg-[#1084d0]"
                >
                  {copiedEmail ? (language === 'pt' ? 'Copiado!' : 'Copied!') : (language === 'pt' ? 'Copiar Email' : 'Copy Email')}
                </RetroButton>
              </div>
            </div>
          </RetroWindow>
        );
      })()}


      {/* ======================================================== */}
      {/* 11. WINDOW 8: NATUREZA (Flora & inspiração) */}
      {/* ======================================================== */}
      {(() => {
        const win = getWindow('natureza');
        if (!win) return null;
        return (
          <RetroWindow
            id={win.id}
            title={language === 'pt' ? 'Natureza' : 'Nature'}
            icon={<FolderIcon badge="leaf" className="w-4 h-4" />}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isActive={activeWindowId === win.id}
            zIndex={win.zIndex}
            initialPosition={win.position}
            width={win.size?.width || '280px'}
            onFocus={() => onFocusWindow(win.id)}
            onClose={() => onCloseWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onMaximize={() => onMaximizeWindow(win.id)}
          >
            <div className="p-3 bg-[#F0FDF4] text-black">
              <div className="win-border-sunken overflow-hidden mb-2">
                <img
                  src={botanicalLeafImg}
                  alt="Nature botanical leaves"
                  className="w-full h-36 object-cover"
                />
              </div>
              <p className="text-xs text-gray-700 leading-snug">
                {language === 'pt' 
                  ? 'A natureza inspira as formas orgânicas, paletas de cores e harmonia dos meus projetos de design.'
                  : 'Nature inspires the organic shapes, natural palettes, and balance across my UX and visual systems.'
                }
              </p>
            </div>
          </RetroWindow>
        );
      })()}

      {/* ======================================================== */}
      {/* 12. WINDOW 9: LIXEIRA (Recycle Bin fun easter egg) */}
      {/* ======================================================== */}
      {(() => {
        const win = getWindow('lixeira');
        if (!win) return null;
        return (
          <RetroWindow
            id={win.id}
            title={language === 'pt' ? 'Lixeira' : 'Recycle Bin'}
            icon={<RecycleBinIcon className="w-4 h-4" />}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isActive={activeWindowId === win.id}
            zIndex={win.zIndex}
            initialPosition={win.position}
            width={win.size?.width || '280px'}
            onFocus={() => onFocusWindow(win.id)}
            onClose={() => onCloseWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onMaximize={() => onMaximizeWindow(win.id)}
          >
            <div className="p-4 bg-white text-center">
              <p className="text-xs font-bold text-gray-700 mb-1">
                {language === 'pt' ? '0 ficheiros eliminados' : '0 items in Recycle Bin'}
              </p>
              <p className="text-[11px] text-gray-500 mb-3">
                {language === 'pt' 
                  ? 'Nenhum rascunho de design foi desperdiçado!' 
                  : 'No good design drafts were harmed!'
                }
              </p>
              <RetroButton size="sm" onClick={() => onCloseWindow('lixeira')}>
                {language === 'pt' ? 'Esvaziar' : 'Close'}
              </RetroButton>
            </div>
          </RetroWindow>
        );
      })()}
    </div>
  );
};
