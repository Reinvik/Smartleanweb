import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, ChevronRight } from 'lucide-react';

const words = ['Rentabilidad.', 'Eficiencia.', 'Futuro.'];

export const Hero = () => {
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', overflow: 'hidden' }}>
      {/* Blobs */}
      <div className="blob blob-em" style={{ width: 700, height: 700, top: '-20%', left: '-15%', opacity: 0.6 }} />
      <div className="blob blob-sky" style={{ width: 500, height: 500, bottom: '-10%', right: '-10%', opacity: 0.4 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>
          <div className="badge" style={{ marginBottom: '2rem' }}>
            <Zap size={12} />
            Metodología Propietaria · Industry 5.0
          </div>

          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '1.5rem' }}>
            <span className="gradient-title">Instalamos</span><br />
            <span className="gradient-em">{words[wordIdx]}</span><br />
            <span className="gradient-title">En tu Empresa.</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-2)', maxWidth: '620px', lineHeight: 1.7, marginBottom: '3rem' }}>
            SmartLean es el puente entre la excelencia operacional 4.0 y la inteligencia autónoma 5.0. 
            Datos, IA y metodología Lean, orquestados como un solo sistema.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '5rem' }}>
            <button className="btn-primary">
              Agenda tu Diagnóstico <ArrowRight size={16} />
            </button>
            <button className="btn-ghost">
              Ver Ecosistema Nexus <ChevronRight size={16} />
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
            {[
              { value: '+40%', label: 'Rentabilidad operativa' },
              { value: '5', label: 'Pilares metodológicos' },
              { value: '3+', label: 'Módulos Nexus activos' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.15 }}>
                <div className="stat-number">{s.value}</div>
                <p style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginTop: '.4rem' }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
