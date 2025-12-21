import { useState, useEffect } from 'react';

const breakpoints = {
  mobile: 767,
  tablet: 1023,
  desktop: 1440,
};

const useResponsive = () => {
  const [screen, setScreen] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      setScreen({
        width,
        isMobile: width <= breakpoints.mobile,
        isTablet: width > breakpoints.mobile && width <= breakpoints.tablet,
        isDesktop: width > breakpoints.tablet && width <= breakpoints.desktop,
        isLargeDesktop: width > breakpoints.desktop,
      });
    };

    // Inicializar
    handleResize();
    
    // Escuchar cambios
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screen;
};

export default useResponsive;