import React from 'react';
import styles from './DocentesHero.module.css';

const DocentesHero: React.FC = () => {
  return (
    <section className={styles.docentesHero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>Recursos para Docentes</h1>
        <p className={styles.subtitle}>
          Herramientas prácticas basadas en neurociencia educativa para transformar tu práctica docente
        </p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>3</span>
            <span className={styles.statLabel}>Recursos Descargables</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>3</span>
            <span className={styles.statLabel}>Videos Educativos</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>1</span>
            <span className={styles.statLabel}>Sitio Recomendado</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocentesHero;