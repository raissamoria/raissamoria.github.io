/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  children,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || 'overview');
  const isPt = language === 'pt';

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <div className="min-h-screen bg-[#008080] p-1.5 sm:p-4 md:p-6 pb-16 flex flex-col items-center">
      {/* Retro Window Container */}
      <div className="w-full max-w-6xl win-border-raised bg-[#C0C0C0] text-black shadow-2xl flex flex-col my-auto">
        {/* 1. Title bar */}
        <div className="win-titlebar-active flex items-center justify-between px-2 py-1.5 select-none">
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
              title="Fechar / Voltar ao Desktop"
              className="w-5 h-5 bg-[#C0C0C0] text-black font-bold text-xs flex items-center justify-center border-t border-l border-white border-b border-r border-[#404040] shadow-[0.5px_0.5px_0px_#000000] cursor-pointer hover:bg-[#E8AF30]"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 2. Menu bar */}
        <div className="bg-[#C0C0C0] border-b border-[#808080] px-3 py-1 text-xs text-black flex items-center gap-4 select-none">
          <span className="cursor-default hover:bg-[#000080] hover:text-white px-1">
            {isPt ? 'Ficheiro' : 'File'}
          </span>
          <span className="cursor-default hover:bg-[#000080] hover:text-white px-1">
            {isPt ? 'Editar' : 'Edit'}
          </span>
          <span className="cursor-default hover:bg-[#000080] hover:text-white px-1">
            {isPt ? 'Ver' : 'View'}
          </span>
          <span className="cursor-default hover:bg-[#000080] hover:text-white px-1">
            {isPt ? 'Navegar' : 'Browse'}
          </span>
          <span className="cursor-default hover:bg-[#000080] hover:text-white px-1">
            {isPt ? 'Ajuda' : 'Help'}
          </span>
        </div>

        {/* 3. Toolbar with Navigation & Project Info */}
        <div className="bg-[#C0C0C0] border-b-2 border-[#808080] p-2 flex flex-wrap items-center justify-between gap-2 select-none">
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
            <span className="font-mono text-xs px-2 py-0.5 win-border-sunken-grey font-bold text-[#000080]">
              CASE #{projectNumber} • {year}
            </span>
          </div>
        </div>

        {/* 4. Project Header Banner */}
        <div className="bg-[#FFFFF0] border-b-2 border-[#808080] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider bg-[#000080] text-white px-2 py-0.5">
                {category}
              </span>
              <span className="text-xs text-gray-500 font-mono">
                {isPt ? 'Estudo de Caso Profissional' : 'Professional Case Study'}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#000080] tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-700 font-sans mt-0.5 max-w-3xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {roles.length > 0 && (
            <div className="flex flex-wrap md:flex-col items-start md:items-end gap-1 shrink-0">
              <span className="text-[10px] font-mono text-gray-500 uppercase font-bold">
                {isPt ? 'Competências & Papel:' : 'Skills & Role:'}
              </span>
              <div className="flex flex-wrap gap-1">
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

        {/* 5. Retro Tabs Bar */}
        {tabs.length > 0 && (
          <div className="flex flex-wrap items-end gap-1 border-b-2 border-[#808080] px-2 pt-2 bg-[#C0C0C0]">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              const label = isPt ? tab.labelPt : tab.labelEn;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    retroAudio.playClick();
                    setActiveTabId(tab.id);
                  }}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold select-none cursor-pointer
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

        {/* 6. Active Tab Content Area */}
        <div className="win-border-sunken-grey m-1.5 p-3 sm:p-6 bg-[#FFFFFF] text-black overflow-y-auto max-h-[calc(100vh-230px)]">
          {tabs.length > 0 && activeTab ? activeTab.content : children}
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
    </div>
  );
};
