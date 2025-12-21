import React from 'react';
import { Container } from '../../../../components/ui/Layout';
import { Link } from 'react-router-dom';
import styles from './ResourceDetailPage.module.css';
import videoThumb from '../../../../assets/images/thumbnails/recurso-conociendo-el-cerebro.jpg';
import recursoImage from '../../../../assets/images/recursos/recurso-conoce-el-cerebro.png';
import videoSrc from '../../../../assets/videos/recurso-conociendo-el-cerebro.mp4';

const ResourceDetailPage = () => {
  return (
    <Container size="lg" className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/recursos">Recursos</Link> 
        <span> / </span>
        <span>Conociendo el Cerebro</span>
      </nav>
      
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.badge}>🎬 Video</div>
        <h1 className={styles.title}>Conociendo el Cerebro</h1>
        <p className={styles.subtitle}>
          Video introductorio sobre neuroeducación y cómo funciona el cerebro en procesos de aprendizaje.
        </p>
        <div className={styles.meta}>
          <span className={styles.duration}>Duración: 07:13</span>
          <span className={styles.tags}>
            Etiquetas: <span>Neurociencia</span>, <span>Introducción</span>, <span>Video</span>
          </span>
        </div>
      </header>
      
      {/* Contenido principal */}
      <div className={styles.content}>
        {/* Video */}
        <section className={styles.videoSection}>
          <h2 className={styles.sectionTitle}>Video del Recurso</h2>
          <div className={styles.videoContainer}>
            <video 
              src={videoSrc}
              controls
              poster={videoThumb}
              className={styles.video}
            >
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        </section>
        
        {/* Imagen adicional */}
        <section className={styles.imageSection}>
          <h2 className={styles.sectionTitle}>Recurso Visual</h2>
          <div className={styles.imageContainer}>
            <img 
              src={recursoImage} 
              alt="Conoce el cerebro - Recurso visual"
              className={styles.resourceImage}
            />
            <p className={styles.imageCaption}>
              Diagrama explicativo sobre las áreas del cerebro involucradas en el aprendizaje.
            </p>
          </div>
        </section>
        
        {/* Descripción */}
        <section className={styles.descriptionSection}>
          <h2 className={styles.sectionTitle}>Descripción</h2>
          <div className={styles.descriptionContent}>
            <p>
              Este recurso visual y auditivo te introduce al fascinante mundo de la neuroeducación.
              Aprenderás cómo diferentes áreas del cerebro se activan durante el proceso de 
              aprendizaje y cómo puedes aplicar estos conocimientos en el aula.
            </p>
            <h3>Lo que aprenderás:</h3>
            <ul>
              <li>Funcionamiento básico del cerebro en contextos educativos</li>
              <li>Áreas cerebrales clave para el aprendizaje</li>
              <li>Consejos para aplicar la neurociencia en la enseñanza</li>
              <li>Estrategias basadas en evidencia científica</li>
            </ul>
          </div>
        </section>
        
        {/* CTA */}
        <div className={styles.ctaSection}>
          <Link to="/recursos" className={styles.backButton}>
            ← Volver a Recursos
          </Link>
          <button className={styles.downloadButton}>
            📥 Descargar Material Complementario
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ResourceDetailPage;