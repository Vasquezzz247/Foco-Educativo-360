import React from 'react';
import styles from './Section.module.css';

interface SubSectionProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

const SubSection: React.FC<SubSectionProps> = ({
  children,
  columns = 1,
  gap = 'md',
  align = 'stretch',
  className = '',
}) => {
  return (
    <div 
      className={`
        ${styles.subSection}
        ${styles[`columns-${columns}`]}
        ${styles[`gap-${gap}`]}
        ${styles[`align-${align}`]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default SubSection;