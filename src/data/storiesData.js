
// src/data/storiesData.js - 100% INTEGRIDAD CON IMÁGENES REALES

export const STORIES = {

  secreto_bosque: {

    id: 'secreto_bosque',

    title: 'El Secreto del Bosque Olvidado',

    subtitle: 'Aventura 1: La Red de la Vida',

    author: 'De Futura Edition's',

    cover: require('../../assets/images/stories/red_vida/portada_cuento.jpeg'),

    ageGroup: 'todos', 

    duration: '10-12 min',

    theme: 'Interdependencia',

    pages: [

      { type: 'cover', image: require('../../assets/images/stories/red_vida/portada_cuento.jpeg'), text: '', gradientColors: ['#27AE60', '#2ECC71'] },

      { type: 'content', image: require('../../assets/images/stories/red_vida/bosquebonito.png'), text: 'Había una vez un bosque tan hermoso que los pájaros lo llamaban "El Jardín del Creador". Cada árbol conocía su lugar. Cada flor sabía cuándo abrir sus pétalos. Las abejas zumbaban canciones mientras trabajaban, y el viento llevaba historias de rama en rama.', gradientColors: ['#FFF8E1', '#FFFBF0'] },

      { type: 'content', image: require('../../assets/images/stories/red_vida/don_roble1.png'), text: 'En el corazón del bosque vivía Don Roble, el árbol más antiguo. Sus raíces eran tan profundas que tocaban las aguas subterráneas, y sus ramas tan altas que acariciaban las nubes. Don Roble no era solo un árbol; era el guardián de un secreto maravilloso.', gradientColors: ['#FFF8E1', '#FFFBF0'] },

      { type: 'content', image: null, text: 'Cada mañana, cuando el sol despertaba, Don Roble contaba el secreto a quien quisiera escuchar: "Nada en este bosque vive solo." Y era verdad. El sol daba luz a las plantas. Las plantas daban oxígeno a los animales. Los animales esparcían semillas. Las semillas se convertían en nuevos árboles.', gradientColors: ['#FFF8E1', '#FFFBF0'] },

      { type: 'content', image: require('../../assets/images/stories/red_vida/tomas.png'), text: 'Pero un día, llegó al bosque un hombre llamado Tomás el Impaciente. Tomás miró el bosque y no vio el secreto. Solo vio oportunidades para sí mismo. "¡Cuánta madera! Puedo vender estos árboles y hacerme rico," pensó.', gradientColors: ['#FFF8E1', '#FFFBF0'] },

      { type: 'content', image: require('../../assets/images/stories/red_vida/turbio.png'), text: 'Primero cayeron los árboles junto al arroyo. Pero sin las raíces que sostenían la tierra, el suelo comenzó a caer al arroyo. El agua se volvió turbia. Los peces no podían respirar en agua sucia. Pronto, ya no quedaban peces.', gradientColors: ['#FFF8E1', '#FFFBF0'] },

      { type: 'content', image: null, text: 'Luego cayeron los árboles donde anidaban los pájaros. Pero los pájaros se fueron. Y cuando se fueron los pájaros, nadie comió los insectos que dañaban las plantas. Las plagas se multiplicaron. Las flores comenzaron a marchitarse. El bosque empezó a morir.', gradientColors: ['#FFF8E1', '#FFFBF0'] },

      { type: 'content', image: require('../../assets/images/stories/red_vida/triste.png'), text: 'Una noche, Tomás se sentó junto a Don Roble y lloró. "Perdóname, viejo amigo," susurró. "No entendí. Pensé que podía tomar sin consecuencias." Don Roble suspiró: "Aún hay esperanza, Tomás. Pero ahora debes RESTAURAR."', gradientColors: ['#FFF8E1', '#FFFBF0'] },

      { type: 'content', image: require('../../assets/images/stories/red_vida/plantando.png'), text: 'Y así comenzó el trabajo más duro. Cada día plantaba y regaba. Sus manos sangraban. Su espalda dolía. Pero no se rindió. Lentamente, las raíces comenzaron a sostener el suelo de nuevo. El arroyo se aclaró.', gradientColors: ['#FFF8E1', '#FFFBF0'] },

      { type: 'content', image: require('../../assets/images/stories/red_vida/pajaros.png'), text: 'Una mañana de primavera, escuchó un canto. Un petirrojo había regresado. Pronto, el aire se llenó de música otra vez. Los pájaros comieron los insectos. Las plantas sanaron. Las flores se abrieron. El bosque estaba vivo de nuevo.', gradientColors: ['#FFF8E1', '#FFFBF0'] },

      { type: 'content', image: null, text: 'Tomás trabajó durante años. Pasaron diez años. El bosque no era el mismo de antes, pero estaba vivo. Y Tomás había cambiado también. Ya no era impaciente. Ya no pensaba solo en sí mismo. Enseñaba a otros el secreto: "Cuando cuidamos una parte, sanamos el todo."', gradientColors: ['#FFF8E1', '#FFFBF0'] },

      { type: 'final', image: require('../../assets/images/stories/red_vida/viejo.png'), text: 'Tomás, ahora viejo y sabio, sonrió. "Dios lo hizo, pequeña. Él diseñó cada conexión. Yo solo aprendí a no romperlas." "¿Puedo ayudar también?", preguntó la niña. "Por supuesto," dijo Tomás dándole una semilla. "Cada guardián comienza con una semilla." FIN', gradientColors: ['#27AE60', '#2ECC71'] },

    ],

  },

};

export const STORIES_LIST = Object.values(STORIES);

export const getStoryById = (id) => STORIES[id];

export const getStoriesByAgeGroup = (ageGroup) => STORIES_LIST.filter(s => s.ageGroup === ageGroup || s.ageGroup === 'todos');

