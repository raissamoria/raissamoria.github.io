import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export type WordmarkStyle = 'white-3d' | 'graphite-chrome' | 'surf-resin' | 'matte-dark';

interface MoriaSurfLetteringProps {
  className?: string;
  defaultStyle?: WordmarkStyle;
  showStyleSelector?: boolean;
  onStyleChange?: (style: WordmarkStyle) => void;
}

export const MoriaSurfLettering: React.FC<MoriaSurfLetteringProps> = ({
  className = '',
  defaultStyle = 'white-3d',
  showStyleSelector = true,
  onStyleChange,
}) => {
  const [currentStyle, setCurrentStyle] = useState<WordmarkStyle>(defaultStyle);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStyleSelect = (style: WordmarkStyle) => {
    setCurrentStyle(style);
    onStyleChange?.(style);
  };

  // Parallax 3D tilt tracking with smooth interpolation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPct = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yPct = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMouseOffset({ x: xPct, y: yPct });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Material Theme Definitions
  const styleConfigs = {
    'white-3d': {
      id: 'white-3d' as const,
      labelPt: 'Branco 3D Mineral',
      labelEn: 'Sculpted White 3D',
      descPt: 'Volume escultural puro, sombras de oclusão suaves e iluminação direcional clean.',
      frontFill: 'url(#whiteFrontGrad)',
      bevelStroke: 'url(#whiteBevelGrad)',
      bevelFill: 'url(#whiteExtrusionGrad)',
      highlightStroke: 'rgba(255, 255, 255, 0.95)',
      shadowColor: 'rgba(0, 0, 0, 0.85)',
      glowColor: 'rgba(255, 255, 255, 0.12)',
      extrusionColor: '#8E909B',
      dropShadowFilter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.8)) drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
    },
    'graphite-chrome': {
      id: 'graphite-chrome' as const,
      labelPt: 'Grafite Cromado',
      labelEn: 'Dark Chrome',
      descPt: 'Elegância líquida e reflexos metálicos escuros com brilho especular dinâmico.',
      frontFill: 'url(#chromeFrontGrad)',
      bevelStroke: 'url(#chromeBevelGrad)',
      bevelFill: 'url(#chromeExtrusionGrad)',
      highlightStroke: 'rgba(200, 220, 255, 0.9)',
      shadowColor: 'rgba(0, 0, 0, 0.95)',
      glowColor: 'rgba(96, 165, 250, 0.25)',
      extrusionColor: '#171922',
      dropShadowFilter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.95)) drop-shadow(0 0 45px rgba(59,130,246,0.2))',
    },
    'surf-resin': {
      id: 'surf-resin' as const,
      labelPt: 'Resina Surfboard',
      labelEn: 'Surfboard Resin',
      descPt: 'Acabamento vítreo inspirado na resina polida de pranchas clássicas, com refração translúcida.',
      frontFill: 'url(#resinFrontGrad)',
      bevelStroke: 'url(#resinBevelGrad)',
      bevelFill: 'url(#resinExtrusionGrad)',
      highlightStroke: 'rgba(186, 230, 253, 0.95)',
      shadowColor: 'rgba(0, 10, 20, 0.9)',
      glowColor: 'rgba(56, 189, 248, 0.35)',
      extrusionColor: '#0F2537',
      dropShadowFilter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.9)) drop-shadow(0 0 50px rgba(56,189,248,0.3))',
    },
    'matte-dark': {
      id: 'matte-dark' as const,
      labelPt: 'Matte Escultórico',
      labelEn: 'Sculptural Matte',
      descPt: 'Textura acetinada minimalista, presença monolítica e bisel sutil de alta precisão.',
      frontFill: 'url(#matteFrontGrad)',
      bevelStroke: 'url(#matteBevelGrad)',
      bevelFill: 'url(#matteExtrusionGrad)',
      highlightStroke: 'rgba(255, 255, 255, 0.4)',
      shadowColor: 'rgba(0, 0, 0, 0.95)',
      glowColor: 'rgba(255, 255, 255, 0.05)',
      extrusionColor: '#111215',
      dropShadowFilter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.9))',
    },
  };

  const activeConfig = styleConfigs[currentStyle];

  // Subtle 3D tilt calculation based on mouse
  const tiltX = -mouseOffset.y * 6; // degrees
  const tiltY = mouseOffset.x * 8;  // degrees
  const extrudeOffsetX = mouseOffset.x * 5;
  const extrudeOffsetY = mouseOffset.y * 4 + 7; // naturally extruding downwards

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* 3D PERSPECTIVE WRAPPER */}
      <div 
        className="w-full flex items-center justify-center pointer-events-auto"
        style={{
          perspective: '1200px',
        }}
      >
        <motion.div
          animate={{
            rotateX: tiltX,
            rotateY: tiltY,
            scale: isHovered ? 1.015 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 24,
            mass: 0.8,
          }}
          style={{
            transformStyle: 'preserve-3d',
            filter: activeConfig.dropShadowFilter,
          }}
          className="relative w-full max-w-[1440px] px-4 md:px-8 py-2 flex items-center justify-center cursor-default"
        >
          {/* SVG WORDMARK WITH 3D DEPTH LAYERS */}
          <svg
            viewBox="0 0 1200 360"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-h-[38vh] min-h-[140px] overflow-visible drop-shadow-2xl"
          >
            <defs>
              {/* WHITE 3D SHADERS */}
              <linearGradient id="whiteFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#F8F9FA" />
                <stop offset="70%" stopColor="#ECEEF1" />
                <stop offset="100%" stopColor="#D5D8DE" />
              </linearGradient>
              <linearGradient id="whiteBevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#C9CCD4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8A8E9A" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="whiteExtrusionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#9C9FA8" />
                <stop offset="50%" stopColor="#555861" />
                <stop offset="100%" stopColor="#25272D" />
              </linearGradient>

              {/* CHROME GRAPHITE SHADERS */}
              <linearGradient id="chromeFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="18%" stopColor="#64748B" />
                <stop offset="38%" stopColor="#0F172A" />
                <stop offset="55%" stopColor="#94A3B8" />
                <stop offset="75%" stopColor="#1E293B" />
                <stop offset="92%" stopColor="#475569" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
              <linearGradient id="chromeBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id="chromeExtrusionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="40%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>

              {/* SURF RESIN SHADERS */}
              <linearGradient id="resinFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F0FDFA" />
                <stop offset="25%" stopColor="#E0F2FE" />
                <stop offset="60%" stopColor="#BAE6FD" />
                <stop offset="85%" stopColor="#7DD3FC" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
              <linearGradient id="resinBevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="resinExtrusionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0369A1" />
                <stop offset="50%" stopColor="#0C4A6E" />
                <stop offset="100%" stopColor="#082F49" />
              </linearGradient>

              {/* MATTE DARK SHADERS */}
              <linearGradient id="matteFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#33353A" />
                <stop offset="50%" stopColor="#25272C" />
                <stop offset="100%" stopColor="#18191D" />
              </linearGradient>
              <linearGradient id="matteBevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#555861" />
                <stop offset="100%" stopColor="#1E2024" />
              </linearGradient>
              <linearGradient id="matteExtrusionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1A1B20" />
                <stop offset="100%" stopColor="#0B0C0E" />
              </linearGradient>

              {/* DYNAMIC SPECULAR SWEEP SHINE */}
              <linearGradient id="specularSweep" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="45%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.45)" />
                <stop offset="55%" stopColor="transparent" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* AMBIENT GLOW FILTER */}
              <filter id="moriaGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="24" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* LAYER 0: Ambient Back Glow */}
            <g opacity="0.35" filter="url(#moriaGlow)">
              <MoriaLetteringPath fill={activeConfig.glowColor} />
            </g>

            {/* LAYER 1: Deep Cast Occlusion Shadows (Offset in 3D) */}
            <g 
              transform={`translate(${extrudeOffsetX * 1.8}, ${extrudeOffsetY * 2.2})`} 
              opacity="0.6"
              filter="blur(16px)"
            >
              <MoriaLetteringPath fill="#000000" />
            </g>

            {/* LAYER 2: Successive Extrusion Steps (Realistic 3D Body) */}
            {[7, 6, 5, 4, 3, 2, 1].map((step) => {
              const fraction = step / 7;
              const ox = extrudeOffsetX * fraction;
              const oy = extrudeOffsetY * fraction;
              return (
                <g 
                  key={`extrude-${step}`}
                  transform={`translate(${ox}, ${oy})`}
                  opacity={0.85 + (1 - fraction) * 0.15}
                >
                  <MoriaLetteringPath 
                    fill={activeConfig.bevelFill} 
                    stroke={activeConfig.bevelStroke}
                    strokeWidth="1.2"
                  />
                </g>
              );
            })}

            {/* LAYER 3: 3D Bevel Chamfer Edge */}
            <g transform={`translate(${extrudeOffsetX * 0.3}, ${extrudeOffsetY * 0.3})`}>
              <MoriaLetteringPath 
                fill="none" 
                stroke={activeConfig.bevelStroke} 
                strokeWidth="2.5" 
              />
            </g>

            {/* LAYER 4: Front Lettering Face */}
            <g id="moria-front-face">
              <MoriaLetteringPath 
                fill={activeConfig.frontFill} 
                stroke={activeConfig.highlightStroke}
                strokeWidth="1"
              />
            </g>

            {/* LAYER 5: Specular Sheen Sweep Overlay */}
            <g 
              id="moria-specular-sheen" 
              className="pointer-events-none mix-blend-overlay"
              opacity={isHovered ? 0.75 : 0.3}
            >
              <MoriaLetteringPath fill="url(#specularSweep)" />
            </g>

            {/* LAYER 6: Subtle Hydrodynamic Inner Wave Contour Lines */}
            <g 
              opacity={currentStyle === 'surf-resin' ? 0.55 : 0.25} 
              stroke="rgba(255, 255, 255, 0.7)" 
              strokeWidth="0.8" 
              strokeDasharray="4 8"
              fill="none"
              className="pointer-events-none"
            >
              {/* Internal wave ripples inside letterforms */}
              {/* M inner wave line */}
              <path d="M 125 100 Q 155 190 190 220 Q 220 180 248 100" />
              {/* O inner wave vortex */}
              <path d="M 430 110 C 370 140 375 220 425 240 C 475 240 480 140 430 110" />
              {/* R inner flow line */}
              <path d="M 590 100 Q 645 105 660 145 Q 640 180 590 185" />
              <path d="M 620 195 Q 670 230 715 270" />
              {/* A inner wave ridge */}
              <path d="M 980 95 L 910 245" />
              <path d="M 985 95 L 1055 245" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* INTERACTIVE 3D MATERIAL SELECTOR DOCK */}
      {showStyleSelector && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 flex flex-col items-center gap-2 pointer-events-auto z-30"
        >
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#050505]/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {(['white-3d', 'graphite-chrome', 'surf-resin', 'matte-dark'] as const).map((styleKey) => {
              const cfg = styleConfigs[styleKey];
              const isSelected = currentStyle === styleKey;
              return (
                <button
                  key={styleKey}
                  onClick={() => handleStyleSelect(styleKey)}
                  className={`group relative px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                  title={cfg.descPt}
                >
                  <span 
                    className="w-2 h-2 rounded-full border border-black/20"
                    style={{
                      background: 
                        styleKey === 'white-3d' ? '#FFFFFF' :
                        styleKey === 'graphite-chrome' ? 'linear-gradient(135deg, #CBD5E1, #1E293B)' :
                        styleKey === 'surf-resin' ? 'linear-gradient(135deg, #7DD3FC, #0284C7)' :
                        '#1F2024'
                    }}
                  />
                  <span>{cfg.labelPt}</span>
                </button>
              );
            })}
          </div>

          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-2.5 h-2.5 text-[#3B82F6]" />
            <span>Wordmark 3D autoral com energia surf · Selecione o acabamento</span>
          </span>
        </motion.div>
      )}
    </div>
  );
};

/**
 * Custom Handcrafted Vector Paths for "MORIA"
 * Built with classic surfwear typography anatomy:
 * - Fluid hydrodynamic wave curves
 * - Expressive ocean swell terminals
 * - Sweeping wave-carve tail on R
 * - Barrel-shaped elliptical O
 * - High readability, bold & memorable
 */
export const MORIA_PATH_M = `
  M 92 280 
  C 82 280 72 272 70 258 
  C 66 232 68 185 75 142 
  C 80 110 90 78 116 64 
  C 134 54 154 62 168 84 
  L 194 148 
  L 220 84 
  C 234 60 255 54 274 64 
  C 298 78 308 110 314 142 
  C 320 178 322 225 318 258 
  C 316 272 306 280 294 280 
  C 280 280 270 270 272 254 
  C 276 226 274 185 270 148 
  C 268 132 262 118 252 112 
  C 242 106 232 112 224 126 
  L 204 175 
  C 198 190 188 190 182 175 
  L 162 126 
  C 154 112 144 106 134 112 
  C 124 118 118 132 116 148 
  C 112 185 110 226 114 254 
  C 116 270 106 280 92 280 
  Z
`;

export const MORIA_PATH_O = `
  M 432 58 
  C 485 58 528 102 536 162 
  C 544 224 506 284 445 284 
  C 388 284 345 238 338 178 
  C 330 114 372 58 432 58 
  Z
  M 438 102 
  C 402 102 380 134 384 174 
  C 388 214 416 240 448 240 
  C 480 240 500 208 496 168 
  C 492 128 468 102 438 102 
  Z
`;

export const MORIA_PATH_R = `
  M 568 280 
  C 554 280 544 270 546 254 
  C 550 225 552 175 554 135 
  C 556 102 558 75 562 66 
  C 568 56 584 58 605 58 
  C 648 58 695 64 718 90 
  C 736 110 740 138 726 162 
  C 712 184 682 196 648 198 
  L 692 245 
  C 706 260 722 268 742 268 
  C 752 268 760 274 760 282 
  C 760 288 752 292 738 292 
  C 708 292 684 278 664 256 
  L 628 214 
  L 598 214 
  L 594 254 
  C 592 270 582 280 568 280 
  Z
  M 598 102 
  L 598 172 
  L 634 172 
  C 660 172 686 164 688 138 
  C 690 114 668 102 638 102 
  L 598 102 
  Z
`;

export const MORIA_PATH_I = `
  M 788 280 
  C 774 280 764 270 766 254 
  C 770 218 772 170 774 132 
  C 776 100 778 78 784 66 
  C 790 56 805 58 820 58 
  C 834 58 842 66 840 80 
  C 836 120 834 168 832 208 
  C 830 238 828 265 822 274 
  C 816 280 802 280 788 280 
  Z
`;

export const MORIA_PATH_A = `
  M 982 58 
  C 996 58 1008 66 1018 84 
  L 1098 244 
  C 1106 260 1118 268 1130 270 
  C 1138 272 1142 278 1142 284 
  C 1142 290 1134 294 1120 294 
  C 1100 294 1082 284 1070 262 
  L 1052 224 
  L 922 224 
  L 902 262 
  C 892 282 876 294 856 294 
  C 844 294 836 290 836 284 
  C 836 278 842 272 850 268 
  C 860 262 872 254 880 238 
  L 952 84 
  C 962 66 972 58 982 58 
  Z
  M 986 108 
  L 938 188 
  L 1034 188 
  L 986 108 
  Z
`;

export const MORIA_SURF_PATH_ALL = `${MORIA_PATH_M} ${MORIA_PATH_O} ${MORIA_PATH_R} ${MORIA_PATH_I} ${MORIA_PATH_A}`;

const MoriaLetteringPath: React.FC<React.SVGProps<SVGPathElement>> = (props) => {
  return (
    <g {...props}>
      <path d={MORIA_PATH_M} />
      <path d={MORIA_PATH_O} fillRule="evenodd" />
      <path d={MORIA_PATH_R} fillRule="evenodd" />
      <path d={MORIA_PATH_I} />
      <path d={MORIA_PATH_A} fillRule="evenodd" />
    </g>
  );
};
