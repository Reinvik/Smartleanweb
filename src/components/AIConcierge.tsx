import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export const AIConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-6 w-[350px] md:w-[400px] h-[500px] glass-card overflow-hidden shadow-2xl border-emerald-500/30 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-emerald-500 text-black flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tight">Concierge SmartLean</h4>
                  <p className="text-[10px] font-bold opacity-70">En línea • Agente de IA</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={20} />
              </button>
            </div>

            {/* Chat Content (Placeholder) */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/50">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm text-slate-300 leading-relaxed">
                ¡Hola! Soy el agente inteligente de **SmartLean**. 
                <br /><br />
                Puedo explicarte cómo nuestra metodología está salvando los márgenes de los talleres en Chile o cómo conectamos la IA a tu base de datos.
                <br /><br />
                ¿Qué te gustaría transformar hoy?
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-slate-900/50 flex gap-2">
              <input 
                type="text" 
                placeholder="Escribe tu consulta..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-emerald-500 outline-none transition-colors"
              />
              <button className="size-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center hover:scale-105 transition-transform">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="size-16 rounded-full bg-emerald-500 text-black shadow-2xl shadow-emerald-500/20 flex items-center justify-center relative group"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full border-2 border-[#020617] animate-pulse" />
        )}
        <div className="absolute right-20 bg-emerald-500 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Habla con nuestra IA
        </div>
      </motion.button>
    </div>
  );
};
