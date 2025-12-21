import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import Navbar from './Navbar';
import HamburgerButton from './HamburgerButton';
import MobileMenu from './MobileMenu';
import useResponsive from '../../../hooks/useResponsive';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMobile, isTablet } = useResponsive();

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú al cambiar a desktop
  useEffect(() => {
    if (!isMobile && !isTablet) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isTablet]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        style={{ backgroundColor: '#B8EAFF' }}
      >
        <div className={styles.headerContainer}>
          {/* Logo */}
          <div className={styles.logoWrapper}>
            <Logo variant={isMobile ? 'mobile' : 'desktop'} />
          </div>

          {/* Desktop Navbar */}
          {!isMobile && !isTablet && (
            <div className={styles.desktopNav}>
              <Navbar variant="desktop" />
            </div>
          )}

          {/* Acciones desktop */}
          {!isMobile && !isTablet && (
            <div className={styles.headerActions}>
              <button className={`${styles.button} ${styles.loginButton}`}>
                Ingresar
              </button>
              <button className={`${styles.button} ${styles.signupButton}`}>
                Registrarse
              </button>
            </div>
          )}

        {/* Mobile: Hamburger button */}
        {(isMobile || isTablet) && (
          <div className={styles.mobileNav}>
            <HamburgerButton 
              isOpen={isMenuOpen}
              onClick={toggleMenu}
            />
          </div>
        )}

        </div>
      </header>

      {/* Mobile Menu */}
      {(isMobile || isTablet) && (
        <MobileMenu 
          isOpen={isMenuOpen}
          onClose={closeMenu}
        />
      )}

    </>
  );
};

export default Header;