# 🚀 INICIO RÁPIDO - Guardianes del Jardín App

## ⚡ En 5 Minutos

### Paso 1: Instalar Node.js
1. Ve a https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Instala siguiendo el asistente

### Paso 2: Abrir en VS Code
1. Abre Visual Studio Code
2. File → Open Folder → Selecciona la carpeta `guardianes-app`
3. Abre la terminal integrada: View → Terminal (o Ctrl + `)

### Paso 3: Instalar Dependencias
```bash
npm install
```
⏱️ Esto tomará 2-3 minutos la primera vez

### Paso 4: Iniciar la App
```bash
npm start
```

Verás algo así:
```
› Metro waiting on exp://192.168.1.5:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

### Paso 5: Ver en tu Celular

**Opción A: Con tu celular (RECOMENDADO)**
1. Descarga "Expo Go" en tu celular:
   - iOS: App Store → busca "Expo Go"
   - Android: Play Store → busca "Expo Go"
2. Asegúrate de estar en la misma WiFi que tu computadora
3. Escanea el código QR:
   - iOS: Usa la cámara normal
   - Android: Abre Expo Go y usa el escáner

**Opción B: En tu computadora (más lento)**
```bash
npm start
```
Luego presiona `w` para abrir en el navegador

## 📁 Archivos Importantes

```
guardianes-app/
├── App.js                    ← NAVEGACIÓN PRINCIPAL
├── src/
│   ├── screens/             ← TODAS LAS PANTALLAS
│   │   ├── HomeScreen.js    ← Pantalla de inicio
│   │   └── ...
│   └── data/
│       └── adventuresData.js ← DATOS DE AVENTURAS (edita aquí)
```

## 🎨 Personalizar la App

### Cambiar Colores
Busca en cada archivo `.js` donde dice:
```javascript
colors: ['#27AE60', '#2ECC71']  // Verde
```

Cambia por tus colores favoritos:
```javascript
colors: ['#E74C3C', '#EC7063']  // Rojo
colors: ['#3498DB', '#5DADE2']  // Azul
```

### Agregar una Nueva Aventura
Edita `src/data/adventuresData.js`:
```javascript
7: {
  id: 7,
  title: 'Mi Nueva Aventura',
  subtitle: 'Un subtítulo cool',
  icon: '🌟',
  color: '#E74C3C',
  // ...
}
```

## 🐛 Problemas Comunes

### "npm no se reconoce como comando"
→ No instalaste Node.js. Ve al Paso 1.

### "Unable to resolve module"
```bash
rm -rf node_modules
npm install
npm start
```

### No puedo ver la app en mi celular
- ✅ Ambos en la misma WiFi?
- ✅ El firewall permite conexiones?
- ✅ Instalaste Expo Go?

Solución alternativa:
```bash
npm start -- --tunnel
```

### Quiero agregar mis PDFs
1. Crea carpeta: `assets/materials/pdfs/`
2. Copia tus PDFs ahí
3. Edita `src/data/adventuresData.js` para referenciarlos

## 📱 Próximos Pasos

1. ✅ Inicia la app y explora
2. 📝 Edita `adventuresData.js` con tus datos reales
3. 🎨 Personaliza colores y textos
4. 📄 Agrega tus PDFs a `assets/materials/`
5. 🎵 Implementa el reproductor de audio (ver README.md)

## 💡 Tips

- **Recarga rápida**: Agita tu celular y presiona "Reload"
- **Ver errores**: Agita → "Debug Remote JS" → Abre Chrome DevTools
- **Cambios no aparecen**: Guarda el archivo (Ctrl+S) y espera 1 segundo

## 🎯 Comandos Útiles

```bash
# Iniciar app
npm start

# Limpiar caché
npm start -- --clear

# Ver en navegador
npm start
# (luego presiona 'w')

# Iniciar con túnel (si WiFi no funciona)
npm start -- --tunnel
```

## 📞 Necesitas Ayuda?

1. Lee el README.md completo
2. Busca el error en Google
3. Pregunta en los foros de Expo: https://forums.expo.dev/

---

## 🎉 ¡Listo!

Tu app debería estar corriendo en tu celular mostrando:
- Splash screen con gradiente verde y animaciones
- Pantalla de inicio con 4 acciones rápidas
- Lista de 6 aventuras
- Sistema de progreso con logros

**¡Ahora personalízala con tu contenido! 🌱**
