"use client"

import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/inputFieldLogIn";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";
import { useLoginForm } from "./hooks/useLoginForm";

export default function SignInForm() {
    const { formMethods, isLoading, onSubmit, goToSignUp } = useLoginForm();
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit
    } = formMethods;

    return (
        <div className="flex items-center justify-center min-h-screen">
            {isLoading && <LoadingOverlay />}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    id="loginMethod_input"
                    name="loginMethod"
                    type="login"
                    label="Email ou nome de usuário"
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
                <Button className="w-full bg-[var(--highlight)]" disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Carregando" : "Entrar"}
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-[var(--highlight)] underline"
                    onClick={goToSignUp}
                >
                    Não tem uma conta? Clique aqui
                </Button>
            </form>
        </div>
    )
}
