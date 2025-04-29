import { UserService } from "@/users/userSevice";
import { getAuthToken } from "@/utils/auth";
import { Client } from "./types/clientType";

interface FetchClientsOptions {
    signal?: AbortSignal;
    setIsLoading?: (loading: boolean) => void;
    setClientsData?: (clients: Client[]) => void;
}

export class ClientService {
    static async fetchClients({
        signal,
        setIsLoading,
        setClientsData,
    }: FetchClientsOptions): Promise<Client[]> {
        setIsLoading?.(true);
        try {
            const token = getAuthToken();
            if (!token) throw new Error("Token de autenticação não encontrado");


            const res = await UserService.getClients(token, { signal });
            if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);

            const clientsList: Client[] = await res.json();
            setClientsData?.(clientsList);
            return clientsList;
        } catch (error) {
            if (error instanceof Error && error.name !== "AbortError" && (!signal || !signal.aborted)) {
                console.error("Erro ao buscar clientes:", error);
                throw error;
            }
            return [];
        } finally {
            if (!signal?.aborted) {
                setIsLoading?.(false);
            }
        }
    }
}

