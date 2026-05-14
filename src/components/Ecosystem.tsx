import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const products = [
  { name: 'Nexus Lean', tagline: 'Gestión Gemba & Mejora Continua', url: 'https://lean.smartlean.cl', accent: '#135aec', letter: 'L' },
  { name: 'Nexus Garage', tagline: 'SOP Premium para Talleres', url: 'https://garage.smartlean.cl', accent: '#0ea5e9', letter: 'G' },
  { name: 'Nexus Network', tagline: 'Ecosistema de Colaboración Industrial', url: 'https://network.smartlean.cl', accent: '#6366f1', letter: 'N' },
  { name: 'Nexus Skills', tagline: 'Soberanía del Talento con IA', url: 'https://skills.smartlean.cl', accent: '#4f46e5', letter: 'S' },
];

export const Ecosystem = () => (
  <section id="ecosistema" style={{ padding: '8rem 0' }}>
    <div className="container">
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', marginBottom: '4rem' }}>
        <div>
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Suite Nexus</div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1 }}>
            <span className="gradient-title">Software que</span><br />
            <span className="gradient-em">habla tu idioma</span>
          </h2>
        </div>
        <p style={{ maxWidth: '380px', color: 'var(--text-2)', lineHeight: 1.7 }}>
          Herramientas propietarias diseñadas bajo la metodología SmartLean. Cada módulo resuelve un problema real, integrado al mismo sistema operativo.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {products.map((p, i) => (
          <motion.a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card"
            initial={{ opacity: 0, scale: .96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', textDecoration: 'none', position: 'relative', overflow: 'hidden', minHeight: '220px' }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at 100% 0%, ${p.accent}18, transparent 70%)`, borderRadius: '0 20px 0 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: `${p.accent}20`, color: p.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', fontWeight: 900, fontSize: '1.25rem' }}>
                {p.letter}
              </div>
              <ExternalLink size={16} color="var(--text-3)" />
            </div>
            <div style={{ marginTop: 'auto' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-1)', marginBottom: '.5rem' }}>{p.name}</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '.875rem' }}>{p.tagline}</p>
            </div>
            <div style={{ height: '2px', background: `linear-gradient(to right, ${p.accent}, transparent)`, borderRadius: '99px' }} />
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);
