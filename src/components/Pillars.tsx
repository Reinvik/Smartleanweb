import { motion } from 'framer-motion';
import { Target, Cpu, BarChart3, Users2, TrendingUp, Clock, Zap, DollarSign, BarChart } from 'lucide-react';

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

const auditKPIs = [
  { label: 'Ahorro de Tiempo', desc: 'Eliminación de tareas manuales y cuellos de botella.', icon: Clock, color: '#0ea5e9' },
  { label: 'Mayor Productividad', desc: 'Optimización del flujo operativo en el Gemba.', icon: Zap, color: '#f59e0b' },
  { label: 'Ahorro de Costos', desc: 'Reducción de mermas y gastos innecesarios.', icon: DollarSign, color: '#22c55e' },
  { label: 'Mayores Ingresos', desc: 'Escalabilidad mediante marketing automatizado.', icon: BarChart, color: '#8b5cf6' },
];

export const Pillars = () => (
  <section id="metodologia" style={{ padding: '8rem 0', position: 'relative' }}>
    <div className="container">
      {/* Diagnóstico Inicial Section */}
      <div style={{ marginBottom: '8rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span style={{ 
              fontSize: '.7rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '.3em', 
              textTransform: 'uppercase', background: 'rgba(56,189,248,0.08)', 
              padding: '.4rem 1.2rem', borderRadius: '99px', border: '1px solid rgba(56,189,248,0.2)' 
            }}>
              Fase 0: Auditoría SMART
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 800, marginTop: '1.5rem', lineHeight: 1.2 }}
          >
            Todo proyecto nace con una <span className="gradient-em">Línea de Base</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-3)', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}
          >
            No disparamos al aire. Antes de instalar nuestra infraestructura, auditamos tus indicadores actuales para medir el éxito bajo los 4 pilares financieros:
          </motion.p>
        </div>

        <div className="grid-responsive-4">
          {auditKPIs.map((k, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ 
                padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', 
                border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center'
              }}
            >
              <div style={{ 
                width: 56, height: 56, borderRadius: '16px', background: `${k.color}15`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem',
                color: k.color, border: `1px solid ${k.color}30`
              }}>
                <k.icon size={28} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-1)', marginBottom: '0.5rem' }}>{k.label}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-3)', lineHeight: 1.5, margin: 0 }}>{k.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

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


      <div className="grid-responsive-3">
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
