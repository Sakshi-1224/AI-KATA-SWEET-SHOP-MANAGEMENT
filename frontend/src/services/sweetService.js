// frontend/src/services/sweetService.js
import api from './api';

const sweetService = {
  async getAllSweets(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });
      
      const response = await api.get(`/sweets?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sweets:', error);
      throw error;
    }
  },

  async searchSweets(query) {
    try {
      const response = await api.get(`/sweets/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching sweets:', error);
      throw error;
    }
  },

  async getSweet(id) {
    try {
      const response = await api.get(`/sweets/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sweet:', error);
      throw error;
    }
  },

  async purchaseSweet(id, quantity = 1) {
    try {
      const response = await api.post(`/sweets/${id}/purchase`, { quantity });
      return response.data;
    } catch (error) {
      console.error('Error purchasing sweet:', error);
      throw error;
    }
  }
};

export default sweetService;