// src/data/storiesData.js - VERSIÓN LIMPIA (SIN APOSTROFES)
export const STORIES = {
  secreto_bosque: {
    id: 'secreto_bosque',
    title: 'El Secreto del Bosque Olvidado',
    subtitle: 'Aventura 1: La Red de la Vida',
    author: 'Futura Editions',
    cover: require('../../assets/images/stories/red_vida/portada_cuento.jpeg'),
    ageGroup: 'todos',
    duration: '10-12 min',
    theme: 'Interdependencia',
    pages: [
      { type: 'cover', image: require('../../assets/images/stories/red_vida/portada_cuento.jpeg'), text: '', gradientColors: ['#27AE60', '#2ECC71'] },
      { type: 'content', image: require('../../assets/images/stories/red_vida/bosquebonito.png'), text: 'Había una vez un bosque tan hermoso que los pájaros lo llamaban "El Jardín del Creador". Cada árbol conocía su lugar. Cada flor sabía cuándo abrir sus pétalos.', gradientColors: ['#FFF8E1', '#FFFBF0'] },
      { type: 'content', image: require('../../assets/images/stories/red_vida/don_roble1.png'), text: 'En el corazón del bosque vivía Don Roble, el árbol más antiguo. Sus raíces eran tan profundas que tocaban las aguas subterráneas.', gradientColors: ['#FFF8E1', '#FFFBF0'] },
      { type: 'content', image: null, text: 'Cada mañana, cuando el sol despertaba, Don Roble contaba el secreto a quien quisiera escuchar: "Nada en este bosque vive solo."', gradientColors: ['#FFF8E1', '#FFFBF0'] },
      { type: 'content', image: require('../../assets/images/stories/red_vida/tomas.png'), text: 'Pero un día, llegó al bosque un hombre llamado Tomás el Impaciente. Tomás miró el bosque y no vio el secreto. Solo vio madera.', gradientColors: ['#FFF8E1', '#FFFBF0'] },
      { type: 'content', image: require('../../assets/images/stories/red_vida/turbio.png'), text: 'Primero cayeron los árboles junto al arroyo. El suelo comenzó a caer al agua. El agua se volvió turbia. Los peces ya no podían respirar.', gradientColors: ['#FFF8E1', '#FFFBF0'] },
      { type: 'content', image: null, text: 'Luego cayeron los árboles donde anidaban los pájaros. Los pájaros se fueron y las plagas se multiplicaron. Las flores comenzaron a marchitarse.', gradientColors: ['#FFF8E1', '#FFFBF0'] },
      { type: 'content', image: require('../../assets/images/stories/red_vida/triste.png'), text: 'Una noche, Tomás se sentó junto a Don Roble y lloró. "Perdóname, viejo amigo," susurró. Don Roble suspiró: "Aún hay esperanza, Tomás. RESTAURAR."', gradientColors: ['#FFF8E1', '#FFFBF0'] },
      { type: 'content', image: require('../../assets/images/stories/red_vida/plantando.png'), text: 'Y así comenzó el trabajo más duro. Cada día plantaba y regaba. Sus manos sangraban, pero no se rindió. El arroyo se aclaró.', gradientColors: ['#FFF8E1', '#FFFBF0'] },
      { type: 'content', image: require('../../assets/images/stories/red_vida/pajaros.png'), text: 'Una mañana de primavera, un petirrojo regresó. Pronto, el aire se llenó de música. Las flores se abrieron. El bosque estaba vivo de nuevo.', gradientColors: ['#FFF8E1', '#FFFBF0'] },
      { type: 'content', image: null, text: 'Tomás trabajó durante años. Ya no era impaciente. Ya no pensaba solo en sí mismo. Enseñaba a otros: "Cuando cuidamos una parte, sanamos el todo."', gradientColors: ['#FFF8E1', '#FFFBF0'] },
      { type: 'final', image: require('../../assets/images/stories/red_vida/viejo.png'), text: 'Tomás, ahora viejo y sabio, sonrió. "Dios lo hizo, pequeña. Yo solo aprendí a no romper las conexiones." "Cada guardián comienza con una semilla." FIN', gradientColors: ['#27AE60', '#2ECC71'] }
    ]
  }
};
export const STORIES_LIST = Object.values(STORIES);
export const getStoryById = (id) => STORIES[id];
export const getStoriesByAgeGroup = (ageGroup) => STORIES_LIST.filter(s => s.ageGroup === ageGroup || s.ageGroup === 'todos');
