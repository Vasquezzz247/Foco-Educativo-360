import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'primary' | 'surface' | 'transparent';
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  padding = 'md',
  background = 'default',
  className = '',
}) => {
  return (
    <div 
      className={`
        ${styles.container}
        ${styles[size]}
        ${styles[`padding-${padding}`]}
        ${styles[`background-${background}`]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;