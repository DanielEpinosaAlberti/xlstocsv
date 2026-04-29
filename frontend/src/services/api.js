import axios from 'axios';

/**
 * Shared Axios client configured for the backend API.
 *
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: '/api'
});

/**
 * Uploads a spreadsheet to the analysis endpoint.
 *
 * @async
 * @param {File} file - Spreadsheet file selected by the user.
 * @returns {Promise<object>} Analysis payload returned by the backend.
 */
export const analyzeFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};

/**
 * Uploads a spreadsheet and conversion options to generate a normalized CSV.
 *
 * @async
 * @param {File} file - Spreadsheet file selected by the user.
 * @param {object} options - Global normalization options.
 * @param {object} columnRules - Per-column rules.
 * @returns {Promise<object>} Conversion payload returned by the backend.
 */
export const uploadFile = async (file, options = {}, columnRules = {}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('options', JSON.stringify(options));
  formData.append('columnRules', JSON.stringify(columnRules));

  const response = await api.post('/convert', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};
