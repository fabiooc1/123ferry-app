import { TripModel } from "./TripModel";

export interface TripsPaginationModel {
  data: TripModel[];
  meta: {
    totalItens: number;
    paginaAtual: number;
    tamanhoPagina: number;
    totalPaginas: number;
  };
};
