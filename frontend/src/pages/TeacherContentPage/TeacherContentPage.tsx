import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import Container from '../../components/ui/Layout/Container';
import ContentManager from '../../components/TeacherContent/ContentManager';
import backgroundImage from '../../assets/images/background/background-site.png';
import styles from './TeacherContentPage.module.css';

const TeacherContentPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Verificar autenticación y rol
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.role !== 'teacher' && user?.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

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
      <Container>
        <ContentManager />
      </Container>
    </PageLayout>
  );
};

export default TeacherContentPage;