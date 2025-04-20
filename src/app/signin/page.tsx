"use client"

import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/inputFieldLogIn";
import { TAuthUSer } from "@/users/types/userTypes";
import { UserService } from "@/users/userSevice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignInForm() {
    const router = useRouter();
     const { 
            register, 
            handleSubmit, 
            formState: { errors, isSubmitting },
            setError
        } = useForm<TAuthUSer>();

    const onSubmit = async (formData: TAuthUSer) => {
        const authRes = await UserService.authUser(formData);
        if (!authRes.ok) throw new Error("Falha ao fazer login");
            
        const token  = JSON.stringify(await authRes.json());
        console.log(token);
        localStorage.setItem("authToken", token);
    }

    return (
        <div className="w-5/6 mt-2 max-w-sm mx-auto">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <InputField
                id="loginMethod_input"
                name="loginMethod"
                type="login"
                label="Email / Nome de usuário"
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

            <Button className="w-full" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Carregando" : "Entrar"}
            </Button>
        </form>
    </div>
    )
}