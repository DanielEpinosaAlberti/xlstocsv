/**
 * Normaliza un encabezado: quita tildes, espacios → _, lowercase
 */
const normalizeHeader = (header) => {
  return removeAccents(String(header))
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
};

/**
 * Normaliza un valor de celda según las opciones seleccionadas
 */
const normalizeValue = (value, options = {}) => {
  if (value === null || value === undefined || value === '') return '';

  if (typeof value === 'number') return value;

  let str = String(value).trim();

  // Estandarizar fechas
  if (options.standardizeDates) {
    const datePatterns = [
      /^(\d{2})\/(\d{2})\/(\d{4})$/,
      /^(\d{2})-(\d{2})-(\d{4})$/
    ];
    for (const pattern of datePatterns) {
      const match = str.match(pattern);
      if (match) {
        return `${match[3]}-${match[2]}-${match[1]}`;
      }
    }
  }

  // Normalizar números formato español
  if (options.normalizeNumbers && /^\d{1,3}(\.\d{3})*(,\d+)?$/.test(str)) {
    return str.replace(/\./g, '').replace(',', '.');
  }

  // Quitar tildes
  if (options.removeAccents) {
    str = removeAccents(str);
  }

  // Trim + lowercase
  if (options.trimLowercase) {
    str = str.toLowerCase().trim();
  }

  return str;
};

/**
 * Aplica reglas específicas de columna a un valor
 */
const applyColumnRules = (value, rules) => {
  if (value === null || value === undefined || value === '') return '';

  if (!rules || rules.length === 0 || rules.includes('none')) {
    return typeof value === 'number' ? value : String(value).trim();
  }

  if (typeof value === 'number' && !rules.includes('standardizeDates')) return value;

  let str = String(value).trim();

  if (rules.includes('standardizeDates')) {
    const datePatterns = [
      /^(\d{2})\/(\d{2})\/(\d{4})$/,
      /^(\d{2})-(\d{2})-(\d{4})$/
    ];
    for (const pattern of datePatterns) {
      const match = str.match(pattern);
      if (match) {
        return `${match[3]}-${match[2]}-${match[1]}`;
      }
    }
  }

  if (rules.includes('normalizeNumbers') && /^\d{1,3}(\.\d{3})*(,\d+)?$/.test(str)) {
    return str.replace(/\./g, '').replace(',', '.');
  }

  if (rules.includes('removeAccents')) {
    str = removeAccents(str);
  }

  if (rules.includes('trimLowercase')) {
    str = str.toLowerCase().trim();
  }

  if (rules.includes('uppercase')) {
    str = str.toUpperCase().trim();
  }

  return str;
};

/**
 * Elimina tildes/acentos de un string
 */
const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

module.exports = { normalizeHeader, normalizeValue, applyColumnRules, removeAccents };

module.exports = { normalizeHeader, normalizeValue, removeAccents };
