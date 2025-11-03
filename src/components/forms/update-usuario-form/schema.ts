import { fullNameSchema, passwordSchema } from "@/constants/schemas";
import { z } from "zod";

export const updateUsuarioFormSchema = z.object({
    fullName: fullNameSchema.optional(),
    phone: z.string().min(15, "Celular inválido").optional(),
    password: passwordSchema.optional()
})

export type UpdateUsuarioFormData = z.infer<typeof updateUsuarioFormSchema>