import React from 'react';
import styles from './Footer.module.css';

const FooterLinks: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.footerLinks}>
      <span className={styles.legalLink}>Términos</span>
      <span className={styles.separator}>•</span>
      <span className={styles.legalLink}>Privacidad</span>
      <span className={styles.separator}>•</span>
      <span className={styles.legalLink}>Cookies</span>
      <span className={styles.copyright}>© {currentYear} Todos los derechos</span>
    </div>
  );
};

export default FooterLinks;