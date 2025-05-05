import { BadRequestError } from '@/app/erros/badRequest';
import { ConflictError } from '@/app/erros/conflict';
import { UnauthorizedError } from '@/app/erros/unauthorized';
import { apiBaseUrl } from '@/utils/config';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

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

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const isUnprotectedRoute = unprotectedRoutes.some(route => config.url?.includes(route));
    if (isUnprotectedRoute) {
        console.info(`[request] [${JSON.stringify(config)}]`);
        return config;
    }
    const token = getAuthToken();
    config.headers['Authorization'] = `Bearer ${token}`;
    console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    if (error.name === "CanceledError") {
        return Promise.reject(error);
    }
    console.error(`[response error] [${JSON.stringify(error)}]`);
    const status = error.response?.status;
    switch (status) {
        case 401:
            return Promise.reject(new UnauthorizedError());
        case 409:
            return Promise.reject(new ConflictError(error.response));
        case 400:
            return Promise.reject(new BadRequestError(error.response));
        default:
            return Promise.reject(error);
    }
}
const onResponse = (response: AxiosResponse): AxiosResponse => {
    console.info(`[response] [${JSON.stringify(response)}]`);
    return response;
}

api.interceptors.response.use(onResponse, onResponseError);
api.interceptors.request.use(onRequest, onRequestError);
export default api;
