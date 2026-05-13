import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Network, Cpu, BarChart3 } from 'lucide-react';

const stats = [
  { value: '+40%', label: 'Rentabilidad operativa' },
  { value: '5', label: 'Pilares metodológicos' },
  { value: '3+', label: 'Módulos Nexus activos' },
];

/* Inline SVG Logo - Neural Network */
const Logo = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00e5a0"/>
        <stop offset="100%" stopColor="#0ea5e9"/>
      </linearGradient>
    </defs>
    {/* Arch / wave base */}
    <path d="M4 44 Q14 10 28 18 Q42 26 52 8" stroke="url(#lg)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    {/* Nodes */}
    {[[28,18],[42,26],[52,8],[36,32],[20,36],[10,28]].map(([cx,cy],i)=>(
      <circle key={i} cx={cx} cy={cy} r="3.5" fill="url(#lg)" opacity={0.9}/>
    ))}
    {/* Connecting lines */}
    <line x1="28" y1="18" x2="42" y2="26" stroke="url(#lg)" strokeWidth="1.5" opacity="0.5"/>
    <line x1="42" y1="26" x2="52" y2="8" stroke="url(#lg)" strokeWidth="1.5" opacity="0.5"/>
    <line x1="28" y1="18" x2="36" y2="32" stroke="url(#lg)" strokeWidth="1.5" opacity="0.5"/>
    <line x1="36" y1="32" x2="20" y2="36" stroke="url(#lg)" strokeWidth="1.5" opacity="0.5"/>
    <line x1="20" y1="36" x2="10" y2="28" stroke="url(#lg)" strokeWidth="1.5" opacity="0.5"/>
    <line x1="28" y1="18" x2="10" y2="28" stroke="url(#lg)" strokeWidth="1" opacity="0.3"/>
    {/* Circuit lines bottom */}
    <path d="M4 44 L8 44 L8 50 L20 50" stroke="url(#lg)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <path d="M52 44 L48 44 L48 50 L36 50" stroke="url(#lg)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <circle cx="20" cy="50" r="2" fill="url(#lg)" opacity="0.7"/>
    <circle cx="36" cy="50" r="2" fill="url(#lg)" opacity="0.7"/>
  </svg>
);

/* Mini animated dashboard inside hero */
const MiniDashboard = () => (
  <div style={{
    background: '#0a0f1e',
    borderRadius: 16,
    border: '1px solid rgba(0,229,160,.2)',
    overflow: 'hidden',
    boxShadow: '0 40px 80px rgba(0,0,0,.6), 0 0 60px rgba(0,229,160,.08)',
    width: '100%',
    maxWidth: 640,
  }}>
    {/* Topbar */}
    <div style={{ background: '#060b18', padding: '.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '.75rem', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
      <div style={{ display: 'flex', gap: '.4rem' }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
      </div>
      <span style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', flex: 1, textAlign: 'center' }}>SmartLean · Dashboard</span>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.75rem', padding: '1rem' }}>
      {/* KPI Cards */}
      {[
        { label: 'AI Optimization', value: '83%', icon: <Cpu size={14}/>, color: '#00e5a0' },
        { label: 'System Efficiency', value: '70%', icon: <BarChart3 size={14}/>, color: '#38bdf8' },
        { label: 'AI Network', value: '91%', icon: <Network size={14}/>, color: '#a78bfa' },
      ].map((kpi, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 10, padding: '.85rem', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '.55rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>{kpi.label}</span>
            <span style={{ color: kpi.color }}>{kpi.icon}</span>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Syne', color: kpi.color, lineHeight: 1 }}>{kpi.value}</div>
          {/* Mini bar */}
          <div style={{ height: 4, background: 'rgba(255,255,255,.06)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: kpi.color, width: kpi.value, borderRadius: 99, opacity: .8 }} />
          </div>
        </div>
      ))}

      {/* Chart placeholder */}
      <div style={{ gridColumn: '1 / 3', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 10, padding: '.85rem' }}>
        <span style={{ fontSize: '.55rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>Data Analytics</span>
        <svg width="100%" height="60" viewBox="0 0 200 60" style={{ marginTop: '.5rem', display: 'block' }}>
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e5a0" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#00e5a0" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0 50 C20 45 30 20 50 22 S80 35 100 15 S130 5 150 20 S180 30 200 10" stroke="#00e5a0" strokeWidth="2" fill="none"/>
          <path d="M0 50 C20 45 30 20 50 22 S80 35 100 15 S130 5 150 20 S180 30 200 10 L200 60 L0 60Z" fill="url(#chartFill)"/>
          {[50,100,150].map(x=><circle key={x} cx={x} cy={x===50?22:x===100?15:20} r="3" fill="#00e5a0"/>)}
        </svg>
      </div>

      {/* Neural net mini */}
      <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 10, padding: '.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          {[[10,30],[30,10],[30,30],[30,50],[50,20],[50,40]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r={i===2?5:3.5} fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity={0.7}/>
          ))}
          {[[10,30,30,10],[10,30,30,30],[10,30,30,50],[30,10,50,20],[30,30,50,20],[30,30,50,40],[30,50,50,40]].map(([x1,y1,x2,y2],i)=>(
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#38bdf8" strokeWidth="1" opacity="0.3"/>
          ))}
        </svg>
      </div>
    </div>

    {/* Bottom status bar */}
    <div style={{ padding: '.75rem 1.25rem', borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {[['IA Activa','#00e5a0'],['Datos Sync','#38bdf8'],['RPA Running','#a78bfa']].map(([label,color])=>(
        <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: color as string }} />
          <span style={{ fontSize: '.55rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)' }}>{label as string}</span>
        </div>
      ))}
    </div>
  </div>
);

export const Hero = () => (
  <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', paddingBottom: '4rem', overflow: 'hidden' }}>
    {/* Background */}
    <div className="blob blob-em" style={{ width: 800, height: 800, top: '-30%', left: '-20%', opacity: 0.4 }} />
    <div className="blob blob-sky" style={{ width: 600, height: 600, bottom: '-20%', right: '-15%', opacity: 0.3 }} />

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '5rem', alignItems: 'center' }}>

        {/* LEFT */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8 }}>
          {/* Logo mark + brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <Logo />
            <div>
              <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '2rem', letterSpacing: '-.03em', lineHeight: 1 }}>SmartLean</h1>
              <p style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--text-2)', marginTop: '.25rem' }}>Strategic Data & AI Consultancy</p>
            </div>
          </div>

          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.08, marginBottom: '1.5rem', letterSpacing: '-.03em' }}>
            <span className="gradient-title">Del Cuaderno</span><br />
            <span className="gradient-em">a la Inteligencia</span><br />
            <span className="gradient-title">Operacional.</span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '480px' }}>
            Transformamos empresas industriales con la metodología SmartLean: Lean Excellence, Datos en la Nube y Agentes de IA orquestados como un solo sistema operativo.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <a href="mailto:ariel@smartlean.cl" className="btn-primary">
              Agenda tu Diagnóstico <ArrowRight size={16} />
            </a>
            <a href="#metodologia" className="btn-ghost">
              Ver Metodología <ChevronRight size={16} />
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 + i * .15 }}>
                <div className="stat-number" style={{ fontSize: '2rem' }}>{s.value}</div>
                <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-3)', marginTop: '.3rem' }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: .3 }}
          className="float"
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <MiniDashboard />
        </motion.div>
      </div>
    </div>
  </section>
);
