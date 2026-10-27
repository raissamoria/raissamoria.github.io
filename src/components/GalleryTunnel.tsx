import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown, ArrowUpRight, Layers, Maximize2, Minimize2, Compass, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types';
import { OpticalGlassButton, OpticalGlassPill } from './OpticalGlass';

// Authentic website image from https://www.niponspa.pt
// @ts-ignore
import niponHeroImg from '../assets/images/nipon_real_house.png';
// Cover image for SUE app mobile
// @ts-ignore
import sueCapaImg from '../assets/images/sue-capa.png';

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
    title: "SUE",
    subtitle: "App Mobile to Support Emigration (UX/UI)",
    description: "End-to-end UX/UI mobile app design for SUE (Serviços de União a Emigração / Union Services for Emigration), a migration facility platform dedicated to assisting emigrants and immigrants with quick access services, relocation process tracking, and 24/7 conversational support.",
    descriptionPt: "Design UX/UI de aplicação mobile para o SUE (Serviços de União a Emigração), concebido para apoiar imigrantes e emigrantes com navegação simplificada de serviços públicos, acompanhamento de pedidos e apoio conversacional 24/7.",
    category: "Mobile UX/UI",
    roles: ["UX/UI DESIGN", "MOBILE APP", "PRODUCT DESIGN", "DESIGN SYSTEM"],
    year: "2024",
    link: "#projects/sue-app",
    liveUrl: "#projects/sue-app",
    slug: "sue-app",
    hasCaseStudy: true,
    image: sueCapaImg,
    metrics: "Figma • iOS & Android • UX Research • Design System",
    tags: ["UX/UI Design", "Mobile App", "Emigration Support", "Design System", "Figma"]
  },
  {
    id: 3,
    number: "03",
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
  const viewportRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Monitor window resize to maintain full-screen responsive accuracy
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Monitor native browser fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (viewportRef.current?.requestFullscreen) {
        viewportRef.current.requestFullscreen();
      } else if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Monitor scroll progress across the deep 380vh scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out scroll progression using spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // 3D Camera Travel along Z Axis: maps 0..1 to 0..2700px forward motion
  const cameraZ = useTransform(smoothProgress, [0, 0.88, 1], [0, 2550, 2750]);
  
  // Perspective tunnel wireframe opacity
  const tunnelOpacity = useTransform(smoothProgress, [0, 0.05, 0.90, 1], [0.4, 1, 1, 0.15]);
  
  // HUD visibility
  const hudOpacity = useTransform(smoothProgress, [0.03, 0.12, 0.88, 0.96], [0.6, 1, 1, 0.3]);

  // CTA Reveal threshold: triggers smoothly when user nears the end of the tunnel
  const ctaOpacity = useTransform(smoothProgress, [0.75, 0.88], [0, 1]);
  const ctaScale = useTransform(smoothProgress, [0.75, 0.88], [0.92, 1]);
  const ctaPointerEvents = useTransform(smoothProgress, (val) => (val > 0.75 ? 'auto' : 'none'));

  // Subtle interactive parallax tilt based on cursor movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientWidth, clientHeight } = e.currentTarget;
    const x = (e.clientX / clientWidth - 0.5) * 12; // max +-6 deg
    const y = (e.clientY / clientHeight - 0.5) * -12; // max +-6 deg
    setMousePos({ x, y });
  };

  const handleScrollToProjects = () => {
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

  // Wireframe tunnel frames: 14 successive frames spaced from 0 to -3120px
  // Each frame spans 100% of the viewport (full-screen)
  const tunnelRings = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    zPos: -i * 240,
    label: `SEC_0${(i + 1).toString().padStart(2, '0')}`,
    depth: (i + 1) * 20,
  }));

  // Floating background space particles along the corridor
  const floatingParticles = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const radius = 280 + (i % 5) * 120;
    return {
      id: i,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.7,
      z: -i * 120,
      size: (i % 3) + 1.5,
    };
  });

  // Responsive offsets for project cards along the left and right tunnel walls
  const isMobile = dimensions.width < 768;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
  const sideOffset = isMobile 
    ? 0 
    : isTablet 
      ? Math.min(dimensions.width * 0.26, 280) 
      : Math.min(dimensions.width * 0.30, 520);

  // Floating project panels along the tunnel corridor walls
  const tunnelCards = [
    {
      project: PORTFOLIO_PROJECTS[0],
      z: -380,
      x: -sideOffset,
      y: -20,
      rotationY: isMobile ? 0 : 16,
      rotationZ: isMobile ? 0 : -1,
      accent: 'emerald',
    },
    {
      project: PORTFOLIO_PROJECTS[1],
      z: -880,
      x: sideOffset,
      y: 20,
      rotationY: isMobile ? 0 : -16,
      rotationZ: isMobile ? 0 : 1,
      accent: 'cyan',
    },
    {
      project: PORTFOLIO_PROJECTS[2],
      z: -1380,
      x: -sideOffset,
      y: 25,
      rotationY: isMobile ? 0 : 16,
      rotationZ: isMobile ? 0 : -1.5,
      accent: 'indigo',
    },
    {
      project: PORTFOLIO_PROJECTS[3],
      z: -1880,
      x: sideOffset,
      y: -25,
      rotationY: isMobile ? 0 : -16,
      rotationZ: isMobile ? 0 : 1,
      accent: 'amber',
    },
    {
      project: PORTFOLIO_PROJECTS[4],
      z: -2380,
      x: -sideOffset,
      y: 10,
      rotationY: isMobile ? 0 : 16,
      rotationZ: isMobile ? 0 : -1,
      accent: 'neutral',
    }
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="tunnel-section"
      className="relative w-full h-[380vh] bg-black text-white selection:bg-white selection:text-black"
    >
      {/* 
        Sticky Viewport: Takes 100% of the screen (100vw x 100dvh).
        Positioned with z-40 so it smoothly takes over the full screen edge-to-edge.
      */}
      <div 
        ref={viewportRef}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center select-none bg-black z-40"
      >
        
        {/* Deep Horizon Glow & Grid Ambient Canvas */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(25, 25, 30, 0.45) 0%, rgba(5, 5, 5, 0.95) 70%, #000000 100%)',
          }}
        />

        {/* 1. TOP HUD: Full-Screen Status Bar & Controls */}
        <motion.div 
          style={{ opacity: hudOpacity }}
          className="absolute top-6 left-6 right-6 md:left-12 md:right-12 z-50 flex justify-between items-center pointer-events-none text-neutral-400 font-mono text-[10px] uppercase tracking-[0.2em]"
        >
          {/* Left Title & Status Indicator */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <OpticalGlassPill>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-white font-bold">
                {language === 'pt' ? 'TÚNEL 3D • GALERIA EM ECRÃ INTEIRO' : '3D TUNNEL • FULLSCREEN GALLERY'}
              </span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="text-neutral-400 hidden sm:inline">
                {language === 'pt' ? 'SCROLL PARA AVANÇAR' : 'SCROLL TO EXPLORE'}
              </span>
            </OpticalGlassPill>
          </div>

          {/* Right Action Controls: Fullscreen toggle & direct jump */}
          <div className="flex items-center gap-3 pointer-events-auto">
            
            {/* Native Fullscreen API button */}
            <OpticalGlassButton
              onClick={toggleFullscreen}
              className="!px-3.5 !py-1.5 !text-[9px]"
              title={isFullscreen ? 'Exit fullscreen' : 'Full screen mode'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-neutral-300" />
                  <span className="hidden md:inline">{language === 'pt' ? 'Janela Normal' : 'Exit Fullscreen'}</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-neutral-300" />
                  <span className="hidden md:inline">{language === 'pt' ? 'Ecrã Inteiro' : 'Fullscreen'}</span>
                </>
              )}
            </OpticalGlassButton>

            {/* Quick jump to Portfolio Archive */}
            <OpticalGlassButton
              onClick={handleScrollToProjects}
              className="!px-3.5 !py-1.5 !text-[9px]"
            >
              <span className="hidden sm:inline">{language === 'pt' ? 'Ver Portfólio' : 'Portfolio'}</span>
              <ArrowDown className="w-3 h-3 text-neutral-300" />
            </OpticalGlassButton>

          </div>
        </motion.div>

        {/* 2. PERSPECTIVE 3D WORLD CONTAINER (Occupies 100% of the screen) */}
        <div 
          className="w-full h-full flex items-center justify-center relative overflow-hidden"
          style={{
            perspective: '1000px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* Parallax & Scroll-driven 3D Scene Root */}
          <motion.div
            style={{
              opacity: tunnelOpacity,
              transformStyle: 'preserve-3d',
              rotateX: mousePos.y * 0.35,
              rotateY: mousePos.x * 0.35,
            }}
            className="relative w-full h-full flex items-center justify-center will-change-transform"
          >
            
            {/* 3D Rail Lines & Longitudinal Corridor Surfaces */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
              
              {/* Vanishing Horizon Crosshair Center */}
              <div 
                className="absolute w-32 h-32 rounded-full border border-white/20 flex items-center justify-center pointer-events-none"
                style={{ transform: 'translateZ(-3000px)' }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white/60 animate-ping" />
                <div className="absolute w-48 h-[1px] bg-white/25" />
                <div className="absolute h-48 w-[1px] bg-white/25" />
                <span className="absolute -bottom-6 font-mono text-[9px] text-white/40 tracking-widest uppercase">
                  HORIZON // 0.00
                </span>
              </div>

              {/* INFINITE FLOOR PLANE: Extends from bottom screen edge (50vh) deep to horizon */}
              <div
                className="absolute w-[100vw] h-[3600px] pointer-events-none"
                style={{
                  top: '50%',
                  transform: 'translateY(50vh) rotateX(90deg) translateZ(0px)',
                  transformOrigin: 'top center',
                  backgroundImage: `
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
                    linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: '100px 180px',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
                }}
              />

              {/* INFINITE CEILING PLANE: Extends from top screen edge (-50vh) deep to horizon */}
              <div
                className="absolute w-[100vw] h-[3600px] pointer-events-none"
                style={{
                  top: '50%',
                  transform: 'translateY(-50vh) rotateX(-90deg) translateZ(0px)',
                  transformOrigin: 'bottom center',
                  backgroundImage: `
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.09) 1px, transparent 1px),
                    linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: '100px 180px',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)',
                }}
              />

              {/* INFINITE LEFT WALL PLANE: Extends from left screen edge (-50vw) deep to horizon */}
              <div
                className="absolute w-[3600px] h-[100vh] pointer-events-none"
                style={{
                  left: '50%',
                  transform: 'translateX(-50vw) rotateY(90deg) translateZ(0px)',
                  transformOrigin: 'left center',
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: '180px 100px',
                  maskImage: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)',
                }}
              />

              {/* INFINITE RIGHT WALL PLANE: Extends from right screen edge (50vw) deep to horizon */}
              <div
                className="absolute w-[3600px] h-[100vh] pointer-events-none"
                style={{
                  left: '50%',
                  transform: 'translateX(50vw) rotateY(-90deg) translateZ(0px)',
                  transformOrigin: 'right center',
                  backgroundImage: `
                    linear-gradient(to left, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: '180px 100px',
                  maskImage: 'linear-gradient(to left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)',
                }}
              />

              {/* Floating particles in 3D depth */}
              {floatingParticles.map((pt) => (
                <div
                  key={`pt-${pt.id}`}
                  className="absolute rounded-full bg-white/40 pointer-events-none"
                  style={{
                    width: `${pt.size}px`,
                    height: `${pt.size}px`,
                    transform: `translate3d(${pt.x}px, ${pt.y}px, ${pt.z}px)`,
                  }}
                />
              ))}

            </div>

            {/* 3. RECURSIVE 3D WIREFRAME FRAMES (Edge-to-edge full screen) */}
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
                className="absolute w-screen h-screen border border-white/10 flex items-center justify-center pointer-events-none"
              >
                {/* 4 Corner Crosshair Visual Markers on the screen edge */}
                <div className="absolute top-4 left-4 text-xs font-mono text-white/40">┌</div>
                <div className="absolute top-4 right-4 text-xs font-mono text-white/40">┐</div>
                <div className="absolute bottom-4 left-4 text-xs font-mono text-white/40">└</div>
                <div className="absolute bottom-4 right-4 text-xs font-mono text-white/40">┘</div>

                {/* Sub-frame internal guides */}
                <div className="absolute inset-8 sm:inset-14 border border-white/[0.04]" />

                {/* Technical ring coordinates */}
                <div className="absolute top-5 left-10 font-mono text-[8px] sm:text-[9px] tracking-widest text-neutral-500 uppercase">
                  {ring.label} // SECTOR {ring.depth}M
                </div>
                <div className="absolute bottom-5 right-10 font-mono text-[8px] sm:text-[9px] tracking-widest text-neutral-600 uppercase">
                  OPTICAL CORRIDOR // 2026
                </div>
              </motion.div>
            ))}

            {/* 4. FLOATING 3D PROJECT ART CARDS */}
            {tunnelCards.map((card) => (
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
                      // Fade in as it approaches from deep distance (-1600..-600)
                      if (curZ < -1600) return 0;
                      if (curZ < -600) return (curZ + 1600) / 1000;
                      // Peak visibility
                      if (curZ <= 180) return 1;
                      // Smoothly fade out as it flies behind camera
                      if (curZ <= 450) return 1 - (curZ - 180) / 270;
                      return 0;
                    }
                  ),
                  transformStyle: 'preserve-3d',
                }}
                className="absolute w-[86vw] sm:w-[420px] md:w-[460px] lg:w-[500px] optical-glass rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300 pointer-events-auto group cursor-pointer border border-white/15"
                onClick={() => handleCardClick(card.project)}
              >
                {/* Visual Header & Metadata */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-white/80 uppercase tracking-wider">
                    <span className="text-white font-bold">{card.project.number}</span>
                    <span className="text-white/30">//</span>
                    <span className="text-neutral-300">{card.project.category}</span>
                  </div>
                  <span className="font-mono text-[9px] text-neutral-300 optical-glass px-2.5 py-0.5 rounded-full border border-white/10">
                    {card.project.year}
                  </span>
                </div>

                {/* Card Artwork / Live Preview Banner */}
                <div className="w-full h-44 sm:h-52 rounded-xl bg-[#080808] border border-white/10 relative overflow-hidden mb-5 flex items-center justify-center">
                  
                  {card.project.image ? (
                    // Real imagery for project (Nipon Spa, SUE App, etc.)
                    <div className="relative w-full h-full overflow-hidden bg-neutral-900">
                      <img 
                        src={card.project.image} 
                        alt={card.project.title} 
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                        <div className="max-w-[70%]">
                          <span className="font-sans font-black text-lg uppercase tracking-tight text-white block truncate">
                            {card.project.title}
                          </span>
                          <span className="font-mono text-[9px] text-neutral-300 tracking-wider uppercase block truncate">
                            {card.project.subtitle}
                          </span>
                        </div>
                        {card.project.hasCaseStudy && (
                          <span className="font-mono text-[8px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                            CASE STUDY
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    // High-contrast typographic artwork core for other projects
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-neutral-900/60 to-black/80">
                      <div 
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
                          backgroundSize: '16px 16px',
                        }}
                      />
                      <div className="relative z-10 text-center flex flex-col items-center">
                        <span className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
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
                  )}

                </div>

                {/* Project Description Snippet */}
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-4 line-clamp-2">
                  {language === 'pt' ? card.project.descriptionPt : card.project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {card.project.tags.slice(0, 3).map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Link Footer */}
                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                  <span className="group-hover:text-white transition-colors font-medium">
                    {card.project.hasCaseStudy 
                      ? (language === 'pt' ? 'Ver Estudo de Caso' : 'View Case Study')
                      : (language === 'pt' ? 'Explorar Projeto' : 'Explore Project')
                    }
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all shadow-sm">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}

          </motion.div>
        </div>

        {/* 5. PAUSE STATE & DESTINATION PORTAL (End of Tunnel) */}
        <motion.div
          style={{
            opacity: ctaOpacity,
            scale: ctaScale,
            pointerEvents: ctaPointerEvents,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/85 backdrop-blur-xl p-6 text-center select-none"
        >
          {/* Geometric Portal Rings */}
          <div className="relative mb-8 flex items-center justify-center">
            <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-dashed border-white/20 animate-spin" style={{ animationDuration: '30s' }} />
            <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-white/30" />
            <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/50 flex items-center justify-center bg-white/[0.05]">
              <Layers className="w-7 h-7 text-white animate-pulse" />
            </div>
            
            {/* HUD Corner Ticks */}
            <div className="absolute -top-3 -left-3 font-mono text-[9px] text-white/50">SECTOR // 05</div>
            <div className="absolute -bottom-3 -right-3 font-mono text-[9px] text-white/50">DESTINATION LOCKED</div>
          </div>

          {/* Section Title */}
          <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
            {language === 'pt' ? 'Destino Alcançado' : 'Destination Reached'}
          </h3>

          <p className="text-neutral-300 font-light text-xs sm:text-sm max-w-md mb-8">
            {language === 'pt'
              ? 'Concluiu a travessia pelo túnel 3D. Explore agora o arquivo detalhado de todos os projetos de design de produto e sistemas digitais.'
              : 'You have completed the 3D tunnel corridor. Explore the detailed archive of product design and digital systems below.'
            }
          </p>

          {/* Core Interactive Action Button */}
          <OpticalGlassButton
            onClick={handleScrollToProjects}
            className="!px-8 !py-4 !text-xs sm:!text-sm !tracking-[0.15em] !rounded-full shadow-[0_0_50px_rgba(255,255,255,0.25)]"
          >
            <span>
              {language === 'pt' ? 'Entrar no Portfólio' : 'Enter Portfolio'}
            </span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </OpticalGlassButton>

          <span className="mt-4 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
            {language === 'pt' ? 'Ou continue o scroll para avançar' : 'Or continue scrolling to proceed'}
          </span>
        </motion.div>

      </div>
    </section>
  );
};
