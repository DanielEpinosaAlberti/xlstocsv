const XLSX = require('xlsx');
const { createObjectCsvWriter } = require('csv-writer');
const { normalizeHeader, normalizeValue, applyColumnRules } = require('../utils/normalizer');

const readExcelHeaders = (inputPath) => {
  const workbook = XLSX.readFile(inputPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rawData = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  if (rawData.length === 0) {
    throw new Error('El archivo Excel está vacío');
  }

  const headers = Object.keys(rawData[0]);
  const sampleRows = rawData.slice(0, 5).map(row => {
    const obj = {};
    headers.forEach(h => { obj[h] = row[h]; });
    return obj;
  });

  return { headers, sampleRows, totalRows: rawData.length };
};

const processExcelToCSV = async (inputPath, outputPath, options = {}, columnRules = {}) => {
  const workbook = XLSX.readFile(inputPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rawData = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  if (rawData.length === 0) {
    throw new Error('El archivo Excel está vacío');
  }

  const originalHeaders = Object.keys(rawData[0]);
  const headerMap = {};
  originalHeaders.forEach(h => {
    headerMap[h] = options.normalizeHeaders ? normalizeHeader(h) : h;
  });

  const csvHeaders = originalHeaders.map(h => ({
    id: headerMap[h],
    title: headerMap[h]
  }));

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: csvHeaders
  });

  const hasColumnRules = Object.keys(columnRules).length > 0;

  const processedData = rawData.map(row => {
    const newRow = {};
    originalHeaders.forEach(h => {
      if (hasColumnRules && columnRules[h]) {
        newRow[headerMap[h]] = applyColumnRules(row[h], columnRules[h]);
      } else {
        newRow[headerMap[h]] = normalizeValue(row[h], options);
      }
    });
    return newRow;
  });

  await csvWriter.writeRecords(processedData);

  const normalizedHeaders = originalHeaders.map(h => headerMap[h]);
  const previewRows = processedData.slice(0, 10);

  return { outputPath, normalizedHeaders, previewRows, totalRows: processedData.length };
};

module.exports = { processExcelToCSV, readExcelHeaders };
