import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import { Section, Container, Grid } from '../../components/ui/Layout';
import Card from '../../components/ui/Card/Card';
import Button from '../../components/ui/Button/Button';
import backgroundImage from '../../assets/images/background/background-site.png';
import styles from './StudentPage.module.css';

// Iconos (puedes usar react-icons o emojis)
const icons = {
  capsule: '🧩',
  progress: '📈',
  gamification: '🎮',
  collaborative: '🤝',
  brain: '🧠',
  rocket: '🚀',
  star: '⭐',
  book: '📚',
  video: '🎥',
  quiz: '✍️',
  certificate: '🏆',
  community: '👥'
};

// Datos de ejemplo para cápsulas destacadas
const featuredCapsules = [
  {
    id: 1,
    title: 'Neurociencia Básica',
    description: 'Descubre cómo funciona tu cerebro mientras aprendes',
    icon: icons.brain,
    duration: '15 min',
    level: 'Principiante',
    progress: 75
  },
  {
    id: 2,
    title: 'Técnicas de Estudio',
    description: 'Métodos efectivos para retener información',
    icon: icons.book,
    duration: '20 min',
    level: 'Intermedio',
    progress: 30
  },
  {
    id: 3,
    title: 'Atención y Concentración',
    description: 'Ejercicios prácticos para mejorar tu enfoque',
    icon: icons.rocket,
    duration: '12 min',
    level: 'Todos los niveles',
    progress: 0
  },
  {
    id: 4,
    title: 'Gamificación del Aprendizaje',
    description: 'Aprende jugando con nuestros desafíos',
    icon: icons.gamification,
    duration: '25 min',
    level: 'Intermedio',
    progress: 100
  }
];

const StudentPage: React.FC = () => {
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
      <div className={styles.studentPage}>
        
        {/* HERO SECTION - Versión adaptada para estudiantes */}
        <Section 
          variant="gradient" 
          padding="4xl" 
          className={styles.heroSection}
        >
          <Container size="lg">
            <div className={styles.heroContent}>
              <span className={styles.heroBadge}>
                <span className={styles.badgeEmoji}>{icons.rocket}</span>
                Espacio del Estudiante
              </span>
              <h1 className={styles.heroTitle}>
                Aprende de manera <span className={styles.highlight}>efectiva y significativa</span>
              </h1>
              <p className={styles.heroDescription}>
                Descubre un mundo de conocimiento diseñado especialmente para ti. 
                Cápsulas interactivas, seguimiento personalizado y una comunidad 
                que te acompaña en cada paso.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>50+</span>
                  <span className={styles.statLabel}>Cápsulas</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>1000+</span>
                  <span className={styles.statLabel}>Estudiantes</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>95%</span>
                  <span className={styles.statLabel}>Satisfacción</span>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* SECCIÓN: Beneficios para estudiantes (adaptada de LandingPage) */}
        <Section variant="light" padding="4xl">
          <Container size="lg">
            <div className={styles.benefitsSection}>
              <div className={styles.benefitsContent}>
                <span className={styles.sectionBadge}>
                  <span className={styles.badgeEmoji}>{icons.capsule}</span>
                  Para Estudiantes
                </span>
                <h2 className={styles.sectionTitle}>
                                  Aprende a tu ritmo, a tu manera
                </h2>
                <ul className={styles.benefitsList}>
                  <li>
                    <span className={styles.benefitIcon}>{icons.capsule}</span>
                    <div className={styles.benefitText}>
                      <h4>Cápsulas educativas interactivas</h4>
                      <p>Contenido diseñado para mantener tu atención y facilitar el aprendizaje</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.benefitIcon}>{icons.progress}</span>
                    <div className={styles.benefitText}>
                      <h4>Seguimiento de tu progreso</h4>
                      <p>Visualiza tus avances y celebra tus logros</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.benefitIcon}>{icons.gamification}</span>
                    <div className={styles.benefitText}>
                      <h4>Gamificación del aprendizaje</h4>
                      <p>Gana puntos, insignias y desbloquea nuevos niveles</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.benefitIcon}>{icons.collaborative}</span>
                    <div className={styles.benefitText}>
                      <h4>Aprendizaje colaborativo</h4>
                      <p>Comparte ideas y aprende junto a otros estudiantes</p>
                    </div>
                  </li>
                </ul>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/capsulas')}
                  className={styles.exploreButton}
                >
                  Explorar cápsulas educativas
                </Button>
              </div>
              <div className={styles.benefitsImage}>
                <div className={styles.imagePlaceholder}>
                  <span className={styles.placeholderEmoji}>{icons.rocket}</span>
                  <span className={styles.placeholderText}>Interfaz Estudiantil</span>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* SECCIÓN: Cápsulas Destacadas */}
        <Section variant="primary" padding="4xl">
          <Container size="lg">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <span className={styles.badgeEmoji}>{icons.star}</span>
                Aprende algo nuevo hoy
              </span>
              <h2 className={styles.sectionTitle}>Cápsulas destacadas</h2>
              <p className={styles.sectionDescription}>
                Comienza con estas cápsulas diseñadas para estudiantes como tú
              </p>
            </div>

            <Grid cols={{ sm: 1, md: 2, lg: 4 }} gap="lg">
              {featuredCapsules.map(capsule => (
                <Card key={capsule.id} variant="elevated" hover className={styles.capsuleCard}>
                  <div className={styles.capsuleIcon}>{capsule.icon}</div>
                  <h3 className={styles.capsuleTitle}>{capsule.title}</h3>
                  <p className={styles.capsuleDescription}>{capsule.description}</p>
                  <div className={styles.capsuleMeta}>
                    <span className={styles.capsuleDuration}>⏱️ {capsule.duration}</span>
                    <span className={styles.capsuleLevel}>📊 {capsule.level}</span>
                  </div>
                  <div className={styles.capsuleProgress}>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${capsule.progress}%` }}
                      />
                    </div>
                    <span className={styles.progressText}>{capsule.progress}% completado</span>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    fullWidth
                    onClick={() => navigate(`/capsulas/${capsule.id}`)}
                  >
                    Continuar aprendizaje
                  </Button>
                </Card>
              ))}
            </Grid>

            <div className={styles.viewAllContainer}>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate('/capsulas')}
              >
                Ver todas las cápsulas
                <span className={styles.arrowIcon}>→</span>
              </Button>
            </div>
          </Container>
        </Section>

        {/* SECCIÓN: Logros y Progreso */}
        <Section variant="light" padding="4xl">
          <Container size="lg">
            <div className={styles.achievementsSection}>
              <div className={styles.achievementsContent}>
                <span className={styles.sectionBadge}>
                  <span className={styles.badgeEmoji}>{icons.certificate}</span>
                  Tus logros
                </span>
                <h2 className={styles.sectionTitle}>Celebra tu progreso</h2>
                <p className={styles.sectionDescription}>
                  Cada cápsula completada, cada nuevo concepto aprendido, 
                  te acerca más a tus metas. Recolecta insignias y comparte 
                  tus logros con la comunidad.
                </p>
                
                <div className={styles.achievementsGrid}>
                  <div className={styles.achievementCard}>
                    <span className={styles.achievementIcon}>🏅</span>
                    <span className={styles.achievementName}>Primeros pasos</span>
                    <span className={styles.achievementDesc}>Completa tu primera cápsula</span>
                  </div>
                  <div className={styles.achievementCard}>
                    <span className={styles.achievementIcon}>🔥</span>
                    <span className={styles.achievementName}>Racha de 7 días</span>
                    <span className={styles.achievementDesc}>Aprende 7 días seguidos</span>
                  </div>
                  <div className={styles.achievementCard}>
                    <span className={styles.achievementIcon}>🧠</span>
                    <span className={styles.achievementName}>Explorador</span>
                    <span className={styles.achievementDesc}>Completa 10 cápsulas</span>
                  </div>
                  <div className={styles.achievementCard}>
                    <span className={styles.achievementIcon}>👑</span>
                    <span className={styles.achievementName}>Maestro</span>
                    <span className={styles.achievementDesc}>100% en todas las cápsulas</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* SECCIÓN: Comunidad Estudiantil */}
        <Section variant="primary" padding="4xl" className={styles.communitySection}>
          <Container size="md">
            <div className={styles.communityContent}>
              <span className={styles.communityBadge}>
                <span className={styles.badgeEmoji}>{icons.community}</span>
                Comunidad
              </span>
              <h2 className={styles.communityTitle}>No estás solo en este viaje</h2>
              <p className={styles.communityDescription}>
                Conéctate con otros estudiantes, comparte experiencias, 
                resuelve dudas y aprende juntos en nuestro foro comunitario.
              </p>
              <div className={styles.communityButtons}>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/foro')}
                >
                  Ir al foro
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/estudiantes/comunidad')}
                >
                  Conocer otros estudiantes
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </PageLayout>
  );
};

export default StudentPage;