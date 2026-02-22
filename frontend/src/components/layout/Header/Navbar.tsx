import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../../context/AuthContext'; 
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
  const navigate = useNavigate(); 
  const { user, isAuthenticated, logout } = useAuth(); 
  
  const isHomePage = location.pathname === '/';
  
  const handleClick = () => {
    if (onItemClick) onItemClick();
  };

  // Poner primer nombre en Navbar
  const getFirstName = (fullName: string): string => {
    if (!fullName) return 'Usuario';
    return fullName.split(' ')[0];
  };

  // Obtener iniciales
  const getInitials = (name: string): string => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  // Manejador de logout
  const handleLogout = async () => {
    try {
      await logout();
      handleClick(); 
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Perfil
  const handleProfileClick = () => {
    handleClick();
    navigate('/perfil');
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
  
  // Filtrar items según autenticación y página actual
  const navItemsToShow = allNavItems.filter(item => {
    // Móvil
    if (isAuthenticated && item.label === 'Entrar') return false;
    
    if (isHomePage) return true;
    return true;
  });

  // Determinar vista móvil
  const isMobile = variant === 'mobile';

  return (
    <nav className={`${styles.navbar} ${styles[variant]}`}>
      <ul className={styles.navList}>
        {/* Home link (Solo desktop, no Home) */}
        {!isHomePage && variant === 'desktop' && (
          <li className={`${styles.navItem} ${styles.homeItem}`}>
            <Link 
              to="/"
              className={`${styles.navLink} ${styles.homeLink}`}
              onClick={handleClick}
            >
              
            </Link>
          </li>
        )}
        
        {/* Nav items */}
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

        {/* Menú de usuario (autenticado) */}
        {isAuthenticated && user && (
          <li className={styles.navItem}>
            {isMobile ? (
              // Menu movil
              <div className={styles.mobileUserMenu}>
                <div className={styles.mobileUserInfo}>
                  <div className={styles.mobileUserAvatar}>
                    {getInitials(user.name)}
                  </div>
                  <div className={styles.mobileUserDetails}>
                    <span className={styles.mobileUserName}>{user.name}</span>
                    <span className={styles.mobileUserEmail}>{user.email}</span>
                    <span className={styles.mobileUserRole}>
                      {user.role === 'admin' ? 'Administrador' : 
                       user.role === 'teacher' ? 'Docente' : 'Estudiante'}
                    </span>
                  </div>
                </div>
                <div className={styles.mobileUserActions}>
                  <button 
                    onClick={handleProfileClick}
                    className={styles.mobileProfileButton}
                  >
                    <span>👤</span> Mi Perfil
                  </button>
                  <button 
                    onClick={handleLogout}
                    className={styles.mobileLogoutButton}
                  >
                    <span>🚪</span> Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              // Menu desktop
              <div className={styles.userMenu}>
                <button 
                  onClick={handleProfileClick}
                  className={styles.userMenuButton}
                >
                  <span className={styles.userAvatar}>
                    {getInitials(user.name)}
                  </span>
                  <span className={styles.userName}>
                    {getFirstName(user.name)}
                  </span>
                  <span className={styles.userArrow}>▼</span>
                </button>
                
                {/* Dropdown menu (opcional) */}
                <div className={styles.userDropdown}>
                  <button 
                    onClick={handleProfileClick}
                    className={styles.dropdownItem}
                  >
                    <span>👤</span> Mi Perfil
                  </button>
                  <button 
                    onClick={handleLogout}
                    className={styles.dropdownItem}
                  >
                    <span>🚪</span> Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;