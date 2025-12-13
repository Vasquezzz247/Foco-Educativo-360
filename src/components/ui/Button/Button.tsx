import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${fullWidth ? styles.fullWidth : ''}
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={styles.iconLeft}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={styles.iconRight}>{icon}</span>
      )}
    </button>
  );
};

export default Button;