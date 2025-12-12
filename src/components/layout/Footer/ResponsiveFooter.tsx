import React from 'react';
import styles from './Footer.module.css';
import useResponsive from '../../../hooks/useResponsive';
import ContactInfo from './ContactInfo';
import SocialLinks from './SocialLinks';
import FooterLinks from './FooterLinks';

const ResponsiveFooter: React.FC = () => {
  const { isMobile, isTablet } = useResponsive();
  const isDesktop = !isMobile && !isTablet;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {isDesktop ? (
          /* Layout escritorio - enfrentado */
          <>
            <div className={styles.mainContent}>
              <div className={styles.leftSide}>
                <div className={styles.brandContainer}>
                  <h2 className={styles.brandTitle}>Foco Educativo 360</h2>
                  <div className={styles.logoWrapper}>
                    <img 
                      src="/src/assets/images/logos/site-logo-3.png"
                      alt="Foco Educativo 360"
                      className={styles.logo}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className={styles.contactSection}>
                  <ContactInfo />
                </div>
              </div>
              
              <div className={styles.rightSide}>
                <div className={styles.schoolContainer}>
                  <h3 className={styles.schoolTitle}>Christian School Nuevo Pacto</h3>
                </div>
                <div className={styles.socialSection}>
                  <SocialLinks />
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Layout móvil/tablet - apilado */
          <div className={styles.mobileContent}>
            <div className={styles.mobileBrands}>
              <div className={styles.mobileBrand}>
                <h2 className={styles.brandTitle}>Foco Educativo 360</h2>
                <div className={styles.logoWrapper}>
                  <img 
                    src="/src/assets/images/logos/site-logo-3.png"
                    alt="Foco Educativo 360"
                    className={styles.logo}
                    loading="lazy"
                  />
                </div>
              </div>
              
              <div className={styles.mobileSchool}>
                <h3 className={styles.schoolTitle}>Christian School Nuevo Pacto</h3>
              </div>
            </div>
            
            <div className={styles.mobileInfo}>
              <div className={styles.mobileContact}>
                <ContactInfo />
              </div>
              
              <div className={styles.mobileSocial}>
                <SocialLinks />
              </div>
            </div>
          </div>
        )}

        <div className={styles.divider} />
        
        <div className={styles.legalSection}>
          <FooterLinks />
        </div>

      </div>
    </footer>
  );
};

export default ResponsiveFooter;