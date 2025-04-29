import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

interface ClienteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface FormValues {
  name: string
  phoneNumber: string
  address: string
  observation: string
}

export default function AddClientForm({ open, setOpen }: ClienteModalProps) {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
      observation: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    closeForm();
  }
  const closeForm = () => {
    setOpen(false);
    reset()
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-full h-full sm:max-w-lg sm:h-auto flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Cliente</DialogTitle>
          <DialogDescription>
            Preencha os dados para adicionar um novo cliente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 flex-1 flex flex-col">
          <div className="grid gap-2">
            <Label htmlFor="name" className={errors.name ? "text-red-500" : ""}>Nome*</Label>
            <Input
              id="name"
              {...register("name", { required: "Nome é obrigatório" })}
              className={errors.name ? "border-red-500" : ""}
              placeholder="Digite o nome"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message as string}</p>
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