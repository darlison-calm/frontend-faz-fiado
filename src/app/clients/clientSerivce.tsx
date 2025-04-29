import { Client } from "./types/clientType";
import api from "@/lib/axiosInstance";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface FetchClientsOptions {
    signal?: AbortSignal;
    router: AppRouterInstance;
}

export async function fetchClients({
    signal, router
}: FetchClientsOptions): Promise<Client[]> {
    try {
        const response = await api.get('/users/clients', {
            signal,
        });
        return response.data;
    } catch (error: any) {
        if (error.name === 'UnauthorizedError') {
            router.push("/signin");
            return [];
        }
        throw new Error("Falha ao buscar clientes.");
    }
}
