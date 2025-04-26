import ClientCard from "./clientCard";

import clients from "@/app/clients/clients.json";

export default function ClientList() {
    return (
        <div className="space-y-2">
            {clients.map((client) => (
                <ClientCard key={client.id} client={client} />
            ))}
        </div>
    )
}