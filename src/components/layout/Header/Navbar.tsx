import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './Header.module.css';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

<nav>
  <Link to="/">Inicio</Link>
  <Link to="/capsulas">Cápsulas</Link>
  <Link to="/recursos">Recursos</Link>
  
  {/* otros enlaces */}
</nav>

const navItems: NavItem[] = [
  { label: 'Docentes', href: '/docentes' },
  { label: 'Estudiantes', href: '/estudiantes' },
  { label: 'Recursos', href: '/recursos' },
  { label: 'Cápsulas', href: '/capsulas' },
];

interface NavbarProps {
  variant?: 'desktop' | 'mobile';
  onItemClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ variant = 'desktop', onItemClick }) => {
  const handleClick = () => {
    if (onItemClick) onItemClick();
  };

  return (
    <nav className={`${styles.navbar} ${styles[variant]}`}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
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
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;