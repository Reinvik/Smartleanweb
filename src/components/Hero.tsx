import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Network, Cpu, BarChart3, Bot, Brain, Cloud, CheckCircle2, Zap, TrendingUp, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

const stats = [
  { value: '+40%', label: 'Rentabilidad', sub: 'vs. operación manual', icon: TrendingUp, color: '#135aec' },
  { value: '5',    label: 'Pilares',      sub: 'metodología Smart&Lean', icon: Zap,        color: '#0ea5e9' },
  { value: '3+',   label: 'Módulos',      sub: 'Nexus activos hoy',      icon: Network,    color: '#8b5cf6' },
];

/* ── LOGO ────────────────────────────────────── */
const Logo = () => (
  <img src="/logo-icon.png" alt="SmartLean Logo" style={{ width: 56, height: 56, objectFit: 'contain' }} />
);

/* ── SPARKLINE ───────────────────────────────── */
const Sparkline = ({ color, points }: { color: string; points: string }) => {
  const pathData = points.startsWith('M') ? points : `M ${points}`;
  return (
    <svg width="100%" height="36" viewBox="0 0 120 36" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spark-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={`${pathData} L 120 36 L 0 36 Z`} fill={`url(#spark-${color.replace('#','')})`}/>
      <path d={pathData} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

/* ── MINI ACTIVITY FEED ──────────────────────── */
const activities = [
  { icon: Brain, color: '#f97316', label: 'IA predijo mantención', time: 'hace 2 min', status: 'ok' },
  { icon: Bot,   color: '#22c55e', label: 'RPA capturó lead Facebook', time: 'hace 5 min', status: 'ok' },
  { icon: Cloud, color: '#0ea5e9', label: 'Backup automático sync', time: 'hace 11 min', status: 'ok' },
  { icon: Zap,   color: '#8b5cf6', label: 'Proceso Gemba actualizado', time: 'hace 18 min', status: 'ok' },
];

/* ── PROCESS PIPELINE ────────────────────────── */
const pipeline = [
  { label: 'Captación', pct: 100, color: '#135aec' },
  { label: 'Análisis IA', pct: 87, color: '#0ea5e9' },
  { label: 'RPA Exec', pct: 72, color: '#22c55e' },
  { label: 'Resultado', pct: 95, color: '#f97316' },
];

/* ── FULL DASHBOARD ──────────────────────────── */
const MiniDashboard = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const kpiValues = [
    { label: 'Optimización IA', base: 83, color: '#135aec', icon: Cpu, spark: '0 30 20 18 40 24 60 10 80 16 100 8 120 12' },
    { label: 'Eficiencia Lean', base: 70, color: '#0ea5e9', icon: BarChart3, spark: '0 28 20 22 40 30 60 20 80 26 100 14 120 18' },
    { label: 'Red Nexus',       base: 91, color: '#8b5cf6', icon: Network, spark: '0 22 20 14 40 18 60 8  80 12 100 6  120 10' },
  ];

  return (
    <div style={{
      background: 'linear-gradient(145deg, #0d1526 0%, #0a0f1e 100%)',
      borderRadius: 20,
      border: '1px solid rgba(56,189,248,0.12)',
      overflow: 'hidden',
      boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 80px rgba(19,90,236,0.08)',
      width: '100%',
      maxWidth: 580,
      fontFamily: 'Inter, sans-serif',
    }}>

      {/* ── Topbar */}
      <div style={{
        background: 'rgba(6,11,24,0.9)',
        padding: '.65rem 1.2rem',
        display: 'flex', alignItems: 'center', gap: '.75rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ display: 'flex', gap: '.38rem' }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <span style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', flex: 1, textAlign: 'center' }}>
          SmartLean · Dashboard
        </span>
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: '.55rem', fontWeight: 700, color: '#22c55e', letterSpacing: '.08em', textTransform: 'uppercase' }}>Live</span>
        </motion.div>
      </div>

      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

        {/* ── KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.6rem' }}>
          {kpiValues.map((kpi, i) => {
            const KpiIcon = kpi.icon;
            const live = Math.min(100, kpi.base + (tick % 5) - 2);
            return (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid ${kpi.color}22`,
                borderRadius: 12, padding: '.7rem .75rem',
                display: 'flex', flexDirection: 'column', gap: '.4rem',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${kpi.color}60, transparent)` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '.5rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.28)' }}>{kpi.label}</span>
                  <KpiIcon size={12} color={kpi.color} />
                </div>
                <motion.div
                  key={tick}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  style={{ fontSize: '1.45rem', fontWeight: 900, color: kpi.color, lineHeight: 1 }}
                >
                  {live}%
                </motion.div>
                <div style={{ height: 30, marginTop: '.2rem' }}>
                  <Sparkline color={kpi.color} points={kpi.spark} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Middle Row: Chart + Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '.6rem' }}>

          {/* Analytics chart */}
          <div style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12, padding: '.7rem .75rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.5rem' }}>
              <span style={{ fontSize: '.5rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.28)' }}>Rendimiento Mensual</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.25rem', color: '#22c55e' }}>
                <TrendingUp size={10} />
                <span style={{ fontSize: '.5rem', fontWeight: 800, color: '#22c55e' }}>+12%</span>
              </div>
            </div>
            <svg width="100%" height="65" viewBox="0 0 200 65" style={{ display: 'block' }}>
              <defs>
                <linearGradient id="chartFill2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#135aec" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#135aec" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="chartFill3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[16, 32, 48].map(y => (
                <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              ))}
              {/* Secondary line */}
              <path d="M0 52 C30 48 50 36 80 38 S120 50 150 34 S180 28 200 32" stroke="#0ea5e9" strokeWidth="1.2" fill="none" opacity="0.5"/>
              <path d="M0 52 C30 48 50 36 80 38 S120 50 150 34 S180 28 200 32 L200 65 L0 65Z" fill="url(#chartFill3)"/>
              {/* Primary line */}
              <path d="M0 55 C25 48 40 28 65 22 S95 35 120 15 S150 8 175 18 S190 24 200 14" stroke="#135aec" strokeWidth="2" fill="none"/>
              <path d="M0 55 C25 48 40 28 65 22 S95 35 120 15 S150 8 175 18 S190 24 200 14 L200 65 L0 65Z" fill="url(#chartFill2)"/>
              {/* Dots */}
              {[[65,22],[120,15],[175,18]].map(([x,y],i) => (
                <motion.circle key={i} cx={x} cy={y} r="3" fill="#135aec"
                  animate={{ r: [3, 4.5, 3], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
            </svg>
          </div>

          {/* Process pipeline */}
          <div style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12, padding: '.7rem .75rem',
            display: 'flex', flexDirection: 'column', gap: '.45rem',
          }}>
            <span style={{ fontSize: '.5rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.28)', marginBottom: '.15rem' }}>Pipeline Activo</span>
            {pipeline.map((p, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.2rem' }}>
                  <span style={{ fontSize: '.5rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)' }}>{p.label}</span>
                  <span style={{ fontSize: '.5rem', fontWeight: 800, color: p.color }}>{p.pct}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p.pct}%` }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: 'easeOut' }}
                    style={{ height: '100%', background: p.color, borderRadius: 99, boxShadow: `0 0 8px ${p.color}80` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Activity Feed */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 12, padding: '.7rem .75rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.55rem' }}>
            <span style={{ fontSize: '.5rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.28)' }}>Actividad en Tiempo Real</span>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
              <Activity size={10} color="#22c55e" />
            </motion.div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
            {activities.map((a, i) => {
              const AIcon = a.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '.55rem',
                    padding: '.3rem .5rem', borderRadius: 8,
                    background: 'rgba(255,255,255,0.025)',
                  }}
                >
                  <div style={{
                    width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                    background: `${a.color}18`, border: `1px solid ${a.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <AIcon size={11} color={a.color} />
                  </div>
                  <span style={{ flex: 1, fontSize: '.55rem', fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>{a.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.3rem', flexShrink: 0 }}>
                    <CheckCircle2 size={10} color="#22c55e" />
                    <span style={{ fontSize: '.5rem', color: 'rgba(255,255,255,0.22)', fontWeight: 600 }}>{a.time}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Status Bar */}
        <div style={{
          padding: '.55rem .75rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', gap: '1.25rem', alignItems: 'center',
        }}>
          {[['IA Activa','#135aec'],['Datos Sync','#0ea5e9'],['RPA Running','#22c55e'],['Gemba On','#8b5cf6']].map(([label, color]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '.35rem' }}>
              <motion.div
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: color as string, boxShadow: `0 0 6px ${color}` }}
              />
              <span style={{ fontSize: '.5rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.28)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── DOT GRID BG ─────────────────────────────── */
const DotGrid = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '14px', opacity: 0.07 }}>
    {Array.from({ length: 144 }).map((_, i) => (
      <motion.div
        key={i}
        style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--sky)' }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: (i % 12) * 0.1 }}
      />
    ))}
  </div>
);

/* ── HERO ────────────────────────────────────── */
export const Hero = () => (
  <section style={{
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '100px',
    paddingBottom: '4rem',
    overflow: 'hidden',
    background: 'var(--void)',
  }}>
    {/* BG glow */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(circle at 50% 0%, #1e3a8a 0%, #0f172a 55%, #0f172a 100%)',
      opacity: 0.75, pointerEvents: 'none',
    }} />

    {/* Top shimmer bar */}
    <div className="shimmer-bar" style={{ height: '3px', boxShadow: '0 0 24px rgba(56,189,248,0.8)', zIndex: 110 }} />

    {/* BG dots */}
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 0 }}>
      <DotGrid />
    </div>

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '4rem', alignItems: 'center' }}>

        {/* LEFT */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Logo />
            <div>
              <h1 style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '2rem', letterSpacing: '-.04em', lineHeight: 1, textTransform: 'uppercase' }}>SmartLean</h1>
              <p style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--text-2)', marginTop: '.25rem' }}>Efficiency & Software Production</p>
            </div>
          </div>

          <div className="badge" style={{ marginBottom: '1.5rem', width: 'fit-content', background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)' }}>Excelencia Operacional 5.0</div>

          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', fontWeight: 900, lineHeight: 1.03, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            <span className="gradient-title">Software a Medida,</span><br />
            <span className="gradient-em">Resultados Reales.</span><br />
            <span className="gradient-title" style={{ fontSize: '0.58em', opacity: 0.8 }}>Filosofía Smart & Lean.</span>
          </h2>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '520px' }}>
            Somos una <strong style={{ color: 'var(--text-1)' }}>consultora con herramientas Lean digitales a medida</strong>. Combinamos metodologías de optimización de procesos con tecnología avanzada para eliminar desperdicios, ahorrar tiempo y maximizar la rentabilidad de tu operación.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <a href="https://wa.me/56930057769" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '1rem 2.25rem' }}>
              Agenda tu Diagnóstico <ArrowRight size={16} />
            </a>
            <a href="#metodologia" className="btn-ghost" style={{ padding: '1rem 2.25rem' }}>
              Ver Metodología <ChevronRight size={16} />
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '0', marginTop: '2.5rem',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16, overflow: 'hidden',
          }}>
            {stats.map((s, i) => {
              const SIcon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: .6 + i * .12 }}
                  style={{
                    flex: 1, padding: '1.1rem 1.25rem',
                    borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    display: 'flex', flexDirection: 'column', gap: '.3rem',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* top accent line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, ${s.color}, transparent)`,
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                    <SIcon size={12} color={s.color} />
                    <span style={{ fontSize: '.5rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>{s.label}</span>
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: s.color, lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '.52rem', fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: '.05em' }}>{s.sub}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: .3 }}
          style={{ position: 'relative' }}
        >
          {/* Outer radial glow */}
          <div style={{
            position: 'absolute', inset: '-15%',
            background: 'radial-gradient(circle at 50% 50%, rgba(19,90,236,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <MiniDashboard />
          </motion.div>
        </motion.div>

      </div>
    </div>
  </section>
);
