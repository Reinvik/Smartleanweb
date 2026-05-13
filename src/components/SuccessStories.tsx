import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, TrendingUp, Quote } from 'lucide-react';

const results = [
  '+25% rotación de elevadores',
  'Cero pérdida de repuestos en bodega',
  'Trazabilidad real de horas-hombre',
  'Cobros sin fugas por mano de obra',
  'Fidelización automatizada post-servicio',
];

export const SuccessStories = () => (
  <section id="casos" style={{ padding: '8rem 0', background: 'var(--surface-1)', position: 'relative', overflow: 'hidden' }}>
    <div className="blob blob-em" style={{ width: 500, height: 500, bottom: '-15%', left: '-10%', opacity: 0.25 }} />
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ marginBottom: '5rem' }}>
        <div className="badge" style={{ marginBottom: '1.5rem' }}>Casos de Éxito</div>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1 }}>
          <span className="gradient-em">El Fin del Cuaderno</span>
        </h2>
        <p style={{ marginTop: '1rem', color: 'var(--text-2)', fontSize: '1.1rem', fontStyle: 'italic', maxWidth: '700px', lineHeight: 1.6 }}>
          Cómo la metodología SmartLean está salvando los márgenes de los talleres mecánicos en Chile
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Left: narrative */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          <div className="card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1.5rem', color: 'var(--em)' }}>
              <Quote size={28} />
            </div>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.75, color: 'var(--text-2)', fontStyle: 'italic' }}>
              "Históricamente, el taller mecánico chileno ha dependido del cuaderno. Un sistema propenso al error, al olvido y a la pérdida silenciosa de rentabilidad."
            </p>
            <p style={{ marginTop: '1.5rem', color: 'var(--text-1)', fontWeight: 600 }}>— Diagnóstico SmartLean, 2026</p>
          </div>

          <div className="card" style={{ padding: '2.5rem' }}>
            <p style={{ fontSize: '.7rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1.5rem' }}>Propuesta para Distribuidores</p>
            <div className="line-left">
              <p style={{ color: 'var(--text-2)', lineHeight: 1.75, fontSize: '1rem' }}>
                No solo les traemos un software para sus clientes, les traemos una <strong style={{ color: 'var(--text-1)' }}>metodología probada</strong> para que sus talleres sean más rentables y leales a su marca.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: KPIs + checklist */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          {/* Big stat */}
          <div className="card" style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(0,229,160,.08) 0%, rgba(56,189,248,.05) 100%)', borderColor: 'var(--border-em)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <TrendingUp size={22} color="var(--em)" />
              <span style={{ fontSize: '.7rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--em)' }}>Impacto Promedio Post-Implementación</span>
            </div>
            <div className="stat-number">+40%</div>
            <p style={{ color: 'var(--text-2)', fontSize: '.85rem', marginTop: '.75rem' }}>Incremento en rentabilidad operativa</p>
          </div>

          {/* Results list */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.5rem' }}>
              <BookOpen size={20} color="var(--em)" />
              <span style={{ fontSize: '.7rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Resultados Documentados</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
              {results.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={17} color="var(--em)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: 'var(--text-2)', fontSize: '.95rem' }}>{r}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Descargar Whitepaper de Metodología
          </button>
        </motion.div>
      </div>
    </div>
  </section>
);
