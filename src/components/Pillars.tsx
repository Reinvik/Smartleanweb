import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Cpu, BarChart3, Users2, TrendingUp, Clock, Zap, DollarSign, BarChart, X, ArrowRight, CheckCircle2 } from 'lucide-react';

const pillars = [
  {
    n: '01',
    title: 'Lean: Flujo Físico',
    subtitle: 'Eliminación de Desperdicios',
    desc: 'Identificamos cada cuello de botella en el flujo real de tu operación antes de automatizar. Mapeamos el Gemba, medimos y actuamos.',
    smart: 'Reducción del 20% en tiempos de ciclo en 60 días.',
    detail: [
      'Mapeo de flujo de valor (VSM) completo',
      'Identificación de los 7 desperdicios Lean',
      'Rediseño del flujo físico de la operación',
      'KPIs de takt time y throughput instalados',
    ],
    icon: Target,
    color: '#00e5a0',
    bg: 'linear-gradient(135deg, #00241a 0%, #001a30 100%)',
  },
  {
    n: '02',
    title: 'IA & Automatización',
    subtitle: 'Inteligencia Invisible',
    desc: 'Agentes de IA conectados a tu base de datos guían la gestión, generan informes y ejecutan procesos en modo 100% desatendido.',
    smart: 'Autonomía operativa 24/7 en procesos críticos.',
    detail: [
      'Agente IA conectado a Supabase en tiempo real',
      'Automatización RPA de flujos administrativos',
      'Generación automática de reportes ejecutivos',
      'Alertas predictivas antes de que ocurran fallas',
    ],
    icon: Cpu,
    color: '#38bdf8',
    bg: 'linear-gradient(135deg, #001a2e 0%, #00101e 100%)',
  },
  {
    n: '03',
    title: 'Visibilidad Predictiva',
    subtitle: 'Datos en Tiempo Real',
    desc: 'Un dashboard centralizado reemplaza las suposiciones. La certeza operativa no es un lujo — es el nuevo estándar que instalamos.',
    smart: 'Trazabilidad del 100% de KPI críticos en tiempo real.',
    detail: [
      'Dashboard unificado de KPIs estratégicos',
      'Alertas en tiempo real por desviaciones',
      'Histórico de decisiones con trazabilidad total',
      'Integración con todos los módulos Nexus',
    ],
    icon: BarChart3,
    color: '#a78bfa',
    bg: 'linear-gradient(135deg, #120020 0%, #0a0018 100%)',
  },
  {
    n: '04',
    title: 'Soberanía del Talento',
    subtitle: 'Equipo al Nivel del Sistema',
    desc: 'Nexus Skills mapea las competencias de tu equipo y adapta el entrenamiento al nuevo estándar digital instalado.',
    smart: 'Certificación del equipo en el nuevo estándar en 90 días.',
    detail: [
      'Mapeo de brechas de competencia por rol',
      'Ruta de aprendizaje personalizada con IA',
      'Certificación interna en metodología SmartLean',
      'Seguimiento de desempeño post-certificación',
    ],
    icon: Users2,
    color: '#fb923c',
    bg: 'linear-gradient(135deg, #1e0e00 0%, #120800 100%)',
  },
  {
    n: '05',
    title: 'Círculo de Crecimiento',
    subtitle: 'Marketing que Trabaja Solo',
    desc: 'Marketing automatizado que nutre constantemente la demanda hacia la nueva capacidad operativa que instalamos en tu empresa.',
    smart: 'Incremento del 30% en conversión de leads en 4 meses.',
    detail: [
      'Automatización de campañas post-servicio',
      'CRM inteligente con seguimiento automático',
      'Segmentación de clientes por comportamiento',
      'Reportes de ROI por canal de adquisición',
    ],
    icon: TrendingUp,
    color: '#f472b6',
    bg: 'linear-gradient(135deg, #1e0010 0%, #120008 100%)',
  },
];

const auditKPIs = [
  { label: 'Ahorro de Tiempo', desc: 'Eliminación de tareas manuales y cuellos de botella.', icon: Clock, color: '#38bdf8' },
  { label: 'Mayor Productividad', desc: 'Optimización del flujo operativo en el Gemba.', icon: Zap, color: '#f59e0b' },
  { label: 'Ahorro de Costos', desc: 'Reducción de mermas y gastos innecesarios.', icon: DollarSign, color: '#00e5a0' },
  { label: 'Mayores Ingresos', desc: 'Escalabilidad mediante marketing automatizado.', icon: BarChart, color: '#a78bfa' },
];

/* ── Flip Card ─────────────────────────────────────────────── */
const PillarCard = ({ p, index }: { p: typeof pillars[0]; index: number }) => {
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Expanded overlay panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: .9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: .9, y: 30 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: p.bg,
                border: `1px solid ${p.color}30`,
                borderRadius: 28,
                padding: '3rem',
                maxWidth: 560,
                width: '100%',
                boxShadow: `0 40px 80px rgba(0,0,0,.6), 0 0 80px ${p.color}15`,
                position: 'relative',
              }}
            >
              <button
                onClick={() => setExpanded(false)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,.08)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}
              >
                <X size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1rem', borderRadius: 16, background: `${p.color}20`, color: p.color }}>
                  <p.icon size={28} />
                </div>
                <div>
                  <span style={{ fontSize: '.6rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: p.color }}>{p.n} — Pilar</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.1, color: 'white', marginTop: '.2rem' }}>{p.title}</h3>
                </div>
              </div>

              <p style={{ color: 'rgba(255,255,255,.6)', lineHeight: 1.75, marginBottom: '2rem', fontSize: '1rem' }}>{p.desc}</p>

              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '.6rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: p.color, display: 'block', marginBottom: '1rem' }}>Lo que implementamos</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                  {p.detail.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start' }}
                    >
                      <CheckCircle2 size={16} color={p.color} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ color: 'rgba(255,255,255,.75)', fontSize: '.95rem' }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: 14, background: `${p.color}12`, border: `1px solid ${p.color}25` }}>
                <span style={{ fontSize: '.6rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: p.color }}>Meta SMART</span>
                <p style={{ color: 'white', fontWeight: 700, marginTop: '.5rem', fontSize: '1rem' }}>{p.smart}</p>
              </div>

              <button
                style={{ marginTop: '2rem', width: '100%', padding: '1rem', background: p.color, color: '#020a14', fontWeight: 800, fontSize: '.8rem', letterSpacing: '.08em', textTransform: 'uppercase', border: 'none', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem' }}
              >
                Solicitar Diagnóstico en este Pilar <ArrowRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flip card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        style={{ perspective: 1000, height: 320, cursor: 'pointer' }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onClick={() => setExpanded(true)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: .55, ease: [.4, 0, .2, 1] }}
          style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
        >
          {/* FRONT */}
          <div style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            background: 'var(--surface-1)', border: '1px solid var(--border)',
            borderRadius: 20, padding: '2rem',
            display: 'flex', flexDirection: 'column', gap: '1.25rem',
            transition: 'border-color .3s',
            ...(flipped ? {} : { borderColor: 'var(--border)' }),
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ padding: '1rem', borderRadius: 14, background: `${p.color}15`, color: p.color }}>
                <p.icon size={26} />
              </div>
              <span style={{ fontSize: '.75rem', fontWeight: 900, color: 'var(--text-3)', letterSpacing: '.1em' }}>{p.n}</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '.65rem', color: 'var(--text-1)', textTransform: 'uppercase' }}>{p.title}</h3>
              <p style={{ color: 'var(--text-2)', lineHeight: 1.65, fontSize: '.9rem' }}>{p.desc}</p>
            </div>
            {/* hover hint */}
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '.4rem', opacity: .35 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} />
              <span style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: p.color }}>Hover para girar · Click para expandir</span>
            </div>
          </div>

          {/* BACK */}
          <div style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
            background: p.bg, border: `1px solid ${p.color}35`,
            borderRadius: 20, padding: '2rem',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            boxShadow: `0 0 40px ${p.color}15`,
          }}>
            <div>
              <span style={{ fontSize: '.6rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: p.color }}>Pilar {p.n}</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '.5rem', color: 'white' }}>{p.subtitle}</h3>
            </div>
            <div>
              {p.detail.slice(0, 3).map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start', marginBottom: '.65rem' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: p.color, flexShrink: 0, marginTop: 7 }} />
                  <span style={{ color: 'rgba(255,255,255,.7)', fontSize: '.82rem', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '1rem', borderRadius: 12, background: `${p.color}15`, border: `1px solid ${p.color}25` }}>
              <span style={{ fontSize: '.55rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: p.color, display: 'block', marginBottom: '.4rem' }}>Meta SMART</span>
              <p style={{ color: 'white', fontWeight: 700, fontSize: '.85rem', margin: 0 }}>{p.smart}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

/* ── Main Section ──────────────────────────────────────────── */
export const Pillars = () => (
  <section id="metodologia" style={{ padding: '8rem 0', position: 'relative' }}>
    <div className="container">

      {/* Auditoría SMART */}
      <div style={{ marginBottom: '8rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span style={{ fontSize: '.7rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '.3em', textTransform: 'uppercase', background: 'rgba(56,189,248,0.08)', padding: '.4rem 1.2rem', borderRadius: '99px', border: '1px solid rgba(56,189,248,0.2)' }}>
              Fase 0: Auditoría SMART
            </span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 800, marginTop: '1.5rem', lineHeight: 1.2 }}>
            Todo proyecto nace con una <span className="gradient-em">Línea de Base</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-3)', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
            No disparamos al aire. Auditamos tus indicadores actuales para medir el éxito bajo los 4 pilares financieros:
          </motion.p>
        </div>

        <div className="grid-responsive-4">
          {auditKPIs.map((k, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '16px', background: `${k.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: k.color, border: `1px solid ${k.color}30` }}>
                <k.icon size={28} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-1)', marginBottom: '0.5rem' }}>{k.label}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-3)', lineHeight: 1.5, margin: 0 }}>{k.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5 Pilares */}
      <div style={{ marginBottom: '4rem' }}>
        <div className="badge" style={{ marginBottom: '1.5rem' }}>Metodología Propietaria</div>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, maxWidth: '700px', lineHeight: 1.1 }}>
          <span className="gradient-title">Los 5 Pilares de la</span><br />
          <span className="gradient-em">Transformación SmartLean</span>
        </h2>
        <p style={{ marginTop: '1.5rem', color: 'var(--text-2)', maxWidth: '560px', lineHeight: 1.7, fontSize: '1rem' }}>
          Pasa el cursor sobre cada tarjeta para verla girar, y haz clic para explorar en detalle lo que implementamos.
        </p>
      </div>

      <div className="grid-responsive-3">
        {pillars.map((p, i) => (
          <PillarCard key={i} p={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);
