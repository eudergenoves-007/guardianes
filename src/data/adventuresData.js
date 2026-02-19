export const ADVENTURES_DATA = {
  1: {
    id: 1,
    title: 'La Red de la Vida',
    subtitle: 'Todo está conectado',
    description: 'Descubre cómo cada elemento del jardín se ayuda mutuamente',
    icon: '🕸️',
    color: '#27AE60',
    verse: '1 Corintios 12:12',
    verseText: 'Así como el cuerpo es uno, y tiene muchos miembros...',
    ageGroups: [
      {
        id: 'parvulos',
        name: 'Párvulos (3-5 años)',
        icon: '👶',
        color: '#FF6B9D',
        materials: [
          {
            type: 'guide',
            title: 'Guía del Maestro',
            file: 'aventura_1_parvulos_guia.pdf',
            duration: '60-90 min',
          },
          {
            type: 'workbook',
            title: 'Cuaderno del Guardián',
            file: 'aventura_1_parvulos_cuaderno.pdf',
            pages: 8,
          },
          {
            type: 'audio',
            title: 'Historia: Amigos del Bosque',
            file: 'amigos_del_bosque.mp3',
            duration: '8 min',
          },
          {
            type: 'audio',
            title: 'Canción: Todos Nos Ayudamos',
            file: 'cancion_todos_ayudamos.mp3',
            duration: '2 min',
          },
        ],
      },
      {
        id: 'principiantes',
        name: 'Principiantes (6-8 años)',
        icon: '👧',
        color: '#4ECDC4',
        materials: [
          {
            type: 'guide',
            title: 'Guía del Maestro',
            file: 'aventura_1_principiantes_guia.pdf',
            duration: '75-90 min',
          },
          {
            type: 'workbook',
            title: 'Cuaderno del Guardián',
            file: 'aventura_1_principiantes_cuaderno.pdf',
            pages: 12,
          },
          {
            type: 'audio',
            title: 'Historia: El Equipo del Jardín',
            file: 'equipo_jardin.mp3',
            duration: '12 min',
          },
        ],
      },
      {
        id: 'primarios',
        name: 'Primarios (9-11 años)',
        icon: '🧒',
        color: '#FFD93D',
        materials: [
          {
            type: 'guide',
            title: 'Guía del Maestro',
            file: 'aventura_1_primarios_guia.pdf',
            duration: '90-120 min',
          },
          {
            type: 'workbook',
            title: 'Cuaderno del Guardián',
            file: 'aventura_1_primarios_cuaderno.pdf',
            pages: 16,
          },
          {
            type: 'video',
            title: 'Caso Yellowstone',
            file: 'yellowstone_lobos.mp4',
            duration: '8 min',
          },
        ],
      },
      {
        id: 'intermedios',
        name: 'Intermedios (12-17 años)',
        icon: '🧑',
        color: '#A8DADC',
        materials: [
          {
            type: 'guide',
            title: 'Guía del Maestro',
            file: 'aventura_1_intermedios_guia.pdf',
            duration: '120-150 min',
          },
          {
            type: 'workbook',
            title: 'Diario del Guardián',
            file: 'aventura_1_intermedios_diario.pdf',
            pages: 20,
          },
          {
            type: 'article',
            title: 'Lectura: Dooyeweerd y la Creación',
            file: 'dooyeweerd_creacion.pdf',
          },
        ],
      },
    ],
  },
  // Aquí se agregarían las otras 5 aventuras...
};

export const AGE_GROUPS = [
  {
    id: 'parvulos',
    name: 'Párvulos',
    ageRange: '3-5 años',
    icon: '👶',
    color: '#FF6B9D',
    description: 'Aprendizaje a través del juego y actividades sensoriales',
  },
  {
    id: 'principiantes',
    name: 'Principiantes',
    ageRange: '6-8 años',
    icon: '👧',
    color: '#4ECDC4',
    description: 'Descubrimiento activo con experimentos y juegos',
  },
  {
    id: 'primarios',
    name: 'Primarios',
    ageRange: '9-11 años',
    icon: '🧒',
    color: '#FFD93D',
    description: 'Pensamiento crítico y proyectos colaborativos',
  },
  {
    id: 'intermedios',
    name: 'Intermedios',
    ageRange: '12-17 años',
    icon: '🧑',
    color: '#A8DADC',
    description: 'Análisis profundo y aplicación personal',
  },
];

export const MATERIAL_TYPES = {
  guide: { icon: 'book', label: 'Guía', color: '#27AE60' },
  workbook: { icon: 'create', label: 'Cuaderno', color: '#3498DB' },
  audio: { icon: 'headset', label: 'Audio', color: '#9B59B6' },
  video: { icon: 'videocam', label: 'Video', color: '#E74C3C' },
  article: { icon: 'document-text', label: 'Lectura', color: '#F39C12' },
};
