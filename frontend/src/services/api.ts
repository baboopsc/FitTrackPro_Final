import axios from 'axios';

const api = axios.create({
  // Vercel'deyken oradaki ayarı kullan, bilgisayarındayken localhost'u kullan
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
});

// Her istekte Token'ı otomatik ekle kanka
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Eğer 401 (Unauthorized) hatası gelirse, oturumu kapat ve logine at
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
