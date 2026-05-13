import { Briefcase, Repeat, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const DoubleMotor = () => (
  <section id="servicios" style={{ padding: '8rem 0' }}>
    <div className="container">
      <div style={{ marginBottom: '5rem' }}>
        <div className="badge" style={{ marginBottom: '1.5rem' }}>Modelo de Negocio</div>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1 }}>
          <span className="gradient-title">El Doble Motor</span><br />
          <span className="gradient-em">Financiero</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        {[
          {
            icon: Briefcase,
            color: '#00e5a0',
            tag: 'Motor 1',
            title: 'Consultoría Estratégica',
            body: 'Diagnóstico inicial profundo, diseño del nuevo flujo operativo y acompañamiento durante el "cambio de chip" organizacional. Ticket alto, transformación real.',
            kpi: 'Proyecto',
            kpiLabel: 'Pago único + bonos por KPI'
          },
          {
            icon: Repeat,
            color: '#38bdf8',
            tag: 'Motor 2',
            title: 'SaaS: Sistema Operativo Permanente',
            body: 'Una vez que la consultoría termina, el ecosistema Nexus queda instalado como el sistema operativo del cliente, generando una renta mensual de por vida.',
            kpi: 'Recurrente',
            kpiLabel: 'Ingreso mensual garantizado'
          },
          {
            icon: Code2,
            color: '#a78bfa',
            tag: 'Motor 3',
            title: 'Desarrollo a Medida',
            body: 'Aplicaciones construidas con filosofía SmartLean: flujo simple, automatización nativa, cloud-first y data-driven. Sin desperdicios, ni en el código ni en el proceso.',
            kpi: 'Proyecto',
            kpiLabel: 'Personalizado por alcance'
          },
        ].map((m, i) => (
          <motion.div
            key={i}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ padding: '1rem', borderRadius: '14px', background: `${m.color}15`, color: m.color }}>
                <m.icon size={24} />
              </div>
              <span style={{ fontSize: '.6rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: m.color, background: `${m.color}15`, padding: '.3rem .8rem', borderRadius: '99px' }}>{m.tag}</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '.75rem' }}>{m.title}</h3>
              <p style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: '.95rem' }}>{m.body}</p>
            </div>
            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: m.color, fontFamily: 'Syne' }}>{m.kpi}</div>
              <div style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-3)', marginTop: '.3rem' }}>{m.kpiLabel}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
