// admin-panel/src/services/adminSweetService.js
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

const adminSweetService = {
  async getAllSweets() {
    const response = await api.get('/sweets');
    return response.data;
  },

  async createSweet(sweetData) {
    const response = await api.post('/sweets', sweetData);
    return response.data;
  },

  async updateSweet(id, sweetData) {
    const response = await api.put(`/sweets/${id}`, sweetData);
    return response.data;
  },

  async deleteSweet(id) {
    const response = await api.delete(`/sweets/${id}`);
    return response.data;
  },

  async restockSweet(id, quantity) {
    const response = await api.post(`/sweets/${id}/restock`, { quantity });
    return response.data;
  }
};

export default adminSweetService;