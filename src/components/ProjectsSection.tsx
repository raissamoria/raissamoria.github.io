import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';
import { PORTFOLIO_PROJECTS } from './GalleryTunnel';
import { OpticalGlassPill } from './OpticalGlass';

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
    { id: 'Service Design', labelPt: 'Service Design', labelEn: 'Service Design' },
    { id: 'Creative Dev', labelPt: 'Desenvolvimento', labelEn: 'Creative Dev' },
    { id: 'Product Design', labelPt: 'Design de Produto', labelEn: 'Product Design' },
    { id: 'Motion Design', labelPt: 'Motion Design', labelEn: 'Motion Design' },
    { id: 'Visual Identity', labelPt: 'Identidade Visual', labelEn: 'Visual Identity' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => 
        p.category === selectedCategory || 
        (selectedCategory === 'UX/UI & Web' && (p.category.includes('UX/UI') || p.category.includes('Mobile') || p.category.includes('Service'))) ||
        (selectedCategory === 'Product Design' && (p.category.includes('Product') || p.category.includes('Mobile') || p.category.includes('Service'))) ||
        (selectedCategory === 'Service Design' && (p.category.includes('Service') || p.category.includes('UX/UI') || p.category.includes('Mobile')))
      );

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

          {/* Category Filter Pills (Optical Glass System) */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <OpticalGlassPill
                  key={cat.id}
                  active={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="!px-4 !py-2 cursor-pointer"
                >
                  {language === 'pt' ? cat.labelPt : cat.labelEn}
                </OpticalGlassPill>
              );
            })}
          </div>
        </div>

        {/* Projects Grid: Pure Minimalist Visuals (Only Image + Title Underneath) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => handleProjectClick(project)}
                  className="group flex flex-col gap-4 cursor-pointer"
                >
                  {/* 1. Only Project Image */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 group-hover:border-neutral-500 transition-all duration-500 shadow-lg group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-600 font-mono text-sm">
                        {project.title}
                      </div>
                    )}
                  </div>

                  {/* 2. Underneath: Project Name */}
                  <div className="flex items-center justify-between px-1">
                    <h3 className="font-sans font-bold text-xl sm:text-2xl uppercase tracking-tight text-white group-hover:text-neutral-300 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Minimalist Status / Next Section Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-neutral-800 pt-8 text-xs font-mono text-neutral-500 uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-neutral-300">
              {language === 'pt' ? 'Nipon Spa, SUE Mobile App, Plataforma de Helpdesk e novos projetos' : 'Nipon Spa, SUE Mobile App, Helpdesk Platform & live platforms'}
            </span>
          </div>

          <a 
            href="#sobre" 
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <span>{language === 'pt' ? 'Avançar para Sobre Mim' : 'Proceed to About'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
