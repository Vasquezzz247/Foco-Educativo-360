import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageLayout from '../../components/layout/PageLayout';
import { Container, Grid } from '../../components/ui/Layout';
import Card from '../../components/ui/Card/Card';
import Button from '../../components/ui/Button/Button';
import backgroundImage from '../../assets/images/background/background-site.png';
import styles from './DashboardPage.module.css';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <PageLayout 
    showBreadcrumb={true}
    backgroundImage={backgroundImage}
    >
      <Container size="lg" className={styles.container}>
        <div className={styles.welcomeMessage}>
          <h1>Mi Espacio</h1>
          <p>Bienvenido, {user?.name}</p>
        </div>
        
        <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="lg" className={styles.statsGrid}>
          
          <Card variant="elevated" className={styles.statCard}>
            <h3>Cápsulas Completadas</h3>
            <div className={styles.statNumber}>5/12</div>
            <p>Progreso: 42%</p>
          </Card>
          
          <Card variant="elevated" className={styles.statCard}>
            <h3>Recursos Descargados</h3>
            <div className={styles.statNumber}>8</div>
            <p>Último: Neurociencia del Aprendizaje</p>
          </Card>
          
          <Card variant="elevated" className={styles.statCard}>
            <h3>Actividad Reciente</h3>
            <div className={styles.statNumber}>Hoy</div>
            <p>3 actividades completadas</p>
          </Card>
        </Grid>
        
        <div className={styles.quickActionsTitle}>
          <h2>Acciones Rápidas</h2>
        </div>
          
        <Grid cols={{ sm: 1, md: 2, lg: 4 }} gap="md" className={styles.quickActionsGrid}>

          <Card variant="outline" hover className={styles.actionCard}>
            <h4>👨‍🏫 Ver Recursos Docentes</h4>
            <p>Accede a materiales especializados</p>
            <Button onClick={() => navigate('/docentes')} className={styles.actionLink}>
              Explorar →
            </Button>
          </Card>
            
          <Card variant="outline" hover className={styles.actionCard}>
            <h4>🧠 Continuar Cápsulas</h4>
            <p>Retoma tu aprendizaje neuroeducativo</p>
            <Button onClick={() => navigate('/capsulas')} className={styles.actionLink}>
              Continuar →
            </Button>
          </Card>
            
          <Card variant="outline" hover className={styles.actionCard}>
            <h4>📚 Biblioteca de Recursos</h4>
            <p>Explora todos los materiales disponibles</p>
            <Button onClick={() => navigate('/recursos')} className={styles.actionLink}>
              Ver todos →
            </Button>
          </Card>
            
          <Card variant="outline" hover className={styles.actionCard}>
            <h4>👤 Mi Perfil</h4>
            <p>Actualiza tu información personal</p>
            <Button onClick={() => navigate('/perfil')} className={styles.actionLink}>
              Ir a perfil →
            </Button>
          </Card>
        </Grid>
 
      </Container>
    </PageLayout>
  );
};

export default DashboardPage;