import { FerryModel } from "./FerryModel";
import { RouteModel } from "./RouteModel";

export interface TripModel {
  id: number;
  dataPartida: string;
  dataChegada: string;
  criadaPorId: number;
  criadaEm: string;
  atualizadaEm: string;
  ferry: FerryModel;
  rota: RouteModel;
  quantidadeDePassageiros: number;
};
