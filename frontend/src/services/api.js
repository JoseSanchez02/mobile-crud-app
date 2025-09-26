import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  config => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  },
);

export const recordsAPI = {
  // Get all records
  getAll: () => api.get('/records'),
  
  // Get single record
  getById: (id) => api.get(`/records/${id}`),
  
  // Create new record
  create: (formData) => api.post('/records', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  
  // Update record
  update: (id, formData) => api.post(`/records/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  
  // Delete record
  delete: (id) => api.delete(`/records/${id}`),
};

export default api;
