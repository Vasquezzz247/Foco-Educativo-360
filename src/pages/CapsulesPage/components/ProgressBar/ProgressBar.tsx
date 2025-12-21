import React from 'react'
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  completed: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  completed, 
  total, 
  label, 
  showPercentage = true 
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={styles.progressContainer}>
      {label && <div className={styles.progressLabel}>{label}</div>}
      
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
        >
          {showPercentage && (
            <span className={styles.progressText}>{percentage}%</span>
          )}
        </div>
      </div>
      
      {!showPercentage && (
        <div className={styles.progressNumbers}>
          <span>{completed}</span> / <span>{total}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;