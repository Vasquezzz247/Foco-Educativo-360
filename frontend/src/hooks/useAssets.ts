import { assets } from '../utils/assetImports';

export const useAssets = () => {
  return {
    // Helper para obtener URLs de assets
    getImage: (key: keyof typeof assets.images) => assets.images[key],
    getPdf: (key: keyof typeof assets.pdfs) => assets.pdfs[key],
    getPptx: (key: keyof typeof assets.pptx) => assets.pptx[key],
    getVideo: (key: keyof typeof assets.videos) => assets.videos[key],
    
    // URLs directas
    ...assets
  };
};