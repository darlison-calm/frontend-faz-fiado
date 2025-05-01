import { Client, CreateClientData } from "../types/clientType";
import api from "@/lib/axiosInstance";

export async function loadClients(signal: AbortSignal): Promise<Client[]> {
    try {
        const response = await api.get("/users/clients", { signal });
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
}

export async function saveClient(data: CreateClientData): Promise<Client> {
    const response = await api.post("/users/clients", data);
    return response.data;
}

export async function updateClient(
    id: number,
    data: CreateClientData
): Promise<Client> {
    const response = await api.put(`/users/clients/${id}`, data);
    return response.data;
}

export async function deleteClient(id: string): Promise<void> {
    await api.delete(`/users/clients/${id}`);
}

