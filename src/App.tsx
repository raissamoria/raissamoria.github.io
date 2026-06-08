/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, Sparkles, ArrowRight, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import KineticTypography from "./components/KineticTypography";
import Marquee from "./components/Marquee";

const projects = [
  {
    id: 1,
    title: "Creative Code",
    subtitle: "Kinetic Typography & Shaders",
    description: "An exploration of motion and typography using custom canvas scripts and shaders to create organic, interactive text behaviors.",
    category: "Development",
    year: "2024",
    link: "https://raissamoria.github.io/project4.html",
    accent: "from-blue-50 to-indigo-50/40 text-blue-600"
  },
  {
    id: 2,
    title: "SUE App",
    subtitle: "Emigration Support Platform",
    description: "End-to-end UX/UI design for a mobile application dedicated to simplifying international relocating processes and emotional support.",
    category: "Product Design",
    year: "2023",
    link: "https://raissamoria.github.io/project2.html",
    accent: "from-emerald-50 to-teal-50/40 text-emerald-600"
  },
  {
    id: 3,
    title: "Amarelo C4ralho",
    subtitle: "Expressive Motion Design",
    description: "A fast-paced audio-visual motion design study examining high-impact typography pairings and rhythmic video editing.",
    category: "Motion Design",
    year: "2023",
    link: "https://raissamoria.github.io/project3.html",
    accent: "from-amber-50 to-orange-50/40 text-amber-600"
  },
  {
    id: 4,
    title: "Two Points",
    subtitle: "Parametric Typography System",
    description: "A modular typographic design system built around architectural grid geometry and responsive vector anchors.",
    category: "Visual Identity",
    year: "2022",
    link: "https://raissamoria.github.io/project1.html",
    accent: "from-rose-50 to-purple-50/40 text-rose-600"
  }
];

export default function App() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Lisbon",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }).format(now);
      
      setTime(formattedTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] selection:bg-[#111111] selection:text-[#FAFAFA] font-sans antialiased">
      
      {/* 1. Header/Navigation: Extremely clean, modern, and high-design header */}
      <header className="sticky top-0 z-50 w-full bg-white/75 backdrop-blur-xl border-b border-neutral-100 px-6 md:px-12 py-4">
        <div className="max-w-[1720px] mx-auto flex justify-between items-center">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-2">
            <span className="font-sans font-black text-sm tracking-[-0.03em] uppercase">RAISSA MORIÁ</span>
            <div className="w-1.5 h-1.5 rounded-full bg-black" />
            <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium hidden sm:inline">Portfolio</span>
          </div>

          {/* Clean minimal navigation links */}
          <nav className="flex items-center gap-8 md:gap-10 text-[11px] tracking-[0.15em] font-bold text-neutral-500 uppercase">
            <a href="#portfolio" className="hover:text-black transition-colors">Portfólio</a>
            <a href="#sobre" className="hover:text-black transition-colors">Sobre</a>
            <a href="#contacto" className="hover:text-black transition-colors">Contacto</a>
          </nav>

          {/* Time & Quick Direct Email */}
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-neutral-400 font-mono font-medium hidden md:inline">
              {time || "JUN 03, 12:44:00 PM"}
            </span>
            <a 
              href="mailto:raissagfdhb@gmail.com" 
              className="bg-neutral-900 border border-neutral-900 hover:bg-transparent hover:text-black text-white px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all shadow-xs"
            >
              Falar →
            </a>
          </div>

        </div>
      </header>

      {/* Massive Interactive Morphing Headliner Hero Playground */}
      <section className="bg-white border-b border-neutral-100 py-12 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-visible select-none">
        <div className="max-w-[1720px] mx-auto w-full flex flex-col items-center justify-center text-center gap-6">
          <div className="w-full flex justify-center overflow-visible">
            <KineticTypography 
              text="MORIÁ" 
              className="text-[24vw] sm:text-[22vw] md:text-[20vw] lg:text-[18vw] xl:text-[16vw] font-black leading-[0.8] tracking-tighter" 
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center gap-2.5 bg-neutral-50 px-5 py-2.5 rounded-full border border-neutral-100 text-neutral-500 font-mono text-[9px] md:text-xs tracking-[0.15em] font-bold mt-2 shadow-xs"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span>MOVA O CURSOR E DIVIRTA-SE COM AS LETRAS ↓</span>
          </motion.div>
        </div>
      </section>

      {/* 2. Expanded Minimal Layout: Generous spacing, beautiful columns without harsh grid lines */}
      <main id="inicio" className="max-w-[1720px] mx-auto px-6 md:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
        
        {/* ==================== LEFT COLUMN: Pure Aesthetic Presentation ==================== */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-12 lg:sticky lg:top-[100px] lg:h-[calc(100vh-160px)]">
          
          <div className="flex flex-col gap-6">
            {/* Soft decorative badge */}
            <div className="inline-flex items-center gap-2 self-start bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
              <Sparkles size={10} className="text-neutral-500" />
              <span>UX/UI & Multimédia</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-neutral-900">
              CRIAR <br />
              SISTEMAS <br />
              <span className="text-[#666666]">LIVRES.</span>
            </h2>
            
            <p className="text-neutral-500 text-sm md:text-base font-light leading-relaxed max-w-sm">
              Especializada no design de produtos digitais sofisticados, design interativo, tipografia experimental e layouts limpos voltados para usabilidade máxima.
            </p>
          </div>

          {/* Social connections in lists */}
          <div className="flex flex-col gap-5 pt-8 border-t border-neutral-100">
            <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-black">Ligações Rápidas</span>
            <div className="flex flex-col gap-2">
              <a 
                href="https://github.com/raissamoria" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-3.5 bg-white border border-neutral-100 hover:border-neutral-300 rounded-xl transition-all text-xs font-bold text-neutral-700"
              >
                <span>Github</span>
                <span className="font-mono text-[9px] text-neutral-400">github.com/raissamoria</span>
              </a>
              <a 
                href="https://linkedin.com/in/raissamoria" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-3.5 bg-white border border-neutral-100 hover:border-neutral-300 rounded-xl transition-all text-xs font-bold text-neutral-700"
              >
                <span>LinkedIn</span>
                <span className="font-mono text-[9px] text-neutral-400 font-medium">linkedin.com/in/raissamoria</span>
              </a>
            </div>
          </div>

          {/* Minimal capsule with availability info */}
          <div className="flex items-center gap-2.5 text-[9px] text-neutral-400 uppercase tracking-widest font-bold pt-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Disponível para novos projetos</span>
          </div>

        </div>

        {/* ==================== MIDDLE/RIGHT COLUMN (MAIN FEED): Large scrolling container with cards */}
        <div id="portfolio" className="lg:col-span-8 flex flex-col gap-12 md:gap-16">
          
          {/* Large elegant intro text block */}
          <div className="bg-white border border-neutral-100/75 p-6 md:p-10 rounded-2xl">
            <p className="text-[#111111] text-xl md:text-2xl font-light leading-relaxed tracking-tight">
              A <span className="font-black">Designer de Experiência e Multimédia</span> sediada entre Porto e Lisboa. Foco constante no minimalismo funcional, clareza sistemática de informação, e interatividade pura.
            </p>
          </div>

          {/* Works segment header */}
          <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mt-4">
            <h3 className="text-xs uppercase tracking-widest font-black text-neutral-400">Trabalhos Selecionados</h3>
            <span className="text-[10px] font-mono text-neutral-400 font-bold">({projects.length} PROJETOS)</span>
          </div>

          {/* Beautifully clean showcase with pure white cards and clean typography */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-xl hover:shadow-black/[0.02] rounded-2xl p-6 transition-all duration-300"
              >
                {/* Visual sandbox container for project aesthetics */}
                <div className={`w-full h-48 rounded-xl bg-gradient-to-br ${project.accent} relative overflow-hidden flex items-center justify-center border border-neutral-100 mb-6 transition-transform group-hover:scale-[1.01]`}>
                  <div className="absolute top-4 left-4 text-[9px] font-mono font-bold text-neutral-400 bg-white/80 px-2 py-0.5 rounded-full border border-neutral-200/50">
                    Nº 0{project.id}
                  </div>
                  
                  <div className="absolute bottom-4 right-4 text-[10px] font-bold text-neutral-500 bg-white/80 px-2 py-0.5 rounded-full border border-neutral-200/50">
                    {project.year}
                  </div>

                  <span className="text-xl font-sans font-black uppercase tracking-tight text-neutral-800 text-center max-w-[180px] leading-tight select-none">
                    {project.title}
                  </span>
                </div>

                {/* Highly readable text details */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-[#B5B5B5] font-extrabold">{project.category}</span>
                  </div>
                  
                  <h4 className="text-lg font-black uppercase tracking-tight text-neutral-900 mt-1">
                    {project.title}
                  </h4>
                  
                  <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    {project.subtitle}
                  </p>

                  <p className="text-xs text-neutral-500 leading-relaxed font-light mb-4">
                    {project.description}
                  </p>

                  <div className="border-t border-neutral-50 pt-3 mt-auto flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                    <span className="text-neutral-400">Explore</span>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 text-neutral-900 hover:text-black transition-colors border-b border-black pb-0.5"
                    >
                      raissamoria.github.io <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </main>

      {/* 3. Sleek, large full-width profile card layout to explain biography */}
      <section id="sobre" className="border-t border-b border-neutral-100 bg-white py-24 px-6 md:px-12 xl:px-16">
        <div className="max-w-[1720px] mx-auto flex flex-col gap-12">
          
          {/* Header of Section */}
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 self-start bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
              <span>02 / BIOGRAFIA & TRAJETÓRIA</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 leading-none">
              Quem está por trás do código.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Large High-Design Portrait & Contact Card */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-[100px]">
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-100 p-2.5 bg-neutral-50 shadow-sm hover:shadow-md transition-shadow group">
                <img 
                  src="/src/assets/images/WhatsApp Image 2026-06-03 at 13.15.20.jpeg" 
                  alt="Raíssa Moriá portrait photograph" 
                  className="w-full h-full object-cover rounded-xl transition-all duration-700 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col gap-4 px-2">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-neutral-900">Raíssa Moriá</h3>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold font-mono mt-1">UX/UI & Multimedia Designer</p>
                </div>
                
                <div className="flex flex-col gap-1.5 text-xs text-neutral-500 pt-2 border-t border-neutral-100 font-mono">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">TEL:</span>
                    <a href="tel:+351935360284" className="text-neutral-800 hover:text-black font-bold">+351 935 360 284</a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">LOCAL:</span>
                    <span className="text-neutral-800 font-bold">Lisboa & Porto, PT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">EMAIL:</span>
                    <a href="mailto:raissagfdhb@gmail.com" className="text-neutral-800 hover:text-black font-bold">raissagfdhb@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Biografia, Educação, Competências & Linha do Tempo */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              
              {/* Biografia text block */}
              <div className="flex flex-col gap-4 text-neutral-600 text-sm md:text-base font-light leading-relaxed">
                <p className="text-lg md:text-xl text-neutral-800 font-neutral leading-relaxed tracking-tight">
                  O meu compromisso definitivo é simplificar a interação humana com sistemas digitais, eliminando ruídos ornamentais inúteis e privilegiando proporções precisas, legibilidade máxima e harmonia tipográfica absoluta.
                </p>
                <p>
                  Trabalho a partir de Lisboa e Porto combinando rigor metodológico em UX com codificação multimedia criativa. Desenvolvo sistemas limpos de fácil compreensão estética em colaboração com marcas globais, marcas inovadoras e equipes multidisciplinares.
                </p>
              </div>

              {/* Educação e Competências */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-100">
                
                {/* Educação */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs uppercase tracking-widest font-black text-neutral-400">Educação</h4>
                  <div className="flex flex-col gap-4">
                    <div>
                      <h5 className="text-xs font-mono font-bold text-neutral-800">Licenciatura em Design Gráfico e Multimédia</h5>
                      <p className="text-xs text-neutral-500">ESAD, Caldas da Rainha • 2021 – 2024</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-mono font-bold text-neutral-800">Curso de Fotografia Profissional</h5>
                      <p className="text-xs text-neutral-500">Escola Profissional Magestil, Lisboa • 2013 – 2016</p>
                    </div>
                  </div>
                </div>

                {/* Competências */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs uppercase tracking-widest font-black text-neutral-400">Competências Técnicas</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {["Figma", "Webflow", "HTML/CSS", "JavaScript", "After Effects", "Cinema 4D", "Blender", "Premiere Pro", "Photoshop", "Illustrator", "Design Thinking", "User Flows", "Prototipagem"].map((skill) => (
                      <span key={skill} className="bg-neutral-50 hover:bg-neutral-100 transition-colors border border-neutral-100 text-[10px] text-neutral-600 font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Experiência Profissionais */}
              <div className="flex flex-col gap-6 pt-8 border-t border-neutral-100">
                <h4 className="text-xs uppercase tracking-widest font-black text-neutral-400">Experiência Profissional</h4>
                
                <div className="flex flex-col gap-8">
                  
                  {/* Experience item 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                    <div className="sm:col-span-4 font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
                      Dez 2025 — Presente
                    </div>
                    <div className="sm:col-span-8 flex flex-col gap-2">
                      <h5 className="text-sm font-black uppercase text-neutral-900 tracking-tight">
                        UX/UI Designer — VOQIN’ (futureLabs)
                      </h5>
                      <p className="text-xs text-neutral-500 leading-relaxed font-light">
                        Liderança de processos de Design Thinking, UX e UI para a criação de plataformas digitais de suporte corporativo internas e aceleração de fluxos de eventos. Desenvolvimento de websites interativos na rede Cvent, organizando jornadas de usuário e fluxos comunicacionais eficazes.
                      </p>
                    </div>
                  </div>

                  {/* Experience item 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                    <div className="sm:col-span-4 font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
                      Abr 2025
                    </div>
                    <div className="sm:col-span-8 flex flex-col gap-2">
                      <h5 className="text-sm font-black uppercase text-neutral-900 tracking-tight">
                        Photography Coordinator — SEEDS (Islândia)
                      </h5>
                      <p className="text-xs text-neutral-500 leading-relaxed font-light">
                        Coordenação de workshops de fotografia e audiovisual para voluntários internacionais. Gestão e polimento de presença digital através da concepção de layouts no Figma e animações em vídeo.
                      </p>
                    </div>
                  </div>

                  {/* Experience item 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                    <div className="sm:col-span-4 font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
                      2023 — 2024
                    </div>
                    <div className="sm:col-span-8 flex flex-col gap-2">
                      <h5 className="text-sm font-black uppercase text-neutral-900 tracking-tight">
                        Video Editor — Six Seconds (Califórnia)
                      </h5>
                      <p className="text-xs text-neutral-500 leading-relaxed font-light">
                        Edição e finalização de vídeos educativos e de marketing promocional voltados para campanhas de redes sociais, atuando em forte sinergia com equipes de criação globais.
                      </p>
                    </div>
                  </div>

                  {/* Experience item 4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                    <div className="sm:col-span-4 font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
                      2022 — 2024
                    </div>
                    <div className="sm:col-span-8 flex flex-col gap-2">
                      <h5 className="text-sm font-black uppercase text-neutral-900 tracking-tight">
                        Multimedia Volunteer — ESAD (Portugal)
                      </h5>
                      <p className="text-xs text-neutral-500 leading-relaxed font-light">
                        Apoio ao laboratório audiovisual de design gráfico e multimédia, auxiliando na execução prática de instalações interativas, fotografia experimental e edição de motion graphics.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Clean elegant spacing marquee */}
      <div className="w-full py-3 bg-white border-b border-neutral-100">
        <Marquee text="• WORK INQUIRIES • VAMOS COLABORAR • RAISSA MORIÁ ATELIER • LISBON & PORTO •" speed={16} />
      </div>

      {/* 4. Contact Footer with generous neutral dark theme */}
      <footer id="contacto" className="bg-[#0A0A0A] text-white py-24 px-6 md:px-12 xl:px-16">
        <div className="max-w-[1720px] mx-auto flex flex-col gap-16">
          
          <div className="flex flex-col gap-4">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">03 / CONTACTO DIRECTO</span>
            <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tight leading-none text-neutral-200">
              Inicie uma <br />
              <span className="text-neutral-500">nova conversa</span>.
            </h2>
          </div>

          <div>
            <a 
              href="mailto:raissagfdhb@gmail.com" 
              className="text-2xl md:text-5xl font-mono text-neutral-200 hover:text-white transition-colors inline-block break-all border-b border-white/10 pb-2 hover:border-white"
            >
              raissagfdhb@gmail.com
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-16 border-t border-white/10 text-xs text-neutral-400 font-medium">
            <div>
              <p className="opacity-40 uppercase tracking-widest mb-1.5 text-[10px] font-mono">LOCALIZAÇÃO ATUAL</p>
              <p className="text-neutral-200 text-sm">Portugal • Lisboa & Porto</p>
            </div>
            <div>
              <p className="opacity-40 uppercase tracking-widest mb-1.5 text-[10px] font-mono">ESPECIALIZAÇÕES</p>
              <p className="text-neutral-200 text-sm">UX/UI, Design Multimédia, Motion, Interactive Code</p>
            </div>
            <div className="flex flex-col md:items-end justify-end">
              <p className="text-[10px] tracking-widest uppercase opacity-30 font-mono">
                © 2026 Raissa Moriá • ALL RIGHTS RESERVED
              </p>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
