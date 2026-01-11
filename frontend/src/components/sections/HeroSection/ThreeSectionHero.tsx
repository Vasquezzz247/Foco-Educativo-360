import React from 'react';
import Container from '../../ui/Layout/Container';
import Overlay from '../../ui/Overlay/Overlay';
import Button from '../../ui/Button/Button';
import styles from './HeroSection.module.css';

const ThreeSectionHero: React.FC = () => {
  return (
    <section className={styles.threeSectionHero}>
      {/* Fondo con overlay */}
      <div className={styles.heroBackground}>
        <Overlay opacity={0.4} color="black" blur />
      </div>
      
      <Container size="xl" className={styles.heroContainer}>
        
        {/* Sección 1: Título principal */}
        <div className={styles.section} data-section="title">
          <h1 className={styles.sectionTitle}>
            Educación <span className={styles.accent}>360°</span>
          </h1>
          <p className={styles.sectionSubtitle}>
            Donde la neurociencia encuentra la pedagogía
          </p>
        </div>
        
        {/* Sección 2: Descripción */}
        <div className={styles.section} data-section="description">
          <div className={styles.descriptionCard}>
            <h2 className={styles.cardTitle}>Nuestro Enfoque</h2>
            <p className={styles.cardText}>
              Integramos principios de neuroeducación para crear experiencias 
              de aprendizaje que respetan los procesos cognitivos naturales 
              de cada estudiante, maximizando la retención y comprensión.
            </p>
            <div className={styles.pillList}>
              <span className={styles.pill}>Aprendizaje Significativo</span>
              <span className={styles.pill}>Neuroplasticidad</span>
              <span className={styles.pill}>Metacognición</span>
            </div>
          </div>
        </div>
        
        {/* Sección 3: CTA */}
        <div className={styles.section} data-section="cta">
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>
              ¿Listo para transformar la educación?
            </h3>
            <p className={styles.ctaText}>
              Únete a nuestra comunidad de educadores y estudiantes comprometidos 
              con la excelencia educativa basada en evidencia científica.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="primary" size="lg" icon="🚀">
                Comenzar ahora
              </Button>
              <Button variant="outline" size="lg" icon="🎥">
                Ver video explicativo
              </Button>
            </div>
            <div className={styles.trustBadges}>
              <span className={styles.badge}>+500 Instituciones</span>
              <span className={styles.badge}>+10.000 Estudiantes</span>
              <span className={styles.badge}>98% Satisfacción</span>
            </div>
          </div>
        </div>
        
      </Container>
    </section>
  );
};

export default ThreeSectionHero;