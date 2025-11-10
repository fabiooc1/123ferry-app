import { z } from "zod";

export const scheduleTripSchema = z.object({
  routeId: z.string()
    .min(1, "Selecione o local de embarque")
    .transform(Number),
  departureDate: z
    .string()
    .min(10, "Data de partida inválida (DD/MM/AAAA)")
    .transform((value) => {
      const parts = value.split("/");
      if (parts.length !== 3) {
        return new Date(NaN);
      }
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day); 
    })
    
    .refine((value) => !isNaN(value.getTime()), { 
      message: "Data inválida" 
    })
    
    .refine((value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return value >= today; 
    }, { 
      message: "A data de partida não pode ser anterior a atual" 
    })
    
    .transform((value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (value.getTime() === today.getTime()) {
        return new Date();
      }

      return value;
    }),
});

export type ScheduleTripFormData = z.infer<typeof scheduleTripSchema>