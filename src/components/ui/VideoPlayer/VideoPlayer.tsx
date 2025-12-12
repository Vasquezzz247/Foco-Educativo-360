import React, { useRef, useState } from 'react';
import styles from './VideoPlayer.module.css';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoplay = false,
  muted = true,
  loop = true,
  controls = true,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div 
      className={`${styles.videoContainer} ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className={styles.videoElement}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        muted={isMuted}
        loop={loop}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      
      {controls && (
        <div className={`${styles.controls} ${showControls ? styles.visible : ''}`}>
          {/* Progress bar */}
          <input
            type="range"
            className={styles.progressBar}
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Progreso del video"
          />
          
          <div className={styles.controlsBottom}>
            <div className={styles.controlsLeft}>
              <button 
                className={styles.controlButton}
                onClick={togglePlay}
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              
              <button 
                className={styles.controlButton}
                onClick={toggleMute}
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              
              <span className={styles.timeDisplay}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <div className={styles.controlsRight}>
              <button 
                className={styles.controlButton}
                onClick={toggleFullscreen}
                aria-label="Pantalla completa"
              >
                <FaExpand />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Overlay de play cuando está pausado */}
      {!isPlaying && (
        <div className={styles.playOverlay}>
          <button 
            className={styles.playButton}
            onClick={togglePlay}
            aria-label="Reproducir video"
          >
            <FaPlay />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;