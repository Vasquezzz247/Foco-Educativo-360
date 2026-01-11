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
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    
    try {
      await login(email, password);
      navigate('/dashboard'); // Redireccionar después del login
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
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
          
          <div className={styles.links}>
            <Link to="/register" className={styles.link}>
              ¿No tienes cuenta? Regístrate
            </Link>
            <span className={styles.separator}>•</span>
            <Link to="/forgot-password" className={styles.link}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          
          <div className={styles.demoCredentials}>
            <p className={styles.demoTitle}>Credenciales de demostración:</p>
            <p>Email: docente@ejemplo.com</p>
            <p>Contraseña: password123</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;