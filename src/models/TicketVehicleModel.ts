import { VehicleCategory } from "./VehicleCategory";

export interface TicketVehicleModel {
    id: number;
    placa: string;
    veiculoCategoria: VehicleCategory;
    precoPagoEmCentavos: number | null;
    motorista: {
        id: number
        nomeCompleto: string
        cpf: string
        dataNascimento: string
    };
}