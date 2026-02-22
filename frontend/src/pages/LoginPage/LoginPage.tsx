import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageLayout from '../../components/layout/PageLayout';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debug, setDebug] = useState<string>(''); // Para debugging
  
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Si ya está autenticado, redirigir
  React.useEffect(() => {
    if (isAuthenticated) {
      console.log('Usuario ya autenticado, redirigiendo...');
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    console.log('Intentando login con:', email);
    const result = await login(email, password);
    console.log('Login exitoso:', result);
    
    // Verificar estado después del login
    console.log('Estado de autenticación:', isAuthenticated);
    console.log('Usuario actual:', user);
    
    // Pequeño delay para asegurar que el estado se actualice
    setTimeout(() => {
      console.log('Redirigiendo a dashboard...');
      navigate('/dashboard', { replace: true });
    }, 100);
    
  } catch (err: any) {
    console.error('Error en login:', err);
    setError(err.response?.data?.error || 'Error al iniciar sesión');
  } finally {
    setLoading(false);
  }
};


  return (
    <PageLayout showBreadcrumb={false}>
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          <p className={styles.subtitle}>Accede a Foco Educativo 360</p>
          
          {error && (
            <div className={styles.errorAlert}>
              {error}
            </div>
          )}
          
          {debug && (
            <div className={styles.debugInfo}>
              {debug}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ejemplo@escuela.edu"
                className={styles.input}
                disabled={loading}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className={styles.input}
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
          
          <div className={styles.registerPrompt}>
            <p>¿No tienes una cuenta?</p>
            <Link to="/register" className={styles.registerButton}>
              Crear cuenta ahora
            </Link>
            <span className={styles.separator}> - </span>
            <Link to="/forgot-password" className={styles.forgotPasswordLink}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          
          
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;