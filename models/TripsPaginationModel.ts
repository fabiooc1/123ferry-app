import { TripModel } from "./TripModel";

export type TripsPaginationModel = {
  data: TripModel[];
  meta: {
    totalItens: number;
    paginaAtual: number;
    tamanhoPagina: number;
    totalPaginas: number;
  };
};
