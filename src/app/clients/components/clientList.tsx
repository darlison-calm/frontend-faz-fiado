import { Client } from "../types/clientType";
import ClientItem from "./clientItem";



export default function ClientList({ clients }: { clients: Client[] }) {
    return (
        <div className="space-y-2">
            {clients.map((client: Client) => (
                <ClientItem key={client.id} client={client} />
            ))}
        </div>
    )
}