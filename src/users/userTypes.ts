import { z } from "zod";

export const createUserSchema = z
    .object({
        username: z.string().max(50, {
            message: "O nome de usuário deve ter no máximo 50 caracteres."
        }).optional(),
        email: z.string().email({
            message: "E-mail inválido.",
        }),
        password: z.string().min(6, {
            message: "A senha deve ter no mínimo 6 caracteres.",
        }),
        matchingPassword: z.string(),
        phoneNumber: z.string(),
    })
    .refine((data) => data.password === data.matchingPassword, {
        path: ["matchingPassword"],
        message: "As senhas não coincidem.",
    });

export type TCreateUserSchema = z.infer<typeof createUserSchema>


type PhoneNumber = {
    value: string;
    locale: string;
  };

export type TCreateUser = {
    email: string;
    password: string;
    matchingPassword: string;
    phoneNumber: PhoneNumber;
    username?: string;
}

export type TAuthUSer = {
    login: string;
    password: string;
}