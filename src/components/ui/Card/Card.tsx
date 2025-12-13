import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outline' | 'filled';
  hover?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
}) => {
  return (
    <div 
      className={`
        ${styles.card}
        ${styles[variant]}
        ${hover ? styles.hover : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`${styles.cardHeader} ${className}`}>{children}</div>
);

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
  <div className={`${styles.cardBody} ${className}`}>{children}</div>
);

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`${styles.cardFooter} ${className}`}>{children}</div>
);

export default Card;