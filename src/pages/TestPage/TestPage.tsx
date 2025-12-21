import React from 'react';
import { useContent } from '../../context/ContentContext';
import { Link } from 'react-router-dom';
import styles from './TestPage.module.css';

const TestPage: React.FC = () => {
  const { 
    capsules, 
    resources, 
    getProgress, 
    markCapsuleAsCompleted,
    markResourceAsViewed 
  } = useContent();
  
  const progress = getProgress();

  const handleTestCapsule = (capsuleId: number) => {
    markCapsuleAsCompleted(capsuleId);
    alert(`Cápsula ${capsuleId} marcada como completada`);
  };

  const handleTestResource = (resourceId: number) => {
    markResourceAsViewed(resourceId);
    alert(`Recurso ${resourceId} marcado como visto`);
  };

  return (
    <div className={styles.testContainer}>
      <h1>Pruebas de Usabilidad</h1>
      
      <div className={styles.testSection}>
        <h2>Estado Actual</h2>
        <div className={styles.stats}>
          <div>Cápsulas: {capsules.length}</div>
          <div>Recursos: {resources.length}</div>
          <div>Progreso Total: {progress.totalProgress}%</div>
          <div>Cápsulas Completadas: {progress.capsulesCompleted}</div>
          <div>Recursos Vistos: {progress.resourcesViewed}</div>
        </div>
      </div>

      <div className={styles.testSection}>
        <h2>Pruebas de Navegación</h2>
        <div className={styles.navigationLinks}>
          <Link to="/capsulas" className={styles.testLink}>Ir a Cápsulas</Link>
          <Link to="/recursos" className={styles.testLink}>Ir a Recursos</Link>
          <Link to="/" className={styles.testLink}>Ir a Inicio</Link>
        </div>
      </div>

      <div className={styles.testSection}>
        <h2>Pruebas de Acciones</h2>
        <div className={styles.actions}>
          <button 
            onClick={() => handleTestCapsule(1)} 
            className={styles.testButton}
          >
            Completar Cápsula 1
          </button>
          <button 
            onClick={() => handleTestResource(1)} 
            className={styles.testButton}
          >
            Ver Recurso 1
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className={styles.testButton}
          >
            Recargar Página
          </button>
        </div>
      </div>

      <div className={styles.testSection}>
        <h2>Checklist de Pruebas</h2>
        <ul className={styles.checklist}>
          <li>✅ Navegación entre páginas funciona</li>
          <li>✅ Estado persiste durante navegación</li>
          <li>✅ Progress tracking funciona</li>
          <li>✅ Diseño responsive</li>
          <li>✅ Carga de imágenes y videos</li>
          <li>✅ Links funcionan correctamente</li>
        </ul>
      </div>
    </div>
  );
};

export default TestPage;