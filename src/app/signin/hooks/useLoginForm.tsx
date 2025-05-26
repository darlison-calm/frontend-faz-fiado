"use client"

import api from "@/lib/axiosInstance";
import { TAuthUser } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useLoginForm = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    const formMethods = useForm<TAuthUser>();

    const onSubmit = async (formData: TAuthUser) => {
        try {
            setLoading(true)
            const res = await api.post("/users/auth", formData)
            const token = res.data.token;
            localStorage.setItem("token", JSON.stringify(token));
            router.push("/clients")
        } catch {
            // TO DO:
            // adicionar errors de credenciais inválidas
        } finally {
            setLoading(false);
        }
    }

    const goToSignUp = () => {
        router.push("/signup");
    }

    return {
        formMethods,
        isLoading,
        onSubmit,
        goToSignUp
    }

}