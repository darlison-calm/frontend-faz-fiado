import { UnauthorizedError } from '@/app/erros/unauthorized';
import { apiBaseUrl } from '@/utils/config';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const unprotectedRoutes = ["/users/auth", "/users/registration"];
const getAuthToken = () => {
    const tokenData = localStorage.getItem('token');
    if (!tokenData) return null;
    return JSON.parse(tokenData);
}


const api = axios.create({
    baseURL: `${apiBaseUrl}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const isUnprotectedRoute = unprotectedRoutes.some(route => config.url?.includes(route));
        console.log(isUnprotectedRoute)
        if (isUnprotectedRoute) {
            return config;
        }
        const token = getAuthToken();
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;

    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            return Promise.reject(new UnauthorizedError());
        }
        return Promise.reject(error);
    }
);

export default api;
