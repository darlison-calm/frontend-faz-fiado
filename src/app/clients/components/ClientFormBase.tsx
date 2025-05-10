import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ClientFormData } from "@/types/clientType";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ClientFormBaseProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: SubmitHandler<ClientFormData>;
    defaultValues?: ClientFormData;
    title: string;
    description: string;
    serverErrors?: Record<string, string>
}

export function ClientFormBase({
    open,
    setOpen,
    onSubmit,
    title,
    description,
    serverErrors = {},
    defaultValues
}: ClientFormBaseProps) {
    const {
        register,
        formState: { errors, isSubmitting },
        reset,
        handleSubmit,
        setError
    } = useForm<ClientFormData>({
        defaultValues: defaultValues || {
            fullName: "",
            phoneNumber: "",
            address: "",
            observation: "",
        },
    });

    const closeForm = () => {
        setOpen(false);
        reset();
    };

    const submit = (clientFormData: ClientFormData) => {
        onSubmit(clientFormData),
            reset();
    }

    useEffect(() => {
        if (open && defaultValues) {
            reset(defaultValues);
        }
    }, [open, defaultValues, reset]);

    useEffect(() => {
        if (serverErrors && Object.keys(serverErrors).length > 0) {
            Object.entries(serverErrors).forEach(([field, message]) => {
                setError(field as keyof ClientFormData, {
                    type: 'server',
                    message,
                });
            });
        }
    }, [serverErrors, setError]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-full h-full sm:max-w-lg sm:h-auto flex flex-col justify-between">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(submit)} className="space-y-2 flex-1 flex flex-col">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className={errors.fullName ? "text-red-500" : ""}>
                            Nome*
                        </Label>
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
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button className="bg-[var(--highlight)]" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Salvando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}