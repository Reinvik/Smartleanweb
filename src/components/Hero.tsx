import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="mesh-gradient" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
          <Zap size={14} className="fill-emerald-400" />
          <span>Bridging Excellence 4.0 to 5.0</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-extrabold mb-8 leading-tight premium-gradient-text">
          SmartLean: La Metodología que <span className="emerald-gradient-text">Instala el Futuro</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
          No vendemos software, instalamos sistemas operativos empresariales. 
          Transformamos el caos operativo en un flujo inteligente, desatendido y rentable.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl transition-all flex items-center gap-2 group shadow-lg shadow-emerald-500/20">
            Agenda tu Diagnóstico SmartLean
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all">
            Ver Ecosistema Nexus
          </button>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-emerald-500 to-transparent" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Scroll to Explore</span>
      </div>
    </section>
  );
};
