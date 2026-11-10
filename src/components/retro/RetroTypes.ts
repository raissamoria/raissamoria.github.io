/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type WindowId = 
  | 'portfolio' 
  | 'sobre' 
  | 'projetos' 
  | 'trajetoria' 
  | 'viagens' 
  | 'surf' 
  | 'natureza'
  | 'contacto'
  | 'lixeira'
  | 'project_view';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size?: { width: number | string; height: number | string };
  iconType: string;
}

export type Language = 'pt' | 'en';
