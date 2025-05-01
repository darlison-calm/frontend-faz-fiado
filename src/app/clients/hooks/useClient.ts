import { useEffect, useState } from "react";
import { Client, CreateClientData } from "../types/clientType";
import { deleteClient, loadClients, saveClient } from "../services/clientService";
import { UnauthorizedError } from "@/app/erros/unauthorized";
import { useRouter } from "next/navigation";

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function fetchData(signal: AbortSignal) {
        try {
            setIsLoading(true);
            const data = await loadClients(signal);
            setClients(data);
        } catch (err: any) {
            if (err.name === "CanceledError") {
                return
            }
            if (err instanceof UnauthorizedError) {
                router.push("/signin")
                return;
            }

            setError("Erro ao buscar clientes")
        } finally {
            setIsLoading(false);
        }
    }

    async function createClient(data: CreateClientData) {
        try {
            const newClient = await saveClient(data);
            setClients((prev) => [...prev, newClient]);
            setError(null);
            return newClient;
        } catch (err: any) {
            setError("Erro ao criar cliente");
            throw err;
        }
    }

    async function removeClient(id: string) {
        try {
            await deleteClient(id);
            setClients((prev) => prev.filter((c) => c.id !== id));
            setError(null);
        } catch (err: any) {
            setError("Erro ao criar cliente");
            throw err;
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;

        fetchData(signal);

        return () => {
            controller.abort()
        }
    }, []);

    return {
        clients,
        isLoading,
        error,
        createClient,
        removeClient
    };
}
