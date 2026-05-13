import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, CheckCircle2 } from 'lucide-react';

export const SuccessStories = () => {
  return (
    <section className="py-32 px-6 bg-emerald-500/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Casos de <span className="text-emerald-500">Éxito Nexus</span>
          </h2>
          <p className="text-slate-400 text-xl font-light italic">
            "El fin del cuaderno: Cómo la metodología SmartLean está salvando los márgenes de los talleres mecánicos en Chile"
          </p>
        </div>

        <div className="glass-card overflow-hidden border-emerald-500/20 shadow-2xl shadow-emerald-500/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20 bg-emerald-500/10 flex flex-col justify-center">
              <div className="size-16 rounded-2xl bg-emerald-500 text-black flex items-center justify-center mb-8">
                <BookOpen size={32} />
              </div>
              <h3 className="text-3xl font-black mb-6 leading-tight">Del Caos del Papel a la <span className="text-emerald-400">Eficiencia 5.0</span></h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Históricamente, el taller mecánico chileno ha dependido del cuaderno. Un sistema propenso al error, al olvido y, sobre todo, a la pérdida de rentabilidad.
              </p>
              <div className="space-y-4">
                {[
                  'Aumento del 25% en rotación de elevadores.',
                  'Eliminación total de pérdida de repuestos.',
                  'Trazabilidad real de horas hombre por servicio.',
                  'Fidelización automática vía Nexus Connect.'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-emerald-400 font-bold uppercase tracking-widest text-xs">
                    <CheckCircle2 size={16} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-12 lg:p-20 flex flex-col justify-center gap-10">
              <div className="relative">
                <div className="absolute -left-8 top-0 bottom-0 w-1 bg-emerald-500/20" />
                <h4 className="text-xl font-black mb-4 uppercase tracking-widest text-slate-500">La Propuesta para Distribuidores</h4>
                <p className="text-slate-400 text-lg leading-relaxed">
                  "No solo les traigo un software para sus clientes, les traigo una metodología probada para que sus talleres sean más rentables y leales a su marca".
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-sky-500/10 text-sky-500">
                    <TrendingUp size={24} />
                  </div>
                  <span className="font-black uppercase tracking-widest text-sm text-white">Impacto en el Margen</span>
                </div>
                <div className="text-5xl font-black text-emerald-500 mb-2">+40%</div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Incremento promedio en rentabilidad operativa post-implementación SmartLean.</p>
              </div>

              <button className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-emerald-500 transition-all">
                Descargar Whitepaper de Metodología
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
