import { motion } from 'framer-motion';
import { Briefcase, Database } from 'lucide-react';

export const DoubleMotor = () => {
  return (
    <section className="py-32 px-6 bg-slate-900/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              El Modelo de <br />
              <span className="text-emerald-500 italic">Doble Motor</span> Financiero
            </h2>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Como consultora tecnológica, SmartLean ofrece una estructura de valor única que garantiza tanto la transformación profunda como el éxito a largo plazo.
            </p>
            
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 h-fit">
                  <Briefcase className="text-emerald-500" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Motor 1: Consultoría de Alto Impacto</h3>
                  <p className="text-slate-500">Diagnóstico inicial, diseño del nuevo proceso y acompañamiento en el "cambio de chip" organizacional.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 h-fit">
                  <Database className="text-sky-500" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Motor 2: SaaS de Gestión Vital (Recurrente)</h3>
                  <p className="text-slate-500">Instalación del ecosistema Nexus como el sistema operativo permanente de la empresa.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full animate-pulse" />
            <div className="glass-card p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/5 group-hover:scale-110 transition-transform">0101</div>
              <h4 className="text-2xl font-black mb-6 uppercase tracking-widest text-emerald-500">Desarrollo a Medida</h4>
              <p className="text-slate-400 text-xl font-light leading-relaxed mb-8">
                Construimos aplicaciones con **Filosofía SmartLean**:
              </p>
              <ul className="space-y-4 text-slate-300 font-bold uppercase tracking-widest text-xs">
                <li className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                  Flujo Simple sin Desperdicios
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                  Automatización Nativa
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                  Data-Driven en Tiempo Real
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                  Infraestructura Cloud-First
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
