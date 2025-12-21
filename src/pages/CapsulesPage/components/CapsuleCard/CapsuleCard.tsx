import React from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../../../../components/ui/Card/Card';
import styles from './CapsuleCard.module.css';

export interface CapsuleCardProps {
  capsule: {
    id: number;
    name: string;
    neuroAxis: string;
    cognitiveObjective: string;
    colorTheme?: string;
  };
}

const CapsuleCard: React.FC<CapsuleCardProps> = ({ capsule }) => {
  return (
    <Card 
      variant="elevated" 
      hover={true}
      className={styles.capsuleCard}
    >
      <CardHeader className={styles.cardHeader}>
        <div className={styles.headerTop}>
          <div 
            className={styles.numberBadge}
            style={{ backgroundColor: capsule.colorTheme || 'var(--color-secondary)' }}
          >
            #{capsule.id}
          </div>
          <h3 className={styles.title}>{capsule.name}</h3>
        </div>
      </CardHeader>
      
      <CardBody className={styles.cardBody}>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>EJE NEUROEDUCATIVO</h4>
          <p className={styles.text}>{capsule.neuroAxis}</p>
        </div>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>OBJETIVO COGNITIVO</h4>
          <p className={styles.text}>{capsule.cognitiveObjective}</p>
        </div>
      </CardBody>
      
      <CardFooter className={styles.cardFooter}>
        <button className={styles.button}>Ver más</button>
      </CardFooter>
    </Card>
  );
};

export default CapsuleCard;


/* VERSIÓN DIAGNÓSTICO

import React from 'react';
import styles from './CapsuleCard.module.css';

export interface CapsuleCardProps {
  capsule: {
    id: number;
    name: string;
    neuroAxis: string;
    cognitiveObjective: string;
    colorTheme?: string;
  };
}

const CapsuleCard: React.FC<CapsuleCardProps> = ({ capsule }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.number}>#{capsule.id}</div>
        <h3 className={styles.name}>{capsule.name}</h3>
      </div>
      
      <div className={styles.content}>
        <div className={styles.section}>
          <h4 className={styles.label}>EJE NEUROEDUCATIVO</h4>
          <p className={styles.text}>{capsule.neuroAxis}</p>
        </div>
        
        <div className={styles.section}>
          <h4 className={styles.label}>OBJETIVO COGNITIVO</h4>
          <p className={styles.text}>{capsule.cognitiveObjective}</p>
        </div>
      </div>
      
      <button className={styles.button}>Ver más</button>
    </div>
  );
};

export default CapsuleCard; */