"use client"

import api from "@/lib/axiosInstance";
import { TAuthUSer } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useLoginForm = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    const formMethods = useForm<TAuthUSer>();

    const onSubmit = async (formData: TAuthUSer) => {
        try {
            setLoading(true)
            const res = await api.post("/users/auth", formData)
            const token = res.data.token;
            localStorage.setItem("token", JSON.stringify(token));
            router.push("/clients")
        } catch (error) {
            throw error;
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