"use client"

import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/inputFieldLogIn";
import api from "@/lib/axiosInstance";
import { TAuthUSer } from "@/users/types/userTypes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignInForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TAuthUSer>();

    const onSubmit = async (formData: TAuthUSer) => {
        const res = await api.post("/users/auth", formData)
        const token = res.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        router.push("/clients")
    }

    return (
        <div className="w-5/6 mt-2 max-w-sm mx-auto">
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

                <Button className="w-full bg-primary " disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Carregando" : "Entrar"}
                </Button>
            </form>
        </div>
    )
}