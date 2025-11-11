import { TicketPassagerModel } from "./TicketPassagerModel";
import { TicketVehicleModel } from "./TicketVehicleModel";
import { TripModel } from "./TripModel";

export type TicketStatus = 'RESERVADA' | 'CANCELADA' | 'PAGA';

export interface TicketModel {
  id: number;
  viagem: TripModel;
  codigo: string;
  status: TicketStatus;
  reservadaEm: string;
  pagaEm: string | undefined;
  canceladaEm: string | undefined;
  passageiros: TicketPassagerModel[];
  veiculos: TicketVehicleModel[];
  auditadaPorId: number | undefined;
  adquiridaPorId: number;
}
