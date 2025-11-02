export interface TicketVehicleModel {
    id: number;
    placa: string;
    veiculoId: number;
    precoPagoEmCentavos: number | null;
    passagemId: number;
    passageiroId: number;
}