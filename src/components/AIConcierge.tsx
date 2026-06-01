import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Loader2, MessageCircle, Zap, User } from 'lucide-react';

// Genera sessionId único por conversación
const SESSION_ID = crypto.randomUUID();

const SYSTEM = `Eres el Concierge IA de SmartLean, una consultora tecnológica chilena. Tienes dos tareas: resolver dudas con respuestas breves y de alto valor, y cuando sea natural, invitar al usuario a dejar su contacto para hablar con Ariel.

⚠️ REGLAS CRÍTICAS — LÉELAS BIEN:
1. **Respuestas cortas**: Máximo 2-3 frases. Nada de párrafos largos ni discursos corporativos.
2. **Responde la pregunta primero**: SIEMPRE responde lo que te preguntan antes de cualquier otra cosa.
3. **Estilo chileno**: Usa lenguaje coloquial y cálido ("¡Qué buena!", "Al tiro", "Bacán", "Claro que sí").
4. **Pedir contacto — UNA sola vez**: Solo sugiere dejar nombre y WhatsApp cuando el usuario haya hecho al menos 2-3 preguntas y muestre interés real. Una vez que lo hayas sugerido, NO lo repitas más en esa conversación, aunque el usuario no lo haya dado. Si ya lo pediste, nunca más lo menciones.
5. **No inventes datos**: Si no sabes algo, dilo con honestidad y ofrece conectar con Ariel.
6. **Cuando pidas el contacto**: Hazlo de forma muy natural al final de UNA respuesta, por ejemplo: "Si te acomoda, puedes dejarme tu nombre y WhatsApp y Ariel te da el detalle personalmente." — y solo una vez.`;

const SUGGESTIONS = [
  '¿Qué es Nexus Garage?',
  '¿Cómo funciona la metodología Lean?',
  'Quiero agendar un diagnóstico',
];

// Detect Chilean phone numbers in text (e.g. +569XXXXXXXX, 569XXXXXXXX, 9XXXXXXXX, etc.)
const extractPhone = (text: string): string | null => {
  // Primero eliminamos todo lo que no sea número o el signo +
  const cleaned = text.replace(/[^0-9+]/g, '');
  // Buscamos un patrón de teléfono chileno (con o sin +56, con o sin 9, y 8 dígitos)
  const match = cleaned.match(/(?:\+?56)?(9)?(\d{8})/);
  if (match) {
    // Devolvemos el número con 9 y los 8 dígitos, asegurando formato de 9 dígitos sin el +
    const digits = match[2];
    return `9${digits}`;
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

type Msg = { role: 'user' | 'model' | 'ariel'; text: string };

export const AIConcierge = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{
    role: 'model',
    text: '¡Hola! Por acá el Concierge de **SmartLean** 🚀. Estoy aquí para aclarar tus dudas sobre nuestros módulos de software, control de talleres o metodología Lean. ¿En qué te puedo ayudar hoy?'
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [leadSent, setLeadSent] = useState(false);
  const [arielOnline, setArielOnline] = useState(false);
  const msgsRef = useRef(msgs);
  const loadingRef = useRef(loading);
  const leadSentRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    msgsRef.current = msgs;
  }, [msgs]);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  // ── Polling de respuestas manuales de Ariel ──────────────────────────
  const startPolling = useCallback(() => {
    if (pollingRef.current) return; // Ya está corriendo
    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/poll?sessionId=${SESSION_ID}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data?.reply) {
          setArielOnline(true);
          setMsgs(prev => [...prev, { role: 'ariel' as const, text: data.reply }]);
        }
      } catch {
        // Silencioso
      }
    }, 3000);
  }, []);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  // Limpiar polling al desmontar
  useEffect(() => () => stopPolling(), [stopPolling]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loadingRef.current) return;
    setInput('');
    setShowSuggestions(false);
    const newMsgs: Msg[] = [...msgsRef.current, { role: 'user', text: msg }];
    setMsgs(newMsgs);
    setLoading(true);

    const MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'gemma4:e4b';

    // Historial en formato OpenAI/Gemini (excluir mensajes de Ariel del historial de IA)
    const history = newMsgs.slice(0, -1)
      .filter(m => m.role !== 'ariel')
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

    const messages = [
      ...history,
      { role: 'user', content: msg }
    ];

    // ── Intentar Ollama local primero (dev, silencioso) ──
    const tryOllama = async (): Promise<string | null> => {
      try {
        const res = await fetch('/api/ollama/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: MODEL,
            messages: [{ role: 'system', content: SYSTEM }, ...messages],
            stream: false,
            keep_alive: '60m',
            options: { temperature: 0.75 }
          }),
          signal: AbortSignal.timeout(8000)
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data?.message?.content || null;
      } catch {
        return null;
      }
    };

    // ── Fallback: Gemini vía /api/chat (notifica Telegram + guarda en Supabase) ──
    const tryGemini = async (): Promise<string> => {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, system: SYSTEM, sessionId: SESSION_ID })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data?.message?.content || 'Lo siento, intenta de nuevo.';
    };

    try {
      let reply = await tryOllama();
      const usedGemini = !reply;

      if (usedGemini) {
        console.info('[Nexus IA] Usando Gemini + notificando a Ariel en Telegram...');
        reply = await tryGemini();
        // Activar polling para capturar respuesta manual de Ariel
        startPolling();
      }

      const finalMsgs = [...newMsgs, { role: 'model' as const, text: reply! }];
      setMsgs(finalMsgs);

      // ── Captura de lead ──────────────────────────────────────────────
      const phone = extractPhone(msg);
      if (phone && !leadSentRef.current) {
        leadSentRef.current = true;
        setLeadSent(true);
        const name = extractName(newMsgs);
        console.info('[SmartLean Lead]', { name, phone, timestamp: new Date().toISOString() });

        const isDev = import.meta.env.DEV;
        const localBotToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
        const localChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

        if (isDev && localBotToken && localChatId) {
          const dateStr = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });
          const conversationText = newMsgs.slice(-10)
            .map(m => `${m.role === 'user' ? '👤' : '🤖'} ${m.text.substring(0, 200)}`)
            .join('\n\n');
          fetch(`https://api.telegram.org/bot${localBotToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: localChatId,
              text: `🔔 *NUEVO LEAD — SmartLean*\n\n• *Nombre:* ${name}\n• *Teléfono:* ${phone}\n• *Fecha:* ${dateStr}\n\n📱 [WhatsApp](https://wa.me/56${phone.replace(/\D/g, '')})\n\n${conversationText}`,
              parse_mode: 'Markdown'
            })
          }).catch(console.error);
        } else {
          fetch('/api/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, name, conversation: newMsgs.map(m => ({ role: m.role, text: m.text })) })
          }).catch(console.error);
        }
      }
    } catch (err: any) {
      console.error('Error en Nexus IA:', err);
      setMsgs([...newMsgs, {
        role: 'model',
        text: 'Nuestro agente IA se tomó un respiro, por favor contáctame al +56930057769.'
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

  // Pre-load Ollama model on mount to avoid 12-second cold start delay
  useEffect(() => {
    const OLLAMA_URL = import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434';
    const MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'gemma4:e4b';
    const isDev = import.meta.env.DEV;
    const endpoint = isDev ? '/api/ollama/api/generate' : `${OLLAMA_URL}/api/generate`;

    console.log(`Preloading Ollama model "${MODEL}" to warm up connection...`);
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: MODEL })
    })
    .then(() => console.log(`Ollama model "${MODEL}" warmed up and ready.`))
    .catch(err => console.warn('Could not warm up Ollama model:', err));
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
                <div style={{ width: 40, height: 40, borderRadius: 12, background: arielOnline ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'var(--em)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .5s' }}>
                  {arielOnline ? <User color="white" size={22} /> : <Bot color="white" size={24} />}
                </div>
                <div>
                  <h3 style={{ fontSize: '.9rem', margin: 0 }}>{arielOnline ? 'Ariel — SmartLean' : 'Nexus Concierge'}</h3>
                  <span style={{ fontSize: '.65rem', color: 'var(--text-2)', display: 'flex', alignItems: 'center', gap: '.3rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                    {arielOnline ? 'Ariel está respondiendo en vivo ✨' : 'En línea · Nexus IA'}
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
                  {(m.role === 'model' || m.role === 'ariel') && (
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: m.role === 'ariel' ? 'rgba(34,197,94,0.15)' : 'rgba(19,90,236,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      {m.role === 'ariel'
                        ? <User size={14} color="#22c55e" />
                        : <Zap size={14} color="var(--em)" />}
                    </div>
                  )}
                  <div style={{ maxWidth: '85%' }}>
                    {m.role === 'ariel' && (
                      <div style={{ fontSize: '.6rem', fontWeight: 700, color: '#22c55e', marginBottom: '.25rem', letterSpacing: '.05em', textTransform: 'uppercase' }}>
                        Ariel · En vivo
                      </div>
                    )}
                    <div style={{
                      padding: '1rem',
                      borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      background: m.role === 'user' ? 'var(--em)' : m.role === 'ariel' ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.03)',
                      color: m.role === 'user' ? 'white' : 'var(--text-1)',
                      fontSize: '.9rem',
                      lineHeight: 1.5,
                      border: m.role === 'user' ? 'none' : m.role === 'ariel' ? '1px solid rgba(34,197,94,0.3)' : '1px solid var(--border)'
                    }}>
                      {renderMessageContent(m.text, m.role === 'ariel' ? 'model' : m.role)}
                    </div>
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
