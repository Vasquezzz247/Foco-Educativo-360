import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  console.log('🔐 PrivateRoute - loading:', loading);
  console.log('🔐 PrivateRoute - isAuthenticated:', isAuthenticated);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Cargando autenticación...</div>
      </div>
    );
  }
  // Solo redirigir cuando estamos seguros de que no hay autenticación
  if (!isAuthenticated) {
    console.log('🔐 No autenticado, redirigiendo...');
    return <Navigate to="/login" replace />;
  }
  
  console.log('🔐 Autenticado, mostrando contenido');
  return <>{children}</>;
};

export default PrivateRoute;