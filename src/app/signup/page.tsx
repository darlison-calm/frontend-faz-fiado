'use client'

import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";
import { useRegisterForm } from "./hooks/useRegisterForm";

export default function RegisterForm() {
  const {
    formMethods,
    onSubmit,
    goToLoginPage,
    isLoading
  } = useRegisterForm();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = formMethods;

  return (
    <div className="w-full flex justify-center mt-4">
      {isLoading && <LoadingOverlay />}
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