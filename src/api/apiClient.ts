import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://channelstats.aiposting.live/api/v1',
  headers: { Accept: 'application/json' },
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data);
    return Promise.reject(
      new Error(error.response?.data?.message || error.response?.data?.detail || 'Произошла ошибка')
    );
  }
);

export default apiClient;
