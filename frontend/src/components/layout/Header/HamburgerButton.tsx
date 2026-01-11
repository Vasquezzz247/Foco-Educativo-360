
import React from 'react';
import styles from './Header.module.css';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ 
  isOpen, 
  onClick, 
  className = '' 
}) => {
  return (
    <button
    className={`${styles.hamburgerButton} ${isOpen ? styles.open : ''} ${className}`}
    onClick={onClick}
    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    {...(isOpen ? { role: 'button' } : {})}
  >

  <span className={styles.hamburgerLine} />
  <span className={styles.hamburgerLine} />
  <span className={styles.hamburgerLine} />
</button>

  );
};

export default HamburgerButton;
