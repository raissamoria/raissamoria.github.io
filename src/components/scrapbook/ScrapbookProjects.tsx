import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../../types';
import { PORTFOLIO_PROJECTS } from '../GalleryTunnel';
import { MagazineFeaturedHeader } from './MagazineHeading';
import { TapePiece } from './TapePiece';
import { SunRaysDoodle } from './DoodleAccents';

interface ScrapbookProjectsProps {
  language: 'pt' | 'en';
  onSelectProject: (slug: string) => void;
}

export const ScrapbookProjects: React.FC<ScrapbookProjectsProps> = ({
  language,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelPt: 'Todos', labelEn: 'All' },
    { id: 'UX/UI & Web', labelPt: 'UX/UI & Web', labelEn: 'UX/UI & Web' },
    { id: 'Mobile UX/UI', labelPt: 'Mobile App', labelEn: 'Mobile App' },
    { id: 'UX/UI & Product', labelPt: 'Design de Produto', labelEn: 'Product Design' },
    { id: 'Creative Dev', labelPt: 'Creative Dev', labelEn: 'Creative Dev' },
    { id: 'Motion Design', labelPt: 'Motion Design', labelEn: 'Motion Design' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => 
        p.category === selectedCategory ||
        (selectedCategory === 'UX/UI & Web' && p.category.includes('UX/UI')) ||
        (selectedCategory === 'Mobile UX/UI' && p.category.includes('Mobile')) ||
        (selectedCategory === 'UX/UI & Product' && (p.category.includes('Product') || p.category.includes('Helpdesk')))
      );

  const handleProjectClick = (project: ProjectItem) => {
    if (project.hasCaseStudy && project.slug) {
      onSelectProject(project.slug);
    } else if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  return (
    <section id="projetos" className="relative w-full py-20 px-4 sm:px-8 md:px-12 select-none">
      
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        
        {/* ============================================================== */}
        {/* SECTION HEADER: MAGAZINE CUTOUT + YELLOW TAPE LINK */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <MagazineFeaturedHeader language={language} />
              <SunRaysDoodle className="w-8 h-6" color="#E8AF30" />
            </div>

            <p className="font-handwriting text-xl sm:text-2xl text-[#F2EBD9] opacity-90 max-w-xl">
              {language === 'pt' 
                ? 'Casos de estudo reais, produtos digitais e experiências criadas com propósito.' 
                : 'Real case studies, digital products and experiences created with purpose.'}
            </p>
          </div>

          {/* Yellow Tape Link "ver todos os projetos →" */}
          <a
            href="#todos-projetos"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory('all');
            }}
            style={{ transform: 'rotate(1deg)' }}
            className="group relative px-5 py-2 bg-[#E8AF30] text-[#1A1A1A] paper-shadow rounded-[2px] font-display text-lg sm:text-xl tracking-wider transition-all hover:scale-105 hover:-rotate-1 active:scale-95 cursor-pointer flex items-center gap-2 border border-amber-900/20"
          >
            <TapePiece className="-top-2 left-3" rotate={-8} width="w-8" height="h-3.5" variant="cream" />
            <span>{language === 'pt' ? 'ver todos os projetos' : 'view all projects'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

        </div>

        {/* ============================================================== */}
        {/* CATEGORY FILTER TAGS (PAPER LABELS) */}
        {/* ============================================================== */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <span className="font-typewriter text-xs text-[#F2EBD9]/80 mr-1">
            {language === 'pt' ? 'filtrar por:' : 'filter by:'}
          </span>
          {categories.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;
            const rotations = [-1.5, 1.2, -0.8, 1.5, -1, 0.8];
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{ transform: `rotate(${rotations[idx % rotations.length]}deg)` }}
                className={`relative px-3.5 py-1 text-xs sm:text-sm font-typewriter rounded-[2px] paper-shadow transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#E8AF30] text-[#1A1A1A] font-bold scale-105 shadow-md border border-amber-800/30'
                    : 'bg-[#F2EBD9] text-[#1A1A1A] hover:bg-[#F8F6F0] hover:-translate-y-0.5 border border-black/10'
                }`}
              >
                {isSelected && (
                  <TapePiece className="-top-1.5 left-2" rotate={-6} width="w-5" height="h-2.5" variant="cream" />
                )}
                {language === 'pt' ? cat.labelPt : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* PROJECTS SCRAPBOOK MASONRY / GRID */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const cardRotations = [-1.2, 1.5, -0.8, 1.2, -1.5, 0.9];
              const cardRot = cardRotations[idx % cardRotations.length];
              const tapeVariants: ('cream' | 'yellow' | 'green' | 'blue')[] = ['cream', 'yellow', 'green', 'cream', 'yellow', 'green'];
              const tapeVar = tapeVariants[idx % tapeVariants.length];

              return (
                <motion.div
                  key={`project-card-${project.id}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  style={{ transform: `rotate(${cardRot}deg)` }}
                  onClick={() => handleProjectClick(project)}
                  className="group relative bg-[#F8F6F0] p-3 sm:p-4 pb-14 paper-shadow-lg torn-paper-card transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 hover:rotate-0 cursor-pointer"
                >
                  {/* Washi tape on top edge */}
                  <TapePiece
                    variant={tapeVar}
                    className="-top-3 left-1/2 -translate-x-1/2"
                    rotate={idx % 2 === 0 ? -4 : 5}
                    width="w-16"
                    height="h-5"
                  />

                  {/* Project Image Frame (Torn paper / polaroid style) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-neutral-900 mb-4 border border-black/10">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#073859] flex items-center justify-center p-6 text-center font-display text-2xl text-[#F8F6F0]">
                        {project.title}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Case study badge if available */}
                    {project.hasCaseStudy && (
                      <div className="absolute top-2.5 right-2.5">
                        <span 
                          style={{ transform: 'rotate(2deg)' }}
                          className="px-2.5 py-0.5 bg-[#E8AF30] text-[#1A1A1A] font-typewriter text-[10px] font-bold rounded-[1px] paper-shadow uppercase tracking-wider block"
                        >
                          {language === 'pt' ? 'Estudo de Caso' : 'Case Study'}
                        </span>
                      </div>
                    )}

                    {/* Year stamp */}
                    <div className="absolute bottom-2 left-2.5">
                      <span className="font-typewriter text-[10px] text-white/90 drop-shadow-md">
                        {project.year} • {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Info & Description */}
                  <div className="flex flex-col gap-1.5 px-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-2xl sm:text-3xl text-[#1A1A1A] tracking-wide leading-none group-hover:text-[#073859] transition-colors">
                        {project.title}
                      </h3>
                      <div className="w-6 h-6 rounded-full bg-[#073859] text-white flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <p className="font-sans text-xs text-[#073859]/80 font-medium line-clamp-1">
                      {project.subtitle}
                    </p>

                    <p className="font-sans text-xs text-neutral-600 line-clamp-2 pt-1 leading-relaxed">
                      {language === 'pt' ? project.descriptionPt : project.description}
                    </p>
                  </div>

                  {/* BOTTOM PAPER LABEL BADGE: shifts slightly on hover as requested! */}
                  <div 
                    style={{ transform: 'rotate(-2deg)' }}
                    className="absolute -bottom-3 left-4 sm:left-6 px-4 py-1.5 bg-[#F2EBD9] text-[#1A1A1A] paper-shadow font-typewriter text-xs font-bold rounded-[2px] border border-black/15 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-[#E8AF30]"
                  >
                    <TapePiece className="-top-1.5 right-2" rotate={12} width="w-6" height="h-2.5" variant="cream" />
                    <span>{project.title}</span>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
};
