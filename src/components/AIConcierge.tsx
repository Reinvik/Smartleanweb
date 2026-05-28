import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Loader2, MessageCircle, Zap } from 'lucide-react';



const SYSTEM = `Eres el Concierge IA de SmartLean, una consultora tecnológica chilena de élite. Respondes en español chileno, eres directo, cálido, experto y entusiasta.

⚠️ REGLA DE ORO (CRÍTICA): Si el usuario desea agendar un diagnóstico, obtener una propuesta, recibir información personalizada, o muestra interés en mejorar su negocio, tu prioridad absoluta es SOLICITARLE su nombre y número de WhatsApp en ese mismo instante. NO le entregues los datos de contacto de Ariel (+56930057769) ni le digas que use el botón "Contactar" hasta que él te haya entregado sus propios datos. Pídelos de forma natural y cálida (ej. "¡Excelente! Para que Ariel pueda contactarte y agendemos tu diagnóstico gratuito, ¿me dejas tu nombre y número de WhatsApp?").

Nunca dices que no puedes responder — si no tienes información exacta, orientas y ofreces agendar un diagnóstico.

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
1. **Diagnóstico gratuito (30 min):** El objetivo principal es conocernos, entender qué es lo que buscas para tu negocio y, en conjunto, buscar una solución a la medida del problema que quieres solucionar. No es una llamada de ventas fría, sino una sesión colaborativa de exploración.
2. **Propuesta a medida:** Diseñamos la solución específica para su negocio.
3. **Implementación ágil:** Desarrollo en sprints cortos con validación continua.
4. **Soporte continuo:** Acompañamiento post-implementación incluido.

## PRECIOS Y MODELO
- No tenemos precios fijos públicos — cada solución es a medida.
- El modelo incluye una tarifa de implementación + suscripción mensual al software.
- Para distribuidores: modelo de licenciamiento para su red de talleres.
- Para agendar diagnóstico: solicitar el contacto (nombre y WhatsApp) del usuario primero.

## CASOS DE ÉXITO
- **Talleres mecánicos chilenos:** +40% rentabilidad, eliminación de pérdida de repuestos, trazabilidad total de horas-hombre, cobros sin fugas, fidelización automatizada.
- El caso "El Fin del Cuaderno" documenta cómo los talleres perdían dinero silenciosamente con el sistema manual y cómo SmartLean lo revirtió.

## INSTRUCCIONES DE COMPORTAMIENTO — MUY IMPORTANTE
- Sé conciso: máximo 3 párrafos por respuesta, salvo que te pidan detalles.
- Usa emojis con moderación (1-2 por respuesta máximo).
- Si preguntan por precio exacto, explica el modelo y ofrece el diagnóstico.
- Si preguntan por algo fuera de SmartLean, redirige amablemente al ecosistema Nexus en nexusnetwork.cl.
- Siempre termina con una pregunta o una propuesta de acción concreta.
- **CAPTURA DE LEAD OBLIGATORIA (¡CRÍTICO!):** Cuando el usuario muestre interés en agendar, mejorar su negocio o quiera más información, en lugar de decirle que escriba a WhatsApp o use el botón, **PÍDELE directamente en tu respuesta su nombre y número de WhatsApp** con una frase amigable (ej: 'Para que Ariel te contacte y agendemos tu diagnóstico gratuito, ¿me dejas tu nombre y número de WhatsApp?'). Esto es obligatorio y prioritario.
- Si el usuario da su teléfono, agradécele y dile que Ariel le escribirá muy pronto. Luego puedes mencionarle que también puede presionar el botón "Contactar" en la parte superior de la página para escribirle directo por WhatsApp al +56930057769.
- Si el usuario quiere contacto inmediato: dile que presione el botón **"Contactar"** en la parte superior del sitio, o que escriba directamente al WhatsApp **+56930057769**.

## CONTEXTO
- El fundador es **Ariel**. WhatsApp directo: **+56930057769**.
- El botón "Contactar" en la parte superior del sitio lleva directamente a WhatsApp con Ariel.`;

const SUGGESTIONS = [
  '¿Qué es Nexus Garage?',
  '¿Cómo funciona la metodología Lean?',
  'Quiero agendar un diagnóstico',
];

// Detect Chilean phone numbers in text (e.g. +569XXXXXXXX, 569XXXXXXXX, 9XXXXXXXX, etc.)
const extractPhone = (text: string): string | null => {
  const cleaned = text.replace(/[-\s()]/g, '');
  const match = cleaned.match(/(?:\+?56)?9\d{8}/);
  if (match) {
    return match[0].replace('+', '');
  }
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

const renderMessageContent = (text: string, role: 'user' | 'model') => {
  if (!text) return null;

  const lines = text.split('\n');

  return lines.map((line, lineIndex) => {
    // Check if it's a list item
    const isBulletList = line.trim().startsWith('* ') || line.trim().startsWith('- ');
    const isNumberedList = /^\d+\.\s/.test(line.trim());
    
    // Check if it's a heading
    const headingMatch = line.trim().match(/^(#{1,6})\s+(.*)$/);
    const headingLevel = headingMatch ? headingMatch[1].length : 0;

    let content = line;
    if (headingMatch) {
      content = headingMatch[2];
    } else if (isBulletList) {
      content = line.trim().substring(2);
    } else if (isNumberedList) {
      content = line.trim().replace(/^\d+\.\s/, '');
    }

    // Process bold (**text**) and italic (*text*)
    const boldParts = content.split('**');
    const processedContent = boldParts.flatMap((bPart, bIndex) => {
      const isBold = bIndex % 2 === 1;
      
      const italicParts = bPart.split('*');
      const subParts = italicParts.map((iPart, iIndex) => {
        const isItalic = iIndex % 2 === 1;
        if (isItalic) {
          return <em key={`i-${iIndex}`} style={{ fontStyle: 'italic' }}>{iPart}</em>;
        }
        return iPart;
      });

      if (isBold) {
        return (
          <strong 
            key={`b-${bIndex}`} 
            style={{ 
              fontWeight: 700, 
              color: role === 'user' ? 'inherit' : 'white' 
            }}
          >
            {subParts}
          </strong>
        );
      }
      return subParts;
    });

    if (headingLevel > 0) {
      const fontSize = headingLevel === 1 ? '1.15rem' : headingLevel === 2 ? '1.05rem' : '0.95rem';
      return (
        <div 
          key={lineIndex} 
          style={{ 
            fontWeight: 800, 
            fontSize, 
            marginTop: '0.75rem', 
            marginBottom: '0.4rem', 
            color: role === 'user' ? 'inherit' : 'white' 
          }}
        >
          {processedContent}
        </div>
      );
    }

    if (isBulletList) {
      return (
        <div key={lineIndex} style={{ display: 'flex', gap: '0.4rem', marginLeft: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ color: role === 'user' ? 'inherit' : 'var(--em)' }}>•</span>
          <span>{processedContent}</span>
        </div>
      );
    }

    if (isNumberedList) {
      const match = line.trim().match(/^(\d+)\.\s/);
      const num = match ? match[1] : (lineIndex + 1).toString();
      return (
        <div key={lineIndex} style={{ display: 'flex', gap: '0.4rem', marginLeft: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontWeight: 700, color: role === 'user' ? 'inherit' : 'var(--em)' }}>{num}.</span>
          <span>{processedContent}</span>
        </div>
      );
    }

    if (line.trim() === '') {
      return <div key={lineIndex} style={{ height: '0.4rem' }} />;
    }

    return (
      <p key={lineIndex} style={{ margin: '0 0 0.4rem 0' }}>
        {processedContent}
      </p>
    );
  });
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

    const OLLAMA_URL = import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434';
    const MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'llama3.2';
    const isDev = import.meta.env.DEV;
    const endpoint = isDev ? '/api/ollama/api/chat' : `${OLLAMA_URL}/api/chat`;

    try {
      // Build history for Ollama (role: 'user' | 'assistant')
      const history = newMsgs.slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const response = await fetch(
        endpoint,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              { role: 'system', content: SYSTEM },
              ...history,
              { role: 'user', content: msg }
            ],
            stream: false,
            options: {
              temperature: 0.75
            }
          })
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const reply = data?.message?.content || 'Lo siento, no pude generar una respuesta. Intenta de nuevo.';

      const finalMsgs = [...newMsgs, { role: 'model' as const, text: reply }];
      setMsgs(finalMsgs);

      // Detectar teléfono y capturar lead
      const phone = extractPhone(msg);
      if (phone && !leadSentRef.current) {
        leadSentRef.current = true;
        setLeadSent(true);
        const name = extractName(newMsgs);
        
        // Log lead local
        console.info('[SmartLean Lead]', { name, phone, timestamp: new Date().toISOString() });
        
        // Enviar lead al backend
        fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone,
            name,
            conversation: newMsgs.map(m => ({ role: m.role, text: m.text }))
          })
        })
        .then(async (res) => {
          if (!res.ok) {
            const errText = await res.text();
            console.error('Error al registrar lead en backend:', errText);
          } else {
            console.log('Lead registrado con éxito en el backend.');
          }
        })
        .catch(err => {
          console.error('Error de red al enviar lead:', err);
        });
      }
    } catch (err: any) {
      setMsgs([...newMsgs, {
        role: 'model',
        text: `⚠️ Error al conectar con la IA (Ollama): ${err?.message ?? 'desconocido'}. Asegúrate de que Ollama está corriendo y el modelo "${MODEL}" está descargado. Escríbenos directo al WhatsApp: +56930057769`
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
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} /> En línea · Nexus IA (Ollama)
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
                    {renderMessageContent(m.text, m.role)}
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
                <span>¡Ariel ya recibió tu contacto y te escribirá pronto!</span>
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
