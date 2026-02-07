import { assets } from '../../../utils/assetImports';

export interface DownloadableResource {
  id: string;
  title: string;
  description: string;
  image: string;
  fileUrl: string;
  type: 'pdf' | 'image' | 'ppt';
  fileSize?: string;
}

export interface VideoResource {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  duration: string;
  topics: string[];
}

export interface DocentesResources {
  downloadable: DownloadableResource[];
  videos: VideoResource[];
}

export const docentesResources: DocentesResources = {
  downloadable: [
    {
      id: '1',
      title: 'Educando la Atención',
      description: 'Guía práctica sobre estrategias para mejorar la atención en el aula basada en neurociencia.',
      image: assets.images.educarAtencion,
      fileUrl: assets.pdfs.educandoAtencion,
      type: 'pdf',
      fileSize: '4.42 MB'
    },
    {
      id: '2',
      title: 'Manual Práctico de Neuroaprendizaje',
      description: 'Guía completa con ejercicios y estrategias para aplicar neurociencia en el aula.',
      image: assets.images.cerebroEmocion,
      fileUrl: assets.pdfs.manualNeuroaprendizaje,
      type: 'pdf',
      fileSize: '0.6 MB'
    },
    {
      id: '3',
      title: 'Neurociencia y Aprendizaje Emocional',
      description: 'Presentación sobre la integración de emociones y neurociencia en procesos educativos.',
      image: assets.images.comoAprenden,
      fileUrl: assets.pptx.neurocienciaAprendizajeEmocional,
      type: 'ppt',
      fileSize: '23.9 MB'
    },
  ],
  videos: [
    {
      id: '1',
      title: 'Neurociencia del Aprendizaje',
      description: 'Analiza las diferencias entre aprender y estudiar, motivar y manipular, educar y escolarizar.',
      youtubeUrl: 'https://www.youtube.com/watch?v=dE_5xLRWi3Q',
      duration: '15:30',
      topics: ['Neurociencia', 'Motivación', 'Pedagogía Crítica']
    },
    {
      id: '2',
      title: 'Neurociencias Aplicadas a la Educación',
      description: 'Cómo las bases neurofisiológicas del aprendizaje son inseparables de los procesos educativos.',
      youtubeUrl: 'https://www.youtube.com/watch?v=ZKuP9cYs_gc',
      duration: '22:45',
      topics: ['Atención', 'Memoria', 'Emociones', 'Estrategias Prácticas']
    },
    {
      id: '3',
      title: 'Cómo Funciona el Cerebro',
      description: 'Introducción visual a la neuroanatomía y neurofisiología del aprendizaje.',
      youtubeUrl: 'https://www.youtube.com/watch?v=UOusAbYrRL8',
      duration: '10:15',
      topics: ['Neuroanatomía', 'Neurofisiología', 'Metacognición']
    },

  ]
};