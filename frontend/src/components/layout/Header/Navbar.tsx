import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import styles from './Header.module.css';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  showOnlyOnHome?: boolean; 
}

interface NavbarProps {
  variant?: 'desktop' | 'mobile';
  onItemClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ variant = 'desktop', onItemClick }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const handleClick = () => {
    if (onItemClick) onItemClick();
  };

  
  const allNavItems: NavItem[] = [
    { 
      label: 'Inicio', 
      href: '/',
      showOnlyOnHome: false 
    },
    { label: 'Docentes', href: '/docentes' },
    { label: 'Estudiantes', href: '/estudiantes' },
    { label: 'Recursos', href: '/recursos' },
    { label: 'Cápsulas', href: '/capsulas' },
    { label: 'Foro', href: '/foro' },
    { label: 'Entrar', href: '/login' },
  ];
  
  const navItemsToShow = allNavItems.filter(item => {    
    if (isHomePage) return true;        
    return true; 
  });

  return (
    <nav className={`${styles.navbar} ${styles[variant]}`}>
      <ul className={styles.navList}>
        {/* Home link */}
        {!isHomePage && (
          <li className={`${styles.navItem} ${styles.homeItem}`}>
            <Link 
              to="/"
              className={`${styles.navLink} ${styles.homeLink}`}
              onClick={handleClick}
            >
              
            </Link>
          </li>
        )}
        
        {/* Items de navegación */}
        {navItemsToShow.map((item) => {          
          if (isHomePage && item.label === 'Inicio') return null;
          
          return (
            <li key={item.label} className={styles.navItem}>
              {item.external ? (
                <a 
                  href={item.href}
                  className={styles.navLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClick}
                >
                  {item.label}
                </a>
              ) : (
                <Link 
                  to={item.href}
                  className={styles.navLink}
                  onClick={handleClick}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;