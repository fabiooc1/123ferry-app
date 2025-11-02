import { TicketPassagerModel } from "./TicketPassagerModel";
import { VehicleModel } from "./VehicleModel";

export interface TicketModel {
  id: number;
  viagemId: number;
  code: string;
  status: 'RESERVADA' | 'CANCELADA' | 'PAGA';
  reservadaEm: string;
  pagaEm: string;
  canceladaEm: string;

  passageiros: TicketPassagerModel[];
  veiculos: VehicleModel[];

  auditadaPorId: string;
  adquiridaPorId: number;
}
