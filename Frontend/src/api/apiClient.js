import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 60000,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor dla requestów - dodawanie tokena oraz usuwanie Content-Type dla plików
apiClient.interceptors.request.use(
  (config) => {
    if (config.url?.includes('/gallery')) {
      delete config.headers['Content-Type'];
    }
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor dla odpowiedzi
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error);
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        message: 'Przekroczono czas oczekiwania na odpowiedź serwera. Spróbuj ponownie.'
      });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
