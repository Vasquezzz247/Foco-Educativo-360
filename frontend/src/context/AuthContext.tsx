import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User, LoginResponse, RegisterResponse } from '../services/authService';

interface  AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string, bio?: string, role?: string) => Promise<RegisterResponse>;
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  updateProfile: (profileData: Partial<User>) => Promise<{ success: boolean; user?: User; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  validateSession: () => Promise<boolean>;
  refreshAuthToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Inicializar autenticación
  useEffect(() => {
  const initAuth = async () => {
    try {
      console.log('🔄 INIT AUTH - Ejecutando...');
      
      // Configurar interceptor de axios
      authService.setupAxiosInterceptor();
      
      // Obtener datos almacenados
      const storedToken = authService.getCurrentToken();
      const storedRefreshToken = authService.getRefreshToken();
      const storedUser = authService.getCurrentUser();

      console.log('📦 Datos almacenados:', { 
        storedToken: storedToken ? '✓' : '✗', 
        storedRefreshToken: storedRefreshToken ? '✓' : '✗', 
        storedUser: storedUser ? '✓' : '✗' 
      });

      if (storedToken && storedUser) {
        console.log('✅ Restaurando sesión desde localStorage');
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
        setUser(storedUser);
        
        // Validar token con el servidor (OPCIONAL - puede estar causando problema)
        // const isValid = await validateSession();
        // if (!isValid) {
        //   console.log('❌ Token inválido, limpiando datos');
        //   clearAuthData();
        // }
      } else {
        console.log('ℹ️ No hay sesión previa');
      }
    } catch (error) {
      console.error('Error inicializando autenticación:', error);
      clearAuthData();
    } finally {
      console.log('✅ INIT AUTH - Completado, loading=false');
      setLoading(false);
    }
  };

  initAuth();
}, []); // ← Vacío, solo se ejecuta al montar

  // Sincronizar estado con localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = authService.getCurrentUser();
      const currentToken = authService.getCurrentToken();
      const currentRefreshToken = authService.getRefreshToken();
      
      setUser(currentUser);
      setToken(currentToken);
      setRefreshToken(currentRefreshToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
  console.log('🔄 AuthProvider montado');
  console.log('Estado inicial - user:', user);
  console.log('Estado inicial - token:', token);
  console.log('Estado inicial - refreshToken:', refreshToken);
  console.log('Estado inicial - loading:', loading);
}, []);

// Cada vez que cambie el estado
useEffect(() => {
  console.log('📌 Estado actualizado:');
  console.log('   - user:', user);
  console.log('   - token:', token);
  console.log('   - refreshToken:', refreshToken);
  console.log('   - loading:', loading);
  console.log('   - isAuthenticated:', !!token);
}, [user, token, refreshToken, loading]);

  // Limpiar datos de autenticación
  const clearAuthData = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    authService.clearAuthData();
  };

  // Validar sesión con el servidor
  const validateSession = useCallback(async (): Promise<boolean> => {
  if (!token) return false;

  try {
    console.log('🔍 Validando sesión con token:', token?.substring(0, 20) + '...');
    
    // Verificar que el token no esté expirado localmente
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // convertir a milisegundos
      
      if (Date.now() > exp) {
        console.log('⚠️ Token expirado localmente');
        return false;
      }
    } catch (e) {
      console.log('⚠️ No se pudo decodificar token');
    }
    
    // Intentar validar con el servidor
    const { valid, user: validatedUser } = await authService.validateToken();
    
    if (valid && validatedUser) {
      console.log('✅ Token válido en servidor');
      setUser(validatedUser);
      return true;
    }
    
    console.log('❌ Token inválido en servidor');
    return false;
  } catch (error) {
    console.error('Error validando sesión:', error);
    return false; // No limpiar datos automáticamente
  }
}, [token]);

  // Refrescar token de acceso
  const refreshAuthToken = useCallback(async (): Promise<string | null> => {
    if (!refreshToken) {
      clearAuthData();
      return null;
    }

    try {
      const { token: newToken, user: refreshedUser } = await authService.refreshToken();
      
      if (newToken) {
        setToken(newToken);
        
        if (refreshedUser) {
          setUser(refreshedUser);
        }
        
        return newToken;
      }
    } catch (error) {
      console.error('Error refrescando token:', error);
    }

    clearAuthData();
    return null;
  }, [refreshToken]);

  // Login - Iteración 3
  const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    console.log('AuthContext: Iniciando login...');
    const data = await authService.login(email, password);
    console.log('AuthContext: Login exitoso:', data);
    
    // VERIFICAR que estos valores se estén guardando
    console.log('Token a guardar:', data.token);
    console.log('Usuario a guardar:', data.user);
    
    setUser(data.user);
    setToken(data.token);
    setRefreshToken(data.refreshToken || null);

    // Forzar una actualización del estado
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('✅ Estado actualizado - isAuthenticated:', !!data.token);
    
    
    // Verificar que se guardaron en localStorage
    console.log('Token en localStorage después de set:', localStorage.getItem('token'));
    console.log('User en localStorage después de set:', localStorage.getItem('user'));
    
    return data;
  } catch (error) {
    console.error('AuthContext: Error en login:', error);
    clearAuthData();
    throw error;
  }
};

  // Logout
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error durante logout:', error);
    } finally {
      clearAuthData();
    }
  };

  // Register
  const register = async (
    name: string, 
    email: string, 
    password: string,
    phone?: string,
    bio?: string,
    role?: string
  ): Promise<RegisterResponse> => {
    try {
      const data = await authService.register(name, email, password, phone, bio, role);
      
      setUser(data.user);
      setToken(data.token);
      setRefreshToken(data.refreshToken || null);
      
      return data;
    } catch (error) {
      clearAuthData();
      throw error;
    }
  };

  // Actualizar perfil
  const updateProfile = async (profileData: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> => {
    if (!token) {
      return { success: false, error: 'No autenticado' };
    }

    try {
      const data = await authService.updateProfile(profileData);
      
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error: any) {
      return { success: false, error: error.message || 'Error al actualizar perfil' };
    }
  };

  // Cambiar contraseña
  const changePassword = async (
    currentPassword: string, 
    newPassword: string
  ): Promise<{ success: boolean; message?: string; error?: string }> => {
    if (!token) {
      return { success: false, error: 'No autenticado' };
    }

    try {
      const data = await authService.changePassword(currentPassword, newPassword);
      return { success: true, message: data.message };
    } catch (error: any) {
      return { success: false, error: error.message || 'Error al cambiar contraseña' };
    }
  };

  // Olvidé mi contraseña
  const forgotPassword = async (email: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const data = await authService.forgotPassword(email);
      return { success: true, message: data.message };
    } catch (error: any) {
      return { success: false, error: error.message || 'Error al procesar la solicitud' };
    }
  };

  // Restablecer contraseña
  const resetPassword = async (resetToken: string, password: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const data = await authService.resetPassword(resetToken, password);
      return { success: true, message: data.message };
    } catch (error: any) {
      return { success: false, error: error.message || 'Error al restablecer contraseña' };
    }
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: authService.isAuthenticated(),
    token,
    refreshToken,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    validateSession,
    refreshAuthToken
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};