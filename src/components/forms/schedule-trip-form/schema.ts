import { z } from "zod";

export const scheduleTripSchema = z.object({
  routeId: z.string()
    .min(1, "Selecione o local de embarque")
    .transform(Number),
  departureDate: z
    .string()
    .min(10, "Data de partida inválida (DD/MM/AAAA)")
    .refine((val) => /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
      message: "Formato de data inválido (DD/MM/AAAA)",
    })
    .transform((dateString, ctx) => {
      const [day, month, year] = dateString.split("/").map(Number);

      const utcDate = new Date(Date.UTC(year, month - 1, day));
      if (utcDate.getUTCDate() !== day || utcDate.getUTCMonth() !== month - 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: "Data inválida (ex: 31 de Fevereiro)",
        });
        return z.NEVER;
      }
      return utcDate.toISOString();
    }),
});

export type ScheduleTripFormData = z.infer<typeof scheduleTripSchema>
