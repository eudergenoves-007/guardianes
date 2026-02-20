// src/data/adventuresData.js
// BASE DE DATOS FINAL - GUARDIANES DEL JARDÍN

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
            title: 'Historia: Amigos del Bosque',
            artist: 'Narradores Guardianes',
            file: 'https://drive.google.com/file/d/1mUXbpDbE5My3IOSZSdMdShtTyczf0QdO/view',
            duration: '8 min',
            description: '🌸 Florencia la Flor, 🐝 Abejita Zumbadora, 🌳 Arbolito Generoso y 💧 Gotita de Agua descubren que todos se necesitan en el jardín de Dios.',
          },
          {
            id: 'audio_1_parvulos_2',
            type: 'audio',
            title: 'Canción: Todos Nos Ayudamos',
            artist: 'Coro Infantil Guardianes',
            file: 'https://drive.google.com/file/d/19ZzcY0NuKX_iPSkoC4N4Z3G39V_0KFQY/view',
            duration: '3 min',
            description: '🎵 Canción alegre con movimientos. Perfecta para cantar y bailar juntos.',
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
            title: 'Historia: El Equipo del Jardín',
            artist: 'Teatro Guardianes',
            file: 'https://drive.google.com/file/d/1JSMaYn-VoVMPNs2bBDedCAaYpjx4YPS1/view',
            duration: '12 min',
            description: 'Una aventura teatral sobre el Sol, Agua, Plantas y Animales formando un equipo increíble.',
          },
          {
            id: 'audio_1_principiantes_2',
            type: 'audio',
            title: 'Canción: La Red de la Vida',
            artist: 'Banda Guardianes',
            file: 'https://drive.google.com/file/d/1sX0pzcZcEOsw8TdTroQWpdvSVeWUbVvd/view',
            duration: '4 min',
            description: 'Rock suave con conceptos más profundos de interdependencia.',
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
            title: 'Podcast: El Caso Yellowstone',
            artist: 'Dr. Ecólogo Guardián',
            file: 'https://drive.google.com/file/d/1umJUKgQNwvftaDHHIviS-cbC1wjr5uL8/view',
            duration: '15 min',
            description: '🎙️ Documental narrado sobre cómo los lobos transformaron Yellowstone.',
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
            title: 'Podcast: Dooyeweerd y la Creación',
            artist: 'Prof. Teólogo Reformacional',
            file: 'https://drive.google.com/file/d/1TftCp5yyGgeJDalfYT7pOVkHuCrpDEqb/view',
            duration: '25 min',
            description: '🎓 Exploración profunda de la filosofía reformacional aplicada a la ecología y mayordomía.',
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
            title: 'Historia: El Viaje de la Gotita',
            artist: 'Narradores Guardianes',
            file: 'https://drive.google.com/file/d/1EgQ21tFqFD2esM25gkTWmNwAvzxOv26e/view',
            duration: '10 min',
            description: '💧 Sigue a Gotita en su viaje por el ciclo del agua.',
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

// === RECOLECTOR GLOBAL DE AUDIOS PARA EL MENÚ PRINCIPAL ===
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
