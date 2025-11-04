import { VehicleCategory } from "./VehicleCategory";

export interface TicketVehicleModel {
    id: number;
    placa: string;
    veiculoCategoriaId: number;
    veiculoCategoria: VehicleCategory;
    precoPagoEmCentavos: number | null;
    passagemId: number;
    passageiroId: number;
}