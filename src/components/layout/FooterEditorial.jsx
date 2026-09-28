import React from 'react';
import { MapPin, Mail, Phone, Instagram } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

export default function FooterEditorial() {
  const { t } = useThemeLanguage();
  const f = t.footer;

  return (
    <footer id="filosofia" className="py-24 sm:py-32 bg-transparent border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        
        {/* Manifiesto Editorial Central */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/10 pb-16">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-white/[0.04] border border-white/15 flex items-center justify-center">
                <img 
                  src="/logo-transparent.png" 
                  alt="Dynamind Studios Logo" 
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="font-display font-bold text-lg text-white uppercase tracking-wider">
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
                  <a href="/#/obras" className="hover:text-white transition-colors uppercase block">
                    ▸ {t.nav.obras}
                  </a>
                </li>
                <li>
                  <a href="/#/sistemas" className="hover:text-white transition-colors uppercase block">
                    ▸ {t.nav.sistemas}
                  </a>
                </li>
                <li>
                  <a href="/#/vision" className="hover:text-white transition-colors uppercase block">
                    ▸ {t.nav.vision}
                  </a>
                </li>
                <li>
                  <a href="/#/diagnostico" className="hover:text-white transition-colors uppercase block text-cyan-400 font-bold">
                    ▸ {t.nav.diagnostico} (45s)
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest">
                Canales Oficiales
              </div>
              <ul className="space-y-2.5 text-zinc-300">
                <li>
                  <a 
                    href="https://wa.me/573122952165?text=Hola%20Dynamind%20Studios%2C%20quiero%20hacer%20un%20diagn%C3%B3stico%20de%20mi%20empresa" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
                  >
                    <Phone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-xs font-semibold">wa.link/dynamind</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:contacto@dynamindstudios.com" 
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <span>contacto@dynamindstudios.com</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/dynamind.studios/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-zinc-400" />
                    <span>@dynamind.studios</span>
                  </a>
                </li>
                <li className="flex items-center gap-2 text-zinc-400 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Eje Cafetero, Colombia · Armenia / Pereira / Manizales · Cobertura Global</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Fila Final: Copyright y Telemetría */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400 pt-4">
          <div>
            © {new Date().getFullYear()} DYNAMIND STUDIOS S.A.S. — {f.rights}
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>CEO & DIRECTOR DE ARQUITECTURA: JUAN PABLO TORO</span>
            <span>·</span>
            <span>VERSIÓN 2.0 CANÓNICA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
