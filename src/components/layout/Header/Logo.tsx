import React from 'react';
import styles from './Header.module.css';
import logoDesktop from '../../../assets/images/logos/site-logo-3.png';

interface LogoProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'desktop', className = '' }) => {
  const logoSize = {
    desktop: { width: 300, height: 79 },
    mobile: { width: 150, height: 40 }
  };

  return (
    <div className={`${styles.logoContainer} ${styles[variant]} ${className}`}>
      <img
        src={logoDesktop}
        alt="Foco Educativo 360"
        className={styles.logoImage}
        width={logoSize[variant].width}
        height={logoSize[variant].height}
        loading="eager"
      />
    </div>
  );
};

export default Logo;