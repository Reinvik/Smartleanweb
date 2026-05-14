import './index.css';
import { Hero } from './components/Hero';
import { Pillars } from './components/Pillars';
import { TechCore } from './components/TechCore';
import { DoubleMotor } from './components/DoubleMotor';
import { SuccessStories } from './components/SuccessStories';
import { Ecosystem } from './components/Ecosystem';
import { AIConcierge } from './components/AIConcierge';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Metodología', href: '#metodologia' },
  { label: 'Tecnología', href: '#tecnologia' },
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
      background: 'rgba(10,15,28,.85)',
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
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', textDecoration: 'none', color: 'inherit' }}>
            <img src="/logo-icon.png" alt="SmartLean Logo" style={{ width: 42, height: 42, objectFit: 'contain' }} />
            <div>
              <span style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-.04em', textTransform: 'uppercase', display: 'block', lineHeight: 1 }}>SmartLean</span>
              <span style={{ fontSize: '.5rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--text-3)', display: 'block' }}>Operational Excellence 5.0 → Nexus</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-2)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--em)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
              >{l.label}</a>
            ))}
          </div>

          <a href="mailto:ariel@smartlean.cl" className="btn-primary desktop-only" style={{ padding: '.65rem 1.5rem', fontSize: '.72rem' }}>
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
        <TechCore />
        <div className="divider" />
        <DoubleMotor />
        <div className="divider" />
        <SuccessStories />
        <div className="divider" />
        <Ecosystem />
      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '3rem 0', marginTop: '4rem' }}>
        <div className="container mobile-stack" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <img src="/logo-icon.png" alt="Logo" style={{ width: 28, height: 28, objectFit: 'contain', filter: 'brightness(0.8)' }} />
            <span style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '.85rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.05em' }}>Ariel Mella · SmartLean · 2026</span>
          </div>
          <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
            Operational Excellence 4.0 → 5.0
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="https://www.linkedin.com/in/arielmella/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-3)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--em)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
              >LinkedIn</a>
            <a href="https://github.com/Reinvik" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-3)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--em)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
              >GitHub</a>
            <a href="mailto:ariel@smartlean.cl" style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-3)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--em)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
              >Email</a>
          </div>
        </div>
      </footer>

      <AIConcierge />
    </div>
  );
}

export default App;
