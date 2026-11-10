/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { retroAudio } from './RetroAudio';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface RetroTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const RetroTabs: React.FC<RetroTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-end gap-1 border-b-2 border-[#808080] px-2 pt-2 bg-[#C0C0C0] ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => {
              retroAudio.playClick();
              onChange(tab.id);
            }}
            className={`
              relative flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold select-none cursor-pointer
              transition-none
              ${isActive 
                ? 'bg-[#C0C0C0] text-black -mb-[2px] z-10 border-t-2 border-l-2 border-white border-r-2 border-[#404040] shadow-[0px_-1px_0px_#000000] pb-2 font-bold' 
                : 'bg-[#B0B0B0] text-[#333333] border-t-2 border-l-2 border-white border-r-2 border-[#404040] hover:bg-[#C0C0C0] pb-1'
              }
            `}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
