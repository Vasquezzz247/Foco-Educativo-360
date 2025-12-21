import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

const NavigationTracker: React.FC = () => {
  const location = useLocation();
  const { setSelectedCapsule, setSelectedResource } = useContent();

  useEffect(() => {
    // Esto limpiara selecciones al cambiar de página
    setSelectedCapsule(null);
    setSelectedResource(null);

    // Esto trackeará la navegación (Se puede enviar a Analytics)
    console.log('Página visitada:', location.pathname);
    
    // Aquí se podrá cargar datos específicos según la ruta
    if (location.pathname.startsWith('/capsulas')) {
      console.log('Navegando a cápsulas');
    } else if (location.pathname.startsWith('/recursos')) {
      console.log('Navegando a recursos');
    }
  }, [location, setSelectedCapsule, setSelectedResource]);

  return null; // Esto no renderiza nada
};

export default NavigationTracker;