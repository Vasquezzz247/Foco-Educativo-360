import axios from 'axios';

// Configuración base
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://foco-educativo-360.vercel.app' 
  : import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 15000,
});

console.log('🌐 API conectando a:', API_BASE_URL);


// Variable para controlar intentos de refresh token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor para AGREGAR token JWT automáticamente a cada petición
api.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage
    const token = localStorage.getItem('token');
     console.log('📤 Request:', config.method?.toUpperCase(), config.url);
     console.log('   Full URL:', (config.baseURL || '') + config.url);
    
    // Si existe token, agregarlo como header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Manejo de error en la solicitud
    console.error('Error en interceptor de request:', error);
    return Promise.reject(error);
  }
);

// Interceptor para MANEJAR respuestas y errores
api.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, simplemente retornarla
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Si es error 401 (No autorizado) y no es una solicitud de refresh/login
    if (error.response?.status === 401 && 
        !originalRequest.url?.includes('/auth/refresh-token') &&
        !originalRequest.url?.includes('/auth/login') &&
        !originalRequest._retry) {
      
      // Si ya estamos refrescando, agregar a la cola de espera
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        // Obtener refresh token del localStorage
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          throw new Error('No hay refresh token disponible');
        }
        
        // Intentar refrescar el token
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 10000
          }
        );
        
        const { token: newToken, user } = response.data;
        
        if (newToken) {
          // Guardar nuevo token
          localStorage.setItem('token', newToken);
          
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
          }
          
          // Actualizar header de la solicitud original
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          // Procesar cola de solicitudes en espera
          processQueue(null, newToken);
          
          // Reintentar solicitud original
          return api(originalRequest);
        }
        
        throw new Error('No se recibió nuevo token');
        
      } catch (refreshError) {
        console.error('Error refrescando token:', refreshError);
        
        // Limpiar datos de autenticación
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Procesar cola con error
        processQueue(refreshError, null);
        
        // Redirigir a login solo si no estamos ya ahí
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
        
      } finally {
        isRefreshing = false;
      }
    }
    
    // Manejo de otros errores HTTP
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          console.warn('Error 400 - Solicitud incorrecta:', data.error || data.message);
          break;
          
        case 403:
          console.warn('Error 403 - Acceso prohibido. Permisos insuficientes.');
          // Redirigir a página de no autorizado si no se esta ahí
          if (!window.location.pathname.includes('/unauthorized')) {
            window.location.href = '/unauthorized';
          }
          break;
          
        case 404:
          console.warn('Error 404 - Recurso no encontrado:', error.config.url);
          break;
          
        case 409:
          console.warn('Error 409 - Conflicto:', data.error || 'El recurso ya existe');
          break;
          
        case 422:
          console.warn('Error 422 - Validación fallida:', data.errors || data.error);
          break;
          
        case 429:
          console.warn('Error 429 - Demasiadas solicitudes. Por favor espere.');
          break;
          
        case 500:
          console.error('Error 500 - Error interno del servidor');
          break;
          
        case 502:
        case 503:
        case 504:
          console.error(`Error ${status} - Problemas con el servidor`);
          break;
          
        default:
          console.error(`Error ${status}:`, data.error || 'Error desconocido');
      }
    } else if (error.request) {
      // Solicitud hecha pero no recibió respuesta
      console.error('Error de red - No se recibió respuesta del servidor');
    } else {
      // Configuraracion de solicitud errónea
      console.error('Error en la configuración de la solicitud:', error.message);
    }
    
    // Rechazar la promesa con el error 
    return Promise.reject(error);
  }
);

// Función para limpiar tokens y redirigir al login
export const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  
  if (!window.location.pathname.includes('/login')) {
    window.location.href = '/login';
  }
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Función para obtener el token actual
export const getCurrentToken = (): string | null => {
  return localStorage.getItem('token');
};

// Función para obtener el usuario actual
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parseando usuario:', error);
    return null;
  }
};

// Función helper para hacer peticiones comunes
export const apiHelpers = {
  // GET request
  get: async (url: string, params?: any, config?: any) => {
    try {
      const response = await api.get(url, { params, ...config });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // POST request
  post: async (url: string, data?: any, config?: any) => {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // PUT request
  put: async (url: string, data?: any, config?: any) => {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // PATCH request
  patch: async (url: string, data?: any, config?: any) => {
    try {
      const response = await api.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // DELETE request
  delete: async (url: string, config?: any) => {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Subir archivos (multipart/form-data)
  upload: async (url: string, formData: FormData, onUploadProgress?: (progressEvent: any) => void) => {
    try {
      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Descargar archivos
  download: async (url: string, params?: any) => {
    try {
      const response = await api.get(url, {
        params,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Función para configurar encabezados personalizados
export const setAuthHeader = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Función para remover encabezado de autorización
export const removeAuthHeader = () => {
  delete api.defaults.headers.common['Authorization'];
};

// Función para configurar base URL dinámicamente
export const setBaseURL = (baseURL: string) => {
  api.defaults.baseURL = baseURL;
};

// Función para obtener base URL actual
export const getBaseURL = (): string => {
  return api.defaults.baseURL || '';
};

export default api;