import { z } from 'zod'

export const loginFormSchema = z.object({
    email: z.string().email("email inválido"),
    password: z.string().min(6, "no mínimo 6 caracteres")
})

export type LoginFormData = z.infer<typeof loginFormSchema>