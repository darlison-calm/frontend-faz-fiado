"use client"

import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/inputFieldLogIn";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";
import api from "@/lib/axiosInstance";
import { TAuthUSer } from "@/users/types/userTypes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignInForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isLoading },
    } = useForm<TAuthUSer>();

    const onSubmit = async (formData: TAuthUSer) => {
        const res = await api.post("/users/auth", formData)
        const token = res.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        router.push("/clients")
    }

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
            </form>
        </div>
    )
}