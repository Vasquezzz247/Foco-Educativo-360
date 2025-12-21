import React from 'react';
import styles from './VideoModal.module.css';

interface VideoModalProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, title, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        
        <div className={styles.videoContainer}>
          <video 
            src={videoUrl} 
            controls 
            autoPlay 
            className={styles.video}
          />
        </div>
        
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;