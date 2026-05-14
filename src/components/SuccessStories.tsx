import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, CheckCircle2, TrendingUp, Quote, ArrowRight,
  Clock, ChevronRight, X, Zap, BarChart3,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DATA — Agregar nuevos casos aquí
───────────────────────────────────────────── */
const cases = [
  {
    id: 'cuaderno',
    badge: 'Talleres Mecánicos',
    tag: 'Caso de Estudio',
    title: 'El Fin del Cuaderno',
    subtitle: 'Cómo la metodología SmartLean está salvando los márgenes de los talleres mecánicos en Chile',
    readTime: '5 min lectura',
    year: '2026',
    cover: '/img/caso-taller.jpg',
    coverAlt: 'Taller mecánico antes de SmartLean',
    color: '#135aec',
    glow: 'rgba(19,90,236,0.25)',
    accentColor: '#0ea5e9',
    kpi: { value: '+40%', label: 'Incremento en rentabilidad operativa', icon: TrendingUp },
    quote: {
      text: '"Históricamente, el taller mecánico chileno ha dependido del cuaderno. Un sistema propenso al error, al olvido y a la pérdida silenciosa de rentabilidad."',
      source: '— Diagnóstico SmartLean, 2026',
    },
    body: `Durante décadas, el modelo operativo del taller mecánico en Chile ha permanecido igual: un cuaderno, una llamada y la experiencia del dueño. El problema no es la tradición, es que ese sistema **pierde dinero silenciosamente**.

Repuestos que no se cobran, mano de obra que se "regala", clientes que no vuelven porque nadie les recordó la próxima mantención. SmartLean implementó su metodología de los 5 pilares para revertir esta tendencia.`,
    results: [
      '+25% rotación de elevadores',
      'Cero pérdida de repuestos en bodega',
      'Trazabilidad real de horas-hombre',
      'Cobros sin fugas por mano de obra',
      'Fidelización automatizada post-servicio',
    ],
    cta: { label: 'Conoce más sobre los resultados', href: 'https://garage.nexusnetwork.cl' },
  },
  // ← Próximos casos aquí
];

/* ─────────────────────────────────────────────
   BLOG CARD COMPONENT
───────────────────────────────────────────── */
const CaseCard = ({ c, onClick }: { c: typeof cases[0]; onClick: () => void }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -6 }}
    transition={{ duration: 0.5 }}
    onClick={onClick}
    style={{
      borderRadius: 24, overflow: 'hidden', cursor: 'pointer',
      background: 'linear-gradient(145deg, rgba(20,30,55,0.7) 0%, rgba(10,15,30,0.9) 100%)',
      border: '1px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      position: 'relative',
      transition: 'box-shadow 0.3s ease',
    }}
  >
    {/* Cover image */}
    <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
      <img
        src={c.cover}
        alt={c.coverAlt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(to bottom, transparent 30%, rgba(10,15,30,0.95) 100%)`,
      }} />
      {/* Shimmer bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${c.color}, transparent)`,
        boxShadow: `0 0 20px ${c.color}`,
      }} className="shimmer-bar" />
      {/* Tag badge */}
      <div style={{
        position: 'absolute', top: '1rem', left: '1rem',
        display: 'flex', gap: '.5rem',
      }}>
        <span style={{
          padding: '.3rem .7rem', borderRadius: 99,
          background: `${c.color}cc`, backdropFilter: 'blur(8px)',
          fontSize: '.58rem', fontWeight: 800, letterSpacing: '.12em',
          textTransform: 'uppercase', color: '#fff',
          border: `1px solid ${c.color}`,
        }}>
          {c.tag}
        </span>
        <span style={{
          padding: '.3rem .7rem', borderRadius: 99,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
          fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          {c.badge}
        </span>
      </div>
      {/* KPI overlay */}
      <div style={{
        position: 'absolute', bottom: '1rem', right: '1rem',
        background: 'rgba(10,15,30,0.85)', backdropFilter: 'blur(12px)',
        border: `1px solid ${c.color}50`, borderRadius: 14,
        padding: '.5rem .9rem', textAlign: 'right',
      }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 900, color: c.color, lineHeight: 1 }}>{c.kpi.value}</div>
        <div style={{ fontSize: '.5rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: '.15rem' }}>Rentabilidad</div>
      </div>
    </div>

    {/* Content */}
    <div style={{ padding: '1.5rem 1.75rem 1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '0.85rem', color: 'rgba(255,255,255,0.35)' }}>
        <Clock size={12} />
        <span style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>{c.readTime}</span>
        <span style={{ margin: '0 .25rem' }}>·</span>
        <span style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>{c.year}</span>
      </div>

      <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '.6rem', letterSpacing: '-0.02em' }}>
        {c.title}
      </h3>
      <p style={{ fontSize: '.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
        {c.subtitle}
      </p>

      {/* Results preview */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.4rem' }}>
        {c.results.slice(0, 3).map((r, i) => (
          <span key={i} style={{
            fontSize: '.55rem', fontWeight: 700, letterSpacing: '.08em',
            padding: '.25rem .6rem', borderRadius: 6,
            background: `${c.color}12`, border: `1px solid ${c.color}30`,
            color: `${c.accentColor}`,
          }}>
            {r}
          </span>
        ))}
        {c.results.length > 3 && (
          <span style={{ fontSize: '.55rem', fontWeight: 700, padding: '.25rem .6rem', borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}>
            +{c.results.length - 3} más
          </span>
        )}
      </div>

      {/* CTA row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '.7rem', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: c.color, display: 'flex', alignItems: 'center', gap: '.4rem' }}>
          Leer caso completo <ChevronRight size={13} />
        </span>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c.color}18`, border: `1px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>
          <ArrowRight size={15} />
        </div>
      </div>
    </div>
  </motion.article>
);

/* ─────────────────────────────────────────────
   CASE DETAIL MODAL
───────────────────────────────────────────── */
const CaseModal = ({ c, onClose }: { c: typeof cases[0]; onClose: () => void }) => {
  const KpiIcon = c.kpi.icon;
  const renderBody = (text: string) => {
    return text.split('\n\n').map((para, i) => {
      const parts = para.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '1.25rem' }}>
          {parts.map((p, j) =>
            p.startsWith('**')
              ? <strong key={j} style={{ color: '#fff', fontWeight: 700 }}>{p.slice(2, -2)}</strong>
              : p
          )}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 30 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 780, maxHeight: '90vh',
          borderRadius: 28, overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          background: 'linear-gradient(145deg, #0d1526 0%, #0a0f1e 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
        }}
      >
        {/* Modal cover */}
        <div style={{ position: 'relative', height: 240, flexShrink: 0 }}>
          <img src={c.cover} alt={c.coverAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(10,15,30,0.98))' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${c.color}, transparent)`, boxShadow: `0 0 24px ${c.color}` }} className="shimmer-bar" />

          {/* Close */}
          <motion.button whileHover={{ scale: 1.1, rotate: 90 }} onClick={onClose} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', width: 36, height: 36, borderRadius: 10, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={16} />
          </motion.button>

          {/* Title over cover */}
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', right: '2rem' }}>
            <span style={{ display: 'inline-block', padding: '.25rem .7rem', borderRadius: 99, background: `${c.color}cc`, fontSize: '.58rem', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: '#fff', marginBottom: '.75rem' }}>{c.tag}</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em' }}>{c.title}</h2>
          </div>
        </div>

        {/* Modal body — scrollable */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}>
          <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', marginBottom: '2rem' }}>{c.subtitle}</p>

          {/* KPI highlight */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '2rem',
            padding: '1.5rem 2rem', borderRadius: 18, marginBottom: '2rem',
            background: `${c.color}10`, border: `1px solid ${c.color}30`,
          }}>
            <div>
              <div style={{ fontSize: '.6rem', fontWeight: 800, letterSpacing: '.2em', textTransform: 'uppercase', color: c.color, marginBottom: '.4rem', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                <KpiIcon size={12} /> Impacto Medido
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: c.color, lineHeight: 1 }}>{c.kpi.value}</div>
              <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '.3rem' }}>{c.kpi.label}</div>
            </div>
            <div style={{ width: 1, height: 60, background: `${c.color}30` }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {c.results.slice(0, 3).map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <CheckCircle2 size={14} color={c.color} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.6)' }}>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div style={{ padding: '1.5rem', borderLeft: `3px solid ${c.color}`, background: `${c.color}08`, borderRadius: '0 14px 14px 0', marginBottom: '2rem' }}>
            <Quote size={20} color={c.color} style={{ marginBottom: '.75rem' }} />
            <p style={{ fontSize: '1.05rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginBottom: '.75rem' }}>{c.quote.text}</p>
            <p style={{ fontSize: '.75rem', fontWeight: 700, color: c.color }}>{c.quote.source}</p>
          </div>

          {/* Body text */}
          {renderBody(c.body)}

          {/* Full results */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '.65rem', fontWeight: 800, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <BarChart3 size={14} /> Resultados Documentados
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
              {c.results.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.6rem .9rem', borderRadius: 10, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <CheckCircle2 size={15} color={c.color} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '.9rem', color: 'rgba(255,255,255,0.7)' }}>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href={c.cta.href}
            whileHover={{ x: 4 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.6rem',
              padding: '.9rem 2rem', borderRadius: 14,
              background: `linear-gradient(135deg, ${c.color}, ${c.accentColor})`,
              color: '#fff', fontWeight: 800, fontSize: '.8rem',
              letterSpacing: '.1em', textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: `0 8px 32px ${c.glow}`,
            }}
          >
            <Zap size={14} /> {c.cta.label}
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   SECTION
───────────────────────────────────────────── */
export const SuccessStories = () => {
  const [selected, setSelected] = useState<typeof cases[0] | null>(null);

  return (
    <section id="casos" style={{ padding: '9rem 0', background: 'var(--void)', position: 'relative', overflow: 'hidden' }}>
      {/* BG glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 60%, rgba(19,90,236,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
      {/* Top shimmer bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.3), transparent)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '.5rem',
              padding: '.35rem 1.1rem', borderRadius: 999,
              border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.08)',
              fontSize: '.65rem', fontWeight: 800, letterSpacing: '.25em',
              textTransform: 'uppercase', color: '#60a5fa', marginBottom: '1.5rem',
            }}>
              <BookOpen size={11} /> Blog · Casos de Éxito
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, margin: 0 }}
          >
            <span className="gradient-title">Resultados que</span>
            <br />
            <span className="gradient-em">Hablan por Sí Solos</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ marginTop: '1.25rem', color: 'var(--text-2)', fontSize: '1.05rem', maxWidth: 520 }}
          >
            Documentamos el impacto real de nuestra metodología en cada cliente. Sin estimaciones — solo métricas medidas.
          </motion.p>
        </div>

        {/* Cases grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: cases.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))',
          maxWidth: cases.length === 1 ? 560 : '100%',
          gap: '1.75rem',
        }}>
          {cases.map(c => (
            <CaseCard key={c.id} c={c} onClick={() => setSelected(c)} />
          ))}

          {/* Coming soon placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{
              borderRadius: 24, border: '1.5px dashed rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.015)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              minHeight: 340, gap: '1rem', padding: '2rem',
            }}
          >
            <div style={{ width: 56, height: 56, borderRadius: 18, border: '1.5px dashed rgba(56,189,248,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(56,189,248,0.3)' }}>
              <BookOpen size={24} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 800, color: 'rgba(255,255,255,0.25)', fontSize: '.9rem', letterSpacing: '-0.01em' }}>Próximo caso</p>
              <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,0.15)', marginTop: '.35rem' }}>Nuevos resultados documentados en camino</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <CaseModal c={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};
