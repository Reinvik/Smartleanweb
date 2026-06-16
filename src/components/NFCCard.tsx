import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MessageSquare, 
  UserPlus, 
  ExternalLink, 
  Check, 
  Sparkles, 
  Play, 
  Mail, 
  Globe
} from 'lucide-react';

export interface NFCUser {
  name: string;
  role: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  initials: string;
}

interface NFCCardProps {
  user: NFCUser;
}

export function NFCCard({ user }: NFCCardProps) {
  const [copied, setCopied] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const downloadVCard = () => {
    setDownloaded(true);
    
    // Separar el nombre en N: Apellido;Nombre
    const nameParts = user.name.trim().split(/\s+/);
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : user.name;
    const formattedN = `${lastName};${firstName};;;`;

    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${user.name}`,
      `N:${formattedN}`,
      'ORG:SmartLean',
      `TITLE:${user.role}`,
      `TEL;TYPE=CELL,VOICE;VALUE=uri:tel:${user.phone.replace(/\s+/g, '')}`,
      `EMAIL;TYPE=PREF,INTERNET:${user.email}`,
      'URL:https://smartlean.cl',
      'URL;TYPE=NexusGarage:https://nexusgarage.cl',
      `NOTE:Contacto escaneado desde Tarjeta NFC de ${user.name}.`,
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${user.name.replace(/\s+/g, '_')}_SmartLean.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setTimeout(() => setDownloaded(false), 3000);
  };

  const openWhatsApp = () => {
    const firstName = user.name.split(' ')[0];
    const message = encodeURIComponent(`Hola ${firstName}, acabo de escanear tu tarjeta de presentación NFC. ¡Un gusto conectar contigo!`);
    const cleanPhone = user.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const makeCall = () => {
    window.open(`tel:${user.phone.replace(/\s+/g, '')}`, '_self');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Variantes para animación staggered
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 120, damping: 12 } }
  };

  return (
    <div className="nfc-page-wrapper">
      {/* Elementos de fondo decorativos y dinámicos */}
      <div className="nfc-bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="nfc-container">
        <motion.div 
          className="nfc-card-body"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* ── SECCIÓN: CABECERA Y AVATAR ── */}
          <motion.div className="nfc-header-section" variants={itemVariants}>
            <div className="nfc-avatar-container">
              <div className="nfc-avatar-glow" />
              <div className="nfc-avatar-main">
                {user.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <span className="nfc-avatar-initials">{user.initials}</span>
                )}
              </div>
              <motion.div 
                className="nfc-avatar-badge"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <img src="/logo-icon.png" alt="SmartLean Logo Icon" />
              </motion.div>
            </div>

            <h1 className="nfc-name">{user.name}</h1>
            <p className="nfc-role">{user.role}</p>
            <div className="nfc-verified-badge">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>Contacto Verificado</span>
            </div>
          </motion.div>

          {/* ── SECCIÓN: ACCIONES PRINCIPALES ── */}
          <motion.div className="nfc-actions-section" variants={itemVariants}>
            {/* Botón Principal: Guardar en Contactos */}
            <motion.button 
              className={`nfc-btn-main ${downloaded ? 'downloaded' : ''}`}
              onClick={downloadVCard}
              whileTap={{ scale: 0.98 }}
            >
              {downloaded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>¡Contacto Guardado!</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Guardar Contacto</span>
                </>
              )}
            </motion.button>

            {/* Fila de Botones: WhatsApp y Llamar */}
            <div className="nfc-buttons-row">
              <motion.button 
                className="nfc-btn-sec whatsapp"
                onClick={openWhatsApp}
                whileTap={{ scale: 0.97 }}
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </motion.button>

              <motion.button 
                className="nfc-btn-sec call"
                onClick={makeCall}
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-4 h-4" />
                <span>Llamar</span>
              </motion.button>
            </div>
          </motion.div>

          {/* ── SECCIÓN: SITIOS WEB Y PROYECTOS ── */}
          <motion.div className="nfc-projects-section" variants={itemVariants}>
            <h2 className="nfc-section-title">Ecosistema & Empresas</h2>
            
            {/* Proyecto 1: SmartLean */}
            <a href="https://smartlean.cl" target="_blank" rel="noopener noreferrer" className="nfc-project-card smartlean">
              <div className="project-card-header">
                <div className="project-brand">
                  <img src="/logo-icon.png" alt="SmartLean" className="project-logo" />
                  <div>
                    <h3>SmartLean</h3>
                    <p>Consultoría Lean & Software con IA</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </div>
              <p className="project-desc">Transformación digital y optimización de procesos operativos.</p>
              <div className="project-tag-container">
                <span className="project-tag">Lean Ops</span>
                <span className="project-tag">Software IA</span>
              </div>
            </a>

            {/* Proyecto 2: Nexus Garage */}
            <a href="https://nexusgarage.cl" target="_blank" rel="noopener noreferrer" className="nfc-project-card nexusgarage">
              <div className="project-card-header">
                <div className="project-brand">
                  <img src="/logo-nexus-garage.png" alt="Nexus Garage Logo" className="project-logo" style={{ borderRadius: '8px', background: '#ffffff', padding: '2px' }} />
                  <div>
                    <h3>Nexus Garage</h3>
                    <p>El Motor de tu Taller</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-orange-400" />
              </div>
              <p className="project-desc">Control total para talleres mecánicos. Gestión de repuestos, tickets y órdenes de trabajo en tiempo real.</p>
              <div className="project-tag-container">
                <span className="project-tag orange">Automotriz</span>
                <span className="project-tag orange">SaaS</span>
              </div>
            </a>
          </motion.div>

          {/* ── SECCIÓN: VIDEO DE PRESENTACIÓN ── */}
          <motion.div className="nfc-video-section" variants={itemVariants}>
            <h2 className="nfc-section-title">Video Nexus Garage</h2>
            
            <div className="nfc-video-container">
              {!playVideo ? (
                <div 
                  className="nfc-video-thumbnail"
                  onClick={() => setPlayVideo(true)}
                >
                  <img 
                    src="https://img.youtube.com/vi/BO2ziOQvAIY/maxresdefault.jpg" 
                    alt="Nexus Garage Presentación" 
                    className="thumbnail-img"
                  />
                  <div className="thumbnail-overlay" />
                  
                  {/* Botón de Play Animado */}
                  <motion.div 
                    className="nfc-video-play-btn"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <Play className="w-6 h-6 fill-current text-white ml-0.5" />
                  </motion.div>
                  
                  <span className="video-duration-badge">2:18 min</span>
                </div>
              ) : (
                <iframe 
                  className="nfc-iframe"
                  src="https://www.youtube.com/embed/BO2ziOQvAIY?autoplay=1&rel=0" 
                  title="Nexus Garage Presentación" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>

          {/* ── SECCIÓN: INFO DE CONTACTO RÁPIDO ── */}
          <motion.div className="nfc-info-section" variants={itemVariants}>
            <div className="nfc-info-row" onClick={copyToClipboard}>
              <div className="nfc-info-icon"><Phone className="w-4 h-4 text-sky-400" /></div>
              <div className="nfc-info-content">
                <span className="info-label">Teléfono / WhatsApp</span>
                <span className="info-value">{user.phone}</span>
              </div>
              <span className="info-action-text">{copied ? '¡Copiado!' : 'Copiar'}</span>
            </div>

            <div className="nfc-info-row" onClick={() => window.open(`mailto:${user.email}`, '_self')}>
              <div className="nfc-info-icon"><Mail className="w-4 h-4 text-sky-400" /></div>
              <div className="nfc-info-content">
                <span className="info-label">Correo Electrónico</span>
                <span className="info-value">{user.email}</span>
              </div>
              <span className="info-action-text">Enviar</span>
            </div>

            <div className="nfc-info-row" onClick={() => window.open('https://smartlean.cl', '_blank')}>
              <div className="nfc-info-icon"><Globe className="w-4 h-4 text-sky-400" /></div>
              <div className="nfc-info-content">
                <span className="info-label">Sitio Web Oficial</span>
                <span className="info-value">smartlean.cl</span>
              </div>
              <span className="info-action-text">Visitar</span>
            </div>
          </motion.div>

          {/* ── SECCIÓN: FOOTER TARJETA ── */}
          <motion.div className="nfc-footer" variants={itemVariants}>
            <p className="nfc-footer-brand">
              <img src="/logo-icon.png" alt="SmartLean Logo" />
              <span>SmartLean Operational Excellence 5.0</span>
            </p>
            <p className="nfc-footer-tagline">Soluciones avanzadas para la excelencia operacional.</p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
