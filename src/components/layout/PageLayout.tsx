import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/SimpleFooter';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className={styles.pageLayout}>
      <Header />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;