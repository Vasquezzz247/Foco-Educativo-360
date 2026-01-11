import conociendoCerebroThumb from '../../../assets/images/thumbnails/recurso-conociendo-el-cerebro.jpg';


export interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'link' | 'tool';
  duration?: string; // Para videos
  thumbnail: string;
  videoUrl?: string;
  slug: string;
  externalUrl?: string;
  tags: string[];
}

export const resourcesData: Resource[] = [
  {
    id: 1,
    title: "Conociendo el Cerebro",
    description: "Video introductorio sobre neuroeducación y cómo funciona el cerebro en procesos de aprendizaje.",
    type: 'video',
    duration: "07:13",
    thumbnail: conociendoCerebroThumb,
    videoUrl: "/src/assets/videos/recurso-conociendo-el-cerebro.mp4",
    slug: "conociendo-el-cerebro",
    tags: ["Neurociencia", "Introducción", "Video"]
  },
  // Puedes agregar más recursos aquí
];