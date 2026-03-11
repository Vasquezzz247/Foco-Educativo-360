import React, { useState } from 'react';
import PageLayout from '../../../../components/layout/PageLayout';
import { Container } from '../../../../components/ui/Layout';
import { Link } from 'react-router-dom';
import styles from './ResourceDetailPage.module.css';
import backgroundImage from '../../../../assets/images/background/background-site.png';
import videoThumb from '../../../../assets/images/thumbnails/recurso-conociendo-el-cerebro.jpg';
import recursoImage from '../../../../assets/images/recursos/recurso-conoce-el-cerebro.png';
import { assets } from '../../../../utils/assetImports';
import { useAssets } from '../../../../hooks/useAssets';

const ResourceDetailPage = () => {
  const assets = useAssets();
  const [isDownloading, setIsDownloading] = useState(false);

  const videoSrc = assets.getVideo('recursoConociendoCerebro');

const handleDownloadPPTX = () => {
  try {
    setIsDownloading(true);
    
    const pptxUrl = `${assets.getPptx('cerebroAprendeEmocion')}`;
    
    const link = document.createElement('a');
    link.href = pptxUrl;
    link.download = 'cerebro-aprende-emocion.pptx';
    
    link.click();
    
    setTimeout(() => {
      setIsDownloading(false);
      alert('✅ Presentación descargada exitosamente');
    }, 1500);
    
  } catch (error) {
    console.error('Error al descargar:', error);
    setIsDownloading(false);
    alert('❌ Error al descargar el archivo. Por favor, intenta nuevamente.');
  }
};

  return (
    <PageLayout 
      showBreadcrumb={true}
      backgroundImage={backgroundImage}
      backgroundProps={{
        opacity: 0.9,
        overlay: true,
        overlayColor: "rgba(184, 234, 255, 0.1)",
        overlayOpacity: 0.1
      }}
    >
      <div className={styles.resourceDetailPage}>
        <Container size="lg" className={styles.container}>
          
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
                  onError={(e) => {
                    // Fallback en caso de error
                    e.currentTarget.src = 'https://via.placeholder.com/800x450?text=Recurso+Visual';
                  }}
                />
                <p className={styles.imageCaption}>
                  Diagrama explicativo sobre las áreas del cerebro involucradas en el aprendizaje.
                </p>
              </div>
            </section>
            
            {/* Sección de Material Complementario */}
            <section className={styles.complementaryMaterialSection}>
              <h2 className={styles.sectionTitle}>Material Complementario</h2>
              <div className={styles.materialCard}>
                <div className={styles.materialIcon}>📊</div>
                <div className={styles.materialInfo}>
                  <h3>Presentación: "El Cerebro Aprende con Emoción"</h3>
                  <p className={styles.materialDescription}>
                    Presentación en PowerPoint con información adicional sobre 
                    neurociencia del aprendizaje emocional. Ideal para talleres y capacitaciones.
                  </p>
                  <div className={styles.materialDetails}>
                    <span className={styles.materialType}>
                      <strong>Tipo:</strong> Presentación PowerPoint
                    </span>
                    <span className={styles.materialSize}>
                      <strong>Tamaño:</strong> 3.65 MB
                    </span>
                    <span className={styles.materialPages}>
                      <strong>Diapositivas:</strong> 6
                    </span>
                  </div>
                </div>
                <button 
                  className={styles.downloadButton}
                  onClick={handleDownloadPPTX}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <span className={styles.spinner}></span>
                      Descargando...
                    </>
                  ) : (
                    <>
                      📥 Descargar Presentación
                    </>
                  )}
                </button>
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
                <ul className={styles.learningList}>
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
            </div>
          </div>
        </Container>
      </div>
    </PageLayout>
  );
};

export default ResourceDetailPage;
