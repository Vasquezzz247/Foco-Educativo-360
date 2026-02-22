import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageLayout from '../../components/layout/PageLayout';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(''); // opcional
  const [bio, setBio] = useState('');
  const [role, setRole] = useState(''); // opcional
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validaciones
  if (password !== confirmPassword) {
    setError('Las contraseñas no coinciden');
    return;
  }
  
  if (password.length < 6) {
    setError('La contraseña debe tener al menos 6 caracteres');
    return;
  }
  
  setLoading(true);

  try {
    await register(name, email, password);
    navigate('/dashboard');
  } catch (err: any) {
    setError(err.response?.data?.message || 'Error al registrar usuario');
  } finally {
    setLoading(false);
  }
};

  return (
    <PageLayout showBreadcrumb={false}>
      <div className={styles.registerPage}>
        <div className={styles.registerContainer}>
          <h1 className={styles.title}>Crear Cuenta</h1>
          <p className={styles.subtitle}>Únete a Foco Educativo 360</p>
          
          {error && (
            <div className={styles.errorAlert}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.registerForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre Completo</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ej: María González"
                className={styles.input}
              />
            </div>
            
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
                placeholder="Mínimo 6 caracteres"
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Repite tu contraseña"
                className={styles.input}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>
          
          <div className={styles.links}>
            <p className={styles.loginPrompt}>
              ¿Ya tienes cuenta? <Link to="/login" className={styles.link}>Inicia sesión</Link>
            </p>
          </div>
          
          <div className={styles.terms}>
            <p className={styles.termsText}>
              Al registrarte, aceptas nuestros{' '}
              <a href="/terminos" className={styles.link}>Términos de servicio</a>{' '}
              y{' '}
              <a href="/privacidad" className={styles.link}>Política de privacidad</a>.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;