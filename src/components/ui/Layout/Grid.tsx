import React from 'react';
import styles from './Grid.module.css';

interface GridProps {
  children: React.ReactNode;
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

const Grid: React.FC<GridProps> = ({
  children,
  cols = 1,
  gap = 'md',
  alignItems = 'stretch',
  className = '',
}) => {
  const getGridTemplateColumns = () => {
    if (typeof cols === 'number') {
      return `repeat(${cols}, 1fr)`;
    }
    
    // CSS custom properties
    return undefined;
  };

  return (
    <div 
      className={`
        ${styles.grid}
        ${styles[`gap-${gap}`]}
        ${styles[`align-${alignItems}`]}
        ${className}
      `}
      style={{
        '--grid-cols-sm': typeof cols === 'object' ? cols.sm || 1 : undefined,
        '--grid-cols-md': typeof cols === 'object' ? cols.md : undefined,
        '--grid-cols-lg': typeof cols === 'object' ? cols.lg : undefined,
        '--grid-cols-xl': typeof cols === 'object' ? cols.xl : undefined,
        gridTemplateColumns: getGridTemplateColumns(),
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default Grid;