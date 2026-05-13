import { motion } from 'framer-motion';
import { Brain, FileText, Database, Settings2 } from 'lucide-react';

const capabilities = [
  {
    title: 'Guía en Tiempo Real',
    desc: 'La IA actúa como un mentor experto que guía a los usuarios a través de procesos complejos, asegurando el cumplimiento del estándar.',
    icon: Brain
  },
  {
    title: 'Conexión Nativa a Datos',
    desc: 'Acceso directo y seguro a tu base de datos para extraer insights profundos sin necesidad de consultas manuales.',
    icon: Database
  },
  {
    title: 'Informes Automatizados',
    desc: 'Generación instantánea de reportes de gestión, análisis de KPIs y resúmenes ejecutivos con lenguaje natural.',
    icon: FileText
  },
  {
    title: 'Automatización de Workflows',
    desc: 'La IA identifica oportunidades de automatización y las ejecuta, reduciendo la carga administrativa en un 80%.',
    icon: Settings2
  }
];

export const AICapabilities = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6">IA: El Cerebro de la <span className="text-emerald-500">Operación SmartLean</span></h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            No es solo un chat; es un agente integrado que conoce tu negocio, lee tus datos y actúa sobre tus procesos para maximizar la eficiencia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
            >
              <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-500 h-fit">
                <cap.icon size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">{cap.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {cap.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
