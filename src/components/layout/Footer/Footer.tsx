import React from 'react';
import styles from './Footer.module.css';
import SocialLinks from './SocialLinks';
import ContactInfo from './ContactInfo';
import FooterLinks from './FooterLinks';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {/* Primera fila: Logos enfrentados */}
        <div className={styles.topRow}>
          <div className={styles.leftBrand}>
            <h2 className={styles.brandTitle}>Foco Educativo 360</h2>
          </div>
          
          <div className={styles.rightBrand}>
            <h3 className={styles.partnerTitle}>Christian School Nuevo Pacto</h3>
          </div>
        </div>

        {/* Segunda fila: Contacto y redes */}
        <div className={styles.middleRow}>
          <div className={styles.contactWrapper}>
            <ContactInfo />
          </div>
          
          <div className={styles.socialWrapper}>
            <SocialLinks />
          </div>
        </div>

        {/* Tercera fila: Links legales */}
        <div className={styles.bottomRow}>
          <FooterLinks />
        </div>

      </div>
    </footer>
  );
};

export default Footer;