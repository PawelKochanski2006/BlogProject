import apiClient from '../api/apiClient';

export const authAPI = {
  login: async credentials => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Wystąpił błąd podczas logowania',
      };
    }
  },

  register: async userData => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Wystąpił błąd podczas rejestracji',
      };
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message,
      };
    }
  },
};
