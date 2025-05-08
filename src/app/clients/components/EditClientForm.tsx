import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { ClientFormData } from "../../../types/clientType";
import { useEffect, useState } from "react";
import { loadClient } from "../services/clientService";
import { ClientFormBase } from "./ClientFormBase";
import { BadRequestError } from "@/app/erros/badRequest";

interface ClienteModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onEditClient: (clientId: number, data: ClientFormData) => Promise<void>;
    clientId: number;
}

export default function EditClientForm({ open, setOpen, clientId, onEditClient }: ClienteModalProps) {
    const [defaultValues, setDefaultValues] = useState<ClientFormData | undefined>();
    const [serverErrors, setServerErrors] = useState<Record<string, string>>({});


    const handleSubmit = async (data: ClientFormData) => {
        try {
            setServerErrors({});
            await onEditClient(clientId, data);
            setOpen(false);
        } catch (error) {
            if (error instanceof BadRequestError) {
                const errors = error.response.data;
                setServerErrors(errors);
            }
        }
    };

    useEffect(() => {
        const fetchClient = async () => {
            if (clientId > 0 && open) {
                try {
                    const data = await loadClient(clientId);
                    setDefaultValues({
                        fullName: data.fullName,
                        observation: data.observation || "",
                        phoneNumber: data.phoneNumber || "",
                        address: data.address || ""
                    });
                } catch (err) {
                    console.error("Erro ao carregar cliente:", err);
                }
            }
        };
        fetchClient();
    }, [clientId, open]);

    return (
        <ClientFormBase
            open={open}
            setOpen={setOpen}
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            title="Editar Cliente"
            description="Altere os dados do seu cliente."
            serverErrors={serverErrors}
        />
    );
}