import { useCallback, useEffect, useState } from "react";
import { Client, ClientFormData } from "../../../types/clientType";
import { deleteClient, loadClients, saveClient, updateClient } from "../services/clientService";
import { UnauthorizedError } from "@/app/erros/unauthorized";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function getClients(signal: AbortSignal) {
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
            toast.error("Erro ao buscar clientes")
        } finally {
            setIsLoading(false);
        }
    }

    const createClient = useCallback(async (data: ClientFormData) => {
        try {
            const newClient = await saveClient(data);
            setClients((prev) => [...prev, newClient]);
            toast.success("Cliente criado");
            return newClient;
        } catch (err: any) {
            toast.error("Erro ao criar cliente")
            throw err;
        }
    }, []);

    const removeClient = useCallback(async (id: number) => {
        try {
            await deleteClient(id);
            setClients((prev) => prev.filter((c) => c.id !== id));
            setError(null);
            toast.success("Cliente deletado");
        } catch (err: any) {
            toast.error("Erro ao remover cliente")
        }
    }, []);

    const editClient = useCallback(async (id: number, clientData: ClientFormData) => {
        try {
            const clientUpdated = await updateClient(id, clientData)
            setClients((prevClients) =>
                prevClients.map((client) =>
                    client.id === id ? { ...client, ...clientUpdated } : client
                )
            );
            toast.success("Cliente editado")
        } catch (err: any) {
            toast.error("Erro ao editar cliente")
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        getClients(signal);
        return () => {
            controller.abort()
        }
    }, []);

    const goToClientDetailsPage = (id: number) => {
        router.push(`/clients/${id}`)
    }

    return {
        clients,
        isLoading,
        error,
        createClient,
        removeClient,
        getClients,
        editClient,
        goToClientDetailsPage
    };
}
