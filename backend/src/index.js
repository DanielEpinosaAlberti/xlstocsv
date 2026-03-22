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

// Rutas
app.use('/api', convertRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
