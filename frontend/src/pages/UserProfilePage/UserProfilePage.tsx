import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import styles from './UserProfilePage.module.css';
import type { User } from '../../services/authService';

const UserProfilePage: React.FC = () => {
  const { user, updateProfile, logout, validateSession, token } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: ''
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verificar autenticación primero
    if (!token) {
      console.log('No hay token, redirigiendo a login');
      navigate('/login', { replace: true });
      return;
    }
    
    fetchProfile();
  }, [token, navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching profile...');
      
      // Usar el usuario del contexto si existe
      if (user) {
        console.log('Usuario desde contexto:', user);
        setProfile(user);
        setFormData({
          name: user.name || '',
          phone: user.phone || '',
          bio: user.bio || ''
        });
        setLoading(false);
        return;
      }
      
      // Si no hay usuario en contexto, intentar obtenerlo del localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log('Usuario desde localStorage:', parsedUser);
        setProfile(parsedUser);
        setFormData({
          name: parsedUser.name || '',
          phone: parsedUser.phone || '',
          bio: parsedUser.bio || ''
        });
        setLoading(false);
        return;
      }
      
      // Como último recurso, llamar a la API
      const isValid = await validateSession();
      if (!isValid) {
        throw new Error('Sesión expirada');
      }
      
      const data = await authService.getUserProfile();
      console.log('Perfil desde API:', data);
      setProfile(data.user);
      setFormData({
        name: data.user.name || '',
        phone: data.user.phone || '',
        bio: data.user.bio || ''
      });
      
    } catch (err: any) {
      console.error('Error en fetchProfile:', err);
      setError(err.message || 'Error al cargar el perfil');
      
      // Si es error de autenticación, redirigir
      if (err.message.includes('Sesión expirada') || err.message.includes('No autenticado')) {
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const result = await updateProfile(formData);

      if (result.success && result.user) {
        setProfile(result.user);
        setIsEditing(false);
        setMessage('Perfil actualizado exitosamente');
        
        // Actualizar localStorage
        localStorage.setItem('user', JSON.stringify(result.user));
        
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error(result.error || 'Error al actualizar el perfil');
      }
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        bio: profile.bio || ''
      });
    }
    setIsEditing(false);
    setError(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error durante logout:', error);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>Error al cargar el perfil</h3>
          <p>{error}</p>
          <div className={styles.errorActions}>
            <button onClick={fetchProfile} className={styles.retryButton}>
              Reintentar
            </button>
            <button 
              onClick={() => navigate('/dashboard')} 
              className={styles.dashboardButton}
            >
              Mi Espacio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mi Perfil</h1>
        <div className={styles.headerActions}>
          <button 
            onClick={handleGoToDashboard} 
            className={styles.dashboardButton}
          >
            Mi Espacio
          </button>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {message && (
        <div className={styles.successMessage}>
          <span className={styles.successIcon}>✓</span>
          {message}
        </div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>!</span>
          {error}
        </div>
      )}

      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {profile?.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt={profile.name} 
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {profile?.name?.charAt(0).toUpperCase() || '?'}
              </div>
            )}
          </div>
        </div>

        <div className={styles.profileInfo}>
          {isEditing ? (
            <form onSubmit={handleSubmit} className={styles.editForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={profile?.email || ''}
                  disabled
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="bio">Biografía</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formActions}>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
                <button type="button" onClick={handleCancel} disabled={isLoading}>
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Nombre:</span>
                  <span className={styles.value}>{profile?.name}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Email:</span>
                  <span className={styles.value}>{profile?.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Teléfono:</span>
                  <span className={styles.value}>{profile?.phone || 'No especificado'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Rol:</span>
                  <span className={styles.value}>
                    {profile?.role === 'admin' ? 'Administrador' : 
                     profile?.role === 'teacher' ? 'Profesor' : 'Estudiante'}
                  </span>
                </div>
              </div>

              {profile?.bio && (
                <div className={styles.bioSection}>
                  <h3>Biografía</h3>
                  <p>{profile.bio}</p>
                </div>
              )}

              <div className={styles.actions}>
                <button onClick={() => setIsEditing(true)}>
                  Editar Perfil
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;