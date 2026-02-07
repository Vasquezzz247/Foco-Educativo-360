import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User, LoginResponse, RegisterResponse } from '../services/authService';

interface AuthContextType {
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
        // Configurar interceptor de axios en authService
        authService.setupAxiosInterceptor();
        
        // Obtener datos almacenados
        const storedToken = authService.getCurrentToken();
        const storedRefreshToken = authService.getRefreshToken();
        const storedUser = authService.getCurrentUser();

        if (storedToken && storedUser) {
          setToken(storedToken);
          setRefreshToken(storedRefreshToken);
          setUser(storedUser);
          
          // Validar token con el servidor
          const isValid = await validateSession();
          if (!isValid) {
            clearAuthData();
          }
        }
      } catch (error) {
        console.error('Error inicializando autenticación:', error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

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
      const { valid, user: validatedUser } = await authService.validateToken();
      
      if (valid && validatedUser) {
        setUser(validatedUser);
        return true;
      }
    } catch (error) {
      console.error('Error validando sesión:', error);
    }

    // Si la validación falla, intentar refresh token
    if (refreshToken) {
      try {
      const { token: newToken, user: refreshedUser } = await authService.refreshToken();
      
      if (newToken) {
        setToken(newToken);
        
        if (refreshedUser) {
          setUser(refreshedUser);
        }
        
        return true;
      }
    } catch (error) {
      console.error('Error refrescando token:', error);
    }
  }

  clearAuthData();
  return false;
}, [token, refreshToken]);

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

  // Login
  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const data = await authService.login(email, password);
      
      setUser(data.user);
      setToken(data.token);
      setRefreshToken(data.refreshToken || null);
      
      return data;
    } catch (error) {
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