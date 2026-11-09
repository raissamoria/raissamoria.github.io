import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Workflow,
  Languages
} from 'lucide-react';
import { Language } from '../types';
import { OpticalGlassButton } from './OpticalGlass';

// @ts-ignore
import coverImg from '../assets/images/help.png';

interface MakingSupportVisibleProjectProps {
  language: Language;
  onBack: () => void;
}

export const MakingSupportVisibleProject: React.FC<MakingSupportVisibleProjectProps> = ({
  language: initialLanguage,
  onBack,
}) => {
  // Allow toggling language directly within the case study or inherit from global language prop
  const [currentLang, setCurrentLang] = useState<Language>(initialLanguage);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'requester' | 'agent' | 'admin'>('requester');
  const [activeLifecycleStep, setActiveLifecycleStep] = useState<number>(0);
  const [activeProcessStage, setActiveProcessStage] = useState<number>(0);

  // Sync if prop changes
  useEffect(() => {
    setCurrentLang(initialLanguage);
  }, [initialLanguage]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const isPt = currentLang === 'pt';

  const rolesData = {
    requester: {
      title: isPt ? 'Requerente' : 'Requester',
      badge: isPt ? 'PERFIL UTILIZADOR' : 'FRONTSTAGE USER',
      color: '#3B82F6',
      description: isPt 
        ? 'Colaboradores de qualquer departamento que necessitam de apoio técnico ou assistência em sistemas operacionais.' 
        : 'Employees across departments who need technical or operational assistance.',
      actions: isPt ? [
        'Reporta problemas operacionais e de software através de formulários estruturados',
        'Cria e submete tickets de suporte com descrição e anexos contextuais',
        'Acompanha o progresso dos pedidos em tempo real sem necessidade de cobranças manuais',
        'Acede ao histórico completo dos seus tickets e notas de resolução'
      ] : [
        'Reports operational and software issues through structured forms',
        'Creates and submits support tickets with relevant attachments',
        'Tracks real-time ticket progress without needing private follow-ups',
        'Accesses comprehensive personal ticket history and resolution notes'
      ],
      uiFocus: isPt 
        ? 'Simplicidade, submissão sem atrito, clareza absoluta de estado' 
        : 'Simplicity, instant submission, frictionless status clarity'
    },
    agent: {
      title: isPt ? 'Agente' : 'Agent',
      badge: isPt ? 'ESPAÇO DO ESPECIALISTA' : 'SPECIALIST WORKSPACE',
      color: '#60A5FA',
      description: isPt 
        ? 'Especialistas técnicos atribuídos a projetos específicos que analisam, investigam e resolvem tickets.' 
        : 'Specialists assigned to specific projects who diagnose, update, and resolve tickets.',
      actions: isPt ? [
        'Recebe tickets estritamente associados aos projetos sob a sua responsabilidade',
        'Analisa o contexto detalhado, nível de urgência e ambiente do problema',
        'Gere os estados do pedido desde a triagem à resolução efetiva',
        'Regista intervenções técnicas, notas internas e atualizações de progresso'
      ] : [
        'Receives tickets strictly associated with assigned project domains',
        'Reviews detailed ticket context, urgency, and system environment',
        'Manages request states from triage to active investigation',
        'Records technical interventions, internal notes, and solution updates'
      ],
      uiFocus: isPt 
        ? 'Foco, priorização de tarefas, contexto de projeto, registo ágil de intervenções' 
        : 'Focus, prioritization, project context, fast intervention logging'
    },
    admin: {
      title: isPt ? 'Administrador' : 'Administrator',
      badge: isPt ? 'BACKOFFICE OPERACIONAL' : 'OPERATIONAL BACKOFFICE',
      color: '#3B82F6',
      description: isPt 
        ? 'Líderes operacionais e gestores que supervisionam o ecossistema global de suporte e fluxos de trabalho.' 
        : 'Operations leads and managers overseeing the health of the entire support ecosystem.',
      actions: isPt ? [
        'Gere a infraestrutura de backoffice e políticas de acesso da organização',
        'Supervisiona tickets, projetos, categorias de suporte e utilizadores',
        'Gere informações operacionais, equipas técnicas e fluxos de escalamento',
        'Acede a métricas em tempo real, tempos médios de resolução e dashboards operacionais'
      ] : [
        'Manages the central backoffice infrastructure and security policies',
        'Oversees tickets, project assignments, categories, and user permissions',
        'Manages operational information, teams, and escalation protocols',
        'Accesses real-time analytics, resolution velocities, and dashboards'
      ],
      uiFocus: isPt 
        ? 'Controlo, governança, visão macro, flexibilidade operacional' 
        : 'Control, governance, macro visibility, operational agility'
    }
  };

  const lifecycleStages = [
    {
      step: '01',
      title: isPt ? 'Problema Reportado' : 'Issue Reported',
      role: isPt ? 'Requerente' : 'Requester',
      action: isPt 
        ? 'Um colaborador encontra um entrave no sistema e submete um ticket estruturado pelo portal central.' 
        : 'An employee encounters a system roadblock and submits a structured ticket via the central portal.',
      data: isPt ? 'Categoria, descrição, anexo, urgência' : 'Category, description, screenshot, urgent flag',
      status: isPt ? 'NOVO' : 'NEW'
    },
    {
      step: '02',
      title: isPt ? 'Ticket Criado & Triado' : 'Ticket Created & Classified',
      role: isPt ? 'Motor da Plataforma' : 'Platform Engine',
      action: isPt 
        ? 'O sistema valida os dados, gera um identificador único e associa o pedido ao domínio do projeto correto.' 
        : 'The system validates inputs, stamps a unique ID, and maps the issue to its associated project domain.',
      data: isPt ? 'Ticket #TK-842, Tag do Projeto, Data/Hora' : 'Ticket #TK-842, Project Tag, Timestamp',
      status: isPt ? 'TRIADO' : 'TRIAGED'
    },
    {
      step: '03',
      title: isPt ? 'Encaminhamento por Projeto' : 'Project Context Routing',
      role: isPt ? 'Atribuição ao Agente' : 'Agent Assignment',
      action: isPt 
        ? 'O pedido surge automaticamente na fila do projeto correspondente, acessível apenas aos especialistas autorizados.' 
        : 'The request automatically surfaces in the assigned project queue, visible only to authorized specialists.',
      data: isPt ? 'Especialista atribuído, contagem SLA' : 'Assigned specialist, SLA countdown',
      status: isPt ? 'ATRIBUÍDO' : 'ASSIGNED'
    },
    {
      step: '04',
      title: isPt ? 'Intervenção do Agente' : 'Agent Intervention',
      role: isPt ? 'Agente Técnico' : 'Agent',
      action: isPt 
        ? 'O agente investiga a raiz do problema, regista notas técnicas, executa a resolução e comunica o avanço.' 
        : 'The agent investigates, logs diagnostics, performs the resolution, and communicates progress.',
      data: isPt ? 'Histórico de intervenção, registo interno' : 'Intervention history, internal work log',
      status: isPt ? 'EM CURSO' : 'IN PROGRESS'
    },
    {
      step: '05',
      title: isPt ? 'Acompanhamento & Auditoria' : 'Resolution Tracking & Audit',
      role: isPt ? 'Requerente & Admin' : 'Requester & Admin',
      action: isPt 
        ? 'O requerente valida a resolução; o dashboard de administração grava métricas de velocidade e arquiva a auditoria.' 
        : 'Requester confirms resolution; admin dashboard captures velocity metrics and archives the audit trail.',
      data: isPt ? 'Confirmação de satisfação, timestamp de fecho' : 'Satisfaction confirmation, resolution timestamp',
      status: isPt ? 'RESOLVIDO' : 'RESOLVED'
    }
  ];

  const processStages = [
    {
      number: '01',
      name: isPt ? 'Compreender' : 'Understand',
      label: isPt ? 'Análise Operacional' : 'Operational Analysis',
      purpose: isPt 
        ? 'Mapear o vazio operacional gerado pela ausência de um canal formal de suporte. Analisar canais informais (DMs, conversas de corredor, e-mails privados) e identificar gargalos críticos onde pedidos ficavam esquecidos.' 
        : 'Unpack the operational friction caused by the absence of a support channel. Map informal communication channels (DMs, hallway calls, private emails) and identify critical bottlenecks that left issues unrecorded.'
    },
    {
      number: '02',
      name: isPt ? 'Definir' : 'Define',
      label: isPt ? 'Perfis & Escopo' : 'Role & Scope Definition',
      purpose: isPt 
        ? 'Definir três arquétipos de utilizador distintos: Requerente, Agente e Administrador. Estabelecer permissões claras, limites de dados e necessidades de informação para cada perfil, evitando dispersão operacional.' 
        : 'Define three distinct user archetypes: Requester, Agent, and Administrator. Establish clear permissions, data boundaries, and information requirements for each persona to prevent operational spillover.'
    },
    {
      number: '03',
      name: isPt ? 'Estruturar' : 'Structure',
      label: isPt ? 'Arquitetura de Informação' : 'Information Architecture',
      purpose: isPt 
        ? 'Desenhar a taxonomia da plataforma: categorização de tickets por projeto, ciclo de vida do pedido (Novo → Atribuído → Em Curso → Resolvido) e registo cronológico de intervenções para transparência.' 
        : 'Design the underlying system model: project-based ticket categorization, ticket lifecycle states (New → Assigned → In Progress → Resolved), and structured intervention logging for auditability.'
    },
    {
      number: '04',
      name: isPt ? 'Construir' : 'Build',
      label: isPt ? 'Implementação Low-Code' : 'Low-Code Implementation',
      purpose: isPt 
        ? 'Converter wireframes e fluxos de interação num produto digital funcional através do Lovable. O raciocínio humano de design guiou a estrutura e a arquitetura, enquanto o Lovable acelerou o desenvolvimento.' 
        : 'Translate UX wireframes and interaction patterns into a functional digital platform using Lovable. Human design reasoning guided the architecture, while Lovable provided rapid full-stack execution.'
    },
    {
      number: '05',
      name: isPt ? 'Iterar' : 'Iterate',
      label: isPt ? 'Refinamento & Ajustes' : 'Refinement & Tuning',
      purpose: isPt 
        ? 'Ajustar a ergonomia dos formulários, navegação adaptada a cada perfil, scannability da lista de tickets e clareza das etiquetas de estado para assegurar uma experiência fluida no desktop e mobile.' 
        : 'Iterate on form ergonomics, role-specific navigation menus, ticket scannability, and status badge legibility to ensure the platform feels effortless across desktop and mobile screens.'
    }
  ];

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#08090D] text-[#F5F5F7] selection:bg-[#3B82F6] selection:text-white font-sans antialiased pb-32"
    >
      {/* STICKY TOP EDITORIAL NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full bg-[#08090D]/90 backdrop-blur-md border-b border-white/[0.06] px-6 md:px-12 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center gap-4">
          <button
            onClick={onBack}
            className="group flex items-center gap-2.5 text-xs font-mono tracking-widest text-[#9999A5] hover:text-[#F5F5F7] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#3B82F6]" />
            <span>{isPt ? 'VOLTAR AOS PROJETOS' : 'BACK TO WORKS'}</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Quick in-page language switcher */}
            <div className="flex items-center rounded-full bg-[#14121C] border border-white/[0.08] p-0.5 text-[11px] font-mono">
              <button
                onClick={() => setCurrentLang('pt')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  isPt 
                    ? 'bg-[#3B82F6] text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                    : 'text-[#9999A5] hover:text-white'
                }`}
                title="Versão em Português"
              >
                PT
              </button>
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  !isPt 
                    ? 'bg-[#3B82F6] text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                    : 'text-[#9999A5] hover:text-white'
                }`}
                title="English version"
              >
                EN
              </button>
            </div>

            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-[#14121C] border border-white/[0.08] text-[#60A5FA]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              {isPt ? 'ESTUDO DE CASO CONFIDENCIAL' : 'CONFIDENTIAL CASE STUDY'}
            </span>
            <span className="text-xs font-mono text-[#9999A5] uppercase tracking-widest hidden md:inline">
              CASE 03 / HELPDESK
            </span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-24 flex flex-col gap-32">

        {/* ============================================================== */}
        {/* 3. HERO SECTION */}
        {/* ============================================================== */}
        <section className="flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#3B82F6]">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              <span>
                {isPt 
                  ? 'Design UX/UI · Design de Produto · Design Thinking · Criado com Lovable' 
                  : 'UX/UI Design · Product Design · Design Thinking · Built with Lovable'}
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#F5F5F7] leading-[1.02]">
              {isPt ? 'Plataforma de Helpdesk' : 'Helpdesk Platform'}
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-[#9999A5] font-light leading-relaxed max-w-3xl">
              {isPt 
                ? 'De pedidos de suporte informais a uma experiência digital estruturada.' 
                : 'From informal support requests to a structured digital experience.'}
            </p>
          </div>

          {/* CONCEPTUAL HERO IMAGE CARD */}
          <div className="flex flex-col gap-3">
            <div 
              onClick={() => setExpandedImage(coverImg)}
              className="relative rounded-2xl overflow-hidden aspect-[16/9] w-full bg-[#14121C] border border-white/[0.08] group cursor-pointer shadow-[0_20px_80px_rgba(59,130,246,0.08)] transition-all hover:border-[#3B82F6]/40"
            >
              <img 
                src={coverImg} 
                alt={isPt ? "Plataforma de Helpdesk - Interface Conceitual Abstrata" : "Helpdesk Platform - Conceptual Abstract Interface"} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090D]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8">
                <span className="font-mono text-[11px] uppercase tracking-wider bg-[#08090D]/80 backdrop-blur-md border border-white/10 text-white/90 px-3.5 py-2 rounded-full flex items-center gap-2 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>{isPt ? 'Ampliar Imagem' : 'Expand Visual'}</span>
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-[#9999A5] px-2">
              <span>
                {isPt 
                  ? 'Figura 1.0 — Arquitetura de plataforma e direção conceitual da interface' 
                  : 'Figure 1.0 — Conceptual platform architecture & interface direction'}
              </span>
              <span className="text-[#60A5FA]">
                {isPt ? 'Representação abstrata (NDA preservado)' : 'Abstracted representation'}
              </span>
            </div>
          </div>

          {/* PROJECT METADATA BAR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-b border-white/[0.08] font-mono text-xs">
            <div className="flex flex-col gap-2">
              <span className="text-[#9999A5] uppercase tracking-widest text-[10px]">
                {isPt ? 'O MEU PAPEL' : 'MY ROLE'}
              </span>
              <span className="text-[#F5F5F7] font-medium leading-relaxed">
                {isPt ? (
                  <>Product Designer<br />Designer UX/UI<br />Low-Code Developer</>
                ) : (
                  <>Product Designer<br />UX/UI Designer<br />Low-Code Developer</>
                )}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[#9999A5] uppercase tracking-widest text-[10px]">
                {isPt ? 'TECNOLOGIA' : 'TECHNOLOGY'}
              </span>
              <span className="text-[#F5F5F7] font-medium leading-relaxed">
                {isPt ? (
                  <>Motor Lovable<br />Tailwind UI<br />Arquitetura por Perfis</>
                ) : (
                  <>Lovable Engine<br />Tailwind UI<br />Role-Based Architecture</>
                )}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[#9999A5] uppercase tracking-widest text-[10px]">
                {isPt ? 'METODOLOGIA' : 'METHODOLOGY'}
              </span>
              <span className="text-[#F5F5F7] font-medium leading-relaxed">
                {isPt ? (
                  <>Design Thinking<br />Mapeamento de Processos<br />Prototipagem Iterativa</>
                ) : (
                  <>Design Thinking<br />Process Mapping<br />Iterative Prototyping</>
                )}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[#9999A5] uppercase tracking-widest text-[10px]">
                {isPt ? 'CONFIDENCIALIDADE' : 'CONFIDENTIALITY'}
              </span>
              <span className="text-[#9999A5] leading-relaxed text-[11px]">
                {isPt 
                  ? 'Sob sigilo (NDA). Todas as imagens são representações conceituais e abstratas.' 
                  : 'Under NDA. All visuals are conceptual, abstract representations.'}
              </span>
            </div>
          </div>
        </section>


        {/* ============================================================== */}
        {/* 01 — OVERVIEW */}
        {/* ============================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase">
              {isPt ? '01 — VISÃO GERAL' : '01 — OVERVIEW'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F7] leading-tight">
              {isPt 
                ? 'O suporte acontecia. Mas não existia um sistema por trás dele.' 
                : 'Support was happening. But there was no system behind it.'}
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6 text-[#9999A5] font-light text-base md:text-lg leading-relaxed">
            {isPt ? (
              <>
                <p>
                  O projeto surgiu de um vazio operacional evidente: a inexistência de um canal formal de suporte dedicado dentro da organização. Quando os colaboradores enfrentavam um entrave, encontravam erros em sistemas ou necessitavam de intervenções técnicas, não tinham um ponto de contacto estruturado. Em vez disso, contactavam diretamente quem supunham ser o responsável através de mensagens privadas no Slack, e-mails individuais ou conversas informais de corredor.
                </p>
                <p>
                  Não existia um ambiente centralizado para registar pedidos, monitorizar o estado de resolução em tempo real ou manter um histórico documentado das intervenções técnicas. O suporte ocorria diariamente de forma reativa e dispersa, gerando fricção constante, perda de contexto e opacidade operacional.
                </p>
                <p className="text-[#F5F5F7]">
                  O desafio consistiu em desenhar e construir uma plataforma de Helpdesk centralizada conectando três perfis de utilizador distintos — <strong className="text-[#60A5FA]">Requerentes</strong>, <strong className="text-[#60A5FA]">Agentes</strong> e <strong className="text-[#60A5FA]">Administradores</strong> — num fluxo operacional unificado. Tratou-se de um produto gerado a partir de uma necessidade operacional real, e não de um mero redesign visual superficial.
                </p>
              </>
            ) : (
              <>
                <p>
                  The project emerged from a fundamental operational void: the absence of a dedicated support channel within the organisation. When employees encountered an issue, hit a software barrier, or needed technical interventions, they had no formal entry point. Instead, they reached out directly to whoever they assumed was responsible through direct messages, private emails, or casual conversations.
                </p>
                <p>
                  There was no centralised environment to log requests, monitor real-time resolution progress, or maintain a structured record of support history. Support was happening informally every day, but because it had no dedicated digital architecture, it generated friction, lost context, and operational opacity.
                </p>
                <p className="text-[#F5F5F7]">
                  The challenge was to design and develop a centralised Helpdesk platform connecting three distinct user roles—<strong className="text-[#60A5FA]">Requesters</strong>, <strong className="text-[#60A5FA]">Agents</strong>, and <strong className="text-[#60A5FA]">Administrators</strong>—into a single, coordinated operational workflow. This was a product created from a tangible operational necessity, not merely a superficial visual redesign.
                </p>
              </>
            )}
          </div>
        </section>


        {/* ============================================================== */}
        {/* 02 — THE REALITY BEFORE */}
        {/* ============================================================== */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase">
              {isPt ? '02 — A REALIDADE ANTERIOR' : '02 — THE REALITY BEFORE'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F7] leading-tight">
              {isPt 
                ? 'Obter ajuda dependia de saber a quem perguntar.' 
                : 'Getting help depended on knowing who to ask.'}
            </h2>
            <p className="text-[#9999A5] font-light text-base md:text-lg leading-relaxed pt-2">
              {isPt 
                ? 'Antes da criação desta plataforma, resolver um problema dependia exclusivamente de relações interpessoais e adivinhação. Não havia sistema de tickets estruturado, nem critérios objetivos de prioridade, nem visibilidade sobre a carga de trabalho ou prazos de resolução.' 
                : 'Before this platform existed, resolving an issue was entirely reliant on personal connections and guesswork. There was no structured ticket system, no standard priority rubric, and zero visibility into workload or resolution timelines.'}
            </p>
          </div>

          {/* ABSTRACT BEFORE DIAGRAM */}
          <div className="rounded-2xl bg-[#14121C] border border-white/[0.08] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
                {isPt ? 'FLUXO INFORMAL & CAÓTICO' : 'UNSTRUCTURED & CHAOTIC FLOW'}
              </span>
            </div>

            <div className="max-w-4xl mx-auto flex flex-col gap-10 pt-4">
              <div className="text-center font-mono text-xs text-[#9999A5] uppercase tracking-widest">
                {isPt 
                  ? 'Padrão de Suporte Informal Ponto a Ponto (Pré-Plataforma)' 
                  : 'Informal Point-to-Point Support Pattern (Pre-Platform)'}
              </div>

              {/* Node diagram representation */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center">
                {/* Employees Column */}
                <div className="md:col-span-2 flex flex-col gap-3">
                  {[
                    { label: isPt ? 'Requerente A' : 'Requester A', dept: isPt ? 'Equipa de Marketing' : 'Marketing Team' },
                    { label: isPt ? 'Requerente B' : 'Requester B', dept: isPt ? 'Líder de Operações' : 'Operations Lead' },
                    { label: isPt ? 'Requerente C' : 'Requester C', dept: isPt ? 'Analista Financeiro' : 'Finance Analyst' },
                    { label: isPt ? 'Requerente D' : 'Requester D', dept: isPt ? 'Associado de Campo' : 'Field Associate' }
                  ].map((node, i) => (
                    <div 
                      key={i} 
                      className="p-3.5 rounded-xl bg-[#08090D] border border-white/[0.06] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-neutral-600" />
                        <span className="text-xs font-mono text-neutral-300">{node.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#9999A5]">{node.dept}</span>
                    </div>
                  ))}
                </div>

                {/* Broken Communication Flows */}
                <div className="md:col-span-3 flex flex-col items-center justify-center gap-3 px-2">
                  <div className="w-full flex items-center justify-center gap-2 text-rose-400/80 font-mono text-[11px] py-1 border-b border-dashed border-rose-500/30">
                    <span>{isPt ? 'DMs Diretas no Slack/Teams' : 'Direct Slack DM'}</span>
                  </div>
                  <div className="w-full flex items-center justify-center gap-2 text-rose-400/80 font-mono text-[11px] py-1 border-b border-dashed border-rose-500/30">
                    <span>{isPt ? 'Cadeias de E-mail Privadas' : 'Private Email Threads'}</span>
                  </div>
                  <div className="w-full flex items-center justify-center gap-2 text-rose-400/80 font-mono text-[11px] py-1 border-b border-dashed border-rose-500/30">
                    <span>{isPt ? 'Pedidos verbais de corredor' : 'Hallway verbal requests'}</span>
                  </div>
                  <div className="w-full flex items-center justify-center gap-2 text-rose-400/80 font-mono text-[11px] py-1 border-b border-dashed border-rose-500/30">
                    <span>{isPt ? 'Follow-ups sem rastreio' : 'Untracked follow-ups'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#9999A5] pt-2 text-center">
                    {isPt 
                      ? 'Zero registos centrais · Perda de contexto · Histórico fragmentado' 
                      : 'Zero centralized logs · Lost context · Fragmented history'}
                  </span>
                </div>

                {/* Overwhelmed Single Contact Point */}
                <div className="md:col-span-2">
                  <div className="p-6 rounded-2xl bg-[#08090D] border border-rose-500/30 flex flex-col gap-3 text-center items-center shadow-[0_0_40px_rgba(244,63,94,0.08)]">
                    <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">
                        {isPt ? 'Pessoa Responsável' : 'Responsible Person'}
                      </span>
                      <span className="text-[10px] font-mono text-[#9999A5]">
                        {isPt ? 'Gargalo Operacional' : 'Bottleneck Contact'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9999A5] font-light leading-snug">
                      {isPt 
                        ? 'Sobrecarga de notificações privadas. Impossibilidade de priorizar, medir ou delegar tarefas sistematicamente.' 
                        : 'Overloaded with private notifications. Unable to prioritize, measure, or delegate work systematically.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-mono text-xs text-[#9999A5]">
                <div className="p-3 bg-[#08090D]/50 rounded-lg border border-white/[0.04]">
                  {isPt ? 'Sem registo central de tickets' : 'No centralized ticket register'}
                </div>
                <div className="p-3 bg-[#08090D]/50 rounded-lg border border-white/[0.04]">
                  {isPt ? 'Zero visibilidade de estado' : 'Zero visibility into status'}
                </div>
                <div className="p-3 bg-[#08090D]/50 rounded-lg border border-white/[0.04]">
                  {isPt ? 'Sem métricas de operação' : 'No operational metrics'}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ============================================================== */}
        {/* 03 — THE CORE PROBLEM */}
        {/* ============================================================== */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase">
              {isPt ? '03 — O PROBLEMA CENTRAL' : '03 — THE CORE PROBLEM'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F7] leading-tight">
              {isPt 
                ? 'O problema não era pedir ajuda. Era tudo o que acontecia a seguir.' 
                : 'The problem wasn\'t asking for help. It was everything that happened next.'}
            </h2>
            <p className="text-[#9999A5] font-light text-base md:text-lg leading-relaxed pt-2">
              {isPt 
                ? 'Pedir assistência era relativamente simples em chats privados, mas todo o ciclo posterior ao pedido estava quebrado. Três necessidades operacionais críticas não estavam a ser atendidas:' 
                : 'Asking for assistance was simple enough in private chats, but the entire post-request cycle was completely broken. Three fundamental operational necessities were absent:'}
            </p>
          </div>

          {/* THREE TYPOGRAPHIC BLOCKS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#14121C] border border-white/[0.08] hover:border-[#3B82F6]/40 transition-colors flex flex-col justify-between min-h-[320px] group">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-[#3B82F6] tracking-widest">
                  01 / {isPt ? 'NECESSIDADE OPERACIONAL' : 'OPERATIONAL NEED'}
                </span>
                <h3 className="text-3xl font-bold text-[#F5F5F7] tracking-tight">
                  {isPt ? 'Visibilidade' : 'Visibility'}
                </h3>
                <p className="text-[#9999A5] text-sm leading-relaxed">
                  {isPt 
                    ? 'Os colaboradores não tinham como saber se o seu problema fora registado, quem estava a trabalhar nele ou quando seria solucionado, forçando cobranças manuais permanentes.' 
                    : 'Requesters had no way to know whether their issue had been seen, who was working on it, or when a fix could be expected, triggering endless manual check-ins.'}
                </p>
              </div>
              <div className="pt-6 border-t border-white/[0.06] font-mono text-xs text-[#60A5FA]">
                {isPt ? '"Em que estado está o meu pedido neste momento?"' : '"Where does my request stand right now?"'}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#14121C] border border-white/[0.08] hover:border-[#3B82F6]/40 transition-colors flex flex-col justify-between min-h-[320px] group">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-[#3B82F6] tracking-widest">
                  02 / {isPt ? 'NECESSIDADE OPERACIONAL' : 'OPERATIONAL NEED'}
                </span>
                <h3 className="text-3xl font-bold text-[#F5F5F7] tracking-tight">
                  {isPt ? 'Organização' : 'Organisation'}
                </h3>
                <p className="text-[#9999A5] text-sm leading-relaxed">
                  {isPt 
                    ? 'A equipa de suporte não conseguia conectar tickets a projetos específicos, deixando tarefas desprovidas de contexto técnico, sem responsável direto e sem prioridade clara.' 
                    : 'Support personnel could not cleanly tie requests to specific project domains, leaving incoming tasks unassigned, unranked by urgency, and devoid of technical context.'}
                </p>
              </div>
              <div className="pt-6 border-t border-white/[0.06] font-mono text-xs text-[#60A5FA]">
                {isPt ? '"A que projeto pertence isto e quem é o responsável?"' : '"Which project owns this, and who is assigned?"'}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#14121C] border border-white/[0.08] hover:border-[#3B82F6]/40 transition-colors flex flex-col justify-between min-h-[320px] group">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-[#3B82F6] tracking-widest">
                  03 / {isPt ? 'NECESSIDADE OPERACIONAL' : 'OPERATIONAL NEED'}
                </span>
                <h3 className="text-3xl font-bold text-[#F5F5F7] tracking-tight">
                  {isPt ? 'Controlo' : 'Control'}
                </h3>
                <p className="text-[#9999A5] text-sm leading-relaxed">
                  {isPt 
                    ? 'A liderança e administradores operavam sem dados agregados: nem trilhas de auditoria, nem equilíbrio de carga entre técnicos, nem visibilidade sobre falhas recorrentes.' 
                    : 'Leadership and administrators had zero systemic data: no audit trails, no workload balance indicators, and no visibility into recurring operational failures.'}
                </p>
              </div>
              <div className="pt-6 border-t border-white/[0.06] font-mono text-xs text-[#60A5FA]">
                {isPt ? '"Qual é o nível de eficiência e saúde da nossa operação?"' : '"How healthy is our overall support operation?"'}
              </div>
            </div>
          </div>
        </section>


        {/* ============================================================== */}
        {/* 04 — WHY THE PREVIOUS APPROACH WASN'T ENOUGH */}
        {/* ============================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase">
              {isPt ? '04 — POR QUE O MODELO ANTERIOR NÃO BASTAVA' : '04 — WHY IT WASN\'T ENOUGH'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F7] leading-tight">
              {isPt 
                ? 'A comunicação direta resolvia problemas pontuais, não o processo.' 
                : 'Direct communication solved individual problems, not the process.'}
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6 text-[#9999A5] font-light text-base md:text-lg leading-relaxed">
            {isPt ? (
              <>
                <p>
                  É fundamental clarificar que a organização não tinha uma ferramenta deficiente que tenha falhado. Pelo contrário: não existia, pura e simplesmente, qualquer solução de Helpdesk em funcionamento. Todo o suporte dependia exclusivamente de conversas diretas entre colegas de trabalho.
                </p>
                <p>
                  Embora enviar uma mensagem rápida pudesse solucionar um imprevisto passageiro, essa abordagem sabotava a eficiência organizacional a longo prazo. As mensagens diretas criavam silos inacessíveis: soluções técnicas cruciais ficavam trancadas em chats individuais, incidentes repetitivos eram diagnosticados do zero repetidamente e a carga real de trabalho da equipa de apoio era impossível de quantificar.
                </p>
                <p className="text-[#F5F5F7]">
                  Para transitar de um ambiente caótico e reativo para uma operação ágil e resiliente, as interações isoladas precisavam de ser transformadas em pedidos rastreáveis, conectados e documentados dentro de uma aplicação concebida para o efeito.
                </p>
              </>
            ) : (
              <>
                <p>
                  It is important to emphasize that the company did not have a poorly designed existing tool that failed. Rather, there was simply no dedicated Helpdesk system in place at all. The entire support paradigm rested on unstructured, human-to-human direct communication.
                </p>
                <p>
                  While sending a quick message to a colleague might solve a localized issue in the moment, it actively undermined organizational clarity. Direct messages created localized knowledge silos: critical troubleshooting steps were locked inside private chat histories, identical issues were repeatedly investigated from scratch, and team workloads were completely unmeasurable.
                </p>
                <p className="text-[#F5F5F7]">
                  To mature from reactive problem-solving into a resilient, scalable operation, isolated personal interactions needed to be transformed into connected, traceable support requests managed within a dedicated product.
                </p>
              </>
            )}
          </div>
        </section>


        {/* ============================================================== */}
        {/* 05 — THE DESIGN CHALLENGE */}
        {/* ============================================================== */}
        <section className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <div className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase">
              {isPt ? '05 — O DESAFIO DE DESIGN' : '05 — THE DESIGN CHALLENGE'}
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F5F7] leading-[1.08] max-w-5xl">
              {isPt 
                ? 'Como desenhar uma experiência de suporte única para três perfis de utilizador diferentes?' 
                : 'How might we design one support experience for three different user roles?'}
            </h2>
            <p className="text-[#9999A5] font-light text-base md:text-xl leading-relaxed max-w-3xl">
              {isPt 
                ? 'O desafio central residiu em conciliar objetivos cognitivos distintos numa única arquitetura consistente: simplicidade intuitiva para requerentes, foco total para agentes e controlo operacional absoluto para administradores.' 
                : 'The core challenge was balancing distinct cognitive goals within a single coherent architecture: effortless simplicity for requesters, deep focus for specialized agents, and total oversight for backoffice administrators.'}
            </p>
          </div>

          {/* CONCEPTUAL THREE-ROLES INTERACTIVE DIAGRAM */}
          <div className="rounded-2xl bg-[#14121C] border border-white/[0.08] p-8 md:p-12 flex flex-col gap-10">
            {/* Role Selector Tabs */}
            <div className="flex flex-wrap gap-3 pb-6 border-b border-white/[0.08]">
              {(['requester', 'agent', 'admin'] as const).map((roleKey) => (
                <button
                  key={roleKey}
                  onClick={() => setSelectedRole(roleKey)}
                  className={`px-5 py-2.5 rounded-full font-mono text-xs tracking-wider transition-all cursor-pointer ${
                    selectedRole === roleKey 
                      ? 'bg-[#3B82F6] text-white shadow-[0_0_25px_rgba(59,130,246,0.4)]' 
                      : 'bg-[#08090D] text-[#9999A5] hover:text-[#F5F5F7] border border-white/[0.06]'
                  }`}
                >
                  {rolesData[roleKey].title.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Role Specification & Connected Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Role Details */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#60A5FA] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3 py-1 rounded-full">
                    {rolesData[selectedRole].badge}
                  </span>
                  <span className="text-xs font-mono text-[#9999A5]">
                    {isPt ? 'Foco do Perfil:' : 'Role Focus:'} {rolesData[selectedRole].uiFocus}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-[#F5F5F7]">
                  {isPt ? `A Experiência do ${rolesData[selectedRole].title}` : `The ${rolesData[selectedRole].title} Experience`}
                </h3>

                <p className="text-[#9999A5] text-base leading-relaxed">
                  {rolesData[selectedRole].description}
                </p>

                <div className="flex flex-col gap-3 pt-2">
                  <span className="font-mono text-xs text-[#F5F5F7] uppercase tracking-wider">
                    {isPt ? 'Responsabilidades Funcionais Centrais:' : 'Core Functional Responsibilities:'}
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {rolesData[selectedRole].actions.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#9999A5]">
                        <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Central Synchronized Hub Visual */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-[#08090D] border border-white/[0.08] relative">
                <div className="absolute inset-0 bg-radial from-[#3B82F6]/10 to-transparent pointer-events-none" />

                <div className="w-20 h-20 rounded-2xl bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#60A5FA] shadow-[0_0_50px_rgba(59,130,246,0.25)] mb-4">
                  <Workflow className="w-10 h-10 text-[#60A5FA]" />
                </div>

                <span className="text-base font-bold text-white text-center">
                  {isPt ? 'Hub Central de Helpdesk' : 'Helpdesk Central Hub'}
                </span>
                <span className="font-mono text-[10px] text-[#3B82F6] uppercase tracking-widest mt-1">
                  {isPt ? 'Única Fonte de Verdade' : 'Single Source of Truth'}
                </span>

                <div className="w-full mt-6 pt-6 border-t border-white/[0.08] flex justify-between text-center font-mono text-[11px] text-[#9999A5]">
                  <div>
                    <span className="text-white block font-bold">1 {isPt ? 'Plataforma' : 'Platform'}</span>
                    <span>{isPt ? 'Sincronizada' : 'Synchronized'}</span>
                  </div>
                  <div className="border-r border-white/[0.08]" />
                  <div>
                    <span className="text-[#60A5FA] block font-bold">3 {isPt ? 'Portais' : 'Portals'}</span>
                    <span>{isPt ? 'Isolados' : 'Role-Isolated'}</span>
                  </div>
                  <div className="border-r border-white/[0.08]" />
                  <div>
                    <span className="text-white block font-bold">100%</span>
                    <span>{isPt ? 'Rastreável' : 'Audit Trail'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ============================================================== */}
        {/* 06 — MY ROLE & DESIGN THINKING APPROACH */}
        {/* ============================================================== */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase">
              {isPt ? '06 — O MEU PAPEL & DESIGN THINKING' : '06 — MY ROLE & DESIGN THINKING APPROACH'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F7] leading-tight">
              {isPt 
                ? 'Da compreensão do problema à construção de um produto funcional.' 
                : 'From understanding the problem to building a functional product.'}
            </h2>
            <p className="text-[#9999A5] font-light text-base md:text-lg leading-relaxed pt-2">
              {isPt 
                ? 'O meu papel combinou Design UX/UI, pensamento de produto e implementação low-code com Lovable. O raciocínio humano de Design Thinking orientou cada decisão estrutural, enquanto o Lovable atuou como a ferramenta de desenvolvimento para entregar a experiência funcional.' 
                : 'My role encompassed end-to-end UX/UI Design, product thinking, and low-code implementation using Lovable. Human design reasoning guided every structural choice, while Lovable served as the powerful tool used to deliver the working functional experience.'}
            </p>
          </div>

          {/* REFINED HORIZONTAL PROCESS DIAGRAM */}
          <div className="rounded-2xl bg-[#14121C] border border-white/[0.08] p-8 md:p-12 flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {processStages.map((stage, idx) => {
                const isActive = activeProcessStage === idx;
                return (
                  <div 
                    key={idx}
                    onClick={() => setActiveProcessStage(idx)}
                    className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[200px] ${
                      isActive 
                        ? 'bg-[#08090D] border-[#3B82F6] shadow-[0_0_30px_rgba(59,130,246,0.15)]' 
                        : 'bg-[#08090D]/50 border-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-[#3B82F6] font-bold">
                        {stage.number}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#3B82F6]' : 'bg-white/20'}`} />
                    </div>

                    <div className="flex flex-col gap-1 my-4">
                      <span className="text-lg font-bold text-white tracking-tight">
                        {stage.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#60A5FA] uppercase tracking-wider">
                        {stage.label}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-[#9999A5]">
                      {isActive ? (isPt ? 'Etapa Selecionada' : 'Active Stage') : (isPt ? 'Clique para ver' : 'Click to inspect')}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Stage Detail Card */}
            <div className="p-6 md:p-8 rounded-xl bg-[#08090D] border border-white/[0.08] flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="flex flex-col gap-2 max-w-3xl">
                <div className="flex items-center gap-2 font-mono text-xs text-[#3B82F6]">
                  <span>{isPt ? 'ETAPA' : 'PHASE'} {processStages[activeProcessStage].number}</span>
                  <span>//</span>
                  <span className="text-white font-bold">{processStages[activeProcessStage].name.toUpperCase()}</span>
                </div>
                <p className="text-sm md:text-base text-[#9999A5] leading-relaxed">
                  {processStages[activeProcessStage].purpose}
                </p>
              </div>

              <div className="shrink-0 font-mono text-[11px] text-[#60A5FA] bg-[#14121C] border border-white/[0.08] px-4 py-2.5 rounded-lg">
                {isPt ? 'Implementação: Lovable + Figma' : 'Tool: Lovable + Figma'}
              </div>
            </div>
          </div>
        </section>


        {/* ============================================================== */}
        {/* 07 — KEY PRODUCT DECISIONS */}
        {/* ============================================================== */}
        <section className="flex flex-col gap-12">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase">
              {isPt ? '07 — DECISÕES-CHAVE DE PRODUTO' : '07 — KEY PRODUCT DECISIONS'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F7] leading-tight">
              {isPt 
                ? 'Desenhar experiências diferentes dentro da mesma plataforma.' 
                : 'Designing different experiences within one platform.'}
            </h2>
            <p className="text-[#9999A5] font-light text-base md:text-lg leading-relaxed pt-2">
              {isPt 
                ? 'Cinco decisões fundamentais de design e arquitetura guiaram a solução, traduzindo complexidade operacional em interfaces claras e intuitivas.' 
                : 'Five pivotal design and architectural decisions defined the experience, grounding complex operations in intuitive user touchpoints.'}
            </p>
          </div>

          {/* ALTERNATING EDITORIAL LAYOUT */}
          <div className="flex flex-col gap-8">
            {/* Decision 01 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-12 rounded-2xl bg-[#14121C] border border-white/[0.08]">
              <div className="lg:col-span-5 flex flex-col gap-3">
                <span className="font-mono text-xs text-[#3B82F6] tracking-widest">
                  {isPt ? 'DECISÃO 01' : 'DECISION 01'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {isPt ? 'Experiências baseadas em perfis' : 'Role-based experiences'}
                </h3>
                <span className="font-mono text-xs text-[#60A5FA]">
                  {isPt 
                    ? 'Segregar interfaces para eliminar sobrecarga cognitiva' 
                    : 'Segregating user interfaces to eliminate cognitive overload'}
                </span>
              </div>
              <div className="lg:col-span-7 text-[#9999A5] text-base leading-relaxed flex flex-col gap-3">
                <p>
                  {isPt 
                    ? 'Em vez de forçar todos os colaboradores através de um painel denso e generalista, a plataforma serve interfaces desenhadas sob medida para cada perfil. Requerentes acedem a um fluxo limpo de submissão e rastreio; Agentes a uma fila de trabalho priorizada e filtrada por projetos; Administradores a uma suite completa de backoffice.' 
                    : 'Rather than forcing all team members through a dense, omnipotent dashboard, the platform serves tailored views per user role. Requesters see an uncluttered submission and tracking feed; Agents see a prioritized, project-specific queue; Admins see a comprehensive backoffice suite.'}
                </p>
                <p className="text-xs font-mono text-neutral-400">
                  {isPt 
                    ? 'Impacto: Elimina a necessidade de formação complexa para o colaborador comum e maximiza a produtividade do especialista.' 
                    : 'Impact: Reduces training friction to zero for general employees while maximizing operational density for specialists.'}
                </p>
              </div>
            </div>

            {/* Decision 02 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-12 rounded-2xl bg-[#08090D] border border-white/[0.08]">
              <div className="lg:col-span-7 order-2 lg:order-1 text-[#9999A5] text-base leading-relaxed flex flex-col gap-3">
                <p>
                  {isPt 
                    ? 'Cada pedido gera um registo central, permanente e imutável. Ao canalizar os pedidos através de formulários com validações contextuais, eliminam-se canais paralelos. Requerente, agente técnico e gestor visualizam exatamente o mesmo estado em tempo real.' 
                    : 'Every request generates a permanent, single source of truth. By channeling requests through standardized structured inputs, informal side-channels are eliminated. Requesters, assignees, and managers always view identical ticket status indicators.'}
                </p>
                <p className="text-xs font-mono text-neutral-400">
                  {isPt 
                    ? 'Impacto: Acaba de vez com conversas perdidas em chats privados, notas em post-its e cadeias de e-mail intermináveis.' 
                    : 'Impact: Banishes lost chat threads, sticky notes, and private email chains from the operational workflow.'}
                </p>
              </div>
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-3">
                <span className="font-mono text-xs text-[#3B82F6] tracking-widest">
                  {isPt ? 'DECISÃO 02' : 'DECISION 02'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {isPt ? 'Gestão centralizada de tickets' : 'Centralised ticket management'}
                </h3>
                <span className="font-mono text-xs text-[#60A5FA]">
                  {isPt 
                    ? 'Registo digital unificado que substitui conversas dispersas' 
                    : 'A unified digital register replacing fragmented informal conversations'}
                </span>
              </div>
            </div>

            {/* Decision 03 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-12 rounded-2xl bg-[#14121C] border border-white/[0.08]">
              <div className="lg:col-span-5 flex flex-col gap-3">
                <span className="font-mono text-xs text-[#3B82F6] tracking-widest">
                  {isPt ? 'DECISÃO 03' : 'DECISION 03'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {isPt ? 'Organização de tickets por projeto' : 'Project-based ticket organisation'}
                </h3>
                <span className="font-mono text-xs text-[#60A5FA]">
                  {isPt 
                    ? 'Roteamento contextual que evita pedidos de suporte órfãos' 
                    : 'Contextual routing preventing orphaned support requests'}
                </span>
              </div>
              <div className="lg:col-span-7 text-[#9999A5] text-base leading-relaxed flex flex-col gap-3">
                <p>
                  {isPt 
                    ? 'Os pedidos de suporte não existem no vazio; pertencem a projetos, plataformas ou ferramentas operacionais concretas. Ao agrupar tickets em contentores de projetos, os agentes recebem apenas pedidos pertinentes à sua especialidade, evitando descoordenação entre departamentos.' 
                    : 'Support requests do not exist in a vacuum; they belong to specific internal products, operational systems, or client projects. Grouping tickets by project allows agents to receive only issues relevant to their expertise and prevents cross-departmental confusion.'}
                </p>
                <p className="text-xs font-mono text-neutral-400">
                  {isPt 
                    ? 'Impacto: Garante que cada ticket possui um responsável com conhecimento de causa desde o primeiro minuto.' 
                    : 'Impact: Guarantees every ticket has an accountable domain owner from the moment of submission.'}
                </p>
              </div>
            </div>

            {/* Decision 04 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-12 rounded-2xl bg-[#08090D] border border-white/[0.08]">
              <div className="lg:col-span-7 order-2 lg:order-1 text-[#9999A5] text-base leading-relaxed flex flex-col gap-3">
                <p>
                  {isPt 
                    ? 'Plataformas de suporte colapsam frequentemente com excesso de ruído visual. Definimos uma hierarquia visual restrita: etiquetas de estado com contraste imediato (Novo, Triado, Em Curso, Resolvido), feed de intervenções cronológico e metadados recolhíveis.' 
                    : 'Support interfaces frequently collapse under visual density. We introduced a strict hierarchy: high-contrast status tags (New, Assigned, In Progress, Resolved), chronological intervention feeds, and collapsible metadata drawers so essential information is visible in under 2 seconds.'}
                </p>
                <p className="text-xs font-mono text-neutral-400">
                  {isPt 
                    ? 'Impacto: Leitura instantânea para operações dinâmicas onde agentes processam dezenas de atualizações diárias.' 
                    : 'Impact: Rapid scannability for fast-paced operational shifts where agents handle dozens of daily updates.'}
                </p>
              </div>
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-3">
                <span className="font-mono text-xs text-[#3B82F6] tracking-widest">
                  {isPt ? 'DECISÃO 04' : 'DECISION 04'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {isPt ? 'Hierarquia de informação clara' : 'Clear information hierarchy'}
                </h3>
                <span className="font-mono text-xs text-[#60A5FA]">
                  {isPt 
                    ? 'Metadados legíveis e taxonomia consistente do ciclo de vida' 
                    : 'Scannable metadata and standardized lifecycle taxonomy'}
                </span>
              </div>
            </div>

            {/* Decision 05 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-12 rounded-2xl bg-[#14121C] border border-white/[0.08]">
              <div className="lg:col-span-5 flex flex-col gap-3">
                <span className="font-mono text-xs text-[#3B82F6] tracking-widest">
                  {isPt ? 'DECISÃO 05' : 'DECISION 05'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {isPt ? 'Visibilidade operacional & dashboards' : 'Operational visibility & analytics'}
                </h3>
                <span className="font-mono text-xs text-[#60A5FA]">
                  {isPt 
                    ? 'Capacitar a liderança com inteligência operacional em tempo real' 
                    : 'Empowering backoffice leads with macro operational intelligence'}
                </span>
              </div>
              <div className="lg:col-span-7 text-[#9999A5] text-base leading-relaxed flex flex-col gap-3">
                <p>
                  {isPt 
                    ? 'Para evoluir da resolução reativa de incêndios para a otimização de processos, os administradores necessitam de dados objetivos: volume total de pedidos, tempo médio de resposta, tipologias com maior reincidência e distribuição de esforço entre técnicos.' 
                    : 'To transition from reactive troubleshooting to proactive process optimization, administrators need live operational data. The backoffice aggregates ticket volume, average resolution times, recurring issue categories, and agent workload distribution.'}
                </p>
                <p className="text-xs font-mono text-neutral-400">
                  {isPt 
                    ? 'Impacto: Fornece evidências empíricas para apoiar decisões de alocação de recursos e melhoria de infraestrutura.' 
                    : 'Impact: Provides leadership with the empirical evidence needed to allocate technical resources effectively.'}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ============================================================== */}
        {/* 08 — DESIGNING FOR COMPLEXITY */}
        {/* ============================================================== */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase">
              {isPt ? '08 — DESENHAR PARA A COMPLEXIDADE' : '08 — DESIGNING FOR COMPLEXITY'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F7] leading-tight">
              {isPt 
                ? 'O desafio não era desenhar mais ecrãs. Era conectar tudo.' 
                : 'The challenge wasn\'t designing more screens. It was connecting everything.'}
            </h2>
            <p className="text-[#9999A5] font-light text-base md:text-lg leading-relaxed pt-2">
              {isPt 
                ? 'Um único pedido de suporte interage com os três perfis ao longo do seu ciclo de vida. A complexidade de UX consistiu em orquestrar as transições de informação de forma fluida e transparente.' 
                : 'A single support ticket touches all three roles throughout its lifecycle. The UX complexity lied in choreographing data handoffs smoothly without creating disjointed user experiences.'}
            </p>
          </div>

          {/* ABSTRACT SUPPORT LIFECYCLE DIAGRAM */}
          <div className="rounded-2xl bg-[#14121C] border border-white/[0.08] p-8 md:p-12 flex flex-col gap-8">
            <div className="text-xs font-mono text-[#9999A5] uppercase tracking-widest">
              {isPt ? 'Fluxo Conectado do Ciclo de Vida de Suporte' : 'Connected Support Lifecycle Flow'}
            </div>

            {/* Stepper bar */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {lifecycleStages.map((stage, idx) => {
                const isActive = activeLifecycleStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveLifecycleStep(idx)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                      isActive 
                        ? 'bg-[#08090D] border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
                        : 'bg-[#08090D]/40 border-white/[0.04] hover:border-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-center font-mono text-[10px]">
                      <span className="text-[#3B82F6] font-bold">{stage.step}</span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.06] text-[#60A5FA]">{stage.status}</span>
                    </div>
                    <span className="text-xs font-bold text-white line-clamp-1">{stage.title}</span>
                    <span className="text-[10px] font-mono text-[#9999A5]">{stage.role}</span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Lifecycle State Inspector */}
            <div className="p-8 rounded-xl bg-[#08090D] border border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 flex flex-col gap-4">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#3B82F6] font-bold">
                    {isPt ? 'ETAPA' : 'STAGE'} {lifecycleStages[activeLifecycleStep].step}
                  </span>
                  <span className="text-neutral-600">//</span>
                  <span className="text-white font-bold">{lifecycleStages[activeLifecycleStep].title}</span>
                </div>

                <p className="text-base text-[#9999A5] leading-relaxed">
                  {lifecycleStages[activeLifecycleStep].action}
                </p>

                <div className="flex items-center gap-3 pt-2 font-mono text-xs">
                  <span className="text-neutral-500">
                    {isPt ? 'Dados Transferidos:' : 'Data Transferred:'}
                  </span>
                  <span className="text-[#60A5FA] bg-[#14121C] px-3 py-1 rounded-md border border-white/[0.06]">
                    {lifecycleStages[activeLifecycleStep].data}
                  </span>
                </div>
              </div>

              <div className="md:col-span-4 p-5 rounded-xl bg-[#14121C] border border-white/[0.06] flex flex-col gap-3 font-mono text-xs">
                <span className="text-[#9999A5] uppercase text-[10px]">
                  {isPt ? 'ESTADO NO CICLO DE VIDA' : 'LIFECYCLE STATUS'}
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
                  <span className="text-white font-bold">{lifecycleStages[activeLifecycleStep].status}</span>
                </div>
                <span className="text-[#9999A5] text-[11px] leading-snug">
                  {isPt ? 'Papel em Ação:' : 'Role in Action:'} <strong className="text-[#F5F5F7]">{lifecycleStages[activeLifecycleStep].role}</strong>
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ============================================================== */}
        {/* 09 — OUTCOME */}
        {/* ============================================================== */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase">
              {isPt ? '09 — RESULTADO' : '09 — OUTCOME'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F7] leading-tight">
              {isPt 
                ? 'De conversas informais a um fluxo de suporte conectado.' 
                : 'From informal conversations to a connected support workflow.'}
            </h2>
            <p className="text-[#9999A5] font-light text-base md:text-lg leading-relaxed pt-2">
              {isPt 
                ? 'O projeto entregou um produto digital funcional desenvolvido com recurso a Lovable, substituindo abordagens ad-hoc por um ecossistema operacional perfeitamente integrado.' 
                : 'The project delivered a complete, working digital platform built using Lovable. It replaced ad-hoc direct messaging with a structured, role-based operational ecosystem.'}
            </p>
          </div>

          {/* KEY CAPABILITIES DELIVERED */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: isPt ? 'Canal de Suporte Dedicado' : 'Dedicated Support Channel',
                desc: isPt 
                  ? 'Ponto de entrada universal e intuitivo para toda a organização, eliminando solicitações dispersas.' 
                  : 'A single, universal entry point for all organizational employees to report issues, eliminating scattered communication.'
              },
              {
                title: isPt ? 'Criação e Rastreio de Tickets' : 'Ticket Creation & Tracking',
                desc: isPt 
                  ? 'Formulários dinâmicos com campos contextuais e acompanhamento em tempo real desde a triagem ao fecho.' 
                  : 'Intuitive submission forms with contextual fields and real-time status updates from triage to final resolution.'
              },
              {
                title: isPt ? 'Três Perfis Especializados' : 'Three Purpose-Built Roles',
                desc: isPt 
                  ? 'Permissões e fluxos isolados entre Requerentes, Agentes por Projeto e Administradores de Backoffice.' 
                  : 'Isolate permissions and workflows across Requesters, Project Agents, and Backoffice Administrators.'
              },
              {
                title: isPt ? 'Taxonomia por Projetos' : 'Project-Based Taxonomy',
                desc: isPt 
                  ? 'Roteamento automático de tickets para técnicos especializados, garantindo responsabilização imediata.' 
                  : 'Automatic routing of incoming tickets to responsible project specialists, ensuring immediate accountability.'
              },
              {
                title: isPt ? 'Histórico de Intervenções & Logs' : 'Intervention History & Logs',
                desc: isPt 
                  ? 'Registo cronológico e auditável de cada nota diagnóstica, alteração de estado e intervenção técnica executada.' 
                  : 'Chronological activity logs documenting every diagnostic note, status transition, and technician intervention.'
              },
              {
                title: isPt ? 'Governança & Backoffice' : 'Backoffice Governance',
                desc: isPt 
                  ? 'Suite de administração para gerir utilizadores, associar projetos, definir categorias e monitorizar métricas.' 
                  : 'Administrative suite for managing users, projects, service categories, and operational health dashboards.'
              }
            ].map((cap, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#14121C] border border-white/[0.08] flex flex-col gap-3">
                <span className="font-mono text-[10px] text-[#3B82F6] tracking-widest">
                  {isPt ? 'CAPACIDADE 0' : 'CAPABILITY 0'}{i + 1}
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {cap.title}
                </h4>
                <p className="text-sm text-[#9999A5] leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ABSTRACT PRODUCT COMPOSITION */}
          <div className="rounded-2xl bg-[#14121C] border border-white/[0.08] p-8 md:p-12 relative overflow-hidden flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <span className="font-mono text-xs text-[#9999A5] uppercase tracking-widest">
                {isPt 
                  ? 'Figura 2.0 — Composição Modular Abstrata da Plataforma' 
                  : 'Figure 2.0 — Abstract Product Modular Composition'}
              </span>
              <span className="font-mono text-[10px] text-[#60A5FA] bg-[#08090D] border border-white/[0.06] px-3 py-1 rounded-full">
                {isPt ? 'ARQUITETURA CONCEITUAL' : 'CONCEPTUAL ARCHITECTURE'}
              </span>
            </div>

            {/* Simulated Abstract UI Blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-3 p-5 rounded-xl bg-[#08090D] border border-white/[0.06] flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                  <span className="text-xs font-mono text-white font-bold">Helpdesk OS</span>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  {[
                    isPt ? 'Painel Geral' : 'Dashboard', 
                    isPt ? 'Os Meus Tickets' : 'My Tickets', 
                    isPt ? 'Fila do Projeto' : 'Project Queue', 
                    isPt ? 'Backoffice' : 'Backoffice', 
                    isPt ? 'Métricas & Dados' : 'Analytics'
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className={`px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between ${
                        idx === 1 ? 'bg-[#3B82F6]/20 text-white border border-[#3B82F6]/30' : 'text-[#9999A5]'
                      }`}
                    >
                      <span>{item}</span>
                      {idx === 1 && <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-9 p-6 rounded-xl bg-[#08090D] border border-white/[0.06] flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-white/[0.06] pb-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">
                      {isPt ? 'Fluxo Ativo de Tickets' : 'Active Support Stream'}
                    </span>
                    <span className="font-mono text-[10px] text-[#9999A5]">
                      {isPt ? 'Projeto: Infraestrutura & Ferramentas Centrais' : 'Project: Core Infrastructure & Tools'}
                    </span>
                  </div>
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#3B82F6] text-white">
                    {isPt ? '+ Novo Ticket' : '+ New Ticket'}
                  </span>
                </div>

                {/* Abstract rows */}
                <div className="flex flex-col gap-2.5">
                  {[
                    { 
                      id: 'TK-104', 
                      title: isPt ? 'Pico de latência no fluxo de autenticação SSO' : 'SSO Authentication latency spike', 
                      status: isPt ? 'EM CURSO' : 'IN PROGRESS', 
                      tag: isPt ? 'Prioridade Alta' : 'High Priority', 
                      time: isPt ? 'há 14 min' : '14m ago' 
                    },
                    { 
                      id: 'TK-103', 
                      title: isPt ? 'Desfasamento na réplica da base de dados' : 'Database replica synchronization lag', 
                      status: isPt ? 'A INVESTIGAR' : 'INVESTIGATING', 
                      tag: isPt ? 'Crítico' : 'Critical', 
                      time: isPt ? 'há 1 hora' : '1h ago' 
                    },
                    { 
                      id: 'TK-102', 
                      title: isPt ? 'Inconsistência de permissão no módulo de faturação' : 'Role permission mismatch on billing tier', 
                      status: isPt ? 'RESOLVIDO' : 'RESOLVED', 
                      tag: isPt ? 'Normal' : 'Normal', 
                      time: isPt ? 'há 3 horas' : '3h ago' 
                    }
                  ].map((row, i) => (
                    <div key={i} className="p-4 rounded-lg bg-[#14121C] border border-white/[0.04] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#3B82F6] font-bold">{row.id}</span>
                        <span className="text-xs text-white font-medium">{row.title}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[10px]">
                        <span className="text-[#9999A5]">{row.time}</span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.06] text-[#60A5FA]">{row.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ============================================================== */}
        {/* 10 — WHAT I LEARNED */}
        {/* ============================================================== */}
        <section className="flex flex-col gap-12">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase">
              {isPt ? '10 — APRENDIZADOS' : '10 — WHAT I LEARNED'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F7] leading-tight">
              {isPt 
                ? 'O Design Thinking vem antes da ferramenta.' 
                : 'Design Thinking comes before the tool.'}
            </h2>
            <p className="text-[#9999A5] font-light text-base md:text-lg leading-relaxed pt-2">
              {isPt 
                ? 'Este projeto consolidou um princípio essencial de design: construir um produto raramente se resume a implementar componentes de interface. Trata-se de compreender as dinâmicas humanas e operacionais antes de criar qualquer ecrã ou configurar fluxos.' 
                : 'This project solidified an essential design principle: building a product is rarely just about implementing UI components. It is about understanding operational human dynamics before writing a single line of code or configuring a workflow.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#14121C] border border-white/[0.08] flex flex-col gap-3">
              <span className="font-mono text-xs text-[#3B82F6] tracking-widest">
                {isPt ? 'APRENDIZADO 01' : 'INSIGHT 01'}
              </span>
              <h4 className="text-lg font-bold text-white">
                {isPt ? 'Pensamento Sistémico' : 'Systems Thinking'}
              </h4>
              <p className="text-sm text-[#9999A5] leading-relaxed">
                {isPt 
                  ? 'Uma ferramenta de suporte não pode ser concebida como um conjunto de ecrãs isolados. Cada transição de estado afeta diretamente a confiança do utilizador e o ritmo de entrega da equipa.' 
                  : 'A support tool cannot be conceived as disconnected screens. Every state transition directly influences user confidence and team throughput.'}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#14121C] border border-white/[0.08] flex flex-col gap-3">
              <span className="font-mono text-xs text-[#3B82F6] tracking-widest">
                {isPt ? 'APRENDIZADO 02' : 'INSIGHT 02'}
              </span>
              <h4 className="text-lg font-bold text-white">
                {isPt ? 'Clareza por Perfil de Utilizador' : 'Role-Based Clarity'}
              </h4>
              <p className="text-sm text-[#9999A5] leading-relaxed">
                {isPt 
                  ? 'O software corporativo de excelência respeita a atenção humana. Exibir a cada utilizador apenas o que pertence à sua esfera de ação elimina o cansaço cognitivo.' 
                  : 'Great internal software respects attention spans. Showing users only what belongs to their responsibility dramatically reduces cognitive fatigue.'}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#14121C] border border-white/[0.08] flex flex-col gap-3">
              <span className="font-mono text-xs text-[#3B82F6] tracking-widest">
                {isPt ? 'APRENDIZADO 03' : 'INSIGHT 03'}
              </span>
              <h4 className="text-lg font-bold text-white">
                {isPt ? 'Low-Code com Rigor de Design' : 'Low-Code with Design Rigor'}
              </h4>
              <p className="text-sm text-[#9999A5] leading-relaxed">
                {isPt 
                  ? 'O Lovable permitiu rapidez e iteração funcional extrema, mas apenas porque a taxonomia de informação, papéis e fluxos foram minuciosamente desenhados à partida.' 
                  : 'Using Lovable allowed rapid functional iteration, but only because design reasoning, information taxonomy, and user flows were carefully architected first.'}
              </p>
            </div>
          </div>

          {/* EDITORIAL CLOSING STATEMENT */}
          <div className="p-12 md:p-20 rounded-3xl bg-gradient-to-b from-[#14121C] to-[#08090D] border border-white/[0.1] text-center flex flex-col items-center justify-center gap-8 relative overflow-hidden shadow-[0_20px_100px_rgba(59,130,246,0.1)]">
            <div className="w-12 h-12 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#60A5FA]">
              <Sparkles className="w-6 h-6 text-[#3B82F6]" />
            </div>

            <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
              {isPt 
                ? '"O bom design de produto não se resume a criar interfaces. Trata-se de criar a estrutura que lhes dá significado."' 
                : '"Good product design isn\'t just about creating interfaces. It\'s about creating the structure that makes them meaningful."'}
            </blockquote>

            <span className="font-mono text-xs text-[#9999A5] uppercase tracking-widest">
              {isPt 
                ? 'Conclusão Editorial // Estudo de Caso Plataforma de Helpdesk' 
                : 'Editorial Conclusion // Helpdesk Platform Case Study'}
            </span>
          </div>
        </section>


        {/* ============================================================== */}
        {/* FOOTER & RETURN NAVIGATION */}
        {/* ============================================================== */}
        <footer className="pt-16 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-6">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-xs tracking-widest text-[#9999A5] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#3B82F6]" />
            <span>{isPt ? 'VOLTAR A TODOS OS PROJETOS' : 'BACK TO ALL WORKS'}</span>
          </button>

          <OpticalGlassButton
            onClick={onBack}
            className="!px-8 !py-4 !text-xs !tracking-[0.15em] !rounded-full shadow-[0_0_40px_rgba(59,130,246,0.2)]"
          >
            <span>{isPt ? 'EXPLORAR OUTROS PROJETOS' : 'EXPLORE OTHER WORKS'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </OpticalGlassButton>
        </footer>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#08090D]/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8"
            onClick={() => setExpandedImage(null)}
          >
            <div className="w-full flex justify-between items-center pb-4 border-b border-white/10 select-none">
              <span className="font-mono text-xs text-[#60A5FA] font-bold uppercase tracking-widest">
                {isPt ? 'PLATAFORMA DE HELPDESK // PRÉ-VISUALIZAÇÃO CONCEITUAL' : 'HELPDESK PLATFORM // CONCEPTUAL INTERFACE PREVIEW'}
              </span>
              <button
                onClick={() => setExpandedImage(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            <div 
              className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={expandedImage}
                alt={isPt ? "Pré-visualização Conceitual da Plataforma de Helpdesk" : "Helpdesk Platform Conceptual Preview"}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.article>
  );
};
