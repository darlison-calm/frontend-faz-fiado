'use client'

import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import { createUserSchema, TAuthUSer, TCreateUser, TCreateUserSchema } from "@/users/types/userTypes";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import api from "@/lib/axiosInstance";



export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<TCreateUserSchema>({
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

      await api.post('/users/registration', createUserPayload);

      const authPayload: TAuthUSer = {
        loginMethod: formData.email,
        password: formData.password,
      };

      const authRes = await api.post('/users/auth', authPayload)

      const token = JSON.stringify(authRes.data?.token)
      localStorage.setItem("token", token);
      router.push("/clients")
    } catch (error: any) {
      if (error.response?.status === 409) {
        const serverErrors = error.response.data;
        Object.entries(serverErrors).forEach(([field, mes]) => {
          setError(field as keyof TCreateUserSchema, { type: 'server', message: mes as string });
        });
      }
      const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro inesperado.";
      console.log(errorMessage);
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