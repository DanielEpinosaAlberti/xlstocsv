const path = require('path');
const fs = require('fs');
const { processExcelToCSV, readExcelHeaders } = require('../services/conversionService');

const DEFAULT_OPTIONS = {
  removeAccents: true,
  normalizeHeaders: true,
  standardizeDates: true,
  normalizeNumbers: true,
  trimLowercase: true,
};

const VALID_RULES = ['removeAccents', 'standardizeDates', 'normalizeNumbers', 'trimLowercase', 'uppercase', 'none'];

const analyzeFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No se proporcionó ningún archivo' });
    }

    const result = readExcelHeaders(req.file.path);
    fs.unlink(req.file.path, () => {});
    res.json({ success: true, ...result, tempFile: req.file.filename });
  } catch (error) {
    if (req.file?.path) fs.unlink(req.file.path, () => {});
    res.status(500).json({ success: false, error: error.message });
  }
};

const convert = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No se proporcionó ningún archivo' });
    }

    let options = { ...DEFAULT_OPTIONS };
    let columnRules = {};

    if (req.body.options) {
      try {
        const parsed = JSON.parse(req.body.options);
        for (const key of Object.keys(DEFAULT_OPTIONS)) {
          if (typeof parsed[key] === 'boolean') {
            options[key] = parsed[key];
          }
        }
      } catch { /* use defaults */ }
    }

    if (req.body.columnRules) {
      try {
        const parsed = JSON.parse(req.body.columnRules);
        for (const [col, rules] of Object.entries(parsed)) {
          if (Array.isArray(rules)) {
            columnRules[col] = rules.filter(r => VALID_RULES.includes(r));
          }
        }
      } catch { /* ignore invalid */ }
    }

    const inputPath = req.file.path;
    const outputFileName = `${path.parse(req.file.originalname).name}_${Date.now()}.csv`;
    const outputPath = path.join(__dirname, '..', '..', 'outputs', outputFileName);

    const { normalizedHeaders, previewRows, totalRows } = await processExcelToCSV(inputPath, outputPath, options, columnRules);

    fs.unlink(inputPath, () => {});

    res.json({
      success: true,
      downloadUrl: `/outputs/${outputFileName}`,
      preview: {
        headers: normalizedHeaders,
        rows: previewRows,
        totalRows
      }
    });
  } catch (error) {
    if (req.file?.path) fs.unlink(req.file.path, () => {});
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { convert, analyzeFile };
