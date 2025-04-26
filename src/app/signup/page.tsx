'use client'

import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import { createUserSchema, TAuthUSer, TCreateUser, TCreateUserSchema } from "@/users/types/userTypes";
import { UserService } from "@/users/userSevice";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";


export default function RegisterForm() {
    const router = useRouter();

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting },
        setError
    } = useForm <TCreateUserSchema>({
        resolver: zodResolver(createUserSchema),
        mode: "onBlur",
        reValidateMode: "onChange"
    });

    async function onSubmit(formData: TCreateUserSchema) {
      try {
            const { phoneNumber: originalPhoneNumber, ...otherFormData } = formData;

            const createUserPayload: TCreateUser = {
                ...otherFormData,
                phoneNumber: {
                    value: `+55${originalPhoneNumber}`,
                    locale: "BR"
                }
            }

            const createResponse = await UserService.createUser(createUserPayload);
            if (!createResponse.ok) {
                const errorData = await createResponse.json();
                if (typeof errorData !== "object" || errorData == null) {
                    throw new Error("Falha ao processar criação");
                }
                
                Object.entries(errorData).forEach(([field, mess]) => {
                    setError(field as keyof TCreateUserSchema, {
                        message: mess as string,
                        type: "server"
                    })
                })
                return;
            }
            
            const authPayload: TAuthUSer = {
                loginMethod: formData.email,
                password: formData.password,
            };

            const authRes = await UserService.authUser(authPayload); 
            if (!authRes.ok) throw new Error("Falha ao fazer login");
            
            const token  = JSON.stringify(await authRes.json());
            localStorage.setItem("authToken", token);
      } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro inesperado.";
            alert(errorMessage);
      }
    } 

    const goToLoginPage = () => {
        router.push("/signin");
    }

    return (
        <div className="w-full flex justify-center mt-4">
        <div className="w-5/6 max-w-sm bg-white shadow-lg rounded-2xl p-6">
            <h1 className="text-center mb-4 text-xl">Cadastre-se</h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              id="email_input"
              name="email"
              type="email"
              label="Email"
              register={register}
              errors={errors}
            />
            <InputField
              id="username_input"
              name="username"
              type="text"
              label="Nome de usuário"
              register={register}
              errors={errors}
            />
            <InputField
              id="phone_input"
              name="phoneNumber"
              type="tel"
              label="Telefone"
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
            <Button
              className="w-full bg-[var(--highlight)]"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Carregando' : 'Criar Conta'}
            </Button>
          </form>
          <p className="mt-4 text-sm">Já tem uma conta? <span onClick={goToLoginPage} className="cursor-pointer font-medium underline text-[var(--highlight)]">Clique aqui</span></p>
        </div>
      </div>
      
  );
}