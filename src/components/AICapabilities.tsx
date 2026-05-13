import { motion } from 'framer-motion';
import { Brain, Database, FileBarChart2, Workflow } from 'lucide-react';

const caps = [
  { icon: Brain, title: 'Guía en Tiempo Real', desc: 'El agente conoce tu operación y guía a los usuarios paso a paso, asegurando el cumplimiento del estándar SmartLean en cada proceso.' },
  { icon: Database, title: 'Conexión Nativa a Datos', desc: 'La IA lee directamente tu base de datos para encontrar anomalías, oportunidades y cuellos de botella antes de que los notes.' },
  { icon: FileBarChart2, title: 'Informes Automáticos', desc: 'Reportes ejecutivos generados en segundos: KPIs, márgenes, rendimiento por mecánico, stock crítico. Sin trabajo manual.' },
  { icon: Workflow, title: 'Automatización de Procesos', desc: 'La IA no solo analiza, ejecuta. Flujos de trabajo que corren solos: notificaciones, cierres de OT, seguimiento de clientes.' },
];

export const AICapabilities = () => (
  <section id="ia" style={{ padding: '8rem 0', background: 'var(--surface-1)', position: 'relative', overflow: 'hidden' }}>
    <div className="blob blob-em float" style={{ width: 600, height: 600, top: '50%', left: '60%', transform: 'translate(-50%,-50%)', opacity: 0.35 }} />
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
        <div>
          <div className="badge" style={{ marginBottom: '1.5rem' }}>IA Orquestada</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
            <span className="gradient-title">La IA que trabaja</span><br />
            <span className="gradient-em">mientras tú diriges</span>
          </h2>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.75, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
            No es un chatbot. Es un agente integrado que conoce tu negocio, lee tus datos en tiempo real y actúa sobre tus procesos para maximizar cada peso de tu operación.
          </p>
          <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'var(--em-dim)', border: '1px solid var(--border-em)' }}>
            <p style={{ fontSize: '.7rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--em)', marginBottom: '.5rem' }}>Stack Tecnológico</p>
            <p style={{ color: 'var(--text-2)', fontSize: '.9rem' }}>Gemini AI · Supabase · RPA · Edge Functions · Real-time DB</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {caps.map((c, i) => (
            <motion.div
              key={i}
              className="card"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}
            >
              <div style={{ padding: '.85rem', borderRadius: '12px', background: 'var(--em-dim)', color: 'var(--em)', flexShrink: 0 }}>
                <c.icon size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.5rem' }}>{c.title}</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '.9rem', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
