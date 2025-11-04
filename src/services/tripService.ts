import { api } from "@/lib/axios"
import { PassagerTypeModel } from "@/models/PassagerTypeModel"
import { TripModel } from "@/models/TripModel"
import { TripsPaginationModel } from "@/models/TripsPaginationModel"
import { VehicleCategory } from "@/models/VehicleCategory"

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

    async get(tripId: number) {
        try {
            const response = await api.get(`/viagem/${tripId}`)

            if (response.status !== 200) {
                throw new Error("Não foi possível buscar essa viagem")
            }

            return response.data as TripModel
        }  catch {
            throw new Error("Serviço fora do ar. Tente novamente mais tarde")
        }
    }

    async getAllPassagerTypes(): Promise<PassagerTypeModel[]> {
        try {
            const response = await api.get('/tipo-passageiro')

            if (response.status !== 200) {
                throw new Error("Não foi possível buscar os tipos de passageiros")
            }

            return response.data as PassagerTypeModel[]
        }  catch {
            throw new Error("Serviço fora do ar. Tente novamente mais tarde listar os tipos de passageiros")
        }
    }

    async getAllVehicleCategories(): Promise<VehicleCategory[]> {
        try {
            const response = await api.get('/veiculo-categoria')

            if (response.status !== 200) {
                throw new Error("Não foi possível buscar os modelos de veículos")
            }

            return response.data as VehicleCategory[]
        }  catch {
            throw new Error("Serviço fora do ar. Tente novamente mais tarde listar as categorias de veículo")
        }
    }
}

export const tripService = new TripService()