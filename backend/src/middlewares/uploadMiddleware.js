const multer = require('multer');
const path = require('path');

/**
 * Stores uploaded spreadsheets on disk so they can be analyzed and converted.
 *
 * @type {import('multer').StorageEngine}
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

/**
 * Accepts only spreadsheet files with .xls or .xlsx extensions.
 *
 * @param {import('express').Request} req - Express request.
 * @param {Express.Multer.File} file - Uploaded file metadata.
 * @param {import('multer').FileFilterCallback} cb - Multer callback.
 * @returns {void}
 */
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.xls', '.xlsx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos .xls y .xlsx'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB máximo
});

module.exports = upload;
