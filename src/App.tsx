import { Hero } from './components/Hero';
import { Pillars } from './components/Pillars';
import { AICapabilities } from './components/AICapabilities';
import { DoubleMotor } from './components/DoubleMotor';
import { Ecosystem } from './components/Ecosystem';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-[#020617] selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-8 py-4 rounded-2xl border-white/5">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-xl">S</span>
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">SmartLean</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <a href="#" className="hover:text-emerald-500 transition-colors">Metodología</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Servicios</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Ecosistema</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Contacto</a>
          </div>
          
          <button className="px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-500 hover:text-black transition-all">
            Consultoría
          </button>
        </div>
      </nav>

      <main>
        <Hero />
        <Pillars />
        <AICapabilities />
        <DoubleMotor />
        <Ecosystem />
        
        {/* Simple Footer */}
        <footer className="py-20 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="size-6 bg-emerald-500/20 rounded flex items-center justify-center">
                <span className="text-emerald-500 font-black text-sm">S</span>
              </div>
              <span className="font-black text-sm tracking-tighter uppercase opacity-50">SmartLean Chile</span>
            </div>
            
            <div className="flex gap-10 text-[9px] font-black text-slate-600 uppercase tracking-widest">
              <span>© 2026 SmartLean</span>
              <span>Chile - Operational Excellence 5.0</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-slate-600 hover:text-emerald-500 transition-colors">LinkedIn</a>
              <a href="#" className="text-slate-600 hover:text-emerald-500 transition-colors">Twitter</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
