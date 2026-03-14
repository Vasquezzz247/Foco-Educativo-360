import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../../components/layout/PageLayout';
import { Section, Container, Grid } from '../../../components/ui/Layout';
import Card from '../../../components/ui/Card/Card';
import Button from '../../../components/ui/Button/Button';
import backgroundImage from '../../../assets/images/background/background-site.png';
import styles from './DocentesBoard.module.css';

// Iconos (puedes usar react-icons o emojis)
const icons = {
  brain: '🧠',
  dashboard: '📊',
  capsule: '🔄',
  resources: '🎯',
  community: '👥',
  analytics: '📈',
  schedule: '📅',
  materials: '📚',
  video: '🎥',
  assessment: '📝',
  certificate: '🏆',
  star: '⭐',
  rocket: '🚀',
  lightbulb: '💡',
  chat: '💬'
};

// Datos de ejemplo para estadísticas rápidas
const quickStats = [
  { id: 1, label: 'Estudiantes a cargo', value: '128', icon: icons.community, change: '+12%' },
  { id: 2, label: 'Cápsulas creadas', value: '24', icon: icons.capsule, change: '+3' },
  { id: 3, label: 'Recursos compartidos', value: '56', icon: icons.resources, change: '+8' },
  { id: 4, label: 'Satisfacción', value: '96%', icon: icons.star, change: '+2%' }
];

// Datos de ejemplo para estudiantes pendientes de aprobación
const pendingStudents = [
  { id: 1, name: 'Ana López', grade: '5° Grado', class: 'A', date: '12/03/2026' },
  { id: 2, name: 'Carlos Pérez', grade: '6° Grado', class: 'B', date: '12/03/2026' },
  { id: 3, name: 'María García', grade: '5° Grado', class: 'A', date: '11/03/2026' }
];

// Datos de ejemplo para recursos recientes
const recentResources = [
  { id: 1, title: 'Neurociencia Básica', type: 'Cápsula', date: 'Hace 2 horas' },
  { id: 2, title: 'Guía de Evaluación', type: 'PDF', date: 'Ayer' },
  { id: 3, title: 'Video: Atención en el aula', type: 'Video', date: 'Ayer' },
  { id: 4, title: 'Ejercicios prácticos', type: 'Actividad', date: 'Hace 3 días' }
];

// Datos de ejemplo para anuncios
const announcements = [
  { id: 1, title: 'Reunión de docentes', date: '15/03/2026', time: '16:00 hrs', important: true },
  { id: 2, title: 'Nuevo recurso disponible', date: '14/03/2026', content: 'Plantillas de planificación' },
  { id: 3, title: 'Webinar: Neuroeducación', date: '20/03/2026', time: '18:00 hrs' }
];

const DocentesBoard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      showBreadcrumb={true}
      backgroundImage={backgroundImage}
      backgroundProps={{
        opacity: 0.9,
        overlay: true,
        overlayColor: "rgba(184, 234, 255, 0.1)",
        overlayOpacity: 0.1
      }}
    >
      <div className={styles.docentesBoard}>
        
        {/* HERO SECTION - Adaptada para docentes */}
        <Section 
          variant="gradient" 
          padding="4xl" 
          className={styles.heroSection}
        >
          <Container size="lg">
            <div className={styles.heroContent}>
              <span className={styles.heroBadge}>
                <span className={styles.badgeEmoji}>{icons.brain}</span>
                Panel del Docente
              </span>
              <h1 className={styles.heroTitle}>
                Potencia tu enseñanza con <span className={styles.highlight}>neurociencia educativa</span>
              </h1>
              <p className={styles.heroDescription}>
                Herramientas basadas en evidencia científica, seguimiento personalizado 
                y una comunidad de educadores innovadores para transformar tu práctica docente.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>24</span>
                  <span className={styles.statLabel}>Cápsulas</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>128</span>
                  <span className={styles.statLabel}>Estudiantes</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>56</span>
                  <span className={styles.statLabel}>Recursos</span>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* SECCIÓN: Beneficios para docentes (adaptada de LandingPage) */}
        <Section variant="light" padding="4xl">
          <Container size="lg">
            <div className={styles.benefitsSection}>
              <div className={styles.benefitsContent}>
                <span className={styles.sectionBadge}>
                  <span className={styles.badgeEmoji}>{icons.lightbulb}</span>
                  Para Docentes
                </span>
                <h2 className={styles.sectionTitle}>
                  Herramientas que transforman tu enseñanza
                </h2>
                <ul className={styles.benefitsList}>
                  <li>
                    <span className={styles.benefitIcon}>{icons.capsule}</span>
                    <div className={styles.benefitText}>
                      <h4>Creación de cápsulas interactivas</h4>
                      <p>Diseña contenido educativo atractivo y basado en neurociencia</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.benefitIcon}>{icons.dashboard}</span>
                    <div className={styles.benefitText}>
                      <h4>Dashboard de seguimiento</h4>
                      <p>Monitorea el progreso de tus estudiantes en tiempo real</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.benefitIcon}>{icons.resources}</span>
                    <div className={styles.benefitText}>
                      <h4>Recursos basados en evidencia</h4>
                      <p>Accede a materiales validados por la ciencia del aprendizaje</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.benefitIcon}>{icons.community}</span>
                    <div className={styles.benefitText}>
                      <h4>Comunidad de docentes innovadores</h4>
                      <p>Comparte experiencias y aprende de otros educadores</p>
                    </div>
                  </li>
                </ul>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/docentes/recursos')}
                  className={styles.exploreButton}
                >
                  Explorar recursos docentes
                </Button>
              </div>
              <div className={styles.benefitsImage}>
                <div className={styles.imagePlaceholder}>
                  <span className={styles.placeholderEmoji}>{icons.rocket}</span>
                  <span className={styles.placeholderText}>Dashboard Docente</span>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* SECCIÓN: Estadísticas rápidas */}
        <Section variant="default" padding="4xl">
          <Container size="lg">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <span className={styles.badgeEmoji}>{icons.analytics}</span>
                Visión general
              </span>
              <h2 className={styles.sectionTitle}>Panel de control</h2>
              <p className={styles.sectionDescription}>
                Resumen de tu actividad y progreso en la plataforma
              </p>
            </div>

            <Grid cols={{ sm: 1, md: 2, lg: 4 }} gap="lg">
              {quickStats.map(stat => (
                <Card key={stat.id} variant="elevated" hover className={styles.statCard}>
                  <div className={styles.statCardIcon}>{stat.icon}</div>
                  <div className={styles.statCardContent}>
                    <span className={styles.statCardValue}>{stat.value}</span>
                    <span className={styles.statCardLabel}>{stat.label}</span>
                  </div>
                  <span className={styles.statCardChange}>{stat.change}</span>
                </Card>
              ))}
            </Grid>
          </Container>
        </Section>

        {/* SECCIÓN: Grid principal con dos columnas */}
        <Section variant="light" padding="4xl">
          <Container size="lg">
            <div className={styles.mainGrid}>
              
              {/* Columna izquierda: Estudiantes pendientes */}
              <div className={styles.leftColumn}>
                <Card className={styles.pendingCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>
                      <span className={styles.cardIcon}>⏳</span>
                      Estudiantes pendientes de aprobación
                    </h3>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => navigate('/docentes/estudiantes')}
                    >
                      Ver todos
                    </Button>
                  </div>
                  
                  <div className={styles.pendingList}>
                    {pendingStudents.map(student => (
                      <div key={student.id} className={styles.pendingItem}>
                        <div className={styles.pendingInfo}>
                          <span className={styles.pendingName}>{student.name}</span>
                          <span className={styles.pendingDetails}>
                            {student.grade} - Clase {student.class}
                          </span>
                        </div>
                        <span className={styles.pendingDate}>{student.date}</span>
                        <button 
                          className={styles.approveButton}
                          onClick={() => console.log('Aprobar', student.id)}
                        >
                          ✓
                        </button>
                      </div>
                    ))}
                    
                    <Button 
                      variant="secondary" 
                      size="md" 
                      fullWidth
                      onClick={() => navigate('/docentes/aprobaciones')}
                      className={styles.viewAllButton}
                    >
                      Gestionar solicitudes pendientes
                    </Button>
                  </div>
                </Card>

                <Card className={styles.resourcesCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>
                      <span className={styles.cardIcon}>{icons.materials}</span>
                      Recursos recientes
                    </h3>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => navigate('/docentes/recursos')}
                    >
                      Ver todos
                    </Button>
                  </div>
                  
                  <div className={styles.resourcesList}>
                    {recentResources.map(resource => (
                      <div key={resource.id} className={styles.resourceItem}>
                        <div className={styles.resourceIcon}>
                          {resource.type === 'Cápsula' ? '📦' : 
                           resource.type === 'PDF' ? '📄' : 
                           resource.type === 'Video' ? '🎥' : '📝'}
                        </div>
                        <div className={styles.resourceInfo}>
                          <span className={styles.resourceTitle}>{resource.title}</span>
                          <span className={styles.resourceMeta}>
                            {resource.type} · {resource.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="primary" 
                    size="md" 
                    fullWidth
                    onClick={() => navigate('/docentes/crear-contenido')}
                  >
                    + Crear nuevo recurso
                  </Button>
                </Card>
              </div>

              {/* Columna derecha: Anuncios y acciones rápidas */}
              <div className={styles.rightColumn}>
                <Card className={styles.announcementsCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>
                      <span className={styles.cardIcon}>📢</span>
                      Anuncios importantes
                    </h3>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => navigate('/docentes/anuncios')}
                    >
                      Ver todos
                    </Button>
                  </div>
                  
                  <div className={styles.announcementsList}>
                    {announcements.map(announcement => (
                      <div key={announcement.id} className={styles.announcementItem}>
                        {announcement.important && (
                          <span className={styles.importantBadge}>Importante</span>
                        )}
                        <h4 className={styles.announcementTitle}>{announcement.title}</h4>
                        <div className={styles.announcementMeta}>
                          <span>📅 {announcement.date}</span>
                          {announcement.time && <span>⏰ {announcement.time}</span>}
                        </div>
                        {announcement.content && (
                          <p className={styles.announcementContent}>{announcement.content}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="secondary" 
                    size="md" 
                    fullWidth
                    onClick={() => navigate('/docentes/crear-anuncio')}
                  >
                    + Crear nuevo anuncio
                  </Button>
                </Card>

                <Card className={styles.quickActionsCard}>
                  <h3 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>⚡</span>
                    Acciones rápidas
                  </h3>
                  
                  <div className={styles.quickActionsGrid}>
                    <button 
                      className={styles.quickAction}
                      onClick={() => navigate('/docentes/crear-capsula')}
                    >
                      <span className={styles.quickActionIcon}>{icons.capsule}</span>
                      <span>Nueva cápsula</span>
                    </button>
                    <button 
                      className={styles.quickAction}
                      onClick={() => navigate('/docentes/recursos/subir')}
                    >
                      <span className={styles.quickActionIcon}>{icons.materials}</span>
                      <span>Subir recurso</span>
                    </button>
                    <button 
                      className={styles.quickAction}
                      onClick={() => navigate('/docentes/estudiantes')}
                    >
                      <span className={styles.quickActionIcon}>{icons.community}</span>
                      <span>Ver estudiantes</span>
                    </button>
                    <button 
                      className={styles.quickAction}
                      onClick={() => navigate('/docentes/foro')}
                    >
                      <span className={styles.quickActionIcon}>{icons.chat}</span>
                      <span>Foro docente</span>
                    </button>
                    <button 
                      className={styles.quickAction}
                      onClick={() => navigate('/docentes/progreso')}
                    >
                      <span className={styles.quickActionIcon}>{icons.analytics}</span>
                      <span>Progreso general</span>
                    </button>
                    <button 
                      className={styles.quickAction}
                      onClick={() => navigate('/docentes/planificacion')}
                    >
                      <span className={styles.quickActionIcon}>{icons.schedule}</span>
                      <span>Planificación</span>
                    </button>
                  </div>
                </Card>

                <Card className={styles.tipCard}>
                  <div className={styles.tipContent}>
                    <span className={styles.tipIcon}>{icons.lightbulb}</span>
                    <div>
                      <h4 className={styles.tipTitle}>Consejo neuroeducativo</h4>
                      <p className={styles.tipText}>
                        La atención sostenida mejora cuando alternas actividades cada 15-20 minutos.
                      </p>
                      <p className={styles.tipText}>
                        Prueba a intercalar explicaciones con ejercicios prácticos.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* SECCIÓN: Comunidad docente */}
        <Section variant="primary" padding="4xl" className={styles.communitySection}>
          <Container size="md">
            <div className={styles.communityContent}>
              <span className={styles.communityBadge}>
                <span className={styles.badgeEmoji}>{icons.community}</span>
                Comunidad
              </span>
              <h2 className={styles.communityTitle}>Conecta con otros docentes</h2>
              <p className={styles.communityDescription}>
                Únete a una red de educadores innovadores. Comparte experiencias, 
                recursos y aprende de las mejores prácticas en el aula.
              </p>
              <div className={styles.communityButtons}>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/foro-docentes')}
                >
                  Ir al foro docente
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/docentes/comunidad')}
                >
                  Conocer otros docentes
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </PageLayout>
  );
};

export default DocentesBoard;