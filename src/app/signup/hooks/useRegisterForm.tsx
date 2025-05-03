'use client'
import { createUserSchema, TAuthUSer, TCreateUser, TCreateUserSchema } from "@/users/types/userTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ConflictError } from "../../erros/conflict";
import { BadRequestError } from "../../erros/badRequest";
import api from "@/lib/axiosInstance";
import { useState } from "react";

export const useRegisterForm = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const formMethods = useForm<TCreateUserSchema>({
        resolver: zodResolver(createUserSchema),
        mode: "onBlur",
        reValidateMode: "onChange"
    });

    async function onSubmit(formData: TCreateUserSchema) {
        try {
            setLoading(true);
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
            setLoading(false);
        } catch (error: any) {
            if (error instanceof ConflictError || error instanceof BadRequestError) {
                const serverErrors = error.response.data;
                Object.entries(serverErrors).forEach(([field, mes]) => {
                    formMethods.setError(field as keyof TCreateUserSchema, { type: 'server', message: mes as string });
                });
            }
            const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro inesperado.";
            console.log(errorMessage);
            setLoading(false);
        }
    }

    const goToLoginPage = () => router.push("/signin");

    return {
        formMethods,
        isLoading,
        goToLoginPage,
        onSubmit
    };
}
