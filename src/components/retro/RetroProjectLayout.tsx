/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { RetroButton } from './RetroButton';
import { Language } from './RetroTypes';
import { retroAudio } from './RetroAudio';

export interface RetroProjectTab {
  id: string;
  labelPt: string;
  labelEn: string;
  iconName?: string;
  badge?: string;
  content: React.ReactNode;
}

export interface RetroProjectLayoutProps {
  projectId?: string;
  projectNumber: string;
  projectExeName?: string;
  title: string;
  subtitle?: string;
  category: string;
  year?: string;
  roles?: string[];
  language: Language;
  onBack: () => void;
  onNextProject?: () => void;
  onPrevProject?: () => void;
  prevProjectName?: string;
  nextProjectName?: string;
  tabs?: RetroProjectTab[];
  onToggleLanguage?: () => void;
  children?: React.ReactNode;
}

export const RetroProjectLayout: React.FC<RetroProjectLayoutProps> = ({
  projectNumber,
  projectExeName,
  title,
  subtitle,
  category,
  year = '2026',
  roles = [],
  language,
  onBack,
  onNextProject,
  onPrevProject,
  prevProjectName,
  nextProjectName,
  tabs = [],
  onToggleLanguage,
  children,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || 'overview');
  const [activeMenu, setActiveMenu] = useState<'file' | 'edit' | 'view' | 'help' | null>(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const isPt = language === 'pt';
  const menuRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update active tab on scroll based on section positions
  useEffect(() => {
    if (tabs.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY + 250;
      for (let i = tabs.length - 1; i >= 0; i--) {
        const tab = tabs[i];
        const el = document.getElementById(tab.id);
        if (el && el.offsetTop <= scrollY) {
          setActiveTabId(tab.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tabs]);

  const handleTabClick = (tabId: string) => {
    retroAudio.playClick();
    setActiveTabId(tabId);
    const targetEl = document.getElementById(tabId);
    if (targetEl) {
      const topOffset = targetEl.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#008080] p-1.5 sm:p-4 md:p-6 pb-20 flex flex-col items-center">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-[99999] win-border-raised bg-[#FFFFEE] text-black px-4 py-2 font-mono text-xs shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <span>ℹ️</span>
            <span className="font-bold">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Retro Window Container */}
      <div className="w-full max-w-6xl win-border-raised bg-[#C0C0C0] text-black shadow-2xl flex flex-col my-auto relative">
        {/* 1. Title bar */}
        <div className="win-titlebar-active flex items-center justify-between px-2 py-1.5 select-none sticky top-0 z-40">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="text-sm">📁</span>
            <span className="font-bold text-xs sm:text-sm text-white truncate drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
              {projectExeName || `${title}.exe`} — [{projectNumber}] {title}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => {
                retroAudio.playClick();
                onBack();
              }}
              title={isPt ? "Voltar ao Desktop" : "Back to Desktop"}
              className="w-5 h-5 bg-[#C0C0C0] text-black font-bold text-xs flex items-center justify-center border-t border-l border-white border-b border-r border-[#404040] shadow-[0.5px_0.5px_0px_#000000] cursor-pointer hover:bg-[#E8AF30]"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 2. Functional Menu Bar */}
        <div ref={menuRef} className="bg-[#C0C0C0] border-b border-[#808080] px-2 py-0.5 text-xs text-black flex items-center gap-2 select-none relative z-30">
          {/* Ficheiro */}
          <div className="relative">
            <button
              onClick={() => {
                retroAudio.playClick();
                setActiveMenu(activeMenu === 'file' ? null : 'file');
              }}
              className={`px-2 py-0.5 cursor-pointer ${activeMenu === 'file' ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'}`}
            >
              {isPt ? 'Ficheiro' : 'File'}
            </button>
            {activeMenu === 'file' && (
              <div className="absolute left-0 top-full mt-0.5 w-52 bg-[#C0C0C0] win-border-raised py-1 shadow-2xl z-50 text-xs">
                <a
                  href="/Raissa_Moria_CV_2026.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setActiveMenu(null)}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer"
                >
                  <span>📄</span>
                  <span>{isPt ? 'Descarregar CV (PDF)' : 'Download CV (PDF)'}</span>
                </a>
                <button
                  onClick={() => {
                    setActiveMenu(null);
                    window.print();
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer w-full text-left"
                >
                  <span>🖨️</span>
                  <span>{isPt ? 'Imprimir / Guardar PDF' : 'Print / Save as PDF'}</span>
                </button>
                <div className="border-t border-[#808080] my-1" />
                <button
                  onClick={() => {
                    setActiveMenu(null);
                    onBack();
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer w-full text-left font-bold"
                >
                  <span>✕</span>
                  <span>{isPt ? 'Fechar & Voltar ao Desktop' : 'Close & Back to Desktop'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Editar */}
          <div className="relative">
            <button
              onClick={() => {
                retroAudio.playClick();
                setActiveMenu(activeMenu === 'edit' ? null : 'edit');
              }}
              className={`px-2 py-0.5 cursor-pointer ${activeMenu === 'edit' ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'}`}
            >
              {isPt ? 'Editar' : 'Edit'}
            </button>
            {activeMenu === 'edit' && (
              <div className="absolute left-0 top-full mt-0.5 w-56 bg-[#C0C0C0] win-border-raised py-1 shadow-2xl z-50 text-xs">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showToast(isPt ? 'Link do projeto copiado!' : 'Project link copied!');
                    setActiveMenu(null);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer w-full text-left"
                >
                  <span>🔗</span>
                  <span>{isPt ? 'Copiar Link do Projeto' : 'Copy Project Link'}</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('raissagfdhb@gmail.com');
                    showToast(isPt ? 'Email copiado: raissagfdhb@gmail.com' : 'Email copied: raissagfdhb@gmail.com');
                    setActiveMenu(null);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer w-full text-left"
                >
                  <span>✉</span>
                  <span>{isPt ? 'Copiar Email de Contacto' : 'Copy Designer Email'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Ver */}
          <div className="relative">
            <button
              onClick={() => {
                retroAudio.playClick();
                setActiveMenu(activeMenu === 'view' ? null : 'view');
              }}
              className={`px-2 py-0.5 cursor-pointer ${activeMenu === 'view' ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'}`}
            >
              {isPt ? 'Ver' : 'View'}
            </button>
            {activeMenu === 'view' && (
              <div className="absolute left-0 top-full mt-0.5 w-52 bg-[#C0C0C0] win-border-raised py-1 shadow-2xl z-50 text-xs">
                {onToggleLanguage && (
                  <button
                    onClick={() => {
                      onToggleLanguage();
                      setActiveMenu(null);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer w-full text-left"
                  >
                    <span>🌐</span>
                    <span>{isPt ? 'Mudar para Inglês (EN)' : 'Switch to Portuguese (PT)'}</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setActiveMenu(null);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer w-full text-left"
                >
                  <span>⬆</span>
                  <span>{isPt ? 'Voltar ao Topo' : 'Scroll to Top'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Ajuda */}
          <div className="relative">
            <button
              onClick={() => {
                retroAudio.playClick();
                setActiveMenu(activeMenu === 'help' ? null : 'help');
              }}
              className={`px-2 py-0.5 cursor-pointer ${activeMenu === 'help' ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'}`}
            >
              {isPt ? 'Ajuda' : 'Help'}
            </button>
            {activeMenu === 'help' && (
              <div className="absolute left-0 top-full mt-0.5 w-56 bg-[#C0C0C0] win-border-raised py-1 shadow-2xl z-50 text-xs">
                <button
                  onClick={() => {
                    setInfoModalOpen(true);
                    setActiveMenu(null);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer w-full text-left"
                >
                  <span>ℹ️</span>
                  <span>{isPt ? 'Sobre este Estudo de Caso' : 'About this Case Study'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. Toolbar with Navigation & Project Info */}
        <div className="bg-[#C0C0C0] border-b-2 border-[#808080] p-2 flex flex-wrap items-center justify-between gap-2 select-none sticky top-[31px] z-30">
          <div className="flex flex-wrap items-center gap-1.5">
            <RetroButton size="sm" onClick={onBack}>
              ← {isPt ? 'Voltar ao Desktop' : 'Back to Desktop'}
            </RetroButton>

            <div className="h-5 w-[1px] bg-[#808080] border-r border-white mx-1" />

            {onPrevProject && (
              <RetroButton size="sm" onClick={onPrevProject}>
                ◀ {isPt ? 'Anterior' : 'Previous'} {prevProjectName ? `(${prevProjectName})` : ''}
              </RetroButton>
            )}

            {onNextProject && (
              <RetroButton size="sm" onClick={onNextProject}>
                {isPt ? 'Próximo' : 'Next'} {nextProjectName ? `(${nextProjectName})` : ''} ▶
              </RetroButton>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onToggleLanguage && (
              <RetroButton size="sm" onClick={onToggleLanguage}>
                🌐 {isPt ? 'EN (English)' : 'PT (Português)'}
              </RetroButton>
            )}

            <span className="font-mono text-xs px-2 py-0.5 win-border-sunken-grey font-bold text-[#000080]">
              CASE #{projectNumber} • {year}
            </span>
          </div>
        </div>

        {/* 4. Project Header Banner */}
        <div className="bg-[#FFFFF0] border-b-2 border-[#808080] p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider bg-[#000080] text-white px-2 py-0.5">
                {category}
              </span>
              <span className="text-xs text-gray-500 font-mono">
                {isPt ? 'Estudo de Caso Profissional • Lovable' : 'Professional Case Study • Lovable'}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#000080] tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-base text-gray-700 font-sans mt-1 max-w-3xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {roles.length > 0 && (
            <div className="flex flex-wrap md:flex-col items-start md:items-end gap-1 shrink-0 bg-white/70 p-2 border border-gray-300">
              <span className="text-[10px] font-mono text-gray-600 uppercase font-bold">
                {isPt ? 'Competências & Tecnologias:' : 'Skills & Technologies:'}
              </span>
              <div className="flex flex-wrap gap-1 max-w-xs justify-end">
                {roles.map((role) => (
                  <span
                    key={role}
                    className="text-[10px] bg-white border border-[#808080] px-1.5 py-0.5 font-medium text-gray-800"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 5. Sticky Retro Anchor Navigation Tabs */}
        {tabs.length > 0 && (
          <div className="sticky top-[69px] z-20 flex flex-wrap items-end gap-1 border-b-2 border-[#808080] px-2 pt-2 bg-[#C0C0C0] shadow-sm">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              const label = isPt ? tab.labelPt : tab.labelEn;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold select-none cursor-pointer transition-none
                    ${isActive
                      ? 'bg-[#FFFFFF] text-[#000080] -mb-[2px] z-10 border-t-2 border-l-2 border-white border-r-2 border-[#404040] shadow-[0px_-1px_0px_#000000] pb-2 font-bold'
                      : 'bg-[#B0B0B0] text-[#333333] border-t-2 border-l-2 border-white border-r-2 border-[#404040] hover:bg-[#D4D0C8] pb-1'
                    }
                  `}
                >
                  {tab.badge && (
                    <span className={`text-[9px] font-mono px-1 py-0.2 rounded-none ${isActive ? 'bg-[#000080] text-white' : 'bg-black/20 text-black'}`}>
                      {tab.badge}
                    </span>
                  )}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* 6. Main Case Study Content Area (Natural Scroll without cramped inner restrictions) */}
        <div className="win-border-sunken-grey m-1.5 p-3 sm:p-6 md:p-8 bg-[#FFFFFF] text-black">
          {tabs.length > 0 ? (
            <div className="flex flex-col gap-14 sm:gap-20">
              {tabs.map((tab) => (
                <section key={tab.id} id={tab.id} className="scroll-mt-32 flex flex-col gap-4">
                  {tab.content}
                </section>
              ))}
            </div>
          ) : (
            children
          )}
        </div>

        {/* 7. Status Bar */}
        <div className="bg-[#C0C0C0] border-t border-[#808080] px-3 py-1 text-[11px] text-gray-700 flex flex-wrap items-center justify-between select-none">
          <div className="flex items-center gap-3">
            <span className="text-green-700 font-bold">✓ {isPt ? 'Documento carregado 100%' : 'Document loaded 100%'}</span>
            <span>|</span>
            <span>{category}</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Raíssa Moriá Portfolio OS 98</span>
            <span>|</span>
            <span className="font-mono">PRONTO</span>
          </div>
        </div>
      </div>

      {/* Info Dialog Modal */}
      {infoModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="win-border-raised bg-[#C0C0C0] w-full max-w-md p-1 shadow-2xl text-black">
            <div className="win-titlebar-active flex items-center justify-between px-2 py-1 mb-2">
              <span className="font-bold text-xs text-white">Sobre a Plataforma de Helpdesk</span>
              <button
                onClick={() => setInfoModalOpen(false)}
                className="w-4 h-4 bg-[#C0C0C0] text-black font-bold text-xs flex items-center justify-center border border-white"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-white win-border-sunken text-xs space-y-2.5 font-sans">
              <h4 className="font-bold text-[#000080] text-sm">Design Thinking + Lovable</h4>
              <p>
                {isPt 
                  ? 'Este projeto foi desenvolvido em contexto empresarial real. Para respeitar os acordos de confidencialidade (NDA), os dados de negócio e capturas reais foram substituídos por representações gráficas conceituais e abstratas.'
                  : 'Developed in a professional corporate environment. To respect confidentiality agreements (NDA), internal business data and real screenshots were replaced with conceptual abstract representations.'
                }
              </p>
              <p>
                {isPt
                  ? 'A plataforma foi construída em Lovable sob a direção humana de Design Thinking de Raíssa Moriá, garantindo uma estrutura de produto ergonómica para Requerentes, Agentes e Administradores.'
                  : 'Built on Lovable under the human Design Thinking direction of Raíssa Moriá, establishing structured UX workflows for Requesters, Agents, and Administrators.'
                }
              </p>
            </div>
            <div className="flex justify-end p-2 bg-[#C0C0C0]">
              <RetroButton size="sm" onClick={() => setInfoModalOpen(false)}>
                OK
              </RetroButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
