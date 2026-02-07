
export const getOptimizedBackground = (deviceWidth: number) => {
  const isMobile = deviceWidth < 768;
  const isTablet = deviceWidth >= 768 && deviceWidth < 1024;
  
  if (isMobile) {
    return '/src/assets/images/background/background-site-mobile.jpg'; // Versión móvil optimizada
  }
  
  if (isTablet) {
    return '/src/assets/images/background/background-site-tablet.jpg'; // Versión tablet
  }
  
  return '/src/assets/images/background/background-site.jpg'; // Versión desktop
};