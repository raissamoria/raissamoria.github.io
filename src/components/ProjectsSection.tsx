import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'motion/react';
import { ArrowUpRight, ExternalLink, Sparkles, Layers, Eye } from 'lucide-react';
import { ProjectItem } from '../types';
import { PORTFOLIO_PROJECTS } from './GalleryTunnel';

interface ProjectsSectionProps {
  language: 'pt' | 'en';
  onSelectProject?: (slug: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  language,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Smooth cursor follow for project floating hover preview
  const springX = useSpring(0, { stiffness: 180, damping: 20 });
  const springY = useSpring(0, { stiffness: 180, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    springX.set(x);
    springY.set(y);
    setMousePos({ x, y });
  };

  const categories = [
    { id: 'all', labelPt: 'Todos', labelEn: 'All Works' },
    { id: 'UX/UI & Web', labelPt: 'UX/UI & Web', labelEn: 'UX/UI & Web' },
    { id: 'Creative Dev', labelPt: 'Desenvolvimento', labelEn: 'Creative Dev' },
    { id: 'Product Design', labelPt: 'Design de Produto', labelEn: 'Product Design' },
    { id: 'Motion Design', labelPt: 'Motion Design', labelEn: 'Motion Design' },
    { id: 'Visual Identity', labelPt: 'Identidade Visual', labelEn: 'Visual Identity' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory || (selectedCategory === 'UX/UI & Web' && p.category.includes('UX/UI')));

  const handleProjectClick = (project: ProjectItem) => {
    if (project.hasCaseStudy && project.slug && onSelectProject) {
      onSelectProject(project.slug);
    } else if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="portfolio-grid-section" 
      className="relative w-full bg-[#050505] text-white py-24 px-6 md:px-12 xl:px-16 border-t border-neutral-900 selection:bg-white selection:text-black overflow-hidden"
    >
      {/* Dynamic Floating Cursor Image Preview (Contrasting full color against dark portfolio) */}
      <AnimatePresence>
        {hoveredProject && hoveredProject.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotate: 2 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              left: springX,
              top: springY,
              transform: 'translate(-50%, -50%)',
            }}
            className="pointer-events-none absolute z-40 hidden lg:block w-[420px] rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-neutral-950 backdrop-blur-xl"
          >
            <div className="bg-black/80 px-3.5 py-2 border-b border-white/10 flex items-center justify-between font-mono text-[10px] text-neutral-300">
              <span className="text-white font-bold">{hoveredProject.number} // {hoveredProject.title}</span>
              <span className="text-neutral-500">{hoveredProject.year}</span>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
              <img 
                src={hoveredProject.image} 
                alt={hoveredProject.title}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
                <span className="text-xs font-mono font-bold tracking-wider uppercase">
                  {hoveredProject.hasCaseStudy 
                    ? (language === 'pt' ? 'Clique para ver estudo de caso' : 'Click to view case study')
                    : hoveredProject.subtitle
                  }
                </span>
                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1720px] mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Section Header with Minimalist Monochrome Hierarchy */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-neutral-800 pb-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>01 / {language === 'pt' ? 'PROJETOS & TRABALHOS SELECIONADOS' : 'SELECTED WORKS ARCHIVE'}</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              {language === 'pt' ? (
                <>
                  Trabalhos Selecionados & <br />
                  <span className="text-neutral-500">Design de Produto.</span>
                </>
              ) : (
                <>
                  Selected Works & <br />
                  <span className="text-neutral-500">Product Design.</span>
                </>
              )}
            </h2>
          </div>

          {/* Category Filter Pills (Monochrome Style) */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-white text-black font-bold border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                      : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {language === 'pt' ? cat.labelPt : cat.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid: Editorial High-Contrast Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isNipon = project.slug === 'nipon-spa';

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => handleProjectClick(project)}
                  className={`group flex flex-col bg-neutral-950 border ${
                    isNipon 
                      ? 'border-neutral-700 hover:border-white shadow-[0_0_30px_rgba(255,255,255,0.05)]' 
                      : 'border-neutral-800 hover:border-neutral-500'
                  } rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_15px_50px_rgba(0,0,0,0.85)] relative cursor-pointer`}
                >
                  {/* Top Index Number & Featured Pill */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-xs font-black text-neutral-400 group-hover:text-white transition-colors">
                      {project.number}
                    </span>
                    {project.hasCaseStudy && (
                      <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {language === 'pt' ? 'Estudo de Caso' : 'Case Study'}
                      </span>
                    )}
                  </div>

                  {/* Visual Project Cover Canvas: Original Colors for real projects vs monochromatic canvas for code */}
                  <div className="w-full h-64 sm:h-72 rounded-xl bg-neutral-900 border border-neutral-800 relative overflow-hidden flex flex-col justify-between p-6 mb-6 transition-all group-hover:border-neutral-600">
                    
                    {project.image ? (
                      /* Real Project Image with Authentic Colors */
                      <div className="absolute inset-0 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>
                    ) : (
                      /* Monochromatic Abstract Grid Background */
                      <div 
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
                          backgroundSize: '24px 24px',
                        }}
                      />
                    )}

                    {/* Corner Coordinates & Year */}
                    <div className="relative z-10 flex justify-between items-center">
                      <span className="font-mono text-[9px] font-bold text-neutral-300 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-800">
                        {project.category}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-300 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-800">
                        {project.year}
                      </span>
                    </div>

                    {/* Center Display Typography */}
                    <div className="relative z-10 flex flex-col items-center text-center my-auto py-4">
                      <h3 className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-white group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
                        {project.title}
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-300 mt-1 drop-shadow-sm">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Bottom Metrics / Quick Info */}
                    <div className="relative z-10 flex items-center justify-between font-mono text-[9px] text-neutral-300 border-t border-white/10 pt-3">
                      <span>{project.metrics}</span>
                      <span className="text-white/60 font-bold uppercase">{project.year}</span>
                    </div>
                  </div>

                  {/* Clean Editorial Roles / Disciplines Listing (Exactly matching request) */}
                  <div className="flex flex-col gap-4 flex-grow">
                    
                    {project.roles && project.roles.length > 0 && (
                      <div className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-bold">
                        {project.roles.map((role) => (
                          <span key={role} className="text-neutral-300">
                            {role}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Subtle tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="bg-neutral-900 text-neutral-400 border border-neutral-800/80 text-[9px] font-mono uppercase px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Action Section */}
                    <div className="border-t border-neutral-800/80 pt-5 mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          {project.year}
                        </span>
                        {project.hasCaseStudy && (
                          <span className="text-neutral-500 font-mono text-[10px]">
                            {language === 'pt' ? '• Abrir Apresentação' : '• Open Presentation'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project);
                          }}
                          className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm group-hover:scale-105 cursor-pointer"
                        >
                          <span>{project.hasCaseStudy ? (language === 'pt' ? 'Explorar' : 'Explore') : (language === 'pt' ? 'Ver' : 'View')}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Minimalist Status / Next Section Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-neutral-800 pt-8 text-xs font-mono text-neutral-500 uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-neutral-300">
              {language === 'pt' ? 'Nipon Spa e novas plataformas em destaque' : 'Nipon Spa & featured live digital platforms'}
            </span>
          </div>

          <a 
            href="#sobre" 
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <span>{language === 'pt' ? 'Avançar para Sobre Mim' : 'Proceed to About'}</span>
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
};
