"use client"

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z
    .object({
        username: z.string().min(2, {
            message: "O nome de usuário deve ter no mínimo 2 caracteres.",
        }).max(50, {
            message: "O nome de usuário deve ter no máximo 50 caracteres."
        }).optional(),
        email: z.string().email({
            message: "E-mail inválido.",
        }),
        password: z.string().min(6, {
            message: "A senha deve ter no mínimo 6 caracteres.",
        }),
        matchingPassword: z.string(),
    })
    .refine((data) => data.password === data.matchingPassword, {
        path: ["matchingPassword"],
        message: "As senhas não coincidem.",
    });

export default function RegisterForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            matchingPassword: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
            console.log(values)
    }
    return (
        <div className="flex items-center min-h-screen justify-center py-12 px-4">
          <div className="w-full max-w-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome de usuário</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome de usuário" {...field} />
                      </FormControl>
                     
                        <FormMessage className="text-sm" />
                  
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                    
                        <FormMessage className="text-sm" />
                     
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Senha" {...field} />
                      </FormControl>
                    
                        <FormMessage className="text-sm" />
                     
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="matchingPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirmar Senha" {...field} />
                      </FormControl>
                    
                        <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <Button className="w-full" disabled={(form.formState.isValid)}  type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      )
}


