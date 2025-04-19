import { apiBaseUrl } from "@/utils/config"

export const apiFetch = async (endPoint, options) => {
    const response = await fetch(`${apiBaseUrl}${endPoint}`, {
        headers: {
            'Content-type': "application/json",
            ...options.headers
        },
        ...options
    })
    return response;
}