/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, Sparkles, ArrowRight, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { MoriaHero } from "./components/MoriaHero";
import { GalleryTunnel } from "./components/GalleryTunnel";
import { ProjectsSection } from "./components/ProjectsSection";
import { NiponSpaProject } from "./components/NiponSpaProject";
import Marquee from "./components/Marquee";
import CustomCursor from "./components/CustomCursor";
// @ts-ignore
import profilePic from "./assets/images/WhatsApp Image 2026-06-03 at 13.15.20.jpeg";

export default function App() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [time, setTime] = useState("");
  const [currentProject, setCurrentProject] = useState<string | null>(null);

  // Hash-based navigation and back-button synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#projects/nipon-spa' || hash === '#nipon-spa') {
        setCurrentProject('nipon-spa');
      } else if (!hash.startsWith('#projects/')) {
        setCurrentProject(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenProject = (slug: string) => {
    setCurrentProject(slug);
    window.location.hash = `projects/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    setCurrentProject(null);
    window.location.hash = 'portfolio-grid-section';
    const el = document.getElementById('portfolio-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = new Intl.DateTimeFormat(language === 'pt' ? 'pt-PT' : 'en-US', {
        timeZone: "Europe/Lisbon",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      
      setTime(formattedTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  // If viewing a detailed project case study
  if (currentProject === 'nipon-spa') {
    return (
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans antialiased">
        <CustomCursor />
        <NiponSpaProject language={language} onBack={handleBackToPortfolio} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans antialiased">
      <CustomCursor />
      
      {/* 1. Header/Navigation: Ultra-minimal dark navigation bar */}
      <header className="sticky top-0 z-50 w-full bg-black/85 backdrop-blur-xl border-b border-neutral-900 px-6 md:px-12 py-4 text-white">
        <div className="max-w-[1720px] mx-auto flex justify-between items-center">
          
          {/* Logo & Identity */}
          <a href="#inicio" onClick={() => setCurrentProject(null)} className="flex items-center gap-2 select-none group">
            <span className="font-sans font-black text-sm tracking-[-0.03em] uppercase text-white group-hover:text-neutral-300 transition-colors">
              RAÍSSA MORIÁ
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono hidden sm:inline">Portfolio</span>
          </a>

          {/* Clean minimal navigation links */}
          <nav className="flex items-center gap-8 md:gap-10 text-[11px] tracking-[0.15em] font-mono font-bold text-neutral-400 uppercase">
            <a href="#tunnel-section" className="hover:text-white transition-colors">
              {language === 'pt' ? 'Túnel 3D' : '3D Tunnel'}
            </a>
            <a href="#portfolio-grid-section" className="hover:text-white transition-colors">
              {language === 'pt' ? 'Portfólio' : 'Portfolio'}
            </a>
            <a href="#sobre" className="hover:text-white transition-colors">
              {language === 'pt' ? 'Sobre' : 'About'}
            </a>
            <a href="#contacto" className="hover:text-white transition-colors">
              {language === 'pt' ? 'Contacto' : 'Contact'}
            </a>
          </nav>

          {/* Time, Language Switcher & Quick Direct Email */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-[10px] text-neutral-500 font-mono font-medium hidden md:inline">
              {time || "LISBON TIME"}
            </span>

            {/* Language Switch */}
            <div className="flex items-center bg-neutral-900 rounded-full p-1 border border-neutral-800 select-none">
              <button
                onClick={() => setLanguage('pt')}
                className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase transition-all tracking-wider font-mono cursor-pointer ${
                  language === 'pt' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase transition-all tracking-wider font-mono cursor-pointer ${
                  language === 'en' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <a 
              href="mailto:raissagfdhb@gmail.com" 
              className="bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all shadow-xs"
            >
              {language === 'pt' ? 'Falar →' : 'Talk →'}
            </a>
          </div>

        </div>
      </header>

      {/* 2. HERO: 3D Refractive / Liquid Glass Interactive Hero Sandbox */}
      <main id="inicio">
        <MoriaHero language={language} />
      </main>

      {/* 3. 3D GALLERY TUNNEL (Originkit Gallery Tunnel Concept in Monochromatic Black & White) */}
      <GalleryTunnel 
        language={language} 
        onSelectProject={handleOpenProject}
        onEnterPortfolio={() => {
          const el = document.getElementById('portfolio-grid-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. PROJECTS SHOWCASE ARCHIVE */}
      <ProjectsSection 
        language={language} 
        onSelectProject={handleOpenProject}
      />

      {/* 5. Biography, Trajectory & Background */}
      <section id="sobre" className="border-t border-b border-neutral-900 bg-[#050505] text-white py-24 px-6 md:px-12 xl:px-16 selection:bg-white selection:text-black">
        <div className="max-w-[1720px] mx-auto flex flex-col gap-12">
          
          {/* Header of Section */}
          <div className="flex flex-col gap-3">
            <div className="text-neutral-500 text-[10px] font-mono uppercase tracking-[0.25em] select-none">
              <span>02 / {language === 'pt' ? 'SOBRE & PERCURSO DE DESIGN' : 'ABOUT & DESIGN JOURNEY'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              {language === 'pt' ? 'Design de Experiências & Produtos Digitais.' : 'Designing Experiences & Digital Products.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Portrait & Direct Contact Card */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-[100px]">
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-800 p-2.5 bg-neutral-950 shadow-2xl group">
                <img 
                  src={profilePic} 
                  alt="Raíssa Moriá portrait" 
                  className="w-full h-full object-cover rounded-xl grayscale contrast-125 transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col gap-4 px-2">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">Raíssa Moriá</h3>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold font-mono mt-1">
                    UX/UI & Product Designer • AI & Vibe Coding
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 text-xs text-neutral-400 pt-3 border-t border-neutral-800 font-mono">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">TEL:</span>
                    <a href="tel:+351935360284" className="text-white hover:text-neutral-300 font-bold">+351 935 360 284</a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">{language === 'pt' ? 'LOCAL:' : 'LOCATION:'}</span>
                    <span className="text-white font-bold">Lisboa & Porto, PT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">EMAIL:</span>
                    <a href="mailto:raissagfdhb@gmail.com" className="text-white hover:text-neutral-300 font-bold">raissagfdhb@gmail.com</a>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex flex-col gap-2 pt-2">
                  <a 
                    href="https://github.com/raissamoria" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between p-3.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-xl transition-all text-xs font-bold text-white hover:bg-neutral-850"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      <span>Github</span>
                    </span>
                    <span className="font-mono text-[9px] text-neutral-500">github.com/raissamoria</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/raissamoria" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between p-3.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-xl transition-all text-xs font-bold text-white hover:bg-neutral-850"
                  >
                    <span className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </span>
                    <span className="font-mono text-[9px] text-neutral-500 font-medium">linkedin.com/in/raissamoria</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Biografia, Educação, Competências & Linha do Tempo */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              
              {/* Biografia text block */}
              <div className="flex flex-col gap-5 text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                {language === 'pt' ? (
                  <>
                    <p className="text-lg md:text-xl text-white leading-relaxed tracking-tight font-normal">
                      Sou <strong className="font-bold text-white">UX/UI Designer com foco em produtos e plataformas digitais</strong>, combinando pesquisa, estratégia, interface e tecnologia para criar experiências intuitivas e centradas no utilizador.
                    </p>
                    <p className="text-neutral-300">
                      Trabalho desde a definição de requisitos e fluxos até à prototipagem e experimentação em front-end, utilizando ferramentas como <strong className="text-white font-medium">Figma, Cursor e Google AI Studio</strong>. Também acompanho a implementação dos projetos através de <strong className="text-white font-medium">GitHub, deployment na Vercel e configuração de domínios e DNS</strong>.
                    </p>
                    <p className="text-neutral-300">
                      Atualmente, exploro cada vez mais a interseção entre <strong className="text-white font-medium">UX/UI, Product Design, IA e Vibe Coding</strong>, aproximando design e desenvolvimento para transformar ideias em produtos digitais funcionais.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-lg md:text-xl text-white leading-relaxed tracking-tight font-normal">
                      I am a <strong className="font-bold text-white">UX/UI Designer focused on digital products and platforms</strong>, combining research, strategy, interface, and technology to build intuitive, user-centered experiences.
                    </p>
                    <p className="text-neutral-300">
                      I work end-to-end from defining requirements and flows to prototyping and front-end experimentation using tools like <strong className="text-white font-medium">Figma, Cursor, and Google AI Studio</strong>. I also oversee project implementation via <strong className="text-white font-medium">GitHub, Vercel deployments, and domain/DNS configuration</strong>.
                    </p>
                    <p className="text-neutral-300">
                      Currently, I increasingly explore the intersection of <strong className="text-white font-medium">UX/UI, Product Design, AI, and Vibe Coding</strong>, bridging design and development to turn ideas into functional digital products.
                    </p>
                  </>
                )}
              </div>

              {/* Educação e Competências */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-800">
                
                {/* Educação */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest font-black text-neutral-400">
                    {language === 'pt' ? 'Educação' : 'Education'}
                  </h4>
                  <div className="flex flex-col gap-4">
                    <div>
                      <h5 className="text-xs font-mono font-bold text-white">
                        {language === 'pt' ? 'Licenciatura em Design Gráfico e Multimédia' : 'BA in Graphic and Multimedia Design'}
                      </h5>
                      <p className="text-xs text-neutral-400">ESAD, Caldas da Rainha • 2021 – 2024</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-mono font-bold text-white">
                        {language === 'pt' ? 'Curso de Fotografia Profissional' : 'Professional Photography Program'}
                      </h5>
                      <p className="text-xs text-neutral-400">Escola Profissional Magestil, Lisboa • 2013 – 2016</p>
                    </div>
                  </div>
                </div>

                {/* Competências */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest font-black text-neutral-400">
                    {language === 'pt' ? 'Ferramentas & Competências' : 'Tools & Expertise'}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Figma", 
                      "Cursor", 
                      "Google AI Studio", 
                      "Vercel Deployment", 
                      "GitHub", 
                      "DNS & Domínios", 
                      "Vibe Coding", 
                      "Product Design", 
                      "UX Research & Flows", 
                      "Prototipagem", 
                      "Design Systems", 
                      "Front-end / React", 
                      "TypeScript / HTML / CSS", 
                      "After Effects", 
                      "Cinema 4D", 
                      "Shaders & WebGL"
                    ].map((skill) => (
                      <span key={skill} className="bg-neutral-900 hover:bg-neutral-800 transition-colors border border-neutral-800 text-[10px] text-neutral-300 font-mono px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Experiência Profissional */}
              <div className="flex flex-col gap-6 pt-8 border-t border-neutral-800">
                <h4 className="text-xs font-mono uppercase tracking-widest font-black text-neutral-400">
                  {language === 'pt' ? 'Experiência Profissional' : 'Professional Experience'}
                </h4>
                
                <div className="flex flex-col gap-8">
                  
                  {/* Experience item 1: Ursoinvencivel / UNGRID App */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                    <div className="sm:col-span-4 font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
                      {language === 'pt' ? '2025 — Presente' : '2025 — Present'}
                    </div>
                    <div className="sm:col-span-8 flex flex-col gap-2">
                      <h5 className="text-sm font-black uppercase text-white tracking-tight">
                        UX Designer — Ursoinvencível (UNGRID App)
                      </h5>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        {language === 'pt'
                          ? 'Design de experiência de utilizador (UX) para a aplicação mobile UNGRID, focada na preparação, gestão de risco e resposta rápida perante catástrofes naturais. Estruturação de fluxos de navegação críticos, arquitetura de informação de emergência, testes de usabilidade e prototipagem interativa.'
                          : 'UX Design for the UNGRID mobile application, focused on preparedness, risk management, and rapid response for natural disasters. Structuring critical user flows, emergency information architecture, usability testing, and interactive prototyping.'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Experience item 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                    <div className="sm:col-span-4 font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
                      {language === 'pt' ? 'Dez 2025 — Presente' : 'Dec 2025 — Present'}
                    </div>
                    <div className="sm:col-span-8 flex flex-col gap-2">
                      <h5 className="text-sm font-black uppercase text-white tracking-tight">
                        UX/UI Designer — VOQIN’ (futureLabs)
                      </h5>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        {language === 'pt'
                          ? 'Liderança de processos de Design Thinking, UX e UI para a criação de plataformas digitais de suporte corporativo internas e aceleração de fluxos de eventos. Desenvolvimento de websites interativos na rede Cvent, organizando jornadas de usuário e fluxos comunicacionais eficazes.'
                          : 'Leading Design Thinking, UX and UI processes for corporate digital support platforms and interactive event management solutions. Designing intuitive user journeys and clear visual systems.'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Experience item 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                    <div className="sm:col-span-4 font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
                      {language === 'pt' ? 'Abr 2025' : 'Apr 2025'}
                    </div>
                    <div className="sm:col-span-8 flex flex-col gap-2">
                      <h5 className="text-sm font-black uppercase text-white tracking-tight">
                        Photography Coordinator — SEEDS (Iceland)
                      </h5>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        {language === 'pt'
                          ? 'Coordenação de workshops de fotografia e audiovisual para voluntários internacionais. Gestão e polimento de presença digital através da concepção de layouts no Figma e animações em vídeo.'
                          : 'Coordination of photography and audiovisual workshops for international volunteers. Digital presence development through Figma layouts and motion video assets.'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Experience item 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                    <div className="sm:col-span-4 font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
                      2023 — 2024
                    </div>
                    <div className="sm:col-span-8 flex flex-col gap-2">
                      <h5 className="text-sm font-black uppercase text-white tracking-tight">
                        Video Editor — Six Seconds (California)
                      </h5>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        {language === 'pt'
                          ? 'Edição e finalização de vídeos educativos e de marketing promocional voltados para campanhas de redes sociais, atuando em forte sinergia com equipes de criação globais.'
                          : 'Editing and post-production of educational and promotional media for social media campaigns, collaborating across international creative teams.'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Experience item 4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                    <div className="sm:col-span-4 font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
                      2022 — 2024
                    </div>
                    <div className="sm:col-span-8 flex flex-col gap-2">
                      <h5 className="text-sm font-black uppercase text-white tracking-tight">
                        Multimedia Volunteer — ESAD (Portugal)
                      </h5>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        {language === 'pt'
                          ? 'Apoio ao laboratório audiovisual de design gráfico e multimédia, auxiliando na execução prática de instalações interativas, fotografia experimental e edição de motion graphics.'
                          : 'Audiovisual lab assistant in graphic and multimedia design, supporting interactive installations, experimental photography, and motion graphics.'
                        }
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Clean Monochromatic Marquee Strip */}
      <div className="w-full py-4 bg-black border-b border-neutral-900 text-neutral-400">
        <Marquee text="• RAÍSSA MORIÁ • 3D TUNNEL GALLERY • EXPERIMENTAL DESIGN & CODE • LISBOA & PORTO •" speed={16} />
      </div>

      {/* 6. Contact Footer with generous monochromatic dark theme */}
      <footer id="contacto" className="bg-black text-white py-24 px-6 md:px-12 xl:px-16 border-t border-neutral-900">
        <div className="max-w-[1720px] mx-auto flex flex-col gap-16">
          
          <div className="flex flex-col gap-4">
            <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-[0.25em] font-bold">
              03 / {language === 'pt' ? 'CONTACTO DIRECTO' : 'DIRECT INQUIRY'}
            </span>
            <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tight leading-none text-neutral-200">
              {language === 'pt' ? (
                <>
                  Inicie uma <br />
                  <span className="text-neutral-500">nova conversa</span>.
                </>
              ) : (
                <>
                  Let&apos;s start a <br />
                  <span className="text-neutral-500">new conversation</span>.
                </>
              )}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-16 border-t border-neutral-900 text-xs text-neutral-400 font-medium">
            <div>
              <p className="text-neutral-500 uppercase tracking-widest mb-1.5 text-[10px] font-mono">
                {language === 'pt' ? 'LOCALIZAÇÃO ATUAL' : 'CURRENT LOCATION'}
              </p>
              <p className="text-white text-sm">Portugal • Lisboa & Porto</p>
            </div>
            <div>
              <p className="text-neutral-500 uppercase tracking-widest mb-1.5 text-[10px] font-mono">
                {language === 'pt' ? 'ESPECIALIZAÇÕES' : 'EXPERTISE'}
              </p>
              <p className="text-white text-sm">UX/UI, Product Design, IA & Vibe Coding, Prototipagem & Front-end</p>
            </div>
            <div className="flex flex-col md:items-end justify-end">
              <p className="text-[10px] tracking-widest uppercase text-neutral-600 font-mono">
                © 2026 Raíssa Moriá • ALL RIGHTS RESERVED
              </p>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
