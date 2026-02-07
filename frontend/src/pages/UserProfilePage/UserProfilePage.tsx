import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import styles from './UserProfilePage.module.css';
import type { User } from '../../services/authService';

const UserProfilePage: React.FC = () => {
  const { user, updateProfile, logout, validateSession } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: ''
  });

  // Estados para mensajes
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Validar la sesión
      const isValid = await validateSession();
      if (!isValid) {
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
      }
      
      // Obtener perfil usando authService
      const data = await authService.getUserProfile();
      setProfile(data.user);
      
      // Inicializar formData con los datos actuales
      setFormData({
        name: data.user.name || '',
        phone: data.user.phone || '',
        bio: data.user.bio || ''
      });
    } catch (err: any) {
      setError(err.message || 'Error al cargar el perfil');
      
      // Si es error de autenticación, redirigir a login
      if (err.message.includes('Sesión expirada') || err.message.includes('No autenticado')) {
        setTimeout(() => {
          window.location.href = '/login';
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
      // Usar updateProfile del AuthContext
      const result = await updateProfile(formData);

      if (result.success && result.user) {
        setProfile(result.user);
        setIsEditing(false);
        setMessage('Perfil actualizado exitosamente');
        
        // Limpiar mensaje después de 3 segundos
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
      // Redirigir al login después de logout
      window.location.href = '/login';
    } catch (error) {
      console.error('Error durante logout:', error);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecciona una imagen válida');
      return;
    }

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen debe ser menor a 5MB');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Crear FormData para subir archivo
      const formData = new FormData();
      formData.append('avatar', file);
      
      // Simular subida de imagen (temporal)
      
      // Actualizar perfil con la nueva URL (simulada)
      const result = await updateProfile({ 
        avatar_url: URL.createObjectURL(file) 
      });

      if (result.success && result.user) {
        setProfile(result.user);
        setMessage('Foto de perfil actualizada exitosamente');
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err: any) {
      setError('Error al subir la imagen: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    if (!profile?.avatar_url) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const result = await updateProfile({ avatar_url: undefined });

      if (result.success && result.user) {
        setProfile(result.user);
        setMessage('Foto de perfil eliminada');
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err: any) {
      setError('Error al eliminar la foto: ' + err.message);
    } finally {
      setIsLoading(false);
    }
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
              onClick={() => window.location.href = '/login'} 
              className={styles.loginButton}
            >
              Ir al Login
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
            onClick={() => window.location.href = '/dashboard'} 
            className={styles.dashboardButton}
          >
            Dashboard
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
                onError={(e) => {
                  // Si la imagen falla al cargar, mostrar placeholder
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = target.parentElement?.querySelector(`.${styles.avatarPlaceholder}`) as HTMLDivElement;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={styles.avatarPlaceholder}
              style={{ display: profile?.avatar_url ? 'none' : 'flex' }}
            >
              {profile?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className={styles.avatarActions}>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarUpload}
              style={{ display: 'none' }}
              disabled={isLoading}
            />
            <label htmlFor="avatar-upload" className={styles.avatarButton}>
              {isLoading ? 'Subiendo...' : 'Cambiar Foto'}
            </label>
            {profile?.avatar_url && (
              <button 
                onClick={handleRemoveAvatar} 
                className={styles.avatarButtonSecondary}
                disabled={isLoading}
              >
                Eliminar
              </button>
            )}
          </div>
        </div>

        <div className={styles.profileInfo}>
          {isEditing ? (
            <form onSubmit={handleSubmit} className={styles.editForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  minLength={2}
                  maxLength={100}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={profile?.email || ''}
                  className={styles.input}
                  disabled
                />
                <small className={styles.emailNote}>
                  {profile?.email_verified ? (
                    <span className={styles.verified}>✓ Email verificado</span>
                  ) : (
                    <span className={styles.notVerified}>
                      ⚠ Email no verificado. 
                      <button 
                        type="button" 
                        className={styles.verifyLink}
                        onClick={() => window.location.href = '/verify-email'}
                      >
                        Verificar ahora
                      </button>
                    </span>
                  )}
                </small>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="+52 123 456 7890"
                  pattern="[+]?[0-9\s\-]+"
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="bio" className={styles.label}>
                  Biografía
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  rows={4}
                  placeholder="Cuéntanos algo sobre ti..."
                  maxLength={500}
                  disabled={isLoading}
                />
                <div className={styles.charCount}>
                  {formData.bio.length}/500 caracteres
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Rol
                </label>
                <div className={`${styles.roleBadge} ${styles[profile?.role || 'student']}`}>
                  {profile?.role === 'admin' ? 'Administrador' : 
                   profile?.role === 'teacher' ? 'Profesor' : 'Estudiante'}
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles.cancelButton}
                  disabled={isLoading}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Nombre:</span>
                  <span className={styles.infoValue}>{profile?.name}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email:</span>
                  <span className={styles.infoValue}>{profile?.email}</span>
                  {profile?.email_verified ? (
                    <span className={styles.verifiedBadge}>Verificado</span>
                  ) : (
                    <span className={styles.unverifiedBadge}>
                      No verificado
                      <button 
                        className={styles.verifyBadgeLink}
                        onClick={() => window.location.href = '/verify-email'}
                      >
                        Verificar
                      </button>
                    </span>
                  )}
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Teléfono:</span>
                  <span className={styles.infoValue}>
                    {profile?.phone || 'No proporcionado'}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Rol:</span>
                  <span className={`${styles.roleBadge} ${styles[profile?.role || 'student']}`}>
                    {profile?.role === 'admin' ? 'Administrador' : 
                     profile?.role === 'teacher' ? 'Profesor' : 'Estudiante'}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Miembro desde:</span>
                  <span className={styles.infoValue}>
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : ''}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Última actualización:</span>
                  <span className={styles.infoValue}>
                    {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString('es-ES') : ''}
                  </span>
                </div>
              </div>

              {profile?.bio && (
                <div className={styles.bioSection}>
                  <h3 className={styles.bioTitle}>Biografía</h3>
                  <p className={styles.bioText}>{profile.bio}</p>
                </div>
              )}

              <div className={styles.actions}>
                <button
                  onClick={() => setIsEditing(true)}
                  className={styles.editButton}
                >
                  Editar Perfil
                </button>
                <button
                  onClick={() => window.location.href = '/change-password'}
                  className={styles.secondaryButton}
                >
                  Cambiar Contraseña
                </button>
                <button
                  onClick={() => window.location.href = '/preferences'}
                  className={styles.tertiaryButton}
                >
                  Preferencias
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.statsSection}>
        <h2 className={styles.statsTitle}>Estadísticas de Aprendizaje</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>0</div>
            <div className={styles.statLabel}>Cursos Tomados</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>0</div>
            <div className={styles.statLabel}>Horas de Estudio</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>0</div>
            <div className={styles.statLabel}>Logros</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>0</div>
            <div className={styles.statLabel}>Certificados</div>
          </div>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h3 className={styles.quickActionsTitle}>Acciones Rápidas</h3>
        <div className={styles.quickActionsGrid}>
          <button 
            className={styles.quickActionButton}
            onClick={() => window.location.href = '/my-courses'}
          >
            <span className={styles.quickActionIcon}>📚</span>
            <span>Mis Cursos</span>
          </button>
          <button 
            className={styles.quickActionButton}
            onClick={() => window.location.href = '/progress'}
          >
            <span className={styles.quickActionIcon}>📊</span>
            <span>Mi Progreso</span>
          </button>
          <button 
            className={styles.quickActionButton}
            onClick={() => window.location.href = '/certificates'}
          >
            <span className={styles.quickActionIcon}>🏆</span>
            <span>Certificados</span>
          </button>
          <button 
            className={styles.quickActionButton}
            onClick={() => window.location.href = '/settings'}
          >
            <span className={styles.quickActionIcon}>⚙️</span>
            <span>Ajustes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;