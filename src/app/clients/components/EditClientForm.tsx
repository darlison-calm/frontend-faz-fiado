import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { ClientFormData } from "../../../types/clientType";
import { useEffect } from "react";
import { loadClient } from "../services/clientService";

interface ClienteModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onEditClient: (clientId: number, data: ClientFormData) => Promise<void>;
    clientId: number;
}

export default function EditClientForm({ open, setOpen, clientId, onEditClient }: ClienteModalProps) {

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit
    } = useForm<ClientFormData>();

    const closeForm = async () => {
        setOpen(false);
        reset();
    }

    const submitForm = async (data: ClientFormData) => {
        await onEditClient(clientId, data);
        closeForm();
    }

    useEffect(() => {
        const fetchClient = async () => {
            if (clientId > 0 && open) {
                try {
                    const data = await loadClient(clientId);
                    reset({
                        fullName: data.fullName,
                        observation: data.observation,
                        phoneNumber: data.phoneNumber,
                        address: data.address
                    });
                } catch (err) {
                    console.error("Erro ao carregar cliente:", err);
                }
            }
        };

        fetchClient();
    }, [clientId, open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-full h-full sm:max-w-lg sm:h-auto flex flex-col justify-between">
                <DialogHeader>
                    <DialogTitle>Editar Cliente</DialogTitle>
                    <DialogDescription>
                        Altere os dados do seu cliente.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-2 flex-1 flex flex-col" onSubmit={handleSubmit(submitForm)}>
                    <div className="grid gap-2">
                        <Label htmlFor="name" className={errors.fullName ? "text-red-500" : ""}>Nome*</Label>
                        <Input
                            id="name"
                            {...register("fullName", { required: "Nome é obrigatório" })}
                            className={errors.fullName ? "border-red-500" : ""}
                            placeholder="Digite o nome"
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-sm">{errors.fullName.message as string}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                            id="telefone"
                            {...register("phoneNumber")}
                            placeholder="(00) 00000-0000"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input
                            id="endereco"
                            {...register("address")}
                            placeholder="Rua, número, bairro, cidade"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="observacao">Observação</Label>
                        <Textarea
                            id="observacao"
                            {...register("observation")}
                            placeholder="Informações adicionais sobre o cliente"
                            rows={3}
                        />
                    </div>

                    <DialogFooter className="mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeForm}
                        >
                            Cancelar
                        </Button>
                        <Button className="bg-[var(--highlight)]" type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}