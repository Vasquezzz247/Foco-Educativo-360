export interface Capsule {
  id: number;
  name: string;
  neuroAxis: string;       // Eje Neuroeducativo
  cognitiveObjective: string;
  description?: string;    // Opcional: para detalles adicionales
  iconName?: string;       // Para iconos (si se usa react-icons)
  colorTheme?: string;     // Para estilos por cápsula
}

export const capsulesData: Capsule[] = [
  {
    id: 1,
    name: "El Ancla Emocional",
    neuroAxis: "Activación y Emoción: Uso de la sorpresa y la curiosidad (novedad) para iniciar la clase, liberando dopamina.",
    cognitiveObjective: "Fomentar la atención inicial (alerta)",
    iconName: "FaAnchor", // Ejemplo: de react-icons/fa
    colorTheme: "#4A90E2", // Azul
  },
  {
    id: 2,
    name: "La Dosis Perfecta (Breaks Cerebrales)",
    neuroAxis: "Ritmo y Pausas: Introducción de pausas activas breves (2-3 minutos) para restaurar los recursos atencionales.",
    cognitiveObjective: "Mejorar la atención sostenida y reducir la fatiga.",
    iconName: "FaCoffee",
    colorTheme: "#50C878", // Verde
  },
  {
    id: 3,
    name: "Manos a la Obra (Aprendizaje Activo)",
    neuroAxis: "Multisensorialidad y Movimiento: Estrategias que incorporan el cuerpo y múltiples sentidos para fijar el aprendizaje.",
    cognitiveObjective: "Fortalecer la memoria de trabajo y el procesamiento de la información.",
    iconName: "FaHands",
    colorTheme: "#FF6B6B", // Rojo/naranja
  },
  {
    id: 4,
    name: "El Mapa Mental del Recuerdo",
    neuroAxis: "Organización y Relevancia: Uso de organizadores gráficos y técnicas de repaspa-cio para la recuperación.",
    cognitiveObjective: "Potenciar el cierre y la consolidación de la información.",
    iconName: "FaMap",
    colorTheme: "#9B59B6", // Púrpura
  },
  {
    id: 5,
    name: "La Magia del Error (Feedback Constructivo)",
    neuroAxis: "Emoción y Motivación: Cómo el feedback positivo y el manejo del error como oportunidad impulsan el sistema de recompensa.",
    cognitiveObjective: "Aumentar la motivación intrínseca y la persistencia atencional.",
    iconName: "FaMagic",
    colorTheme: "#F39C12", // Amarillo/naranja
  },
];