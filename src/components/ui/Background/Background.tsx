import React from 'react';
import styles from './Background.module.css';


interface BackgroundProps {
  children: React.ReactNode;
  imagePath: string;
  opacity?: number;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({ 
  children, 
  imagePath, 
  opacity = 1, 
  overlay = true, 
  overlayColor = '#000', 
  overlayOpacity = 0.4,
  className = '' 
}) => {
  return (
    <div 
      className={`${styles.background} ${className}`}
      style={{
        backgroundImage: `url(${imagePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        opacity: opacity,
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
      }}
    >
      {overlay && (
        <div 
          className={styles.overlay}
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}
      <div className={styles.content} style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default Background;