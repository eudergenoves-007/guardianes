# 🌱 Guardianes del Jardín - App Móvil

Aplicación móvil para el material educativo "Guardianes del Jardín" - Un programa de 6 días basado en filosofía reformacional para niños de 3-17 años.

## 📱 Características

- ✨ **Interfaz atractiva para niños** con animaciones y colores vibrantes
- 📚 **6 Aventuras educativas** organizadas por grupos de edad
- 🎵 **Reproductor de audio** integrado para historias y canciones
- 📖 **Visor de PDFs** para guías y cuadernos
- 🏆 **Sistema de gamificación** con logros y progreso
- 👶👧🧒🧑 **4 grupos de edad** (Párvulos, Principiantes, Primarios, Intermedios)
- 📱 **Funciona en iOS y Android**

## 🚀 Instalación

### Prerrequisitos

1. **Node.js** (versión 14 o superior)
   - Descarga desde: https://nodejs.org/

2. **Visual Studio Code** (recomendado)
   - Descarga desde: https://code.visualstudio.com/

3. **Expo CLI** (opcional, pero recomendado)
   ```bash
   npm install -g expo-cli
   ```

### Pasos de Instalación

1. **Abre la carpeta del proyecto en VS Code**
   ```bash
   cd guardianes-app
   code .
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Instala Expo Go en tu celular**
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

4. **Inicia el proyecto**
   ```bash
   npm start
   ```
   
   O si instalaste Expo CLI:
   ```bash
   expo start
   ```

5. **Escanea el código QR**
   - iOS: Usa la cámara del iPhone
   - Android: Usa la app Expo Go

## 📂 Estructura del Proyecto

```
guardianes-app/
├── App.js                      # Navegación principal
├── app.json                    # Configuración de Expo
├── package.json                # Dependencias
├── src/
│   ├── screens/               # Pantallas de la app
│   │   ├── SplashScreen.js   # Pantalla de carga animada
│   │   ├── HomeScreen.js     # Inicio con acciones rápidas
│   │   ├── AdventuresScreen.js  # Lista de 6 aventuras
│   │   ├── AdventureDetailScreen.js  # Detalle de aventura
│   │   ├── AgeGroupScreen.js      # Selección de edad
│   │   ├── MaterialViewerScreen.js  # Visor de PDFs
│   │   ├── AudioPlayerScreen.js    # Reproductor de audio
│   │   ├── ProgressScreen.js      # Progreso y gamificación
│   │   └── ProfileScreen.js       # Perfil del usuario
│   ├── components/            # Componentes reutilizables (futuro)
│   ├── data/
│   │   └── adventuresData.js  # Datos de aventuras y materiales
│   └── utils/                 # Utilidades (futuro)
└── assets/                    # Imágenes, iconos, etc.
```

## 🎨 Personalización

### Colores Principales

Los colores se definen en cada pantalla. Para cambiarlos globalmente:

- **Verde principal**: `#27AE60`
- **Verde claro**: `#2ECC71`
- **Azul**: `#3498DB`
- **Naranja**: `#F39C12`
- **Morado**: `#9B59B6`

### Agregar Nuevas Aventuras

Edita `src/data/adventuresData.js`:

```javascript
export const ADVENTURES_DATA = {
  // ... aventuras existentes
  7: {
    id: 7,
    title: 'Nueva Aventura',
    subtitle: 'Subtítulo',
    description: 'Descripción...',
    icon: '🌟',
    color: '#E74C3C',
    // ...
  }
};
```

## 📦 Agregar Materiales (PDFs, Audios)

### Opción 1: Archivos Locales

1. Crea carpeta `assets/materials/`:
   ```
   assets/
   └── materials/
       ├── pdfs/
       │   └── aventura_1_parvulos_guia.pdf
       └── audio/
           └── amigos_del_bosque.mp3
   ```

2. Actualiza las rutas en `adventuresData.js`:
   ```javascript
   materials: [
     {
       type: 'guide',
       title: 'Guía del Maestro',
       file: require('../../assets/materials/pdfs/aventura_1_parvulos_guia.pdf'),
     }
   ]
   ```

### Opción 2: URLs Remotas (Recomendado para producción)

```javascript
materials: [
  {
    type: 'guide',
    title: 'Guía del Maestro',
    url: 'https://tuservidor.com/materiales/aventura_1_guia.pdf',
  }
]
```

## 🔧 Funcionalidades Pendientes de Implementar

### 1. Reproductor de Audio Real

Instala expo-av:
```bash
npx expo install expo-av
```

Ejemplo de implementación en `AudioPlayerScreen.js`:
```javascript
import { Audio } from 'expo-av';

const [sound, setSound] = useState();

async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
    require('./path/to/audio.mp3')
  );
  setSound(sound);
  await sound.playAsync();
}
```

### 2. Visor de PDFs

Instala react-native-pdf:
```bash
npm install react-native-pdf
```

Ejemplo en `MaterialViewerScreen.js`:
```javascript
import Pdf from 'react-native-pdf';

<Pdf
  source={{ uri: pdfUrl }}
  style={styles.pdf}
/>
```

### 3. Sistema de Usuarios

- Integrar autenticación (Firebase, Supabase, etc.)
- Guardar progreso en la nube
- Sincronización entre dispositivos

### 4. Gamificación Avanzada

- [ ] Sistema de puntos por completar actividades
- [ ] Badges/insignias desbloqueables
- [ ] Tabla de clasificación
- [ ] Recompensas diarias
- [ ] Avatar personalizable

### 5. Modo Offline

- Descargar materiales para uso sin internet
- Sincronizar cuando haya conexión

## 🎯 Siguientes Pasos Recomendados

1. **Agregar tus PDFs y audios reales** a la carpeta `assets/`
2. **Implementar el reproductor de audio** con expo-av
3. **Implementar el visor de PDFs** con react-native-pdf
4. **Diseñar iconos y splash screen** personalizados
5. **Agregar autenticación de usuarios**
6. **Implementar sistema de puntos real**
7. **Crear backend** para guardar progreso (Firebase/Supabase)

## 🐛 Solución de Problemas

### Error: "Unable to resolve module"
```bash
# Limpia cache y reinstala
rm -rf node_modules
npm install
npx expo start -c
```

### La app no carga en el celular
- Asegúrate de estar en la misma red WiFi
- Revisa que no haya firewall bloqueando
- Intenta con conexión USB usando `expo start --tunnel`

### Gradientes no funcionan
```bash
npx expo install expo-linear-gradient
```

## 📱 Compilar para Producción

### Android (APK)
```bash
eas build -p android --profile preview
```

### iOS (IPA)
```bash
eas build -p ios --profile preview
```

Necesitarás una cuenta de Expo: https://expo.dev/signup

## 🤝 Contribuir

Ideas para mejorar la app:

- [ ] Modo oscuro
- [ ] Soporte para múltiples idiomas
- [ ] Compartir progreso en redes sociales
- [ ] Notificaciones de recordatorio
- [ ] Modo padres/maestros vs. niños
- [ ] Mini juegos educativos
- [ ] Realidad aumentada para explorar el "jardín"

## 📄 Licencia

Este proyecto es parte del material educativo "Guardianes del Jardín".

## 📞 Soporte

Para preguntas o problemas, contacta a: [tu email]

---

## 🎨 Capturas de Pantalla

La app incluye:
- ✨ Splash screen animado con gradiente verde
- 🏠 Pantalla de inicio con acciones rápidas
- 📚 Lista de 6 aventuras con progreso visual
- 👶 Selector de grupos de edad colorido
- 📖 Detalle de aventura con materiales
- 🎵 Reproductor de audio estilo Spotify
- 🏆 Pantalla de progreso con logros y rachas
- 👤 Perfil de usuario personalizable

---

**¡Disfruta creando una experiencia increíble para los Guardianes del Jardín! 🌱**
