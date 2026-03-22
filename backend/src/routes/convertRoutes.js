const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { convert, analyzeFile } = require('../controllers/convertController');

router.post('/analyze', upload.single('file'), analyzeFile);
router.post('/convert', upload.single('file'), convert);

module.exports = router;
