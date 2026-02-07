import api from './api';
import { AxiosError } from 'axios';

// Prueba health check
const testAPI = async () => {
  try {
    // 1. Probar health endpoint
    const health = await api.get('/health');
    console.log('✅ Health check:', health.data);
    
    // 2. Probar documentación
    const docs = await api.get('/');
    console.log('✅ Documentación API:', docs.data.message);
    
    // 3. Intentar registrar usuario
    const registerData = {
      name: 'Test User',
      email: `test${Date.now()}@ejemplo.com`,
      password: 'password123'
    };
    
    try {
      const register = await api.post('/auth/register', registerData);
      console.log('✅ Registro exitoso:', register.data);
      
      // 4. Intentar login con el usuario recién creado
      const loginData = {
        email: registerData.email,
        password: registerData.password
      };
      
      const login = await api.post('/auth/login', loginData);
      console.log('✅ Login exitoso:', login.data);
      
      // 5. Guardar token para pruebas futuras
      if (login.data.token) {
        localStorage.setItem('test-token', login.data.token);
        console.log('✅ Token guardado en localStorage');
      }
      
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        console.log('ℹ️  Usuario ya existe, intentando login...');
        
        // Intentar login si el usuario ya existe
        const loginData = {
          email: registerData.email,
          password: registerData.password
        };
        
        try {
          const login = await api.post('/auth/login', loginData);
          console.log('✅ Login exitoso (usuario existente):', login.data);
        } catch (loginError) {
          const loginAxiosError = loginError as AxiosError;
          console.log('❌ Error en login:', loginAxiosError.response?.data);
        }
      } else {
        console.log('❌ Error de registro:', axiosError.response?.data);
      }
    }
    
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error conectando con API:', error.message);
    } else if (error instanceof AxiosError) {
      console.error('❌ Error Axios:', error.message, error.response?.data);
    } else {
      console.error('❌ Error desconocido:', error);
    }
  }
};

// Ejecutar prueba
testAPI();