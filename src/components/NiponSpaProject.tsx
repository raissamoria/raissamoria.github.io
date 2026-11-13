/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Maximize2,
  X,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Tag,
  MapPin,
  Search,
  Play,
  Pause,
  GitBranch,
  Globe,
  Sparkles,
  Figma,
  Server,
  Check,
} from 'lucide-react';
import { Language } from '../types';
import { EditorialProjectLayout } from './editorial/EditorialProjectLayout';

// Authentic Website Assets placed in /niponspa/
// @ts-ignore
import niponSpaImg from '../../niponspa/niponspa.png';
// @ts-ignore
import niponVideo from '../../niponspa/videonipon.mp4';
// @ts-ignore
import niponMotionVideo from '../../niponspa/motiondesignvideo.mp4';

interface NiponSpaProjectProps {
  language: Language;
  onToggleLanguage?: (lang: Language) => void;
  onBack: () => void;
  onNextProject?: () => void;
  onPrevProject?: () => void;
}

type PaletteKey = 'sand-earth' | 'bamboo-moss' | 'dark-wood';

export const NiponSpaProject: React.FC<NiponSpaProjectProps> = ({
  language,
  onToggleLanguage,
  onBack,
  onNextProject,
  onPrevProject,
}) => {
  const isPt = language === 'pt';
  const prefersReducedMotion = useReducedMotion();

  const [selectedPalette, setSelectedPalette] = useState<PaletteKey>('sand-earth');
  const [isMotionPlaying, setIsMotionPlaying] = useState<boolean>(true);
  const [isStartingVideoPlaying, setIsStartingVideoPlaying] = useState<boolean>(true);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption?: string } | null>(null);
  const startingVideoRef = useRef<HTMLVideoElement | null>(null);
  const motionVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const vid = startingVideoRef.current;
    if (vid) {
      vid.playbackRate = 1.65;
    }
  }, []);

  const toggleStartingVideoPlay = () => {
    const vid = startingVideoRef.current;
    if (!vid) return;
    vid.playbackRate = 1.65;
    if (vid.paused) {
      vid.play();
      setIsStartingVideoPlaying(true);
    } else {
      vid.pause();
      setIsStartingVideoPlaying(false);
    }
  };

  const toggleMotionVideoPlay = () => {
    const vid = motionVideoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsMotionPlaying(true);
    } else {
      vid.pause();
      setIsMotionPlaying(false);
    }
  };

  const paletteStudies: Record<
    PaletteKey,
    {
      name: string;
      statusPt: string;
      statusEn: string;
      summaryPt: string;
      summaryEn: string;
      image: string;
      imageAlt: string;
      captionPt: string;
      captionEn: string;
      tokens: { label: string; hex: string; rolePt: string; roleEn: string }[];
      previewBg: string;
      previewSurface: string;
      previewText: string;
      previewAccent: string;
      previewAccentText: string;
    }
  > = {
    'sand-earth': {
      name: 'Areia & Terra',
      statusPt: 'Japandi acolhedor · Selecionada',
      statusEn: 'Warm Japandi · Selected',
      summaryPt:
        'Base luminosa em Areia clara (#F4F0EB) e Pedra (#D9CEC2), equilibrada com Terra (#6C6259), Carvão (#1D1D1B) e o Vermelho Nipon (#A42F2D) herdado da identidade tradicional como cor de acento e ação.',
      summaryEn:
        'Luminous Light Sand (#F4F0EB) and Stone (#D9CEC2), grounded by Earth (#6C6259), Charcoal (#1D1D1B), and Nipon Red (#A42F2D) inherited from the traditional brand mark as the signature accent.',
      image: niponSpaImg,
      imageAlt: 'Nipon Spa — Estudo visual Areia e Terra com acento Vermelho Nipon',
      captionPt: 'Direção Areia & Terra — website real niponspa.pt com Areia clara (#F4F0EB) e Vermelho Nipon (#A42F2D).',
      captionEn: 'Sand & Earth direction — live niponspa.pt website using Light Sand (#F4F0EB) and Nipon Red (#A42F2D).',
      tokens: [
        { label: 'Areia clara', hex: '#F4F0EB', rolePt: 'Fundo principal', roleEn: 'Primary canvas' },
        { label: 'Pedra', hex: '#D9CEC2', rolePt: 'Superfícies e divisórias', roleEn: 'Surfaces & borders' },
        { label: 'Terra', hex: '#6C6259', rolePt: 'Texto secundário', roleEn: 'Secondary ink' },
        { label: 'Carvão', hex: '#1D1D1B', rolePt: 'Tipografia principal', roleEn: 'Primary ink' },
        { label: 'Vermelho Nipon', hex: '#A42F2D', rolePt: 'Cor de destaque e ação', roleEn: 'Brand accent & CTA' },
      ],
      previewBg: '#F4F0EB',
      previewSurface: '#F9F7F2',
      previewText: '#1D1D1B',
      previewAccent: '#A42F2D',
      previewAccentText: '#F9F7F2',
    },
    'bamboo-moss': {
      name: 'Bambu & Musgo',
      statusPt: 'Estudo Intermédio',
      statusEn: 'Mid Exploration',
      summaryPt:
        'Exploração botânica inspirada no bambu natural e verde musgo profundo. Funcionou bem na organização de serviços, mas mantinha um contraste demasiado institucional face à suavidade desejada.',
      summaryEn:
        'Botanical exploration inspired by natural bamboo and deep moss green. Strong for service structure, though slightly too institutional compared to the desired warmth.',
      image: niponSpaImg,
      imageAlt: 'Nipon Spa — Website Real em comparação cromática',
      captionPt: 'Comparação com o website final em Areia & Terra.',
      captionEn: 'Compared against the final Sand & Earth live website.',
      tokens: [
        { label: 'Papel Washi', hex: '#F4F3EB', rolePt: 'Fundo base', roleEn: 'Base paper' },
        { label: 'Bambu Claro', hex: '#98A886', rolePt: 'Molduras subtis', roleEn: 'Subtle borders' },
        { label: 'Musgo Profundo', hex: '#2B3E2B', rolePt: 'Botões de ação', roleEn: 'Action buttons' },
        { label: 'Tinta Sumi', hex: '#1C1D1A', rolePt: 'Textos principais', roleEn: 'Primary copy' },
      ],
      previewBg: '#F4F3EB',
      previewSurface: '#E7E7DC',
      previewText: '#1C1D1A',
      previewAccent: '#2B3E2B',
      previewAccentText: '#F4F3EB',
    },
    'dark-wood': {
      name: 'Madeira & Âmbar',
      statusPt: 'Exploração Inicial',
      statusEn: 'Initial Exploration',
      summaryPt:
        'Primeira direção noturna inspirada na madeira escura e lanternas de pedra. Embora atmosférica, tornava a navegação diurna mais pesada e menos convidativa para novos clientes.',
      summaryEn:
        'Initial nocturnal direction inspired by dark timber and warm stone lanterns. Atmospheric, yet visually heavier for daytime browsing and quick discovery.',
      image: niponSpaImg,
      imageAlt: 'Nipon Spa — Website Real em comparação cromática',
      captionPt: 'Referência da versão final publicada após a evolução da paleta.',
      captionEn: 'Reference of the live published design after evolving away from dark palettes.',
      tokens: [
        { label: 'Ébano Escuro', hex: '#14110F', rolePt: 'Fundo noturno', roleEn: 'Nocturnal base' },
        { label: 'Cedro Fumado', hex: '#231C18', rolePt: 'Cartões escuros', roleEn: 'Dark surfaces' },
        { label: 'Âmbar Quente', hex: '#A88258', rolePt: 'Contornos e botões', roleEn: 'Outline accents' },
        { label: 'Marfim Suave', hex: '#EFECE6', rolePt: 'Tipografia clara', roleEn: 'Light ink' },
      ],
      previewBg: '#14110F',
      previewSurface: '#231C18',
      previewText: '#EFECE6',
      previewAccent: '#A88258',
      previewAccentText: '#14110F',
    },
  };

  const activePalette = paletteStudies[selectedPalette];

  const workflowSteps = [
    {
      step: '01',
      name: 'Figma',
      rolePt: 'Conceito, Design System & Prototipagem',
      roleEn: 'Concept, Design System & Prototyping',
      icon: <Figma className="w-4 h-4" />,
    },
    {
      step: '02',
      name: 'Google AI Studio',
      rolePt: 'Apoio ao desenvolvimento & iteração rápida',
      roleEn: 'AI-assisted development & rapid iteration',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      step: '03',
      name: 'GitHub',
      rolePt: 'Repositório e controlo de versões',
      roleEn: 'Source repository & version control',
      icon: <GitBranch className="w-4 h-4" />,
    },
    {
      step: '04',
      name: 'Vercel',
      rolePt: 'Build contínuo & alojamento web',
      roleEn: 'Continuous build & web hosting',
      icon: <Server className="w-4 h-4" />,
    },
    {
      step: '05',
      name: isPt ? 'Website publicado' : 'Live Website',
      rolePt: 'niponspa.pt em produção',
      roleEn: 'niponspa.pt live in production',
      icon: <Globe className="w-4 h-4" />,
    },
  ];

  return (
    <>
      <EditorialProjectLayout
        title="Nipon Spa"
        subtitle={
          isPt
            ? 'Uma experiência de bem-estar que começa antes da primeira massagem.'
            : 'A wellness experience that begins before the first massage.'
        }
        categories={[
          'UX/UI Design',
          'Design System',
          'Motion Design',
          'AI-Assisted Development',
        ]}
        heroIntro={
          isPt
            ? '“O desafio não era apenas modernizar o website do Nipon Spa. Queria criar uma experiência digital capaz de transmitir a mesma tranquilidade, atenção e bem-estar que os clientes encontram durante uma massagem.”'
            : '“The challenge was not merely modernizing the Nipon Spa website. I wanted to design a digital experience able to convey the exact calm, care, and wellbeing clients feel during a treatment.”'
        }
        overview={{
          projectLabel: '02 / PROJECT OVERVIEW',
          headline: isPt
            ? 'Mais do que um redesign. Uma experiência para sentir.'
            : 'More than a redesign. An experience to feel.',
          description: isPt
            ? 'O Nipon Spa é um spa japonês em Lisboa, com mais de 20 anos de experiência em terapias e tratamentos especializados. O projeto nasceu da necessidade de modernizar a sua presença digital e criar um website mais contemporâneo, intuitivo e coerente com a identidade da marca.'
            : 'Nipon Spa is a Japanese spa in Lisbon with over 20 years of experience in specialized therapies and treatments. The project grew from the need to modernize its digital presence with a contemporary, intuitive website aligned with its identity.',
          secondaryDescription: isPt
            ? 'O meu objetivo era ir além de uma interface visualmente agradável: queria que a própria navegação transmitisse calma, equilíbrio e intenção — preparando o visitante emocionalmente antes mesmo de chegar ao espaço.'
            : 'My goal went beyond surface aesthetics: I wanted every scroll and transition to communicate calm, balance, and intention — preparing visitors emotionally before they arrive.',
          rolesLabel: isPt ? 'O meu papel neste projeto' : 'My role in this project',
          rolesAsList: true,
          roles: isPt
            ? [
                'UX/UI Design',
                'Design System',
                'Motion Design',
                'Prototipagem em Figma',
                'Desenvolvimento com apoio de inteligência artificial',
                'Integração e publicação do website',
                'Configuração de ferramentas de marketing e otimização SEO',
              ]
            : [
                'UX/UI Design',
                'Design System',
                'Motion Design',
                'Figma Prototyping',
                'AI-Assisted Development',
                'Website Integration & Deployment',
                'Marketing Tools & SEO Setup',
              ],
          technologies: ['Figma', 'Google AI Studio', 'GitHub', 'Vercel', 'DOC.pt', 'GTM'],
          methodology: isPt
            ? ['Direção Editorial', 'Design System Areia & Terra', 'Motion Contemplativo']
            : ['Editorial Direction', 'Sand & Earth System', 'Contemplative Motion'],
          users: ['niponspa.pt'],
        }}
        language={language}
        onToggleLanguage={onToggleLanguage}
        onBack={onBack}
        onNextProject={onNextProject}
        onPrevProject={onPrevProject}
        prevProjectName={isPt ? 'Plataforma de Helpdesk' : 'Helpdesk Platform'}
        nextProjectName="SUE Mobile App"
      >
        {/* =========================================================================
            SECTION 03: THE STARTING POINT / O PONTO DE PARTIDA
            ========================================================================= */}
        <section id="ponto-de-partida" className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '03 / The Starting Point' : '03 / The Starting Point'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1115]">
              {isPt ? 'O ponto de partida' : 'The starting point'}
            </h2>
            <div className="flex flex-col gap-5 text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              <p>
                {isPt
                  ? 'Com mais de duas décadas de atividade em Lisboa, o Nipon Spa já possuía uma identidade muito própria — construída no contacto presencial, na precisão técnica dos terapeutas e no ambiente acolhedor das suas salas.'
                  : 'With more than two decades in Lisbon, Nipon Spa already had a distinctive identity built on in-person hospitality, therapeutic craft, and serene treatment suites.'}
              </p>
              <p>
                {isPt
                  ? 'O ponto de partida digital, contudo, exigia preservar essa essência reconhecida pelos clientes habituais e, em paralelo, simplificar a descoberta de tratamentos e o acesso à marcação online sem ruído visual.'
                  : 'Digitally, the challenge was honoring that heritage recognized by loyal guests while bringing clarity, calmer visual pacing, and direct online booking access for new visitors.'}
              </p>
            </div>
          </div>

          {/* Authentic niponspa.pt Website Video Showcase */}
          <div className="flex flex-col gap-3">
            <div className="group relative w-full rounded-2xl overflow-hidden bg-transparent">
              <video
                ref={startingVideoRef}
                src={niponVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={(e) => {
                  e.currentTarget.playbackRate = 1.65;
                }}
                onPlay={(e) => {
                  e.currentTarget.playbackRate = 1.65;
                }}
                onClick={toggleStartingVideoPlay}
                aria-label="Nipon Spa Website — videonipon.mp4"
                className="w-full h-auto object-contain cursor-pointer"
              />
              <button
                type="button"
                onClick={toggleStartingVideoPlay}
                className="absolute bottom-5 right-5 bg-black/80 hover:bg-black text-white text-[11px] font-mono px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isStartingVideoPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>{isPt ? 'Pausar' : 'Pause'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>{isPt ? 'Reproduzir' : 'Play'}</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs font-mono text-neutral-500 px-1">
              {isPt
                ? 'Figura 3.1 — Navegação e experiência digital de niponspa.pt em ação.'
                : 'Figure 3.1 — Live niponspa.pt navigation and digital experience in motion.'}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: THE DESIGN CHALLENGE / O DESAFIO DE DESIGN
            ========================================================================= */}
        <section id="desafio" className="flex flex-col gap-12">
          <div className="flex flex-col gap-5 max-w-5xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '04 / The Design Challenge' : '04 / The Design Challenge'}
            </span>

            {/* Prominent Editorial Pull-Quote */}
            <blockquote className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.025em] text-[#0F1115] leading-[1.08] py-2">
              {isPt
                ? '“Como transformar a sensação de uma massagem numa experiência digital?”'
                : '“How do you translate the physical sensation of a massage into a digital experience?”'}
            </blockquote>

            <div className="flex flex-col gap-5 text-base sm:text-lg text-neutral-700 leading-relaxed font-light max-w-4xl">
              <p>
                {isPt
                  ? 'Uma massagem começa na desaceleração: luz suave, silêncio, calor e um ritmo contínuo sem interrupções bruscas. Em muitos websites de bem-estar, acontece exatamente o oposto — blocos apertados, promoções agressivas e navegação apressada.'
                  : 'A massage begins with deceleration: warm lighting, quietness, and unhurried continuity. Most wellness websites trigger the exact opposite — cramped layouts, aggressive popups, and rushed interactions.'}
              </p>
              <p>
                {isPt
                  ? 'O meu foco foi traduzir o tato e a pausa para o ecrã através de três elementos concretos: temperatura de cor quente que descansa o olhar, tipografia espaçada que convida à leitura lenta, e transições serenas que respeitam o tempo do utilizador.'
                  : 'My focus was translating tactility and pause to the screen through three deliberate choices: restful warm color tones, unhurried typography, and gentle transitions that respect the visitor’s pace.'}
              </p>
            </div>
          </div>

          {/* 3 Sensory Pillars matching Helpdesk hairline 3-col layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-neutral-200/80">
            <div className="flex flex-col gap-3 pt-4 pb-8 border-b md:border-b-0 md:border-r border-neutral-200 pr-0 md:pr-8">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                01 · {isPt ? 'Espaço Negativo (Ma)' : 'Negative Space (Ma)'}
              </span>
              <h3 className="text-xl font-bold text-[#0F1115]">
                {isPt ? 'Respirar Entre Secções' : 'Room to Breathe'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-light">
                {isPt
                  ? 'Inspirado no conceito japonês de Ma, o vazio deixa de ser desperdício e passa a criar pausa mental entre terapias.'
                  : 'Inspired by the Japanese principle of Ma, emptiness stops being unused space and creates mental calm between treatments.'}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-4 pb-8 border-b md:border-b-0 md:border-r border-neutral-200 pr-0 md:pr-8">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                02 · {isPt ? 'Temperatura Tátil' : 'Tactile Warmth'}
              </span>
              <h3 className="text-xl font-bold text-[#0F1115]">
                {isPt ? 'Contraste Sem Frieza' : 'Warmth Without Glare'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-light">
                {isPt
                  ? 'Substituir branco clínico e preto puro por areia luminosa e carvão orgânico para evitar cansaço ocular.'
                  : 'Replacing clinical white and stark black with luminous sand and organic charcoal to keep reading restful.'}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                03 · {isPt ? 'Ritmo Contemplativo' : 'Contemplative Rhythm'}
              </span>
              <h3 className="text-xl font-bold text-[#0F1115]">
                {isPt ? 'Movimento Sem Pressa' : 'Unhurried Motion'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-light">
                {isPt
                  ? 'Curvas de aceleração suaves imitam o tempo de uma expiração profunda em vez de animações comerciais rápidas.'
                  : 'Gentle easing curves follow the cadence of a slow exhale instead of abrupt commercial UI snaps.'}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05: DESIGN SYSTEM & VISUAL IDENTITY
            ========================================================================= */}
        <section id="design-system" className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '05 / Design System & Visual Identity' : '05 / Design System & Visual Identity'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1115]">
              {isPt
                ? 'Criar uma identidade visual que transmite equilíbrio.'
                : 'Creating a visual identity built around balance.'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              {isPt
                ? 'Antes de definir a linguagem final, explorei diferentes temperaturas cromáticas — da madeira escura ao bambu botânico — até chegar à paleta Areia & Terra como sistema principal.'
                : 'Before settling on the final language, I tested distinct color temperatures — from dark timber to botanical bamboo — arriving at Sand & Earth as our calm visual foundation.'}
            </p>
          </div>

          {/* Interactive Comparador de Paleta Nipon — Areia & Terra */}
          <div className="w-full rounded-2xl sm:rounded-3xl bg-[#F0F2F6] border border-neutral-200/90 p-6 sm:p-10 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-300 pb-5 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600">
                  {isPt ? 'Comparador de Paleta Nipon — Areia & Terra' : 'Nipon Palette Comparator — Sand & Earth'}
                </span>
                <span className="text-xl font-bold text-[#0F1115]">
                  {isPt ? 'Areia clara, Pedra, Terra, Carvão & Vermelho Nipon (#A42F2D)' : 'Light Sand, Stone, Earth, Charcoal & Nipon Red (#A42F2D)'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {(['sand-earth', 'bamboo-moss', 'dark-wood'] as PaletteKey[]).map((key) => {
                  const p = paletteStudies[key];
                  const active = selectedPalette === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedPalette(key)}
                      className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        active
                          ? 'bg-neutral-900 text-white font-bold shadow-xs'
                          : 'bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Palette Tokens, Authentic Design System Reference & Specimen */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[#0F1115]">{activePalette.name}</h3>
                  <span
                    className={`text-[11px] font-mono uppercase tracking-wider ${
                      selectedPalette === 'sand-earth' ? 'font-bold text-[#A42F2D]' : 'text-neutral-500'
                    }`}
                  >
                    {isPt ? activePalette.statusPt : activePalette.statusEn}
                  </span>
                </div>

                <p className="text-sm text-neutral-700 leading-relaxed font-light">
                  {isPt ? activePalette.summaryPt : activePalette.summaryEn}
                </p>

                {/* Color Swatches */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activePalette.tokens.map((tok) => {
                    const isNiponRed = tok.hex === '#A42F2D';
                    return (
                      <div
                        key={tok.hex}
                        className={`bg-white rounded-xl p-3.5 border flex items-center gap-3 ${
                          isNiponRed ? 'border-[#A42F2D]/60 sm:col-span-2' : 'border-neutral-200/90'
                        }`}
                      >
                        <span
                          className="w-10 h-10 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: tok.hex }}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#0F1115] truncate">{tok.label}</div>
                          <div className="text-[11px] font-mono text-neutral-500">{tok.hex}</div>
                          <div className="text-[10px] text-neutral-400 truncate">
                            {isPt ? tok.rolePt : tok.roleEn}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tactile Component & Button Specimen in Selected Palette */}
                <div
                  className="rounded-xl p-5 border flex flex-col gap-4"
                  style={{
                    backgroundColor: activePalette.previewBg,
                    color: activePalette.previewText,
                    borderColor: selectedPalette === 'sand-earth' ? '#A42F2D' : 'rgba(0,0,0,0.1)',
                  }}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono opacity-75">
                    <span>{isPt ? 'COMPONENTE EM TESTE' : 'COMPONENT SPECIMEN'}</span>
                    <span>60 MIN · SHIATSU</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-base font-medium">
                      {isPt ? 'Ritual Zen Shiatsu Tradicional' : 'Traditional Zen Shiatsu Ritual'}
                    </span>
                    <span
                      className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wide"
                      style={{
                        backgroundColor: activePalette.previewAccent,
                        color: activePalette.previewAccentText,
                      }}
                    >
                      {isPt ? 'Marcar Sessão' : 'Book Session'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Visual Study Preview */}
              <div className="lg:col-span-6 flex flex-col gap-5">
                <div className="flex flex-col gap-2.5">
                  <div
                    onClick={() =>
                      setLightboxImage({
                        src: activePalette.image,
                        caption: isPt ? activePalette.captionPt : activePalette.captionEn,
                      })
                    }
                    className="group relative bg-transparent cursor-pointer"
                  >
                    <img
                      src={activePalette.image}
                      alt={activePalette.imageAlt}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.015]"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/80 text-white text-[11px] font-mono px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Maximize2 className="w-3 h-3" />
                      <span>{isPt ? 'Ampliar Estudo' : 'Expand Study'}</span>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-neutral-500 px-1">
                    {isPt ? activePalette.captionPt : activePalette.captionEn}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Typography, Component Grammar & Visual Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-7 border border-neutral-200/90 flex flex-col gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                {isPt ? 'Tipografia' : 'Typography'}
              </span>
              <h3 className="text-lg font-bold text-[#0F1115]">
                {isPt ? 'Hierarquia Leve & Editorial' : 'Light Editorial Hierarchy'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                {isPt
                  ? 'Títulos expressivos com espaçamento amplo para criar serenidade na leitura, equilibrados por descrições de tratamentos em corpo limpo e legível.'
                  : 'Expressive headings with generous tracking to calm reading cadence, paired with crisp, legible treatment details.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-neutral-200/90 flex flex-col gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                {isPt ? 'Componentes & Botões' : 'Components & Buttons'}
              </span>
              <h3 className="text-lg font-bold text-[#0F1115]">
                {isPt ? 'Toque Macio Sem Urgência Artificial' : 'Soft Tactile Actions'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                {isPt
                  ? 'Cantos suavemente arredondados, estados hover graduais e botões com peso sereno que convidam ao clique sem criar pressão comercial.'
                  : 'Softly rounded corners, gentle hover states, and composed button weight inviting action without commercial pressure.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-neutral-200/90 flex flex-col gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                {isPt ? 'Princípios Visuais' : 'Visual Principles'}
              </span>
              <h3 className="text-lg font-bold text-[#0F1115]">
                {isPt ? 'Coerência do Cartão à Sala' : 'Physical-to-Digital Consistency'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                {isPt
                  ? 'Cada detalhe visual reflete materiais naturais presentes no spa — pedra, linho, papel washi e luz difusa — reforçando confiança imediata.'
                  : 'Every token echoes physical spa materials — warm stone, linen, washi paper, and soft lantern glow — building instant trust.'}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 06: MOTION DESIGN
            ========================================================================= */}
        <section id="motion-design" className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '06 / Motion Design' : '06 / Motion Design'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1115]">
              {isPt
                ? 'E se o website também conseguisse transmitir calma através do movimento?'
                : 'What if the website could also convey calm through motion?'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              {isPt
                ? 'O movimento não entrou para "enfeitar" a interface. Desde a entrada inicial às animações subtis de fundo e transições de secção, a cadência foi calibrada para abrandar o ritmo do visitante e transformar o scroll numa experiência contemplativa.'
                : 'Motion was never used as decoration. From the opening reveal to subtle ambient background shifts and section glides, timing was tuned to lower visitor tension and make scrolling feel unhurried.'}
            </p>
          </div>

          {/* Real Motion Design Video — standalone without outer card */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-transparent group">
            <video
              ref={motionVideoRef}
              src={niponMotionVideo}
              autoPlay={!prefersReducedMotion}
              loop
              muted
              playsInline
              preload="auto"
              onPlay={() => setIsMotionPlaying(true)}
              onPause={() => setIsMotionPlaying(false)}
              onClick={toggleMotionVideoPlay}
              aria-label="Nipon Spa Motion Design — motiondesignvideo.mp4"
              className="w-full h-auto object-contain cursor-pointer"
            />
            <button
              type="button"
              onClick={toggleMotionVideoPlay}
              className="absolute bottom-5 right-5 bg-black/80 hover:bg-black text-white text-[11px] font-mono px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isMotionPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>{isPt ? 'Pausar' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>{isPt ? 'Reproduzir' : 'Play'}</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* =========================================================================
            SECTION 07: FROM FIGMA TO A REAL WEBSITE
            ========================================================================= */}
        <section id="figma-para-web" className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '07 / From Figma to a Real Website' : '07 / From Figma to a Real Website'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1115]">
              {isPt ? 'Do Figma para um website funcional.' : 'From Figma to a functional live website.'}
            </h2>
            <div className="flex flex-col gap-5 text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              <p>
                {isPt
                  ? 'Todo o conceito, arquitetura de informação, design system e prototipagem nasceram da minha visão no Figma. Em vez de parar num protótipo estático, utilizei o Google AI Studio como ferramenta de apoio para acelerar a tradução desse design para código real — mantendo controlo total sobre cada espaçamento, ritmo e interação.'
                  : 'Every architectural choice, design system token, and prototype originated from my direction in Figma. Rather than stopping at static screens, I leveraged Google AI Studio to accelerate translating those design decisions into production front-end code while preserving full creative authorship.'}
              </p>
            </div>
          </div>

          {/* Workflow Pipeline Visualization */}
          <div className="w-full rounded-2xl sm:rounded-3xl bg-[#F0F2F6] border border-neutral-200/90 p-6 sm:p-10 flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between border-b border-neutral-300 pb-4 gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600">
                {isPt ? 'Fluxo Contínuo de Design & Publicação' : 'End-to-End Design & Publishing Pipeline'}
              </span>
              <span className="text-xs font-mono text-neutral-500">
                FIGMA → GOOGLE AI STUDIO → GITHUB → VERCEL → LIVE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {workflowSteps.map((item, idx) => (
                <div
                  key={item.step}
                  className="bg-white rounded-xl p-5 border border-neutral-200 flex flex-col justify-between gap-4 relative"
                >
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="text-xs font-mono font-bold">{item.step}</span>
                    <span className="text-neutral-700">{item.icon}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-bold text-[#0F1115]">{item.name}</span>
                      {idx < workflowSteps.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400 hidden lg:inline ml-auto" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed">
                      {isPt ? item.rolePt : item.roleEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Infrastructure Clarification: Hostinger vs GitHub vs Vercel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/80 rounded-xl p-5 border border-neutral-200 flex flex-col gap-1.5">
                <span className="text-xs font-mono font-bold uppercase text-neutral-900">Hostinger (DNS & Domínio)</span>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {isPt
                    ? 'Responsável pelo domínio niponspa.pt, configuração de registos DNS e serviços anteriormente contratados pela marca.'
                    : 'Manages the niponspa.pt domain, DNS records, and pre-existing brand services.'}
                </p>
              </div>
              <div className="bg-white/80 rounded-xl p-5 border border-neutral-200 flex flex-col gap-1.5">
                <span className="text-xs font-mono font-bold uppercase text-neutral-900">GitHub (Repositório)</span>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {isPt
                    ? 'Repositório central do código-fonte, garantindo histórico limpo de versões e ligações automáticas de publicação.'
                    : 'Central source repository ensuring clean version history and automated deployment triggers.'}
                </p>
              </div>
              <div className="bg-white/80 rounded-xl p-5 border border-neutral-200 flex flex-col gap-1.5">
                <span className="text-xs font-mono font-bold uppercase text-neutral-900">Vercel (Alojamento)</span>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {isPt
                    ? 'Plataforma onde o website está alojado e servido com builds rápidos, SSL automático e entrega otimizada.'
                    : 'Hosting platform delivering fast builds, automatic SSL, and global production serving.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 08: MAKING IT FUNCTIONAL
            ========================================================================= */}
        <section id="funcional" className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '08 / Making It Functional' : '08 / Making It Functional'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1115]">
              {isPt
                ? 'Uma experiência bonita também precisa de funcionar.'
                : 'A beautiful experience also has to work.'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              {isPt
                ? 'Além do design visual e da navegação calma, o projeto exigiu ligar todas as peças operacionais para que o website apoie o dia a dia do spa em Lisboa.'
                : 'Beyond calm aesthetics and thoughtful navigation, the website needed real operational integrations supporting the spa’s daily work in Lisbon.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Online Booking */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200/90 flex flex-col justify-between gap-6 shadow-xs">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-900 w-fit">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-neutral-400">DOC.PT</span>
                </div>
                <h3 className="text-xl font-bold text-[#0F1115]">
                  {isPt ? 'Online Booking' : 'Online Booking'}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  {isPt
                    ? 'Integração direta dos fluxos de marcação com o sistema DOC.pt, permitindo passar da escolha do tratamento ao agendamento em poucos cliques.'
                    : 'Direct integration with DOC.pt scheduling, letting guests move smoothly from treatment discovery to booking.'}
                </p>
              </div>
              <a
                href="https://nipon-spa-japones.doc.pt/services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 hover:underline w-fit"
              >
                <span>nipon-spa-japones.doc.pt/services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Google Tag Manager */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200/90 flex flex-col gap-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-900 w-fit">
                  <Tag className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-neutral-400">GTM</span>
              </div>
              <h3 className="text-xl font-bold text-[#0F1115]">Google Tag Manager</h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-light">
                {isPt
                  ? 'Implementação organizada do contentor GTM para acompanhar cliques em botões de marcação e pontos de contacto sem pesar no carregamento da página.'
                  : 'Structured GTM container setup to track booking interactions and contact clicks cleanly without hurting performance.'}
              </p>
            </div>

            {/* Google Business Profile */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200/90 flex flex-col gap-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-900 w-fit">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-neutral-400">LISBOA</span>
              </div>
              <h3 className="text-xl font-bold text-[#0F1115]">Google Business Profile</h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-light">
                {isPt
                  ? 'Atualização e alinhamento do perfil local para assegurar coerência de morada, horários, ligações diretas ao novo website e acesso imediato às reservas.'
                  : 'Local profile alignment ensuring consistent address details, opening hours, and direct links to the new website and booking system.'}
              </p>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200/90 flex flex-col gap-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-900 w-fit">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-neutral-400">ORGANIC SEARCH</span>
              </div>
              <h3 className="text-xl font-bold text-[#0F1115]">SEO</h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-light">
                {isPt
                  ? 'Estruturação semântica de títulos, descrições e metadados orientada para pesquisas de terapias japonesas e bem-estar em Lisboa, aliada a carregamento rápido na Vercel.'
                  : 'Semantic heading hierarchy, structured metadata, and fast Vercel delivery tailored for Japanese spa and therapy discovery in Lisbon.'}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 09: FINAL EXPERIENCE
            ========================================================================= */}
        <section id="experiencia-final" className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '09 / Final Experience' : '09 / Final Experience'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1115]">
              {isPt
                ? 'O resultado: uma experiência que começa no primeiro clique.'
                : 'The result: an experience that begins on the first click.'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              {isPt
                ? 'O website final unifica a atmosfera serena do espaço em Lisboa com uma arquitetura clara de tratamentos e acesso direto às marcações online.'
                : 'The final website unites the serene atmosphere of the Lisbon spa with clear treatment navigation and frictionless online booking.'}
            </p>
          </div>

          {/* Large Visual Showcase */}
          <div className="flex flex-col gap-3">
            <div
              onClick={() =>
                setLightboxImage({
                  src: niponSpaImg,
                  caption: isPt
                    ? 'Experiência final em produção — niponspa.pt.'
                    : 'Final live production experience — niponspa.pt.',
                })
              }
              className="group relative w-full bg-transparent cursor-pointer"
            >
              <img
                src={niponSpaImg}
                alt="Nipon Spa Website Final"
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
              />
              <div className="absolute bottom-6 right-6 bg-black/80 text-white text-[11px] font-mono px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Maximize2 className="w-3 h-3" />
                <span>{isPt ? 'Ampliar' : 'Expand'}</span>
              </div>
            </div>
            <p className="text-xs font-mono text-neutral-500 px-1">
              {isPt
                ? 'Figura 9.1 — Resultado publicado em niponspa.pt combinando Areia clara (#F4F0EB), fotografia atmosférica e ação direta em Vermelho Nipon (#A42F2D).'
                : 'Figure 9.1 — Published niponspa.pt result combining Light Sand (#F4F0EB), atmospheric imagery, and Nipon Red (#A42F2D) actions.'}
            </p>
          </div>

          {/* Visit Live Website CTA Strip */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-neutral-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
                HTTPS://WWW.NIPONSPA.PT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F1115]">
                {isPt ? 'Experiencie o website em funcionamento real' : 'Explore the live production website'}
              </h3>
              <p className="text-sm text-neutral-600 font-light">
                {isPt
                  ? 'Navegue pelos tratamentos, sinta o ritmo das transições e conheça o fluxo de marcação publicado.'
                  : 'Browse the treatment catalogue, feel the calm pacing, and test the published booking integration.'}
              </p>
            </div>

            <a
              href="https://www.niponspa.pt/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
            >
              <span>Visit Live Website</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: WHAT I LEARNED
            ========================================================================= */}
        <section id="aprendizagens" className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-4xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              {isPt ? '10 / What I Learned' : '10 / What I Learned'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1115]">
              {isPt ? 'O que aprendi' : 'What I learned'}
            </h2>
            <div className="flex flex-col gap-5 text-base sm:text-lg text-neutral-700 leading-relaxed font-light mt-2">
              <p>
                {isPt
                  ? 'Desenhar para bem-estar mostrou-me que a contenção exige mais critério do que o excesso. Retirar elementos, baixar o contraste agressivo e dar tempo às transições fez toda a diferença na forma como o utilizador sente a marca.'
                  : 'Designing for wellness proved that restraint demands more rigor than excess. Removing clutter, softening harsh contrast, and pacing transitions completely changed how visitors feel the brand.'}
              </p>
              <p>
                {isPt
                  ? 'Ao mesmo tempo, acompanhar o projeto do Figma até ao código com apoio de IA, ao GitHub, Vercel, DNS e ferramentas de análise confirmou que quando o designer compreende todo o ciclo de publicação, nenhuma intenção criativa se perde pelo caminho.'
                  : 'Taking the work from Figma through AI-assisted implementation, GitHub, Vercel, DNS, and analytics confirmed that when a designer owns the full delivery arc, nothing gets lost in translation.'}
              </p>
            </div>
          </div>

          {/* Highlighted Closing Quote */}
          <div className="border-t border-b border-neutral-300 py-14 sm:py-20 my-2">
            <blockquote className="max-w-4xl mx-auto flex flex-col gap-6 text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-light italic text-[#0F1115] leading-relaxed tracking-tight">
                “Good design is not only about what we see. It’s also about how we feel.”
              </p>
              <cite className="not-italic text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-bold flex items-center justify-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>NIPON SPA · LISBOA · CASE STUDY</span>
              </cite>
            </blockquote>
          </div>
        </section>
      </EditorialProjectLayout>

      {/* Fullscreen Lightbox Modal */}
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
                  {lightboxImage.caption || 'Nipon Spa'}
                </span>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Fechar imagem"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <img
                src={lightboxImage.src}
                alt={lightboxImage.caption || 'Nipon Spa'}
                className="max-h-[82vh] w-auto max-w-full object-contain rounded-xl bg-transparent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
