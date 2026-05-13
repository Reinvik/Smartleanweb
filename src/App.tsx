import './index.css';
import { Hero } from './components/Hero';
import { Pillars } from './components/Pillars';
import { AICapabilities } from './components/AICapabilities';
import { DoubleMotor } from './components/DoubleMotor';
import { SuccessStories } from './components/SuccessStories';
import { Ecosystem } from './components/Ecosystem';
import { AIConcierge } from './components/AIConcierge';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Metodología', href: '#metodologia' },
  { label: 'IA', href: '#ia' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Casos', href: '#casos' },
  { label: 'Ecosistema', href: '#ecosistema' },
];

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    padding: '1.25rem 2rem',
    transition: 'all .35s',
    ...(scrolled ? {
      background: 'rgba(5,8,16,.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,.06)',
      padding: '.85rem 2rem',
    } : {})
  };

  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', color: 'var(--text-1)' }}>
      <div className="grid-overlay" />

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav style={navStyle}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '.75rem', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--em)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.2rem', color: '#020a14', lineHeight: 1 }}>S</span>
            </div>
            <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-.02em', textTransform: 'uppercase' }}>SmartLean</span>
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-2)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--em)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
              >{l.label}</a>
            ))}
          </div>

          <a href="mailto:ariel@smartlean.cl" className="btn-primary" style={{ padding: '.65rem 1.5rem', fontSize: '.72rem' }}>
            Contactar
          </a>
        </div>
      </nav>

      {/* ── MAIN ─────────────────────────────────────────────── */}
      <main>
        <Hero />
        <div className="divider" />
        <Pillars />
        <div className="divider" />
        <AICapabilities />
        <div className="divider" />
        <DoubleMotor />
        <div className="divider" />
        <SuccessStories />
        <div className="divider" />
        <Ecosystem />
      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '3rem 0', marginTop: '4rem' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--em-dim)', border: '1px solid var(--border-em)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Syne', fontWeight: 800, color: 'var(--em)', fontSize: '1rem', lineHeight: 1 }}>S</span>
            </div>
            <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '.85rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.05em' }}>SmartLean Chile · 2026</span>
          </div>
          <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
            Operational Excellence 4.0 → 5.0
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['LinkedIn', 'GitHub', 'Email'].map(s => (
              <a key={s} href={s === 'Email' ? 'mailto:ariel@smartlean.cl' : '#'} style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-3)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--em)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
              >{s}</a>
            ))}
          </div>
        </div>
      </footer>

      <AIConcierge />
    </div>
  );
}

export default App;
