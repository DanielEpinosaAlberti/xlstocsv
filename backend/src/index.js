const express = require('express');
const cors = require('cors');
const path = require('path');
const convertRoutes = require('./routes/convertRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir archivos de salida
app.use('/outputs', express.static(path.join(__dirname, '..', 'outputs')));

// Rutas API
app.use('/api', convertRoutes);

// Servir frontend compilado
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'dist')));

// Fallback SPA: cualquier ruta no-API devuelve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
