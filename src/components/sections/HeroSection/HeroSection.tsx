import React, { useRef, useState } from 'react';
import { Container } from '../../ui/Layout';
import styles from './HeroSection.module.css';
import { FaPlay, FaPause, FaArrowRight, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className={styles.heroSection}>
      {/* Overlay */}
      <div className={styles.heroOverlay} />
      
      <Container size="xl" className={styles.heroContainer}>
        <div className={styles.heroGrid}>
          
          {/* Columna izquierda: Texto y CTA - PRIMERO EN MÓVIL */}
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>🚀</span>
              <span className={styles.badgeText}>Plataforma Educativa Innovadora</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              <span className={styles.titleHighlight}>Foco Educativo 360:</span>
              <span className={styles.titleLine}>Atención que transforma</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Herramientas neuroeducativas para mejorar la atención en el aula y potenciar el aprendizaje.
            </p>
            
            {/* Botones principales */}
            <div className={styles.ctaButtons}>
              <button className={`${styles.ctaButton} ${styles.primaryCta}`}>
                <span className={styles.buttonIcon}>🧠</span>
                <span className={styles.buttonContent}>
                  <span className={styles.buttonMain}>Soy Docente</span>
                  <span className={styles.buttonSub}>Acceso a recursos educativos</span>
                </span>
                <FaArrowRight className={styles.buttonArrow} />
              </button>
              
              <button className={`${styles.ctaButton} ${styles.secondaryCta}`}>
                <span className={styles.buttonIcon}>🎯</span>
                <span className={styles.buttonContent}>
                  <span className={styles.buttonMain}>Soy Estudiante</span>
                  <span className={styles.buttonSub}>Explora cápsulas de aprendizaje</span>
                </span>
                <FaArrowRight className={styles.buttonArrow} />
              </button>
            </div>
            
            {/* Estadísticas */}
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Docentes</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10,000+</span>
                <span className={styles.statLabel}>Estudiantes</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <span className={styles.statNumber}>98%</span>
                <span className={styles.statLabel}>Satisfacción</span>
              </div>
            </div>
          </div>
          
          {/* Columna derecha: Video Local - SEGUNDO EN MÓVIL */}
          <div className={styles.heroVideo}>
            <div className={styles.videoContainer}>
              <div 
                className={styles.videoWrapper}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <video
                  ref={videoRef}
                  className={styles.videoPlayer}
                  poster="/src/assets/images/thumbnails/video-bienvenida.webp"
                  loop
                  muted={isMuted}
                  onEnded={handleVideoEnded}
                  preload="metadata"
                >
                  <source 
                    src="/src/assets/videos/video-bienvenida.mp4" 
                    type="video/mp4" 
                  />
                  <source 
                    src="/src/assets/videos/video-bienvenida.webm" 
                    type="video/webm" 
                  />
                  Tu navegador no soporta videos HTML5.
                </video>
                
                {/* Controles personalizados */}
                <div className={`${styles.videoControls} ${showControls ? styles.visible : ''}`}>
                  <button 
                    className={styles.controlButton}
                    onClick={handleVideoPlay}
                    aria-label={isVideoPlaying ? "Pausar video" : "Reproducir video"}
                  >
                    {isVideoPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  
                  <button 
                    className={styles.controlButton}
                    onClick={toggleMute}
                    aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                  >
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                  
                  <div className={styles.videoInfo}>
                    <span className={styles.videoDuration}>2:30</span>
                    <span className={styles.videoLabel}>Video Explicativo</span>
                  </div>
                </div>
                
                {/* Overlay de play cuando está pausado */}
                {!isVideoPlaying && (
                  <div 
                    className={styles.videoOverlay}
                    onClick={handleVideoPlay}
                  >
                    <button 
                      className={styles.playOverlayButton}
                      aria-label="Reproducir video"
                    >
                      <FaPlay className={styles.playOverlayIcon} />
                      <span className={styles.playOverlayText}>Ver video explicativo</span>
                    </button>
                  </div>
                )}
              </div>
              
              {/* Características destacadas - OCULTAR EN MÓVIL PEQUEÑO */}
              <div className={styles.videoFeatures}>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>⚡</div>
                  <div className={styles.featureText}>
                    <span className={styles.featureTitle}>Rápido</span>
                    <span className={styles.featureDesc}>Implementación en minutos</span>
                  </div>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>🎨</div>
                  <div className={styles.featureText}>
                    <span className={styles.featureTitle}>Intuitivo</span>
                    <span className={styles.featureDesc}>Interfaz amigable</span>
                  </div>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>📱</div>
                  <div className={styles.featureText}>
                    <span className={styles.featureTitle}>Multiplataforma</span>
                    <span className={styles.featureDesc}>Acceso desde cualquier dispositivo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Scroll indicator - OCULTAR EN MÓVIL */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Desplázate para explorar</span>
        <div className={styles.scrollArrow}></div>
      </div>
    </section>
  );
};

export default HeroSection;