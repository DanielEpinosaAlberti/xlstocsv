const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
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

// Cleanup: delete output files older than 10 minutes, runs every 5 minutes
const OUTPUTS_DIR = path.join(__dirname, '..', 'outputs');
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
const MAX_AGE_MS = 10 * 60 * 1000;

/**
 * Removes files older than the configured retention window from a directory.
 *
 * @param {string} dir - Absolute directory path to clean.
 * @returns {void}
 */
function cleanupDir(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) return;
    const now = Date.now();
    for (const file of files) {
      if (file === '.gitkeep') continue;
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;
        if (now - stats.mtimeMs > MAX_AGE_MS) {
          fs.unlink(filePath, () => {});
        }
      });
    }
  });
}

setInterval(() => {
  cleanupDir(OUTPUTS_DIR);
  cleanupDir(UPLOADS_DIR);
}, 5 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
