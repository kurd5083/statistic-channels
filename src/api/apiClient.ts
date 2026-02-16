import axios, { type AxiosResponse, type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: 'https://channelstats.aiposting.live/api/v1',
  headers: { Accept: 'application/json' },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  config.headers = config.headers ?? {};
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data);
    return Promise.reject(
      new Error(
        (error.response?.data as any)?.message ||
        (error.response?.data as any)?.detail ||
        'Произошла ошибка'
      )
    );
  }
);

export default apiClient;
