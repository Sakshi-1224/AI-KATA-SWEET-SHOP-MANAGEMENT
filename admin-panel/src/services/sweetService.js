// admin-panel/src/services/sweetService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const sweetService = {
  async getAllSweets(filters = {}) {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    
    const response = await api.get(`/sweets?${params}`);
    return response.data;
  },

  async searchSweets(query) {
    const response = await api.get(`/sweets/search?q=${query}`);
    return response.data;
  },

  async getSweet(id) {
    const response = await api.get(`/sweets/${id}`);
    return response.data;
  },

  async purchaseSweet(id, quantity = 1) {
    const response = await api.post(`/sweets/${id}/purchase`, { quantity });
    return response.data;
  }
};

export default sweetService;