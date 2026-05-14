import { motion } from 'framer-motion';
import { Target, Cpu, BarChart3, Users2, TrendingUp } from 'lucide-react';

const pillars = [
  { 
    n: '01', 
    title: 'Lean: Flujo Físico', 
    desc: 'Eliminación de desperdicios en el Gemba. Identificamos cada cuello de botella en el flujo real de tu operación antes de automatizar.', 
    smart: 'Reducción del 20% en tiempos de ciclo en 60 días.',
    icon: Target, 
    color: '#135aec' 
  },
  { 
    n: '02', 
    title: 'IA & Automatización', 
    desc: 'Agentes de inteligencia artificial conectados a tu base de datos que guían la gestión, generan informes y ejecutan procesos en modo desatendido.', 
    smart: 'Autonomía operativa 24/7 en procesos críticos.',
    icon: Cpu, 
    color: '#0ea5e9' 
  },
  { 
    n: '03', 
    title: 'Visibilidad Predictiva', 
    desc: 'Un dashboard de datos en tiempo real reemplaza las suposiciones. La certeza operativa no es un lujo, es el nuevo estándar.', 
    smart: 'Trazabilidad del 100% de KPI críticos en tiempo real.',
    icon: BarChart3, 
    color: '#6366f1' 
  },
  { 
    n: '04', 
    title: 'Soberanía del Talento', 
    desc: 'Nexus Skills mapea las competencias de tu equipo y adapta el entrenamiento al nuevo estándar digital instalado.', 
    smart: 'Certificación del equipo en el nuevo estándar en 90 días.',
    icon: Users2, 
    color: '#4f46e5' 
  },
  { 
    n: '05', 
    title: 'Círculo de Crecimiento', 
    desc: 'Marketing automatizado que nutre constantemente la demanda hacia la nueva capacidad operativa que instalamos.', 
    smart: 'Incremento del 30% en conversión de leads en 4 meses.',
    icon: TrendingUp, 
    color: '#2563eb' 
  },
];

export const Pillars = () => (
  <section id="metodologia" style={{ padding: '8rem 0', position: 'relative' }}>
    <div className="container">
      <div style={{ marginBottom: '5rem' }}>
        <div className="badge" style={{ marginBottom: '1.5rem' }}>Metodología Propietaria</div>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, maxWidth: '700px', lineHeight: 1.1 }}>
          <span className="gradient-title">Los 5 Pilares de la</span><br />
          <span className="gradient-em">Transformación SmartLean</span>
        </h2>
        <p style={{ marginTop: '1.5rem', color: 'var(--text-2)', maxWidth: '560px', lineHeight: 1.7, fontSize: '1.05rem' }}>
          No instalamos software. Instalamos un nuevo sistema operativo para tu empresa basado en objetivos tangibles.
        </p>
      </div>

      <div className="grid-responsive-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {pillars.map((p, i) => (
          <motion.div
            key={i}
            className="bento-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ padding: '1rem', borderRadius: '14px', background: `${p.color}15`, color: p.color }}>
                <p.icon size={26} />
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: '.75rem', fontWeight: 900, color: 'var(--text-3)', letterSpacing: '.1em' }}>{p.n}</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '.75rem', color: 'var(--text-1)' }}>{p.title}</h3>
              <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: '.95rem' }}>{p.desc}</p>
            </div>

            {/* Objetivos SMART */}
            <div style={{ 
              marginTop: 'auto', 
              padding: '1rem', 
              borderRadius: '12px', 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.05)' 
            }}>
              <span style={{ 
                fontSize: '0.6rem', 
                fontWeight: 900, 
                color: p.color, 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em', 
                display: 'block', 
                marginBottom: '0.5rem' 
              }}>
                Meta SMART
              </span>
              <p style={{ 
                fontSize: '0.88rem', 
                color: 'var(--text-1)', 
                fontWeight: 600, 
                lineHeight: 1.4,
                margin: 0 
              }}>
                {p.smart}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
