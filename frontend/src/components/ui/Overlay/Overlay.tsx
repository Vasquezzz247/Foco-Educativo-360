import React from 'react';
import styles from './Overlay.module.css';

interface OverlayProps {
  opacity?: number;
  color?: 'black' | 'dark' | 'primary' | 'gradient';
  blur?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Overlay: React.FC<OverlayProps> = ({
  opacity = 0.4,
  color = 'black',
  blur = false,
  children,
  className = ''
}) => {
  const getOverlayStyle = () => {
    const styles: React.CSSProperties = {};
    
    switch (color) {
      case 'black':
        styles.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        break;
      case 'dark':
        styles.backgroundColor = `rgba(45, 55, 72, ${opacity})`; // #2D3748
        break;
      case 'primary':
        styles.backgroundColor = `rgba(184, 234, 255, ${opacity})`; // #B8EAFF
        break;
      case 'gradient':
        styles.background = `linear-gradient(135deg, 
          rgba(0, 0, 0, ${opacity * 0.7}) 0%, 
          rgba(45, 55, 72, ${opacity}) 100%
        )`;
        break;
    }
    
    if (blur) {
      styles.backdropFilter = 'blur(8px)';
    }
    
    return styles;
  };

  return (
    <div 
      className={`${styles.overlay} ${className}`}
      style={getOverlayStyle()}
    >
      {children}
    </div>
  );
};

export default Overlay;