export interface TripModel {
  id: number;
  code: string;
  ferryId: number;
  rotaId: number;
  dataPartida: string;
  dataChegada: string;
  criadaPorId: number;
  criadaEm: string;
  atualizadaEm: string;
  ferry: {
    id: number;
    nome: string;
    maximoDePessoas: number;
    maximoDeVeiculosEmM2: number;
    registradoEm: string;
    atualizadoEm: string;
  };
  rota: {
    id: number;
    nome: string;
    origemId: number;
    destinoId: number;
  };
  quantidadeDePassageiros: number;
};
