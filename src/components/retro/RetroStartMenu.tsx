/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  FolderIcon, 
  RetroComputerIcon, 
  RetroMailIcon, 
  RetroDocumentIcon, 
  RetroChartIcon, 
  SpeakerIcon 
} from './RetroIcons';
import { retroAudio } from './RetroAudio';
import { Language } from './RetroTypes';

interface RetroStartMenuProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onOpenWindow: (id: string) => void;
  onOpenProject: (slug: string) => void;
  onToggleLanguage: () => void;
  onShutdown: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const RetroStartMenu: React.FC<RetroStartMenuProps> = ({
  isOpen,
  language,
  onClose,
  onOpenWindow,
  onOpenProject,
  onToggleLanguage,
  onShutdown,
  isMuted,
  onToggleMute,
}) => {
  if (!isOpen) return null;

  const handleAction = (cb: () => void) => {
    retroAudio.playClick();
    cb();
    onClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-[42px] left-1 z-[9999] win-border-raised bg-[#C0C0C0] w-72 flex shadow-[4px_4px_16px_rgba(0,0,0,0.6)] select-none animate-in fade-in zoom-in-95 duration-100"
    >
      {/* 1. Left Vertical Banner (Classic Windows 95 Style) */}
      <div className="w-8 bg-gradient-to-t from-[#000080] via-[#0000AA] to-[#1084d0] flex items-end justify-center pb-3">
        <span
          className="text-white font-extrabold tracking-widest text-sm uppercase -rotate-90 origin-bottom-left transform translate-x-6 -translate-y-2 whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
          style={{ letterSpacing: '0.25em' }}
        >
          RAÍSSA OS 98
        </span>
      </div>

      {/* 2. Menu Items Column */}
      <div className="flex-1 py-1.5 flex flex-col text-sm text-black">
        {/* Main Portfolio */}
        <button
          onClick={() => handleAction(() => onOpenWindow('portfolio'))}
          className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-[#000080] hover:text-white text-left w-full cursor-pointer group"
        >
          <FolderIcon className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold leading-tight">
              {language === 'pt' ? 'Portfólio da Raíssa' : "Raíssa's Portfolio"}
            </span>
            <span className="text-[10px] text-gray-600 group-hover:text-gray-300">
              {language === 'pt' ? 'Apresentação principal' : 'Main presentation'}
            </span>
          </div>
        </button>

        {/* Sobre */}
        <button
          onClick={() => handleAction(() => onOpenWindow('sobre'))}
          className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-[#000080] hover:text-white text-left w-full cursor-pointer group"
        >
          <RetroDocumentIcon className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="font-semibold leading-tight">
              {language === 'pt' ? 'Sobre Mim' : 'About Me'}
            </span>
            <span className="text-[10px] text-gray-600 group-hover:text-gray-300">
              {language === 'pt' ? 'História, paixões e perfil' : 'Bio, passions & profile'}
            </span>
          </div>
        </button>

        {/* Projetos Folder with Subitems */}
        <div className="relative group/proj">
          <button
            onClick={() => handleAction(() => onOpenWindow('projetos'))}
            className="flex items-center justify-between px-3 py-1.5 hover:bg-[#000080] hover:text-white text-left w-full cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <RetroComputerIcon className="w-5 h-5 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold leading-tight">
                  {language === 'pt' ? 'Projetos UX/UI' : 'UX/UI Projects'}
                </span>
                <span className="text-[10px] text-gray-600 group-hover:text-gray-300">
                  {language === 'pt' ? 'Estudos de caso reais' : 'Real case studies'}
                </span>
              </div>
            </div>
            <span className="text-xs">▶</span>
          </button>

          {/* Submenu on hover */}
          <div className="hidden group-hover/proj:flex flex-col absolute left-full top-0 ml-[-2px] w-56 bg-[#C0C0C0] win-border-raised py-1 shadow-lg z-50">
            <button
              onClick={() => handleAction(() => onOpenProject('plataforma-helpdesk'))}
              className="px-3 py-1.5 text-xs text-left hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-1.5"
            >
              <span>🖥️</span>
              <span className="font-medium truncate">Helpdesk Platform</span>
            </button>
            <button
              onClick={() => handleAction(() => onOpenProject('sue-app'))}
              className="px-3 py-1.5 text-xs text-left hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-1.5"
            >
              <span>📱</span>
              <span className="font-medium truncate">SUE Mobile App</span>
            </button>
            <button
              onClick={() => handleAction(() => onOpenProject('nipon-spa'))}
              className="px-3 py-1.5 text-xs text-left hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-1.5"
            >
              <span>💆</span>
              <span className="font-medium truncate">Nipon Spa</span>
            </button>
          </div>
        </div>

        {/* Trajetória */}
        <button
          onClick={() => handleAction(() => onOpenWindow('trajetoria'))}
          className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-[#000080] hover:text-white text-left w-full cursor-pointer group"
        >
          <RetroChartIcon className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="font-semibold leading-tight">
              {language === 'pt' ? 'Trajetória & Carreira' : 'Career Timeline'}
            </span>
            <span className="text-[10px] text-gray-600 group-hover:text-gray-300">
              {language === 'pt' ? 'Experiência profissional' : 'Experience & education'}
            </span>
          </div>
        </button>

        {/* Viagens & Surf */}
        <button
          onClick={() => handleAction(() => onOpenWindow('viagens'))}
          className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-[#000080] hover:text-white text-left w-full cursor-pointer group"
        >
          <FolderIcon badge="plane" className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="font-semibold leading-tight">
              {language === 'pt' ? 'Viagens & Natureza' : 'Travel & Nature'}
            </span>
            <span className="text-[10px] text-gray-600 group-hover:text-gray-300">
              {language === 'pt' ? 'Fotografias & Histórias' : 'Photos & Stories'}
            </span>
          </div>
        </button>

        {/* Contacto */}
        <button
          onClick={() => handleAction(() => onOpenWindow('contacto'))}
          className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-[#000080] hover:text-white text-left w-full cursor-pointer group"
        >
          <RetroMailIcon className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="font-semibold leading-tight">
              {language === 'pt' ? 'Contacto' : 'Contact'}
            </span>
            <span className="text-[10px] text-gray-600 group-hover:text-gray-300">
              {language === 'pt' ? 'Enviar mensagem direta' : 'Send direct message'}
            </span>
          </div>
        </button>

        {/* Separator */}
        <div className="border-t border-[#808080] border-b border-white my-1" />

        {/* Language Toggle */}
        <button
          onClick={() => handleAction(onToggleLanguage)}
          className="flex items-center justify-between px-3 py-1 hover:bg-[#000080] hover:text-white text-left w-full cursor-pointer text-xs"
        >
          <span className="flex items-center gap-2">
            <span>🌐</span>
            <span>{language === 'pt' ? 'Idioma' : 'Language'}</span>
          </span>
          <span className="font-bold uppercase bg-black/10 px-1.5 py-0.5 rounded text-[10px]">
            {language === 'pt' ? 'PT (Português)' : 'EN (English)'}
          </span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleMute}
          className="flex items-center justify-between px-3 py-1 hover:bg-[#000080] hover:text-white text-left w-full cursor-pointer text-xs"
        >
          <span className="flex items-center gap-2">
            <SpeakerIcon muted={isMuted} className="w-3.5 h-3.5" />
            <span>{language === 'pt' ? 'Efeitos Sonoros' : 'Sound Effects'}</span>
          </span>
          <span className="text-[10px] font-mono">
            {isMuted ? (language === 'pt' ? 'Mudo' : 'Off') : (language === 'pt' ? 'Ativo' : 'On')}
          </span>
        </button>

        {/* Separator */}
        <div className="border-t border-[#808080] border-b border-white my-1" />

        {/* Shutdown / Restart */}
        <button
          onClick={() => handleAction(onShutdown)}
          className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white text-left w-full cursor-pointer text-xs font-semibold"
        >
          <span>🔌</span>
          <span>{language === 'pt' ? 'Desligar o Sistema...' : 'Shut Down System...'}</span>
        </button>
      </div>
    </div>
  );
};
