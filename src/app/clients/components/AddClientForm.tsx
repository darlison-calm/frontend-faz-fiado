import { ClientFormData, Client } from "@/types/clientType";
import { ClientFormBase } from "./ClientFormBase";
import { BadRequestError } from "@/app/erros/badRequest";
import { useState } from "react";

interface AddClientFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCreateClient: (data: ClientFormData) => Promise<Client | void>;
}

export default function AddClientForm({ open, setOpen, onCreateClient }: AddClientFormProps) {
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (data: ClientFormData) => {
    try {
      setServerErrors({});
      await onCreateClient(data);
    } catch (error) {
      if (error instanceof BadRequestError) {
        const errors = error.response?.data ?? {};
        setServerErrors(errors);
      }
    }
  };

  return (
    <ClientFormBase
      open={open}
      setOpen={setOpen}
      onSubmit={handleSubmit}
      title="Adicionar Novo Cliente"
      description="Preencha os dados para adicionar um novo cliente."
      serverErrors={serverErrors}
      defaultValues={{
        fullName: "",
        phoneNumber: "",
        address: "",
        observation: "",
      }}
    />
  );
}