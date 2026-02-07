import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import Background from '../../components/ui/Background/Background'; 
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumb?: boolean;
  backgroundImage?: string; 
  backgroundProps?: {       
    opacity?: number;
    overlay?: boolean;
    overlayColor?: string;
    overlayOpacity?: number;
  };
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  showBreadcrumb = true,
  backgroundImage,
  backgroundProps = {}
}) => {
  const content = (
    <div className={styles.pageLayout}>
      <Header />
      <main className={styles.mainContent}>
        {showBreadcrumb && <Breadcrumb />}
        <div className={styles.pageContent}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );

  if (backgroundImage) {
    return (
      <Background 
        imagePath={backgroundImage}
        opacity={backgroundProps.opacity || 0.9}
        overlay={backgroundProps.overlay || true}
        overlayColor={backgroundProps.overlayColor || "rgba(184, 234, 255, 0.1)"}
        overlayOpacity={backgroundProps.overlayOpacity || 0.1}
      >
        {content}
      </Background>
    );
  }

  return content;
};

export default PageLayout;