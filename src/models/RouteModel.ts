import { HaborModel } from "./HarborModel"

export interface RouteModel {
    id: number
    nome: string
    origemId: number
    destinoId: number
    origem: HaborModel
    destino: HaborModel
}