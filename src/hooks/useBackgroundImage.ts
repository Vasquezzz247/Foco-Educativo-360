import { useState, useEffect } from 'react';

interface UseBackgroundImageProps {
  imageUrl: string;
  lazyLoad?: boolean;
}

const useBackgroundImage = ({ imageUrl, lazyLoad = true }: UseBackgroundImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!lazyLoad) {
      setImageSrc(imageUrl);
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      setIsLoaded(true);
      setImageSrc(imageUrl);
    };

    img.onerror = () => {
      console.error(`Error loading background image: ${imageUrl}`);
      setIsLoaded(true); // Para que no quede cargando...
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl, lazyLoad]);

  return { isLoaded, imageSrc };
};

export default useBackgroundImage;