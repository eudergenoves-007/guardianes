const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde la carpeta 'dist' que genera Expo
app.use(express.static(path.join(__dirname, '../dist')));

// Configurar Header correcto para el manifest
app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/manifest.json'));
});

// Redirigir todas las demás rutas a index.html (SPA Fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor Futura Editions iniciado en puerto ' + PORT);
});
