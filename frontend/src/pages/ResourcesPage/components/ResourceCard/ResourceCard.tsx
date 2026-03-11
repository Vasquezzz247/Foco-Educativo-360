import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../../../../components/ui/Card/Card';
import { Link } from 'react-router-dom';
import styles from './ResourceCard.module.css';

export interface ResourceCardProps {
  resource: {
    id: number;
    title: string;
    description: string;
    type: 'video' | 'pdf' | 'link' | 'tool';
    duration?: string;
    thumbnail: string;
    slug: string;
    tags: string[];
  };
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <Card variant="elevated" hover={true} className={styles.resourceCard}>
      <Link to={`/recursos/${resource.slug}`} className={styles.cardLink}>
        <CardHeader className={styles.cardHeader}>
          <div className={styles.thumbnailContainer}>
            <img 
              src={resource.thumbnail} 
              alt={resource.title}
              className={styles.thumbnail}
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/400x225/6B8AFD/FFFFFF?text=Video+Thumbnail';
              }}
            />
            {resource.type === 'video' && resource.duration && (
              <span className={styles.durationBadge}>{resource.duration}</span>
            )}
            <div className={styles.typeBadge}>
              {resource.type === 'video' ? '🎬 Video' : 
               resource.type === 'pdf' ? '📄 PDF' : 
               resource.type === 'tool' ? '🛠️ Herramienta' : '🔗 Enlace'}
            </div>
          </div>
        </CardHeader>
        
        <CardBody className={styles.cardBody}>
          <h3 className={styles.title}>{resource.title}</h3>
          <p className={styles.description}>{resource.description}</p>
          
          <div className={styles.tags}>
            {resource.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </CardBody>
        
        <CardFooter className={styles.cardFooter}>
          <button className={styles.button}>
            {resource.type === 'video' ? 'Ver Recurso' : 
             resource.type === 'pdf' ? 'Descargar' : 'Acceder'}
          </button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ResourceCard;