import { api } from "@/lib/axios"
import { TripsPaginationModel } from "@/models/TripsPaginationModel"

class TripService {
    async getAll(page: number, pageSize: number, routeId: number, departureDate: string): Promise<TripsPaginationModel> {
        try {
            const response = await api.get('/viagem', {
                params: {
                    page,
                    pageSize,
                    rotaId: routeId,
                    dataPartida: departureDate
                },
            })

            if (response.status !== 200) {
                throw new Error("Não foi possível buscar as viagens para essa rota")
            }

            return response.data as TripsPaginationModel
        }  catch {
            throw new Error("Serviço fora do ar. Tente novamente mais tarde")
        }
    }
}

export const tripService = new TripService()