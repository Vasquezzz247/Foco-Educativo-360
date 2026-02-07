import React, { useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { Container } from '../../components/ui/Layout';
import backgroundImage from '../../assets/images/background/background-site.png';
import ResourceGrid from './components/ResourceGrid/ResourceGrid';
import ProgressBar from '../CapsulesPage/components/ProgressBar/ProgressBar';
import styles from './ResourcesPage.module.css';
import PageLayout from '../../components/layout/PageLayout';

const ResourcesPage = () => {
  const { resources, isLoading, error, getProgress } = useContent();
  const progress = getProgress();

  if (isLoading) {
    return (
      <PageLayout showBreadcrumb={true}>
        <div className={styles.loadingContainer}>
          <div className={styles.loader}>Cargando recursos...</div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout showBreadcrumb={true}>
        <div className={styles.errorContainer}>
          <div className={styles.errorMessage}>{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className={styles.retryButton}
          >
            Reintentar
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout showBreadcrumb={true}
    backgroundImage={backgroundImage}
    backgroundProps={{
      opacity: 0.9,
      overlay: true,
      overlayColor: "rgba(184, 234, 255, 0.1)",
      overlayOpacity: 0.1
    }}
    >
    <Container 
    size="lg" 
    padding="xl" 
    background="transparent" 
    className={styles.pageContainer}>
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
    </PageLayout>
  );
};

export default ResourcesPage;
