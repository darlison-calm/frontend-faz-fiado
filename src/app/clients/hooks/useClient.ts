import { useCallback, useState } from "react";
import { Client, ClientFormData } from "../../../types/clientType";
import { deleteClient, loadClients, saveClient, updateClient } from "../services/clientService";
import { UnauthorizedError } from "@/app/erros/unauthorized";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * Hook para gerenciar lista de clientes, operações de CRUD, navegação e notificações via toast.
 *
 * @remarks
 * - Carrega a lista de clientes com `getClients(signal)` e exibe toast de erro em falhas.
 * - Cria, remove e edita clientes, exibindo toast de sucesso ou erro em cada ação.
 * - Redireciona para `/signin` em caso de `UnauthorizedError`.
 * - Dispara toast de feedback para operações
 * @returns Um objeto contendo:
 * - `clients`: array de clientes carregados.
 * - `isLoading`: flag de carregamento.
 * - `getClients(signal)`: carrega clientes do servidor.
 * - `createClient(data)`: cria novo cliente.
 * - `removeClient(id)`: deleta cliente existente.
 * - `editClient(id, data)`: edita cliente existente.
 * - `goToClientDetailsPage(id)`: navega para página de detalhes do cliente.
 */
export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    /**
  * Carrega a lista de clientes do servidor.
  *
  * @param signal - Sinal de abort para a requisição.
  * @throws `UnauthorizedError` se o usuário não estiver autenticado (redireciona para `/signin`).
  * @toast error - "Erro ao buscar clientes" caso ocorra qualquer outro erro.
  */
    const getClients = useCallback(async (signal: AbortSignal) => {
        try {
            setIsLoading(true);
            const data = await loadClients(signal);
            setClients(data);
        } catch (err) {
            if (err instanceof Error && err.name === "CanceledError") return;
            if (err instanceof UnauthorizedError) {
                router.push("/signin");
                return;
            }
            toast.error("Erro ao buscar clientes");
        } finally {
            setIsLoading(false);
        }
    }, [router]);


    /**
     * Cria um novo cliente.
     *
     * @param data - Dados do cliente a serem salvos.
     * @returns O cliente criado.
     * @throws Erro se a operação falhar.
     * @toast success - Exibe "Cliente criado" quando a criação é bem-sucedida.
     * @toast error - Exibe "Erro ao criar cliente" em caso de falha.
     */
    async function createClient(data: ClientFormData): Promise<Client | void> {
        try {
            const newClient = await saveClient(data);
            setClients((prev) => [...prev, newClient]);
            toast.success("Cliente criado");
            return newClient;
        } catch {
            toast.error("Erro ao criar cliente");
        }
    }

    /**
     * Remove um cliente existente.
     *
     * @param id - ID do cliente a ser deletado.
     * @toast success - Exibe "Cliente deletado" quando a remoção é bem-sucedida.
     * @toast error - Exibe "Erro ao remover cliente" em caso de falha.
     */
    async function removeClient(id: number): Promise<void> {
        try {
            await deleteClient(id);
            setClients((prev) => prev.filter((c) => c.id !== id));
            toast.success("Cliente deletado");
        } catch {
            toast.error("Erro ao remover cliente");
        }
    }

    /**
     * Atualiza os dados de um cliente existente.
     *
     * @param id - ID do cliente a ser editado.
     * @param clientData - Novos dados do cliente.
     * @toast success - Exibe "Cliente editado" quando a atualização é bem-sucedida.
     * @toast error - Exibe "Erro ao editar cliente" em caso de falha.
     */
    async function editClient(id: number, clientData: ClientFormData): Promise<void> {
        try {
            const clientUpdated = await updateClient(id, clientData);
            setClients((prev) =>
                prev.map((client) =>
                    client.id === id ? { ...client, ...clientUpdated } : client
                )
            );
            toast.success("Cliente editado");
        } catch {
            toast.error("Erro ao editar cliente");
        }
    }

    /**
     * Navega para a página de detalhes de um cliente.
     *
     * @param id - ID do cliente.
     */
    const goToClientDetailsPage = (id: number): void => {
        router.push(`/clients/${id}`);
    }


    return {
        clients,
        isLoading,
        getClients,
        createClient,
        removeClient,
        editClient,
        goToClientDetailsPage,
    };
}
