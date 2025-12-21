import React, { useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { Container } from '../../components/ui/Layout';
import CapsuleGrid from './components/CapsuleGrid/CapsuleGrid';
import ProgressBar from './components/ProgressBar/ProgressBar';
import styles from './CapsulesPage.module.css';

const CapsulesPage = () => {
  const { capsules, isLoading, error, getProgress } = useContent();
  const progress = getProgress();

  useEffect(() => {
    // Si es necesario, aquí se podrá cargar datos de API
    console.log('Capsules loaded:', capsules.length);
  }, [capsules]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}>Cargando cápsulas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>{error}</div>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <Container size="lg" padding="xl" background="transparent" className={styles.pageContainer}>
      {/* Barra de progreso */}
      <ProgressBar 
        completed={progress.capsulesCompleted}
        total={capsules.length}
        label={`${progress.capsulesCompleted}/${capsules.length} cápsulas completadas`}
      />
      
      <div className={styles.header}>
        <h1 className={styles.title}>Cápsulas Neuroeducativas</h1>
        <p className={styles.subtitle}>
          Herramientas prácticas para optimizar la atención, concentración y aprendizaje significativo
        </p>
      </div>

      <div className={styles.gridWrapper}>
        <CapsuleGrid />
      </div>
    </Container>
  );
};

export default CapsulesPage;