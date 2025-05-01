import React from 'react';
import { User, MoreVertical } from 'lucide-react';


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Client } from '../types/clientType';



export default function ClientItem({ client, onDeleteClient }: { client: Client, onDeleteClient: any }) {
    return (
        <div
            className="flex items-center py-1 px-3 bg-[var(--card-foreground)] rounded-md border border-gray-200 shadow-sm hover:shadow-md w-full"
        >
            <div
                className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 bg-[#0065FF]/10"
            >
                <User className="h-3 w-3 text-[#0065FF]" />
            </div>
            <div className="ml-2 flex-1 min-w-0">
                <span className="text-xs font-medium block truncate leading-tight">{client.fullName}</span>
            </div>
            <div className="flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-1 rounded-full hover:bg-gray-100">
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem className="cursor-pointer">
                            Update
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDeleteClient(client.id)} className="cursor-pointer text-red-500">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}