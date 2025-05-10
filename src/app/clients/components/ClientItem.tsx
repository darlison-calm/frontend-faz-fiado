import React, { JSX, useState } from 'react';
import { User, MoreVertical, SquarePen, Trash2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Client } from '../../../types/clientType';
import DeleteClientDialog from './DeleteClientDialog';

interface ClientItemProps {
    client: Client;
    onDeleteClient: (id: number) => Promise<void>;
    onEditClient: (id: number) => void;
    onViewDetails: (id: number) => void;
}
/**
 * @component ClientItem
 *
 * @description
 * Componente responsável por exibir um item da lista de clientes.
 * Apresenta o nome do cliente e um menu de ações com opções de editar ou deletar.
 * Também permite abrir os detalhes do cliente ao clicar no item.
 *
 * @param {ClientItemProps} props - Propriedades do componente.
 * @param {Client} props.client - Objeto do cliente a ser exibido.
 * @param {(id: number) => Promise<void>} props.onDeleteClient - Função chamada ao confirmar exclusão do cliente.
 * @param {(id: number) => void} props.onEditClient - Função chamada ao clicar na opção de editar.
 * @param {(id: number) => void} props.onViewDetails - Função chamada ao clicar no item para ver detalhes.
 *
 * @state
 * - `isDeleteDialogOpen` (boolean): controla a exibição do modal de confirmação para deletar.
 *
 * @events
 * - Clique no item chama `onViewDetails`.
 * - Ícone de lápis aciona `onEditClient`.
 * - Ícone de lixeira abre o diálogo de confirmação e, ao confirmar, chama `onDeleteClient`.
 *
 * @dependencies
 * - `lucide-react`: ícones (User, MoreVertical, SquarePen, Trash2)
 * - `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuTrigger`: menu suspenso de ações
 * - `DeleteClientDialog`: componente de confirmação de exclusão
 *
 * @returns {JSX.Element} Item da lista de clientes com menu para remoção e edição
 */
export default function ClientItem({ client, onDeleteClient, onEditClient, onViewDetails }: ClientItemProps): JSX.Element {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEditClient(client.id);
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await onDeleteClient(client.id);
        setIsDeleteDialogOpen(false);
    }

    return (
        <li onClick={() => onViewDetails(client.id)}
            className="flex items-center py-1 px-3 bg-[var(--card-foreground)] rounded-md border border-gray-200 shadow-sm hover:shadow-md w-full"
        >
            <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-[#0065FF]/10"
            >
                <User className="h-3 w-3 text-[#0065FF]" />
            </div>
            <div className="ml-2 flex-1 min-w-0">
                <span className="text-xs font-medium block truncate leading-tight">{client.fullName}</span>
            </div>
            <div className="flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem onClick={(e) => handleEdit(e)} className="cursor-pointer">
                            <SquarePen />Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            setIsDeleteDialogOpen(true);
                        }}
                            className="cursor-pointer text-red-500"
                        >
                            <Trash2 />Deletar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <DeleteClientDialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={(handleDelete)}
            />
        </li >
    );
}