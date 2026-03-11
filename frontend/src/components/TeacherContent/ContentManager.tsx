import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card/Card';
import Button from '../ui/Button/Button';
import styles from './ContentManager.module.css';

interface ContentItem {
  id: string;
  title: string;
  type: 'material' | 'video' | 'announcement' | 'blog' | 'resource';
  description: string;
  fileUrl?: string;
  youtubeUrl?: string;
  targetAudience: 'all' | 'students' | 'teachers' | 'public';
  targetGrades?: string[];
  targetClasses?: string[];
  createdAt: Date;
  status: 'draft' | 'published';
}

const ContentManager: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'publicar' | 'mis-contenidos' | 'borradores'>('publicar');
  const [contentType, setContentType] = useState<'material' | 'video' | 'anuncio' | 'blog'>('material');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    targetAudience: 'students',
    targetGrades: [] as string[],
    targetClasses: [] as string[],
    file: null as File | null,
    youtubeUrl: ''
  });

  // Renderizar según el rol (solo docentes y admin)
  if (user?.role !== 'teacher' && user?.role !== 'admin') {
    return (
      <Card className={styles.accessDenied}>
        <h3>Acceso Restringido</h3>
        <p>Solo docentes y administradores pueden gestionar contenido.</p>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para publicar contenido
    console.log('Publicando:', contentType, formData);
  };

  return (
    <div className={styles.contentManager}>
      {/* Cabecera */}
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Contenido Educativo</h1>
        <p className={styles.subtitle}>
          Bienvenido, {user?.name}. Aquí puedes crear y gestionar material para tus estudiantes.
        </p>
      </div>

      {/* Tabs de navegación */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'publicar' ? styles.active : ''}`}
          onClick={() => setActiveTab('publicar')}
        >
          <span className={styles.tabIcon}>➕ </span>
          Publicar Nuevo
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'mis-contenidos' ? styles.active : ''}`}
          onClick={() => setActiveTab('mis-contenidos')}
        >
          <span className={styles.tabIcon}>📚 </span>
          Mis Contenidos
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'borradores' ? styles.active : ''}`}
          onClick={() => setActiveTab('borradores')}
        >
          <span className={styles.tabIcon}>📝 </span>
          Borradores
        </button>
      </div>

      {/* Contenido según tab */}
      <Card className={styles.contentCard}>
        {activeTab === 'publicar' && (
          <form onSubmit={handleSubmit} className={styles.publishForm}>
            <h2 className={styles.formTitle}>Crear Nuevo Contenido</h2>

            {/* Selector de tipo de contenido */}
            <div className={styles.contentTypeSelector}>
              <button
                type="button"
                className={`${styles.typeOption} ${contentType === 'material' ? styles.active : ''}`}
                onClick={() => setContentType('material')}
              >
                <span className={styles.typeIcon}>📄</span>
                <span>Material Didáctico</span>
              </button>
              <button
                type="button"
                className={`${styles.typeOption} ${contentType === 'video' ? styles.active : ''}`}
                onClick={() => setContentType('video')}
              >
                <span className={styles.typeIcon}>🎥</span>
                <span>Video Educativo</span>
              </button>
              <button
                type="button"
                className={`${styles.typeOption} ${contentType === 'anuncio' ? styles.active : ''}`}
                onClick={() => setContentType('anuncio')}
              >
                <span className={styles.typeIcon}>📢</span>
                <span>Anuncio/Aviso</span>
              </button>
              <button
                type="button"
                className={`${styles.typeOption} ${contentType === 'blog' ? styles.active : ''}`}
                onClick={() => setContentType('blog')}
              >
                <span className={styles.typeIcon}>✍️</span>
                <span>Blog Post</span>
              </button>
            </div>

            {/* Campos comunes */}
            <div className={styles.formGroup}>
              <label htmlFor="title">Título del contenido *</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Ej: Introducción a las fracciones"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Descripción *</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                placeholder="Describe el contenido y su propósito educativo..."
                required
              />
            </div>

            {/* Campos específicos según tipo */}
            {contentType === 'material' && (
              <div className={styles.formGroup}>
                <label htmlFor="file">Archivo (PDF, PPT, DOC) *</label>
                <input
                  type="file"
                  id="file"
                  accept=".pdf,.ppt,.pptx,.doc,.docx"
                  onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
                  required
                />
                <small>Formatos aceptados: PDF, PowerPoint, Word (máx 50MB)</small>
              </div>
            )}

            {contentType === 'video' && (
              <div className={styles.formGroup}>
                <label htmlFor="youtubeUrl">URL del Video (YouTube) *</label>
                <input
                  type="url"
                  id="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                  placeholder="https://youtube.com/watch?v=..."
                  required
                />
              </div>
            )}

            {contentType === 'blog' && (
              <div className={styles.formGroup}>
                <label htmlFor="content">Contenido del blog *</label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={8}
                  placeholder="Escribe tu artículo aquí..."
                  required
                />
              </div>
            )}

            {/* Configuración de audiencia */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>¿Quién puede ver este contenido?</h3>
              
              <div className={styles.audienceOptions}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="audience"
                    value="students"
                    checked={formData.targetAudience === 'students'}
                    onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                  />
                  <span>Solo mis estudiantes</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="audience"
                    value="all"
                    checked={formData.targetAudience === 'all'}
                    onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                  />
                  <span>Todos los estudiantes de la escuela</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="audience"
                    value="public"
                    checked={formData.targetAudience === 'public'}
                    onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                  />
                  <span>Público general (blog/recursos)</span>
                </label>
              </div>
            </div>

            {/* Filtros por grado y clase */}
            {formData.targetAudience !== 'public' && (
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Filtrar por grado y clase (opcional)</h3>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Grados</label>
                    <label htmlFor="categoría">Categoría</label>
                    <select
                      id="categoría"
                      multiple
                      value={formData.targetGrades}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                        setFormData({...formData, targetGrades: selected});
                      }}
                      className={styles.multiSelect}
                      size={4}
                    >
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(grade => (
                        <option key={grade} value={grade}>{grade}° Grado</option>
                      ))}
                    </select>
                    <small>Mantén Ctrl para seleccionar múltiples</small>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Clases</label>
                    <div className={styles.checkboxGroup}>
                      {[' A ', ' B '].map(cls => (
                        <label key={cls} className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            value={cls}
                            checked={formData.targetClasses.includes(cls)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...formData.targetClasses, cls]
                                : formData.targetClasses.filter(c => c !== cls);
                              setFormData({...formData, targetClasses: updated});
                            }}
                          />
                          Clase {cls}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className={styles.formActions}>
              <Button type="submit" variant="primary">
                Publicar Ahora
              </Button>
              <Button type="button" variant="secondary">
                Guardar como Borrador
              </Button>
              <Button type="button" variant="accent">
                Programar Publicación
              </Button>
            </div>
          </form>
        )}

        {activeTab === 'mis-contenidos' && (
          <div className={styles.contentList}>
            <h2 className={styles.formTitle}>Mis Contenidos Publicados</h2>
            {/* Aquí iría la lista de contenidos publicados por el docente */}
            <div className={styles.emptyState}>
              <p>Aún no has publicado contenido.</p>
              <Button variant="primary" onClick={() => setActiveTab('publicar')}>
                Crear mi primer contenido
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'borradores' && (
          <div className={styles.contentList}>
            <h2 className={styles.formTitle}>Borradores</h2>
            {/* Lista de borradores */}
            <div className={styles.emptyState}>
              <p>No tienes borradores guardados.</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ContentManager;