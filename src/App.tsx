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
            <svg width="32" height="32" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="nlg" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#135aec"/>
                  <stop offset="100%" stopColor="#0ea5e9"/>
                </linearGradient>
              </defs>
              <path d="M4 44 Q14 10 28 18 Q42 26 52 8" stroke="url(#nlg)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {([[28,18],[42,26],[52,8],[36,32],[20,36],[10,28]] as [number,number][]).map(([cx,cy],i)=>(
                <circle key={i} cx={cx} cy={cy} r="3.5" fill="url(#nlg)" opacity={0.9}/>
              ))}
              <line x1="28" y1="18" x2="42" y2="26" stroke="url(#nlg)" strokeWidth="1.5" opacity="0.5"/>
              <line x1="42" y1="26" x2="52" y2="8" stroke="url(#nlg)" strokeWidth="1.5" opacity="0.5"/>
              <line x1="28" y1="18" x2="36" y2="32" stroke="url(#nlg)" strokeWidth="1.5" opacity="0.5"/>
              <line x1="36" y1="32" x2="20" y2="36" stroke="url(#nlg)" strokeWidth="1.5" opacity="0.5"/>
              <line x1="20" y1="36" x2="10" y2="28" stroke="url(#nlg)" strokeWidth="1.5" opacity="0.5"/>
            </svg>
            <div>
              <span style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-.04em', textTransform: 'uppercase', display: 'block', lineHeight: 1 }}>SmartLean</span>
              <span style={{ fontSize: '.5rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--text-3)', display: 'block' }}>Operational Excellence 5.0</span>
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
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--em-dim)', border: '1px solid var(--border-em)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Inter', fontWeight: 900, color: 'var(--em)', fontSize: '1rem', lineHeight: 1 }}>S</span>
            </div>
            <span style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '.85rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.05em' }}>SmartLean Production · 2026</span>
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
