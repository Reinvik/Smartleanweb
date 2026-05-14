import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot, User, Loader2, MessageCircle, Zap } from 'lucide-react';

const GEMINI_KEY = 'AIzaSyAxCdAq1xl58O7MZ4reX4AJo9lLjXxMzCM';

const SYSTEM = `Eres el Concierge IA de SmartLean, una consultora tecnológica chilena de élite. Respondes en español chileno, eres directo, cálido, experto y entusiasta. Nunca dices que no puedes responder — si no tienes información exacta, orientas y ofreces agendar un diagnóstico.

## SOBRE SMARTLEAN
SmartLean es una consultora de transformación operacional que combina la filosofía Lean con tecnología de punta (IA, RPA, Cloud). Fundada en Chile, opera bajo el modelo "doble motor": consultoría estratégica + ecosistema de software propio llamado Nexus.

**Propuesta de valor:** "Software a medida, resultados reales. Filosofía Smart & Lean."
- Ahorramos tiempo, impulsamos productividad y generamos mayores beneficios reduciendo pérdidas operativas.
- Trabajamos con talleres mecánicos, distribuidores automotrices, empresas industriales y PyMEs.

**Los 5 Pilares de la Metodología SmartLean:**
1. **Lean (Gemba):** Eliminación de desperdicios, análisis del lugar de trabajo real, flujo de valor.
2. **IA Agéntica (GenAI):** Sistemas que piensan por el negocio — predicción de demanda, alertas automáticas, análisis de patrones.
3. **RPA (Automatización Robótica):** Procesos que se ejecutan solos 24/7 — captación de leads, envío de WhatsApp, reportes automáticos.
4. **Cloud & Analytics:** Datos en tiempo real, respaldo en la nube, acceso desde cualquier dispositivo.
5. **Talento & Crecimiento:** Capacitación del equipo humano para operar la tecnología.

## EL ECOSISTEMA NEXUS (productos SmartLean)

**Nexus Garage:** Software de gestión integral para talleres mecánicos.
- Módulos: Kanban de órdenes de trabajo, inventario inteligente, CRM de clientes, facturación, métricas de mecánicos, historial de vehículos.
- Incluye: automatización de recordatorios de mantención vía WhatsApp, captura de leads desde redes sociales, panel de rentabilidad por mecánico.
- Diferencial: elimina el cuaderno físico. Todo digitalizado, en la nube, en tiempo real.
- Resultado documentado: +40% rentabilidad operativa promedio post-implementación.

**Nexus RPM:** Módulo financiero y de rendimiento para talleres con múltiples mecánicos.
- KPIs por mecánico, comisiones automáticas, análisis de facturación MO vs repuestos.

**Nexus Connect:** Plataforma de automatización de redes sociales.
- Programación de contenido, análisis de sentimiento con IA, integración con Meta/Instagram.

**Nexus Network / Hub:** Sistema de gestión multi-sucursal y análisis de red de talleres.

**Charly Home:** E-commerce de repuestos con zonas de despacho dinámicas y carrito inteligente.

## PROCESO DE TRABAJO
1. **Diagnóstico gratuito (30 min):** Analizamos la operación actual del cliente.
2. **Propuesta a medida:** Diseñamos la solución específica para su negocio.
3. **Implementación ágil:** Desarrollo en sprints cortos con validación continua.
4. **Soporte continuo:** Acompañamiento post-implementación incluido.

## PRECIOS Y MODELO
- No tenemos precios fijos públicos — cada solución es a medida.
- El modelo incluye una tarifa de implementación + suscripción mensual al software.
- Para distribuidores: modelo de licenciamiento para su red de talleres.
- Para agendar diagnóstico: ariel@smartlean.cl o WhatsApp disponible en el sitio.

## CASOS DE ÉXITO
- **Talleres mecánicos chilenos:** +40% rentabilidad, eliminación de pérdida de repuestos, trazabilidad total de horas-hombre, cobros sin fugas, fidelización automatizada.
- El caso "El Fin del Cuaderno" documenta cómo los talleres perdían dinero silenciosamente con el sistema manual y cómo SmartLean lo revirtió.

## INSTRUCCIONES DE COMPORTAMIENTO
- Sé conciso: máximo 3 párrafos por respuesta, salvo que te pidan detalles.
- Usa emojis con moderación (1-2 por respuesta máximo).
- Si preguntan por precio exacto, explica el modelo y ofrece el diagnóstico.
- Si preguntan por algo fuera de SmartLean, redirige amablemente al ecosistema.
- Siempre termina con una pregunta o una propuesta de acción concreta.
- Para agendar: ariel@smartlean.cl

## CONTEXTO DEL USUARIO ACTUAL
- El usuario ha proporcionado su número de contacto: **+56930057769**. Si te pregunta por agendar o contactar, ya tienes su número, ofrécele que Ariel le escribirá pronto.`;

const SUGGESTIONS = [
  '¿Qué es Nexus Garage?',
  '¿Cómo funciona la metodología Lean?',
  'Quiero agendar un diagnóstico',
];

type Msg = { role: 'user' | 'model'; text: string };

export const AIConcierge = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{
    role: 'model',
    text: '¡Hola! Soy el Concierge de **SmartLean**. Puedo contarte sobre nuestra metodología, los módulos Nexus o cómo podemos transformar tu operación. ¿Por dónde empezamos?'
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput('');
    setShowSuggestions(false);
    const newMsgs: Msg[] = [...msgs, { role: 'user', text: msg }];
    setMsgs(newMsgs);
    setLoading(true);
    try {
      const chatHistory = msgs
        .slice(1)
        .map(m => ({ role: m.role, parts: [{ text: m.text }] }));

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM }] },
            contents: [
              ...chatHistory,
              { role: 'user', parts: [{ text: msg }] }
            ]
          })
        }
      );
      const data = await res.json();
      if (data.error) {
        console.error('Gemini API error:', data.error);
        const errorMsg = data.error.message?.includes('API key') 
          ? 'Error de configuración (API Key). Por favor contacta a soporte.'
          : 'Hubo un problema técnico con Gemini 2.0. Ariel ya recibió tu mensaje y número (+56930057769). 🙏';
        setMsgs(m => [...m, { role: 'model', text: errorMsg }]);
      } else {
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No obtuve respuesta. Escríbenos: ariel@smartlean.cl';
        setMsgs(m => [...m, { role: 'model', text: reply }]);
      }
    } catch (err) {
      setMsgs(m => [...m, { role: 'model', text: 'Error de conexión. Escríbenos directamente: **ariel@smartlean.cl** 📧' }]);
    }
    setLoading(false);
  };

  // Simple markdown bold parsing
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) =>
      p.startsWith('**') ? <strong key={i} style={{ color: '#fff', fontWeight: 700 }}>{p.slice(2, -2)}</strong> : p
    );
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{
              width: 400,
              height: 580,
              borderRadius: 24,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(145deg, #0d1526 0%, #0a0f1e 100%)',
              border: '1.5px solid rgba(56,189,248,0.15)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 80px rgba(19,90,236,0.1)',
              fontFamily: 'Inter, sans-serif',
            }}
          >

            {/* ── Header */}
            <div style={{
              padding: '1rem 1.25rem',
              background: 'rgba(6,11,24,0.95)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Shimmer bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.7), transparent)',
                boxShadow: '0 0 16px rgba(56,189,248,0.5)',
              }} className="shimmer-bar" />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  {/* Avatar */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                    background: 'linear-gradient(135deg, #135aec 0%, #0ea5e9 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 24px rgba(19,90,236,0.4)',
                    position: 'relative',
                  }}>
                    <Sparkles size={20} color="#fff" />
                    {/* Online dot */}
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        position: 'absolute', bottom: -2, right: -2,
                        width: 12, height: 12, borderRadius: '50%',
                        background: '#22c55e',
                        border: '2px solid #0a0f1e',
                        boxShadow: '0 0 8px rgba(34,197,94,0.6)',
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '.9rem', color: '#fff', letterSpacing: '-0.01em' }}>
                      Concierge SmartLean
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.35rem', marginTop: '.15rem' }}>
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }}
                      />
                      <span style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#22c55e' }}>
                        Agente IA en línea
                      </span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  style={{
                    width: 32, height: 32, borderRadius: 10, background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'color 0.2s',
                  }}
                >
                  <X size={15} />
                </motion.button>
              </div>
            </div>

            {/* ── Messages */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '1.25rem',
              display: 'flex', flexDirection: 'column', gap: '1rem',
              scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent',
            }}>
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', gap: '0.65rem', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end' }}
                >
                  {m.role === 'model' && (
                    <div style={{
                      width: 28, height: 28, borderRadius: 9, flexShrink: 0,
                      background: 'linear-gradient(135deg, #135aec, #0ea5e9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Bot size={14} color="#fff" />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '80%',
                    padding: '0.8rem 1rem',
                    borderRadius: m.role === 'user' ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
                    background: m.role === 'user'
                      ? 'linear-gradient(135deg, #135aec 0%, #0ea5e9 100%)'
                      : 'rgba(30,41,59,0.7)',
                    border: m.role === 'model' ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    color: m.role === 'user' ? '#fff' : 'rgba(255,255,255,0.8)',
                    fontSize: '.875rem',
                    lineHeight: 1.65,
                    backdropFilter: 'blur(8px)',
                    boxShadow: m.role === 'user' ? '0 4px 20px rgba(19,90,236,0.3)' : 'none',
                  }}>
                    {renderText(m.text)}
                  </div>
                  {m.role === 'user' && (
                    <div style={{
                      width: 28, height: 28, borderRadius: 9, flexShrink: 0,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <User size={14} color="rgba(255,255,255,0.6)" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Loading */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-end' }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: 9, background: 'linear-gradient(135deg, #135aec, #0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={14} color="#fff" />
                  </div>
                  <div style={{
                    padding: '0.8rem 1.1rem',
                    borderRadius: '18px 18px 18px 6px',
                    background: 'rgba(30,41,59,0.7)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', gap: '5px', alignItems: 'center',
                  }}>
                    {[0, 0.2, 0.4].map(delay => (
                      <motion.div
                        key={delay}
                        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay }}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8' }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Suggestion pills */}
              {showSuggestions && msgs.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginTop: '.5rem' }}
                >
                  <span style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.12em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>Preguntas frecuentes</span>
                  {SUGGESTIONS.map((s, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => send(s)}
                      style={{
                        background: 'rgba(19,90,236,0.08)',
                        border: '1px solid rgba(56,189,248,0.2)',
                        borderRadius: 12, padding: '.6rem .9rem',
                        color: 'rgba(56,189,248,0.85)', fontSize: '.8rem',
                        fontWeight: 600, cursor: 'pointer', textAlign: 'left',
                        display: 'flex', alignItems: 'center', gap: '.5rem',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Zap size={11} style={{ flexShrink: 0 }} />
                      {s}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Input */}
            <div style={{
              padding: '1rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(6,11,24,0.7)',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{
                display: 'flex', gap: '.6rem', alignItems: 'center',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14, padding: '.4rem .4rem .4rem .9rem',
                transition: 'border-color 0.2s',
              }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Escribe tu pregunta..."
                  style={{
                    flex: 1, background: 'transparent', border: 'none',
                    color: '#fff', fontSize: '.875rem', outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: input.trim()
                      ? 'linear-gradient(135deg, #135aec 0%, #0ea5e9 100%)'
                      : 'rgba(255,255,255,0.05)',
                    border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: input.trim() ? '#fff' : 'rgba(255,255,255,0.2)',
                    transition: 'all 0.3s',
                    boxShadow: input.trim() ? '0 0 20px rgba(19,90,236,0.4)' : 'none',
                  }}
                >
                  {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={16} />}
                </motion.button>
              </div>
              <div style={{ textAlign: 'center', marginTop: '.6rem' }}>
                <span style={{ fontSize: '.52rem', fontWeight: 600, letterSpacing: '.08em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>
                  Powered by SmartLean IA · Gemini 2.0 Flash
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        style={{
          width: 60, height: 60, borderRadius: 20,
          background: open
            ? 'linear-gradient(135deg, #1e293b, #0f172a)'
            : 'linear-gradient(135deg, #135aec 0%, #0ea5e9 100%)',
          border: open ? '1px solid rgba(255,255,255,0.1)' : 'none',
          boxShadow: open ? 'none' : '0 8px 32px rgba(19,90,236,0.5), 0 0 60px rgba(19,90,236,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', position: 'relative',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} color="rgba(255,255,255,0.6)" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={24} color="#fff" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Notification dot */}
        {!open && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute', top: -4, right: -4,
              width: 16, height: 16, borderRadius: '50%',
              background: '#ef4444',
              border: '2.5px solid #0f172a',
              boxShadow: '0 0 10px rgba(239,68,68,0.6)',
            }}
          />
        )}
      </motion.button>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
