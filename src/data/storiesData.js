// src/data/storiesData.js
// DATOS DE CUENTOS CON IMÁGENES REALES

export const STORIES_DATA = {
  'red-vida': {
    id: 'red-vida',
    title: 'La Red de la Vida',
    author: 'Guardianes del Jardín',
    coverImage: require('../../assets/images/stories/red_vida/portada_cuento.jpeg'),
    ageGroup: 'Párvulos',
    duration: '5 min',
    description: 'Descubre cómo cada pequeña criatura es parte del plan de Dios.',
    pages: [
      {
        id: 1,
        type: 'cover',
        title: 'La Red de la Vida',
        image: require('../../assets/images/stories/red_vida/portada_cuento.jpeg'),
        gradient: ['#27AE60', '#2ECC71']
      },
      {
        id: 2,
        type: 'content',
        dropCap: 'E',
        text: 'En el corazón de un bosque muy antiguo, donde los rayos del sol juegan a las escondidas entre las hojas, vivía Don Roble.',
        image: require('../../assets/images/stories/red_vida/don_roble1.png'),
        gradient: ['#FDFCFB', '#E2D1C3']
      },
      {
        id: 3,
        type: 'content',
        dropCap: 'H',
        text: 'Había un río que cantaba al pasar, llevando vida a cada rincón del jardín.',
        image: require('../../assets/images/stories/red_vida/lucia_rio.png'),
        gradient: ['#E0F7FA', '#B2EBF2']
      },
      {
        id: 4,
        type: 'content',
        dropCap: 'L',
        text: 'La creación de Dios es perfecta cuando la cuidamos y mantenemos el río limpio para todos.',
        image: require('../../assets/images/stories/red_vida/rio_limpio.png'),
        gradient: ['#F1F8E9', '#DCEDC8']
      }
    ]
  }
};

// Función de filtrado requerida por la lógica de la Biblioteca en la línea 33
export const getStoriesByAgeGroup = (ageGroup) => {
  const allStories = Object.values(STORIES_DATA);
  if (!ageGroup || ageGroup === 'Todos') return allStories;
  return allStories.filter(story => story.ageGroup === ageGroup);
};
