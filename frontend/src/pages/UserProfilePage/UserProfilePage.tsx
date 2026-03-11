import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import PageLayout from '../../components/layout/PageLayout';
import Container from '../../components/ui/Layout/Container';
import Card from '../../components/ui/Card/Card';
import Button from '../../components/ui/Button/Button';
import backgroundImage from '../../assets/images/background/background-site.png';
import type { User } from '../../services/authService';
import styles from './UserProfilePage.module.css';

const UserProfilePage: React.FC = () => {
  const { user, updateProfile, logout, validateSession, token } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: ''
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    fetchProfile();
  }, [token, navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (user) {
        setProfile(user);
        setFormData({
          name: user.name || '',
          phone: user.phone || '',
          bio: user.bio || ''
        });
        setLoading(false);
        return;
      }
      
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setProfile(parsedUser);
        setFormData({
          name: parsedUser.name || '',
          phone: parsedUser.phone || '',
          bio: parsedUser.bio || ''
        });
        setLoading(false);
        return;
      }
      
      const isValid = await validateSession();
      if (!isValid) throw new Error('Sesión expirada');
      
      const data = await authService.getUserProfile();
      setProfile(data.user);
      setFormData({
        name: data.user.name || '',
        phone: data.user.phone || '',
        bio: data.user.bio || ''
      });
      
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Error al cargar el perfil');
      if (err.message.includes('Sesión expirada')) {
        setTimeout(() => navigate('/login', { replace: true }), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Por favor, selecciona una imagen válida' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'La imagen debe ser menor a 5MB' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Aquí iría la subida real del avatar
    setMessage({ type: 'success', text: 'Funcionalidad de avatar en desarrollo' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const result = await updateProfile({
        name: formData.name,
        phone: formData.phone || undefined,
        bio: formData.bio || undefined
      });

      if (result.success && result.user) {
        setProfile(result.user);
        setIsEditing(false);
        setMessage({ type: 'success', text: '¡Tus cambios han sido guardados!' });
        localStorage.setItem('user', JSON.stringify(result.user));
      } else {
        throw new Error(result.error || 'Error al actualizar');
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error desconocido' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(null), 3000);
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
      console.error('Error:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'admin': return '👑';
      case 'teacher': return '📚';
      default: return '🎓';
    }
  };

  const getRoleLabel = (role: string) => {
    const roles = {
      admin: 'Administrador',
      teacher: 'Docente',
      student: 'Estudiante'
    };
    return roles[role as keyof typeof roles] || role;
  };

  if (loading) {
    return (
      <PageLayout showBreadcrumb={false} backgroundImage={backgroundImage}>
        <Container className={styles.loadingContainer}>
          <div className={styles.welcomeCard}>
            <div className={styles.spinner}></div>
            <p>Preparando tu espacio personal...</p>
          </div>
        </Container>
      </PageLayout>
    );
  }

  if (error && !profile) {
    return (
      <PageLayout showBreadcrumb={false} backgroundImage={backgroundImage}>
        <Container className={styles.errorContainer}>
          <div className={styles.welcomeCard}>
            <h2>¡Ups! Algo salió mal</h2>
            <p>{error}</p>
            <div className={styles.actionGroup}>
              <Button onClick={fetchProfile} variant="primary">Reintentar</Button>
              <Button onClick={() => navigate('/dashboard')} variant="secondary">Ir a Mi Espacio</Button>
            </div>
          </div>
        </Container>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      showBreadcrumb={false}
      backgroundImage={backgroundImage}
      backgroundProps={{
        opacity: 0.9,
        overlay: true,
        overlayColor: "rgba(184, 234, 255, 0.1)",
        overlayOpacity: 0.1
      }}
    >
      <div className={styles.profileWrapper}>
        <Container>
          {/* Mensajes flotantes */}
          {message && (
            <div className={`${styles.messageToast} ${styles[message.type]}`}>
              <span className={styles.messageIcon}>
                {message.type === 'success' ? '✨' : '⚠️'}
              </span>
              <p>{message.text}</p>
            </div>
          )}

          {/* Tarjeta de Bienvenida */}
          <div className={styles.welcomeCard}>
            <div className={styles.welcomeContent}>
              <h1 className={styles.welcomeTitle}>
                ¡Hola, {profile?.name?.split(' ')[0]}! 👋
              </h1>
              <p className={styles.welcomeText}>
                Bienvenido a tu espacio personal. Aquí puedes ver y actualizar tu información.
              </p>
            </div>
            <Button onClick={handleLogout} variant="secondary" className={styles.logoutDesktopButton}>
              <span>🚪</span>
              Cerrar Sesión
            </Button>
          </div>

          {/* Grid principal */}
          <div className={styles.profileGrid}>
            {/* Columna izquierda - Avatar y datos básicos */}
            <div className={styles.profileSidebar}>
              <Card className={styles.avatarCard}>
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatarContainer}>
                    {avatarPreview || profile?.avatar_url ? (
                      <img 
                        src={avatarPreview || profile?.avatar_url} 
                        alt={profile?.name}
                        className={styles.avatarImage}
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {profile?.name ? getInitials(profile.name) : '?'}
                      </div>
                    )}
                    <button 
                      className={styles.avatarEditButton}
                      onClick={() => fileInputRef.current?.click()}
                      aria-label="Cambiar foto"
                    >
                      📷
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className={styles.hiddenFileInput}
                      aria-label="Cargar foto de perfil"
                      title="Cargar foto de perfil"
                    />
                  </div>
                  
                  <div className={styles.userInfo}>
                    <h2 className={styles.userName}>{profile?.name}</h2>
                    <div className={styles.userMeta}>
                      <span className={styles.userRole}>
                        {getRoleIcon(profile?.role || 'student')} {getRoleLabel(profile?.role || 'student')}
                      </span>
                      <span className={styles.userEmail}>{profile?.email}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>0</span>
                    <span className={styles.statLabel}>Cursos</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>0</span>
                    <span className={styles.statLabel}>Horas</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>0</span>
                    <span className={styles.statLabel}>Logros</span>
                  </div>
                </div>
              </Card>

              <Card className={styles.quickActionsCard}>
                <h3 className={styles.cardTitle}>Accesos Rápidos</h3>
                <div className={styles.quickActionsGrid}>
                  <button className={styles.quickAction} onClick={() => navigate('/dashboard')}>
                    <span className={styles.quickActionIcon}>📊</span>
                    <span>Mi Espacio</span>
                  </button>
                  <button className={styles.quickAction} onClick={() => navigate('/capsulas')}>
                    <span className={styles.quickActionIcon}>📚</span>
                    <span>Cápsulas</span>
                  </button>
                  <button className={styles.quickAction} onClick={() => navigate('/recursos')}>
                    <span className={styles.quickActionIcon}>📁</span>
                    <span>Recursos</span>
                  </button>
                  <button className={styles.quickAction} onClick={() => navigate('/foro')}>
                    <span className={styles.quickActionIcon}>💬</span>
                    <span>Foro</span>
                  </button>
                </div>
              </Card>
            </div>

            {/* Columna derecha - Información detallada */}
            <div className={styles.profileMain}>
              <Card className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Información Personal</h2>
                  {!isEditing && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className={styles.editButton}
                    >
                      <span>✏️</span>
                      Editar perfil
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className={styles.editForm}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Nombre completo</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        placeholder="¿Cómo te llamas?"
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
                        disabled={isSubmitting}
                        placeholder="+52 123 456 7890"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="bio">Sobre ti</label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={5}
                        disabled={isSubmitting}
                        placeholder="Cuéntanos un poco sobre ti, tus intereses y motivaciones..."
                      />
                      <span className={styles.charCount}>
                        {formData.bio.length}/500
                      </span>
                    </div>

                    <div className={styles.formActions}>
                      <Button type="submit" variant="primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                      </Button>
                      <Button type="button" variant="secondary" onClick={handleCancel} disabled={isSubmitting}>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className={styles.infoGrid}>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Nombre completo</span>
                        <span className={styles.infoValue}>{profile?.name}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Correo electrónico</span>
                        <span className={styles.infoValue}>{profile?.email}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Teléfono</span>
                        <span className={styles.infoValue}>
                          {profile?.phone || <span className={styles.emptyValue}>No especificado</span>}
                        </span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Miembro desde</span>
                        <span className={styles.infoValue}>
                          {profile?.created_at 
                            ? new Date(profile.created_at).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })
                            : 'Recientemente'}
                        </span>
                      </div>
                    </div>

                    {profile?.bio && (
                      <div className={styles.bioSection}>
                        <h3 className={styles.bioTitle}>Sobre mí</h3>
                        <p className={styles.bioText}>{profile.bio}</p>
                      </div>
                    )}
                  </>
                )}
              </Card>

              {/* Actividad Reciente */}
              <Card className={styles.activityCard}>
                <h2 className={styles.cardTitle}>Actividad Reciente</h2>
                <div className={styles.activityList}>
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>📖</div>
                    <div className={styles.activityContent}>
                      <h4>Curso: Neurociencia para Educadores</h4>
                      <p>Completaste el módulo 3 - "El cerebro que aprende"</p>
                      <span className={styles.activityTime}>Hace 2 días</span>
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>🏆</div>
                    <div className={styles.activityContent}>
                      <h4>¡Nuevo logro!</h4>
                      <p>Completaste tu primera cápsula de aprendizaje</p>
                      <span className={styles.activityTime}>Hace 1 semana</span>
                    </div>
                  </div>
                  <div className={styles.activityEmpty}>
                    <p>Tu actividad aparecerá aquí a medida que explores la plataforma</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Botón de logout móvil */}
          <div className={styles.mobileLogout}>
            <Button onClick={handleLogout} variant="secondary" fullWidth>
              <span>🚪</span>
              Cerrar Sesión
            </Button>
          </div>
        </Container>
      </div>
    </PageLayout>
  );
};

export default UserProfilePage;