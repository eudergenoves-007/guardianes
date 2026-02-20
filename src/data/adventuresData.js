// src/data/adventuresData.js
// BASE DE DATOS FINAL - AUDIO WEB OPTIMIZADO (CARPETA PUBLIC)

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
          { type: 'guide', title: 'Guía del Maestro', file: 'aventura_1_parvulos_guia.pdf', duration: '60-90 min' },
          { type: 'workbook', title: 'Cuaderno del Guardián', file: 'aventura_1_parvulos_cuaderno.pdf', pages: 8 },
          {
            id: 'audio_1_parvulos_1',
            type: 'audio',
            title: 'Guardianes del Jardín',
            artist: 'Coro Infantil',
            file: '/audio/guardianes_del_jardin.mp3',
            duration: '3:00',
            description: 'Canción principal.',
          },
          {
            id: 'audio_1_parvulos_2',
            type: 'audio',
            title: 'El sol brilla fuerte',
            artist: 'Narradores',
            file: '/audio/el_sol_brilla.mp3',
            duration: '3:00',
            description: 'El sol brilla fuerte.',
          },
        ],
      },
      {
        id: 'principiantes',
        name: 'Principiantes (6-8 años)',
        icon: '👧',
        color: '#4ECDC4',
        materials: [
          { type: 'guide', title: 'Guía del Maestro', file: 'aventura_1_principiantes_guia.pdf', duration: '75-90 min' },
          { type: 'workbook', title: 'Cuaderno del Guardián', file: 'aventura_1_principiantes_cuaderno.pdf', pages: 12 },
          {
            id: 'audio_1_principiantes_1',
            type: 'audio',
            title: 'Dios me dio un cerebro',
            artist: 'Teatro Guardianes',
            file: '/audio/dios_me_dio_cerebro.mp3',
            duration: '4:00',
            description: 'Dios me dio un cerebro.',
          },
          {
            id: 'audio_1_principiantes_2',
            type: 'audio',
            title: 'Había un río',
            artist: 'Banda Guardianes',
            file: '/audio/habia_un_rio.mp3',
            duration: '4:00',
            description: 'Había un río.',
          },
        ],
      },
      {
        id: 'primarios',
        name: 'Primarios (9-11 años)',
        icon: '🧒',
        color: '#FFD93D',
        materials: [
          { type: 'guide', title: 'Guía del Maestro', file: 'aventura_1_primarios_guia.pdf', duration: '90-120 min' },
          {
            id: 'audio_1_primarios_1',
            type: 'audio',
            title: 'La hoja que cae',
            artist: 'Dr. Ecólogo Guardián',
            file: '/audio/la_hoja_que_cae.mp3',
            duration: '5:00',
            description: 'La hoja que cae.',
          },
        ],
      },
      {
        id: 'intermedios',
        name: 'Intermedios (12-17 años)',
        icon: '🧑',
        color: '#A8DADC',
        materials: [
          { type: 'guide', title: 'Guía del Maestro', file: 'aventura_1_intermedios_guia.pdf', duration: '120-150 min' },
          {
            id: 'audio_1_intermedios_1',
            type: 'audio',
            title: 'No tengo un jardín',
            artist: 'Prof. Reformacional',
            file: '/audio/no_tengo_jardin.mp3',
            duration: '6:00',
            description: 'No tengo un jardín.',
          },
        ],
      },
    ],
  },
  2: {
    id: 2,
    title: 'Los Ciclos del Jardín',
    subtitle: 'Nada se desperdicia',
    icon: '🔄',
    color: '#3498DB',
    ageGroups: [
      {
        id: 'parvulos',
        name: 'Párvulos (3-5 años)',
        icon: '👶',
        color: '#FF6B9D',
        materials: [
          {
            id: 'audio_2_parvulos_1',
            type: 'audio',
            title: 'Una niña plantó una semilla',
            artist: 'Narradores Guardianes',
            file: '/audio/nina_planto_semilla.mp3',
            duration: '5:00',
            description: 'Una niña plantó una semilla.',
          },
        ],
      },
    ],
  },
};

export const getAdventurePlaylist = (adventureId, ageGroupId) => {
  const adventure = ADVENTURES_DATA[adventureId];
  if (!adventure) return [];
  const ageGroup = adventure.ageGroups.find(g => g.id === ageGroupId);
  if (!ageGroup) return [];
  return ageGroup.materials
    .filter(m => m.type === 'audio')
    .map(m => ({
      ...m,
      id: m.id || Date.now() + Math.random(),
      artist: m.artist || 'Guardianes del Jardín',
    }));
};

export const AGE_GROUPS = [
  { id: 'parvulos', name: 'Párvulos', ageRange: '3-5 años', icon: '👶', color: '#FF6B9D', description: 'Aprendizaje a través del juego' },
  { id: 'principiantes', name: 'Principiantes', ageRange: '6-8 años', icon: '👧', color: '#4ECDC4', description: 'Descubrimiento activo' },
  { id: 'primarios', name: 'Primarios', ageRange: '9-11 años', icon: '🧒', color: '#FFD93D', description: 'Pensamiento crítico' },
  { id: 'intermedios', name: 'Intermedios', ageRange: '12-17 años', icon: '🧑', color: '#A8DADC', description: 'Análisis profundo' },
];

export const MATERIAL_TYPES = {
  guide: { icon: 'book', label: 'Guía', color: '#27AE60' },
  workbook: { icon: 'create', label: 'Cuaderno', color: '#3498DB' },
  audio: { icon: 'headset', label: 'Audio', color: '#9B59B6' },
  video: { icon: 'videocam', label: 'Video', color: '#E74C3C' },
  article: { icon: 'document-text', label: 'Lectura', color: '#F39C12' },
};

export const getAllAudiosPlaylist = () => {
  let allAudios = [];
  Object.values(ADVENTURES_DATA).forEach(adventure => {
    if(adventure.ageGroups) {
      adventure.ageGroups.forEach(group => {
        if(group.materials) {
          group.materials.forEach(material => {
            if (material.type === 'audio') {
              allAudios.push({
                ...material,
                id: material.id || Math.random().toString(),
                artist: material.artist || 'Guardianes del Jardín',
                description: `${adventure.title} - ${group.name}`,
              });
            }
          });
        }
      });
    }
  });
  return allAudios;
};
