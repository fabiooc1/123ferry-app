import { cpfSchema } from "@/constants/schemas";
import { z } from "zod";

export const addVehicleFormSchema = z.object({
    vehicleCategoryId: z.coerce.number().min(1, "Selecione um modelo"),
    plate: z.string().min(6, "Placa inválida"),
    driverCpf: cpfSchema
})

export type AddVehicleFormData = z.infer<typeof addVehicleFormSchema>