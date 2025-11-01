import { bornDateSchema, cpfSchema, fullNameSchema, passwordSchema } from "@/constants/schemas";
import { z } from "zod";

export const registerFormSchema = z.object({
  fullName: fullNameSchema,
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(15, "Celular inválido"),
  cpf: cpfSchema,
  bornDate: bornDateSchema,
  password: passwordSchema,
  confirmationPassword: z.string().min(1, "A confirmação de senha é obrigatória")
})
.refine(data => data.password === data.confirmationPassword, {
  message: "As senhas não coincidem",
  path: ["confirmationPassword"], 
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
