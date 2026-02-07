import api from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
  role?: string;
}

export interface User {
  id: string; 
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  role: string;
  avatar_url?: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
  message?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ProfileUpdateData {
  name?: string;
  phone?: string;
  bio?: string;
  avatar_url?: string;
}

export interface LoginResponse extends AuthResponse {}
export interface RegisterResponse extends AuthResponse {}

export const authService = {
  // Login
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
      }
      
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error en el login');
    }
  },

  // Register
  register: async (
    name: string, 
    email: string, 
    password: string,
    phone?: string,
    bio?: string,
    role?: string
  ): Promise<RegisterResponse> => {
    try {
      const response = await api.post('/auth/register', { 
        name, 
        email, 
        password,
        phone,
        bio,
        role 
      });
      const data = response.data;
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
      }
      
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error en el registro');
    }
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      const token = authService.getCurrentToken();
      if (token) {
        await api.post('/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Error en logout:', error);
      // Continua con el logout local incluso si falla la llamada al servidor
    } finally {
      authService.clearAuthData();
    }
  },

  // Refresh Token
  refreshToken: async (): Promise<{ token: string; user?: User }> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No hay refresh token disponible');
      }
      
      const response = await api.post('/auth/refresh-token', { refreshToken });
      const data = response.data;
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      }
      
      return data;
    } catch (error: any) {
      authService.clearAuthData();
      throw new Error(error.response?.data?.error || 'Error refrescando token');
    }
  },

  // Validate Token
  validateToken: async (): Promise<{ valid: boolean; user?: User }> => {
    try {
      const token = authService.getCurrentToken();
      if (!token) {
        return { valid: false };
      }
      
      const response = await api.get('/auth/validate', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error: any) {
      return { valid: false };
    }
  },

  // Forgot Password
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error en la solicitud');
    }
  },

  // Reset Password
  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    try {
      const response = await api.post(`/auth/reset-password/${token}`, { password });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error al restablecer contraseña');
    }
  },

  // Change Password
  changePassword: async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
    try {
      const token = authService.getCurrentToken();
      if (!token) {
        throw new Error('No autenticado');
      }
      
      const response = await api.post('/auth/change-password', 
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Limpiar datos locales después de cambiar contraseña
      authService.clearAuthData();
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error al cambiar contraseña');
    }
  },

  // Verify Email
  verifyEmail: async (token: string): Promise<{ message: string; user: User }> => {
    try {
      const response = await api.post(`/auth/verify-email/${token}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error verificando email');
    }
  },

  // Update User Profile
  updateProfile: async (profileData: ProfileUpdateData): Promise<{ user: User; message: string }> => {
    try {
      const token = authService.getCurrentToken();
      if (!token) {
        throw new Error('No autenticado');
      }
      
      const response = await api.put('/users/profile', profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const data = response.data;
      
      // Actualizar usuario en localStorage
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error actualizando perfil');
    }
  },

  // Get User Profile
  getUserProfile: async (): Promise<{ user: User }> => {
    try {
      const token = authService.getCurrentToken();
      if (!token) {
        throw new Error('No autenticado');
      }
      
      const response = await api.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const data = response.data;
      
      // Actualizar usuario en localStorage
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error obteniendo perfil');
    }
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parseando usuario:', error);
      return null;
    }
  },

  // Get current token from localStorage
  getCurrentToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Get refresh token from localStorage
  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken');
  },

  // Check if authenticated
  isAuthenticated: (): boolean => {
    return !!authService.getCurrentToken();
  },

  // Clear all auth data
  clearAuthData: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  // Setup axios interceptor for automatic token refresh
  setupAxiosInterceptor: (): void => {
    // Nota: Este interceptor ya está configurado en api.ts
    // Esta función es solo para compatibilidad con AuthContext
    console.log('Axios interceptor ya configurado en api.ts');
    
    // Si necesitas configuraciones adicionales, puedes hacerlo aquí
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // Si el error es 401 y no es una solicitud de refresh/login
        if (error.response?.status === 401 && 
            !originalRequest.url?.includes('/auth/refresh-token') &&
            !originalRequest.url?.includes('/auth/login') &&
            !originalRequest._retry) {
          
          originalRequest._retry = true;
          
          try {
            // Intentar refrescar el token
            const { token } = await authService.refreshToken();
            
            // Actualizar el token en la solicitud original
            originalRequest.headers.Authorization = `Bearer ${token}`;
            
            // Reintentar la solicitud original
            return api(originalRequest);
          } catch (refreshError) {
            // Si el refresh también falla, limpiar datos y redirigir al login
            authService.clearAuthData();
            if (!window.location.pathname.includes('/login')) {
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  },

  // Additional helper functions
  getAuthHeaders: (): { Authorization: string } | {} => {
    const token = authService.getCurrentToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // Check if token is about to expire (optional)
  isTokenExpiringSoon: (): boolean => {
    const token = authService.getCurrentToken();
    if (!token) return false;
    
    try {
      // Decodificar el token JWT para verificar la expiración
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = payload.exp - now;
      
      // Considerar que está por expirar si le quedan menos de 5 minutos
      return timeUntilExpiry < 300;
    } catch (error) {
      console.error('Error verificando expiración del token:', error);
      return false;
    }
  },

  // Initialize auth state
  initialize: async (): Promise<{ user: User | null; token: string | null }> => {
    const token = authService.getCurrentToken();
    const user = authService.getCurrentUser();
    
    if (token && user) {
      try {
        const { valid } = await authService.validateToken();
        if (!valid) {
          authService.clearAuthData();
          return { user: null, token: null };
        }
      } catch (error) {
        console.error('Error inicializando autenticación:', error);
        authService.clearAuthData();
        return { user: null, token: null };
      }
    }
    
    return { user, token };
  }
};