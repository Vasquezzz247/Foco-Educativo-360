import React from 'react';
import styles from './VideoResource.module.css';
import type { VideoResource as VideoResourceType } from '../../data/docentesData';

interface VideoResourceProps extends Omit<VideoResourceType, 'id'> {
  className?: string;
}

const VideoResource: React.FC<VideoResourceProps> = ({
  title,
  description,
  youtubeUrl,
  duration,
  topics,
  className = ''
}) => {
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(youtubeUrl);
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : '';

  const handleWatch = () => {
    if (youtubeUrl) {
      window.open(youtubeUrl, '_blank');
    }
  };

  return (
    <div className={`${styles.videoResource} ${className}`}>
      <div className={styles.thumbnailContainer}>
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className={styles.thumbnail} />
        ) : (
          <div className={styles.noThumbnail}>
            <span>Recurso Web</span>
          </div>
        )}
        {duration && <div className={styles.durationBadge}>{duration}</div>}
        {youtubeUrl && (
          <button type="button" onClick={handleWatch} className={styles.playButton} aria-label="Play video">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.topics}>
          {topics.map((topic, index) => (
            <span key={index} className={styles.topicTag}>
              {topic}
            </span>
          ))}
        </div>
        
        {youtubeUrl ? (
          <button onClick={handleWatch} className={styles.watchButton}>
            Ver en YouTube
          </button>
        ) : (
          <a 
            href="https://www.learningscientists.org/downloadable-materials"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.watchButton}
          >
            Visitar Sitio
          </a>
        )}
      </div>
    </div>
  );
};

export default VideoResource;