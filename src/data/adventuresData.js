// src/data/adventuresData.js
// EJEMPLO COMPLETO CON ROMMELFI

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
          // ============ AUDIO CON ROMMELFI ============
          {
            id: 'audio_1_parvulos_1',
            type: 'audio',
            title: 'Historia: Amigos del Bosque',
            artist: 'Narradores Guardianes',
            
            // MÉTODO 1: Google Drive (RommelFi lo convierte automáticamente)
            file: 'https://drive.google.com/file/d/1ABC123XYZ/view',
            // RommelFi detecta y convierte a:
            // https://drive.google.com/uc?export=download&id=1ABC123XYZ
            
            // MÉTODO 2: URL directa
            // file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            
            // MÉTODO 3: Archivo local
            // file: require('../../assets/audio/parvulos/amigos_del_bosque.mp3'),
            
            duration: '8 min',
            description: '🌸 Florencia la Flor, 🐝 Abejita Zumbadora, 🌳 Arbolito Generoso y 💧 Gotita de Agua descubren que todos se necesitan en el jardín de Dios.',
            
            // ARTWORK - Imagen del track (opcional pero recomendado)
            artwork: 'https://i.imgur.com/ejemplo-amigos-bosque.jpg',
            // o local: require('../../assets/images/artwork_amigos_bosque.jpg'),
            
            // Metadatos adicionales
            notes: '🎧 Audio narrado con voces de personajes y efectos de sonido ambientales del bosque.',
          },
          {
            id: 'audio_1_parvulos_2',
            type: 'audio',
            title: 'Canción: Todos Nos Ayudamos',
            artist: 'Coro Infantil Guardianes',
            file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            duration: '2 min',
            description: '🎵 Canción alegre con movimientos. Perfecta para cantar y bailar juntos.',
            artwork: 'https://i.imgur.com/cancion-ayudamos.jpg',
            notes: '🎶 Incluye letra en el cuaderno. Ideal para repetir 3-4 veces con los niños.',
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
            id: 'audio_1_principiantes_1',
            type: 'audio',
            title: 'Historia: El Equipo del Jardín',
            artist: 'Teatro Guardianes',
            
            // Dropbox (RommelFi convierte ?dl=0 a ?dl=1)
            file: 'https://www.dropbox.com/s/xxxxx/equipo_jardin.mp3?dl=0',
            
            duration: '12 min',
            description: 'Una aventura teatral sobre el Sol, Agua, Plantas y Animales formando un equipo increíble.',
            artwork: 'https://i.imgur.com/equipo-jardin.jpg',
            notes: '🎭 Formato teatral con múltiples voces y música de fondo.',
          },
          {
            id: 'audio_1_principiantes_2',
            type: 'audio',
            title: 'Canción: La Red de la Vida',
            artist: 'Banda Guardianes',
            file: 'https://tuservidor.com/audio/red_vida.mp3',
            duration: '3 min',
            description: 'Rock suave con conceptos más profundos de interdependencia.',
            artwork: require('../../assets/images/red_vida_cover.jpg'), // Local
            notes: '🎸 Incluye solo de guitarra. Perfecta para cerrar la lección.',
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
            id: 'audio_1_primarios_1',
            type: 'audio',
            title: 'Podcast: El Caso Yellowstone',
            artist: 'Dr. Ecólogo Guardián',
            file: 'https://drive.google.com/file/d/YELLOWSTONE_ID/view',
            duration: '15 min',
            description: '🎙️ Documental narrado sobre cómo los lobos transformaron Yellowstone. Incluye datos científicos reales.',
            artwork: 'https://i.imgur.com/yellowstone-lobos.jpg',
            notes: '📊 Incluye estadísticas y mapas en el cuaderno. Ideal para despertar curiosidad científica.',
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
            id: 'audio_1_intermedios_1',
            type: 'audio',
            title: 'Podcast: Dooyeweerd y la Creación',
            artist: 'Prof. Teólogo Reformacional',
            file: 'https://tuservidor.com/dooyeweerd_podcast.mp3',
            duration: '25 min',
            description: '🎓 Exploración profunda de la filosofía reformacional aplicada a la ecología y mayordomía.',
            artwork: 'https://i.imgur.com/dooyeweerd-podcast.jpg',
            notes: '📚 Contenido académico. Recomendar tomar notas. Incluye preguntas de reflexión en el diario.',
          },
        ],
      },
    ],
  },
  
  // ============ AVENTURA 2 - EJEMPLO ============
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
            file: 'https://drive.google.com/file/d/GOTITA_ID/view',
            duration: '10 min',
            description: '💧 Sigue a Gotita en su viaje por el ciclo del agua.',
            artwork: 'https://i.imgur.com/viaje-gotita.jpg',
          },
        ],
      },
    ],
  },
};

// ============ PARA CREAR PLAYLISTS ============
// Puedes agrupar audios de una aventura:

export const getAdventurePlaylist = (adventureId, ageGroupId) => {
  const adventure = ADVENTURES_DATA[adventureId];
  if (!adventure) return [];
  
  const ageGroup = adventure.ageGroups.find(g => g.id === ageGroupId);
  if (!ageGroup) return [];
  
  // Filtrar solo los materiales de tipo audio
  return ageGroup.materials
    .filter(m => m.type === 'audio')
    .map(m => ({
      ...m,
      // Asegurar que tengan los campos necesarios
      id: m.id || Date.now() + Math.random(),
      artist: m.artist || 'Guardianes del Jardín',
    }));
};

// ============ EJEMPLO DE USO EN AdventureDetailScreen ============
/*
import { getAdventurePlaylist } from '../data/adventuresData';

// Al tocar un audio:
onPress={() => {
  if (material.type === 'audio') {
    // Obtener toda la playlist de audios de este grupo de edad
    const playlist = getAdventurePlaylist(adventureId, selectedAgeGroup);
    
    // Encontrar el índice del audio seleccionado
    const startIndex = playlist.findIndex(p => p.id === material.id);
    
    navigation.navigate('RommelFiPlayer', {
      material: {
        ...material,
        id: material.id || Date.now(),
        artist: material.artist || 'Guardianes del Jardín',
      },
      playlist: playlist, // Enviar toda la lista
      startIndex: startIndex >= 0 ? startIndex : 0,
    });
  }
}}
*/

// ============ TIPS PARA ARTWORK ============
/*
1. TAMAÑO RECOMENDADO: 500x500px o 1000x1000px
2. FORMATO: JPG o PNG
3. HOSPEDAJE:
   - Imgur: https://imgur.com (gratis, público)
   - Google Drive: Compartir imagen públicamente
   - Tu servidor: URL directa
   - Assets locales: require('../../assets/...')

4. SI NO TIENES ARTWORK:
   - No lo agregues, RommelFi mostrará una animación bonita
   - O usa una imagen genérica para todos los audios de un grupo

5. CREAR ARTWORK RÁPIDO:
   - Canva.com (plantillas gratis)
   - Remove.bg (quitar fondo)
   - TinyPNG.com (comprimir)
*/

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
