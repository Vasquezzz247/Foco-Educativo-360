import React from 'react';
import styles from './ResourceCard.module.css';
import type { DownloadableResource } from '../../data/docentesData';

interface ResourceCardProps extends Omit<DownloadableResource, 'id'> {
  className?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  image,
  fileUrl,
  type,
  fileSize,
  className = ''
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'pdf':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
          </svg>
        );
      case 'ppt':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"/>
          </svg>
        );
      case 'image':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'pdf': return 'PDF';
      case 'ppt': return 'Presentación';
      case 'image': return 'Imagen';
      default: return 'Archivo';
    }
  };

  const getDownloadText = () => {
    switch (type) {
      case 'pdf': return 'Descargar PDF';
      case 'ppt': return 'Descargar PPT';
      case 'image': return 'Descargar Imagen';
      default: return 'Descargar';
    }
  };

  const handleDownload = () => {
    window.open(fileUrl, '_blank');
  };

  return (
    <div className={`${styles.resourceCard} ${className}`}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.typeBadge}>
          <span className={styles.typeIcon}>{getTypeIcon()}</span>
          <span>{getTypeLabel()}</span>
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.fileInfo}>
          <span className={styles.fileType}>{getTypeLabel()}</span>
          {fileSize && <span className={styles.fileSize}>{fileSize}</span>}
        </div>
        
        <button onClick={handleDownload} className={styles.downloadButton}>
          <span className={styles.buttonIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 16L12 4M12 16L8 12M12 16L16 12" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 20L20 20" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </span>
          <span>{getDownloadText()}</span>
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;