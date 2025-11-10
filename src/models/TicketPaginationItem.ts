import { RouteModel } from "./RouteModel";

export interface TicketPaginationItem {
  id: number;
  codigo: string;
  viagem: {
    dataPartida: string;
    dataChegada: string;
    rota: RouteModel
  };
}
