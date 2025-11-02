export interface TicketPaginationItem {
  id: number;
  codigo: string;
  viagem: {
    dataPartida: string;
    dataChegada: string;
    rota: {
      origem: {
        id: number;
        nome: string;
      };
      destino: {
        id: number;
        nome: string;
      };
    };
  };
}
