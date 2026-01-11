// Importacion de imágenes
import educarAtencionImg from '../assets/images/recursos/recurso-educar-la-atencion.jpeg';
import conoceCerebroImg from '../assets/images/recursos/recurso-conoce-el-cerebro.png';
import comoAprendenImg from '../assets/images/recursos/recurso-como-aprenden-los-niños.jpeg';
import cerebroEmocionImg from '../assets/images/recursos/recurso-cerebro-y-emocion.png';

// Importacion de PDFs
import recursoEducandoAtencion from '../assets/PDFs/recurso-educando-la-atencion.pdf';
import manualNeuroaprendizaje from '../assets/PDFs/manual-practico-de-neuroaprendizaje-para-docentes.pdf';

// Importacion PPTX 
const neurocienciaAprendizajeEmocional = new URL(
  '../assets/diapositivas/neurociencia-y-aprendizaje-emocional.pptx',
  import.meta.url
).href;

export const assets = {
  images: {
    educarAtencion: educarAtencionImg,
    conoceCerebro: conoceCerebroImg,
    comoAprenden: comoAprendenImg,
    cerebroEmocion: cerebroEmocionImg,
  },
  pdfs: {
    educandoAtencion: recursoEducandoAtencion,
    manualNeuroaprendizaje: manualNeuroaprendizaje,
  },
  pptx: {
    neurocienciaAprendizajeEmocional: neurocienciaAprendizajeEmocional,
  }
};