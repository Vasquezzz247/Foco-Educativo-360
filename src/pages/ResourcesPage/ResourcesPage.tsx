import React, { useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { Container } from '../../components/ui/Layout';
import ResourceGrid from './components/ResourceGrid/ResourceGrid';
import ProgressBar from '../CapsulesPage/components/ProgressBar/ProgressBar'; // Reutilizamos
import styles from './ResourcesPage.module.css';

const ResourcesPage = () => {
  const { resources, isLoading, error, getProgress } = useContent();
  const progress = getProgress();

  if (isLoading) {
    return <div className={styles.loading}>Cargando recursos...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <Container size="lg" padding="xl" background="transparent" className={styles.pageContainer}>
      {/* Barra de progreso para recursos */}
      <ProgressBar 
        completed={progress.resourcesViewed}
        total={resources.length}
        label={`${progress.resourcesViewed}/${resources.length} recursos vistos`}
      />
      
      <div className={styles.header}>
        <h1 className={styles.title}>Recursos Neuroeducativos</h1>
        <p className={styles.subtitle}>
          Materiales, videos y herramientas para profundizar en neuroeducación
        </p>
      </div>

      <div className={styles.gridWrapper}>
        <ResourceGrid />
      </div>
    </Container>
  );
};

export default ResourcesPage;