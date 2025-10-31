import { passwordSchema } from "@/constants/schemas";
import { z } from "zod";

export const registerFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "O nome completo é obrigatório")
    .refine((value) => value.trim().split(/\s+/).length >= 2, {
      message: "Por favor, digite seu nome e sobrenome",
    }),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(15, "Celular inválido"),
  cpf: z.string().min(14, "CPF inválido"),
 bornDate: z.string()
  .min(10, "Data de nascimento inválida (DD/MM/AAAA)")
  .refine(val => /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
    message: "Formato de data inválido (DD/MM/AAAA)"
  })
  .transform((dateString, ctx) => {
    const [day, month, year] = dateString.split('/').map(Number);
    
    const utcDate = new Date(Date.UTC(year, month - 1, day));
    if (utcDate.getUTCDate() !== day || utcDate.getUTCMonth() !== (month - 1)) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: "Data inválida (ex: 31 de Fevereiro)",
      });
      return z.NEVER;
    }
    return utcDate.toISOString();
  }),
  password: passwordSchema,
  confirmationPassword: z.string().min(1, "A confirmação de senha é obrigatória")
})
.refine(data => data.password === data.confirmationPassword, {
  message: "As senhas não coincidem",
  path: ["confirmationPassword"], 
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
