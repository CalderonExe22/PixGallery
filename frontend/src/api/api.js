import axios from 'axios';
import dayjs from "dayjs";
import {jwtDecode} from "jwt-decode"; // Asegúrate de que esté bien importado

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Cambia esto por tu BaseURL en producción
});

const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                refresh: refreshToken
            });
            console.log(response.data.access); // Para depuración
            localStorage.setItem('accessToken', response.data.access);
            return response.data.access;
        }
    } catch (refreshError) {
        console.error('Error al refrescar el token:', refreshError); // Cambia a console.error
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        location.href = '/login'; // Redirigir al login
    }
};

const accessTokenIsExpired = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    let tokenDecode;
    try {
        tokenDecode = jwtDecode(token);
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null; // Manejar el error según sea necesario
    }

    const isExpired = dayjs.unix(tokenDecode.exp).diff(dayjs()) < 1;
    console.log('¿El token ha expirado?', isExpired); // Para depuración
    if (isExpired) {
        const newTokenAccess = await refreshToken();
        return newTokenAccess ? newTokenAccess : null;
    }
    return token;
};

api.interceptors.request.use(
    async config => {
        const accessToken = await accessTokenIsExpired();
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default api;