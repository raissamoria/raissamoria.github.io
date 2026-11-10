import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, ArrowUpRight } from 'lucide-react';
import { TapePiece } from './TapePiece';
import { SunRaysDoodle, WaveDoodle } from './DoodleAccents';

interface ScrapbookContactProps {
  language: 'pt' | 'en';
}

export const ScrapbookContact: React.FC<ScrapbookContactProps> = ({ language }) => {
  return (
    <section id="contacto" className="relative w-full py-20 px-4 sm:px-8 md:px-12 select-none">
      
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        
        {/* POSTCARD / AIRMAIL TRAVEL ENVELOPE */}
        <div 
          style={{ transform: 'rotate(-0.8deg)' }}
          className="relative bg-[#F8F6F0] p-6 sm:p-10 md:p-12 paper-shadow-lg rounded-[4px] border border-black/10 text-[#1A1A1A] overflow-hidden"
        >
          {/* Airmail red/blue striped vintage top border effect */}
          <div className="absolute top-0 left-0 right-0 h-2.5 bg-repeating-linear-gradient-45 from-rose-500 via-rose-500 to-sky-600 opacity-80" />

          {/* Washi tapes on corners */}
          <TapePiece className="-top-3 left-8" rotate={-6} width="w-16" height="h-5" variant="yellow" />
          <TapePiece className="-top-3 right-8" rotate={8} width="w-14" height="h-4.5" variant="cream" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* LEFT SIDE: INVITATION MESSAGE */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span 
                  style={{ transform: 'rotate(-2deg)' }}
                  className="px-3 py-1 bg-[#E8AF30] text-[#1A1A1A] font-typewriter text-xs font-bold uppercase rounded-[1px] paper-shadow"
                >
                  {language === 'pt' ? 'MENSAGEM DE CONTACTO' : 'GET IN TOUCH'}
                </span>
                <SunRaysDoodle className="w-6 h-5" color="#E8AF30" />
              </div>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#073859] tracking-wide leading-tight">
                {language === 'pt' 
                  ? 'Vamos criar algo interessante juntos?' 
                  : 'Let\'s create something interesting together?'}
              </h2>

              <p className="font-sans text-base sm:text-lg text-neutral-700 leading-relaxed max-w-lg">
                {language === 'pt' 
                  ? 'Seja para conversar sobre um novo projeto de UX/UI, uma oportunidade em equipa ou apenas para trocar ideias sobre design, viagens e mar.' 
                  : 'Whether to talk about a new UX/UI project, a team opportunity, or just to exchange thoughts about design, travel and the ocean.'}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="mailto:raissagfdhb@gmail.com"
                  style={{ transform: 'rotate(1deg)' }}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-[#073859] text-[#F8F6F0] paper-shadow rounded-[2px] font-display text-xl tracking-wider transition-all duration-200 hover:scale-105 hover:bg-[#0a4c78] active:scale-95"
                >
                  <Mail className="w-4 h-4 text-[#E8AF30]" />
                  <span>{language === 'pt' ? 'Enviar E-mail' : 'Send an Email'}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="tel:+351935360284"
                  style={{ transform: 'rotate(-1.5deg)' }}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#F2EBD9] text-[#1A1A1A] paper-shadow rounded-[2px] font-typewriter text-xs font-bold transition-all duration-200 hover:scale-105 hover:bg-white border border-black/10"
                >
                  <Phone className="w-3.5 h-3.5 text-[#073859]" />
                  <span>+351 935 360 284</span>
                </a>
              </div>
            </div>

            {/* RIGHT SIDE: POSTAL STAMP & AUTHENTIC DIRECT DATA */}
            <div className="lg:col-span-5 flex flex-col gap-6 p-6 rounded-[2px] bg-[#F2EBD9] border border-black/10 paper-shadow">
              
              {/* Postal stamp cutout */}
              <div className="flex justify-between items-start border-b border-black/10 pb-4">
                <div className="flex flex-col">
                  <span className="font-typewriter text-[10px] text-neutral-500 uppercase tracking-wider">
                    DESTINATÁRIO / TO
                  </span>
                  <span className="font-handwriting text-2xl text-[#073859] font-bold">
                    Raíssa Moriá
                  </span>
                  <span className="font-typewriter text-[11px] text-neutral-600">
                    UX/UI & Product Designer
                  </span>
                </div>

                {/* Postage Stamp Graphic */}
                <div 
                  style={{ transform: 'rotate(3deg)' }}
                  className="w-16 h-20 bg-[#F8F6F0] border-2 border-dashed border-[#073859] p-1.5 flex flex-col justify-between items-center text-center shadow-xs"
                >
                  <span className="font-typewriter text-[8px] font-bold text-[#073859]">PT 2026</span>
                  <WaveDoodle className="w-10 h-3" color="#073859" />
                  <span className="font-display text-sm text-[#E8AF30] font-bold">AIRMAIL</span>
                </div>
              </div>

              {/* Contact list */}
              <div className="flex flex-col gap-3 font-typewriter text-xs text-[#1A1A1A]">
                <div className="flex items-center justify-between py-1 border-b border-black/5">
                  <span className="text-neutral-500 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#073859]" /> EMAIL:
                  </span>
                  <a href="mailto:raissagfdhb@gmail.com" className="font-bold text-[#073859] hover:underline">
                    raissagfdhb@gmail.com
                  </a>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-black/5">
                  <span className="text-neutral-500 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#073859]" /> TEL:
                  </span>
                  <a href="tel:+351935360284" className="font-bold text-[#073859] hover:underline">
                    +351 935 360 284
                  </a>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-black/5">
                  <span className="text-neutral-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#073859]" /> {language === 'pt' ? 'LOCAL:' : 'LOCATION:'}
                  </span>
                  <span className="font-bold text-[#073859]">
                    Lisboa & Porto, PT
                  </span>
                </div>
              </div>

              {/* Social tags */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-[#F8F6F0] text-[#073859] font-typewriter text-xs font-bold paper-shadow rounded-[1px] flex items-center justify-center gap-1.5 hover:bg-[#E8AF30] hover:text-[#1A1A1A] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://github.com/raissamoria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-[#F8F6F0] text-[#073859] font-typewriter text-xs font-bold paper-shadow rounded-[1px] flex items-center justify-center gap-1.5 hover:bg-[#E8AF30] hover:text-[#1A1A1A] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>

            </div>

          </div>

          {/* Footer baseline */}
          <div className="mt-8 pt-6 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-typewriter text-neutral-500">
            <div>
              © 2026 Raíssa Moriá • {language === 'pt' ? 'Portfólio em estilo scrapbook & editorial' : 'Scrapbook & editorial portfolio'}
            </div>
            <div className="font-handwriting text-lg text-[#073859]">
              feito à mão com curiosidade & café ☕
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
