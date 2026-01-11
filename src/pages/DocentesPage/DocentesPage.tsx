import React from 'react';
import Container from '../../components/ui/Layout/Container';
import Section from '../../components/ui/Layout/Section';
import Grid from '../../components/ui/Layout/Grid';
import styles from './DocentesPage.module.css';
import DocentesHero from './components/DocentesHero/DocentesHero';
import ResourceCard from './components/ResourceCard/ResourceCard';
import VideoResource from './components/VideoResource/VideoResource';
import { docentesResources } from './data/docentesData';

const DocentesPage: React.FC = () => {
  return (
    <div className={styles.docentesPage}>
      <DocentesHero />
      
      <Section className={styles.resourcesSection}>
        <Container>
          <h2 className={styles.sectionTitle}>Recursos Descargables</h2>
          <p className={styles.sectionDescription}>
            Materiales prácticos basados en neurociencia educativa para tu práctica docente
          </p>
          
          <Grid cols={2} gap="lg" className={styles.resourcesGrid}>
            {docentesResources.downloadable.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                description={resource.description}
                image={resource.image}
                fileUrl={resource.fileUrl}
                type={resource.type}
                fileSize={resource.fileSize}
              />
            ))}
          </Grid>
        </Container>
      </Section>
      
      <Section className={styles.videosSection}>
        <Container>
          <h2 className={styles.sectionTitle}>Videos Educativos</h2>
          <p className={styles.sectionDescription}>
            Recursos audiovisuales sobre neurociencia y aprendizaje
          </p>
          
          <Grid cols={2} gap="lg" className={styles.videosGrid}>
            {docentesResources.videos.map((video) => (
              <VideoResource
                key={video.id}
                title={video.title}
                description={video.description}
                youtubeUrl={video.youtubeUrl}
                duration={video.duration}
                topics={video.topics}
              />
            ))}
          </Grid>
        </Container>
      </Section>
      
      <Section className={styles.externalResourcesSection}>
        <Container>
          <h2 className={styles.sectionTitle}>Recursos Externos Recomendados</h2>
          <div className={styles.externalResource}>
            <div className={styles.externalResourceHeader}>
              <h3>The Learning Scientists</h3>
              <span className={styles.recommendedBadge}>Recomendado</span>
            </div>
            <p className={styles.externalResourceDescription}>
              Materiales descargables basados en psicología cognitiva con estrategias de aprendizaje efectivo
            </p>
            <div className={styles.externalResourceInfo}>
              <span className={styles.resourceType}>Sitio Web Educativo</span>
              <span className={styles.resourceLanguage}>Inglés/Español</span>
            </div>
            <a 
              href="https://www.learningscientists.org/downloadable-materials" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.externalLink}
            >
              <span>Visitar sitio oficial</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 5v2h3.586l-9.293 9.293 1.414 1.414L19 8.414V12h2V5h-7z"/>
              </svg>
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default DocentesPage;