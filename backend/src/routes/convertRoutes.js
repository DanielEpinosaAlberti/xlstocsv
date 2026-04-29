const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { convert, analyzeFile } = require('../controllers/convertController');

/**
 * Registers the spreadsheet analysis and conversion endpoints.
 *
 * @type {import('express').Router}
 */
router.post('/analyze', upload.single('file'), analyzeFile);
router.post('/convert', upload.single('file'), convert);

module.exports = router;
