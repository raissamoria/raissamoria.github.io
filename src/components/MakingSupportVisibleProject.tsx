/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, 
  CheckCircle2, 
  AlertCircle, 
  Workflow, 
  Shield, 
  User, 
  Headphones, 
  Sliders, 
  FileCheck, 
  HelpCircle, 
  X,
  Layers,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { RetroProjectLayout, RetroProjectTab } from './retro/RetroProjectLayout';
import { retroAudio } from './retro/RetroAudio';

// Assets
// @ts-ignore
import coverImg from '../assets/images/help.png';
// @ts-ignore
import blueprintImg from '../assets/images/support_blueprint_system.jpg';
// @ts-ignore
import designSystemImg from '../assets/images/support_design_system.jpg';

interface MakingSupportVisibleProjectProps {
  language: Language;
  onBack: () => void;
  onNextProject?: () => void;
  onPrevProject?: () => void;
  onToggleLanguage?: () => void;
}

export const MakingSupportVisibleProject: React.FC<MakingSupportVisibleProjectProps> = ({
  language,
  onBack,
  onNextProject,
  onPrevProject,
  onToggleLanguage,
}) => {
  const [selectedRole, setSelectedRole] = useState<'requester' | 'agent' | 'admin'>('requester');
  const [activeLifecycleStep, setActiveLifecycleStep] = useState<number>(0);
  const [activeProcessStage, setActiveProcessStage] = useState<number>(0);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const isPt = language === 'pt';

  // 1. ROLES DATA (Preserved in full depth)
  const rolesData = {
    requester: {
      title: isPt ? 'Requerente (Requester)' : 'Requester',
      badge: isPt ? 'PERFIL UTILIZADOR' : 'FRONTSTAGE USER',
      icon: <User className="w-4 h-4 text-[#000080]" />,
      color: '#000080',
      description: isPt 
        ? 'Colaboradores de qualquer departamento que necessitam de apoio técnico ou operacional em sistemas internos da organização.' 
        : 'Employees across any department who require technical or operational assistance in internal systems.',
      actions: isPt ? [
        'Reporta problemas operacionais e de software através de formulários estruturados.',
        'Cria e submete tickets de suporte com descrição detalhada e anexos contextuais.',
        'Acompanha o progresso dos pedidos em tempo real sem necessidade de cobranças manuais.',
        'Acede ao histórico completo dos seus tickets e notas de resolução.'
      ] : [
        'Reports operational and software issues through structured forms.',
        'Creates and submits support tickets with detailed descriptions and context attachments.',
        'Tracks real-time ticket progress without needing private follow-ups.',
        'Accesses comprehensive personal ticket history and resolution notes.'
      ],
      uiFocus: isPt 
        ? 'Simplicidade, submissão sem atrito, clareza absoluta de estado em tempo real.' 
        : 'Simplicity, frictionless submission, absolute real-time state clarity.'
    },
    agent: {
      title: isPt ? 'Agente (Agent)' : 'Agent',
      badge: isPt ? 'ESPAÇO DO ESPECIALISTA' : 'SPECIALIST WORKSPACE',
      icon: <Headphones className="w-4 h-4 text-emerald-700" />,
      color: '#006400',
      description: isPt 
        ? 'Especialistas técnicos atribuídos a projetos específicos que analisam, investigam e resolvem tickets no dia a dia.' 
        : 'Specialists assigned to specific project domains who diagnose, update, and resolve tickets.',
      actions: isPt ? [
        'Recebe tickets estritamente associados aos projetos sob a sua responsabilidade.',
        'Analisa o contexto detalhado, nível de urgência e ambiente do problema.',
        'Gere os estados do pedido desde a triagem à resolução efetiva.',
        'Regista intervenções técnicas, notas internas e atualizações de progresso.'
      ] : [
        'Receives tickets strictly associated with assigned project domains.',
        'Reviews detailed ticket context, urgency, and system environment.',
        'Manages request states from triage to active resolution.',
        'Records technical interventions, internal notes, and solution updates.'
      ],
      uiFocus: isPt 
        ? 'Foco, priorização de tarefas, contexto de projeto, registo ágil de intervenções.' 
        : 'Focus, prioritization, project context, fast intervention logging.'
    },
    admin: {
      title: isPt ? 'Administrador (Admin)' : 'Administrator',
      badge: isPt ? 'BACKOFFICE OPERACIONAL' : 'OPERATIONAL BACKOFFICE',
      icon: <Sliders className="w-4 h-4 text-purple-700" />,
      color: '#4B0082',
      description: isPt 
        ? 'Líderes operacionais e gestores que supervisionam o ecossistema global de suporte e governação dos fluxos de trabalho.' 
        : 'Operations leads and managers overseeing the health and governance of the entire support ecosystem.',
      actions: isPt ? [
        'Gere a infraestrutura de backoffice e políticas de acesso da organização.',
        'Supervisiona tickets, projetos, categorias de suporte e utilizadores.',
        'Gere informações operacionais, equipas técnicas e fluxos de escalamento.',
        'Acede a métricas de SLA, tempos médios de resolução e dashboards operacionais.'
      ] : [
        'Manages the central backoffice infrastructure and security policies.',
        'Oversees tickets, project assignments, categories, and user permissions.',
        'Manages operational information, teams, and escalation protocols.',
        'Accesses SLA metrics, average resolution velocities, and dashboards.'
      ],
      uiFocus: isPt 
        ? 'Controlo, governança, visão macro, flexibilidade operacional.' 
        : 'Control, governance, macro visibility, operational agility.'
    }
  };

  // 2. DESIGN THINKING PROCESS (5 Stages)
  const processStages = [
    {
      number: '01',
      name: isPt ? 'Compreender' : 'Understand',
      label: isPt ? 'Análise Operacional & Vazio de Suporte' : 'Operational Analysis & Support Void',
      purpose: isPt 
        ? 'Mapear o vazio operacional gerado pela ausência de um canal formal de suporte. Analisar canais informais (DMs de Teams, Slack, WhatsApp, conversas de corredor e e-mails privados) e identificar gargalos críticos onde pedidos ficavam esquecidos sem qualquer registo.' 
        : 'Unpack the operational friction caused by the absence of a support channel. Map informal communication channels (Teams/Slack DMs, corridor calls, private emails) and identify critical bottlenecks that left issues unrecorded.'
    },
    {
      number: '02',
      name: isPt ? 'Definir' : 'Define',
      label: isPt ? 'Perfis & Limites de Informação' : 'Role & Scope Definition',
      purpose: isPt 
        ? 'Definir três arquétipos de utilizador distintos: Requerente, Agente e Administrador. Estabelecer permissões claras, limites de dados e necessidades de informação para cada perfil, evitando dispersão e poluição visual.' 
        : 'Define three distinct user archetypes: Requester, Agent, and Administrator. Establish clear permissions, data boundaries, and information requirements for each persona to prevent operational spillover.'
    },
    {
      number: '03',
      name: isPt ? 'Estruturar' : 'Structure',
      label: isPt ? 'Arquitetura de Informação & Taxonomia' : 'Information Architecture & Taxonomy',
      purpose: isPt 
        ? 'Desenhar a taxonomia da plataforma: categorização de tickets por projeto, ciclo de vida do pedido (Novo → Triado → Atribuído → Em Curso → Resolvido) e registo cronológico de intervenções para auditoria e transparência.' 
        : 'Design the underlying system model: project-based ticket categorization, ticket lifecycle states (New → Triaged → Assigned → In Progress → Resolved), and structured intervention logging for auditability.'
    },
    {
      number: '04',
      name: isPt ? 'Construir' : 'Build',
      label: isPt ? 'Implementação em Lovable' : 'Low-Code Implementation in Lovable',
      purpose: isPt 
        ? 'Converter wireframes e fluxos de interação num produto digital funcional através da ferramenta Lovable. O raciocínio humano de design guiou a estrutura e a arquitetura, enquanto o Lovable acelerou o ciclo de desenvolvimento funcional.' 
        : 'Translate UX wireframes and interaction patterns into a functional digital platform using Lovable. Human design reasoning guided the architecture, while Lovable provided rapid full-stack execution.'
    },
    {
      number: '05',
      name: isPt ? 'Iterar' : 'Iterate',
      label: isPt ? 'Refinamento & Ergonomia da Interface' : 'Refinement & Interface Ergonomics',
      purpose: isPt 
        ? 'Ajustar a ergonomia dos formulários, navegação adaptada a cada perfil, scannability da lista de tickets e clareza das etiquetas de estado para assegurar uma experiência fluida no desktop e ecrãs compactos.' 
        : 'Iterate on form ergonomics, role-specific navigation menus, ticket scannability, and status badge legibility to ensure the platform feels effortless across desktop and compact screens.'
    }
  ];

  // 3. PRODUCT DESIGN DECISIONS (5 Decisions)
  const designDecisions = [
    {
      num: '01',
      titlePt: 'Submissão de Tickets Sem Atrito',
      titleEn: 'Frictionless Ticket Submission',
      descPt: 'Formulário focado com preenchimento preditivo do projeto, seleção visual de urgência e validação em linha para garantir tickets com contexto completo desde o primeiro instante.',
      descEn: 'Focused form with predictive project assignment, visual urgency toggles, and inline validation to guarantee rich context at creation.'
    },
    {
      num: '02',
      titlePt: 'Espaço de Trabalho Focado do Agente',
      titleEn: 'Agent Focused Workspace',
      descPt: 'Filtros dedicados por projeto atribuído, permitindo ao especialista concentrar-se na resolução técnica sem poluição visual ou tickets fora do seu domínio.',
      descEn: 'Dedicated project domain filters allowing specialists to concentrate on technical diagnosis without cross-domain visual clutter.'
    },
    {
      num: '03',
      titlePt: 'Governança & Backoffice Centralizado',
      titleEn: 'Centralized Admin Governance',
      descPt: 'Painel administrativo para gestão de equipas, atribuição de projetos e métricas agregadas de SLA sem complexidade desnecessária.',
      descEn: 'Administrative control room for team routing, project taxonomy, and aggregated SLA health metrics without enterprise bloat.'
    },
    {
      num: '04',
      titlePt: 'Transparência de Estado em Tempo Real',
      titleEn: 'Real-Time State Transparency',
      descPt: 'Etiquetas de estado com cores padronizadas e timeline cronológica de intervenções, eliminando cobranças manuais por chat privado.',
      descEn: 'Standardized state tags and chronological intervention timelines that eliminate the need for anxiety-driven manual follow-ups.'
    },
    {
      num: '05',
      titlePt: 'Construção Ágil com Lovable',
      titleEn: 'Agile Assembly with Lovable',
      descPt: 'Adoção do Lovable para materializar a arquitetura e componentes com velocidade, mantendo cada decisão sob rigoroso controlo de Design Thinking humano.',
      descEn: 'Leveraging Lovable for high-speed implementation while keeping every user workflow firmly grounded in human design reasoning.'
    }
  ];

  // 4. LIFECYCLE STAGES (Interactive Flow)
  const lifecycleStages = [
    {
      step: '01',
      title: isPt ? 'Problema Reportado' : 'Issue Reported',
      role: isPt ? 'Requerente' : 'Requester',
      action: isPt 
        ? 'Um colaborador encontra um entrave no sistema e submete um ticket estruturado pelo portal central.' 
        : 'An employee encounters a system roadblock and submits a structured ticket via the central portal.',
      data: isPt ? 'Categoria, descrição detalhada, anexo contextual, indicador de urgência' : 'Category, detailed description, contextual attachment, urgency flag',
      status: isPt ? 'NOVO' : 'NEW'
    },
    {
      step: '02',
      title: isPt ? 'Ticket Criado & Triado' : 'Ticket Created & Classified',
      role: isPt ? 'Motor da Plataforma' : 'Platform Engine',
      action: isPt 
        ? 'O sistema valida os dados submetidos, gera um identificador único auditável e associa o pedido ao domínio do projeto correto.' 
        : 'The system validates inputs, stamps a unique auditable ID, and maps the issue to its associated project domain.',
      data: isPt ? 'Ticket #TK-842, Tag do Projeto, Timestamp' : 'Ticket #TK-842, Project Tag, Timestamp',
      status: isPt ? 'TRIADO' : 'TRIAGED'
    },
    {
      step: '03',
      title: isPt ? 'Encaminhamento por Projeto' : 'Project Context Routing',
      role: isPt ? 'Atribuição ao Agente' : 'Agent Assignment',
      action: isPt 
        ? 'O pedido surge automaticamente na fila do projeto correspondente, acessível apenas aos especialistas autorizados.' 
        : 'The request automatically surfaces in the assigned project queue, visible only to authorized specialists.',
      data: isPt ? 'Especialista atribuído, contagem de SLA' : 'Assigned specialist, SLA countdown',
      status: isPt ? 'ATRIBUÍDO' : 'ASSIGNED'
    },
    {
      step: '04',
      title: isPt ? 'Intervenção do Agente' : 'Agent Intervention',
      role: isPt ? 'Agente Técnico' : 'Technical Agent',
      action: isPt 
        ? 'O agente investiga a raiz do problema, regista notas técnicas internas, executa a resolução e comunica o avanço ao requerente.' 
        : 'The agent investigates root cause, logs diagnostics, performs the resolution, and communicates progress.',
      data: isPt ? 'Histórico de intervenção, registo interno de diagnóstico' : 'Intervention history, internal diagnostic log',
      status: isPt ? 'EM CURSO' : 'IN PROGRESS'
    },
    {
      step: '05',
      title: isPt ? 'Acompanhamento & Resolução' : 'Resolution Tracking & Closure',
      role: isPt ? 'Requerente & Admin' : 'Requester & Admin',
      action: isPt 
        ? 'O requerente valida a resolução; o dashboard de administração grava métricas de tempo de resposta e arquiva a auditoria.' 
        : 'Requester confirms resolution; admin dashboard captures velocity metrics and archives the audit trail.',
      data: isPt ? 'Confirmação de satisfação, timestamp de fecho' : 'Satisfaction confirmation, resolution timestamp',
      status: isPt ? 'RESOLVIDO' : 'RESOLVED'
    }
  ];

  // =========================================================================
  // CONTINUOUS SECTIONS (Rendered sequentially with anchor targets)
  // =========================================================================

  // SECTION 1: CONTEXTO & ENQUADRAMENTO
  const OverviewSection = (
    <div className="flex flex-col gap-6 text-[#1A1A1A]">
      {/* Intro Notepad Header */}
      <div className="bg-[#FFFFEE] border border-[#d0c8a8] p-4 sm:p-6 shadow-sm rounded-[2px]">
        <div className="flex flex-wrap items-center justify-between border-b border-[#e0d8b8] pb-2 mb-4 font-mono text-xs text-neutral-600 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#000080]">C:\DOCUMENTS\HELPDESK\OVERVIEW.TXT</span>
            <span className="text-neutral-400">|</span>
            <span>AUTORA: RAÍSSA MORIÁ</span>
          </div>
          <span className="bg-[#000080] text-white px-2 py-0.5 text-[10px] font-bold">LOVABLE + DESIGN THINKING</span>
        </div>

        <div className="flex flex-col gap-3 font-sans">
          <span className="font-mono text-xs font-bold text-[#000080] uppercase tracking-wider">
            {isPt ? '01 // CONTEXTO DO PROJETO & ENQUADRAMENTO' : '01 // PROJECT CONTEXT & FRAMING'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#073859]">
            {isPt ? 'Plataforma de Helpdesk' : 'Helpdesk Platform'}
          </h2>
          <p className="text-base sm:text-lg text-neutral-800 leading-relaxed font-sans">
            {isPt 
              ? 'Antes da criação desta plataforma, a organização não possuía qualquer canal formal de suporte. Quando os colaboradores enfrentavam um problema operacional ou técnico, contactavam diretamente a pessoa responsável por mensagens privadas, chamadas informais ou conversas no corredor.'
              : 'Before this platform existed, the organisation had no formal support channel. When employees encountered an issue, they contacted the responsible person directly via private chat or hallway conversations.'}
          </p>
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
            {isPt
              ? 'Não existia um ambiente centralizado para registar pedidos, acompanhar o seu progresso ou manter um registo estruturado de suporte. A solução foi desenhar e construir uma plataforma de Helpdesk completa através de Design Thinking, implementada com a tecnologia Lovable, servindo três perfis complementares.'
              : 'There was no centralised environment to register requests, track progress, or maintain a structured record of support interactions. The solution was to design and build a functional Helpdesk platform through Design Thinking, built using Lovable, serving 3 core user roles.'}
          </p>
        </div>
      </div>

      {/* Featured Platform Cover Image: help.png */}
      <div className="flex flex-col gap-2">
        <div 
          onClick={() => setExpandedImage(coverImg)}
          className="group cursor-pointer bg-neutral-950 border-2 border-[#808080] overflow-hidden rounded-[2px] relative shadow-lg"
        >
          <img 
            src={coverImg} 
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== window.location.origin + '/help.png') {
                target.src = '/help.png';
              }
            }}
            alt={isPt ? "Plataforma de Helpdesk - Interface Conceitual Abstrata" : "Helpdesk Platform - Conceptual Abstract Interface"} 
            className="w-full h-auto max-h-[540px] object-contain sm:object-cover transition-transform group-hover:scale-[1.01]"
          />
          <div className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-sm text-white font-mono text-xs px-3 py-1.5 flex items-center gap-2 border border-white/20 select-none shadow">
            <Maximize2 className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>{isPt ? 'AMPLIAR IMAGEM' : 'EXPAND IMAGE'}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between font-mono text-[11px] text-neutral-600 px-1 gap-2">
          <span>{isPt ? 'Figura 1.0 — Arquitetura de plataforma e direção conceitual da interface' : 'Figure 1.0 — Platform architecture & conceptual interface direction'}</span>
          <span className="text-[#000080] font-bold">{isPt ? 'Representação abstrata (NDA preservado)' : 'Abstract representation (NDA preserved)'}</span>
        </div>
      </div>

      {/* NDA Notice Box */}
      <div className="bg-[#eef4fa] border-l-4 border-[#000080] p-4 font-mono text-xs text-[#073859]">
        <div className="flex items-center gap-2 font-bold mb-1">
          <Shield className="w-4 h-4 text-[#000080]" />
          <span>{isPt ? 'NOTA DE CONFIDENCIALIDADE (NDA)' : 'CONFIDENTIALITY NOTE (NDA)'}</span>
        </div>
        <p className="font-sans text-xs text-neutral-700 leading-relaxed">
          {isPt 
            ? 'O projeto foi desenvolvido em contexto empresarial real. Devido a restrições de confidencialidade, a plataforma original, os dados comerciais internos e capturas de ecrã reais não podem ser expostos publicamente. Todas as representações visuais são conceituais, abstratas e criadas de forma independente para preservar a propriedade intelectual.'
            : 'Developed in a professional corporate environment. Due to confidentiality restrictions, internal business data cannot be shown. All visual representations are conceptual, abstract and independently created to protect proprietary assets.'}
        </p>
      </div>
    </div>
  );

  // SECTION 2: OS 3 PERFIS DA PLATAFORMA
  const RolesSection = (
    <div className="flex flex-col gap-5 text-[#1A1A1A]">
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-300 pb-2">
        <span className="font-mono text-xs font-bold text-[#000080] uppercase tracking-wider">
          {isPt ? '02 // OS 3 PERFIS DA PLATAFORMA (ARQUITETURA DE ACESSO)' : '02 // THE 3 USER PLATFORM ROLES (ACCESS HIERARCHY)'}
        </span>
        <span className="font-mono text-[11px] text-neutral-500">
          {isPt ? 'Clique nos perfis para inspecionar responsabilidades' : 'Click roles to inspect scope'}
        </span>
      </div>

      {/* Roles Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {(['requester', 'agent', 'admin'] as const).map((roleKey) => {
          const role = rolesData[roleKey];
          const isSelected = selectedRole === roleKey;
          return (
            <button
              key={roleKey}
              onClick={() => {
                retroAudio.playClick();
                setSelectedRole(roleKey);
              }}
              className={`p-3 text-left border-t-2 border-l-2 border-r-2 border-b-2 transition-all cursor-pointer font-mono ${
                isSelected 
                  ? 'bg-[#000080] text-white border-white shadow-inner font-bold' 
                  : 'bg-[#c0c0c0] text-[#1A1A1A] border-white border-r-[#404040] border-b-[#404040] hover:bg-[#d4d0c8]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-85">
                  {role.badge}
                </span>
                {role.icon}
              </div>
              <div className="text-sm font-bold truncate">
                {role.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Role Detail Card */}
      <div className="bg-white border-2 border-[#808080] p-4 sm:p-6 font-sans shadow-sm">
        <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-2 mb-3 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-[#000080]">
              {rolesData[selectedRole].title}
            </span>
            <span className="px-2 py-0.5 bg-[#f0f0f0] text-[10px] font-mono border border-neutral-300 font-bold">
              {rolesData[selectedRole].badge}
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-500">
            {isPt ? 'Responsabilidades Operacionais' : 'Operational Scope'}
          </span>
        </div>

        <p className="text-sm text-neutral-700 mb-4 leading-relaxed font-sans">
          {rolesData[selectedRole].description}
        </p>

        <div className="flex flex-col gap-2 mb-4">
          <span className="font-mono text-xs font-bold text-neutral-900 uppercase">
            {isPt ? 'Ações Principais na Plataforma:' : 'Primary Actions on Platform:'}
          </span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-neutral-800">
            {rolesData[selectedRole].actions.map((act, i) => (
              <li key={i} className="flex items-start gap-2 bg-[#F8F6F0] p-2.5 border border-neutral-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#FFFFF0] border border-[#E0D8A0] p-3 font-mono text-xs text-neutral-800 flex items-center gap-2">
          <span className="font-bold text-[#000080] shrink-0">{isPt ? 'Foco UX/UI:' : 'UX/UI Focus:'}</span>
          <span>{rolesData[selectedRole].uiFocus}</span>
        </div>
      </div>
    </div>
  );

  // SECTION 3: INVESTIGAÇÃO & O VAZIO OPERACIONAL
  const ResearchSection = (
    <div className="flex flex-col gap-6 text-[#1A1A1A]">
      <div className="bg-[#F0F4F8] border border-[#B0C4DE] p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-[#000080] font-bold mb-2">
          <span>[ 03 // INVESTIGAÇÃO: O VAZIO OPERACIONAL & DORES IDENTIFICADAS ]</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#073859] mb-3">
          {isPt ? 'Mapeando o Problema: Como o Suporte Funcionava Antes' : 'Mapping the Problem: How Support Operated Before'}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
          {isPt 
            ? 'Através de conversas com colaboradores e observação dos fluxos de trabalho diários, mapeámos como a ausência de um canal formal gerava ineficiência, ansiedade e perda de rastreabilidade na resolução de problemas.'
            : 'Through stakeholder observation, we mapped how the lack of a formal channel generated friction, anxiety, and zero traceability across support requests.'}
        </p>
      </div>

      {/* Comparison: Antes vs. Depois */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Antes */}
        <div className="bg-[#FFF0F0] border-2 border-[#E57373] p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#C62828] border-b border-[#EF9A9A] pb-2">
            <AlertCircle className="w-4 h-4" />
            <span>{isPt ? 'ANTES: SUPORTE INFORMAL DESCENTRALIZADO' : 'BEFORE: INFORMAL FRAGMENTED SUPPORT'}</span>
          </div>
          <ul className="space-y-2 text-xs font-sans text-neutral-800">
            <li className="flex items-start gap-2">
              <span className="text-[#C62828] font-mono font-bold">✕</span>
              <span>{isPt ? 'Pedidos dispersos por WhatsApp, Teams, Slack e conversas no corredor.' : 'Requests scattered across chat apps and corridor chats.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C62828] font-mono font-bold">✕</span>
              <span>{isPt ? 'Zero visibilidade para quem pede: sem previsão de resolução, SLA ou estado.' : 'Zero requester visibility: no ETA or status confirmation.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C62828] font-mono font-bold">✕</span>
              <span>{isPt ? 'Sobrecarga dos técnicos com mensagens constantes de cobrança.' : 'Technicians overwhelmed with repeated "Is it ready?" pings.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C62828] font-mono font-bold">✕</span>
              <span>{isPt ? 'Sem métricas de tempo de resposta ou histórico auditável para a gestão.' : 'No operational metrics or historical resolution logs for leads.'}</span>
            </li>
          </ul>
        </div>

        {/* Depois */}
        <div className="bg-[#F0FFF0] border-2 border-[#81C784] p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#2E7D32] border-b border-[#A5D6A7] pb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isPt ? 'DEPOIS: PLATAFORMA DE HELPDESK ESTRUTURADA' : 'AFTER: STRUCTURED HELPDESK PLATFORM'}</span>
          </div>
          <ul className="space-y-2 text-xs font-sans text-neutral-800">
            <li className="flex items-start gap-2">
              <span className="text-[#2E7D32] font-mono font-bold">✓</span>
              <span>{isPt ? 'Canal único e centralizado com formulários padronizados.' : 'Single centralised portal with standardised intake forms.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2E7D32] font-mono font-bold">✓</span>
              <span>{isPt ? 'Rastreamento transparente em tempo real para o Requerente.' : 'Transparent real-time lifecycle tracking for the requester.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2E7D32] font-mono font-bold">✓</span>
              <span>{isPt ? 'Filas segmentadas por projeto para os Agentes especialistas.' : 'Dedicated project-isolated queues for specialist agents.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2E7D32] font-mono font-bold">✓</span>
              <span>{isPt ? 'Backoffice com métricas de SLA e auditoria operacional.' : 'Admin backoffice with SLA metrics and audit accountability.'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3 Core Needs */}
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs font-bold text-[#000080] uppercase tracking-wider">
          {isPt ? 'AS 3 NECESSIDADES OPERACIONAIS CENTRAIS' : 'THE 3 CORE OPERATIONAL NEEDS'}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white border border-[#c0c0c0] p-4 shadow-xs">
            <div className="w-7 h-7 bg-[#E8AF30] text-[#1A1A1A] font-mono font-bold flex items-center justify-center text-xs mb-2">
              01
            </div>
            <h4 className="font-bold text-sm text-[#073859] mb-1">
              {isPt ? 'Visibilidade' : 'Visibility'}
            </h4>
            <p className="text-xs text-neutral-700 leading-relaxed font-sans">
              {isPt 
                ? 'Tornar visível o que antes era invisível. Saber quem pediu, quando, com que urgência e qual o estado atual do processo.'
                : 'Make visible what was once invisible. Know who requested what, when, urgency level, and current stage.'}
            </p>
          </div>

          <div className="bg-white border border-[#c0c0c0] p-4 shadow-xs">
            <div className="w-7 h-7 bg-[#E8AF30] text-[#1A1A1A] font-mono font-bold flex items-center justify-center text-xs mb-2">
              02
            </div>
            <h4 className="font-bold text-sm text-[#073859] mb-1">
              {isPt ? 'Organização' : 'Organisation'}
            </h4>
            <p className="text-xs text-neutral-700 leading-relaxed font-sans">
              {isPt 
                ? 'Associar cada pedido ao projeto correto, garantindo que apenas os especialistas habilitados atuam no ticket.'
                : 'Tag each issue to its exact project domain so only qualified specialists handle the resolution.'}
            </p>
          </div>

          <div className="bg-white border border-[#c0c0c0] p-4 shadow-xs">
            <div className="w-7 h-7 bg-[#E8AF30] text-[#1A1A1A] font-mono font-bold flex items-center justify-center text-xs mb-2">
              03
            </div>
            <h4 className="font-bold text-sm text-[#073859] mb-1">
              {isPt ? 'Controlo & Auditoria' : 'Control & Audit'}
            </h4>
            <p className="text-xs text-neutral-700 leading-relaxed font-sans">
              {isPt 
                ? 'Permitir à gestão compreender volumes de pedidos, tempos médios de resposta e pontos de estrangulamento.'
                : 'Allow management to inspect ticket volume patterns, average resolution time, and systemic bottlenecks.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // SECTION 4: METODOLOGIA: DESIGN THINKING ANTES DA FERRAMENTA
  const ProcessSection = (
    <div className="flex flex-col gap-6 text-[#1A1A1A]">
      <div className="bg-[#F0F4F8] border border-[#B0C4DE] p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-[#000080] font-bold mb-2">
          <span>[ 04 // METODOLOGIA: DESIGN THINKING ANTES DA FERRAMENTA ]</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#073859] mb-3">
          {isPt ? 'O Raciocínio Humano que Estruturou a Solução' : 'The Human Reasoning Shaping the Solution'}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
          {isPt 
            ? 'A plataforma foi construída com a tecnologia Lovable, mas a sua estrutura de produto nasceu do Design Thinking: compreender o problema, identificar necessidades dos utilizadores, definir fluxos de trabalho, organizar a informação e iterar na experiência funcional. Não foi um projeto onde a IA tomou as decisões de design.'
            : 'The platform was built with Lovable, but the product structure was shaped through Design Thinking: understanding the problem, identifying user needs, defining workflows, organising information, and iterating on the functional experience. This was not an AI auto-generated design.'}
        </p>
      </div>

      {/* 5 Stages Interactive Stepper */}
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs font-bold text-[#000080] uppercase tracking-wider">
          {isPt ? 'O PROCESSO DE DESIGN EM 5 ETAPAS' : 'THE 5-STAGE DESIGN PROCESS'}
        </span>

        {/* Stage selection tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 font-mono text-xs">
          {processStages.map((stg, idx) => {
            const isCurrent = activeProcessStage === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  retroAudio.playClick();
                  setActiveProcessStage(idx);
                }}
                className={`p-2.5 text-center border-t-2 border-l-2 border-r-2 border-b-2 cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-[#000080] text-white border-white shadow-inner font-bold'
                    : 'bg-[#c0c0c0] text-[#1A1A1A] border-white border-r-[#404040] border-b-[#404040] hover:bg-[#d4d0c8]'
                }`}
              >
                <div className="text-[10px] opacity-75">{stg.number}</div>
                <div className="font-bold text-xs truncate">{stg.name}</div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Details */}
        <div className="bg-white border-2 border-[#808080] p-4 sm:p-5">
          <div className="flex items-center gap-2 font-mono text-xs text-[#000080] font-bold border-b border-neutral-200 pb-2 mb-3">
            <span>ETAPA {processStages[activeProcessStage].number} // {processStages[activeProcessStage].label}</span>
          </div>
          <p className="text-sm text-neutral-800 leading-relaxed font-sans">
            {processStages[activeProcessStage].purpose}
          </p>
        </div>
      </div>

      {/* Information Architecture & System Blueprint */}
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs font-bold text-[#000080] uppercase tracking-wider">
          {isPt ? 'ARQUITETURA DE INFORMAÇÃO & ESQUEMA DE DADOS' : 'INFORMATION ARCHITECTURE & DATA SCHEMATIC'}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => setExpandedImage(blueprintImg)}
            className="group cursor-pointer bg-neutral-900 border-2 border-[#808080] overflow-hidden rounded-[2px] relative aspect-[4/3]"
          >
            <img 
              src={blueprintImg} 
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== window.location.origin + '/support_blueprint_system.jpg') {
                  target.src = '/support_blueprint_system.jpg';
                }
              }}
              alt="System Blueprint" 
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[10px] px-2 py-1 flex items-center gap-1.5">
              <Maximize2 className="w-3 h-3 text-[#3B82F6]" />
              <span>{isPt ? 'Ampliar Arquitetura' : 'Expand Blueprint'}</span>
            </div>
          </div>

          <div 
            onClick={() => setExpandedImage(designSystemImg)}
            className="group cursor-pointer bg-neutral-900 border-2 border-[#808080] overflow-hidden rounded-[2px] relative aspect-[4/3]"
          >
            <img 
              src={designSystemImg} 
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== window.location.origin + '/support_design_system.jpg') {
                  target.src = '/support_design_system.jpg';
                }
              }}
              alt="Design System" 
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[10px] px-2 py-1 flex items-center gap-1.5">
              <Maximize2 className="w-3 h-3 text-[#3B82F6]" />
              <span>{isPt ? 'Ampliar Design Tokens' : 'Expand Design Tokens'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // SECTION 5: DECISÕES DE PRODUTO & FLUXOS
  const DecisionsSection = (
    <div className="flex flex-col gap-6 text-[#1A1A1A]">
      <div className="bg-[#F0F4F8] border border-[#B0C4DE] p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-[#000080] font-bold mb-2">
          <span>[ 05 // DECISÕES DE PRODUTO & FLUXOS FUNCIONAIS ]</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#073859] mb-3">
          {isPt ? '5 Decisões de Design que Transformaram a Operação' : '5 Product Decisions That Transformed Operations'}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
          {isPt 
            ? 'Cada detalhe de interface foi concebido para resolver atritos específicos dos colaboradores e garantir rapidez tanto na submissão como na resolução técnica.'
            : 'Every interface pattern was designed to solve concrete operational bottlenecks and guarantee speed in both submission and resolution.'}
        </p>
      </div>

      {/* 5 Decisions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {designDecisions.map((dec, i) => (
          <div key={i} className="bg-white border border-[#c0c0c0] p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs font-bold text-[#000080] mb-1">
                DECISÃO #{dec.num}
              </div>
              <h4 className="font-bold text-sm text-[#073859] mb-2">
                {isPt ? dec.titlePt : dec.titleEn}
              </h4>
              <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                {isPt ? dec.descPt : dec.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Support Lifecycle Simulator */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-[#000080] uppercase tracking-wider">
            {isPt ? 'SIMULADOR: CICLO DE VIDA DO TICKET' : 'SIMULATOR: TICKET LIFECYCLE FLOW'}
          </span>
          <span className="font-mono text-[11px] text-neutral-500">
            {isPt ? 'Clique nos passos para avançar' : 'Click steps to advance'}
          </span>
        </div>

        {/* Lifecycle Steps Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 font-mono text-xs">
          {lifecycleStages.map((stg, idx) => {
            const isCurrent = activeLifecycleStep === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  retroAudio.playClick();
                  setActiveLifecycleStep(idx);
                }}
                className={`p-2 text-left border-t-2 border-l-2 border-r-2 border-b-2 cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-[#000080] text-white border-white shadow-inner font-bold'
                    : 'bg-[#c0c0c0] text-[#1A1A1A] border-white border-r-[#404040] border-b-[#404040] hover:bg-[#d4d0c8]'
                }`}
              >
                <div className="text-[10px] opacity-75">{stg.step}</div>
                <div className="font-bold text-xs truncate">{stg.status}</div>
              </button>
            );
          })}
        </div>

        {/* Active Lifecycle Step Box */}
        <div className="bg-white border-2 border-[#808080] p-4 sm:p-5 font-sans">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#000080]">
                PASSO {lifecycleStages[activeLifecycleStep].step}: {lifecycleStages[activeLifecycleStep].title}
              </span>
              <span className="px-2 py-0.5 bg-blue-100 text-[#000080] font-mono text-[10px] font-bold">
                {lifecycleStages[activeLifecycleStep].status}
              </span>
            </div>
            <span className="font-mono text-xs text-neutral-600">
              {isPt ? 'Ator Responsável:' : 'Responsible Actor:'} <strong>{lifecycleStages[activeLifecycleStep].role}</strong>
            </span>
          </div>

          <p className="text-sm text-neutral-800 mb-3 leading-relaxed">
            {lifecycleStages[activeLifecycleStep].action}
          </p>

          <div className="bg-[#F8F6F0] p-3 border border-neutral-300 font-mono text-xs flex items-center justify-between">
            <span className="text-neutral-600">{isPt ? 'Dados Gravados:' : 'Captured Data:'}</span>
            <span className="font-bold text-[#073859]">{lifecycleStages[activeLifecycleStep].data}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // SECTION 6: SOLUÇÃO FUNCIONAL EM OPERAÇÃO & IMPACTO QUALITATIVO
  const SolutionSection = (
    <div className="flex flex-col gap-6 text-[#1A1A1A]">
      <div className="bg-[#F0F4F8] border border-[#B0C4DE] p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-[#000080] font-bold mb-2">
          <span>[ 06 // SOLUÇÃO FUNCIONAL EM OPERAÇÃO ]</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#073859] mb-2">
          {isPt ? 'A Plataforma Funcional em Operação' : 'The Functional Platform in Operation'}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
          {isPt 
            ? 'Representação gráfica abstrata demonstrando a arquitetura do painel, lista de pedidos, filtros contextuais por projeto e visão geral dos tickets.'
            : 'Abstract graphic representation illustrating panel architecture, request queues, contextual project filters, and overview metrics.'}
        </p>
      </div>

      {/* Main Cover Image Display */}
      <div className="flex flex-col gap-2">
        <div 
          onClick={() => setExpandedImage(coverImg)}
          className="group cursor-pointer bg-neutral-950 border-2 border-[#808080] overflow-hidden rounded-[2px] relative shadow-md"
        >
          <img 
            src={coverImg} 
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== window.location.origin + '/help.png') {
                target.src = '/help.png';
              }
            }}
            alt="Helpdesk Platform UI" 
            className="w-full h-auto max-h-[540px] object-contain sm:object-cover transition-transform group-hover:scale-[1.01]"
          />
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white font-mono text-xs px-3 py-1.5 flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>{isPt ? 'Maximizar Interface' : 'Expand Interface'}</span>
          </div>
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] text-neutral-600 px-1">
          <span>FIGURA 5.1 — Visão Abstrata da Interface e Painel Central</span>
          <span className="text-[#000080] font-bold">Lovable Functional Build</span>
        </div>
      </div>

      {/* Operational Impact Grid (Authentic Qualitative Metrics without unproven numbers) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border-2 border-[#808080] p-4 text-center">
          <div className="font-mono text-sm font-bold text-[#000080] mb-1">
            CANAL CENTRAL
          </div>
          <div className="font-mono text-xs font-bold text-[#073859] uppercase tracking-wider mb-1">
            {isPt ? 'Ponto Único' : 'Single Intake'}
          </div>
          <p className="text-xs text-neutral-600 font-sans">
            {isPt ? 'Eliminação total de pedidos dispersos em DMs ou corredores.' : 'Elimination of informal requests scattered across private channels.'}
          </p>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4 text-center">
          <div className="font-mono text-sm font-bold text-emerald-700 mb-1">
            AUDITORIA
          </div>
          <div className="font-mono text-xs font-bold text-[#073859] uppercase tracking-wider mb-1">
            {isPt ? 'Rastreabilidade' : 'Traceability'}
          </div>
          <p className="text-xs text-neutral-600 font-sans">
            {isPt ? 'Cada ocorrência possui identificador único e timeline de intervenção.' : 'Every issue generates a unique ID and auditable timeline.'}
          </p>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4 text-center">
          <div className="font-mono text-sm font-bold text-purple-700 mb-1">
            3 PERFIS
          </div>
          <div className="font-mono text-xs font-bold text-[#073859] uppercase tracking-wider mb-1">
            {isPt ? 'Hierarquia' : 'Hierarchy'}
          </div>
          <p className="text-xs text-neutral-600 font-sans">
            {isPt ? 'Interfaces dedicadas para Requerente, Agente especialista e Admin.' : 'Dedicated interfaces for Requester, Specialist Agent, and Admin.'}
          </p>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4 text-center">
          <div className="font-mono text-sm font-bold text-amber-700 mb-1">
            GOVERNANÇA
          </div>
          <div className="font-mono text-xs font-bold text-[#073859] uppercase tracking-wider mb-1">
            {isPt ? 'Visão Macro' : 'Macro Control'}
          </div>
          <p className="text-xs text-neutral-600 font-sans">
            {isPt ? 'Gestão monitoriza volumes, tempos de resposta e gargalos de equipa.' : 'Management tracks volumes, resolution speed, and team load.'}
          </p>
        </div>
      </div>
    </div>
  );

  // SECTION 7: APRENDIZAGENS & STORYTELLING
  const LearningsSection = (
    <div className="flex flex-col gap-6 text-[#1A1A1A]">
      <div className="bg-[#FFFFEE] border border-[#d0c8a8] p-4 sm:p-6 shadow-sm rounded-[2px]">
        <div className="flex items-center gap-2 border-b border-[#e0d8b8] pb-2 mb-4 font-mono text-xs text-neutral-600">
          <span className="font-bold text-[#000080]">C:\DOCUMENTS\HELPDESK\LEARNINGS.TXT</span>
          <span className="text-neutral-400">|</span>
          <span>AUTORA: RAÍSSA MORIÁ</span>
        </div>

        <div className="flex flex-col gap-4 font-sans">
          <h3 className="text-xl sm:text-2xl font-bold text-[#073859]">
            {isPt ? 'O Design Thinking Precede a Ferramenta' : 'Design Thinking Comes Before the Tool'}
          </h3>

          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
            {isPt 
              ? 'Uma das principais aprendizagens deste projeto foi a constatação prática de que ferramentas low-code como o Lovable aceleram a construção funcional, mas são impotentes se a arquitetura de informação e a compreensão do utilizador não tiverem sido meticulosamente desenhadas.'
              : 'A core takeaway from this project was that low-code engines like Lovable accelerate functional deployment, but they are powerless if information architecture and user needs have not been meticulously shaped first.'}
          </p>

          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
            {isPt 
              ? 'O verdadeiro valor deste projeto não residiu em "escrever código", mas em mapear a dor de dezenas de colaboradores, estruturar um fluxo com limites claros entre quem pede, quem resolve e quem gere, e transformar um caos silencioso num sistema onde todos trabalham com clareza e respeito pelo tempo alheio.'
              : 'The real value of this project did not lie in "writing code", but in diagnosing the operational friction of dozens of colleagues, defining boundaries between requesters, agents, and admins, and turning quiet chaos into a system where everyone works with clarity.'}
          </p>
        </div>
      </div>

      {/* 3 Key Takeaways in Retro Notepad cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white border-2 border-[#808080] p-4 flex flex-col gap-2">
          <span className="font-mono text-xs font-bold text-[#000080]">
            {isPt ? '01. Ferramentas Internas Precisam de UX' : '01. Internal Tools Need UX'}
          </span>
          <p className="text-xs text-neutral-700 leading-relaxed font-sans">
            {isPt 
              ? 'Muitas empresas descuram a experiência em produtos internos. Investir em clareza aqui reduz o stress da equipa e poupa centenas de horas de atrito repetitivo.'
              : 'Internal software often suffers from poor UX. Investing in clarity reduces employee stress and saves hundreds of hours of manual friction.'}
          </p>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4 flex flex-col gap-2">
          <span className="font-mono text-xs font-bold text-emerald-800">
            {isPt ? '02. Velocidade com Propósito' : '02. Speed with Purpose'}
          </span>
          <p className="text-xs text-neutral-700 leading-relaxed font-sans">
            {isPt 
              ? 'O Lovable permitiu passar do conceito ao produto funcional numa fração do tempo habitual, permitindo testar diretamente com os colaboradores e iterar no mundo real.'
              : 'Lovable enabled us to move from concept to working product in record time, allowing real testing with employees and live iteration.'}
          </p>
        </div>

        <div className="bg-white border-2 border-[#808080] p-4 flex flex-col gap-2">
          <span className="font-mono text-xs font-bold text-purple-800">
            {isPt ? '03. Transparência Gera Confiança' : '03. Transparency Builds Trust'}
          </span>
          <p className="text-xs text-neutral-700 leading-relaxed font-sans">
            {isPt 
              ? 'Quando um colaborador sabe exatamente em que estado o seu ticket se encontra, a ansiedade desaparece e a relação entre equipas torna-se colaborativa.'
              : 'When a requester can clearly see the real-time stage of their ticket, anxiety dissipates and inter-team dynamics become collaborative.'}
          </p>
        </div>
      </div>
    </div>
  );

  // 5. ANCHOR NAVIGATION TABS
  const retroTabs: RetroProjectTab[] = [
    {
      id: 'sec-overview',
      labelPt: '01 — Contexto.txt',
      labelEn: '01 — Context.txt',
      badge: 'TXT',
      content: OverviewSection,
    },
    {
      id: 'sec-roles',
      labelPt: '02 — Perfis.usr',
      labelEn: '02 — Roles.usr',
      badge: 'USR',
      content: RolesSection,
    },
    {
      id: 'sec-research',
      labelPt: '03 — Investigação.exe',
      labelEn: '03 — Research.exe',
      badge: 'EXE',
      content: ResearchSection,
    },
    {
      id: 'sec-process',
      labelPt: '04 — Metodologia.dir',
      labelEn: '04 — Process.dir',
      badge: 'DIR',
      content: ProcessSection,
    },
    {
      id: 'sec-decisions',
      labelPt: '05 — Decisões_Fluxos.fig',
      labelEn: '05 — Decisions.fig',
      badge: 'FIG',
      content: DecisionsSection,
    },
    {
      id: 'sec-solution',
      labelPt: '06 — Solução.png',
      labelEn: '06 — Solution.png',
      badge: 'PNG',
      content: SolutionSection,
    },
    {
      id: 'sec-learnings',
      labelPt: '07 — Aprendizagens.txt',
      labelEn: '07 — Learnings.txt',
      badge: 'TXT',
      content: LearningsSection,
    },
  ];

  return (
    <>
      <RetroProjectLayout
        projectId="plataforma-helpdesk"
        projectNumber="03"
        projectExeName="Project_Helpdesk.exe"
        title={isPt ? "Plataforma de Helpdesk" : "Helpdesk Platform"}
        subtitle={isPt 
          ? "De pedidos de suporte informais a uma experiência digital estruturada." 
          : "From informal support requests to a structured digital experience."}
        category={isPt ? "DESIGN UX/UI & FERRAMENTAS INTERNAS" : "UX/UI DESIGN & INTERNAL TOOLS"}
        year="2026"
        roles={["Product Design", "UX/UI Design", "Design Thinking", "Lovable Low-Code"]}
        language={language}
        onBack={onBack}
        onNextProject={onNextProject}
        onPrevProject={onPrevProject}
        prevProjectName={isPt ? "SUE Mobile App" : "SUE Mobile App"}
        nextProjectName={isPt ? "Nipon Spa" : "Nipon Spa"}
        onToggleLanguage={onToggleLanguage}
        tabs={retroTabs}
      />

      {/* Fullscreen Image Zoom Modal */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
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
                className="w-full max-h-[85vh] object-contain bg-black"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
