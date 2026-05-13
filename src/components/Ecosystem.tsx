import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const products = [
  {
    name: 'Nexus Lean',
    tagline: 'Gestión Gemba & Mejora Continua',
    url: 'https://lean.smartlean.cl',
    color: '#0ea5e9'
  },
  {
    name: 'Nexus Garage',
    tagline: 'SOP para Talleres de Alta Eficiencia',
    url: 'https://garage.smartlean.cl',
    color: '#f97316'
  },
  {
    name: 'Nexus Network',
    tagline: 'Ecosistema de Colaboración Industrial',
    url: 'https://network.smartlean.cl',
    color: '#10b981'
  },
  {
    name: 'Nexus Skills',
    tagline: 'Soberanía del Talento & IA Mentoring',
    url: 'https://skills.smartlean.cl',
    color: '#8b5cf6'
  }
];

export const Ecosystem = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Software que <br /><span className="emerald-gradient-text">Habla tu Idioma</span></h2>
            <p className="text-slate-400 text-lg">
              Nexus es nuestra suite de herramientas propietarias, diseñadas bajo la metodología SmartLean para garantizar la trazabilidad y el flujo total.
            </p>
          </div>
          <button className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 border-b border-emerald-500/20 pb-2 hover:border-emerald-500 transition-all">
            Explorar Catálogo Completo
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <motion.a
              key={index}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 flex flex-col justify-between aspect-square group relative overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: product.color }}
              >
                <ExternalLink size={20} />
              </div>
              
              <div 
                className="size-12 rounded-xl mb-6 flex items-center justify-center font-black text-xl"
                style={{ backgroundColor: `${product.color}20`, color: product.color }}
              >
                {product.name.charAt(6)}
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{product.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{product.tagline}</p>
              </div>
              
              <div className="mt-8 h-1 w-0 bg-emerald-500 group-hover:w-full transition-all duration-500" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
