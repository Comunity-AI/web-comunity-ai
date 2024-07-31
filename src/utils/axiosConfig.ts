// utils/axiosConfig.ts

import axios from 'axios';

// Crea una instancia de Axios
const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configura el interceptor para manejar el refresh token
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Verifica si el error es por un token expirado
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/api/user/refresh-token', { refreshToken });
        const { accessToken } = response.data;

        // Guarda el nuevo access token
        localStorage.setItem('accessToken', accessToken);

        // Reintenta la solicitud original con el nuevo access token
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token', refreshError);
        // Maneja el error de refresco del token
        // Ejemplo: redirigir al usuario a la página de inicio de sesión
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
