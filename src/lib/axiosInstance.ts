

import { UnauthorizedError } from '@/app/erros/unauthorized';
import { getAuthToken } from '@/utils/auth';
import { apiBaseUrl } from '@/utils/config';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const unprotectedRoutes = ['/users/auth', '/users/registration'];

const api = axios.create({
    baseURL: `${apiBaseUrl}`, // Substitua pela sua URL base
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const isUnprotectedRoute = unprotectedRoutes.some(route => config.url?.includes(route));

        if (!isUnprotectedRoute) {
            const token = getAuthToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }

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
        if (error.response?.status === 401 || error.response?.status === 403) {
            return Promise.reject(new UnauthorizedError());
        }
        return Promise.reject(error);
    }
);

export default api;
