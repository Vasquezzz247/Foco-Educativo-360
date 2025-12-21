import CapsuleGrid from './components/CapsuleGrid/CapsuleGrid';
import styles from './CapsulesPage.module.css';

const CapsulesPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Cápsulas Neuroeducativas</h1>
        <p className={styles.subtitle}>
          Herramientas prácticas para optimizar la atención, concentración y aprendizaje significativo
        </p>
      </div>
      
      <div className={styles.gridContainer}>
        <CapsuleGrid />
      </div>
    </div>
  );
};

export default CapsulesPage;



