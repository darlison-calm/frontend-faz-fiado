import React from 'react';
import { User, MoreVertical } from 'lucide-react';

type Client = {
    id: number; 
    name: string;
};

export default function ClientCard({ client }: { client: Client }) {

    return (
        <div
            className="flex items-center py-3 px-3 bg-[#FBFFFE] rounded-lg border border-gray-200 shadow-xs hover:shadow-md w-full"
        >
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 bg-[#0065FF]/10"
            >
                <User className="h-4 w-4 text-[#0065FF]" />
            </div>
            <div className="ml-3 flex-1 min-w-0">
                <span className="text-sm font-medium block truncate leading-tight">{client.name}</span>
            </div>
            <div className="flex items-center">
                <button className="p-1 rounded-full hover:bg-gray-100">
                    <MoreVertical className="h-5 w-5 text-gray-400" />
                </button>
            </div>
        </div>
    );
}
