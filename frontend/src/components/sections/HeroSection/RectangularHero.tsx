import React from 'react';
import { Container } from '../../ui/Layout';
import styles from './HeroSection.module.css';

const RectangularHero: React.FC = () => {
  return (
    <section className={styles.rectangularHero}>
      <Container size="xl" className={styles.heroWrapper}>
        <div className={styles.heroRectangle}>
          <div className={styles.rectangleContent}>
            
            <div className={styles.textSection}>
              <h1 className={styles.mainTitle}>
                Foco Educativo 360
              </h1>
              <h2 className={styles.subTitle}>
                Neurociencia aplicada al aprendizaje
              </h2>
              <p className={styles.description}>
                Integramos principios de neuroeducación para crear experiencias 
                de aprendizaje significativas y efectivas para estudiantes y docentes.
              </p>
            </div>
            
            <div className={styles.ctaSection}>
              <button className={styles.primaryBtn}>
                Explorar plataforma
              </button>
              <button className={styles.secondaryBtn}>
                Solicitar demo
              </button>
            </div>
            
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RectangularHero;