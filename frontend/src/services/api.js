import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export const analyzeFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};

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
