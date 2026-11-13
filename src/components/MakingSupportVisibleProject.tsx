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
  Shield, 
  User, 
  Headphones, 
  Sliders, 
  X,
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Mail,
  Users,
  Compass,
  FileText
} from 'lucide-react';
import { Language } from '../types';
import { EditorialProjectLayout } from './editorial/EditorialProjectLayout';

// Authentic Assets
// @ts-ignore
import coverHelpImg from '../assets/images/help.png';

interface MakingSupportVisibleProjectProps {
  language: Language;
  onBack: () => void;
  onNextProject?: () => void;
  onPrevProject?: () => void;
}

export const MakingSupportVisibleProject: React.FC<MakingSupportVisibleProjectProps> = ({
  language,
  onBack,
  onNextProject,
  onPrevProject,
}) => {
  const [selectedRole, setSelectedRole] = useState<'requester' | 'agent' | 'admin'>('requester');
  const [activeLifecycleStep, setActiveLifecycleStep] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption?: string } | null>(null);

  const isPt = language === 'pt';

  // 1. Roles Data (100% Preserved)
  const rolesData = {
    requester: {
      title: isPt ? 'Requerente (Requester)' : 'Requester',
      badge: isPt ? 'Perfil Frontstage' : 'Frontstage Profile',
      icon: <User className="w-5 h-5 text-neutral-800" />,
      tagline: isPt 
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
      badge: isPt ? 'Espaço do Especialista' : 'Specialist Workspace',
      icon: <Headphones className="w-5 h-5 text-neutral-800" />,
      tagline: isPt 
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
      badge: isPt ? 'Backoffice Operacional' : 'Operational Backoffice',
      icon: <Sliders className="w-5 h-5 text-neutral-800" />,
      tagline: isPt 
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

  // 2. Design Thinking Process Stages (5 Stages)
  const processStages = [
    {
      num: '01',
      name: isPt ? 'Compreender' : 'Understand',
      subtitle: isPt ? 'Análise Operacional & Vazio de Suporte' : 'Operational Analysis & Support Void',
      desc: isPt 
        ? 'Mapear o vazio operacional gerado pela ausência de um canal formal de suporte. Analisar canais informais (DMs de Teams, Slack, WhatsApp, conversas de corredor e e-mails privados) e identificar gargalos críticos onde pedidos ficavam esquecidos sem qualquer registo.'
        : 'Unpack the operational friction caused by the absence of a support channel. Map informal communication channels (Teams/Slack DMs, corridor calls, private emails) and identify critical bottlenecks that left issues unrecorded.'
    },
    {
      num: '02',
      name: isPt ? 'Definir' : 'Define',
      subtitle: isPt ? 'Perfis & Limites de Informação' : 'Role & Scope Definition',
      desc: isPt 
        ? 'Definir três arquétipos de utilizador distintos: Requerente, Agente e Administrador. Estabelecer permissões claras, limites de dados e necessidades de informação para cada perfil, evitando dispersão e poluição visual.'
        : 'Define three distinct user archetypes: Requester, Agent, and Administrator. Establish clear permissions, data boundaries, and information requirements for each persona to prevent operational spillover.'
    },
    {
      num: '03',
      name: isPt ? 'Estruturar' : 'Structure',
      subtitle: isPt ? 'Arquitetura de Informação & Taxonomia' : 'Information Architecture & Taxonomy',
      desc: isPt 
        ? 'Desenhar a taxonomia da plataforma: categorização de tickets por projeto, ciclo de vida do pedido (Novo → Triado → Atribuído → Em Curso → Resolvido) e registo cronológico de intervenções para auditoria e transparência.'
        : 'Design the underlying system model: project-based ticket categorization, ticket lifecycle states (New → Triaged → Assigned → In Progress → Resolved), and structured intervention logging for auditability.'
    },
    {
      num: '04',
      name: isPt ? 'Construir' : 'Build',
      subtitle: isPt ? 'Implementação com Lovable' : 'Implementation with Lovable',
      desc: isPt 
        ? 'Converter wireframes e fluxos de interação num produto digital funcional através da ferramenta Lovable. O raciocínio humano de design guiou a estrutura e a arquitetura, enquanto o Lovable acelerou o ciclo de desenvolvimento funcional.'
        : 'Translate UX wireframes and interaction patterns into a functional digital platform using Lovable. Human design reasoning guided the architecture, while Lovable provided rapid full-stack execution.'
    },
    {
      num: '05',
      name: isPt ? 'Iterar' : 'Iterate',
      subtitle: isPt ? 'Refinamento & Ergonomia da Interface' : 'Refinement & Interface Ergonomics',
      desc: isPt 
        ? 'Ajustar a ergonomia dos formulários, navegação adaptada a cada perfil, scannability da lista de tickets e clareza das etiquetas de estado para assegurar uma experiência fluida no desktop e ecrãs compactos.'
        : 'Iterate on form ergonomics, role-specific navigation menus, ticket scannability, and status badge legibility to ensure the platform feels effortless across desktop and compact screens.'
    }
  ];

  // 3. Design Decisions (5 Decisions)
  const designDecisions = [
    {
      num: '01',
      title: isPt ? 'Experiências Adaptadas aos Três Perfis' : 'Experiences Tailored to Three Profiles',
      subtitle: isPt ? 'Fronteiras e workspaces isolados para eliminar ruído' : 'Isolated boundaries and workspaces to remove clutter',
      desc: isPt
        ? 'Em vez de uma interface genérica com dezenas de filtros desnecessários, cada perfil tem um workspace dedicado. O requerente foca-se na submissão e no estado; o agente tem a sua fila por projeto; o administrador dispõe de um painel de governança e métricas.'
        : 'Rather than a generic interface with redundant filters, each role enters a custom workspace. Requesters focus on submission and status; agents focus on project queues; administrators have governance and SLA analytics.'
    },
    {
      num: '02',
      title: isPt ? 'Submissão de Tickets Sem Atrito' : 'Frictionless Ticket Submission',
      subtitle: isPt ? 'Preenchimento preditivo e validação imediata' : 'Predictive project matching and inline validation',
      desc: isPt
        ? 'Formulário focado com preenchimento preditivo do projeto, seleção visual de urgência e validação em linha para garantir tickets com contexto completo desde o primeiro instante, reduzindo pedidos incompletos a zero.'
        : 'Focused form with predictive project assignment, visual urgency toggles, and inline validation to guarantee rich context at creation, bringing incomplete requests down to zero.'
    },
    {
      num: '03',
      title: isPt ? 'Organização por Domínios de Projeto' : 'Project Domain Organization',
      subtitle: isPt ? 'Filas segmentadas sem contaminação visual' : 'Isolated queues without cross-domain visual clutter',
      desc: isPt
        ? 'Cada ticket pertence estritamente a um projeto. Os agentes especialistas só visualizam pedidos relevantes para a sua área de atuação, eliminando sobrecarga cognitiva e evitando que tickets fiquem esquecidos sem responsável.'
        : 'Every issue maps strictly to its project domain. Specialist agents only see queues relevant to their expertise, eliminating cognitive overload and preventing unassigned requests.'
    },
    {
      num: '04',
      title: isPt ? 'Hierarquia Clara & Transparência em Tempo Real' : 'Clear Hierarchy & Real-Time Transparency',
      subtitle: isPt ? 'Timeline cronológica e estados padronizados' : 'Chronological timelines and standardized status states',
      desc: isPt
        ? 'Etiquetas de estado padronizadas e uma timeline cronológica de intervenções técnicas eliminam por completo a necessidade de mensagens privadas ou chamadas de acompanhamento por parte do utilizador.'
        : 'Standardized state tags and a chronological intervention timeline eliminate the need for anxiety-driven manual follow-ups or private ping messages.'
    },
    {
      num: '05',
      title: isPt ? 'Fluxo Conectado de Suporte' : 'Connected Support Lifecycle',
      subtitle: isPt ? 'Do problema reportado ao encerramento com auditoria' : 'From reported issue to auditable closure',
      desc: isPt
        ? 'Um ciclo de 5 passos conectado e transparente que amarra a criação, validação de dados, encaminhamento automático, diagnóstico técnico e validação final pelo requerente com auditoria gravada.'
        : 'A connected 5-step lifecycle binding creation, data validation, automatic routing, technical diagnostics, and user closure with full auditability.'
    }
  ];

  // 4. Lifecycle Stages
  const lifecycleStages = [
    {
      step: '01',
      title: isPt ? 'Problema Reportado' : 'Issue Reported',
      role: isPt ? 'Requerente' : 'Requester',
      action: isPt 
        ? 'Um colaborador encontra um entrave no sistema e submete um ticket estruturado pelo portal central.' 
        : 'An employee encounters a system roadblock and submits a structured ticket via the central portal.',
      data: isPt ? 'Categoria, descrição detalhada, anexo contextual, urgência' : 'Category, description, attachment, urgency flag',
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

  return (
    <>
      <EditorialProjectLayout
        title={isPt ? "Plataforma de Helpdesk" : "Helpdesk Platform"}
        subtitle={isPt 
          ? "De pedidos de suporte informais a uma experiência digital estruturada." 
          : "From informal support requests to a structured digital experience."}
        overview={{
          projectLabel: isPt ? "O projeto" : "The project",
          description: isPt 
            ? "Desenhar e desenvolver uma plataforma digital que centraliza pedidos de suporte, conecta três perfis de utilizador e transforma uma operação informal num processo organizado e rastreável."
            : "Design and build a functional digital platform that centralizes support requests, connects three distinct user roles, and transforms informal chaos into an organized, traceable system.",
          roles: isPt 
            ? ["Product Designer", "UX/UI Designer", "Low-Code Developer"] 
            : ["Product Designer", "UX/UI Designer", "Low-Code Developer"],
          technologies: ["Lovable", "Tailwind UI"],
          methodology: isPt 
            ? ["Design Thinking", "Mapeamento de Processos", "Prototipagem Iterativa"]
            : ["Design Thinking", "Service Mapping", "Iterative Prototyping"],
          users: isPt 
            ? ["Requerentes", "Agentes", "Administradores"] 
            : ["Requesters", "Agents", "Administrators"]
        }}
        language={language}
        onBack={onBack}
        onNextProject={onNextProject}
        onPrevProject={onPrevProject}
        nextProjectName="Nipon Spa"
        prevProjectName="SUE Mobile App"
      >

        {/* =========================================================================
            SECTION 01: O CONTEXTO / BACKGROUND
            ========================================================================= */}
        <section id="contexto" className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '01 / O contexto' : '01 / Background'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1115]">
              {isPt 
                ? 'Como o suporte funcionava antes da criação da plataforma' 
                : 'How support operated before the platform existed'}
            </h2>
            <div className="flex flex-col gap-5 text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              <p>
                {isPt 
                  ? 'Antes da criação desta plataforma, a organização não possuía qualquer canal formal de suporte. Quando os colaboradores enfrentavam um problema operacional ou técnico em sistemas internos, contactavam diretamente a pessoa responsável por mensagens privadas em aplicações de chat (Teams, Slack, WhatsApp), chamadas informais ou conversas no corredor.'
                  : 'Before this platform existed, the organisation had no formal support channel. When employees encountered an issue in internal systems, they contacted the responsible technician directly via private chat apps (Teams, Slack, WhatsApp), phone calls, or hallway conversations.'}
              </p>
              <p>
                {isPt 
                  ? 'Não existia um ambiente centralizado para registar pedidos, acompanhar o seu progresso ou manter um registo estruturado de suporte. O resultado era um vazio operacional: os colaboradores viviam na incerteza sem saber se o seu problema seria resolvido, os técnicos eram interrompidos constantemente com pedidos de ponto de situação ("já está pronto?"), e a gestão não tinha qualquer visibilidade sobre o volume real de trabalho ou tempos médios de resposta.'
                  : 'There was no centralised environment to register requests, track progress, or maintain a structured record of support interactions. The result was an operational void: employees lived in anxiety without knowing when their issue would be addressed, technicians were overwhelmed with repeated status follow-ups, and leadership had zero visibility into volume patterns or resolution velocities.'}
              </p>
            </div>
          </div>

          {/* Large Diagram: O Vazio Operacional & Canais Fragmentados */}
          <div className="w-full flex flex-col gap-3">
            <div className="w-full rounded-2xl sm:rounded-3xl bg-[#F0F2F6] border border-neutral-200/90 p-8 sm:p-14 overflow-hidden">
              <div className="max-w-4xl mx-auto flex flex-col gap-8">
                
                <div className="flex flex-wrap items-center justify-between border-b border-neutral-300 pb-4 gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600">
                    {isPt ? 'Mapeamento do Fluxo Anterior (Canais Informais)' : 'Previous Flow Mapping (Informal Channels)'}
                  </span>
                  <span className="text-xs font-mono text-rose-600 font-bold uppercase">
                    {isPt ? 'Sem Rastreabilidade · Sem Registo Central' : 'Zero Traceability · No Central Log'}
                  </span>
                </div>

                {/* Conceptual Flow Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="bg-white rounded-xl p-6 border border-neutral-200 flex flex-col gap-3 shadow-xs">
                    <div className="flex items-center gap-2 text-rose-600 font-mono text-xs font-bold uppercase">
                      <MessageSquare className="w-4 h-4" />
                      <span>{isPt ? 'DMs de Chat & WhatsApp' : 'Chat DMs & WhatsApp'}</span>
                    </div>
                    <p className="text-neutral-600 text-xs leading-relaxed">
                      {isPt 
                        ? 'Mensagens diretas enviadas a contactos pessoais. Detalhes perdidos em conversas privadas sem qualquer número de ticket.'
                        : 'Direct messages sent to personal accounts. Technical details lost in private threads with no ticket ID.'}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-neutral-200 flex flex-col gap-3 shadow-xs">
                    <div className="flex items-center gap-2 text-rose-600 font-mono text-xs font-bold uppercase">
                      <Mail className="w-4 h-4" />
                      <span>{isPt ? 'E-mails Pessoais Dispersos' : 'Scattered Personal Emails'}</span>
                    </div>
                    <p className="text-neutral-600 text-xs leading-relaxed">
                      {isPt 
                        ? 'Pedidos enviados para caixas de correio individuais. Sem priorização, sem prazos de SLA e sem escalamento estruturado.'
                        : 'Requests buried in personal inboxes. No priority level, no SLA deadlines, and no structured escalation.'}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-neutral-200 flex flex-col gap-3 shadow-xs">
                    <div className="flex items-center gap-2 text-rose-600 font-mono text-xs font-bold uppercase">
                      <Users className="w-4 h-4" />
                      <span>{isPt ? 'Conversas de Corredor' : 'Hallway Conversations'}</span>
                    </div>
                    <p className="text-neutral-600 text-xs leading-relaxed">
                      {isPt 
                        ? 'Pedidos verbais e informais. Facilmente esquecidos no meio de outras tarefas urgentes sem deixar rasto para auditoria.'
                        : 'Verbal, informal hallway asks. Easily forgotten amidst competing priorities without leaving an audit trail.'}
                    </p>
                  </div>
                </div>

                {/* Central Problem Summary Banner */}
                <div className="bg-white/80 rounded-xl p-6 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900">
                      {isPt 
                        ? 'Consequência: 0% de visibilidade de estado para quem pede e sobrecarga constante para quem resolve.'
                        : 'Consequence: 0% visibility for requesters and relentless manual follow-up fatigue for technicians.'}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest shrink-0">
                    {isPt ? 'Gargalo Crítico' : 'Critical Bottleneck'}
                  </span>
                </div>

              </div>
            </div>
            <p className="text-xs font-mono text-neutral-500 px-2">
              {isPt 
                ? 'Figura 1.1 — Diagnóstico dos pontos de atrito antes da introdução da plataforma centralizada.'
                : 'Figure 1.1 — Diagnostic of operational friction points prior to the centralized platform.'}
            </p>
          </div>

          {/* NDA Confidentiality Note */}
          <div className="border-l-2 border-neutral-900 pl-6 py-2 max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 mb-1">
              <Shield className="w-4 h-4 text-neutral-900" />
              <span>{isPt ? 'Nota de Confidencialidade (NDA)' : 'Confidentiality Note (NDA)'}</span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              {isPt 
                ? 'O projeto foi desenvolvido em contexto empresarial real. Devido a restrições de confidencialidade, a plataforma original, os dados comerciais internos e as capturas de ecrã reais não podem ser expostos publicamente. Todas as representações visuais são conceituais, abstratas e criadas de forma independente para preservar a propriedade intelectual da organização.'
                : 'Developed in a live corporate environment. Due to confidentiality agreements, proprietary company data and literal production screenshots cannot be published. Visual assets presented here are conceptual, abstract representations crafted independently to protect intellectual property.'}
            </p>
          </div>
        </section>


        {/* =========================================================================
            SECTION 02: O DESAFIO / THE CHALLENGE
            ========================================================================= */}
        <section id="desafio" className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '02 / O desafio' : '02 / The Challenge'}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-[42px] font-bold tracking-tight text-[#0F1115] leading-tight">
              {isPt 
                ? 'Como desenhar uma experiência de suporte única para três perfis de utilizador diferentes?'
                : 'How to design a unified support experience serving three radically different user profiles?'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              {isPt 
                ? 'O desafio não consistia apenas em criar um formulário para submeter tickets. O verdadeiro desafio era articular três ecossistemas com necessidades totalmente distintas num único produto coeso, sem poluir a experiência de uns com as complexidades dos outros.'
                : 'The challenge went far beyond creating an intake form. The real design problem was orchestrating three user domains with conflicting operational goals into one cohesive system, without cluttering one profile with another’s complexity.'}
            </p>
          </div>

          {/* 3 Core Operational Tensions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            
            <div className="flex flex-col gap-3 pb-8 border-b md:border-b-0 md:border-r border-neutral-200 pr-0 md:pr-8">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                {isPt ? 'Tensão 01' : 'Tension 01'}
              </span>
              <h3 className="text-xl font-bold text-[#0F1115]">
                {isPt ? 'Visibilidade Imediata' : 'Immediate Visibility'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-light">
                {isPt 
                  ? 'O Requerente precisa de saber instantaneamente o estado do seu pedido sem ter de perguntar a ninguém. Cada transição de estado precisa de ser visível, legível e compreensível.'
                  : 'Requesters require instant status clarity without asking anyone. Every state change must be obvious, readable, and reassuring.'}
              </p>
            </div>

            <div className="flex flex-col gap-3 pb-8 border-b md:border-b-0 md:border-r border-neutral-200 pr-0 md:pr-8">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                {isPt ? 'Tensão 02' : 'Tension 02'}
              </span>
              <h3 className="text-xl font-bold text-[#0F1115]">
                {isPt ? 'Organização & Foco' : 'Domain Routing & Focus'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-light">
                {isPt 
                  ? 'O Agente técnico precisa de concentração total. Não pode perder tempo a filtrar centenas de pedidos de outros departamentos ou a tentar adivinhar a qual projeto pertence cada problema.'
                  : 'Technical Agents require uninterrupted focus. They cannot waste time triaging hundreds of irrelevant cross-department tickets.'}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                {isPt ? 'Tensão 03' : 'Tension 03'}
              </span>
              <h3 className="text-xl font-bold text-[#0F1115]">
                {isPt ? 'Controlo & Auditoria' : 'Governance & Auditing'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-light">
                {isPt 
                  ? 'A Administração precisa de supervisão global. Monitorizar volumes de tickets, tempos médios de resposta (SLAs), alocação de equipas e manter um histórico completo para conformidade.'
                  : 'Administrators require macro visibility. Tracking volume trends, SLA compliance, resource allocation, and maintaining complete audit trails.'}
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================================
            SECTION 03: COMPREENDER OS UTILIZADORES / RESEARCH & INSIGHTS
            ========================================================================= */}
        <section id="utilizadores" className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '03 / Compreender os utilizadores' : '03 / Understanding the Users'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1115]">
              {isPt 
                ? 'Três perfis com necessidades e fronteiras rigorosamente definidas' 
                : 'Three user profiles with rigorously defined scopes'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              {isPt 
                ? 'Em vez de criar uma interface generalista com menus infinitos, a investigação direcionou o produto para três perfis de utilizador com níveis de acesso, objetivos e interfaces dedicadas.'
                : 'Rather than a one-size-fits-all tool with endless dropdown menus, research led to three distinct user archetypes with tailored permissions, scopes, and workspaces.'}
            </p>
          </div>

          {/* Interactive Role Inspector / Deep Dives */}
          <div className="flex flex-col gap-6">
            
            {/* Role Selector Tabs (Clean Editorial Buttons) */}
            <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 pb-4">
              {(['requester', 'agent', 'admin'] as const).map((roleKey) => {
                const isSelected = selectedRole === roleKey;
                const role = rolesData[roleKey];
                return (
                  <button
                    key={roleKey}
                    onClick={() => setSelectedRole(roleKey)}
                    className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected 
                        ? 'bg-neutral-900 text-white font-bold shadow-xs' 
                        : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
                    }`}
                  >
                    <span>{role.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Role Display Card (Generous Editorial Layout) */}
            <div className="w-full rounded-2xl bg-white border border-neutral-200/90 p-8 sm:p-12 shadow-xs flex flex-col gap-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-900">
                    {rolesData[selectedRole].icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F1115]">
                      {rolesData[selectedRole].title}
                    </h3>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                      {rolesData[selectedRole].badge}
                    </span>
                  </div>
                </div>
                <div className="text-xs font-mono text-neutral-500">
                  {isPt ? 'ARQUITETURA DE ACESSO BASEADA EM FUNÇÃO (RBAC)' : 'ROLE-BASED ACCESS CONTROL (RBAC)'}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                    {isPt ? 'Perfil & Responsabilidade' : 'Profile & Scope'}
                  </span>
                  <p className="text-base text-neutral-700 leading-relaxed font-light">
                    {rolesData[selectedRole].tagline}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col gap-1.5">
                    <span className="text-xs font-mono font-bold text-neutral-900 uppercase">
                      {isPt ? 'Foco UX/UI:' : 'UX/UI Focus:'}
                    </span>
                    <p className="text-xs text-neutral-600 font-mono">
                      {rolesData[selectedRole].uiFocus}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col gap-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                    {isPt ? 'Ações Principais na Plataforma' : 'Key Platform Capabilities'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {rolesData[selectedRole].actions.map((act, i) => (
                      <div key={i} className="p-4 rounded-xl bg-[#F7F8FA] border border-neutral-200/70 flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-neutral-700 leading-relaxed">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =========================================================================
            SECTION 04: DO PROBLEMA À SOLUÇÃO / IDEATION & PROCESS
            ========================================================================= */}
        <section id="processo" className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '04 / Do problema à solução' : '04 / From Problem to Solution'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1115]">
              {isPt 
                ? 'O raciocínio de Design Thinking que guiou a construção' 
                : 'The Design Thinking process guiding the architecture'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              {isPt 
                ? 'A plataforma foi materializada e implementada com a tecnologia low-code Lovable, mas cada decisão de fluxo, hierarquia e taxonomia nasceu de um processo rigoroso de Design Thinking humano.'
                : 'The platform was deployed using the low-code engine Lovable, but every workflow, information hierarchy, and data taxonomy was shaped through human Design Thinking reasoning.'}
            </p>
          </div>

          {/* 5 Stages Grid (Clean Editorial Walkthrough) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processStages.map((stage) => (
              <div key={stage.num} className="bg-white rounded-xl p-6 border border-neutral-200/90 flex flex-col gap-3">
                <span className="text-xs font-mono font-bold text-neutral-400">
                  {stage.num}
                </span>
                <h3 className="text-base font-bold text-[#0F1115]">
                  {stage.name}
                </h3>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  {stage.subtitle}
                </span>
                <p className="text-xs text-neutral-600 leading-relaxed font-light mt-1">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Editorial Service Architecture: Touchpoints & Line of Visibility */}
          <div className="w-full flex flex-col gap-4 pt-6">
            <div className="w-full rounded-2xl bg-white border border-neutral-200/90 p-8 sm:p-12 shadow-xs flex flex-col gap-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-4 gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                    {isPt ? 'Mapeamento de Processos · Service Blueprint' : 'Process Mapping · Service Blueprint'}
                  </span>
                  <span className="text-xl font-bold text-[#0F1115]">
                    {isPt ? 'Jornada do Pedido e Linha de Visibilidade' : 'Request Journey & Line of Visibility'}
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  {isPt ? 'ARQUITETURA SISTÉMICA' : 'SYSTEM ARCHITECTURE'}
                </span>
              </div>

              {/* Frontstage Row */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                    {isPt ? 'Frontstage · Ações Visíveis para o Colaborador' : 'Frontstage · Visible User Actions'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-[#F8F9FA] border border-neutral-200 flex flex-col gap-1.5">
                    <span className="font-mono text-neutral-400 font-bold">01. {isPt ? 'Ocorrência' : 'Encounter'}</span>
                    <span className="font-bold text-neutral-900">{isPt ? 'Identificação do Problema' : 'Issue Identification'}</span>
                    <p className="text-neutral-600 font-light leading-relaxed">{isPt ? 'Colaborador depara-se com um entrave técnico num sistema interno.' : 'Employee hits an operational blocker in internal tooling.'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8F9FA] border border-neutral-200 flex flex-col gap-1.5">
                    <span className="font-mono text-neutral-400 font-bold">02. {isPt ? 'Submissão' : 'Intake'}</span>
                    <span className="font-bold text-neutral-900">{isPt ? 'Portal Centralizado' : 'Centralized Portal'}</span>
                    <p className="text-neutral-600 font-light leading-relaxed">{isPt ? 'Preenchimento focado com seleção guiada de projeto e urgência.' : 'Structured form with guided project tag and urgency flag.'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8F9FA] border border-neutral-200 flex flex-col gap-1.5">
                    <span className="font-mono text-neutral-400 font-bold">03. {isPt ? 'Acompanhamento' : 'Tracking'}</span>
                    <span className="font-bold text-neutral-900">{isPt ? 'Timeline em Tempo Real' : 'Real-Time Timeline'}</span>
                    <p className="text-neutral-600 font-light leading-relaxed">{isPt ? 'Visibilidade do progresso, agente responsável e tempo decorrido.' : 'Visibility into current state, assigned agent, and active velocity.'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8F9FA] border border-neutral-200 flex flex-col gap-1.5">
                    <span className="font-mono text-neutral-400 font-bold">04. {isPt ? 'Validação' : 'Closure'}</span>
                    <span className="font-bold text-neutral-900">{isPt ? 'Confirmação & Fecho' : 'Confirmation & Closure'}</span>
                    <p className="text-neutral-600 font-light leading-relaxed">{isPt ? 'Requerente confirma a resolução e o ticket é arquivado com histórico.' : 'Requester confirms resolution and the issue is formally closed.'}</p>
                  </div>
                </div>
              </div>

              {/* Line of Visibility Divider */}
              <div className="relative py-2 flex items-center justify-between">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dashed border-neutral-300" />
                </div>
                <span className="relative bg-white px-3 text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-500">
                  {isPt ? '--- Linha de Visibilidade (Line of Visibility) ---' : '--- Line of Visibility ---'}
                </span>
              </div>

              {/* Backstage Row */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                    {isPt ? 'Backstage · Operações Técnicas e de Governança' : 'Backstage · Technical & Governance Operations'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-[#F4F6F8] border border-neutral-200 flex flex-col gap-1.5">
                    <span className="font-mono text-neutral-400 font-bold">A. {isPt ? 'Triagem' : 'Triage'}</span>
                    <span className="font-bold text-neutral-900">{isPt ? 'Carimbo & Validação' : 'Stamping & Validation'}</span>
                    <p className="text-neutral-600 font-light leading-relaxed">{isPt ? 'Geração de ID auditável (#TK-...) e atribuição automática ao domínio do projeto.' : 'Auditable ID generation (#TK-...) and automated project domain mapping.'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F4F6F8] border border-neutral-200 flex flex-col gap-1.5">
                    <span className="font-mono text-neutral-400 font-bold">B. {isPt ? 'Encaminhamento' : 'Routing'}</span>
                    <span className="font-bold text-neutral-900">{isPt ? 'Fila do Especialista' : 'Specialist Queue'}</span>
                    <p className="text-neutral-600 font-light leading-relaxed">{isPt ? 'O ticket surge diretamente na vista isolada dos agentes responsáveis.' : 'Ticket surfaces directly in the focused view of authorized agents.'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F4F6F8] border border-neutral-200 flex flex-col gap-1.5">
                    <span className="font-mono text-neutral-400 font-bold">C. {isPt ? 'Resolução' : 'Resolution'}</span>
                    <span className="font-bold text-neutral-900">{isPt ? 'Notas Técnicas & Ação' : 'Technical Notes & Action'}</span>
                    <p className="text-neutral-600 font-light leading-relaxed">{isPt ? 'Registo de intervenções, diagnóstico interno e comunicação ao requerente.' : 'Intervention logging, diagnostic history, and progress updates.'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F4F6F8] border border-neutral-200 flex flex-col gap-1.5">
                    <span className="font-mono text-neutral-400 font-bold">D. {isPt ? 'Auditoria' : 'Audit'}</span>
                    <span className="font-bold text-neutral-900">{isPt ? 'Métricas de SLA' : 'SLA Analytics'}</span>
                    <p className="text-neutral-600 font-light leading-relaxed">{isPt ? 'Backoffice grava tempos de resposta, identificando gargalos sistémicos.' : 'Backoffice logs response metrics, highlighting systemic bottlenecks.'}</p>
                  </div>
                </div>
              </div>

            </div>
            <p className="text-xs font-mono text-neutral-500 px-2">
              {isPt 
                ? 'Figura 4.1 — Arquitetura de processos: mapeamento da interação frontstage, linha de visibilidade e suporte operacional backstage.'
                : 'Figure 4.1 — Process architecture: frontstage user interaction, line of visibility, and backstage operational support.'}
            </p>
          </div>

          {/* Design System & Specifications Clean Editorial Card */}
          <div className="w-full flex flex-col gap-4 pt-2">
            <div className="w-full rounded-2xl bg-[#F7F8FA] border border-neutral-200/90 p-8 sm:p-12 flex flex-col gap-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-300 pb-4 gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                    {isPt ? 'Fundamentos Visuais · Design Tokens' : 'Visual Foundations · Design Tokens'}
                  </span>
                  <span className="text-xl font-bold text-[#0F1115]">
                    {isPt ? 'Padronização e Consistência de Interface' : 'Standardization & Interface Consistency'}
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-500">
                  LOVABLE + TAILWIND UI
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                
                <div className="bg-white p-6 rounded-xl border border-neutral-200 flex flex-col gap-2.5">
                  <span className="font-mono text-neutral-500 font-bold uppercase tracking-wider">
                    {isPt ? 'Cores Semânticas' : 'Semantic Colors'}
                  </span>
                  <h4 className="font-bold text-sm text-[#0F1115]">
                    {isPt ? 'Clareza de Estado Imediata' : 'Instant State Clarity'}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed font-light">
                    {isPt 
                      ? 'Cores codificadas para cada etapa (Novo, Triado, Atribuído, Em Curso, Resolvido) garantindo conformidade com critérios de contraste WCAG AA/AAA para acessibilidade universal.'
                      : 'Coded colors for each lifecycle stage (New, Triaged, Assigned, In Progress, Resolved) ensuring strict WCAG AA/AAA contrast compliance.'}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-neutral-200 flex flex-col gap-2.5">
                  <span className="font-mono text-neutral-500 font-bold uppercase tracking-wider">
                    {isPt ? 'Escala Tipográfica' : 'Typographic Scale'}
                  </span>
                  <h4 className="font-bold text-sm text-[#0F1115]">
                    {isPt ? 'Scannability & Leitura Focada' : 'Scannability & Reading Rhythm'}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed font-light">
                    {isPt 
                      ? 'Hierarquia clara com títulos objetivos, texto descritivo com medida de linha confortável (65-75ch) e identificadores numéricos tabulares (#TK-...) para alinhamento uniforme.'
                      : 'Clear hierarchy with focused titles, comfortable body measures (65-75ch), and tabular numeric identifiers (#TK-...) for uniform alignment.'}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-neutral-200 flex flex-col gap-2.5">
                  <span className="font-mono text-neutral-500 font-bold uppercase tracking-wider">
                    {isPt ? 'Ergonomia de Componentes' : 'Component Ergonomics'}
                  </span>
                  <h4 className="font-bold text-sm text-[#0F1115]">
                    {isPt ? 'Submissão e Triagem Sem Atrito' : 'Frictionless Input & Triage'}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed font-light">
                    {isPt 
                      ? 'Inputs com validação em linha, botões de ação única e filtros persistentes por projeto para permitir que agentes trabalhem com agilidade no dia a dia.'
                      : 'Inline validated fields, single-action buttons, and persistent project filters enabling specialists to process tickets with high daily speed.'}
                  </p>
                </div>

              </div>

            </div>
            <p className="text-xs font-mono text-neutral-500 px-2">
              {isPt 
                ? 'Figura 4.2 — Princípios de design system: tokens semânticos, ergonomia tipográfica e componentes funcionais.'
                : 'Figure 4.2 — Design system principles: semantic tokens, typographic ergonomics, and functional components.'}
            </p>
          </div>
        </section>


        {/* =========================================================================
            SECTION 05: AS DECISÕES DE DESIGN / KEY DESIGN DECISIONS
            ========================================================================= */}
        <section id="decisoes" className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '05 / As decisões de design' : '05 / Key Design Decisions'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1115]">
              {isPt 
                ? 'Cinco decisões fundamentais que transformaram a operação' 
                : 'Five core decisions that reshaped the operational workflow'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              {isPt 
                ? 'Cada decisão foi calibrada para eliminar fricções humanas e acelerar o tempo de resolução sem introduzir complexidade desnecessária.'
                : 'Each decision was calibrated to eliminate human bottlenecks and accelerate resolution velocity without adding unnecessary cognitive load.'}
            </p>
          </div>

          {/* 5 Decisions in Deep Editorial Walkthrough */}
          <div className="flex flex-col gap-8">
            {designDecisions.map((dec) => (
              <div key={dec.num} className="bg-white rounded-2xl p-8 sm:p-10 border border-neutral-200/90 flex flex-col md:flex-row gap-6 md:gap-12 items-start shadow-xs">
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-3xl sm:text-4xl font-black text-neutral-300 font-mono">
                    {dec.num}
                  </span>
                </div>
                <div className="flex flex-col gap-2 max-w-3xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F1115]">
                    {dec.title}
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    {dec.subtitle}
                  </span>
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-light mt-2">
                    {dec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Lifecycle Simulator (Decision 05 Detail) */}
          <div className="w-full rounded-2xl bg-[#F0F2F6] border border-neutral-200/90 p-8 sm:p-12 flex flex-col gap-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-300 pb-4 gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600">
                  {isPt ? 'Simulador do Ciclo de Vida do Ticket' : 'Ticket Lifecycle Simulator'}
                </span>
                <span className="text-lg font-bold text-[#0F1115]">
                  {isPt ? 'Os 5 Estados da Resolução' : 'The 5 Resolution States'}
                </span>
              </div>
              <span className="text-xs font-mono text-neutral-500">
                {isPt ? 'Clique nos passos para avançar' : 'Click steps to advance'}
              </span>
            </div>

            {/* Steps Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
              {lifecycleStages.map((stg, idx) => {
                const isCurrent = activeLifecycleStep === idx;
                return (
                  <button
                    key={stg.step}
                    onClick={() => setActiveLifecycleStep(idx)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-neutral-900 text-white font-bold border-neutral-900 shadow-xs'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className={`text-[10px] ${isCurrent ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {stg.step}
                    </div>
                    <div className="font-bold text-xs truncate mt-0.5">
                      {stg.status}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Step Details */}
            <div className="bg-white rounded-xl p-6 border border-neutral-200 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#0F1115]">
                    PASSO {lifecycleStages[activeLifecycleStep].step}: {lifecycleStages[activeLifecycleStep].title}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-900 font-mono text-[10px] font-bold">
                    {lifecycleStages[activeLifecycleStep].status}
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-500">
                  {isPt ? 'Ator Responsável:' : 'Actor:'} <strong>{lifecycleStages[activeLifecycleStep].role}</strong>
                </span>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed font-light">
                {lifecycleStages[activeLifecycleStep].action}
              </p>

              <div className="bg-[#F8F9FB] p-3.5 rounded-lg border border-neutral-200/70 font-mono text-xs flex flex-wrap items-center justify-between gap-2">
                <span className="text-neutral-500">{isPt ? 'Dados Gravados:' : 'Captured Data:'}</span>
                <span className="font-bold text-neutral-900">{lifecycleStages[activeLifecycleStep].data}</span>
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================================
            SECTION 06: A SOLUÇÃO / THE SOLUTION
            ========================================================================= */}
        <section id="solucao" className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '06 / A solução' : '06 / The Solution'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1115]">
              {isPt 
                ? 'A Plataforma de Helpdesk funcional em operação' 
                : 'The functional Helpdesk Platform in operation'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              {isPt 
                ? 'Um ecossistema conectado que substitui conversas dispersas por fluxos estruturados, garantindo clareza desde a submissão até ao fecho do ticket.'
                : 'A connected ecosystem replacing scattered chat threads with structured flows, ensuring complete transparency from initial submission to final ticket closure.'}
            </p>
          </div>

          {/* Full-width Product Interface Display */}
          <div className="flex flex-col gap-3">
            <div 
              onClick={() => setLightboxImage({ 
                src: coverHelpImg, 
                caption: isPt ? 'Interface Conceitual Abstrata da Plataforma de Helpdesk' : 'Conceptual Abstract Interface of Helpdesk Platform' 
              })}
              className="group relative w-full rounded-2xl sm:rounded-3xl bg-[#0F1115] border border-neutral-300 overflow-hidden cursor-pointer shadow-xl"
            >
              <img 
                src={coverHelpImg} 
                alt="Helpdesk Platform Interface UI" 
                className="w-full h-auto max-h-[720px] object-cover sm:object-contain transition-transform duration-700 group-hover:scale-[1.01]" 
              />
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white text-[11px] font-mono px-3.5 py-1.5 rounded-full flex items-center gap-2">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isPt ? 'Ampliar Interface' : 'Expand Interface'}</span>
              </div>
            </div>
            <p className="text-xs font-mono text-neutral-500 px-2">
              {isPt 
                ? 'Figura 6.1 — Arquitetura de ecrãs: painel central de tickets, filtros por projeto e barra de navegação contextual (representação abstrata).'
                : 'Figure 6.1 — Screen architecture: central ticket view, project filters, and contextual navigation (abstract representation).'}
            </p>
          </div>

          {/* Alternating Two-Column Editorial Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            <div className="bg-white rounded-2xl p-8 border border-neutral-200/90 flex flex-col gap-4 shadow-xs">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                {isPt ? 'Interface 01 · Requerente' : 'Interface 01 · Requester'}
              </div>
              <h3 className="text-xl font-bold text-[#0F1115]">
                {isPt ? 'Submissão Limpa & Acompanhamento Direto' : 'Clean Intake & Direct Tracking'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-light">
                {isPt 
                  ? 'O colaborador submete o seu ticket com poucos campos essenciais: projeto, categoria, urgência e anexos. Após submeter, tem acesso a um painel simples onde visualiza em tempo real quem está a resolver o seu pedido e o prazo estimado.'
                  : 'Employees submit requests through minimal essential fields: project, category, urgency, and attachments. After submission, a simple real-time timeline displays who is handling the issue.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-neutral-200/90 flex flex-col gap-4 shadow-xs">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                {isPt ? 'Interface 02 · Agente' : 'Interface 02 · Specialist Agent'}
              </div>
              <h3 className="text-xl font-bold text-[#0F1115]">
                {isPt ? 'Fila Focada por Domínio de Projeto' : 'Project-Isolated Working Queue'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-light">
                {isPt 
                  ? 'O agente acede a uma visão limpa filtrada pelos projetos sob sua responsabilidade. Ao abrir o ticket, encontra todo o histórico de diagnóstico, notas internas confidenciais e atalhos rápidos para atualização de estado.'
                  : 'Agents view queues strictly restricted to their assigned domains. Opening any ticket reveals comprehensive diagnostic logs, confidential notes, and quick state controls.'}
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================================
            SECTION 07: RESULTADOS E APRENDIZAGENS / RESULTS & LEARNINGS
            ========================================================================= */}
        <section id="resultados" className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '07 / Resultados e aprendizagens' : '07 / Results & Learnings'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1115]">
              {isPt 
                ? 'O impacto de transformar o caos invisível num processo estruturado' 
                : 'The impact of turning invisible chaos into a structured system'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              {isPt 
                ? 'O projeto entregou uma plataforma funcional completa e comprovou que ferramentas low-code só atingem o seu potencial quando apoiadas por Design Thinking rigoroso.'
                : 'The project delivered a full functional product and demonstrated that low-code engines only achieve excellence when anchored in rigorous human design reasoning.'}
            </p>
          </div>

          {/* Delivered Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-xl p-6 border border-neutral-200/90 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                {isPt ? 'Canal Único' : 'Single Intake'}
              </span>
              <h3 className="text-base font-bold text-[#0F1115]">
                {isPt ? 'Centralização Total' : 'Total Centralization'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                {isPt 
                  ? 'Eliminação de pedidos dispersos em DMs e conversas informais.'
                  : 'Elimination of lost requests scattered across informal direct chats.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200/90 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                {isPt ? 'Rastreabilidade' : 'Traceability'}
              </span>
              <h3 className="text-base font-bold text-[#0F1115]">
                {isPt ? 'Auditoria Completa' : 'Full Audit Trail'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                {isPt 
                  ? 'Cada ticket possui identificador único e registo cronológico de ações.'
                  : 'Every request receives a unique ID and chronological audit timeline.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200/90 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                {isPt ? 'Três Perfis' : 'Three Roles'}
              </span>
              <h3 className="text-base font-bold text-[#0F1115]">
                {isPt ? 'Workspaces Sob Medida' : 'Tailored Workspaces'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                {isPt 
                  ? 'Fronteiras operacionais claras para requerentes, agentes e gestores.'
                  : 'Clear operational separation between requesters, agents, and admins.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200/90 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                {isPt ? 'Governança' : 'Governance'}
              </span>
              <h3 className="text-base font-bold text-[#0F1115]">
                {isPt ? 'Métricas de SLA' : 'SLA Analytics'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                {isPt 
                  ? 'Visão macro para monitorização de volumes e tempos de resolução.'
                  : 'Macro operational oversight of request volume and resolution velocity.'}
              </p>
            </div>

          </div>

          {/* Key Learnings List */}
          <div className="bg-[#F8F9FA] rounded-2xl p-8 sm:p-12 border border-neutral-200/90 flex flex-col gap-6">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? 'Principais Aprendizagens de Design de Produto' : 'Core Product Design Takeaways'}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-[#0F1115]">
                  {isPt ? '1. Ferramentas internas precisam de tanto UX como produtos de consumo' : '1. Internal enterprise tools deserve the same UX polish as consumer products'}
                </span>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {isPt 
                    ? 'Muitas organizações descuram as interfaces internas. Investir em clareza nestes sistemas alivia o stress diário dos colaboradores e poupa centenas de horas de fricção repetitiva.'
                    : 'Many companies neglect internal tooling. Investing in clarity here directly reduces employee burnout and saves hundreds of hours in repetitive friction.'}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-[#0F1115]">
                  {isPt ? '2. O Design Thinking antecede e condiciona o código' : '2. Design Thinking precedes and dictates the code'}
                </span>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {isPt 
                    ? 'Ferramentas low-code como o Lovable aceleram a construção funcional, mas são inúteis se a taxonomia, as regras de negócio e a compreensão humana dos utilizadores não tiverem sido meticulosamente estruturadas primeiro.'
                    : 'Low-code engines accelerate functional deployment, but they are powerless if information taxonomy, business logic, and human understanding are not rigorously designed first.'}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-[#0F1115]">
                  {isPt ? '3. Transparência de estado erradica a ansiedade' : '3. Status transparency eliminates workplace anxiety'}
                </span>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {isPt 
                    ? 'Quando um colaborador tem a certeza de que o seu pedido está registado e sabe em que etapa se encontra, a necessidade de cobranças manuais por chat privado desaparece.'
                    : 'When a colleague has confidence that their issue is recorded and visible, anxiety-driven manual follow-ups completely evaporate.'}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-[#0F1115]">
                  {isPt ? '4. Pensamento sistémico sobre estética superficial' : '4. Systems thinking over surface aesthetic'}
                </span>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {isPt 
                    ? 'O sucesso deste projeto residiu na articulação entre os 3 papéis e os limites de informação, garantindo que o sistema é sustentável e escalável à medida que a organização cresce.'
                    : 'The project’s success lay in the relationship between the 3 user roles, ensuring the system remains scalable as organizational demands expand.'}
                </p>
              </div>
            </div>
          </div>

          {/* Prominent Personal & Professional Reflection */}
          <div className="border-t border-b border-neutral-300 py-12 sm:py-16 my-4">
            <blockquote className="max-w-4xl mx-auto flex flex-col gap-6 text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-light italic text-[#0F1115] leading-relaxed">
                {isPt
                  ? '«O verdadeiro valor deste projeto não residiu em "escrever código", mas em mapear a dor de dezenas de colaboradores, estruturar um fluxo com limites claros entre quem pede, quem resolve e quem gere, e transformar um caos silencioso num sistema onde todos trabalham com clareza e respeito pelo tempo alheio.»'
                  : '“The true value of this project did not lie in ‘writing code’, but in diagnosing the operational friction of dozens of colleagues, defining boundaries between requesters, agents, and admins, and turning quiet chaos into a system where everyone works with clarity and mutual respect for each other’s time.”'}
              </p>
              <cite className="not-italic text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-bold">
                RAÍSSA MORIÁ · PRODUCT & DIGITAL SYSTEMS DESIGNER
              </cite>
            </blockquote>
          </div>

        </section>

      </EditorialProjectLayout>

      {/* Lightbox Modal for any clicked diagram */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center gap-3"
            >
              <div className="w-full flex justify-between items-center text-white px-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                  {lightboxImage.caption || (isPt ? 'Visualizador de Diagrama' : 'Diagram Viewer')}
                </span>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img 
                src={lightboxImage.src} 
                alt="Expanded View" 
                className="max-h-[82vh] w-auto max-w-full object-contain rounded-xl shadow-2xl bg-black"
              />

              {lightboxImage.caption && (
                <p className="text-xs font-mono text-neutral-400 text-center">
                  {lightboxImage.caption}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
