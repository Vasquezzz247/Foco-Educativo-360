
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import styles from './Header.module.css';
// import Logo from './Logo';


interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cerrar menú al hacer clic en un enlace
  const handleLinkClick = () => {
    onClose();
  };

  // Cerrar menú al presionar Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={styles.mobileOverlay}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menú móvil */}
      <div
        className={styles.mobileMenu}
        role="dialog"           /* mejora accesibilidad */
        aria-modal="true"       /* indica modal */
        aria-label="Menú móvil"
      >
        
        
        
        <Navbar variant="mobile" onItemClick={handleLinkClick} />
        
        {/* Acciones adicionales*/}
        <div className={styles.mobileActions}>
          <button className={`${styles.button} ${styles.primaryButton}`}>
            Ingresar
          </button>
          <button className={`${styles.button} ${styles.secondaryButton}`}>
            Registrarse
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
