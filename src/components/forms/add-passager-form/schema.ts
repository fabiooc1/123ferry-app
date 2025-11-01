import { bornDateSchema, cpfSchema, fullNameSchema } from "@/constants/schemas";
import { z } from "zod";

export const addPassagerFormSchema = z.object({
  passagerTypeId: z.coerce.number().min(1, "Selecione um tipo"),
  fullName: fullNameSchema,
  cpf: cpfSchema,
  bornDate: bornDateSchema,
});

export type AddPassagerFormData = z.infer<typeof addPassagerFormSchema>
