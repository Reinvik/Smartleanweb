import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader } from 'lucide-react';

const GEMINI_KEY = 'AIzaSyAxCdAq1xl58O7MZ4reX4AJo9lLjXxMzCM';

const SYSTEM = `Eres el Concierge de SmartLean, una consultora tecnológica chilena especializada en transformación operacional para talleres mecánicos y empresas industriales. 
Hablas español de Chile, eres directo, profesional y entusiasta.
Tu objetivo es explicar la metodología SmartLean (5 pilares: Lean, IA, Visibilidad, Talento, Crecimiento), el modelo de doble motor financiero (consultoría + SaaS), y los productos del ecosistema Nexus.
Si alguien quiere una reunión o diagnóstico, dales el email ariel@smartlean.cl.
Sé conciso: máximo 3 párrafos por respuesta.`;

type Msg = { role: 'user' | 'model'; text: string };

export const AIConcierge = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{
    role: 'model',
    text: '¡Bienvenido! Soy el agente de SmartLean. ¿Te cuento cómo estamos salvando los márgenes de los talleres en Chile, o prefieres que hablemos de la metodología directamente?'
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMsgs(m => [...m, { role: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const history = msgs.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents: [...history, { role: 'user', parts: [{ text: userMsg }] }]
        })
      });
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Lo siento, no pude procesar tu mensaje.';
      setMsgs(m => [...m, { role: 'model', text: reply }]);
    } catch {
      setMsgs(m => [...m, { role: 'model', text: 'Error de conexión. Escríbenos directo: ariel@smartlean.cl' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: .9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .9, y: 16 }}
            style={{ position: 'absolute', bottom: '5rem', right: 0, width: 380, height: 520, background: 'var(--surface-1)', border: '1px solid var(--border-em)', borderRadius: 20, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,.5)' }}
          >
            {/* Header */}
            <div style={{ padding: '1.25rem 1.5rem', background: 'linear-gradient(135deg, #0a2e1f, #0c1a38)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.85rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--em-dim)', border: '1px solid var(--border-em)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--em)' }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: '.9rem', fontFamily: 'Syne' }}>Concierge SmartLean</p>
                  <p style={{ fontSize: '.65rem', color: 'var(--em)', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>● Agente IA en línea</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-2)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '85%', padding: '.85rem 1.1rem', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: m.role === 'user' ? 'var(--em)' : 'var(--surface-2)',
                    color: m.role === 'user' ? '#020a14' : 'var(--text-1)',
                    fontSize: '.875rem', lineHeight: 1.65, fontWeight: m.role === 'user' ? 600 : 400,
                    border: m.role === 'model' ? '1px solid var(--border)' : 'none'
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', gap: '.4rem', padding: '.85rem 1.1rem', width: 'fit-content', background: 'var(--surface-2)', borderRadius: '16px 16px 16px 4px', border: '1px solid var(--border)' }}>
                  <Loader size={14} color="var(--em)" style={{ animation: 'spin 1s linear infinite' }} />
                  <span style={{ fontSize: '.8rem', color: 'var(--text-2)' }}>Pensando...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '.75rem' }}>
              <input
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Pregunta sobre SmartLean..."
                style={{ flex: 1, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, padding: '.75rem 1rem', color: 'var(--text-1)', fontSize: '.875rem', outline: 'none' }}
              />
              <button onClick={send} className="btn-primary" style={{ padding: '.75rem 1rem', borderRadius: 12 }}>
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.08 }} whileTap={{ scale: .95 }}
        onClick={() => setOpen(!open)}
        className="btn-primary pulse-em"
        style={{ width: 60, height: 60, borderRadius: '50%', padding: 0, justifyContent: 'center', position: 'relative' }}
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
        {!open && <span style={{ position: 'absolute', top: -3, right: -3, width: 14, height: 14, background: '#ef4444', borderRadius: '50%', border: '2px solid var(--void)', animation: 'pulse-em 2s infinite' }} />}
      </motion.button>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); }}`}</style>
    </div>
  );
};
