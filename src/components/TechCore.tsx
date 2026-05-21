import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cloud, Bot, Factory, ArrowRight, Zap } from 'lucide-react';

/* ── DATA ─────────────────────────────────────── */
const techData = [
  {
    id: 'ia',
    label: 'IA AGÉNTICA',
    title: 'Inteligencia Artificial (GenAI)',
    subtitle: 'El Sistema que Piensa por Ti',
    icon: Brain,
    color: '#f97316',
    glow: 'rgba(249,115,22,0.25)',
    border: 'rgba(249,115,22,0.4)',
    desc: 'No más clics infinitos. La IA de Nexus entiende lo que escribes, predice los repuestos que más usas y calcula matemáticamente cuándo un cliente necesita su próxima mantención.',
    stats: [{ label: 'Precisión', val: '94%' }, { label: 'Tiempo ahorrado', val: '6h/día' }],
  },
  {
    id: 'lean',
    label: 'LEAN GEMBA',
    title: 'Ecosistema Lean',
    subtitle: 'Gemba Intelligence',
    icon: Factory,
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.25)',
    border: 'rgba(139,92,246,0.4)',
    desc: 'El corazón de la mejora continua. Analizamos el Gemba para identificar desperdicios, optimizar flujos de trabajo y garantizar que cada proceso genere valor real bajo la filosofía Lean.',
    stats: [{ label: 'Reducción de waste', val: '40%' }, { label: 'Ciclos optimizados', val: '12+' }],
  },
  {
    id: 'rpa',
    label: 'RPA ENGINE',
    title: 'Automatización Robótica (RPA)',
    subtitle: 'Tu Asistente Invisible 24/7',
    icon: Bot,
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.25)',
    border: 'rgba(34,197,94,0.4)',
    desc: 'Las tareas aburridas ahora se hacen solas. El sistema captura clientes desde Facebook, envía WhatsApp automáticos y filtra tus reseñas en Google Maps.',
    stats: [{ label: 'Procesos auto.', val: '28' }, { label: 'Uptime', val: '99.9%' }],
  },
  {
    id: 'cloud',
    label: 'CLOUD SYNC',
    title: 'La Nube (Cloud & Analytics)',
    subtitle: 'Control Total desde Cualquier Lugar',
    icon: Cloud,
    color: '#0ea5e9',
    glow: 'rgba(14,165,233,0.25)',
    border: 'rgba(14,165,233,0.4)',
    desc: 'Adiós al riesgo de perder información. Tus datos e inventarios están respaldados en servidores de alta seguridad, disponibles en tu celular, tablet o PC en todo momento.',
    stats: [{ label: 'Disponibilidad', val: '99.99%' }, { label: 'Latencia', val: '<50ms' }],
  },
];

/* ── ANIMATED DOT GRID ───────────────────────── */
const DotGrid = ({ color }: { color: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', opacity: 0.4 }}>
    {Array.from({ length: 36 }).map((_, i) => (
      <div
        key={i}
        className="pulse-dot"
        style={{ 
          width: 2, 
          height: 2, 
          borderRadius: '50%', 
          background: color,
          animationDelay: `${(i % 6 + Math.floor(i / 6)) * 0.15}s`
        }}
      />
    ))}
  </div>
);


/* ── NODE CARD ──────────────────────────────────── */

const NodeCard = ({
  node, isActive, onClick,
}: {
  node: typeof techData[0];
  isActive: boolean;
  onClick: () => void;
}) => {
  const Icon = node.icon;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.97 }}
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        maxWidth: 148,
        borderRadius: 28,
        background: isActive
          ? `linear-gradient(135deg, ${node.glow} 0%, rgba(15,23,42,0.9) 100%)`
          : 'rgba(30,41,59,0.4)',
        border: `1.5px solid ${isActive ? node.border : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: isActive
          ? `0 0 40px ${node.glow}, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`
          : '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease',
        margin: '0 auto',
      }}
    >
      {/* Shimmer bar on active */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${node.color}, transparent)`,
            boxShadow: `0 0 16px ${node.color}`,
          }}
          className="shimmer-bar"
        />
      )}

      {/* Icon */}
      <motion.div
        animate={{ color: isActive ? node.color : 'rgba(148,163,184,0.5)' }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {isActive ? (
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon size={34} strokeWidth={1.4} color={node.color} />
          </motion.div>
        ) : (
          <Icon size={30} strokeWidth={1.3} color="rgba(148,163,184,0.45)" />
        )}
      </motion.div>

      {/* Label */}
      <div style={{
        fontSize: '.6rem',
        fontWeight: 800,
        letterSpacing: '.18em',
        color: isActive ? '#fff' : 'rgba(148,163,184,0.45)',
        textAlign: 'center',
        lineHeight: 1.3,
        transition: 'color 0.3s',
      }}>
        {node.label}
      </div>

      {/* Active dot indicator */}
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            position: 'absolute',
            bottom: 10,
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: node.color,
            boxShadow: `0 0 10px ${node.color}`,
          }}
        />
      )}
    </motion.button>
  );
};

/* ── MAIN COMPONENT ────────────────────────────── */
export const TechCore = () => {
  const [active, setActive] = useState(techData[0]);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-cycle through nodes
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActive(prev => {
        const idx = techData.findIndex(t => t.id === prev.id);
        return techData[(idx + 1) % techData.length];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [active, isAutoPlay]);

  if (!active) return null;

  const ActiveIcon = active.icon;

  return (
    <section
      id="tecnologia"
      style={{
        padding: '9rem 0',
        background: 'var(--void)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG radial glow — Nexus Lean style */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 0%, #1e3a8a 0%, #0f172a 55%, #0f172a 100%)',
        opacity: 0.75,
        pointerEvents: 'none',
      }} />
      {/* Top shimmer bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.55), transparent)',
        boxShadow: '0 0 24px rgba(56,189,248,0.4)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1.1rem', borderRadius: 999,
              border: '1px solid rgba(59,130,246,0.3)',
              background: 'rgba(59,130,246,0.08)',
              fontSize: '.65rem', fontWeight: 800, letterSpacing: '.25em',
              textTransform: 'uppercase', color: '#60a5fa',
              marginBottom: '1.5rem',
              boxShadow: '0 0 20px rgba(59,130,246,0.12)',
            }}>
              <Zap size={11} />
              Excelencia Operacional 5.0
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, margin: 0 }}
          >
            <span className="gradient-title">Infraestructura de</span>
            <br />
            <span className="gradient-em">Nueva Generación</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginTop: '1.25rem', color: 'var(--text-2)', fontSize: '1.05rem', maxWidth: 520, margin: '1.25rem auto 0' }}
          >
            Cuatro pilares tecnológicos integrados en un único ecosistema inteligente.
          </motion.p>
        </div>

        {/* ── Grid ── */}
        <div className="grid-responsive-2" style={{ gap: '3rem', alignItems: 'center' }}>

          {/* LEFT: Node Map — CSS Grid 3×3 (always centered) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridTemplateRows: '1fr 1fr 1fr',
              gap: '0.75rem',
              width: '100%',
              maxWidth: 480,
              aspectRatio: '1/1',
              position: 'relative',
            }}>
              {/* SVG overlay for connection lines */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                <defs><filter id="gl2"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
                {[
                  { node: techData[0], x1: '16.5%', y1: '16.5%' },
                  { node: techData[1], x1: '83.5%', y1: '16.5%' },
                  { node: techData[2], x1: '16.5%', y1: '83.5%' },
                  { node: techData[3], x1: '83.5%', y1: '83.5%' },
                ].map(({ node, x1, y1 }) => (
                  <motion.line
                    key={node.id}
                    x1={x1} y1={y1} x2="50%" y2="50%"
                    stroke={active.id === node.id ? node.color : 'rgba(255,255,255,0.06)'}
                    strokeWidth={active.id === node.id ? 1.5 : 1}
                    strokeDasharray="5 5"
                    filter={active.id === node.id ? 'url(#gl2)' : undefined}
                    animate={{ opacity: active.id === node.id ? 1 : 0.35 }}
                    transition={{ duration: 0.4 }}
                  />
                ))}
              </svg>

              {/* Row 1: IA — empty — Lean */}
              <div style={{ gridColumn: 1, gridRow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <NodeCard node={techData[0]} isActive={active.id === 'ia'} onClick={() => { setActive(techData[0]); setIsAutoPlay(false); }} />
              </div>
              <div style={{ gridColumn: 2, gridRow: 1 }} />
              <div style={{ gridColumn: 3, gridRow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <NodeCard node={techData[1]} isActive={active.id === 'lean'} onClick={() => { setActive(techData[1]); setIsAutoPlay(false); }} />
              </div>

              {/* Row 2: empty — SMARTLEAN — empty */}
              <div style={{ gridColumn: 1, gridRow: 2 }} />
              <div style={{ gridColumn: 2, gridRow: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: '100%', height: '100%',
                    borderRadius: 28,
                    background: 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.99))',
                    border: '1.5px solid rgba(56,189,248,0.25)',
                    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                    boxShadow: '0 0 50px rgba(19,90,236,0.28), inset 0 1px 0 rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', position: 'relative',
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.8), transparent)', boxShadow: '0 0 18px rgba(56,189,248,0.6)' }} className="shimmer-bar" />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DotGrid color="#38bdf8" /></div>
                  <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', background: 'rgba(10,16,36,0.8)', padding: '0.45rem 0.75rem', borderRadius: 10, backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '.42rem', fontWeight: 800, letterSpacing: '.4em', color: '#38bdf8', marginBottom: '.25rem', textTransform: 'uppercase' }}>METODOLOGÍA</div>
                    <div style={{ fontSize: '.75rem', fontWeight: 900, color: '#fff', letterSpacing: '.08em', textTransform: 'uppercase' }}>SMARTLEAN</div>
                  </div>
                </motion.div>
              </div>
              <div style={{ gridColumn: 3, gridRow: 2 }} />

              {/* Row 3: RPA — empty — Cloud */}
              <div style={{ gridColumn: 1, gridRow: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <NodeCard node={techData[2]} isActive={active.id === 'rpa'} onClick={() => { setActive(techData[2]); setIsAutoPlay(false); }} />
              </div>
              <div style={{ gridColumn: 2, gridRow: 3 }} />
              <div style={{ gridColumn: 3, gridRow: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <NodeCard node={techData[3]} isActive={active.id === 'cloud'} onClick={() => { setActive(techData[3]); setIsAutoPlay(false); }} />
              </div>
            </div>
          </motion.div>


          {/* RIGHT: Info Panel */}

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  borderRadius: 28,
                  background: 'linear-gradient(135deg, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.8) 100%)',
                  border: `1.5px solid ${active.border}`,
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  padding: '2.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 0 60px ${active.glow}, 0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`,
                }}
              >
                {/* Shimmer bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${active.color}, transparent)`,
                  boxShadow: `0 0 20px ${active.color}`,
                }} className="shimmer-bar" />

                {/* Corner glow */}
                <div style={{
                  position: 'absolute', top: -40, right: -40, width: 160, height: 160,
                  borderRadius: '50%', background: active.glow,
                  filter: 'blur(40px)', pointerEvents: 'none',
                }} />

                {/* Icon + Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      width: 60, height: 60, borderRadius: 18, flexShrink: 0,
                      background: `${active.color}18`,
                      border: `1.5px solid ${active.border}`,
                      boxShadow: `0 0 24px ${active.glow}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: active.color,
                    }}
                  >
                    <ActiveIcon size={28} strokeWidth={1.4} />
                  </motion.div>
                  <div>
                    <h3 style={{
                      fontSize: '1.25rem', fontWeight: 900, color: '#fff',
                      letterSpacing: '-0.02em', margin: 0,
                    }}>
                      {active.title}
                    </h3>
                    <p style={{
                      fontSize: '.7rem', fontWeight: 800,
                      color: active.color,
                      textTransform: 'uppercase', letterSpacing: '.18em',
                      margin: '.3rem 0 0',
                    }}>
                      {active.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  color: 'var(--text-2)', lineHeight: 1.75, fontSize: '1rem',
                  marginBottom: '2rem',
                }}>
                  {active.desc}
                </p>

                {/* Stats row */}
                <div style={{
                  display: 'flex', gap: '1rem', marginBottom: '2rem',
                }}>
                  {active.stats.map((s, i) => (
                    <div key={i} style={{
                      flex: 1,
                      background: `${active.color}0d`,
                      border: `1px solid ${active.border}`,
                      borderRadius: 14, padding: '0.85rem 1rem',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '1.4rem', fontWeight: 900, color: active.color }}>
                        {s.val}
                      </div>
                      <div style={{ fontSize: '.6rem', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: '.2rem' }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    const messageMap: Record<string, string> = {
                      ia: 'Cuéntame más sobre la IA agéntica en el ecosistema Nexus y cómo optimiza los repuestos.',
                      lean: '¿Cómo funciona la consultoría Lean Gemba y la eliminación de desperdicios?',
                      rpa: '¿Qué tipo de automatizaciones (RPA) puedo implementar en mi negocio?',
                      cloud: 'Cuéntame sobre la infraestructura en la nube y la seguridad de los datos.',
                    };
                    const msg = messageMap[active.id] || `Cuéntame más sobre ${active.title}`;
                    window.dispatchEvent(new CustomEvent('open-concierge', { detail: { message: msg } }));
                  }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.6rem',
                    fontSize: '.7rem', fontWeight: 800, letterSpacing: '.15em',
                    textTransform: 'uppercase', color: active.color,
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Explorar arquitectura <ArrowRight size={14} />
                </motion.button>

                {/* Node selector dots */}
                <div style={{
                  position: 'absolute', bottom: '1.5rem', right: '1.5rem',
                  display: 'flex', gap: '.4rem',
                }}>
                  {techData.map(t => (
                    <motion.button
                      key={t.id}
                      onClick={() => { setActive(t); setIsAutoPlay(false); }}
                      whileHover={{ scale: 1.3 }}
                      style={{
                        width: t.id === active.id ? 20 : 6,
                        height: 6, borderRadius: 99,
                        background: t.id === active.id ? active.color : 'rgba(255,255,255,0.15)',
                        border: 'none', cursor: 'pointer', padding: 0,
                        transition: 'width 0.3s ease, background 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
