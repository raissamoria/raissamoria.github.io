import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { ArrowDown, ArrowUpRight, Eye, Sparkles, Layers, Maximize2 } from 'lucide-react';
import { ProjectItem } from '../types';

// @ts-ignore
import niponHeroImg from '../assets/images/nipon_spa_hero_1787305381037.jpg';

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 1,
    number: "01",
    title: "Nipon Spa",
    subtitle: "Japanese Wellness Digital Experience",
    description: "Redesign and development of the digital experience for Nipon Spa, a Japanese-inspired wellness and therapeutic spa in Lisbon. The project focused on creating a clearer, more premium and user-friendly experience, improving service discovery and guiding users naturally towards booking a treatment.",
    descriptionPt: "Redesign e desenvolvimento da experiência digital para o Nipon Spa, um spa de bem-estar e terapêutico de inspiração japonesa em Lisboa. Focado em criar uma experiência mais clara, premium e intuitiva, facilitando a descoberta de tratamentos e a marcação online.",
    category: "UX/UI & Web",
    roles: ["UX/UI DESIGN", "WEB DESIGN", "DEVELOPMENT"],
    year: "2026",
    link: "https://www.niponspa.pt/",
    liveUrl: "https://www.niponspa.pt/",
    slug: "nipon-spa",
    hasCaseStudy: true,
    image: niponHeroImg,
    metrics: "Figma • UX Architecture • React / Web",
    tags: ["UX/UI Design", "Web Design", "Development", "Japanese Wellness"]
  },
  {
    id: 2,
    number: "02",
    title: "Creative Code",
    subtitle: "Kinetic Typography & Shaders",
    description: "An exploration of motion and typography using custom canvas scripts and shaders to create organic, interactive text behaviors.",
    descriptionPt: "Exploração de movimento e tipografia experimental usando scripts de canvas e shaders para criar comportamentos de texto orgânicos e interativos.",
    category: "Creative Dev",
    roles: ["CREATIVE CODE", "GLSL SHADERS", "INTERACTION"],
    year: "2024",
    link: "https://raissamoria.github.io/project4.html",
    metrics: "WebGL • Shaders • Canvas API",
    tags: ["WebGL", "Typography", "Interactive", "GLSL"]
  },
  {
    id: 3,
    number: "03",
    title: "SUE App",
    subtitle: "Emigration Support Platform",
    description: "End-to-end UX/UI design for a mobile application dedicated to simplifying international relocating processes and emotional support.",
    descriptionPt: "Design UX/UI completo para uma aplicação mobile dedicada a simplificar processos de relocalização internacional e suporte emocional.",
    category: "Product Design",
    roles: ["UX RESEARCH", "PRODUCT DESIGN", "DESIGN SYSTEM"],
    year: "2023",
    link: "https://raissamoria.github.io/project2.html",
    metrics: "Figma • iOS Design System • UX Research",
    tags: ["UX Research", "Mobile App", "Design System", "Figma"]
  },
  {
    id: 4,
    number: "04",
    title: "Amarelo C4ralho",
    subtitle: "Expressive Motion Design",
    description: "A fast-paced audio-visual motion design study examining high-impact typography pairings and rhythmic video editing.",
    descriptionPt: "Estudo dinâmico de motion design audiovisual examinando combinações tipográficas de alto impacto e edição rítmica de vídeo.",
    category: "Motion Design",
    roles: ["MOTION DESIGN", "AUDIO-VISUAL", "KINETIC TYPE"],
    year: "2023",
    link: "https://raissamoria.github.io/project3.html",
    metrics: "After Effects • Sound Sync • 60 FPS",
    tags: ["Motion Graphics", "Audio-Visual", "Kinetic", "Typography"]
  },
  {
    id: 5,
    number: "05",
    title: "Two Points",
    subtitle: "Parametric Typography System",
    description: "A modular typographic design system built around architectural grid geometry and responsive vector anchors.",
    descriptionPt: "Sistema tipográfico modular e paramétrico construído em torno de geometria arquitetónica e âncoras vetoriais responsivas.",
    category: "Visual Identity",
    roles: ["GRID SYSTEMS", "TYPE DESIGN", "BRANDING"],
    year: "2022",
    link: "https://raissamoria.github.io/project1.html",
    metrics: "Modular Grids • Vector Geometry • Branding",
    tags: ["Branding", "Grid Geometry", "Print & Digital", "Type Design"]
  }
];

interface GalleryTunnelProps {
  language: 'pt' | 'en';
  onEnterPortfolio?: () => void;
  onSelectProject?: (slug: string) => void;
}

export const GalleryTunnel: React.FC<GalleryTunnelProps> = ({
  language,
  onEnterPortfolio,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isRevealed, setIsRevealed] = useState(false);

  // Monitor scroll progress across the 350vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out scroll progression using spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // 3D Camera Travel along Z Axis: maps 0..1 to 0..2800px forward motion
  const cameraZ = useTransform(smoothProgress, [0, 0.85, 1], [0, 2400, 2600]);
  
  // Perspective tunnel wireframe opacity
  const tunnelOpacity = useTransform(smoothProgress, [0, 0.08, 0.88, 1], [0.3, 1, 1, 0.2]);
  
  // CTA Reveal threshold: triggers smoothly when user nears the end of the tunnel
  const ctaOpacity = useTransform(smoothProgress, [0.72, 0.86], [0, 1]);
  const ctaScale = useTransform(smoothProgress, [0.72, 0.88], [0.88, 1]);
  const ctaPointerEvents = useTransform(smoothProgress, (val) => (val > 0.72 ? 'auto' : 'none'));

  // Header status HUD visibility
  const hudOpacity = useTransform(smoothProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0.4]);

  // Subtle interactive parallax tilt based on cursor movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientWidth, clientHeight } = e.currentTarget;
    const x = (e.clientX / clientWidth - 0.5) * 14; // max +-7 deg
    const y = (e.clientY / clientHeight - 0.5) * -14; // max +-7 deg
    setMousePos({ x, y });
  };

  const handleScrollToProjects = () => {
    setIsRevealed(true);
    if (onEnterPortfolio) {
      onEnterPortfolio();
    }
    const el = document.getElementById('portfolio-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCardClick = (project: ProjectItem) => {
    if (project.slug && onSelectProject) {
      onSelectProject(project.slug);
    } else {
      handleScrollToProjects();
    }
  };

  // Wireframe tunnel depth frames (12 successive geometry rings)
  const tunnelRings = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    zPos: -i * 260, // spaced from 0 to -2860px
    label: `SEC_0${(i + 1).toString().padStart(2, '0')}`,
    depth: (i + 1) * 25,
  }));

  // Floating project panels along the tunnel corridor walls
  const tunnelCards = [
    {
      project: PORTFOLIO_PROJECTS[0],
      z: -380,
      x: -340,
      y: -30,
      rotationY: 18,
      rotationZ: -1,
      variant: 'nipon'
    },
    {
      project: PORTFOLIO_PROJECTS[1],
      z: -880,
      x: 360,
      y: 20,
      rotationY: -18,
      rotationZ: 1,
      variant: 'kinetic'
    },
    {
      project: PORTFOLIO_PROJECTS[2],
      z: -1380,
      x: -360,
      y: 30,
      rotationY: 20,
      rotationZ: -2,
      variant: 'product'
    },
    {
      project: PORTFOLIO_PROJECTS[3],
      z: -1880,
      x: 350,
      y: -30,
      rotationY: -19,
      rotationZ: 1,
      variant: 'motion'
    },
    {
      project: PORTFOLIO_PROJECTS[4],
      z: -2380,
      x: -340,
      y: 10,
      rotationY: 18,
      rotationZ: -1,
      variant: 'grid'
    }
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="tunnel-section"
      className="relative w-full h-[320vh] bg-black text-white selection:bg-white selection:text-black"
    >
      {/* Sticky 3D Tunnel Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none bg-black">
        
        {/* Deep Horizon Glow & Grid Ambient Canvas */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(35, 35, 40, 0.4) 0%, rgba(0, 0, 0, 0.95) 75%, #000000 100%)',
          }}
        />

        {/* 1. Futuristic Minimal HUD Overlay */}
        <motion.div 
          style={{ opacity: hudOpacity }}
          className="absolute top-8 left-6 md:left-12 right-6 md:right-12 z-30 flex justify-between items-center pointer-events-none text-neutral-400 font-mono text-[10px] uppercase tracking-[0.2em]"
        >
          <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>
              {language === 'pt' ? '3D TUNNEL GALLERY • SCROLL PARA AVANÇAR' : '3D TUNNEL GALLERY • SCROLL TO EXPLORE'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-neutral-400">
            <span>SYS // MONOCHROME</span>
            <span className="text-white/20">•</span>
            <span>FOV 1200PX</span>
          </div>
        </motion.div>

        {/* 2. PERSPECTIVE 3D WORLD CONTAINER */}
        <div 
          className="w-full h-full flex items-center justify-center relative overflow-hidden"
          style={{
            perspective: '1200px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* Parallax & Scroll-driven 3D Scene Root */}
          <motion.div
            style={{
              opacity: tunnelOpacity,
              transformStyle: 'preserve-3d',
              rotateX: mousePos.y * 0.4,
              rotateY: mousePos.x * 0.4,
            }}
            className="relative w-full h-full flex items-center justify-center will-change-transform"
          >
            
            {/* 3D Rail Lines (Corridor corner diagonals pointing to infinity) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
              
              {/* Vanishing Horizon Crosshair Center */}
              <div 
                className="absolute w-24 h-24 rounded-full border border-white/15 flex items-center justify-center"
                style={{ transform: 'translateZ(-2800px)' }}
              >
                <div className="w-2 h-2 rounded-full bg-white/40 animate-ping" />
                <div className="absolute w-36 h-[1px] bg-white/20" />
                <div className="absolute h-36 w-[1px] bg-white/20" />
              </div>

              {/* Top & Bottom Floor/Ceiling Perspective Line Guides */}
              {[-600, -300, 0, 300, 600].map((offset, idx) => (
                <div
                  key={`floor-guide-${idx}`}
                  className="absolute w-[2px] h-[3200px] bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none"
                  style={{
                    transform: `translateX(${offset}px) translateY(380px) rotateX(90deg) translateZ(0px)`,
                    transformOrigin: 'center center',
                  }}
                />
              ))}

              {[-600, -300, 0, 300, 600].map((offset, idx) => (
                <div
                  key={`ceil-guide-${idx}`}
                  className="absolute w-[2px] h-[3200px] bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none"
                  style={{
                    transform: `translateX(${offset}px) translateY(-380px) rotateX(90deg) translateZ(0px)`,
                    transformOrigin: 'center center',
                  }}
                />
              ))}

              {/* Left & Right Wall Grid Strips */}
              {[-300, 0, 300].map((yOffset, idx) => (
                <div
                  key={`wall-l-${idx}`}
                  className="absolute h-[2px] w-[3200px] bg-gradient-to-r from-white/20 via-white/5 to-transparent pointer-events-none"
                  style={{
                    transform: `translateX(-680px) translateY(${yOffset}px) rotateY(90deg) translateZ(0px)`,
                    transformOrigin: 'center center',
                  }}
                />
              ))}

              {[-300, 0, 300].map((yOffset, idx) => (
                <div
                  key={`wall-r-${idx}`}
                  className="absolute h-[2px] w-[3200px] bg-gradient-to-r from-white/20 via-white/5 to-transparent pointer-events-none"
                  style={{
                    transform: `translateX(680px) translateY(${yOffset}px) rotateY(-90deg) translateZ(0px)`,
                    transformOrigin: 'center center',
                  }}
                />
              ))}
            </div>

            {/* 3. RECURSIVE 3D WIREFRAME FRAMES */}
            {tunnelRings.map((ring) => (
              <motion.div
                key={`ring-${ring.id}`}
                style={{
                  transform: useTransform(
                    cameraZ,
                    (zVal) => `translate3d(0, 0, ${ring.zPos + zVal}px)`
                  ),
                  transformStyle: 'preserve-3d',
                }}
                className="absolute w-[92vw] max-w-[1240px] h-[78vh] max-h-[720px] rounded-2xl border border-white/10 flex items-center justify-center pointer-events-none"
              >
                {/* 4 Corner Crosshair Anchors */}
                <div className="absolute -top-1.5 -left-1.5 text-[8px] font-mono text-white/30">+</div>
                <div className="absolute -top-1.5 -right-1.5 text-[8px] font-mono text-white/30">+</div>
                <div className="absolute -bottom-1.5 -left-1.5 text-[8px] font-mono text-white/30">+</div>
                <div className="absolute -bottom-1.5 -right-1.5 text-[8px] font-mono text-white/30">+</div>

                {/* Sub-frame internal divisions */}
                <div className="absolute inset-4 border border-white/[0.04] rounded-xl" />

                {/* Ring Depth Tag */}
                <div className="absolute bottom-3 left-6 font-mono text-[8px] tracking-widest text-neutral-600 uppercase">
                  {ring.label} // DEPTH {ring.depth}M
                </div>
              </motion.div>
            ))}

            {/* 4. FLOATING 3D MONOCHROME PROJECT ART CARDS */}
            {tunnelCards.map((card, idx) => (
              <motion.div
                key={`tunnel-card-${card.project.id}`}
                style={{
                  transform: useTransform(
                    cameraZ,
                    (zVal) =>
                      `translate3d(${card.x}px, ${card.y}px, ${card.z + zVal}px) rotateY(${card.rotationY}deg) rotateZ(${card.rotationZ}deg)`
                  ),
                  opacity: useTransform(
                    cameraZ,
                    (zVal) => {
                      const curZ = card.z + zVal;
                      // Fade in as it comes into view from deep distance (-1200..-400), peak at -400..100, fade out as it passes camera (>350)
                      if (curZ < -1600) return 0;
                      if (curZ < -600) return (curZ + 1600) / 1000;
                      if (curZ <= 200) return 1;
                      if (curZ <= 500) return 1 - (curZ - 200) / 300;
                      return 0;
                    }
                  ),
                  transformStyle: 'preserve-3d',
                }}
                className="absolute w-[320px] sm:w-[380px] md:w-[420px] bg-[#0A0A0A] border border-white/20 hover:border-white/50 rounded-2xl p-6 shadow-2xl backdrop-blur-xl transition-colors duration-300 pointer-events-auto group cursor-pointer"
                onClick={() => handleCardClick(card.project)}
              >
                {/* Visual Header & Metadata */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-white/50 uppercase tracking-wider">
                    <span className="text-white font-bold">{card.project.number}</span>
                    <span>//</span>
                    <span>{card.project.category}</span>
                  </div>
                  <span className="font-mono text-[9px] text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {card.project.year}
                  </span>
                </div>

                {/* Card Monochromatic Abstract Artwork Banner */}
                <div className="w-full h-40 rounded-xl bg-gradient-to-b from-neutral-900 via-black to-[#050505] border border-white/10 relative overflow-hidden mb-5 flex items-center justify-center p-4">
                  
                  {/* Subtle Geometric Background Pattern */}
                  <div 
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />

                  {/* High-Contrast Typographic Art Core */}
                  <div className="relative z-10 text-center flex flex-col items-center">
                    <span className="font-sans font-black text-2xl uppercase tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
                      {card.project.title}
                    </span>
                    <span className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase mt-1">
                      {card.project.subtitle}
                    </span>
                  </div>

                  {/* Corner Visual Brackets */}
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-white/40">┌</div>
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-white/40">┐</div>
                  <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/40">└</div>
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono text-white/40">┘</div>
                </div>

                {/* Project Description Snippet */}
                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4 line-clamp-2">
                  {language === 'pt' ? card.project.descriptionPt : card.project.description}
                </p>

                {/* Action Link Footer */}
                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                  <span className="group-hover:text-white transition-colors">
                    {language === 'pt' ? 'Explorar Projeto' : 'Explore Project'}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}

          </motion.div>
        </div>

        {/* 5. PAUSE STATE & REVEAL PORTAL CTA */}
        <motion.div
          style={{
            opacity: ctaOpacity,
            scale: ctaScale,
            pointerEvents: ctaPointerEvents,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-black/75 backdrop-blur-md p-6 text-center"
        >
          {/* Geometric Portal Rings */}
          <div className="relative mb-8 flex items-center justify-center">
            <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-dashed border-white/20 animate-spin" style={{ animationDuration: '30s' }} />
            <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-white/30" />
            <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-white/50 flex items-center justify-center bg-white/[0.04]">
              <Layers className="w-6 h-6 text-white animate-pulse" />
            </div>
            
            {/* HUD Corner Ticks */}
            <div className="absolute -top-3 -left-3 font-mono text-[9px] text-white/50">SEC // 04</div>
            <div className="absolute -bottom-3 -right-3 font-mono text-[9px] text-white/50">PORTAL LOCK</div>
          </div>

          {/* Section Title */}
          <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
            {language === 'pt' ? 'Destino Alcançado' : 'Destination Reached'}
          </h3>

          <p className="text-neutral-400 font-light text-xs sm:text-sm max-w-md mb-8">
            {language === 'pt'
              ? 'O túnel revelou os trabalhos selecionados de Raíssa Moriá. Clique abaixo para abrir o arquivo completo de projetos.'
              : 'The gallery tunnel has unlocked the selected works of Raíssa Moriá. Click below to reveal the full project index.'
            }
          </p>

          {/* Core Interactive Action Button */}
          <button
            onClick={handleScrollToProjects}
            className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-[0.15em] hover:bg-neutral-200 transition-all shadow-[0_0_50px_rgba(255,255,255,0.25)] hover:scale-105 cursor-pointer outline-none active:scale-95"
          >
            <span>
              {language === 'pt' ? 'Entrar no Portfólio' : 'Enter Selected Works'}
            </span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          <span className="mt-4 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
            {language === 'pt' ? 'Ou continue o scroll para avançar' : 'Or continue scrolling to explore'}
          </span>
        </motion.div>

        {/* 6. Quick Skip / Jump to Portfolio button in bottom-right */}
        <button
          onClick={handleScrollToProjects}
          className="absolute bottom-6 right-6 md:right-12 z-30 flex items-center gap-2 text-neutral-400 hover:text-white bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 hover:border-white/30 px-3.5 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
        >
          <span>{language === 'pt' ? 'Ver Todos os Projetos' : 'View All Projects'}</span>
          <ArrowDown className="w-3 h-3" />
        </button>

      </div>
    </section>
  );
};
