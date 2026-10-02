import React from 'react';
import { MapPin, Mail, Phone, Instagram, Linkedin, Github, Youtube } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useCMS } from '../../context/CMSContext';

export default function FooterEditorial() {
  const { t, isLight } = useThemeLanguage();
  const { cms } = useCMS();
  const f = t.footer;
  const social = cms?.social || {};

  return (
    <footer id="footer" className={`py-24 sm:py-32 border-t relative transition-colors duration-500 ${
      isLight ? 'bg-slate-100/90 border-slate-200 text-slate-700' : 'bg-transparent border-white/10 text-platinum'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        
        {/* Manifiesto Editorial Central */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 border-b pb-16 ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}>
          
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-sm border flex items-center justify-center ${
                isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-white/[0.04] border-white/15'
              }`}>
                <img 
                  src="/logo-transparent.png" 
                  alt="Dynamind Studios Logo" 
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className={`font-display font-bold text-lg uppercase tracking-wider ${
                isLight ? 'text-[#090d16]' : 'text-white'
              }`}>
                Dynamind Studios
              </span>
            </div>

            <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed max-w-lg">
              {f.brandDesc}
            </p>

            <div className="flex items-center gap-6 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400" />
                {f.g1}
              </span>
              <span>·</span>
              <span>{f.g3}</span>
            </div>
          </div>

          {/* Enlaces de Navegación & Contacto */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-mono">
            
            <div className="space-y-4">
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest">
                {f.navTitle}
              </div>
              <ul className="space-y-2.5 text-zinc-300">
                <li>
                  <a href="#/obras" className="hover:text-white active:scale-95 transition-all uppercase block cursor-pointer">
                    ▸ {t.nav.obras}
                  </a>
                </li>
                <li>
                  <a href="#/sistemas" className="hover:text-white active:scale-95 transition-all uppercase block cursor-pointer">
                    ▸ {t.nav.sistemas}
                  </a>
                </li>
                <li>
                  <a href="#/vision" className="hover:text-white active:scale-95 transition-all uppercase block cursor-pointer">
                    ▸ {t.nav.vision}
                  </a>
                </li>
                <li>
                  <a href="#/diagnostico" className="hover:text-white active:scale-95 transition-all uppercase block text-cyan-400 font-bold cursor-pointer">
                    ▸ {t.nav.diagnostico} (45s)
                  </a>
                </li>
                <li className="pt-2 border-t border-white/10">
                  <a href="#/privacidad" className="hover:text-cyan-400 active:scale-95 transition-all uppercase block text-[11px] text-zinc-400 cursor-pointer">
                    § Políticas de Privacidad & Habeas Data
                  </a>
                </li>
                <li>
                  <a href="#/terminos" className="hover:text-cyan-400 active:scale-95 transition-all uppercase block text-[11px] text-zinc-400 cursor-pointer">
                    § Términos y Condiciones
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest">
                Canales Oficiales
              </div>
              <ul className="space-y-2.5 text-zinc-300">
                {social.show_whatsapp !== false && (
                  <li>
                    <a 
                      href={`https://wa.me/${(social.whatsapp_number || '+573122952165').replace(/[^0-9]/g, '')}?text=Hola%20Dynamind%20Studios%2C%20quiero%20hacer%20un%20diagn%C3%B3stico%20de%20mi%20empresa`}
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
                    >
                      <Phone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-xs font-semibold">{social.whatsapp_number || 'wa.link/dynamind'}</span>
                    </a>
                  </li>
                )}

                <li>
                  <a 
                    href={`mailto:${social.email || 'dynamindstudios@gmail.com'}`}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{social.email || 'dynamindstudios@gmail.com'}</span>
                  </a>
                </li>

                {social.show_instagram !== false && (
                  <li>
                    <a 
                      href={social.instagram_url || 'https://www.instagram.com/dynamind.studios/'}
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Instagram</span>
                    </a>
                  </li>
                )}

                {social.show_linkedin && (
                  <li>
                    <a 
                      href={social.linkedin_url || 'https://linkedin.com/company/dynamind-studios'}
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>LinkedIn</span>
                    </a>
                  </li>
                )}

                {social.show_github && (
                  <li>
                    <a 
                      href={social.github_url || 'https://github.com/juanpabloto2000-spec'}
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-zinc-400" />
                      <span>GitHub</span>
                    </a>
                  </li>
                )}

                {social.show_youtube && (
                  <li>
                    <a 
                      href={social.youtube_url || 'https://youtube.com/@dynamindstudios'}
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <Youtube className="w-3.5 h-3.5 text-zinc-400" />
                      <span>YouTube</span>
                    </a>
                  </li>
                )}

                <li className="flex items-center gap-2 text-zinc-400 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Eje Cafetero, Colombia · Armenia / Pereira / Manizales · Cobertura Global</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Fila Final: Copyright, Marco Legal y Telemetría */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400 pt-4 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} DYNAMIND STUDIOS S.A.S. — {f.rights}</span>
            <span>·</span>
            <a href="#/privacidad" className="hover:text-cyan-400 underline underline-offset-4 transition-colors cursor-pointer">
              Privacidad & Ley 1581 (Habeas Data)
            </a>
            <span>·</span>
            <a href="#/terminos" className="hover:text-cyan-400 underline underline-offset-4 transition-colors cursor-pointer">
              Términos del Servicio
            </a>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>CEO & DIRECTOR: JUAN PABLO OROZCO</span>
            <span>·</span>
            <span>VERSIÓN 2.1 SOBERANA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
