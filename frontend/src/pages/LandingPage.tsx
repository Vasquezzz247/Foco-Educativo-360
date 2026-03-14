import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Section, Container, Grid } from '../components/ui/Layout';
import HeroSection from '../components/sections/HeroSection/HeroSection';
import Button from '../components/ui/Button/Button';
import Card from '../components/ui/Card/Card';
import styles from './LandingPage.module.css';
import { FaBrain, FaUserGraduate, FaChartLine, FaUsers } from 'react-icons/fa';

const LandingPage: React.FC = () => {
  return (
    <PageLayout showBreadcrumb={false}>
    <div className={styles.landingPage}>
      {/* Hero Section Version 6 */}
      <HeroSection />
      
      {/* Sección: ¿Qué es Foco Educativo 360? */}
      <Section 
        variant="light" 
        padding="3xl" 
        align="center"
        dividerBottom
      >
        <Container size="lg">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>¿Qué es?</span>
            <h2 className={styles.sectionTitle}>
              Más que una plataforma, una <span className={styles.highlight}>revolución educativa</span>
            </h2>
            <p className={styles.sectionDescription}>
              Combinamos neurociencia, pedagogía y tecnología para crear experiencias 
              de aprendizaje que realmente funcionan.
            </p>
          </div>
          
          <Grid cols={{ sm: 1, md: 2, lg: 4 }} gap="lg">
            <Card variant="elevated" hover className={styles.featureCard}>
              <div className={styles.cardIcon}>
                <FaBrain />
              </div>
              <h3>Neuroeducación</h3>
              <p>Basado en principios científicos del aprendizaje</p>
            </Card>
            
            <Card variant="elevated" hover className={styles.featureCard}>
              <div className={styles.cardIcon}>
                <FaUserGraduate />
              </div>
              <h3>Personalización</h3>
              <p>Adaptado a cada estilo de aprendizaje</p>
            </Card>
            
            <Card variant="elevated" hover className={styles.featureCard}>
              <div className={styles.cardIcon}>
                <FaChartLine />
              </div>
              <h3>Seguimiento</h3>
              <p>Métricas detalladas del progreso</p>
            </Card>
            
            <Card variant="elevated" hover className={styles.featureCard}>
              <div className={styles.cardIcon}>
                <FaUsers />
              </div>
              <h3>Comunidad</h3>
              <p>Red de docentes y estudiantes</p>
            </Card>
          </Grid>
        </Container>
      </Section>
      
      {/* Sección CTA Final */}
      <Section 
        variant="transparent" 
        padding="4xl"
        align="center"
        fullWidth
        pattern="dots"
        patternOpacity={0.1}
      >
        <Container size="md">
          <div className={styles.finalCta}>
            <h2 className={styles.ctaTitle}>
              ¿Listo para transformar la educación?
            </h2>
            <p className={styles.ctaDescription}>
              Únete a miles de educadores y estudiantes que ya están 
              experimentando una nueva forma de aprender y enseñar.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="primary" size="lg">
                Comenzar gratis
              </Button>
              <Button variant="outline" size="lg">
                Agenda una demo personalizada
              </Button>
            </div>
            <div className={styles.trustSignals}>
              <span className={styles.trustItem}>✅ Sin tarjeta de crédito requerida</span>
              <span className={styles.trustItem}>🔄 14 días de prueba gratis</span>
              <span className={styles.trustItem}>👨‍🏫 Soporte educativo incluido</span>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  </PageLayout>  
  );
};

export default LandingPage;