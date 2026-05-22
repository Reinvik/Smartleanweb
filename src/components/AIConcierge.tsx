import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Loader2, MessageCircle, Zap } from 'lucide-react';



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

**Nexus Network / Hub:** Sistema de gestión multi-sucursal y análisis de red de talleres. Disponibles en nexusnetwork.cl.

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
- Para agendar diagnóstico: WhatsApp +56930057769 o presiona el botón "Contactar" arriba en el menú.

## CASOS DE ÉXITO
- **Talleres mecánicos chilenos:** +40% rentabilidad, eliminación de pérdida de repuestos, trazabilidad total de horas-hombre, cobros sin fugas, fidelización automatizada.
- El caso "El Fin del Cuaderno" documenta cómo los talleres perdían dinero silenciosamente con el sistema manual y cómo SmartLean lo revirtió.

## INSTRUCCIONES DE COMPORTAMIENTO — MUY IMPORTANTE
- Sé conciso: máximo 3 párrafos por respuesta, salvo que te pidan detalles.
- Usa emojis con moderación (1-2 por respuesta máximo).
- Si preguntan por precio exacto, explica el modelo y ofrece el diagnóstico.
- Si preguntan por algo fuera de SmartLean, redirige amablemente al ecosistema Nexus en nexusnetwork.cl.
- Siempre termina con una pregunta o una propuesta de acción concreta.
- **CAPTURA DE LEAD — OBLIGATORIO:** Después de 2-3 intercambios de mensajes, DEBES pedir el nombre y número de teléfono del usuario de forma natural y amigable. Por ejemplo: "Para que Ariel Mella pueda contactarte directamente con una propuesta a medida, ¿me puedes dejar tu nombre y número de WhatsApp?"
- Si el usuario da su teléfono, agradécele y dile que Ariel Mella le escribirá muy pronto. Luego puedes mencionarle que también puede presionar el botón "Contactar" en la parte superior de la página para escribirle directo por WhatsApp al +56930057769.
- Si el usuario quiere contacto inmediato: dile que presione el botón **"Contactar"** en la parte superior del sitio, o que escriba directamente al WhatsApp **+56930057769**.

## CONTEXTO
- El fundador es **Ariel Mella**. WhatsApp directo: **+56930057769**.
- El botón "Contactar" en la parte superior del sitio lleva directamente a WhatsApp con Ariel.`;

const SUGGESTIONS = [
  '¿Qué es Nexus Garage?',
  '¿Cómo funciona la metodología Lean?',
  'Quiero agendar un diagnóstico',
];

// Detect Chilean phone numbers in text
const extractPhone = (text: string): string | null => {
  const match = text.match(/(\+?56)?\s?9?\s?\d{4}\s?\d{4}/);
  if (match) return match[0].replace(/\s/g, '');
  return null;
};

// Extract name from conversation
const extractName = (msgs: Msg[]): string => {
  for (const m of msgs) {
    if (m.role === 'user') {
      // Look for short messages that are likely a name (1-3 words, no numbers)
      const text = m.text.trim();
      if (text.split(' ').length <= 3 && !/\d/.test(text) && text.length < 40) {
        return text;
      }
    }
  }
  return 'Sin nombre';
};

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
  const [leadSent, setLeadSent] = useState(false);
  const msgsRef = useRef(msgs);
  const loadingRef = useRef(loading);
  const leadSentRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    msgsRef.current = msgs;
  }, [msgs]);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loadingRef.current) return;
    setInput('');
    setShowSuggestions(false);
    const newMsgs: Msg[] = [...msgsRef.current, { role: 'user', text: msg }];
    setMsgs(newMsgs);
    setLoading(true);

    const GEMINI_KEY = 'AIzaSyAxCdAq1xl58O7MZ4reX4AJo9lLjXxMzCM';
    const MODEL = 'gemini-2.0-flash';

    try {
      // Build history excluding the initial greeting (first model message)
      const history = newMsgs.slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM }] },
            contents: [
              ...history,
              { role: 'user', parts: [{ text: msg }] }
            ],
            generationConfig: {
              temperature: 0.75,
              maxOutputTokens: 512,
            }
          })
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Lo siento, no pude generar una respuesta. Intenta de nuevo.';

      const finalMsgs = [...newMsgs, { role: 'model' as const, text: reply }];
      setMsgs(finalMsgs);

      // Detectar teléfono y capturar lead
      const phone = extractPhone(msg);
      if (phone && !leadSentRef.current) {
        leadSentRef.current = true;
        setLeadSent(true);
        const name = extractName(newMsgs);
        // Log lead (no backend needed — just console for now)
        console.info('[SmartLean Lead]', { name, phone, timestamp: new Date().toISOString() });
      }
    } catch (err: any) {
      setMsgs([...newMsgs, {
        role: 'model',
        text: `⚠️ Error al conectar con la IA: ${err?.message ?? 'desconocido'}. Escríbenos directo al WhatsApp: +56930057769`
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Escucha el evento disparado desde las tarjetas de pilares
  useEffect(() => {
    const handleOpenChat = (e: CustomEvent<{ message: string }>) => {
      setOpen(true);
      setShowSuggestions(false);
      if (e.detail?.message) {
        // Pequeño delay para que la animación de apertura se vea primero
        setTimeout(() => send(e.detail.message), 350);
      }
    };
    window.addEventListener('smartlean:open-chat', handleOpenChat as EventListener);
    return () => window.removeEventListener('smartlean:open-chat', handleOpenChat as EventListener);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
          width: 64, height: 64, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--em) 0%, var(--sky) 100%)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(19,90,236,0.4)',
          color: 'white'
        }}
      >
        <MessageCircle size={28} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="glass-panel"
            style={{
              position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1001,
              width: '100%', maxWidth: 420, height: '80vh', maxHeight: 600,
              borderRadius: 24, display: 'flex', flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.5rem', background: 'rgba(19,90,236,0.1)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--em)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot color="white" size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '.9rem', margin: 0 }}>Nexus Concierge</h3>
                  <span style={{ fontSize: '.65rem', color: 'var(--text-2)', display: 'flex', alignItems: 'center', gap: '.3rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} /> En línea · Gemini 2.0 Flash
                  </span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: '.8rem' }}>
                  {m.role === 'model' && (
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(19,90,236,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Zap size={14} color="var(--em)" />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '85%',
                    padding: '1rem',
                    borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: m.role === 'user' ? 'var(--em)' : 'rgba(255,255,255,0.03)',
                    color: m.role === 'user' ? 'white' : 'var(--text-1)',
                    fontSize: '.9rem',
                    lineHeight: 1.5,
                    border: m.role === 'user' ? 'none' : '1px solid var(--border)'
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', gap: '.8rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(19,90,236,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader2 size={14} className="animate-spin" color="var(--em)" />
                  </div>
                  <div style={{ padding: '1rem', borderRadius: '18px 18px 18px 4px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '.3rem' }}>
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--em)' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {showSuggestions && (
              <div style={{ padding: '0 1.5rem 1rem', display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      padding: '.5rem .8rem', borderRadius: 12,
                      background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                      color: 'var(--text-2)', fontSize: '.75rem', cursor: 'pointer',
                      transition: 'all .2s'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--em)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Lead captured confirmation */}
            {leadSent && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  margin: '0 1rem 0.75rem',
                  padding: '0.65rem 1rem',
                  borderRadius: 12,
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  fontSize: '.72rem', color: '#22c55e', fontWeight: 700,
                }}
              >
                <span>✅</span>
                <span>¡Ariel Mella ya recibió tu contacto y te escribirá pronto!</span>
                <a
                  href="https://wa.me/56930057769"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: 'auto', color: '#22c55e', textDecoration: 'underline', whiteSpace: 'nowrap' }}
                >
                  Escribir ahora →
                </a>
              </motion.div>
            )}

            {/* Input */}
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '.8rem' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Escribe tu mensaje..."
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '.8rem 1rem', color: 'white', fontSize: '.9rem',
                  outline: 'none'
                }}
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'var(--em)', border: 'none', color: 'white',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
