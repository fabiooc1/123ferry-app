import { TicketPaginationItem } from "./TicketPaginationItem";

export interface TicketsPaginationModel {
    data: TicketPaginationItem[],
    meta: {
    totalItens: number;
    paginaAtual: number;
    tamanhoPagina: number;
    totalPaginas: number;
  };
}