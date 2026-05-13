import { motion } from 'framer-motion';
import { Target, Cpu, BarChart3, Users2, TrendingUp } from 'lucide-react';

const pillars = [
  {
    title: 'Lean (Flujo Físico)',
    desc: 'Eliminación de desperdicios en el Gemba. Identificación de cuellos de botella en el flujo real de tu operación.',
    icon: Target,
    color: '#10b981'
  },
  {
    title: 'Automatización & IA Orquestada',
    desc: 'La IA se conecta nativamente a tu base de datos para guiar la gestión, generar informes automáticos y ejecutar procesos sin intervención humana.',
    icon: Cpu,
    color: '#0ea5e9'
  },
  {
    title: 'Inteligencia Predictiva',
    desc: 'Análisis de datos en tiempo real que identifica patrones y riesgos antes de que ocurran, transformando la data en decisiones estratégicas.',
    icon: BarChart3,
    color: '#8b5cf6'
  },
  {
    title: 'Soberanía del Talento',
    desc: 'Mapas vivos de competencias que aseguran que tu equipo esté siempre un paso adelante del estándar.',
    icon: Users2,
    color: '#f59e0b'
  },
  {
    title: 'Círculo de Crecimiento',
    desc: 'Marketing automatizado que alimenta constantemente la nueva capacidad operativa instalada.',
    icon: TrendingUp,
    color: '#ec4899'
  }
];

export const Pillars = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-black mb-6">Los 5 Pilares de la <span className="emerald-gradient-text">Metodología SmartLean</span></h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          No instalamos un software; instalamos una nueva forma de pensar y operar que se traduce en rentabilidad inmediata.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((pillar, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-card p-10 flex flex-col items-start gap-6 group"
          >
            <div 
              className="p-4 rounded-2xl transition-all group-hover:scale-110"
              style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}
            >
              <pillar.icon size={32} />
            </div>
            <h3 className="text-2xl font-bold">{pillar.title}</h3>
            <p className="text-slate-400 leading-relaxed font-medium">
              {pillar.desc}
            </p>
            <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Pilar 0{index + 1}</span>
              <div className="flex-1 h-px bg-emerald-500/20" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
