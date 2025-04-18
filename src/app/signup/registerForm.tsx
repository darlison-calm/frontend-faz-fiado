"use client"

import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z
    .object({
        username: z.string().min(2, {
            message: "O nome de usuário deve ter no mínimo 2 caracteres.",
        }).max(50, {
            message: "O nome de usuário deve ter no máximo 50 caracteres."
        }).optional(),
        email: z.string().email({
            message: "E-mail inválido.",
        }),
        password: z.string().min(6, {
            message: "A senha deve ter no mínimo 6 caracteres.",
        }),
        matchingPassword: z.string(),
        // phoneNumber: z.string(),

    })
    .refine((data) => data.password === data.matchingPassword, {
        path: ["matchingPassword"],
        message: "As senhas não coincidem.",
    });

export type FormFields = z.infer<typeof formSchema>
export default function RegisterForm() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        reValidateMode: "onChange"
    });

    async function onSubmit(data: FormFields) {
      try {

        const payload = {
          ...data,
          phoneNumber: {
            value: "+5511983354111",
            locale: "BR"
          }
        };

          const response = await fetch("http://localhost:8080/users/registration", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
          });

          // Verificar se a requisição foi bem-sucedida
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || "Erro ao criar conta.");
          }

          // Sucesso: obter a resposta da API
          const result = await response.json();
          alert("Conta criada com sucesso! Bem-vindo(a), " + (data.username || data.email));
      } catch (error) {
          // Tratar erros
          const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro inesperado.";
          alert(errorMessage);
      }
  }

    return (
      <div className="w-5/6 mt-2 max-w-sm mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <InputField
                  id="username_input"
                  name="username"
                  type="text"
                  label="Nome de usuário"
                  register={register}
                  errors={errors}
              />
              <InputField
                  id="email_input"
                  name="email"
                  type="email"
                  label="Email"
                  register={register}
                  errors={errors}
              />
              <InputField
                  id="password_input"
                  name="password"
                  type="password"
                  label="Senha"
                  register={register}
                  errors={errors}
              />
              <InputField
                  id="matching_password_input"
                  name="matchingPassword"
                  type="password"
                  label="Confirmar Senha"
                  register={register}
                  errors={errors}
              />
              {/* <InputField
                  id="phone_input"
                  name="phoneNumber"
                  type="tel"
                  label="Telefone"
                  register={register}
                  errors={errors}
              /> */}
              <Button className="w-full" disabled={isSubmitting} type="submit">
                  {isSubmitting ? "Carregando" : "Criar Conta"}
              </Button>
          </form>
      </div>
  );
}