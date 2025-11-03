import { TicketPassagerModel } from "./TicketPassagerModel";
import { TicketVehicleModel } from "./TicketVehicleModel";
import { TripModel } from "./TripModel";

export interface TicketModel {
  id: number;
  viagem: TripModel;
  codigo: string;
  status: 'RESERVADA' | 'CANCELADA' | 'PAGA';
  reservadaEm: string;
  pagaEm: string;
  canceladaEm: string;
  passageiros: TicketPassagerModel[];
  veiculos: TicketVehicleModel[];
  auditadaPorId: number | null;
  adquiridaPorId: number;
}
