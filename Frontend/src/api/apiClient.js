import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dodaj interceptor do logowania requestów (pomocne przy debugowaniu)
apiClient.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

// Dodaj interceptor do logowania odpowiedzi
apiClient.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;